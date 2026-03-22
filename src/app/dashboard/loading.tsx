export default function DashboardLoading() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header skeleton */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <div style={{ width: 180, height: 28, borderRadius: 6, background: 'var(--bg-elevated)', animation: 'pulse 1.5s ease-in-out infinite', marginBottom: 8 }} />
            <div style={{ width: 80, height: 14, borderRadius: 4, background: 'var(--bg-elevated)', animation: 'pulse 1.5s ease-in-out infinite' }} />
          </div>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--bg-elevated)', animation: 'pulse 1.5s ease-in-out infinite' }} />
        </div>
        {/* Quick action pills skeleton */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem' }}>
          {[90, 100, 72].map((w, i) => (
            <div key={i} style={{ width: w, height: 32, borderRadius: 7, background: 'var(--bg-elevated)', animation: 'pulse 1.5s ease-in-out infinite' }} />
          ))}
        </div>
        {/* Card grid skeleton */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.875rem' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ height: 140, borderRadius: 10, background: 'var(--bg-elevated)', animation: 'pulse 1.5s ease-in-out infinite' }} />
          ))}
        </div>
      </div>
    </main>
  )
}
