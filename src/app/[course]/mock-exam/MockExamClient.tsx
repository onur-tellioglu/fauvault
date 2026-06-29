'use client'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import type { MockExam, MockPart, MockChoiceTask, MockCalcTask, MockOpenTask } from '@/lib/mock-exam'
import type { Question } from '@/lib/types'
import { QuizQuestion } from '@/components/quiz/QuizQuestion'

const EXAM_SECONDS = 90 * 60

function Markdown({ children }: { children: string }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>{children}</ReactMarkdown>
}

// ---- choice task: reuse QuizQuestion, report earned points ----
function ChoiceTaskView({ task, onScore }: { task: MockChoiceTask; onScore: (pts: number) => void }) {
  const question: Question = useMemo(() => ({
    id: task.id, text: task.text, options: task.options, correct: task.correct,
    explanation: task.explanation, type: task.type, conceptIndex: 0,
  }), [task])
  return (
    <div>
      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-geist-mono)', marginBottom: 8 }}>{task.points} pts</p>
      <QuizQuestion question={question} onAnswer={(_sel, score) => onScore(score * task.points)} />
    </div>
  )
}

// ---- calc task: numeric input + tolerance check + worked solution reveal ----
function CalcTaskView({ task, onScore }: { task: MockCalcTask; onScore: (pts: number) => void }) {
  const [value, setValue] = useState('')
  const [checked, setChecked] = useState(false)
  const num = parseFloat(value)
  const ok = Number.isFinite(num) && (task.tolerance === 0
    ? Math.abs(num - task.answer) < 1e-9
    : Math.abs(num - task.answer) <= Math.max(Math.abs(task.answer) * task.tolerance, 1e-9))
  function check() {
    if (checked) return
    setChecked(true)
    onScore(ok ? task.points : 0)
  }
  return (
    <div>
      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-geist-mono)', marginBottom: 8 }}>{task.points} pts · calculation</p>
      <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: 12 }}>{task.text}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input type="number" step="any" value={value} disabled={checked}
          onChange={e => setValue(e.target.value)} placeholder="0"
          style={{ width: 160, padding: '8px 12px', borderRadius: 7, border: '1px solid var(--border-default)', background: 'var(--bg-base)', color: 'var(--text-primary)', fontFamily: 'var(--font-geist-mono)' }} />
        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-geist-mono)' }}>{task.unit}</span>
        {!checked && <button onClick={check} disabled={value === ''} style={{ padding: '8px 18px', borderRadius: 7, border: 'none', background: 'var(--accent)', color: '#0C0C10', fontWeight: 600, cursor: value === '' ? 'default' : 'pointer' }}>Check</button>}
      </div>
      {checked && (
        <div style={{ marginTop: 12, padding: '0.75rem 1rem', borderRadius: 8, background: 'var(--bg-base)', border: '1px solid var(--border-default)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          <p style={{ color: ok ? 'var(--color-success, #22c55e)' : 'var(--color-error, #ef4444)', fontFamily: 'var(--font-geist-mono)', marginBottom: 6 }}>
            {ok ? '✓ Correct' : `✗ Answer: ${task.answer} ${task.unit}`}
          </p>
          <Markdown>{task.workedSolution}</Markdown>
        </div>
      )}
    </div>
  )
}

// ---- open task: reveal model answer + self-rate ----
function OpenTaskView({ task, onScore }: { task: MockOpenTask; onScore: (pts: number) => void }) {
  const [revealed, setRevealed] = useState(false)
  const [rated, setRated] = useState(false)
  function rate(fraction: number) {
    if (rated) return
    setRated(true)
    onScore(task.points * fraction)
  }
  return (
    <div>
      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-geist-mono)', marginBottom: 8 }}>{task.points} pts · open / self-assessed</p>
      <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: 12 }}>{task.text}</p>
      {task.image && (
        <div style={{ position: 'relative', width: '100%', maxWidth: 480, height: 320, marginBottom: 12 }}>
          <Image src={task.image} alt={`Diagram for task ${task.id}`} fill style={{ objectFit: 'contain', borderRadius: 8, background: '#fff' }} />
        </div>
      )}
      {!revealed
        ? <button onClick={() => setRevealed(true)} style={{ padding: '8px 18px', borderRadius: 7, border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reveal model answer</button>
        : (
          <div style={{ padding: '0.75rem 1rem', borderRadius: 8, background: 'var(--bg-base)', border: '1px solid var(--border-default)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <Markdown>{task.modelAnswer}</Markdown>
            {!rated && (
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>How did you do?</span>
                {([['Got it', 1], ['Partly', 0.5], ['Missed', 0]] as const).map(([label, f]) => (
                  <button key={label} onClick={() => rate(f)} style={{ padding: '5px 12px', borderRadius: 6, border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-secondary)', fontSize: '0.75rem', cursor: 'pointer' }}>{label}</button>
                ))}
              </div>
            )}
          </div>
        )}
    </div>
  )
}

export function MockExamClient({ exam, backHref }: { exam: MockExam; backHref: string }) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [started, setStarted] = useState(false)
  const [remaining, setRemaining] = useState(EXAM_SECONDS)
  const [earned, setEarned] = useState<Record<string, number>>({})

  useEffect(() => {
    if (!started) return
    const id = setInterval(() => setRemaining(r => Math.max(0, r - 1)), 1000)
    return () => clearInterval(id)
  }, [started])

  const activeParts = exam.parts.filter(p => selected.has(p.id))
  const setScore = (taskId: string, pts: number) => setEarned(prev => ({ ...prev, [taskId]: pts }))
  const partEarned = (p: MockPart) => p.tasks.reduce((a, t) => a + (earned[t.id] ?? 0), 0)
  const totalEarned = activeParts.reduce((a, p) => a + partEarned(p), 0)

  function toggle(id: string) {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else if (next.size < 3) next.add(id)
      return next
    })
  }

  // ---- Part-selection screen ----
  if (!started) {
    return (
      <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Link href={backHref} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none' }}>← Back</Link>
          <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--text-primary)', margin: '1rem 0 0.25rem' }}>Mock Exam</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            90 minutes · 90 points · choose <strong>3 of 4</strong> parts (just like the real exam).
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {exam.parts.map(p => {
              const on = selected.has(p.id)
              const disabled = !on && selected.size >= 3
              return (
                <button key={p.id} onClick={() => toggle(p.id)} disabled={disabled}
                  style={{ textAlign: 'left', padding: '1rem 1.25rem', borderRadius: 10, cursor: disabled ? 'not-allowed' : 'pointer',
                    border: `1px solid ${on ? 'var(--accent)' : 'var(--border-default)'}`,
                    background: on ? 'var(--accent-subtle)' : 'var(--bg-surface)', opacity: disabled ? 0.5 : 1 }}>
                  <p style={{ fontSize: '0.92rem', fontWeight: 500, color: 'var(--text-primary)' }}>{p.title}</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-geist-mono)' }}>{p.points} pts · {p.tasks.length} tasks</p>
                </button>
              )
            })}
          </div>
          <button onClick={() => setStarted(true)} disabled={selected.size !== 3}
            style={{ padding: '12px 32px', borderRadius: 8, border: 'none', background: selected.size === 3 ? 'var(--text-primary)' : 'var(--bg-elevated)', color: selected.size === 3 ? 'var(--bg-base)' : 'var(--text-muted)', fontWeight: 600, cursor: selected.size === 3 ? 'pointer' : 'default' }}>
            Start ({selected.size}/3 parts)
          </button>
        </div>
      </main>
    )
  }

  // ---- Exam screen ----
  const mm = String(Math.floor(remaining / 60)).padStart(2, '0')
  const ss = String(remaining % 60).padStart(2, '0')
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <header style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--bg-base)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-default)' }}>
          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{totalEarned.toFixed(1)} / 90 pts</span>
          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '1.1rem', fontWeight: 700, color: remaining < 300 ? 'var(--error)' : 'var(--accent)' }}>
            {remaining === 0 ? "Time's up" : `${mm}:${ss}`}
          </span>
        </header>

        {activeParts.map(part => (
          <section key={part.id} style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
              <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.3rem', fontWeight: 400, color: 'var(--text-primary)' }}>{part.title}</h2>
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.8rem', color: 'var(--accent)' }}>{partEarned(part).toFixed(1)}/30</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {part.tasks.map(task => (
                <div key={task.id} style={{ border: '1px solid var(--border-default)', borderRadius: 10, background: 'var(--bg-surface)', padding: '1.25rem 1.5rem' }}>
                  {task.kind === 'choice' && <ChoiceTaskView task={task} onScore={pts => setScore(task.id, pts)} />}
                  {task.kind === 'calc' && <CalcTaskView task={task} onScore={pts => setScore(task.id, pts)} />}
                  {task.kind === 'open' && <OpenTaskView task={task} onScore={pts => setScore(task.id, pts)} />}
                </div>
              ))}
            </div>
          </section>
        ))}

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
          <Link href={backHref} style={{ padding: '9px 18px', border: '1px solid var(--border-default)', borderRadius: 7, background: 'var(--bg-surface)', color: 'var(--text-secondary)', fontSize: '0.82rem', textDecoration: 'none' }}>← Done</Link>
        </div>
      </div>
    </main>
  )
}
