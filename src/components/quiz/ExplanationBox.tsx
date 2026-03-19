export function ExplanationBox({ text }: { text: string }) {
  return (
    <div style={{
      background: 'var(--bg-elevated)', borderLeft: '3px solid var(--accent)',
      borderRadius: '0 8px 8px 0', padding: '0.875rem 1.125rem', marginTop: '0.875rem',
      animation: 'fadeSlideDown 200ms ease forwards',
    }}>
      <p style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>
        Explanation
      </p>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{text}</p>
    </div>
  )
}
