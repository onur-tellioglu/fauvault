import { notFound } from 'next/navigation'
import { isValidCourse, type Course } from '@/lib/courses'
import { QuizClient } from './QuizClient'

export default async function QuizPage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params
  if (!isValidCourse(course)) notFound()
  return <QuizClient course={course as Course} />
}
