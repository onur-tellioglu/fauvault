import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('./db', () => ({
  default: vi.fn(),
}))

import sql from './db'
import { getLeaderboard } from './leaderboard'

describe('getLeaderboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns rows from sql query', async () => {
    const mockRows = [
      { username: 'alice', completed_count: '3', avg_score: '0.8' },
      { username: 'bob',   completed_count: '2', avg_score: '0.6' },
    ]
    ;(sql as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockRows)

    const rows = await getLeaderboard()

    expect(rows).toHaveLength(2)
    expect(rows[0].username).toBe('alice')
    expect(rows[0].completed_count).toBe(3)
    expect(rows[0].avg_score).toBeCloseTo(0.8)
    expect(rows[0].score).toBe(3 * 100 + Math.round(0.8 * 100))
  })

  it('handles null avg_score (user completed lectures but no final quiz)', async () => {
    const mockRows = [
      { username: 'charlie', completed_count: '1', avg_score: null },
    ]
    ;(sql as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockRows)

    const rows = await getLeaderboard()
    expect(rows[0].avg_score).toBe(0)
    expect(rows[0].score).toBe(100)
  })
})
