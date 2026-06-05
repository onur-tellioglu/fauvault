import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { getLeaderboard, totalLectures } from '@/lib/leaderboard'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Global Leaderboard' }

export default async function LeaderboardPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const rows = await getLeaderboard()

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>

        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', animation: 'fadeSlideUp 250ms ease forwards' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 2 }}>
              Leaderboard
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              {rows.length} participant{rows.length !== 1 ? 's' : ''} · all courses
            </p>
          </div>
          <Link href="/" style={{
            fontSize: '0.82rem', color: 'var(--text-muted)', textDecoration: 'none',
            padding: '9px 18px', border: '1px solid var(--border-default)',
            borderRadius: 7, background: 'var(--bg-surface)',
          }}>
            ← Home
          </Link>
        </header>

        {rows.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              No one has completed a lecture yet. Be the first!
            </p>
            <Link
              href="/"
              style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '9px 18px', border: '1px solid var(--border-default)',
                borderRadius: 7, background: 'var(--bg-surface)',
                color: 'var(--text-secondary)', fontSize: '0.85rem',
                textDecoration: 'none',
              }}
            >
              ← Go to dashboard
            </Link>
          </div>
        ) : (
          <div style={{ border: '1px solid var(--border-default)', borderRadius: 10, overflow: 'hidden', background: 'var(--bg-surface)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                  const isMe = row.username === session.username
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
    </main>
  )
}
