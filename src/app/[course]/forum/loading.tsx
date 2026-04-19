export default function ForumLoading() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ height: 100, borderRadius: 10, background: 'var(--bg-elevated)', animation: 'pulse 1.5s ease-in-out infinite', marginBottom: '2rem' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ height: 80, borderRadius: 10, background: 'var(--bg-elevated)', animation: 'pulse 1.5s ease-in-out infinite' }} />
          ))}
        </div>
      </div>
    </main>
  )
}
