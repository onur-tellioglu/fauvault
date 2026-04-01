// src/app/[course]/exam-prep/[id]/page.tsx
import { redirect, notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { isValidCourse, type Course } from '@/lib/courses'
import { getExamPrepExam } from '@/lib/exam-prep'
import { ExamClient } from './ExamClient'

export default async function ExamPage({
  params,
}: {
  params: Promise<{ course: string; id: string }>
}) {
  const { course, id } = await params
  if (!isValidCourse(course)) notFound()

  const session = await getSession()
  if (!session) redirect('/')

  const exam = getExamPrepExam(course as Course, id)
  if (!exam) notFound()

  return (
    <ExamClient
      exam={exam}
      course={course as Course}
      backHref={`/${course}/exam-prep`}
    />
  )
}
