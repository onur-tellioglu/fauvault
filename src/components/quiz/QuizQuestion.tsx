'use client'
import { useState } from 'react'
import type { Question } from '@/lib/types'
import { QuizOption } from './QuizOption'
import { ExplanationBox } from './ExplanationBox'
import { scoreSingleQuestion } from '@/lib/scoring'

const LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

type Props = {
  question: Question
  onAnswer: (selected: number[], score: number) => void
  questionIndex?: number
  totalQuestions?: number
  flagged?: boolean
  onFlag?: () => void
}

export function QuizQuestion({ question, onAnswer, questionIndex, totalQuestions, flagged, onFlag }: Props) {
  const [selected, setSelected] = useState<number[]>([])
  const [submitted, setSubmitted] = useState(false)

  function toggle(i: number) {
    if (submitted) return
    setSelected(prev =>
      question.type === 'single' ? [i] :
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    )
  }

  function submit() {
    if (selected.length === 0 || submitted) return
    const score = scoreSingleQuestion(question.correct, selected, question.type, question.options.length)
    setSubmitted(true)
    onAnswer(selected, score)
  }

  function stateFor(i: number): 'default' | 'selected' | 'correct' | 'wrong' | 'missed' {
    if (!submitted) return selected.includes(i) ? 'selected' : 'default'
    const isCorrect = question.correct.includes(i)
    const picked = selected.includes(i)
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
          {onFlag && (
            <button
              onClick={onFlag}
              title={flagged ? 'İşareti kaldır' : 'İşaretle'}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '1.1rem', opacity: flagged ? 1 : 0.35,
                transition: 'opacity 150ms ease', padding: '2px 6px',
              }}
            >
              🚩
            </button>
          )}
        </div>
      )}

      <p style={{ fontSize: '0.975rem', color: 'var(--text-primary)', lineHeight: 1.65, marginBottom: '1.125rem' }}>
        {question.text}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {question.options.map((opt, i) => (
          <QuizOption key={i} label={LABELS[i]} text={opt} state={stateFor(i)} onClick={() => toggle(i)} disabled={submitted} />
        ))}
      </div>

      {!submitted && (
        <button onClick={submit} disabled={selected.length === 0} style={{
          marginTop: '1.125rem', padding: '10px 22px',
          background: selected.length > 0 ? 'var(--accent)' : 'var(--bg-elevated)',
          color: selected.length > 0 ? '#0C0C10' : 'var(--text-muted)',
          border: 'none', borderRadius: 8, fontWeight: 600, cursor: selected.length > 0 ? 'pointer' : 'default',
          transition: 'all 150ms ease', fontFamily: 'var(--font-body)',
        }}>
          Submit
        </button>
      )}

      {submitted && question.explanation && <ExplanationBox text={question.explanation} />}
    </div>
  )
}
