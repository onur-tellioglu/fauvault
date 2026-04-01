# Multi-Course Platform Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn the AIP study app into a single multi-course platform where users log in once, see a course selector with progress + rank, and study any course independently.

**Architecture:** The AIP app already has `/[course]/dashboard` routing and both course content files. We need to (1) upgrade the home page course selector to show real data, (2) add per-course leaderboard pages, and (3) add small nav improvements. No schema changes needed.

**Tech Stack:** Next.js 15 App Router, TypeScript, Neon Postgres (`@neondatabase/serverless`), inline styles (no Tailwind classes in use)

---

### Task 1: Add `examDate` + `description` to COURSES registry

**Files:**
- Modify: `src/lib/courses.ts`

**Step 1: Update COURSES type and entries**

Replace the file content:

```typescript
// src/lib/courses.ts
import type { Content } from './types'
import { content as aipContent } from './content-aip'
import { content as reContent } from './content-re'

export type Course = 'aip' | 're'

export const COURSE_SLUGS: Course[] = ['aip', 're']

export const COURSES: Record<Course, {
  label: string
  shortLabel: string
  description: string
  examDate: string   // ISO date string e.g. "2026-04-10T08:00:00"
  content: Content
}> = {
  aip: {
    label: 'AI Perspectives',
    shortLabel: 'AIP',
    description: 'FAU · 21 Lectures',
    examDate: '2026-02-06T08:00:00',
    content: aipContent,
  },
  re: {
    label: 'Renewable Energies',
    shortLabel: 'RE',
    description: 'FAU · 10 Lectures',
    examDate: '2026-04-10T08:00:00',
    content: reContent,
  },
}

export function getCourseContent(course: Course): Content {
  return COURSES[course].content
}

export function isValidCourse(slug: string): slug is Course {
  return COURSE_SLUGS.includes(slug as Course)
}
```

**Step 2: Verify TypeScript compiles**

```bash
cd /Users/onurtellioglu/Desktop/Exams/AIP/study-app
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors (or only pre-existing unrelated errors)

**Step 3: Commit**

```bash
git add src/lib/courses.ts
git commit -m "feat: add examDate and description to COURSES registry"
```

---

### Task 2: Add `getLeaderboardByCourse` and `getRankForUser` to leaderboard.ts

**Files:**
- Modify: `src/lib/leaderboard.ts`

**Step 1: Add the two new functions**

Append to `src/lib/leaderboard.ts` (keep everything existing, add below):

```typescript
import type { Course } from './courses'

export async function getLeaderboardByCourse(course: Course): Promise<LeaderboardRow[]> {
  const rows = await sql`
    SELECT
      u.username,
      COUNT(p.completed_at)::int AS completed_count,
      AVG((p.final_quiz_result->>'score')::float)
        FILTER (WHERE p.final_quiz_result IS NOT NULL) AS avg_score
    FROM users u
    LEFT JOIN progress p ON p.user_id = u.id AND p.course = ${course}
    GROUP BY u.id, u.username
    HAVING COUNT(p.completed_at) > 0
    ORDER BY (
      COUNT(p.completed_at) * 100 +
      COALESCE(
        AVG((p.final_quiz_result->>'score')::float)
          FILTER (WHERE p.final_quiz_result IS NOT NULL),
        0
      ) * 100
    ) DESC
    LIMIT 50
  ` as Array<{ username: string; completed_count: number; avg_score: number | null }>

  return rows.map(r => {
    const completed = Number(r.completed_count)
    const avg = r.avg_score != null ? Number(r.avg_score) : 0
    return {
      username: r.username,
      completed_count: completed,
      avg_score: avg,
      score: completed * 100 + Math.round(avg * 100),
    }
  })
}

export async function getRankForUser(userId: number, course: Course): Promise<number | null> {
  const rows = await sql`
    WITH ranked AS (
      SELECT
        u.id,
        RANK() OVER (
          ORDER BY (
            COUNT(p.completed_at) * 100 +
            COALESCE(
              AVG((p.final_quiz_result->>'score')::float)
                FILTER (WHERE p.final_quiz_result IS NOT NULL),
              0
            ) * 100
          ) DESC
        ) AS rank
      FROM users u
      LEFT JOIN progress p ON p.user_id = u.id AND p.course = ${course}
      GROUP BY u.id
      HAVING COUNT(p.completed_at) > 0
    )
    SELECT rank::int FROM ranked WHERE id = ${userId}
  ` as Array<{ rank: number }>

  return rows[0]?.rank ?? null
}
```

Also add `import type { Course } from './courses'` at the top of the file (after existing imports).

**Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

**Step 3: Commit**

```bash
git add src/lib/leaderboard.ts
git commit -m "feat: add getLeaderboardByCourse and getRankForUser"
```

---

### Task 3: Upgrade home page course selector with progress + rank

**Files:**
- Modify: `src/app/page.tsx`

**Context:** The current home page already renders a course selector for logged-in users (with course name and lecture count), but has no progress or rank data. We're upgrading those cards.

Also need `ProgressRing` — it exists at `src/components/dashboard/ProgressRing.tsx` and takes `value` (0–1) and `size` (number).

**Step 1: Replace the logged-in section of `src/app/page.tsx`**

Full new file:

```typescript
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { AuthForm } from '@/components/layout/AuthForm'
import { COURSES, COURSE_SLUGS, type Course } from '@/lib/courses'
import { getProgress } from '@/lib/progress'
import { getRankForUser } from '@/lib/leaderboard'
import { ProgressRing } from '@/components/dashboard/ProgressRing'
import Link from 'next/link'

export default async function HomePage() {
  const session = await getSession()

  if (session) {
    // Fetch progress + rank for all courses in parallel
    const courseData = await Promise.all(
      COURSE_SLUGS.map(async (slug) => {
        const [rows, rank] = await Promise.all([
          getProgress(session.userId, slug as Course),
          getRankForUser(session.userId, slug as Course),
        ])
        const completed = rows.filter(r => r.completed_at).length
        const total = COURSES[slug].content.lectures.length
        return { slug, completed, total, rank }
      })
    )

    return (
      <main style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ animation: 'fadeSlideUp 300ms ease forwards', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Choose a course
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>
            Welcome back, {session.username}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {courseData.map(({ slug, completed, total, rank }) => (
              <Link key={slug} href={`/${slug}/dashboard`} style={{
                padding: '1.5rem', border: '1px solid var(--border-default)', borderRadius: 12,
                textDecoration: 'none', background: 'var(--bg-surface)', minWidth: 200,
                transition: 'border-color 150ms ease', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
              }}
                onMouseEnter={undefined}
              >
                <ProgressRing value={total > 0 ? completed / total : 0} size={64} />
                <div>
                  <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>
                    {COURSES[slug].shortLabel}
                  </div>
                  <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 500, marginBottom: 2 }}>
                    {COURSES[slug].label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {completed}/{total} lectures
                  </div>
                  {rank !== null && (
                    <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.7rem', color: 'var(--accent)', marginTop: 4 }}>
                      #{rank} on leaderboard
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
          <form action="/api/auth/logout" method="POST" style={{ marginTop: '2rem' }}>
            <button type="submit" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
              Sign out
            </button>
          </form>
        </div>
      </main>
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

**Step 2: Check for TypeScript errors**

```bash
npx tsc --noEmit 2>&1 | head -20
```

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: show progress ring and leaderboard rank on course selector"
```

---

### Task 4: Fix `/dashboard` redirect

**Files:**
- Modify: `src/app/dashboard/page.tsx`

**Context:** Currently redirects to `/aip/dashboard`. Should redirect to `/` (home = course selector).

**Step 1: Replace file**

```typescript
import { redirect } from 'next/navigation'

export default function DashboardRedirect() {
  redirect('/')
}
```

**Step 2: Commit**

```bash
git add src/app/dashboard/page.tsx
git commit -m "fix: redirect /dashboard to / (course selector)"
```

---

### Task 5: Add per-course leaderboard page

**Files:**
- Create: `src/app/[course]/leaderboard/page.tsx`

**Context:** Copy the global leaderboard page structure but filter by course. The existing global leaderboard is at `src/app/leaderboard/page.tsx` — use it as reference for the table UI.

**Step 1: Create the file**

```typescript
import { redirect, notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { getLeaderboardByCourse } from '@/lib/leaderboard'
import { isValidCourse, COURSES, type Course } from '@/lib/courses'
import Link from 'next/link'

export default async function CourseLeaderboardPage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params
  if (!isValidCourse(course)) notFound()

  const session = await getSession()
  if (!session) redirect('/')

  const rows = await getLeaderboardByCourse(course as Course)
  const totalLectures = COURSES[course as Course].content.lectures.length

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>

        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', animation: 'fadeSlideUp 250ms ease forwards' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 2 }}>
              Leaderboard
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              {rows.length} participant{rows.length !== 1 ? 's' : ''} · {COURSES[course as Course].label}
            </p>
          </div>
          <Link href={`/${course}/dashboard`} style={{
            fontSize: '0.82rem', color: 'var(--text-muted)', textDecoration: 'none',
            padding: '9px 18px', border: '1px solid var(--border-default)',
            borderRadius: 7, background: 'var(--bg-surface)',
          }}>
            ← Dashboard
          </Link>
        </header>

        {rows.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', marginTop: '4rem' }}>
            No one has completed a lecture yet. Be the first!
          </p>
        ) : (
          <div style={{ border: '1px solid var(--border-default)', borderRadius: 10, overflow: 'hidden', background: 'var(--bg-surface)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                  {['#', 'User', 'Completed', 'Score'].map(h => (
                    <th key={h} style={{
                      padding: '0.75rem 1rem', textAlign: h === '#' || h === 'Score' || h === 'Completed' ? 'center' : 'left',
                      fontSize: '0.75rem', fontFamily: 'var(--font-geist-mono)',
                      color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => {
                  const isMe = row.username === session.username
                  return (
                    <tr
                      key={row.username}
                      style={{
                        borderBottom: i < rows.length - 1 ? '1px solid var(--border-subtle)' : undefined,
                        background: isMe ? 'var(--bg-highlight, rgba(255,255,255,0.04))' : undefined,
                        animation: `fadeSlideUp 300ms ease ${i * 25}ms both`,
                      }}
                    >
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center', fontFamily: 'var(--font-geist-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: isMe ? 600 : 400 }}>
                        {row.username}{isMe ? ' (you)' : ''}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center', fontFamily: 'var(--font-geist-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {row.completed_count}/{totalLectures}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center', fontFamily: 'var(--font-geist-mono)', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                        {row.score}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </main>
  )
}
```

**Step 2: Commit**

```bash
git add src/app/[course]/leaderboard/page.tsx
git commit -m "feat: add per-course leaderboard page at /[course]/leaderboard"
```

---

### Task 6: Update `/[course]/dashboard` nav links

**Files:**
- Modify: `src/app/[course]/dashboard/page.tsx`

**Context:** The nav button array currently links to `/leaderboard` (global). Change to `/${course}/leaderboard` and add an "← All Courses" link.

**Step 1: Update the nav buttons array**

Find the nav buttons section (currently around line 51–64) and replace:

```typescript
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
          {[
            { label: '← All Courses', href: '/' },
            { label: 'Practice Mode', href: `/${course}/quiz` },
            { label: 'Study Mode', href: `/${course}/study` },
            { label: 'Leaderboard', href: `/${course}/leaderboard` },
            { label: 'Profile', href: '/profile' },
          ].map(({ label, href }) => (
            <Link key={href} href={href} style={{
              padding: '9px 18px', border: '1px solid var(--border-default)', borderRadius: 7,
              color: 'var(--text-secondary)', fontSize: '0.82rem', textDecoration: 'none',
              background: 'var(--bg-surface)', transition: 'border-color 150ms ease',
              minHeight: 44, display: 'inline-flex', alignItems: 'center',
            }}>{label}</Link>
          ))}
        </div>
```

**Step 2: Commit**

```bash
git add src/app/[course]/dashboard/page.tsx
git commit -m "feat: add All Courses link and per-course leaderboard link to dashboard nav"
```

---

### Task 7: Update middleware matcher for new route

**Files:**
- Modify: `src/middleware.ts`

**Context:** The middleware currently matches `/dashboard/:path*` and course-specific paths. The new `/[course]/leaderboard` route needs to be protected. Check the current matcher:

```typescript
export const config = {
  matcher: ['/dashboard/:path*', '/lecture/:path*', '/quiz/:path*', '/study/:path*', '/profile/:path*'],
}
```

This doesn't cover `/:course/leaderboard`. Update to cover all `/:course/*` paths and keep the others.

**Step 1: Update matcher in `src/middleware.ts`**

Replace the config export:

```typescript
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/:course(aip|re)/:path*',
    '/profile/:path*',
  ],
}
```

**Step 2: Verify dev server has no errors**

```bash
tail -5 /tmp/aip-dev.log
```

**Step 3: Commit**

```bash
git add src/middleware.ts
git commit -m "fix: update middleware matcher to cover all course sub-routes"
```

---

### Task 8: Smoke test end-to-end

With dev server running on http://localhost:3001:

1. Visit `/` — should show login form (not logged in)
2. Log in — should show course selector with ProgressRing + rank for each course
3. Click a course — should go to `/[course]/dashboard` with "← All Courses" button
4. Click "← All Courses" — should return to course selector
5. Click "Leaderboard" — should go to `/[course]/leaderboard` (course-filtered)
6. Visit `/dashboard` — should redirect to `/`
7. Visit `/re/leaderboard` — should show RE-only leaderboard
