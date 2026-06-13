import { describe, it, expect } from 'vitest'
import { split } from './LectureFlow'
import type { Lecture } from '@/lib/types'

// conceptIndices[i] = the concept index that question i checks
function makeLecture(conceptCount: number, conceptIndices: number[]): Lecture {
  return {
    id: 1,
    title: 'Test',
    speaker: 'Test',
    concepts: Array.from({ length: conceptCount }, (_, i) => ({ heading: `C${i}`, body: '' })),
    questions: conceptIndices.map((ci, i) => ({
      id: `q${i}`, text: `Q${i}`, type: 'single' as const,
      options: ['A', 'B'], correct: [0], explanation: '', conceptIndex: ci,
    })),
  }
}

describe('split', () => {
  it("uses each concept's question as its mini check", () => {
    const { miniMap } = split(makeLecture(3, [0, 1, 2]))
    expect(miniMap[0].map(q => q.id)).toEqual(['q0'])
    expect(miniMap[1].map(q => q.id)).toEqual(['q1'])
    expect(miniMap[2].map(q => q.id)).toEqual(['q2'])
  })

  it('routes the mini question to its tagged concept, not its array position', () => {
    // q0 checks concept 2, q1 checks concept 0
    const { miniMap } = split(makeLecture(3, [2, 0]))
    expect(miniMap[2].map(q => q.id)).toEqual(['q0'])
    expect(miniMap[0].map(q => q.id)).toEqual(['q1'])
    expect(miniMap[1]).toBeUndefined()
  })

  it('gives a concept with no question no mini entry', () => {
    const { miniMap } = split(makeLecture(3, [0, 2]))
    expect(miniMap[1]).toBeUndefined()
    expect(Object.keys(miniMap).sort()).toEqual(['0', '2'])
  })

  it('sends extra questions for an already-covered concept to the final quiz', () => {
    // q0,q3 -> c0 ; q1 -> c1 ; q2 -> c2
    const { miniMap, finalQs } = split(makeLecture(3, [0, 1, 2, 0]))
    expect(miniMap[0].map(q => q.id)).toEqual(['q0'])
    expect(finalQs.map(q => q.id)).toEqual(['q3'])
  })

  it('never duplicates a mini question in the final quiz', () => {
    const { miniMap, finalQs } = split(makeLecture(2, [0, 1, 0, 1]))
    const miniIds = Object.values(miniMap).flat().map(q => q.id)
    expect(finalQs.map(q => q.id).some(id => miniIds.includes(id))).toBe(false)
    expect(finalQs.map(q => q.id)).toEqual(['q2', 'q3'])
  })

  it('preserves array order among final questions', () => {
    const { finalQs } = split(makeLecture(1, [0, 0, 0]))
    expect(finalQs.map(q => q.id)).toEqual(['q1', 'q2'])
  })
})
