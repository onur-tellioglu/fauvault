'use client'
import { useMemo, type ReactNode } from 'react'

type Props = { heading: string; body: string; index: number; total: number }

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

function renderBody(body: string): ReactNode[] {
  const lines = body.split('\n')
  const result: ReactNode[] = []
  let bullets: ReactNode[] = []
  let key = 0

  const flushBullets = () => {
    if (bullets.length > 0) {
      result.push(
        <ul key={key++} style={{ listStyle: 'disc', paddingLeft: '1.25rem', margin: '0 0 0.5rem' }}>
          {bullets}
        </ul>
      )
      bullets = []
    }
  }

  for (const line of lines) {
    const bullet = line.match(/^[-*]\s+(.*)/)
    if (bullet) {
      bullets.push(<li key={key++} style={{ marginBottom: '0.2rem' }}>{renderInline(bullet[1])}</li>)
    } else if (line.trim() === '') {
      flushBullets()
      result.push(<br key={key++} />)
    } else {
      flushBullets()
      result.push(<p key={key++} style={{ margin: '0 0 0.5rem' }}>{renderInline(line)}</p>)
    }
  }
  flushBullets()
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
