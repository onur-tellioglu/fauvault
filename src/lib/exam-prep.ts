// src/lib/exam-prep.ts
import type { Course } from './courses'

export type ExamPrepTask = {
  id: number
  text: string
  unit: string
  answer: number
  tolerance: number          // e.g. 0.05 = ±5%
  choices: [number, number, number, number]
  explanation: string
}

export type ExamPrepExam = {
  id: string
  title: string
  scenario: string           // Markdown
  tasks: ExamPrepTask[]
}

const examsByCourse: Partial<Record<Course, ExamPrepExam[]>> = {}

export function registerExamPrepExams(course: Course, exams: ExamPrepExam[]): void {
  examsByCourse[course] = exams
}

export function getExamPrepExams(course: Course): ExamPrepExam[] {
  return examsByCourse[course] ?? []
}

export function getExamPrepExam(course: Course, id: string): ExamPrepExam | undefined {
  return getExamPrepExams(course).find(e => e.id === id)
}
