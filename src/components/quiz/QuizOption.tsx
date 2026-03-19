'use client'
type State = 'default' | 'selected' | 'correct' | 'wrong' | 'missed'
type Props = { label: string; text: string; state: State; onClick?: () => void; disabled?: boolean }

const styles: Record<State, React.CSSProperties> = {
  default:  { background: 'var(--bg-surface)',     borderColor: 'var(--border-default)', color: 'var(--text-primary)' },
  selected: { background: 'var(--accent-subtle)',  borderColor: 'var(--accent)',         color: 'var(--accent-hover)' },
  correct:  { background: 'var(--success-subtle)', borderColor: 'var(--success)',        color: 'var(--text-primary)' },
  wrong:    { background: 'var(--error-subtle)',   borderColor: 'var(--error)',          color: 'var(--text-primary)' },
  missed:   { background: 'var(--success-subtle)', borderColor: 'var(--success)',        color: 'var(--text-secondary)', opacity: 0.7 },
}

export function QuizOption({ label, text, state, onClick, disabled }: Props) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: '100%', textAlign: 'left', padding: '13px 16px',
      border: '1px solid', borderRadius: 10, cursor: disabled ? 'default' : 'pointer',
      transition: 'all 120ms ease', fontFamily: 'var(--font-body)', fontSize: '0.9rem',
      ...styles[state],
    }}>
      <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.75rem', marginRight: 10, opacity: 0.5 }}>{label}</span>
      {text}
    </button>
  )
}
