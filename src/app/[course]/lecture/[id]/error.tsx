'use client'
import Link from 'next/link'
import { useEffect } from 'react'

export default function LectureError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Something went wrong
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          This lecture could not be loaded. Try again or go back to the lecture list.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            onClick={reset}
            style={{
              padding: '9px 18px', background: 'var(--accent)', color: '#0C0C10',
              border: 'none', borderRadius: 7, fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
            }}
          >
            Try again
          </button>
          <Link
            href="../../lectures"
            style={{
              padding: '9px 18px', border: '1px solid var(--border-default)', borderRadius: 7,
              background: 'var(--bg-surface)', color: 'var(--text-secondary)', fontSize: '0.85rem',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
            }}
          >
            ← Back to lectures
          </Link>
        </div>
      </div>
    </main>
  )
}
