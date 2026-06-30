'use client'
import { useEffect, useState } from 'react'

// Live days/hours/minutes/seconds countdown shown on the dashboard during the
// final week before an exam. The target is parsed client-side so it reflects
// the viewer's local time (the courses.ts exam dates carry no UTC offset).

type Parts = { days: number; hr: number; min: number; sec: number }

function getParts(target: number): Parts | null {
  const diff = target - Date.now()
  if (diff <= 0) return null
  const totalSec = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSec / 86400),
    hr: Math.floor(totalSec / 3600) % 24,
    min: Math.floor(totalSec / 60) % 60,
    sec: totalSec % 60,
  }
}

const UNITS = [
  { key: 'days' as const, label: 'DAYS' },
  { key: 'hr'   as const, label: 'HRS'  },
  { key: 'min'  as const, label: 'MINS' },
  { key: 'sec'  as const, label: 'SECS' },
]

export function LiveCountdown({ examIso }: { examIso: string }) {
  // Start null to avoid an SSR/CSR hydration mismatch (Date.now differs); the
  // real values fill in on mount and then tick every second.
  const [parts, setParts] = useState<Parts | null>(null)

  useEffect(() => {
    const target = new Date(examIso).getTime()
    const tick = () => setParts(getParts(target))
    // First paint is deferred to the next frame so the effect body itself does
    // not call setState synchronously; thereafter it ticks every second.
    const raf = requestAnimationFrame(tick)
    const id = setInterval(tick, 1000)
    return () => {
      cancelAnimationFrame(raf)
      clearInterval(id)
    }
  }, [examIso])

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{
        fontFamily: 'var(--font-geist-mono)',
        fontSize: '0.65rem',
        color: 'var(--text-muted)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: '0.6rem',
      }}>Countdown</div>

      <div style={{ display: 'flex', gap: '0.4rem' }}>
        {UNITS.map(({ key, label }) => (
          <div key={key} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            minWidth: 0,
            padding: '0.6rem 0.2rem',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-default)',
            borderRadius: 8,
            gap: '0.3rem',
          }}>
            <span style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(1.4rem, 4vw, 2rem)',
              fontWeight: 300,
              color: 'var(--error)',
              lineHeight: 1,
              fontVariantNumeric: 'tabular-nums',
            }}>
              {parts ? String(parts[key]).padStart(2, '0') : '--'}
            </span>
            <span style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '0.55rem',
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
