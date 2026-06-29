import { describe, it, expect } from 'vitest'
import './mock-exam-ehrm'
import { getMockExam } from './mock-exam'

describe('E-HRM mock exam', () => {
  const exam = getMockExam('ehrm')!

  it('is registered with 4 parts A/B/C/D', () => {
    expect(exam).toBeDefined()
    expect(exam.parts.map(p => p.id)).toEqual(['A', 'B', 'C', 'D'])
  })

  it('each part is worth 30 points and its tasks sum to 30', () => {
    for (const p of exam.parts) {
      expect(p.points).toBe(30)
      const sum = p.tasks.reduce((a, t) => a + t.points, 0)
      expect(Math.abs(sum - 30), `Part ${p.id} tasks sum to ${sum}`).toBeLessThan(0.01)
    }
  })

  it('every task is well-formed and ids are unique', () => {
    const ids = new Set<string>()
    for (const p of exam.parts) {
      for (const t of p.tasks) {
        expect(ids.has(t.id), `duplicate task id ${t.id}`).toBe(false)
        ids.add(t.id)
        expect(t.points).toBeGreaterThan(0)
        if (t.kind === 'choice') {
          expect(t.correct.length).toBeGreaterThanOrEqual(1)
          for (const c of t.correct) {
            expect(c).toBeGreaterThanOrEqual(0)
            expect(c).toBeLessThan(t.options.length)
          }
          if (t.type === 'single') expect(t.correct.length).toBe(1)
          expect(t.explanation.length).toBeGreaterThan(0)
        } else if (t.kind === 'calc') {
          expect(Number.isFinite(t.answer)).toBe(true)
          expect(t.tolerance).toBeGreaterThanOrEqual(0)
          expect(t.workedSolution.length).toBeGreaterThan(0)
        } else {
          expect(t.modelAnswer.length).toBeGreaterThan(0)
        }
      }
    }
  })
})
