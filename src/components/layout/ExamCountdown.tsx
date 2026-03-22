'use client'
import { useEffect, useState } from 'react'

const EXAM_TIME = new Date('2026-03-27T08:00:00+01:00').getTime()

function getTimeLeft() {
  const diff = EXAM_TIME - Date.now()
  if (diff <= 0) return null
  const totalSec = Math.floor(diff / 1000)
  const sec = totalSec % 60
  const totalMin = Math.floor(totalSec / 60)
  const min = totalMin % 60
  const totalHr = Math.floor(totalMin / 60)
  const hr = totalHr % 24
  const days = Math.floor(totalHr / 24)
  return { days, hr, min, sec }
}

const UNITS = [
  { key: 'days' as const, label: 'DAYS' },
  { key: 'hr'   as const, label: 'HRS'  },
  { key: 'min'  as const, label: 'MINS' },
  { key: 'sec'  as const, label: 'SECS' },
]

export function ExamCountdown() {
  const [left, setLeft] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!left) return null

  const urgent = left.days === 0
  const numColor = urgent ? 'var(--error)' : 'var(--accent)'

  return (
    <div style={{
      width: '100%',
      background: 'var(--bg-elevated)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '1.25rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.75rem',
    }}>
      <span style={{
        fontFamily: 'var(--font-geist-mono)',
        fontSize: '0.72rem',
        color: 'var(--text-muted)',
        letterSpacing: '0.08em',
      }}>
        H7 · Technical Faculty · 27 Mar 08:00
      </span>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        {UNITS.map(({ key, label }) => (
          <div key={key} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: 72,
            height: 72,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-default)',
            borderRadius: 8,
            gap: '0.2rem',
          }}>
            <span style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '2rem',
              fontWeight: 600,
              color: numColor,
              lineHeight: 1,
            }}>
              {String(left[key]).padStart(2, '0')}
            </span>
            <span style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '0.6rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
