import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { getLeaderboard } from '@/lib/leaderboard'
import { content } from '@/lib/content'
import Link from 'next/link'

export default async function LeaderboardPage() {
  const session = await getSession()
  if (!session) redirect('/')

  const rows = await getLeaderboard()
  const totalLectures = content.lectures.length

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>

        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', animation: 'fadeSlideUp 250ms ease forwards' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 2 }}>
              Leaderboard
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              {rows.length} participant{rows.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link href="/dashboard" style={{
            fontSize: '0.82rem', color: 'var(--text-muted)', textDecoration: 'none',
            padding: '9px 18px', border: '1px solid var(--border-default)',
            borderRadius: 7, background: 'var(--bg-surface)',
          }}>
            ← Dashboard
          </Link>
        </header>

        {rows.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', marginTop: '4rem' }}>
            No one has completed a lecture yet. Be the first!
          </p>
        ) : (
          <div style={{ border: '1px solid var(--border-default)', borderRadius: 10, overflow: 'hidden', background: 'var(--bg-surface)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                  {['#', 'User', 'Completed', 'Score'].map(h => (
                    <th key={h} style={{
                      padding: '0.75rem 1rem', textAlign: h === '#' || h === 'Score' || h === 'Completed' ? 'center' : 'left',
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
                        {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: isMe ? 600 : 400 }}>
                        {row.username}{isMe ? ' (you)' : ''}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center', fontFamily: 'var(--font-geist-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {row.completed_count}/{totalLectures}
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
