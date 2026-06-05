import { describe, it, expect } from 'vitest'
import { parseBody } from './ConceptSection'

describe('parseBody — code block handling', () => {
  it('parses a fenced python block', () => {
    const blocks = parseBody('intro\n```python\nx = 1\n```')
    const codeBlock = blocks.find(b => b.type === 'code')
    expect(codeBlock).toBeDefined()
    expect(codeBlock).toMatchObject({ type: 'code', lang: 'python', code: 'x = 1' })
  })

  it('does not leak triple-backtick fence markers into the output', () => {
    const blocks = parseBody('intro\n```python\nx = 1\n```')
    expect(JSON.stringify(blocks)).not.toContain('```')
  })

  it('parses a bare fence (no language) as lang === empty string', () => {
    const blocks = parseBody('```\nsome ascii art\n```')
    const codeBlock = blocks.find(b => b.type === 'code')
    expect(codeBlock).toBeDefined()
    expect(codeBlock).toMatchObject({ type: 'code', lang: '', code: 'some ascii art' })
  })
})

describe('parseBody — regression: table and bullets still work', () => {
  it('parses a markdown table as a table block', () => {
    const input = '|a|b|\n|---|---|\n|1|2|'
    const blocks = parseBody(input)
    const tableBlock = blocks.find(b => b.type === 'table')
    expect(tableBlock).toBeDefined()
    expect(tableBlock?.type).toBe('table')
  })

  it('parses a bullet list as a bullets block', () => {
    const input = '- item one\n- item two'
    const blocks = parseBody(input)
    const bulletsBlock = blocks.find(b => b.type === 'bullets')
    expect(bulletsBlock).toBeDefined()
    expect(bulletsBlock?.type).toBe('bullets')
  })
})
