// src/app/[course]/exam-prep/[id]/ExamClient.tsx
'use client'

import { useState } from 'react'
import type { ExamPrepExam } from '@/lib/exam-prep'
import type { Course } from '@/lib/courses'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

type TaskAnswer = {
  mc: number | null
  numeric: string
}

type GradedTask = {
  mc: number | null
  numeric: number | null
  mc_correct: boolean
  numeric_correct: boolean
  points: number
}

type ResultPayload = {
  score: number
  maxScore: number
  graded: Record<string, GradedTask>
  tasks: ExamPrepExam['tasks']
}

type Props = {
  exam: ExamPrepExam
  course: Course
  backHref: string
}

export function ExamClient({ exam, course, backHref }: Props) {
  const [answers, setAnswers] = useState<Record<number, TaskAnswer>>(
    Object.fromEntries(exam.tasks.map(t => [t.id, { mc: null, numeric: '' }]))
  )
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<ResultPayload | null>(null)
  const [error, setError] = useState<string | null>(null)

  const setMc = (taskId: number, value: number) =>
    setAnswers(prev => ({ ...prev, [taskId]: { ...prev[taskId], mc: value } }))

  const setNumeric = (taskId: number, value: string) =>
    setAnswers(prev => ({ ...prev, [taskId]: { ...prev[taskId], numeric: value } }))

  async function handleSubmit() {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/exam-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course, examId: exam.id, answers }),
      })
      if (!res.ok) throw new Error('Submission failed')
      const data: ResultPayload = await res.json()
      setResult(data)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (result) {
    return (
      <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>

          <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 2 }}>
                Results
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                {exam.title}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {result.score}/{result.maxScore}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>points</p>
            </div>
          </header>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {result.tasks.map(task => {
              const g = result.graded[task.id]
              const pointColor = g.points === 2 ? 'var(--color-success, #22c55e)' : g.points === 1 ? 'var(--color-warn, #f59e0b)' : 'var(--color-error, #ef4444)'
              return (
                <div key={task.id} style={{
                  border: '1px solid var(--border-default)', borderRadius: 10,
                  background: 'var(--bg-surface)', padding: '1.25rem 1.5rem',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', flex: 1, marginRight: '1rem' }}>
                      <strong>Task {task.id}:</strong> {task.text}
                    </p>
                    <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '1rem', fontWeight: 700, color: pointColor, whiteSpace: 'nowrap' }}>
                      {g.points}/2 pts
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                    <div style={{ background: 'var(--bg-base)', borderRadius: 6, padding: '0.5rem 0.75rem' }}>
                      <p style={{ color: 'var(--text-muted)', marginBottom: 2 }}>Your MC choice</p>
                      <p style={{ color: g.mc_correct ? 'var(--color-success, #22c55e)' : 'var(--text-secondary)', fontFamily: 'var(--font-geist-mono)' }}>
                        {g.mc !== null ? `${g.mc} ${task.unit}` : '—'} {g.mc_correct ? '✓' : g.mc !== null ? '✗' : ''}
                      </p>
                    </div>
                    <div style={{ background: 'var(--bg-base)', borderRadius: 6, padding: '0.5rem 0.75rem' }}>
                      <p style={{ color: 'var(--text-muted)', marginBottom: 2 }}>Your numeric answer</p>
                      <p style={{ color: g.numeric_correct ? 'var(--color-success, #22c55e)' : 'var(--text-secondary)', fontFamily: 'var(--font-geist-mono)' }}>
                        {g.numeric !== null ? `${g.numeric} ${task.unit}` : '—'} {g.numeric_correct ? '✓' : g.numeric !== null ? '✗' : ''}
                      </p>
                    </div>
                  </div>
                  <div style={{ background: 'var(--bg-base)', borderRadius: 6, padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: 2 }}>Correct answer</p>
                    <p style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-geist-mono)', marginBottom: 4 }}>
                      {task.answer} {task.unit} (±{Math.round(task.tolerance * 100)}%)
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>{task.explanation}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => { setResult(null); setAnswers(Object.fromEntries(exam.tasks.map(t => [t.id, { mc: null, numeric: '' }]))) }}
              style={{ padding: '9px 18px', border: '1px solid var(--border-default)', borderRadius: 7, background: 'var(--bg-surface)', color: 'var(--text-secondary)', fontSize: '0.82rem', cursor: 'pointer' }}
            >
              Try Again
            </button>
            <Link href={backHref} style={{ padding: '9px 18px', border: '1px solid var(--border-default)', borderRadius: 7, background: 'var(--bg-surface)', color: 'var(--text-secondary)', fontSize: '0.82rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              ← All Exams
            </Link>
          </div>

        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', animation: 'fadeSlideUp 250ms ease forwards' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 2 }}>
              {exam.title}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              {exam.tasks.length} tasks · {exam.tasks.length * 2} pts max · no time limit
            </p>
          </div>
          <Link href={backHref} style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textDecoration: 'none', padding: '9px 18px', border: '1px solid var(--border-default)', borderRadius: 7, background: 'var(--bg-surface)' }}>
            ← Back
          </Link>
        </header>

        {/* Scenario */}
        <div style={{ border: '1px solid var(--border-default)', borderRadius: 10, background: 'var(--bg-surface)', padding: '1.5rem', marginBottom: '2rem', animation: 'fadeSlideUp 250ms ease 50ms both' }}>
          <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-geist-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Scenario</p>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            <ReactMarkdown>{exam.scenario}</ReactMarkdown>
          </div>
        </div>

        {/* Tasks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {exam.tasks.map((task, i) => (
            <div
              key={task.id}
              style={{
                border: '1px solid var(--border-default)', borderRadius: 10,
                background: 'var(--bg-surface)', padding: '1.25rem 1.5rem',
                animation: `fadeSlideUp 300ms ease ${100 + i * 50}ms both`,
              }}
            >
              <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500, marginBottom: '1rem' }}>
                Task {task.id}: {task.text}
              </p>

              {/* Multiple choice */}
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-geist-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Choose one</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginBottom: '1rem' }}>
                {task.choices.map(choice => (
                  <label
                    key={choice}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      padding: '8px 12px', borderRadius: 7, cursor: 'pointer',
                      border: `1px solid ${answers[task.id]?.mc === choice ? 'var(--border-active, var(--text-primary))' : 'var(--border-default)'}`,
                      background: answers[task.id]?.mc === choice ? 'var(--bg-highlight, rgba(255,255,255,0.06))' : 'var(--bg-base)',
                      transition: 'border-color 100ms ease, background 100ms ease',
                    }}
                  >
                    <input
                      type="radio"
                      name={`mc-${task.id}`}
                      value={choice}
                      checked={answers[task.id]?.mc === choice}
                      onChange={() => setMc(task.id, choice)}
                      style={{ accentColor: 'var(--text-primary)' }}
                    />
                    <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {choice.toLocaleString()} {task.unit}
                    </span>
                  </label>
                ))}
              </div>

              {/* Numeric input */}
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-geist-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                Or enter your answer (±{Math.round(task.tolerance * 100)}% tolerance)
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="number"
                  step="any"
                  value={answers[task.id]?.numeric ?? ''}
                  onChange={e => setNumeric(task.id, e.target.value)}
                  placeholder="0"
                  style={{
                    width: 160, padding: '8px 12px', borderRadius: 7,
                    border: '1px solid var(--border-default)', background: 'var(--bg-base)',
                    color: 'var(--text-primary)', fontFamily: 'var(--font-geist-mono)', fontSize: '0.875rem',
                    outline: 'none',
                  }}
                />
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-geist-mono)' }}>
                  {task.unit}
                </span>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <p style={{ color: 'var(--color-error, #ef4444)', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={submitting}
          style={{
            padding: '12px 32px', borderRadius: 8, border: 'none', cursor: submitting ? 'not-allowed' : 'pointer',
            background: 'var(--text-primary)', color: 'var(--bg-base)',
            fontSize: '0.9rem', fontWeight: 600, opacity: submitting ? 0.6 : 1,
          }}
        >
          {submitting ? 'Submitting…' : 'Submit Exam'}
        </button>

      </div>
    </main>
  )
}
