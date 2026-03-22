import { describe, it, expect } from 'vitest'
import { split } from './LectureFlow'
import type { Lecture } from '@/lib/types'

function makeLecture(conceptCount: number, questionCount: number): Lecture {
  return {
    id: 1,
    title: 'Test',
    speaker: 'Test',
    concepts: Array.from({ length: conceptCount }, (_, i) => ({ heading: `C${i}`, body: '' })),
    questions: Array.from({ length: questionCount }, (_, i) => ({
      id: `q${i}`, text: `Q${i}`, type: 'single' as const,
      options: ['A', 'B'], correct: [0], explanation: '',
    })),
  }
}

describe('split', () => {
  it('1 concept, 8 questions → 1 mini, 7 final (no duplication)', () => {
    const { miniMap, finalQs } = split(makeLecture(1, 8))
    expect(Object.keys(miniMap)).toHaveLength(1)
    expect(miniMap[0]).toHaveLength(1)
    expect(finalQs).toHaveLength(7)
    // Mini question must NOT appear in final
    expect(finalQs.map(q => q.id)).not.toContain(miniMap[0][0].id)
  })

  it('1 concept, 1 question → 1 mini, 0 final (no duplication)', () => {
    const { miniMap, finalQs } = split(makeLecture(1, 1))
    expect(miniMap[0]).toHaveLength(1)
    expect(finalQs).toHaveLength(0)  // currently FAILS — returns [q0] due to fallback
  })

  it('3 concepts, 5 questions → 3 mini, 2 final', () => {
    const { miniMap, finalQs } = split(makeLecture(3, 5))
    expect(Object.keys(miniMap)).toHaveLength(3)
    expect(finalQs).toHaveLength(2)
  })

  it('concepts >= questions → finalQs is empty, no fallback', () => {
    const { finalQs } = split(makeLecture(5, 3))
    expect(finalQs).toHaveLength(0)  // currently FAILS — returns all 3 questions
  })
})
