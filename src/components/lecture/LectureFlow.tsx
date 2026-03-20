'use client'
import { useState, useMemo } from 'react'
import type { Lecture } from '@/lib/types'
import { ConceptSection } from './ConceptSection'
import { QuizQuestion } from '@/components/quiz/QuizQuestion'

type Stage =
  | { kind: 'concept'; ci: number }
  | { kind: 'mini'; ci: number; qi: number }
  | { kind: 'final'; qi: number }
  | { kind: 'done'; score: number; total: number }

// Map first N questions as mini-quiz (one per concept), rest go to final quiz
export function split(lecture: Lecture) {
  const miniMap: Record<number, typeof lecture.questions[number][]> = {}
  let qi = 0
  for (let ci = 0; ci < lecture.concepts.length && qi < lecture.questions.length; ci++) {
    miniMap[ci] = [lecture.questions[qi++]]
  }
  const finalQs = lecture.questions.slice(qi)
  return { miniMap, finalQs }
}

type Props = {
  lecture: Lecture
  initialConceptIndex: number
  onProgress: (patch: object) => void
  nextLectureId: number | null
}

export function LectureFlow({ lecture, initialConceptIndex, onProgress, nextLectureId }: Props) {
  const { miniMap, finalQs } = useMemo(() => split(lecture), [lecture])
  const miniQuestionCount = useMemo(
    () => Object.values(miniMap).reduce((sum, qs) => sum + qs.length, 0),
    [miniMap]
  )
  const [stage, setStage] = useState<Stage>({ kind: 'concept', ci: initialConceptIndex })
  const [answered, setAnswered] = useState(false)
  const [finalAnswers, setFinalAnswers] = useState<{ selected: number[]; score: number }[]>([])
  const [miniScores, setMiniScores] = useState<number[]>([])

  const btnStyle: React.CSSProperties = {
    marginTop: '1.5rem', padding: '10px 22px',
    background: 'var(--accent)', color: '#0C0C10',
    border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer',
    fontFamily: 'var(--font-body)',
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
      setStage({ kind: 'concept', ci: ci + 1 })
      onProgress({ concept_index: ci + 1 })
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
    return (
      <div>
        <ConceptSection heading={c.heading} body={c.body} index={stage.ci} total={lecture.concepts.length} />
        <button style={btnStyle} onClick={() => afterConcept(stage.ci)}>
          {miniMap[stage.ci]?.length ? 'Quick Check →' : stage.ci + 1 < lecture.concepts.length ? 'Next →' : 'Start Quiz →'}
        </button>
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
          <a href={`/lecture/${nextLectureId}`} style={{
            display: 'inline-flex', alignItems: 'center', padding: '10px 24px', minHeight: 44,
            background: 'var(--accent)', color: '#0C0C10', borderRadius: 8, textDecoration: 'none', fontWeight: 600,
            fontFamily: 'var(--font-body)',
          }}>Sonraki Ders →</a>
        )}
        <a href="/dashboard" style={{
          display: 'inline-flex', alignItems: 'center', padding: '10px 24px', minHeight: 44,
          border: '1px solid var(--border-default)', color: 'var(--text-secondary)',
          borderRadius: 8, textDecoration: 'none', fontSize: '0.9rem',
        }}>← Dashboard</a>
      </div>
    </div>
  )
}
