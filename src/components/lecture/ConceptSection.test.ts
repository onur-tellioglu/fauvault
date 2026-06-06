import { describe, it, expect } from 'vitest'
import { parseBody, normalizeLang } from './ConceptSection'
import { Prism } from 'prism-react-renderer'

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
  it('passes through known bundled Prism languages unchanged', () => {
    expect(normalizeLang('python')).toBe('python')
    expect(normalizeLang('sql')).toBe('sql')
    expect(normalizeLang('typescript')).toBe('typescript')
    expect(normalizeLang('graphql')).toBe('graphql')
  })

  it('maps bash/sh/shell to clike (not bundled — clike is best approximation)', () => {
    expect(normalizeLang('bash')).toBe('clike')
    expect(normalizeLang('sh')).toBe('clike')
    expect(normalizeLang('shell')).toBe('clike')
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

describe('normalizeLang — grammar resolution', () => {
  // Every language returned by normalizeLang (except 'plain') must resolve to
  // a real grammar object in the bundled Prism instance. This test closes the
  // false-confidence gap where tests only validated the returned string but not
  // whether that string actually maps to a bundled grammar.
  it.each([
    // Core languages the course content uses
    'python', 'sql', 'typescript', 'javascript', 'graphql',
    // Languages that were previously listed in PRISM_SUPPORTED but are not
    // bundled — they now map via LANG_ALIASES; the resolved value must be bundled
    'bash', 'sh', 'shell', 'r', 'java', 'csharp', 'cs', 'ruby', 'scala',
    // Explicitly aliased languages
    'matlab', 'cypher',
  ])('normalizeLang(%s) resolves to a bundled grammar', (lang) => {
    const normalized = normalizeLang(lang)
    if (normalized === 'plain' || normalized === 'plaintext' || normalized === 'text' || normalized === 'txt') return
    expect(Prism.languages[normalized]).toBeTruthy()
  })

  it('normalizeLang of bare fence returns plain (no grammar needed)', () => {
    expect(normalizeLang('')).toBe('plain')
  })

  it('normalizeLang of unknown lang returns plain', () => {
    expect(normalizeLang('foobar123')).toBe('plain')
  })
})

describe('parseBody — block math ($$...$$)', () => {
  it('parses a standalone $$ block as type "math"', () => {
    const blocks = parseBody('intro\n$$\nE = mc^2\n$$')
    const mathBlock = blocks.find(b => b.type === 'math')
    expect(mathBlock).toBeDefined()
    expect(mathBlock).toMatchObject({ type: 'math', tex: 'E = mc^2', display: true })
  })

  it('parses a multi-line $$ block preserving newlines', () => {
    const blocks = parseBody('$$\na + b\n= c\n$$')
    expect(blocks).toHaveLength(1)
    expect(blocks[0]).toMatchObject({ type: 'math', tex: 'a + b\n= c', display: true })
  })

  it('does not treat $$ inside a code fence as math', () => {
    const blocks = parseBody('```\n$$\nnot math\n$$\n```')
    expect(blocks).toHaveLength(1)
    expect(blocks[0].type).toBe('code')
  })

  it('treats an unterminated $$ block as a math block (fail-safe)', () => {
    const blocks = parseBody('$$\nx = 1')
    const mathBlock = blocks.find(b => b.type === 'math')
    expect(mathBlock).toBeDefined()
    expect(mathBlock).toMatchObject({ type: 'math', tex: 'x = 1', display: true })
  })
})

describe('parseBody — inline math ($...$)', () => {
  it('parseBody still produces p blocks for lines containing inline math', () => {
    // parseBody works at the block level; inline math is resolved in renderInline
    const blocks = parseBody('The value is $x^2 + 1$.')
    expect(blocks).toHaveLength(1)
    expect(blocks[0]).toMatchObject({ type: 'p', text: 'The value is $x^2 + 1$.' })
  })

  it('does not treat a bare dollar sign (price) as inline math', () => {
    const blocks = parseBody('Costs $5 per unit.')
    expect(blocks).toHaveLength(1)
    expect(blocks[0]).toMatchObject({ type: 'p', text: 'Costs $5 per unit.' })
  })
})

describe('parseBody — regression after math block addition', () => {
  it('still parses bullets after a math block', () => {
    const blocks = parseBody('$$\nf(x)\n$$\n- item')
    const mathBlock = blocks.find(b => b.type === 'math')
    const bulletsBlock = blocks.find(b => b.type === 'bullets')
    expect(mathBlock).toBeDefined()
    expect(bulletsBlock).toBeDefined()
  })

  it('still parses code block after a math block', () => {
    const blocks = parseBody('$$\nf(x)\n$$\n```python\nx=1\n```')
    expect(blocks.map(b => b.type)).toEqual(['math', 'code'])
  })

  it('still parses a table block unaffected', () => {
    const blocks = parseBody('|a|b|\n|---|---|\n|1|2|')
    expect(blocks.find(b => b.type === 'table')).toBeDefined()
  })
})

describe('parseBody — single-line $$...$$ (student paste)', () => {
  it('emits a math block for $$E = mc^2$$', () => {
    const blocks = parseBody('$$E = mc^2$$')
    expect(blocks).toHaveLength(1)
    expect(blocks[0]).toMatchObject({ type: 'math', tex: 'E = mc^2', display: true })
  })

  it('emits a math block for single-line $$ in mixed content', () => {
    const blocks = parseBody('Intro\n$$F = ma$$\nOutro')
    const mathBlock = blocks.find(b => b.type === 'math')
    expect(mathBlock).toMatchObject({ type: 'math', tex: 'F = ma', display: true })
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
