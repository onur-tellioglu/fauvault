import {
  upsertGuestProgress,
  getGuestProgress,
  clearGuestProgress,
  getGuestFlashcardProgress,
  upsertGuestFlashcardProgress,
  hasGuestProgress,
} from './guest-progress'

const mockStorage: Record<string, string> = {}

beforeEach(() => {
  Object.keys(mockStorage).forEach(k => delete mockStorage[k])
  Object.defineProperty(globalThis, 'localStorage', {
    value: {
      getItem: (k: string) => mockStorage[k] ?? null,
      setItem: (k: string, v: string) => { mockStorage[k] = v },
      removeItem: (k: string) => { delete mockStorage[k] },
    },
    writable: true,
    configurable: true,
  })
})

describe('lecture progress', () => {
  it('returns empty array when no data', () => {
    expect(getGuestProgress('aip')).toEqual([])
  })

  it('upserts and retrieves progress', () => {
    upsertGuestProgress('aip', 3, { concept_index: 2 })
    const rows = getGuestProgress('aip')
    expect(rows).toHaveLength(1)
    expect(rows[0].lecture_id).toBe(3)
    expect(rows[0].concept_index).toBe(2)
  })

  it('merges mini_quiz_results on repeated upsert', () => {
    upsertGuestProgress('aip', 1, { mini_quiz_results: { q1: { answers: [[0]], score: 1, submittedAt: 'x' } } })
    upsertGuestProgress('aip', 1, { mini_quiz_results: { q2: { answers: [[1]], score: 0, submittedAt: 'y' } } })
    const rows = getGuestProgress('aip')
    expect(Object.keys(rows[0].mini_quiz_results)).toHaveLength(2)
  })

  it('clears all guest progress', () => {
    upsertGuestProgress('aip', 1, { concept_index: 1 })
    clearGuestProgress()
    expect(getGuestProgress('aip')).toEqual([])
    expect(hasGuestProgress()).toBe(false)
  })

  it('hasGuestProgress returns true when data exists', () => {
    upsertGuestProgress('aip', 1, { concept_index: 1 })
    expect(hasGuestProgress()).toBe(true)
  })
})

describe('flashcard progress', () => {
  it('returns default when no data', () => {
    const p = getGuestFlashcardProgress('aip')
    expect(p.card_index).toBe(0)
    expect(p.known).toEqual([])
  })

  it('saves and retrieves flashcard progress', () => {
    upsertGuestFlashcardProgress('aip', { card_index: 5, known: [1, 3] })
    const p = getGuestFlashcardProgress('aip')
    expect(p.card_index).toBe(5)
    expect(p.known).toEqual([1, 3])
  })
})
