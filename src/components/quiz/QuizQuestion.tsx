'use client'
import { useState, useMemo } from 'react'
import type { Question } from '@/lib/types'
import { QuizOption } from './QuizOption'
import { ExplanationBox } from './ExplanationBox'
import { scoreSingleQuestion } from '@/lib/scoring'
import { shuffleIndices } from '@/lib/shuffle'

const LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

type Props = {
  question: Question
  onAnswer: (selected: number[], score: number) => void
  questionIndex?: number
  totalQuestions?: number
}

export function QuizQuestion({ question, onAnswer, questionIndex, totalQuestions }: Props) {
  // shuffleMap[displayIdx] = originalIdx — recomputed only when question changes
  const shuffleMap = useMemo(
    () => question.shuffle === false
      ? question.options.map((_, i) => i)   // identity — no shuffle
      : shuffleIndices(question.options.length),
    [question.id, question.options.length, question.shuffle]
  )

  const displayOptions = shuffleMap.map(orig => question.options[orig])
  // display indices that are correct answers
  const displayCorrect = new Set(question.correct.map(orig => shuffleMap.indexOf(orig)))

  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [submitted, setSubmitted] = useState(false)

  function toggle(i: number) {
    if (submitted) return
    setSelected(prev => {
      if (question.type === 'single') return new Set([i])
      const next = new Set(prev)
      if (next.has(i)) { next.delete(i) } else { next.add(i) }
      return next
    })
  }

  function submit() {
    if (selected.size === 0 || submitted) return
    // remap display indices → original indices for scoring
    const originalSelected = [...selected].map(displayIdx => shuffleMap[displayIdx])
    const score = scoreSingleQuestion(question.correct, originalSelected, question.type, question.options.length)
    setSubmitted(true)
    onAnswer(originalSelected, score)
  }

  function stateFor(i: number): 'default' | 'selected' | 'correct' | 'wrong' | 'missed' {
    if (!submitted) return selected.has(i) ? 'selected' : 'default'
    const isCorrect = displayCorrect.has(i)
    const picked = selected.has(i)
    if (isCorrect && picked) return 'correct'
    if (!isCorrect && picked) return 'wrong'
    if (isCorrect && !picked) return 'missed'
    return 'default'
  }

  return (
    <div>
      {totalQuestions != null && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>
            Q {(questionIndex ?? 0) + 1} / {totalQuestions}
            {question.type === 'multiple' && (
              <span style={{ marginLeft: 10, color: 'var(--accent)', background: 'var(--accent-subtle)', borderRadius: 4, padding: '1px 7px', fontSize: '0.68rem' }}>
                Multiple correct
              </span>
            )}
          </p>
        </div>
      )}

      <p style={{ fontSize: '0.975rem', color: 'var(--text-primary)', lineHeight: 1.65, marginBottom: '1.125rem' }}>
        {question.text}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {displayOptions.map((opt, i) => (
          <QuizOption key={i} label={LABELS[i]} text={opt} state={stateFor(i)} onClick={() => toggle(i)} disabled={submitted} />
        ))}
      </div>

      {!submitted && (
        <button onClick={submit} disabled={selected.size === 0} style={{
          marginTop: '1.125rem', padding: '10px 22px',
          background: selected.size > 0 ? 'var(--accent)' : 'var(--bg-elevated)',
          color: selected.size > 0 ? '#0C0C10' : 'var(--text-muted)',
          border: 'none', borderRadius: 8, fontWeight: 600, cursor: selected.size > 0 ? 'pointer' : 'default',
          transition: 'all 150ms ease', fontFamily: 'var(--font-body)',
        }}>
          Submit
        </button>
      )}

      {submitted && question.explanation && <ExplanationBox text={question.explanation} />}
    </div>
  )
}
