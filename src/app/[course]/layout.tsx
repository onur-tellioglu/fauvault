import { notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { isValidCourse, COURSES, type Course } from '@/lib/courses'
import { CourseShell } from '@/components/layout/CourseShell'
import { AuthModalProvider } from '@/components/layout/AuthModalContext'
import { AuthModal } from '@/components/layout/AuthModal'
import { GuestCarryOverPrompt } from '@/components/layout/GuestCarryOverPrompt'
import { getExamPrepExams } from '@/lib/exam-prep'
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

  const courseData = COURSES[course as Course]
  const hasFlashcards = courseData.content.lectures.some(
    (l: { flashcards?: unknown[] }) => l.flashcards?.length
  )
  const hasExamPrep = getExamPrepExams(course as Course).length > 0

  return (
    <AuthModalProvider>
      <CourseShell
        courseSlug={course}
        courseLabel={courseData.label}
        username={session?.username ?? null}
        hasFlashcards={hasFlashcards}
        hasExamPrep={hasExamPrep}
        appVersion={version}
      >
        {children}
      </CourseShell>
      <AuthModal />
      <GuestCarryOverPrompt />
    </AuthModalProvider>
  )
}
