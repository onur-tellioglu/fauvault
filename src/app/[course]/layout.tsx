import { redirect, notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { isValidCourse, COURSES, type Course } from '@/lib/courses'
import { CourseShell } from '@/components/layout/CourseShell'
import { version } from '../../../package.json'

export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ course: string }>
}) {
  const { course } = await params
  if (!isValidCourse(course)) notFound()

  const session = await getSession()
  if (!session) redirect('/')

  const courseData = COURSES[course as Course]
  const hasFlashcards = courseData.content.lectures.some(
    (l: { flashcards?: unknown[] }) => l.flashcards?.length
  )

  return (
    <CourseShell
      courseSlug={course}
      courseLabel={courseData.label}
      username={session.username}
      hasFlashcards={hasFlashcards}
      appVersion={version}
    >
      {children}
    </CourseShell>
  )
}
