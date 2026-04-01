// src/lib/courses.ts
import type { Content } from './types'
import { content as aipContent } from './content-aip'
import { content as reContent } from './content-re'

export type Course = 'aip' | 're'

export const COURSE_SLUGS: Course[] = ['aip', 're']

export const COURSES: Record<Course, {
  label: string
  shortLabel: string
  description: string
  examDate: string   // ISO date string e.g. "2026-04-10T08:00:00"
  content: Content
}> = {
  aip: {
    label: 'AI Perspectives',
    shortLabel: 'AIP',
    description: 'FAU · 21 Lectures',
    examDate: '2026-02-06T08:00:00',
    content: aipContent,
  },
  re: {
    label: 'Renewable Energies',
    shortLabel: 'RE',
    description: 'FAU · 10 Lectures',
    examDate: '2026-04-10T08:00:00',
    content: reContent,
  },
}

export function getCourseContent(course: Course): Content {
  return COURSES[course].content
}

export function isValidCourse(slug: string): slug is Course {
  return COURSE_SLUGS.includes(slug as Course)
}
