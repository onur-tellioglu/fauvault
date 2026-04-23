// src/lib/courses.ts
import type { Content } from './types'
import { content as aipContent } from './content-aip'
import { content as reContent } from './content-re'
import { content as de1Content } from './content-de1'
import { content as apContent } from './content-ap'
import './exam-prep-re'

export type Course = 'aip' | 're' | 'de1' | 'ap'

export const COURSE_SLUGS: Course[] = ['aip', 're', 'de1', 'ap']

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
  de1: {
    label: 'Data Engineering 1',
    shortLabel: 'DE1',
    description: 'FAU · 2 Lectures',
    examDate: '',   // TBD — update when exam date is announced
    content: de1Content,
  },
  ap: {
    label: 'Applied Programming',
    shortLabel: 'AP',
    description: 'FAU · 1 Lecture',
    examDate: '',   // TBD — oral exam, date not yet announced
    content: apContent,
  },
}

export function getCourseContent(course: Course): Content {
  return COURSES[course].content
}

export function isValidCourse(slug: string): slug is Course {
  return COURSE_SLUGS.includes(slug as Course)
}
