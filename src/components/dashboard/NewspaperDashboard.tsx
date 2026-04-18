'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

export interface CurrentLectureInfo {
  id: number
  title: string
  speaker: string
  conceptCount: number
  questionCount: number
  conceptIndex: number
  readPct: number
}

export interface ClassmateInfo {
  username: string
  completedCount: number
}

export interface NewspaperDashboardProps {
  username: string
  courseSlug: string
  courseLabel: string
  examDate: string
  currentLecture: CurrentLectureInfo | null
  completedCount: number
  totalLectures: number
  hasFlashcards: boolean
  topUsers: ClassmateInfo[]
  daysUntilExam: number | null
  issueNumber: number
  volumeNumber: number
}

const ACCENT_COLORS = [
  '#E8B84B', '#E8934B', '#E8604A', '#E84B7A', '#C84BE8', '#7A4BE8',
  '#4B7AE8', '#4BC8E8', '#4BE8C8', '#4BE87A', '#A0E84B', '#E8D84B',
]

const STATUS_LABELS = [
  'crushing it', 'reviewing concepts', 'quiz sprint', 'flashcards',
  'on a streak', 'grinding hard', 'deep focus', 'exam ready',
]

function statusForUser(user: ClassmateInfo): string {
  if (user.completedCount === 0) return 'just getting started'
  const idx = (user.username.charCodeAt(0) + user.completedCount) % STATUS_LABELS.length
  return STATUS_LABELS[idx]
}

function splitTitle(label: string) {
  const i = label.lastIndexOf(' ')
  return i === -1 ? [label, ''] : [label.slice(0, i), label.slice(i + 1)]
}

function getIssueDate() {
  return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase()
}

function getLectureProgress(pct: number): string {
  if (pct === 0) return '0%'
  return `${Math.round(pct * 100)}%`
}

function getEstimatedMinutes(conceptCount: number, conceptIndex: number): number {
  const remaining = Math.max(0, conceptCount - conceptIndex)
  return Math.max(1, remaining * 2)
}

export function NewspaperDashboard(props: NewspaperDashboardProps) {
  const {
    username, courseSlug, courseLabel, examDate,
    currentLecture, completedCount, totalLectures,
    hasFlashcards, topUsers, daysUntilExam,
    issueNumber, volumeNumber,
  } = props

  const [showTweaks, setShowTweaks] = useState(false)
  const [accentColor, setAccentColor] = useState('#E8B84B')
  const [density, setDensity] = useState<'Compact' | 'Normal' | 'Roomy'>('Roomy')

  useEffect(() => {
    try {
      const savedAccent = localStorage.getItem('fv-accent')
      const savedDensity = localStorage.getItem('fv-density')
      if (savedAccent && ACCENT_COLORS.includes(savedAccent)) setAccentColor(savedAccent)
      if (savedDensity === 'Compact' || savedDensity === 'Normal' || savedDensity === 'Roomy') {
        setDensity(savedDensity)
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

  const gap = density === 'Compact' ? '1.25rem' : density === 'Normal' ? '1.75rem' : '2.5rem'
  const sectionPad = density === 'Compact' ? '1.25rem 1.5rem' : density === 'Normal' ? '1.75rem 2rem' : '2.25rem 2.5rem'

  const [titleFirst, titleLast] = splitTitle(courseLabel)
  const onTrackCount = completedCount
  const readPct = currentLecture?.readPct ?? 0
  const readPctLabel = getLectureProgress(readPct)
  const estMinutes = currentLecture
    ? getEstimatedMinutes(currentLecture.conceptCount, currentLecture.conceptIndex)
    : 0

  const css = `
    :root {
      --accent: ${accentColor};
      --accent-subtle: ${accentColor}1e;
      --accent-hover: ${accentColor}cc;
      --accent-dim: ${accentColor}88;
    }
  `

  const navItems = [
    { label: 'Today', href: `/${courseSlug}/dashboard`, active: true },
    { label: 'Lectures', href: `/${courseSlug}/dashboard` },
    { label: 'Practice', href: `/${courseSlug}/quiz` },
    ...(hasFlashcards ? [{ label: 'Flashcards', href: `/${courseSlug}/flashcard` }] : []),
    { label: 'Forum', href: `/${courseSlug}/forum` },
    { label: 'Leaderboard', href: `/${courseSlug}/leaderboard` },
    { label: 'Profile', href: '/profile' },
  ]

  return (
    <>
      <style>{css}</style>
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg-base)',
        fontFamily: 'var(--font-geist)',
        position: 'relative',
      }}>

        {/* ── Masthead ── */}
        <header style={{
          borderBottom: '1px solid var(--border-default)',
          padding: sectionPad,
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {/* Top bar */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: '0.75rem',
            }}>
              <span style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                The FAUVault Daily · Vol. {volumeNumber} · Issue {issueNumber}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '0.6rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>Reader</div>
                  <div style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '0.82rem',
                    color: 'var(--text-primary)',
                  }}>@{username}</div>
                </div>
                <button
                  onClick={() => setShowTweaks(p => !p)}
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 6,
                    padding: '4px 10px',
                    cursor: 'pointer',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Tweaks
                </button>
              </div>
            </div>

            {/* Big serif title */}
            <h1 style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              fontWeight: 300,
              lineHeight: 1.0,
              color: 'var(--text-primary)',
              margin: '0.25rem 0',
              letterSpacing: '-0.01em',
            }}>
              {titleFirst}{' '}
              <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>
                {titleLast}
              </em>
            </h1>
          </div>
        </header>

        {/* ── Nav ── */}
        <nav style={{
          borderBottom: '1px solid var(--border-default)',
          padding: '0 2.5rem',
          background: 'var(--bg-base)',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: '0', overflowX: 'auto' }}>
            {navItems.map(item => (
              <Link
                key={item.href + item.label}
                href={item.href}
                style={{
                  display: 'inline-block',
                  padding: '0.85rem 1.1rem',
                  fontSize: '0.82rem',
                  color: item.active ? 'var(--accent)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  borderBottom: item.active ? '2px solid var(--accent)' : '2px solid transparent',
                  fontWeight: item.active ? 500 : 400,
                  whiteSpace: 'nowrap',
                  transition: 'color 150ms ease',
                  marginBottom: '-1px',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* ── Main body ── */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: sectionPad }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap, alignItems: 'start' }}>

            {/* Left — hero */}
            <section>
              <div style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '0.65rem',
                color: 'var(--accent)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}>
                Front Page · Pick up where you left off
              </div>

              {currentLecture ? (
                <>
                  <h2 style={{
                    fontFamily: 'var(--font-fraunces)',
                    fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
                    fontWeight: 400,
                    color: 'var(--text-primary)',
                    lineHeight: 1.15,
                    marginBottom: '1rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {currentLecture.title}
                  </h2>

                  <p style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '1.75rem',
                    maxWidth: 580,
                  }}>
                    {readPct > 0 && readPct < 1 ? (
                      <>
                        You&apos;re{' '}
                        <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{readPctLabel}</span>
                        {' '}through lecture {currentLecture.id} with {currentLecture.speaker}.
                        About {estMinutes} minutes of focused reading until the end
                        {currentLecture.questionCount > 0
                          ? ` — then a ${currentLecture.questionCount}-question quiz to close it out.`
                          : '.'}
                      </>
                    ) : readPct === 0 ? (
                      <>
                        Lecture {currentLecture.id} with {currentLecture.speaker} is waiting for you.
                        {currentLecture.conceptCount} concepts · {currentLecture.questionCount} questions ·{' '}
                        ~{currentLecture.conceptCount * 2} min read.
                      </>
                    ) : (
                      <>
                        You&apos;ve completed lecture {currentLecture.id} with {currentLecture.speaker}.
                        {completedCount < totalLectures
                          ? ' Ready to tackle the next one?'
                          : ' All lectures done — you\'re fully prepared!'}
                      </>
                    )}
                  </p>

                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <Link href={`/${courseSlug}/lecture/${currentLecture.id}`} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      background: 'var(--accent)', color: '#0C0C10',
                      padding: '0.7rem 1.5rem', borderRadius: 8,
                      fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none',
                      transition: 'opacity 150ms ease',
                    }}>
                      {readPct > 0 && readPct < 1 ? 'Continue reading' : readPct === 0 ? 'Start reading' : 'Review'} →
                    </Link>
                    <Link href={`/${courseSlug}/study`} style={{
                      display: 'inline-flex', alignItems: 'center',
                      background: 'transparent', color: 'var(--text-primary)',
                      padding: '0.7rem 1.5rem', borderRadius: 8,
                      border: '1px solid var(--border-strong)',
                      fontSize: '0.88rem', textDecoration: 'none',
                      transition: 'border-color 150ms ease',
                    }}>
                      Skim headlines
                    </Link>
                  </div>

                  {/* Lecture meta */}
                  <div style={{
                    display: 'flex', gap: '1.5rem', marginTop: '2.5rem',
                    paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)',
                    flexWrap: 'wrap',
                  }}>
                    {[
                      currentLecture.speaker,
                      `${currentLecture.conceptCount} concepts`,
                      `${currentLecture.questionCount} questions`,
                      `~${currentLecture.conceptCount * 2} min read`,
                    ].map((item, i) => (
                      <span key={i} style={{
                        fontFamily: 'var(--font-geist-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}>· {item}</span>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ padding: '3rem 0' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    All lectures completed. You&apos;re fully prepared!
                  </p>
                  <Link href={`/${courseSlug}/quiz`} style={{
                    display: 'inline-block', marginTop: '1rem',
                    background: 'var(--accent)', color: '#0C0C10',
                    padding: '0.7rem 1.5rem', borderRadius: 8,
                    fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none',
                  }}>
                    Practice Mode →
                  </Link>
                </div>
              )}
            </section>

            {/* Right — sidebar */}
            <aside style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: gap }}>

              {/* Countdown */}
              {daysUntilExam !== null && daysUntilExam > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                  }}>Countdown</div>
                  <div style={{
                    fontFamily: 'var(--font-fraunces)',
                    fontSize: 'clamp(4rem, 8vw, 5.5rem)',
                    fontWeight: 300,
                    color: daysUntilExam <= 7 ? 'var(--error)' : 'var(--accent)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}>
                    {daysUntilExam}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    marginTop: '0.25rem',
                  }}>
                    days until the exam
                  </div>
                </div>
              )}

              {/* Lecture progress */}
              <div style={{ marginBottom: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{
                  fontFamily: 'var(--font-fraunces)',
                  fontSize: '1.8rem',
                  fontWeight: 300,
                  color: 'var(--text-primary)',
                }}>
                  <span style={{ color: 'var(--accent)' }}>{onTrackCount}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}> of {totalLectures}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  lectures completed
                </div>

                {/* Progress bar */}
                <div style={{ height: 3, background: 'var(--progress-bg)', borderRadius: 2, marginTop: '0.75rem' }}>
                  <div style={{
                    height: '100%', borderRadius: 2,
                    background: `linear-gradient(90deg, var(--accent-dim), var(--accent))`,
                    width: `${totalLectures > 0 ? Math.round((onTrackCount / totalLectures) * 100) : 0}%`,
                    transition: 'width 600ms cubic-bezier(0.4,0,0.2,1)',
                  }} />
                </div>
              </div>

              {/* Exam info */}
              {examDate && (
                <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.08em',
                    lineHeight: 1.6,
                  }}>
                    H7 · Technical Faculty
                    <br />
                    {new Date(examDate).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </div>
                </div>
              )}

              {/* Quick links */}
              <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}>Quick links</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {[
                    { label: 'Practice Mode', href: `/${courseSlug}/quiz` },
                    { label: 'Study Mode', href: `/${courseSlug}/study` },
                    ...(hasFlashcards ? [{ label: 'Flashcards', href: `/${courseSlug}/flashcard` }] : []),
                    { label: '← All Courses', href: '/' },
                  ].map(({ label, href }) => (
                    <Link key={href + label} href={href} style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      padding: '0.35rem 0',
                      borderBottom: '1px solid var(--border-subtle)',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                      {label}
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* ── Studying Now ── */}
          {topUsers.length > 0 && (
            <section style={{ marginTop: gap, paddingTop: gap, borderTop: '1px solid var(--border-default)' }}>
              <div style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}>
                Leaderboard · {topUsers.length} classmates
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '0.75rem',
              }}>
                {topUsers.map((user, i) => (
                  <div key={user.username} style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 10,
                    padding: '0.9rem 1rem',
                    animation: `fadeSlideUp 300ms ease ${i * 40}ms both`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                      <span style={{
                        width: 7, height: 7, borderRadius: '50%',
                        background: 'var(--success)',
                        display: 'inline-block', flexShrink: 0,
                      }} />
                      <span style={{
                        fontFamily: 'var(--font-geist-mono)',
                        fontSize: '0.78rem',
                        color: 'var(--text-primary)',
                        fontWeight: 500,
                      }}>
                        @{user.username}
                      </span>
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      paddingLeft: '1.1rem',
                    }}>
                      {statusForUser(user)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ── Tweaks Panel ── */}
        {showTweaks && (
          <>
            <div
              onClick={() => setShowTweaks(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 40,
              }}
            />
            <div style={{
              position: 'fixed', top: '4.5rem', right: '1.5rem', zIndex: 50,
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              borderRadius: 12,
              padding: '1.25rem',
              minWidth: 220,
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: '1.25rem',
              }}>
                <span style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}>Tweaks · FAUVault</span>
                <button
                  onClick={() => setShowTweaks(false)}
                  style={{
                    background: 'none', border: 'none', color: 'var(--text-muted)',
                    cursor: 'pointer', fontSize: '1rem', lineHeight: 1, padding: '0 2px',
                  }}
                >×</button>
              </div>

              {/* Density */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '0.6rem', color: 'var(--text-muted)',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}>Density</div>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  {(['Compact', 'Normal', 'Roomy'] as const).map(d => (
                    <button
                      key={d}
                      onClick={() => setDensityVal(d)}
                      style={{
                        flex: 1,
                        padding: '5px 0',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-geist-mono)',
                        background: density === d ? 'var(--accent)' : 'var(--bg-overlay)',
                        color: density === d ? '#0C0C10' : 'var(--text-muted)',
                        border: 'none',
                        borderRadius: 6,
                        cursor: 'pointer',
                        fontWeight: density === d ? 600 : 400,
                        transition: 'all 150ms ease',
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent Hue */}
              <div>
                <div style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '0.6rem', color: 'var(--text-muted)',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}>Accent Hue</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.35rem' }}>
                  {ACCENT_COLORS.map(c => (
                    <button
                      key={c}
                      onClick={() => setAccent(c)}
                      title={c}
                      style={{
                        width: '100%', aspectRatio: '1',
                        background: c,
                        border: accentColor === c ? '2px solid white' : '2px solid transparent',
                        borderRadius: 6,
                        cursor: 'pointer',
                        transition: 'transform 100ms ease',
                      }}
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
