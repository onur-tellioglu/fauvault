// src/lib/courses.ts
import type { Content } from './types'
import { content as aipContent } from './content-aip'
import { content as reContent } from './content-re'

export type Course = 'aip' | 're'

export const COURSE_SLUGS: Course[] = ['aip', 're']

export const COURSES: Record<Course, { label: string; shortLabel: string; content: Content }> = {
  aip: { label: 'AI Perspectives', shortLabel: 'AIP', content: aipContent },
  re:  { label: 'Renewable Energies', shortLabel: 'RE',  content: reContent  },
}

export function getCourseContent(course: Course): Content {
  return COURSES[course].content
}

export function isValidCourse(slug: string): slug is Course {
  return COURSE_SLUGS.includes(slug as Course)
}
