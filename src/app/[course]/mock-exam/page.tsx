import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isValidCourse, COURSES, type Course } from '@/lib/courses'
import { getMockExam } from '@/lib/mock-exam'
import { MockExamClient } from './MockExamClient'

export async function generateMetadata({ params }: { params: Promise<{ course: string }> }): Promise<Metadata> {
  const { course } = await params
  const shortLabel = isValidCourse(course) ? COURSES[course as Course].shortLabel : course.toUpperCase()
  return { title: `Mock Exam · ${shortLabel}` }
}

export default async function MockExamPage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params
  if (!isValidCourse(course)) notFound()
  const exam = getMockExam(course as Course)
  if (!exam) notFound()
  return <MockExamClient exam={exam} backHref={`/${course}/dashboard`} />
}
