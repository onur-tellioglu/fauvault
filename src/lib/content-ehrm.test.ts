import { describe, it, expect } from 'vitest'
import { content } from './content-ehrm'

describe('content-ehrm structure', () => {
  it('has 9 lectures with ids 1..9', () => {
    expect(content.lectures.map(l => l.id)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('every question is well-formed and linked to a real concept', () => {
    for (const l of content.lectures) {
      const ids = new Set<string>()
      for (const q of l.questions) {
        expect(ids.has(q.id), `duplicate question id ${q.id}`).toBe(false)
        ids.add(q.id)
        expect(q.options.length, `${q.id} needs >=2 options`).toBeGreaterThanOrEqual(2)
        expect(q.correct.length, `${q.id} needs >=1 correct`).toBeGreaterThanOrEqual(1)
        for (const c of q.correct) {
          expect(c, `${q.id} correct index in range`).toBeGreaterThanOrEqual(0)
          expect(c, `${q.id} correct index in range`).toBeLessThan(q.options.length)
        }
        if (q.type === 'single') expect(q.correct.length, `${q.id} single => 1 correct`).toBe(1)
        expect(q.conceptIndex, `${q.id} conceptIndex in range`).toBeGreaterThanOrEqual(0)
        expect(q.conceptIndex, `${q.id} conceptIndex in range`).toBeLessThan(l.concepts.length)
        expect(q.explanation.length, `${q.id} needs explanation`).toBeGreaterThan(0)
      }
    }
  })

  it('every concept has a heading and body', () => {
    for (const l of content.lectures) {
      for (const c of l.concepts) {
        expect(c.heading.length).toBeGreaterThan(0)
        expect(c.body.length).toBeGreaterThan(0)
      }
    }
  })

  it('each lecture meets minimum content counts', () => {
    for (const l of content.lectures) {
      expect(l.concepts.length, `L${l.id} needs >=6 concepts`).toBeGreaterThanOrEqual(6)
      expect(l.questions.length, `L${l.id} needs >=5 questions`).toBeGreaterThanOrEqual(5)
    }
  })

  it('every flashcard has a non-empty front and back', () => {
    for (const l of content.lectures) {
      for (const f of l.flashcards ?? []) {
        expect(f.front.length, `L${l.id} flashcard front`).toBeGreaterThan(0)
        expect(f.back.length, `L${l.id} flashcard back`).toBeGreaterThan(0)
      }
    }
  })
})
