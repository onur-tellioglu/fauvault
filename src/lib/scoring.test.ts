import { describe, it, expect } from 'vitest'
import { scoreSingleQuestion, scoreQuiz } from './scoring'

describe('scoreSingleQuestion', () => {
  it('single-correct: 1.0 for correct answer', () => {
    expect(scoreSingleQuestion([0], [0], 'single', 4)).toBe(1)
  })
  it('single-correct: 0 for wrong answer', () => {
    expect(scoreSingleQuestion([0], [1], 'single', 4)).toBe(0)
  })
  it('multiple-correct: full credit when all correct selected', () => {
    expect(scoreSingleQuestion([0, 2], [0, 2], 'multiple', 4)).toBe(1)
  })
  it('multiple-correct: partial credit — missed one', () => {
    // correct: [0,1], selected: [0] — got 0 right, missed 1, got 2 non-selected correct
    const score = scoreSingleQuestion([0, 1], [0], 'multiple', 4)
    expect(score).toBeGreaterThan(0)
    expect(score).toBeLessThan(1)
  })
  it('multiple-correct: wrong selection lowers score', () => {
    // selected wrong option on top of correct ones
    const withWrong = scoreSingleQuestion([0], [0, 1], 'multiple', 4)
    const perfect = scoreSingleQuestion([0], [0], 'multiple', 4)
    expect(withWrong).toBeLessThan(perfect)
  })
})

describe('scoreQuiz', () => {
  it('returns 0 for empty questions', () => {
    expect(scoreQuiz([], [])).toBe(0)
  })
  it('averages scores across questions', () => {
    const q = { correct: [0], type: 'single' as const, options: ['A', 'B', 'C', 'D'] }
    expect(scoreQuiz([q, q], [[0], [1]])).toBe(0.5)
  })
})
