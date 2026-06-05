import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { isValidCourse, getCourseContent, COURSES, type Course } from '@/lib/courses'
import { getProgress } from '@/lib/progress'
import { getLectureVideos, type CourseVideos } from '@/lib/lecture-videos'
import { LecturesClient } from './LecturesClient'

export async function generateMetadata({ params }: { params: Promise<{ course: string }> }): Promise<Metadata> {
  const { course } = await params
  const shortLabel = isValidCourse(course) ? COURSES[course as Course].shortLabel : course.toUpperCase()
  return { title: `Lectures · ${shortLabel}` }
}

export default async function LecturesPage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params
  if (!isValidCourse(course)) notFound()

  const content = getCourseContent(course as Course)
  const session = await getSession()

  let byLecture: Record<number, { lecture_id: number; concept_index?: number | null; completed_at?: string | null; final_quiz_result?: unknown }> = {}
  // Lecture recording URLs are gated behind auth: only authenticated users
  // receive them in the rendered HTML/props. Guests get `undefined`.
  let videos: CourseVideos | undefined
  if (session) {
    const rows = await getProgress(session.userId, course as Course)
    byLecture = Object.fromEntries(rows.map(r => [r.lecture_id, r]))
    videos = getLectureVideos(course as Course)
  }

  return (
    <LecturesClient
      course={course as Course}
      lectures={content.lectures}
      byLecture={byLecture}
      totalCount={content.lectures.length}
      videos={videos}
    />
  )
}
