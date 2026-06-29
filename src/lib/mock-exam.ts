// src/lib/mock-exam.ts
import type { Course } from './courses'

export type MockChoiceTask = {
  kind: 'choice'
  id: string                 // "A1", "B3" …
  text: string
  options: string[]
  correct: number[]          // 0-indexed
  type: 'single' | 'multiple'
  points: number
  explanation: string
}

export type MockCalcTask = {
  kind: 'calc'
  id: string
  text: string
  unit: string
  answer: number
  tolerance: number          // fraction, e.g. 0.02 = ±2%
  points: number
  workedSolution: string     // Markdown (KaTeX math supported)
}

export type MockOpenTask = {
  kind: 'open'
  id: string
  text: string
  image?: string             // optional public asset path
  points: number
  modelAnswer: string        // Markdown
}

export type MockTask = MockChoiceTask | MockCalcTask | MockOpenTask

export type MockPart = {
  id: 'A' | 'B' | 'C' | 'D'
  title: string
  points: number             // always 30
  tasks: MockTask[]
}

export type MockExam = { parts: MockPart[] }

const byCourse: Partial<Record<Course, MockExam>> = {}

export function registerMockExam(course: Course, exam: MockExam): void {
  byCourse[course] = exam
}

export function getMockExam(course: Course): MockExam | undefined {
  return byCourse[course]
}
