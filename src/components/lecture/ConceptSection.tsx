'use client'
import { useMemo, type ReactNode } from 'react'
import { Prism, normalizeTokens } from 'prism-react-renderer'

type Props = { heading: string; body: string; index: number; total: number }

// Languages supported by the Prism subset bundled with prism-react-renderer.
// Unsupported grammars fall back to 'clike' (good enough for matlab/cypher)
// or 'plain' (bare fences).
const PRISM_SUPPORTED = new Set([
  'markup', 'html', 'xml', 'svg', 'mathml',
  'css', 'clike', 'javascript', 'js',
  'typescript', 'ts', 'jsx', 'tsx',
  'python', 'bash', 'shell', 'sql',
  'json', 'yaml', 'markdown', 'md',
  'java', 'c', 'cpp', 'csharp', 'cs',
  'go', 'rust', 'ruby', 'kotlin', 'swift',
  'r', 'scala', 'diff', 'git', 'regex',
])

const LANG_ALIASES: Record<string, string> = {
  matlab: 'clike',
  cypher: 'clike',
  sh:     'bash',
  py:     'python',
}

export function normalizeLang(lang: string): string {
  if (!lang) return 'plain'
  const lower = lang.toLowerCase()
  if (LANG_ALIASES[lower]) return LANG_ALIASES[lower]
  if (PRISM_SUPPORTED.has(lower)) return lower
  return 'plain'
}

/** Minimal token-color map using the app's CSS variables.
 *  Keys are Prism token type strings; values are CSS color values. */
const TOKEN_COLORS: Record<string, string> = {
  // Comments — muted
  comment:          'var(--text-muted)',
  prolog:           'var(--text-muted)',
  doctype:          'var(--text-muted)',
  cdata:            'var(--text-muted)',
  // Punctuation — secondary
  punctuation:      'var(--text-secondary)',
  // Keywords / operators — primary, semi-bold rendered via color
  keyword:          'var(--text-primary)',
  'control-flow':   'var(--text-primary)',
  operator:         'var(--text-primary)',
  // Strings — accent (fallback to primary if --accent not defined)
  string:           'var(--accent, var(--text-primary))',
  'template-string':'var(--accent, var(--text-primary))',
  'string-interpolation': 'var(--accent, var(--text-primary))',
  // Numbers / booleans
  number:           'var(--text-primary)',
  boolean:          'var(--text-primary)',
  // Functions / class names
  function:         'var(--text-primary)',
  'class-name':     'var(--text-primary)',
  // Built-ins / constants
  builtin:          'var(--text-primary)',
  constant:         'var(--text-primary)',
}

/** Renders a code block with Prism token-based syntax highlighting.
 *  Falls back to plain mono when lang is '' or unrecognized. */
function HighlightedCode({ lang, code }: { lang: string; code: string }) {
  const normalizedLang = normalizeLang(lang)
  const grammar = normalizedLang === 'plain'
    ? undefined
    : Prism.languages[normalizedLang as keyof typeof Prism.languages]

  const containerStyle: React.CSSProperties = {
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border)',
    borderRadius: 6,
    padding: '0.75rem 1rem',
    overflowX: 'auto',
    margin: '0.75rem 0',
    fontFamily: 'var(--font-geist-mono)',
    fontSize: '0.8125rem',
    lineHeight: 1.6,
  }

  // Bare fence or unrecognized language — plain mono, no highlighting.
  if (!grammar) {
    return (
      <pre style={containerStyle}>
        <code style={{ fontFamily: 'var(--font-geist-mono)', whiteSpace: 'pre' }}>
          {code}
        </code>
      </pre>
    )
  }

  const tokens = normalizeTokens(Prism.tokenize(code, grammar))

  return (
    <pre style={containerStyle}>
      <code style={{ fontFamily: 'var(--font-geist-mono)', whiteSpace: 'pre', display: 'block' }}>
        {tokens.map((line, lineIndex) => (
          <span key={lineIndex}>
            {line.map((token, tokenIndex) => (
              <span
                key={tokenIndex}
                style={{ color: TOKEN_COLORS[token.types[token.types.length - 1]] ?? 'inherit' }}
              >
                {token.content}
              </span>
            ))}
            {lineIndex < tokens.length - 1 ? '\n' : null}
          </span>
        ))}
      </code>
    </pre>
  )
}

/** Render inline markdown: **bold**, *italic*, `code` */
function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i} style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{part.slice(2, -2)}</strong>
    if (part.startsWith('*') && part.endsWith('*'))
      return <em key={i}>{part.slice(1, -1)}</em>
    if (part.startsWith('`') && part.endsWith('`'))
      return <code key={i} style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.875em', background: 'var(--bg-elevated)', padding: '1px 5px', borderRadius: 4 }}>{part.slice(1, -1)}</code>
    return part
  })
}

// ── Block types ──────────────────────────────────────────────────────────────

export type PBlock      = { type: 'p';       text: string }
export type BulletsBlock = { type: 'bullets'; items: string[] }
export type TableBlock  = { type: 'table';   rows: string[][] }
export type CodeBlock   = { type: 'code';    lang: string; code: string }

export type Block = PBlock | BulletsBlock | TableBlock | CodeBlock

// ── Pure parser ──────────────────────────────────────────────────────────────

const FENCE_OPEN  = /^```([\w+#.-]*)\s*$/
const FENCE_CLOSE = /^```\s*$/

/**
 * Parse a lecture concept body string into an array of typed blocks.
 * The paragraph / bullet / table / inline output is byte-for-byte identical
 * to the previous renderBody implementation; only code-block handling is new.
 */
export function parseBody(body: string): Block[] {
  const lines = body.split('\n')
  const blocks: Block[] = []

  let pendingBullets: string[] = []
  let pendingTableRows: string[][] = []

  // Code-collecting state
  let inCode = false
  let codeLang = ''
  let codeLines: string[] = []

  const flushBullets = () => {
    if (pendingBullets.length > 0) {
      blocks.push({ type: 'bullets', items: pendingBullets })
      pendingBullets = []
    }
  }

  const flushTable = () => {
    if (pendingTableRows.length > 0) {
      blocks.push({ type: 'table', rows: pendingTableRows })
      pendingTableRows = []
    }
  }

  const flushCode = () => {
    blocks.push({ type: 'code', lang: codeLang, code: codeLines.join('\n') })
    inCode = false
    codeLang = ''
    codeLines = []
  }

  for (const line of lines) {
    // ── Inside a fenced code block ──
    if (inCode) {
      if (FENCE_CLOSE.test(line.trim())) {
        flushCode()
      } else {
        codeLines.push(line)
      }
      continue
    }

    // ── Detect opening fence ──
    const fenceMatch = FENCE_OPEN.exec(line.trim())
    if (fenceMatch) {
      flushBullets()
      flushTable()
      inCode = true
      codeLang = fenceMatch[1] ?? ''
      codeLines = []
      continue
    }

    // ── Table rows ──
    const isTableRow = line.trim().startsWith('|') && line.trim().endsWith('|')
    const isSeparator = isTableRow && /^\|[-| :]+\|$/.test(line.trim())

    if (isSeparator) {
      // skip separator rows
    } else if (isTableRow) {
      flushBullets()
      const cells = line.trim().slice(1, -1).split('|')
      pendingTableRows.push(cells)
    } else {
      flushTable()
      const bullet = line.match(/^[-*]\s+(.*)/)
      if (bullet) {
        pendingBullets.push(bullet[1])
      } else if (line.trim() === '') {
        flushBullets()
        blocks.push({ type: 'p', text: '' })
      } else {
        flushBullets()
        blocks.push({ type: 'p', text: line })
      }
    }
  }

  // Fail-safe: flush any unterminated fence as a code block (even if empty)
  if (inCode) {
    flushCode()
  }

  flushTable()
  flushBullets()

  return blocks
}

// ── JSX renderer ─────────────────────────────────────────────────────────────

function renderBody(body: string): ReactNode[] {
  const blocks = parseBody(body)
  const result: ReactNode[] = []
  let key = 0

  for (const block of blocks) {
    if (block.type === 'p') {
      if (block.text === '') {
        result.push(<br key={key++} />)
      } else {
        result.push(<p key={key++} style={{ margin: '0 0 0.5rem' }}>{renderInline(block.text)}</p>)
      }
    } else if (block.type === 'bullets') {
      result.push(
        <ul key={key++} style={{ listStyle: 'disc', paddingLeft: '1.25rem', margin: '0 0 0.5rem' }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ marginBottom: '0.2rem' }}>{renderInline(item)}</li>
          ))}
        </ul>
      )
    } else if (block.type === 'table') {
      const [head, ...body] = block.rows
      result.push(
        <div key={key++} style={{ overflowX: 'auto', margin: '0.75rem 0' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.9rem' }}>
            <thead>
              <tr>
                {head.map((cell, i) => (
                  <th key={i} style={{ border: '1px solid var(--border)', padding: '6px 12px', textAlign: 'left', background: 'var(--bg-elevated)', color: 'var(--text-primary)', fontWeight: 600 }}>
                    {renderInline(cell.trim())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{ border: '1px solid var(--border)', padding: '6px 12px', color: 'var(--text-secondary)' }}>
                      {renderInline(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    } else if (block.type === 'code') {
      result.push(
        <HighlightedCode key={key++} lang={block.lang} code={block.code} />
      )
    }
  }

  return result
}

export function ConceptSection({ heading, body, index, total }: Props) {
  const renderedBody = useMemo(() => renderBody(body), [body])

  return (
    <div style={{ animation: 'fadeSlideUp 300ms ease forwards' }}>
      <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 10 }}>
        Concept {index + 1} / {total}
      </p>
      <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
        {heading}
      </h2>
      <div style={{ fontSize: '0.975rem', lineHeight: 1.75, color: 'var(--text-secondary)' }}>
        {renderedBody}
      </div>
    </div>
  )
}
