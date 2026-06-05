import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { getLeaderboardByCourse } from '@/lib/leaderboard'
import { isValidCourse, COURSES, type Course } from '@/lib/courses'

export async function generateMetadata({ params }: { params: Promise<{ course: string }> }): Promise<Metadata> {
  const { course } = await params
  const shortLabel = isValidCourse(course) ? COURSES[course as Course].shortLabel : course.toUpperCase()
  return { title: `Leaderboard · ${shortLabel}` }
}

export default async function CourseLeaderboardPage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params
  if (!isValidCourse(course)) notFound()

  const session = await getSession()
  if (!session) redirect('/login')

  const rows = await getLeaderboardByCourse(course as Course)
  const totalLectures = COURSES[course as Course].content.lectures.length

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: 'var(--density-pad)' }}>

      <header style={{ marginBottom: '2rem', animation: 'fadeSlideUp 250ms ease forwards' }}>
        <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 2 }}>
          Leaderboard
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          {rows.length} participant{rows.length !== 1 ? 's' : ''} · {COURSES[course as Course].label}
        </p>
      </header>

        {rows.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              No one has completed a lecture yet. Be the first!
            </p>
            <Link
              href={`/${course}/lectures`}
              style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '9px 18px', border: '1px solid var(--border-default)',
                borderRadius: 7, background: 'var(--bg-surface)',
                color: 'var(--text-secondary)', fontSize: '0.85rem',
                textDecoration: 'none',
              }}
            >
              Start a lecture →
            </Link>
          </div>
        ) : (
          <div style={{ border: '1px solid var(--border-default)', borderRadius: 10, overflow: 'hidden', background: 'var(--bg-surface)' }}>
            <table className="leaderboard-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                  {['#', 'User', 'Completed', 'Semester', 'Score'].map(h => (
                    <th key={h} scope="col" style={{
                      padding: '0.75rem 1rem',
                      textAlign: h === '#' || h === 'Score' || h === 'Completed' ? 'center' : 'left',
                      fontSize: '0.75rem', fontFamily: 'var(--font-geist-mono)',
                      color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => {
                  const isMe = row.username === session?.username
                  return (
                    <tr
                      key={row.username}
                      style={{
                        borderBottom: i < rows.length - 1 ? '1px solid var(--border-subtle)' : undefined,
                        background: isMe ? 'var(--bg-highlight, rgba(255,255,255,0.04))' : undefined,
                        animation: `fadeSlideUp 300ms ease ${i * 25}ms both`,
                      }}
                    >
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center', fontFamily: 'var(--font-geist-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {i === 0 ? <span role="img" aria-label="Gold medal — 1st place">🥇</span>
                          : i === 1 ? <span role="img" aria-label="Silver medal — 2nd place">🥈</span>
                          : i === 2 ? <span role="img" aria-label="Bronze medal — 3rd place">🥉</span>
                          : i + 1}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: isMe ? 600 : 400 }}>
                        {row.username}{isMe ? ' (you)' : ''}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center', fontFamily: 'var(--font-geist-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {row.completed_count}/{totalLectures}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-geist-mono)', whiteSpace: 'nowrap' }}>
                        {row.first_semester ?? '—'}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center', fontFamily: 'var(--font-geist-mono)', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                        {row.score}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

    </div>
  )
}
