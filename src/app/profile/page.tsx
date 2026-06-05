import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { getProgress } from '@/lib/progress'
import { COURSES, COURSE_SLUGS } from '@/lib/courses'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Profile' }

export default async function ProfilePage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const allProgress = (await Promise.all(
    COURSE_SLUGS.map(c => getProgress(session.userId, c).then(rows => rows.map(r => ({ ...r, course: c }))))
  )).flat()

  const completed = allProgress.filter(r => r.completed_at).length
  const scores = allProgress.map(r => r.final_quiz_result?.score).filter((s): s is number => s !== undefined && s !== null)
  const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
  const totalLectures = COURSE_SLUGS.reduce((sum, c) => sum + COURSES[c].content.lectures.length, 0)

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <Link href="/" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none' }}>← All Courses</Link>
        <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '2rem', fontWeight: 400, color: 'var(--text-primary)', margin: '0.75rem 0 1.5rem' }}>
          {session.username}
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem', marginBottom: '2rem' }}>
          {[
            { label: 'Completed', value: `${completed} / ${totalLectures}` },
            { label: 'Avg Score', value: scores.length ? `${Math.round(avg * 100)}%` : '—' },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 10, padding: '1rem 1.25rem' }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</p>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '1.5rem', color: 'var(--accent)', marginTop: 4 }}>{value}</p>
            </div>
          ))}
        </div>

        {COURSE_SLUGS.map(courseSlug => {
          const courseRows = allProgress.filter(r => r.course === courseSlug)
          const byLecture = Object.fromEntries(courseRows.map(r => [r.lecture_id, r]))
          return (
            <div key={courseSlug} style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                {COURSES[courseSlug].label}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {COURSES[courseSlug].content.lectures.map(l => {
                  const p = byLecture[l.id]
                  const score = p?.final_quiz_result?.score
                  return (
                    <a key={l.id} href={`/${courseSlug}/lecture/${l.id}`} style={{ textDecoration: 'none' }}>
                      <div className="profile-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 14px', background: 'var(--bg-surface)', borderRadius: 8, border: '1px solid var(--border-subtle)', transition: 'border-color 150ms ease' }}>
                        <span style={{ fontSize: '0.85rem', color: p?.completed_at ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                          {l.id}. {l.title}
                        </span>
                        {score !== undefined ? (
                          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.78rem', color: score >= 0.9 ? 'var(--success)' : score >= 0.7 ? 'var(--accent)' : 'var(--error)' }}>
                            {Math.round(score * 100)}%
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            {p ? 'In progress' : 'Not started'}
                          </span>
                        )}
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          )
        })}

      </div>
    </main>
  )
}
