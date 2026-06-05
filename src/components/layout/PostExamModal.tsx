'use client'
import { useEffect, useState } from 'react'
import { EXAM_TIME } from '@/lib/exam-config'

const STORAGE_KEY = 'exam-dismissed'

export function PostExamModal() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (Date.now() < EXAM_TIME) return
    if (localStorage.getItem(STORAGE_KEY)) return
    setVisible(true)
  }, [])

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      onClick={dismiss}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        background: 'rgba(12, 12, 16, 0.85)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-default)',
          borderRadius: 16,
          padding: '2.5rem 2rem',
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div style={{
          fontFamily: 'var(--font-fraunces)',
          fontSize: '2.2rem',
          fontWeight: 400,
          color: 'var(--accent)',
          lineHeight: 1.1,
        }}>
          You made it! 🎓
        </div>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.95rem',
          lineHeight: 1.6,
          margin: 0,
        }}>
          The exam is over. Hope it went well —<br />
          best of luck with your results!
        </p>

        <button
          onClick={dismiss}
          style={{
            marginTop: '0.5rem',
            padding: '0.6rem 1.5rem',
            background: 'var(--accent-subtle)',
            border: '1px solid var(--accent-dim)',
            borderRadius: 8,
            color: 'var(--accent)',
            fontFamily: 'var(--font-geist)',
            fontSize: '0.85rem',
            cursor: 'pointer',
            alignSelf: 'center',
          }}
        >
          Thanks ✓
        </button>
      </div>
    </div>
  )
}
