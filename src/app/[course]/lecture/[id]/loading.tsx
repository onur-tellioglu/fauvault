export default function LectureLoading() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        {/* Back link + title skeleton */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ width: 80, height: 14, borderRadius: 4, background: 'var(--bg-elevated)', animation: 'pulse 1.5s ease-in-out infinite', marginBottom: 12 }} />
          <div style={{ width: '70%', height: 36, borderRadius: 6, background: 'var(--bg-elevated)', animation: 'pulse 1.5s ease-in-out infinite', marginBottom: 8 }} />
          <div style={{ width: 200, height: 14, borderRadius: 4, background: 'var(--bg-elevated)', animation: 'pulse 1.5s ease-in-out infinite' }} />
        </div>
        {/* Content area skeleton */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[100, 80, 90, 70, 85].map((w, i) => (
            <div key={i} style={{ width: `${w}%`, height: 16, borderRadius: 4, background: 'var(--bg-elevated)', animation: 'pulse 1.5s ease-in-out infinite' }} />
          ))}
          <div style={{ width: '40%', height: 40, borderRadius: 8, background: 'var(--bg-elevated)', animation: 'pulse 1.5s ease-in-out infinite', marginTop: '1rem' }} />
        </div>
      </div>
    </main>
  )
}
