// src/lib/courses.ts
import type { Content } from './types'
import { content as aipContent } from './content-aip'
import { content as reContent } from './content-re'
import { content as de1Content } from './content-de1'
import { content as apContent } from './content-ap'
import { content as bioContent } from './content-bio'
import { content as adsContent } from './content-ads'
import { content as ehrmContent } from './content-ehrm'
import './exam-prep-re'
import './exam-prep-ehrm'
import './mock-exam-ehrm'

export type Course = 'aip' | 're' | 'de1' | 'ap' | 'bio' | 'ads' | 'ehrm'

export const COURSE_SLUGS: Course[] = ['aip', 're', 'de1', 'ap', 'bio', 'ads', 'ehrm']

export const COURSES: Record<Course, {
  label: string
  shortLabel: string
  description: string
  examDate: string   // ISO date string e.g. "2026-04-10T08:00:00"; midnight (T00:00:00) means time TBA
  examLocation?: string   // per-course venue; falls back to global EXAM_LOCATION when absent
  submissionDate?: string   // optional separate deadline (e.g. project hand-in) shown alongside the exam date
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
    description: 'FAU · 8 Lectures',
    examDate: '2026-07-22T00:00:00',   // time TBA
    content: de1Content,
  },
  ap: {
    label: 'Applied Programming',
    shortLabel: 'AP',
    description: 'FAU · 5 Lectures',
    examDate: '2026-09-14T00:00:00',         // written or oral exam; time TBA
    submissionDate: '2026-07-31T00:00:00',   // project hand-in (course achievement); time TBA
    content: apContent,
  },
  bio: {
    label: 'Introduction to Molecular Biology',
    shortLabel: 'BIO',
    description: 'FAU · 7 Lectures',
    examDate: '2026-07-30T14:00:00',
    content: bioContent,
  },
  ads: {
    label: 'Applied Data Science in Medicine & Psychology',
    shortLabel: 'ADS',
    description: 'FAU · 7 Lectures',
    examDate: '2026-07-13T14:00:00',
    content: adsContent,
  },
  ehrm: {
    label: 'Electronic Human Resources Management',
    shortLabel: 'E-HRM',
    description: 'FAU · 9 Lectures',
    examDate: '2026-07-02T13:00:00',
    examLocation: 'H4 · Lange Gasse, Nürnberg',
    content: ehrmContent,
  },
}

export function getCourseContent(course: Course): Content {
  return COURSES[course].content
}

export function isValidCourse(slug: string): slug is Course {
  return COURSE_SLUGS.includes(slug as Course)
}
