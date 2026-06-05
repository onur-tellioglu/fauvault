import { describe, it, expect } from 'vitest'
import { SITE_NAME, SITE_TAGLINE } from './constants'

describe('site brand constants', () => {
  it('exposes the brand name', () => {
    expect(SITE_NAME).toBe('FAUVault')
  })

  it('exposes the evergreen tagline', () => {
    expect(SITE_TAGLINE).toBe('FAU exam prep platform prepared by students')
  })

  it('tagline enumerates no courses (stays evergreen)', () => {
    // Guard against re-introducing a course list into branding copy.
    expect(SITE_TAGLINE).not.toMatch(
      /perspective|renewable|energ|data engineering|programming|biolog|psycholog|course/i
    )
  })
})
