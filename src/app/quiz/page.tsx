'use client'
import { useState } from 'react'
import { content } from '@/lib/content'
import { QuizQuestion } from '@/components/quiz/QuizQuestion'

export default function QuizPage() {
  const [lectureId, setLectureId] = useState<number | 'all'>('all')
  const [qi, setQi] = useState(0)
  const [scores, setScores] = useState<number[]>([])
  const [answered, setAnswered] = useState(false)
  const [done, setDone] = useState(false)

  const questions = lectureId === 'all'
    ? content.lectures.flatMap(l => l.questions)
    : (content.lectures.find(l => l.id === lectureId)?.questions ?? [])

  async function handleAnswer(selected: number[], score: number) {
    setScores(prev => [...prev, score])
    setAnswered(true)
    if (lectureId !== 'all') {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lectureId,
          patch: {
            mini_quiz_results: {
              [questions[qi].id]: {
                answers: [selected],
                score,
                submittedAt: new Date().toISOString(),
              },
            },
          },
        }),
      })
    }
  }

  function next() {
    if (qi + 1 >= questions.length) { setDone(true); return }
    setQi(i => i + 1); setAnswered(false)
  }

  function reset() { setQi(0); setScores([]); setAnswered(false); setDone(false) }

  if (done) {
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length
    return (
      <main style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', animation: 'fadeSlideUp 300ms ease forwards' }}>
          <div style={{ fontFamily: 'var(--font-fraunces)', fontSize: '7rem', fontWeight: 300, color: 'var(--accent)', lineHeight: 1 }}>
            {Math.round(avg * 100)}%
          </div>
          <p style={{ color: 'var(--text-secondary)', marginTop: 10 }}>{scores.length} questions</p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '2rem' }}>
            <button onClick={reset} style={{ padding: '10px 22px', background: 'var(--accent)', color: '#0C0C10', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
              Try Again
            </button>
            <a href="/dashboard" style={{ padding: '10px 22px', border: '1px solid var(--border-default)', borderRadius: 8, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
              ← Dashboard
            </a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <a href="/dashboard" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none' }}>← Dashboard</a>
          <select
            value={lectureId}
            onChange={e => { setLectureId(e.target.value === 'all' ? 'all' : Number(e.target.value)); reset() }}
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', padding: '6px 10px', borderRadius: 6, fontSize: '0.8rem' }}
          >
            <option value="all">All Lectures</option>
            {content.lectures.map(l => <option key={l.id} value={l.id}>L{l.id} — {l.title}</option>)}
          </select>
        </div>

        {questions.length > 0 ? (
          <>
            <QuizQuestion
              key={questions[qi].id}
              question={questions[qi]}
              onAnswer={handleAnswer}
              questionIndex={qi}
              totalQuestions={questions.length}
            />
            {answered && (
              <button onClick={next} style={{ marginTop: '1.5rem', padding: '10px 22px', background: 'var(--accent)', color: '#0C0C10', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                {qi + 1 < questions.length ? 'Next →' : 'Results →'}
              </button>
            )}
          </>
        ) : (
          <p style={{ color: 'var(--text-muted)' }}>No questions available.</p>
        )}
      </div>
    </main>
  )
}
