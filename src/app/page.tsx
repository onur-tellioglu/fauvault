import { getSession } from '@/lib/auth'
import { AuthForm } from '@/components/layout/AuthForm'
import { COURSES, COURSE_SLUGS } from '@/lib/courses'
import Link from 'next/link'

export default async function HomePage() {
  const session = await getSession()

  if (session) {
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
            {COURSE_SLUGS.map(slug => (
              <Link key={slug} href={`/${slug}/dashboard`} style={{
                padding: '1.25rem 2rem', border: '1px solid var(--border-default)', borderRadius: 10,
                textDecoration: 'none', background: 'var(--bg-surface)', minWidth: 180,
                transition: 'border-color 150ms ease',
              }}>
                <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '1.5rem', color: 'var(--border-strong)', marginBottom: 4 }}>
                  {COURSES[slug].shortLabel}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                  {COURSES[slug].label}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  {COURSES[slug].content.lectures.length} lectures
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
