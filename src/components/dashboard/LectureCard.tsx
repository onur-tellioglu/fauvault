import Link from 'next/link'
import type { Lecture } from '@/lib/types'
import type { ProgressRow } from '@/lib/progress'

type Props = { lecture: Lecture; progress?: ProgressRow }

export function LectureCard({ lecture, progress }: Props) {
  const done = !!progress?.completed_at
  const score = progress?.final_quiz_result?.score
  const conceptPct = progress ? Math.min(progress.concept_index / Math.max(lecture.concepts.length, 1), 1) : 0

  return (
    <Link href={`/lecture/${lecture.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <article style={{
        position: 'relative', background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
        borderRadius: 12, padding: '1.25rem 1.25rem 1rem', cursor: 'pointer', overflow: 'hidden',
        transition: 'border-color 150ms ease',
      }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-default)')}
      >
        <span style={{
          position: 'absolute', top: 4, right: 10,
          fontFamily: 'var(--font-fraunces)', fontSize: '4.5rem', fontWeight: 300,
          color: 'var(--border-subtle)', lineHeight: 1, userSelect: 'none',
        }}>{lecture.id}</span>

        {done && (
          <span style={{
            fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'var(--success)', background: 'var(--success-subtle)',
            border: '1px solid var(--success)', borderRadius: 4, padding: '2px 6px',
            display: 'inline-block', marginBottom: 8,
          }}>Complete</span>
        )}

        <h3 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.05rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 3, paddingRight: '2.5rem' }}>
          {lecture.title}
        </h3>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          {lecture.speaker} · {lecture.questions.length} questions
        </p>

        {score !== undefined && (
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.75rem', marginBottom: 8, color: score >= 0.9 ? 'var(--success)' : 'var(--accent)' }}>
            {Math.round(score * 100)}%
          </p>
        )}

        <div style={{ height: 3, background: 'var(--progress-bg)', borderRadius: 2 }}>
          <div style={{
            height: '100%', borderRadius: 2,
            background: done ? 'var(--success)' : 'linear-gradient(90deg, var(--accent-dim), var(--accent))',
            width: done ? '100%' : `${Math.round(conceptPct * 100)}%`,
            transition: 'width 400ms cubic-bezier(0.4,0,0.2,1)',
          }} />
        </div>

        <p style={{ fontSize: '0.7rem', color: done ? 'var(--success)' : progress ? 'var(--accent)' : 'var(--text-muted)', marginTop: 8 }}>
          {done ? 'Done ✓' : progress ? 'Continue →' : 'Not started'}
        </p>
      </article>
    </Link>
  )
}
