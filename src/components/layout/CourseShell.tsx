'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuthModal } from './AuthModalContext'
import { ACCENT_COLORS } from '@/lib/constants'

const SHELL_SEGMENTS = ['/dashboard', '/lectures', '/quiz', '/flashcard', '/forum', '/leaderboard', '/exam-prep']

function splitTitle(label: string) {
  const i = label.lastIndexOf(' ')
  return i === -1 ? [label, ''] : [label.slice(0, i), label.slice(i + 1)]
}

export interface CourseShellProps {
  courseSlug: string
  courseLabel: string
  username: string | null
  hasFlashcards: boolean
  hasExamPrep: boolean
  appVersion: string
  children: React.ReactNode
}

export function CourseShell({ courseSlug, courseLabel, username, hasFlashcards, hasExamPrep, appVersion, children }: CourseShellProps) {
  const pathname = usePathname()
  const { triggerAuthModal } = useAuthModal()
  const [showTweaks, setShowTweaks] = useState(false)
  const [accentColor, setAccentColor] = useState('#E8B84B')
  const [density, setDensity] = useState<'Compact' | 'Normal' | 'Roomy'>('Roomy')
  const [pendingHref, setPendingHref] = useState<string | null>(null)
  const tabRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null)

  useEffect(() => {
    try {
      const savedAccent = localStorage.getItem('fv-accent')
      const savedDensity = localStorage.getItem('fv-density')
      if (savedAccent && (ACCENT_COLORS as readonly string[]).includes(savedAccent)) setAccentColor(savedAccent)
      if (savedDensity === 'Compact' || savedDensity === 'Normal' || savedDensity === 'Roomy') {
        setDensity(savedDensity as typeof density)
      }
    } catch {}
  }, [])

  const setAccent = useCallback((c: string) => {
    setAccentColor(c)
    try { localStorage.setItem('fv-accent', c) } catch {}
  }, [])

  const setDensityVal = useCallback((d: typeof density) => {
    setDensity(d)
    try { localStorage.setItem('fv-density', d) } catch {}
  }, [])

  const isShellRoute = SHELL_SEGMENTS.some(s => pathname.endsWith(s))

  const navItems = [
    { label: 'Today', href: `/${courseSlug}/dashboard` },
    { label: 'Lectures', href: `/${courseSlug}/lectures` },
    { label: 'Practice', href: `/${courseSlug}/quiz` },
    ...(hasExamPrep ? [{ label: 'Exam Prep', href: `/${courseSlug}/exam-prep` }] : []),
    ...(hasFlashcards ? [{ label: 'Flashcards', href: `/${courseSlug}/flashcard` }] : []),
    { label: 'Forum', href: `/${courseSlug}/forum` },
    { label: 'Leaderboard', href: `/${courseSlug}/leaderboard` },
  ]

  const activeHref = pendingHref ?? navItems.find(item => pathname.endsWith('/' + item.href.split('/').pop()!))?.href ?? ''

  useEffect(() => {
    setPendingHref(null)
  }, [pathname])

  useEffect(() => {
    const el = tabRefs.current.get(activeHref)
    if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth })
  }, [activeHref])

  if (!isShellRoute) return <>{children}</>

  const gapMap = { Compact: '1.25rem', Normal: '1.75rem', Roomy: '2.5rem' }
  const padMap = { Compact: '1.25rem 1.5rem', Normal: '1.75rem 2rem', Roomy: '2.25rem 2.5rem' }

  const css = `
    :root {
      --accent: ${accentColor};
      --accent-subtle: ${accentColor}1e;
      --accent-hover: ${accentColor}cc;
      --accent-dim: ${accentColor}88;
      --density-gap: ${gapMap[density]};
      --density-pad: ${padMap[density]};
    }
    @media (max-width: 600px) {
      .masthead-app-name { display: none; }
    }
  `

  const [titleFirst, titleLast] = splitTitle(courseLabel)

  return (
    <>
      <style>{css}</style>
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', fontFamily: 'var(--font-geist)', position: 'relative', overflowX: 'hidden' }}>

        {/* Masthead */}
        <header style={{ borderBottom: '1px solid var(--border-default)', padding: 'var(--density-pad)' }}>
          <div className="course-shell-masthead" style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link
                  href="/"
                  style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textDecoration: 'none', transition: 'color 150ms ease' }}
                >
                  ← Courses
                </Link>
                <span className="masthead-app-name" style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  The FAUVault Daily · v{appVersion}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {username ? (
                  <Link href="/profile" style={{ textDecoration: 'none' }}>
                    <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.82rem', color: 'var(--text-primary)' }}>@{username}</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => triggerAuthModal({ reason: 'save_progress' })}
                    style={{
                      fontFamily: 'var(--font-geist-mono)', fontSize: '0.75rem',
                      color: 'var(--accent)', background: 'transparent',
                      border: '1px solid var(--accent)', borderRadius: 6,
                      padding: '4px 10px', cursor: 'pointer', letterSpacing: '0.04em',
                    }}
                  >
                    Save Progress →
                  </button>
                )}
                <button
                  onClick={() => setShowTweaks(p => !p)}
                  style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.82rem', color: 'var(--text-muted)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', lineHeight: 1 }}
                >
                  ⚙
                </button>
              </div>
            </div>
            <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: 300, lineHeight: 1.0, color: 'var(--text-primary)', margin: '0.25rem 0', letterSpacing: '-0.01em' }}>
              {titleFirst}{' '}
              <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{titleLast}</em>
            </h1>
          </div>
        </header>

        {/* Nav */}
        <nav className="course-shell-nav" style={{ borderBottom: '1px solid var(--border-default)', padding: '0 2.5rem', background: 'var(--bg-base)', position: 'sticky', top: 0, zIndex: 30, overflowX: 'auto' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 0, flexWrap: 'nowrap', position: 'relative' }}>
            {navItems.map(item => {
              const segment = item.href.split('/').pop()!
              const active = pathname.endsWith('/' + segment)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={(el) => {
                    if (el) tabRefs.current.set(item.href, el)
                    else tabRefs.current.delete(item.href)
                  }}
                  onClick={() => setPendingHref(item.href)}
                  style={{
                    display: 'inline-block',
                    padding: '0.85rem 1.1rem',
                    fontSize: '0.82rem',
                    color: active ? 'var(--accent)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    borderBottom: '2px solid transparent',
                    fontWeight: active ? 500 : 400,
                    whiteSpace: 'nowrap',
                    transition: 'color 150ms ease',
                    marginBottom: '-1px',
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
            {indicator && (
              <div style={{
                position: 'absolute',
                bottom: -1,
                left: indicator.left,
                width: indicator.width,
                height: 2,
                background: 'var(--accent)',
                transition: 'left 150ms ease, width 150ms ease',
                pointerEvents: 'none',
              }} />
            )}
          </div>
        </nav>

        {/* Content */}
        {children}

        {/* Tweaks Panel */}
        {showTweaks && (
          <>
            <div onClick={() => setShowTweaks(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
            <div className="tweaks-panel" style={{ position: 'fixed', top: '4.5rem', right: '1.5rem', zIndex: 50, background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 12, padding: '1.25rem', minWidth: 220, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Tweaks · FAUVault</span>
                <button onClick={() => setShowTweaks(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem', lineHeight: 1, padding: '0 2px' }}>×</button>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Density</div>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  {(['Compact', 'Normal', 'Roomy'] as const).map(d => (
                    <button
                      key={d}
                      onClick={() => setDensityVal(d)}
                      style={{ flex: 1, padding: '5px 0', fontSize: '0.72rem', fontFamily: 'var(--font-geist-mono)', background: density === d ? 'var(--accent)' : 'var(--bg-overlay)', color: density === d ? '#0C0C10' : 'var(--text-muted)', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: density === d ? 600 : 400, transition: 'all 150ms ease' }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Accent Hue</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.35rem' }}>
                  {ACCENT_COLORS.map(c => (
                    <button
                      key={c}
                      onClick={() => setAccent(c)}
                      title={c}
                      style={{ width: '100%', aspectRatio: '1', background: c, border: accentColor === c ? '2px solid white' : '2px solid transparent', borderRadius: 6, cursor: 'pointer', transition: 'transform 100ms ease' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
