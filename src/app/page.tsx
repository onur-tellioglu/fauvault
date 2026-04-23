import type { Metadata } from 'next'
import { getSession } from '@/lib/auth'
import { AuthForm } from '@/components/layout/AuthForm'
import { COURSES, COURSE_SLUGS, type Course } from '@/lib/courses'
import { getProgress } from '@/lib/progress'
import { getRankForUser } from '@/lib/leaderboard'
import { CoursePicker } from '@/components/layout/CoursePicker'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function generateMetadata(): Promise<Metadata> {
  const session = await getSession()
  return { title: session ? 'Choose a Course' : 'Sign In' }
}

function getAppVersion(): string {
  try {
    const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'))
    return pkg.version ?? '0.0.0'
  } catch {
    return '0.0.0'
  }
}

export default async function HomePage() {
  const session = await getSession()

  if (session) {
    const courses = await Promise.all(
      COURSE_SLUGS.map(async (slug) => {
        const [rows, rank] = await Promise.all([
          getProgress(session.userId, slug as Course),
          getRankForUser(session.userId, slug as Course),
        ])
        const completed = rows.filter(r => r.completed_at).length
        const total = COURSES[slug].content.lectures.length
        return {
          slug,
          shortLabel: COURSES[slug].shortLabel,
          label: COURSES[slug].label,
          completed,
          total,
          rank,
        }
      })
    )

    return (
      <CoursePicker
        username={session.username}
        appVersion={getAppVersion()}
        courses={courses}
      />
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
