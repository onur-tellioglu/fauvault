import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isValidCourse, COURSES, type Course } from '@/lib/courses'
import { QuizClient } from './QuizClient'

export async function generateMetadata({ params }: { params: Promise<{ course: string }> }): Promise<Metadata> {
  const { course } = await params
  const shortLabel = isValidCourse(course) ? COURSES[course as Course].shortLabel : course.toUpperCase()
  return { title: `Practice · ${shortLabel}` }
}

export default async function QuizPage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params
  if (!isValidCourse(course)) notFound()
  return <QuizClient course={course as Course} />
}
