# Course Picker Page — New UI Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the `/` (Choose a Course) page to match the CourseShell design language — masthead, large Fraunces heading, horizontal course cards, and tweaks panel.

**Architecture:** Extract the authenticated home view into a `'use client'` component (`CoursePicker.tsx`) that receives course data as props from the server component. The server component (`page.tsx`) continues to handle all data fetching. The tweaks panel logic is duplicated from CourseShell (same localStorage keys, same state shape) — CourseShell is not touched.

**Tech Stack:** Next.js 15 App Router, React, TypeScript, inline styles (project convention — no Tailwind on these pages)

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `src/components/layout/CoursePicker.tsx` | Client component: masthead, tweaks panel, course cards, sign-out |
| Modify | `src/app/page.tsx` | Pass course data + appVersion to `<CoursePicker>` |

---

## Task 1: Create `CoursePicker.tsx`

**Files:**
- Create: `src/components/layout/CoursePicker.tsx`

- [ ] **Step 1: Create the file with the full component**

```tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ProgressRing } from '@/components/dashboard/ProgressRing'

const ACCENT_COLORS = [
  '#E8B84B', '#E8934B', '#E8604A', '#E84B7A', '#C84BE8', '#7A4BE8',
  '#4B7AE8', '#4BC8E8', '#4BE8C8', '#4BE87A', '#A0E84B', '#E8D84B',
]

export interface CoursePickerCourse {
  slug: string
  shortLabel: string
  label: string
  completed: number
  total: number
  rank: number | null
}

export interface CoursePickerProps {
  username: string
  appVersion: string
  courses: CoursePickerCourse[]
}

export function CoursePicker({ username, appVersion, courses }: CoursePickerProps) {
  const [showTweaks, setShowTweaks] = useState(false)
  const [accentColor, setAccentColor] = useState('#E8B84B')
  const [density, setDensity] = useState<'Compact' | 'Normal' | 'Roomy'>('Roomy')

  useEffect(() => {
    try {
      const savedAccent = localStorage.getItem('fv-accent')
      const savedDensity = localStorage.getItem('fv-density')
      if (savedAccent && ACCENT_COLORS.includes(savedAccent)) setAccentColor(savedAccent)
      if (savedDensity === 'Compact' || savedDensity === 'Normal' || savedDensity === 'Roomy') {
        setDensity(savedDensity as typeof density)
      }
    } catch {}
  }, [])

  const setAccent = (c: string) => {
    setAccentColor(c)
    try { localStorage.setItem('fv-accent', c) } catch {}
  }

  const setDensityVal = (d: typeof density) => {
    setDensity(d)
    try { localStorage.setItem('fv-density', d) } catch {}
  }

  const gapMap = { Compact: '0.5rem', Normal: '0.75rem', Roomy: '1rem' }
  const padMap = { Compact: '1rem 1.25rem', Normal: '1.25rem 1.5rem', Roomy: '1.5rem 1.75rem' }

  const css = `
    :root {
      --accent: ${accentColor};
      --accent-subtle: ${accentColor}1e;
      --accent-hover: ${accentColor}cc;
      --accent-dim: ${accentColor}88;
    }
    .course-picker-card:hover {
      border-color: var(--accent) !important;
    }
  `

  return (
    <>
      <style>{css}</style>
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', fontFamily: 'var(--font-geist)' }}>

        {/* Masthead */}
        <header style={{ borderBottom: '1px solid var(--border-default)', padding: '2.25rem 2.5rem' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                The FAUVault Daily · v{appVersion}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link href="/profile" style={{ textDecoration: 'none' }}>
                  <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.82rem', color: 'var(--text-primary)' }}>@{username}</span>
                </Link>
                <button
                  onClick={() => setShowTweaks(p => !p)}
                  style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.82rem', color: 'var(--text-muted)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', lineHeight: 1 }}
                >
                  ⚙
                </button>
              </div>
            </div>
            <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: 300, lineHeight: 1.0, color: 'var(--text-primary)', margin: '0.25rem 0', letterSpacing: '-0.01em' }}>
              Choose a{' '}
              <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>course</em>
            </h1>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Welcome back, {username}
            </p>
          </div>
        </header>

        {/* Course Cards */}
        <main style={{ maxWidth: 700, margin: '0 auto', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: gapMap[density] }}>
          {courses.map(({ slug, shortLabel, label, completed, total, rank }) => (
            <Link
              key={slug}
              href={`/${slug}/dashboard`}
              className="course-picker-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                padding: padMap[density],
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                borderRadius: 12,
                textDecoration: 'none',
                transition: 'border-color 150ms ease',
              }}
            >
              <ProgressRing value={total > 0 ? completed / total : 0} size={64} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>
                  {shortLabel}
                </div>
                <div style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 500, marginBottom: 2 }}>
                  {label}
                </div>
                <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  {completed}/{total} lectures
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                {rank !== null && (
                  <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.7rem', color: 'var(--accent)', marginBottom: 4 }}>
                    #{rank} on leaderboard
                  </div>
                )}
                <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>→</div>
              </div>
            </Link>
          ))}
        </main>

        {/* Sign out */}
        <div style={{ textAlign: 'center', paddingBottom: '2rem' }}>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
              Sign out
            </button>
          </form>
        </div>

        {/* Tweaks Panel */}
        {showTweaks && (
          <>
            <div onClick={() => setShowTweaks(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
            <div style={{ position: 'fixed', top: '4.5rem', right: '1.5rem', zIndex: 50, background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 12, padding: '1.25rem', minWidth: 220, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /path/to/study-app && npx tsc --noEmit
```

Expected: no errors related to `CoursePicker.tsx`

---

## Task 2: Update `page.tsx` to use `CoursePicker`

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace the authenticated view with `<CoursePicker>`**

Replace the entire contents of `src/app/page.tsx` with:

```tsx
import type { Metadata } from 'next'
import { getSession } from '@/lib/auth'
import { AuthForm } from '@/components/layout/AuthForm'
import { COURSES, COURSE_SLUGS, type Course } from '@/lib/courses'
import { getProgress } from '@/lib/progress'
import { getRankForUser } from '@/lib/leaderboard'
import { CoursePicker } from '@/components/layout/CoursePicker'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function generateMetadata(): Promise<Metadata> {
  const session = await getSession()
  return { title: session ? 'Choose a Course' : 'Sign In' }
}

function getAppVersion(): string {
  try {
    const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'))
    return pkg.version ?? '0.0.0'
  } catch {
    return '0.0.0'
  }
}

export default async function HomePage() {
  const session = await getSession()

  if (session) {
    const courses = await Promise.all(
      COURSE_SLUGS.map(async (slug) => {
        const [rows, rank] = await Promise.all([
          getProgress(session.userId, slug as Course),
          getRankForUser(session.userId, slug as Course),
        ])
        const completed = rows.filter(r => r.completed_at).length
        const total = COURSES[slug].content.lectures.length
        return {
          slug,
          shortLabel: COURSES[slug].shortLabel,
          label: COURSES[slug].label,
          completed,
          total,
          rank,
        }
      })
    )

    return (
      <CoursePicker
        username={session.username}
        appVersion={getAppVersion()}
        courses={courses}
      />
    )
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ animation: 'fadeSlideUp 300ms ease forwards' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.6rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 6 }}>
              Study App
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>AI Perspectives · Renewable Energies</p>
          </div>
          <AuthForm />
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Start dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:3000` while logged in. Check:
- Masthead shows `THE FVUVAULT DAILY · v2.8.0` on the left, `@username` + ⚙ on the right
- Large Fraunces heading: `Choose a course` with "course" in accent gold italic
- `Welcome back, username` in muted mono below heading
- Each course shows as a horizontal card: ProgressRing left, shortLabel/name/lectures center, rank + `→` right
- Hovering a card changes border color to accent gold
- Clicking ⚙ opens tweaks panel with density + accent controls
- Changing accent color updates card borders and ProgressRing strokes
- Changing density adjusts card padding and gap between cards
- Tweaks persist after page reload (localStorage)
- Clicking a card navigates to `/{slug}/dashboard`
- Sign out button still works

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/CoursePicker.tsx src/app/page.tsx
git commit -m "feat: redesign course picker page to match CourseShell UI"
git push
```
