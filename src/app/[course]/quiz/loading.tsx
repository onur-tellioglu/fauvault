export default function QuizLoading() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ width: 260, height: 32, borderRadius: 6, background: 'var(--bg-elevated)', animation: 'pulse 1.5s ease-in-out infinite', marginBottom: '0.75rem' }} />
        <div style={{ width: 180, height: 20, borderRadius: 4, background: 'var(--bg-elevated)', animation: 'pulse 1.5s ease-in-out infinite', marginBottom: '2rem' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ height: 56, borderRadius: 10, background: 'var(--bg-elevated)', animation: 'pulse 1.5s ease-in-out infinite' }} />
          ))}
        </div>
      </div>
    </main>
  )
}
