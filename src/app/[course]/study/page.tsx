import { notFound } from 'next/navigation'
import { isValidCourse, type Course } from '@/lib/courses'
import { StudyClient } from './StudyClient'

export default async function StudyPage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params
  if (!isValidCourse(course)) notFound()
  return <StudyClient course={course as Course} />
}
