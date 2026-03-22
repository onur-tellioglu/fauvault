import { describe, it, expect } from 'vitest'
import { shuffleIndices } from './shuffle'

describe('shuffleIndices', () => {
  it('returns an array of the same length', () => {
    expect(shuffleIndices(5).length).toBe(5)
  })

  it('contains every index exactly once (is a permutation)', () => {
    const result = shuffleIndices(5)
    expect([...result].sort((a, b) => a - b)).toEqual([0, 1, 2, 3, 4])
  })

  it('returns empty array for n=0', () => {
    expect(shuffleIndices(0)).toEqual([])
  })

  it('returns [0] for n=1', () => {
    expect(shuffleIndices(1)).toEqual([0])
  })

  it('produces different orderings across calls (probabilistic)', () => {
    // With n=10, the chance of 20 identical shuffles is astronomically small
    const results = Array.from({ length: 20 }, () => shuffleIndices(10).join(','))
    const unique = new Set(results)
    expect(unique.size).toBeGreaterThan(1)
  })
})
