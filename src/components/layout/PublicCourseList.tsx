// src/components/layout/PublicCourseList.tsx
import Link from 'next/link'
import { COURSES, COURSE_SLUGS } from '@/lib/courses'

export function PublicCourseList() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', fontFamily: 'var(--font-geist)' }}>

      {/* Masthead */}
      <header style={{ borderBottom: '1px solid var(--border-default)', padding: '2.25rem 2.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{
              fontFamily: 'var(--font-geist-mono)', fontSize: '0.65rem',
              color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>
              The FAUVault Daily
            </span>
            <Link
              href="/login"
              style={{
                fontSize: '0.82rem', fontFamily: 'var(--font-geist-mono)',
                color: '#0C0C10', background: 'var(--accent)',
                padding: '6px 14px', borderRadius: 6, textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Sign In
            </Link>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-fraunces)',
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            fontWeight: 300, lineHeight: 1.0,
            color: 'var(--text-primary)', margin: '0.25rem 0', letterSpacing: '-0.01em',
          }}>
            Choose a{' '}
            <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>course</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Sign in to track your progress
          </p>
        </div>
      </header>

      {/* Course Cards */}
      <main style={{ maxWidth: 700, margin: '0 auto', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {COURSE_SLUGS.map((slug) => {
          const course = COURSES[slug]
          const total = course.content.lectures.length
          return (
            <Link
              key={slug}
              href={`/${slug}/lectures`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                padding: '1.5rem 1.75rem',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                borderRadius: 12,
                textDecoration: 'none',
              }}
            >
              {/* Placeholder ring — static empty circle */}
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                border: '3px solid var(--border-default)',
                flexShrink: 0,
              }} />
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: 'var(--font-geist-mono)', fontSize: '0.65rem',
                  color: 'var(--text-muted)', textTransform: 'uppercase',
                  letterSpacing: '0.08em', marginBottom: 2,
                }}>
                  {course.shortLabel}
                </div>
                <div style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 500, marginBottom: 2 }}>
                  {course.label}
                </div>
                <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  {total} lectures
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>→</div>
            </Link>
          )
        })}
      </main>
    </div>
  )
}
