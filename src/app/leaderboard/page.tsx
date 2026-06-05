import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { getLeaderboard, totalLectures } from '@/lib/leaderboard'
import Link from 'next/link'
import LeaderboardTable from '@/components/layout/LeaderboardTable'

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
          <LeaderboardTable rows={rows} currentUsername={session.username} totalLectures={totalLectures} />
        )}

      </div>
    </main>
  )
}
