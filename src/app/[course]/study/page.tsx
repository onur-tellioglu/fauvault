import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isValidCourse, COURSES, type Course } from '@/lib/courses'
import { StudyClient } from './StudyClient'

export async function generateMetadata({ params }: { params: Promise<{ course: string }> }): Promise<Metadata> {
  const { course } = await params
  const shortLabel = isValidCourse(course) ? COURSES[course as Course].shortLabel : course.toUpperCase()
  return { title: `Study Mode · ${shortLabel}` }
}

export default async function StudyPage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params
  if (!isValidCourse(course)) notFound()
  return <StudyClient course={course as Course} />
}
