import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { isValidCourse, getCourseContent, COURSES, type Course } from '@/lib/courses'
import { getProgress } from '@/lib/progress'
import { LectureCard } from '@/components/dashboard/LectureCard'

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
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'var(--density-pad)' }}>
      <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
        All Lectures · {content.lectures.length} total
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--density-gap)' }}>
        {content.lectures.map(lecture => (
          <LectureCard
            key={lecture.id}
            lecture={lecture}
            progress={byLecture[lecture.id]}
            course={course as Course}
          />
        ))}
      </div>
    </div>
  )
}
