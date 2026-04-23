import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isValidCourse, type Course } from '@/lib/courses'
import { getExamPrepExam } from '@/lib/exam-prep'
import { ExamClient } from './ExamClient'

export async function generateMetadata({ params }: { params: Promise<{ course: string; id: string }> }): Promise<Metadata> {
  const { course, id } = await params
  const exam = isValidCourse(course) ? getExamPrepExam(course as Course, id) : undefined
  return { title: exam?.title ?? 'Exam Prep' }
}

export default async function ExamPage({
  params,
}: {
  params: Promise<{ course: string; id: string }>
}) {
  const { course, id } = await params
  if (!isValidCourse(course)) notFound()

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
