import type { Metadata } from 'next'
import { getSession } from '@/lib/auth'

export const metadata: Metadata = { title: 'Sign In' }
import { AuthForm } from '@/components/layout/AuthForm'
import { COURSES, COURSE_SLUGS, type Course } from '@/lib/courses'
import { getProgress } from '@/lib/progress'
import { getRankForUser } from '@/lib/leaderboard'
import { ProgressRing } from '@/components/dashboard/ProgressRing'
import Link from 'next/link'

export default async function HomePage() {
  const session = await getSession()

  if (session) {
    // Fetch progress + rank for all courses in parallel
    const courseData = await Promise.all(
      COURSE_SLUGS.map(async (slug) => {
        const [rows, rank] = await Promise.all([
          getProgress(session.userId, slug as Course),
          getRankForUser(session.userId, slug as Course),
        ])
        const completed = rows.filter(r => r.completed_at).length
        const total = COURSES[slug].content.lectures.length
        return { slug, completed, total, rank }
      })
    )

    return (
      <main style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ animation: 'fadeSlideUp 300ms ease forwards', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Choose a course
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>
            Welcome back, {session.username}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {courseData.map(({ slug, completed, total, rank }) => (
              <Link key={slug} href={`/${slug}/dashboard`} style={{
                padding: '1.5rem', border: '1px solid var(--border-default)', borderRadius: 12,
                textDecoration: 'none', background: 'var(--bg-surface)', minWidth: 200,
                transition: 'border-color 150ms ease', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
              }}>
                <ProgressRing value={total > 0 ? completed / total : 0} size={64} />
                <div>
                  <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>
                    {COURSES[slug].shortLabel}
                  </div>
                  <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 500, marginBottom: 2 }}>
                    {COURSES[slug].label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {completed}/{total} lectures
                  </div>
                  {rank !== null && (
                    <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.7rem', color: 'var(--accent)', marginTop: 4 }}>
                      #{rank} on leaderboard
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
          <form action="/api/auth/logout" method="POST" style={{ marginTop: '2rem' }}>
            <button type="submit" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
              Sign out
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ animation: 'fadeSlideUp 300ms ease forwards' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.6rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 6 }}>
              Study App
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>AI Perspectives · Renewable Energies</p>
          </div>
          <AuthForm />
        </div>
      </div>
    </main>
  )
}
