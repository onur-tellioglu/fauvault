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

export function ExamCountdown() {
  const [left, setLeft] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!left) return null

  return (
    <div style={{
      width: '100%',
      background: 'var(--bg-elevated)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '8px 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '0.5rem',
    }}>
      <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
        H7 · Technical Faculty · 27 Mar 08:00
      </span>
      <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
        {left.days}g&nbsp;{String(left.hr).padStart(2, '0')}s&nbsp;{String(left.min).padStart(2, '0')}d&nbsp;{String(left.sec).padStart(2, '0')}sn
      </span>
    </div>
  )
}
