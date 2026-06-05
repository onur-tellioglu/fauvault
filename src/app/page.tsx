import type { Metadata } from 'next'
import { getSession } from '@/lib/auth'
import { COURSES, COURSE_SLUGS, type Course } from '@/lib/courses'
import { getProgress } from '@/lib/progress'
import { getRankForUser } from '@/lib/leaderboard'
import { CoursePicker } from '@/components/layout/CoursePicker'
import { PublicCourseList } from '@/components/layout/PublicCourseList'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function generateMetadata(): Promise<Metadata> {
  const session = await getSession()
  return { title: session ? 'Choose a Course' : 'FAUVault — Study Smarter' }
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

  return <PublicCourseList />
}
