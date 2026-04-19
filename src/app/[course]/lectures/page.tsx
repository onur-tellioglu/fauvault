import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { isValidCourse, getCourseContent, COURSES, type Course } from '@/lib/courses'
import { getProgress } from '@/lib/progress'
import { LecturesClient } from './LecturesClient'

export async function generateMetadata({ params }: { params: Promise<{ course: string }> }): Promise<Metadata> {
  const { course } = await params
  const shortLabel = isValidCourse(course) ? COURSES[course as Course].shortLabel : course.toUpperCase()
  return { title: `Lectures · ${shortLabel}` }
}

export default async function LecturesPage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params
  if (!isValidCourse(course)) notFound()

  const session = await getSession()
  if (!session) redirect('/')

  const content = getCourseContent(course as Course)
  const progressRows = await getProgress(session.userId, course as Course)
  const byLecture = Object.fromEntries(progressRows.map(r => [r.lecture_id, r]))

  return (
    <LecturesClient
      course={course as Course}
      lectures={content.lectures}
      byLecture={byLecture}
      totalCount={content.lectures.length}
    />
  )
}
