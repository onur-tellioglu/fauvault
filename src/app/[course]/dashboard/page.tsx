import { redirect, notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { getProgress } from '@/lib/progress'
import { isValidCourse, getCourseContent, COURSES, type Course } from '@/lib/courses'
import { LectureCard } from '@/components/dashboard/LectureCard'
import { ProgressRing } from '@/components/dashboard/ProgressRing'
import { ExamCountdown } from '@/components/layout/ExamCountdown'
import Link from 'next/link'

export default async function DashboardPage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params
  if (!isValidCourse(course)) notFound()

  const session = await getSession()
  if (!session) redirect('/')

  const content = getCourseContent(course as Course)
  const rows = await getProgress(session.userId, course as Course)
  const byLecture = Object.fromEntries(rows.map(r => [r.lecture_id, r]))
  const completed = rows.filter(r => r.completed_at).length

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: 0 }}>
      <ExamCountdown />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '2.5rem 1.5rem' }}>

        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', animation: 'fadeSlideUp 250ms ease forwards' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 2 }}>
              {COURSES[course as Course].label}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              {session.username}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ textAlign: 'center' }}>
              <ProgressRing value={completed / content.lectures.length} size={60} />
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>
                {completed}/{content.lectures.length}
              </p>
            </div>
            <form action="/api/auth/logout" method="POST">
              <button type="submit" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
                Sign out
              </button>
            </form>
          </div>
        </header>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Practice Mode', href: `/${course}/quiz` },
            { label: 'Study Mode', href: `/${course}/study` },
            { label: 'Leaderboard', href: '/leaderboard' },
            { label: 'Profile', href: '/profile' },
          ].map(({ label, href }) => (
            <Link key={href} href={href} style={{
              padding: '9px 18px', border: '1px solid var(--border-default)', borderRadius: 7,
              color: 'var(--text-secondary)', fontSize: '0.82rem', textDecoration: 'none',
              background: 'var(--bg-surface)', transition: 'border-color 150ms ease',
              minHeight: 44, display: 'inline-flex', alignItems: 'center',
            }}>{label}</Link>
          ))}
        </div>

        <div className="lecture-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.875rem' }}>
          {content.lectures.map((lecture, i) => (
            <div key={lecture.id} style={{ animation: `fadeSlideUp 300ms ease ${i * 30}ms both` }}>
              <LectureCard lecture={lecture} progress={byLecture[lecture.id]} course={course as Course} />
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}
