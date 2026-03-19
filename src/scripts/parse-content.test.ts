import { describe, it, expect } from 'vitest'
import { parseStudyGuide } from './parse-content'
import { readFileSync } from 'fs'
import { join } from 'path'

const GUIDE = readFileSync(join(__dirname, '../../../STUDY_GUIDE.md'), 'utf-8')

describe('parseStudyGuide', () => {
  it('parses 21 lectures', () => {
    expect(parseStudyGuide(GUIDE).lectures).toHaveLength(21)
  })
  it('each lecture has id, title, speaker', () => {
    const { lectures } = parseStudyGuide(GUIDE)
    lectures.forEach(l => {
      expect(l.id).toBeGreaterThan(0)
      expect(l.title).toBeTruthy()
    })
  })
  it('parses questions with correct answers', () => {
    const { lectures } = parseStudyGuide(GUIDE)
    const q = lectures[0].questions[0]
    expect(q.correct.length).toBeGreaterThan(0)
    expect(q.options.length).toBeGreaterThan(1)
    expect(q.type).toMatch(/^(single|multiple)$/)
  })
})
