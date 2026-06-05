import { describe, it, expect } from 'vitest'
import { parseBody, normalizeLang } from './ConceptSection'

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

describe('parseBody — code block isolation (table/bullet syntax inside fence)', () => {
  it('treats table and bullet syntax inside a fence as verbatim code', () => {
    const blocks = parseBody('```\n| col |\n- item\n```')
    expect(blocks).toHaveLength(1)
    expect(blocks[0]).toMatchObject({ type: 'code', code: '| col |\n- item' })
  })
})

describe('parseBody — code block multiline and verbatim content', () => {
  it('preserves newlines inside a code block', () => {
    const blocks = parseBody('```python\nx = 1\ny = 2\n```')
    expect(blocks).toHaveLength(1)
    expect(blocks[0]).toMatchObject({ type: 'code', lang: 'python', code: 'x = 1\ny = 2' })
  })

  it('does not apply inline markdown processing inside a code block', () => {
    const blocks = parseBody('```\n**not bold**\n```')
    expect(blocks).toHaveLength(1)
    expect(blocks[0]).toMatchObject({ type: 'code', code: '**not bold**' })
  })
})

describe('parseBody — unterminated fence fail-safe', () => {
  it('emits a code block with captured content when closing fence is missing', () => {
    const blocks = parseBody('```python\nx = 1')
    const codeBlock = blocks.find(b => b.type === 'code')
    expect(codeBlock).toBeDefined()
    expect(codeBlock).toMatchObject({ type: 'code', lang: 'python', code: 'x = 1' })
  })
})

describe('normalizeLang', () => {
  it('passes through known Prism languages unchanged', () => {
    expect(normalizeLang('python')).toBe('python')
    expect(normalizeLang('bash')).toBe('bash')
    expect(normalizeLang('sql')).toBe('sql')
  })

  it('maps matlab to clike (Prism has no matlab grammar)', () => {
    expect(normalizeLang('matlab')).toBe('clike')
  })

  it('maps cypher to clike (Prism has no cypher grammar)', () => {
    expect(normalizeLang('cypher')).toBe('clike')
  })

  it('maps unknown languages to plain', () => {
    expect(normalizeLang('foobar')).toBe('plain')
  })

  it('maps empty string (bare fence) to plain', () => {
    expect(normalizeLang('')).toBe('plain')
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
