import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { getLeaderboardByCourse } from '@/lib/leaderboard'
import { isValidCourse, COURSES, type Course } from '@/lib/courses'
import LeaderboardTable from '@/components/layout/LeaderboardTable'

export async function generateMetadata({ params }: { params: Promise<{ course: string }> }): Promise<Metadata> {
  const { course } = await params
  const shortLabel = isValidCourse(course) ? COURSES[course as Course].shortLabel : course.toUpperCase()
  return { title: `Leaderboard · ${shortLabel}` }
}

export default async function CourseLeaderboardPage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params
  if (!isValidCourse(course)) notFound()

  const session = await getSession()
  if (!session) redirect('/login?callbackUrl=' + encodeURIComponent(`/${course}/leaderboard`))

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
          <LeaderboardTable rows={rows} currentUsername={session.username} totalLectures={totalLectures} tableClassName="leaderboard-table" />
        )}

    </div>
  )
}
