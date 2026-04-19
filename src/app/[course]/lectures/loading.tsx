export default function LecturesLoading() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
          <div style={{ width: 90, height: 36, borderRadius: 8, background: 'var(--bg-elevated)', animation: 'pulse 1.5s ease-in-out infinite' }} />
          <div style={{ width: 90, height: 36, borderRadius: 8, background: 'var(--bg-elevated)', animation: 'pulse 1.5s ease-in-out infinite' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ height: 160, borderRadius: 10, background: 'var(--bg-elevated)', animation: 'pulse 1.5s ease-in-out infinite' }} />
          ))}
        </div>
      </div>
    </main>
  )
}
