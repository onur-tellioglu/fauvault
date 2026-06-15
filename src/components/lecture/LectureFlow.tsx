'use client'
import { useState, useMemo, useEffect } from 'react'
import type { Lecture } from '@/lib/types'
import type { Course } from '@/lib/courses'
import { ConceptSection } from './ConceptSection'
import { QuizQuestion } from '@/components/quiz/QuizQuestion'

type Stage =
  | { kind: 'concept'; ci: number }
  | { kind: 'mini'; ci: number; qi: number }
  | { kind: 'final'; qi: number }
  | { kind: 'done'; score: number; total: number }

// Each question is tagged with the concept it checks (conceptIndex). The first
// question for a concept becomes that concept's mini "Concept Check"; any further
// questions (extras, or with an out-of-range index) go to the final quiz.
export function split(lecture: Lecture) {
  const miniMap: Record<number, typeof lecture.questions[number][]> = {}
  const finalQs: typeof lecture.questions[number][] = []
  for (const q of lecture.questions) {
    const ci = q.conceptIndex
    if (ci >= 0 && ci < lecture.concepts.length && !miniMap[ci]) {
      miniMap[ci] = [q]
    } else {
      finalQs.push(q)
    }
  }
  return { miniMap, finalQs }
}

export function canGoBack(ci: number): boolean {
  return ci > 0
}

export type ForwardAction = {
  kind: 'quiz' | 'startQuiz' | 'advance'
  label: string
}

/**
 * Decides what the concept page's forward button does and what it reads.
 * Below the frontier the concept's Quick Check was already cleared, so we always
 * advance without re-showing it. At the frontier we keep the original gate:
 * Quick Check (a mini question exists), Next (no mini, more concepts remain), or
 * Start Quiz (last concept).
 *
 * Caller contract: `ci <= frontier` always holds — you can never view a concept
 * beyond the furthest unlocked one.
 */
export function forwardAction(
  ci: number,
  frontier: number,
  conceptCount: number,
  hasMini: boolean,
): ForwardAction {
  if (ci < frontier) return { kind: 'advance', label: 'Next →' }
  // ci === frontier here: callers never view a concept beyond the furthest
  // unlocked one, so the remaining cases are the frontier gate.
  if (hasMini) return { kind: 'quiz', label: 'Quick Check →' }
  if (ci + 1 < conceptCount) return { kind: 'advance', label: 'Next →' }
  return { kind: 'startQuiz', label: 'Start Quiz →' }
}

type Props = {
  lecture: Lecture
  course: Course
  initialConceptIndex: number
  onProgress: (patch: object) => void
  nextLectureId: number | null
}

export function LectureFlow({ lecture, course, initialConceptIndex, onProgress, nextLectureId }: Props) {
  const { miniMap, finalQs } = useMemo(() => split(lecture), [lecture])
  const miniQuestionCount = useMemo(
    () => Object.values(miniMap).reduce((sum, qs) => sum + qs.length, 0),
    [miniMap]
  )
  const [stage, setStage] = useState<Stage>({ kind: 'concept', ci: initialConceptIndex })
  const [frontier, setFrontier] = useState(initialConceptIndex)
  const [answered, setAnswered] = useState(false)
  const [finalAnswers, setFinalAnswers] = useState<{ selected: number[]; score: number }[]>([])
  const [miniScores, setMiniScores] = useState<number[]>([])

  useEffect(() => {
    if (stage.kind !== 'concept') return
    const ci = stage.ci
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (e.key === 'ArrowLeft' && canGoBack(ci)) {
        e.preventDefault()
        goToConcept(ci - 1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goForward(ci)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // Re-binds whenever the viewed concept or frontier changes; the handlers
    // close over exactly those, so the deps below are sufficient.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, frontier])

  const btnStyle: React.CSSProperties = {
    marginTop: '1.5rem', padding: '10px 22px',
    background: 'var(--accent)', color: '#0C0C10',
    border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer',
    fontFamily: 'var(--font-body)',
  }
  const controlRowStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.5rem',
  }
  const backBtnStyle: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', minHeight: 44,
    padding: '10px 22px', background: 'transparent',
    border: '1px solid var(--border-default)', color: 'var(--text-secondary)',
    borderRadius: 8, cursor: 'pointer',
    fontFamily: 'var(--font-body)', fontSize: '0.9rem',
  }

  function goToConcept(ci: number) {
    setStage({ kind: 'concept', ci })
    // Frontier only grows. Backward / within-range navigation never lowers it,
    // so saved progress is never regressed.
    if (ci > frontier) {
      setFrontier(ci)
      onProgress({ concept_index: ci })
    }
  }

  function afterConcept(ci: number) {
    if (miniMap[ci]?.length) {
      setStage({ kind: 'mini', ci, qi: 0 }); setAnswered(false)
    } else {
      nextAfterMini(ci)
    }
  }

  function nextAfterMini(ci: number) {
    if (ci + 1 < lecture.concepts.length) {
      goToConcept(ci + 1)
    } else if (finalQs.length === 0) {
      // All questions were used as mini-quizzes — skip final, go to done
      const avg = miniScores.length > 0
        ? miniScores.reduce((a, b) => a + b, 0) / miniScores.length
        : 0
      onProgress({
        final_quiz_result: { answers: [], score: avg, submittedAt: new Date().toISOString() },
        completed_at: new Date().toISOString(),
      })
      setStage({ kind: 'done', score: avg, total: lecture.questions.length })
    } else {
      setStage({ kind: 'final', qi: 0 }); setAnswered(false)
    }
  }

  function goForward(ci: number) {
    // Below the frontier the concept is already cleared — advance directly,
    // skipping its Quick Check. At the frontier, keep the existing gate.
    if (ci < frontier) {
      goToConcept(ci + 1)
    } else {
      afterConcept(ci)
    }
  }

  function afterFinal(qi: number, selected: number[], score: number) {
    const updated = [...finalAnswers]
    updated[qi] = { selected, score }
    setFinalAnswers(updated)
    setAnswered(true)
  }

  function nextFinal(qi: number) {
    if (qi + 1 < finalQs.length) {
      setStage({ kind: 'final', qi: qi + 1 }); setAnswered(false)
    } else {
      const avg = finalAnswers.reduce((s, a) => s + (a?.score ?? 0), 0) / finalQs.length
      const answers = finalQs.map((_, i) => finalAnswers[i]?.selected ?? [])
      onProgress({
        final_quiz_result: {
          answers,
          score: avg,
          submittedAt: new Date().toISOString(),
        },
        completed_at: new Date().toISOString(),
      })
      setStage({ kind: 'done', score: avg, total: lecture.questions.length })
    }
  }

  if (stage.kind === 'concept') {
    const c = lecture.concepts[stage.ci]
    const action = forwardAction(
      stage.ci, frontier, lecture.concepts.length, !!miniMap[stage.ci]?.length,
    )
    return (
      <div>
        <ConceptSection heading={c.heading} body={c.body} index={stage.ci} total={lecture.concepts.length} />
        <div style={controlRowStyle}>
          {canGoBack(stage.ci) && (
            <button style={backBtnStyle} onClick={() => goToConcept(stage.ci - 1)}>
              ← Previous
            </button>
          )}
          <button style={{ ...btnStyle, marginTop: 0, marginLeft: 'auto' }} onClick={() => goForward(stage.ci)}>
            {action.label}
          </button>
        </div>
      </div>
    )
  }

  if (stage.kind === 'mini') {
    const q = miniMap[stage.ci][stage.qi]
    return (
      <div>
        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.7rem', color: 'var(--accent)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Concept Check
        </p>
        {!answered && (
          <button
            onClick={() => goToConcept(stage.ci)}
            style={{
              display: 'inline-flex', alignItems: 'center', background: 'none', border: 'none',
              color: 'var(--text-secondary)', cursor: 'pointer', padding: 0, marginBottom: 14,
              fontFamily: 'var(--font-body)', fontSize: '0.8rem',
            }}
          >
            ← Back to concept
          </button>
        )}
        <QuizQuestion question={q} onAnswer={(_, score) => { setMiniScores(prev => [...prev, score]); setAnswered(true) }} />
        {answered && (
          <button style={btnStyle} onClick={() => { nextAfterMini(stage.ci); setAnswered(false) }}>
            Continue →
          </button>
        )}
      </div>
    )
  }

  if (stage.kind === 'final') {
    const q = finalQs[stage.qi]
    return (
      <div>
        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.7rem', color: 'var(--accent)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Lecture Quiz
        </p>
        <QuizQuestion
          key={q.id}
          question={q}
          onAnswer={(selected, score) => afterFinal(stage.qi, selected, score)}
          questionIndex={stage.qi + miniQuestionCount}
          totalQuestions={lecture.questions.length}
        />
        {answered && (
          <button style={btnStyle} onClick={() => nextFinal(stage.qi)}>
            {stage.qi + 1 < finalQs.length ? 'Next →' : 'Finish →'}
          </button>
        )}
      </div>
    )
  }

  // Results screen
  const pct = Math.round(stage.score * 100)
  return (
    <div style={{ textAlign: 'center', padding: '3rem 0', animation: 'fadeSlideUp 300ms ease forwards' }}>
      <div style={{ fontFamily: 'var(--font-fraunces)', fontSize: '6rem', fontWeight: 300, lineHeight: 1, color: pct >= 90 ? 'var(--success)' : pct >= 70 ? 'var(--accent)' : 'var(--text-secondary)' }}>
        {pct}%
      </div>
      <p style={{ color: 'var(--text-secondary)', marginTop: 12, fontSize: '0.875rem' }}>
        Lecture complete · {stage.total} questions
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
        {nextLectureId !== null && (
          <a href={`/${course}/lecture/${nextLectureId}`} style={{
            display: 'inline-flex', alignItems: 'center', padding: '10px 24px', minHeight: 44,
            background: 'var(--accent)', color: '#0C0C10', borderRadius: 8, textDecoration: 'none', fontWeight: 600,
            fontFamily: 'var(--font-body)',
          }}>Next Lecture →</a>
        )}
        <a href={`/${course}/dashboard`} style={{
          display: 'inline-flex', alignItems: 'center', padding: '10px 24px', minHeight: 44,
          border: '1px solid var(--border-default)', color: 'var(--text-secondary)',
          borderRadius: 8, textDecoration: 'none', fontSize: '0.9rem',
        }}>← Dashboard</a>
      </div>
    </div>
  )
}
