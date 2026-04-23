import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { isValidCourse, COURSES, type Course } from '@/lib/courses'
import { getTips, getUserRole } from '@/lib/tips'
import { TipsClient } from './TipsClient'

export async function generateMetadata({ params }: { params: Promise<{ course: string }> }): Promise<Metadata> {
  const { course } = await params
  const shortLabel = isValidCourse(course) ? COURSES[course as Course].shortLabel : course.toUpperCase()
  return { title: `Tips · ${shortLabel}` }
}

export default async function TipsPage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params
  if (!isValidCourse(course)) notFound()

  const session = await getSession()
  const tips = await getTips(course as Course, session?.userId ?? null)
  const role = session ? await getUserRole(session.userId) : null

  return (
    <TipsClient
      course={course as Course}
      initialTips={tips}
      username={session?.username ?? null}
      isAdmin={role === 'admin'}
      courseLabel={COURSES[course as Course].label}
    />
  )
}
