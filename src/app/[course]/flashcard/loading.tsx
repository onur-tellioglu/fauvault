export default function FlashcardLoading() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 420, height: 260, borderRadius: 16, background: 'var(--bg-elevated)', animation: 'pulse 1.5s ease-in-out infinite' }} />
    </main>
  )
}
