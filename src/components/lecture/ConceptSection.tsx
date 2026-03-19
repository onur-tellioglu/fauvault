type Props = { heading: string; body: string; index: number; total: number }

export function ConceptSection({ heading, body, index, total }: Props) {
  return (
    <div style={{ animation: 'fadeSlideUp 300ms ease forwards' }}>
      <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 10 }}>
        Concept {index + 1} / {total}
      </p>
      <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
        {heading}
      </h2>
      <div style={{ fontSize: '0.975rem', lineHeight: 1.75, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
        {body}
      </div>
    </div>
  )
}
