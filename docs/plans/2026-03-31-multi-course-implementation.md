# Multi-Course Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Merge the Renewable Energies study-app into the AIP study-app so both courses are accessible from a single Next.js app with shared accounts, course-scoped routing, and a global leaderboard.

**Architecture:** AIP codebase is extended. All course-specific pages move under a `[course]` dynamic segment. A `courses.ts` registry maps `'aip' | 're'` to their static content files. A single `course` column is added to the `progress` table to namespace progress per course.

**Tech Stack:** Next.js 15, Neon (`@neondatabase/serverless`), TypeScript, Vitest

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `src/lib/content-aip.ts` | Rename from `content.ts` | AIP lecture data |
| `src/lib/content-re.ts` | Create (copy from RE project) | RE lecture data |
| `src/lib/courses.ts` | Create | Course registry: `Course` type + `COURSES` map |
| `src/lib/progress.ts` | Modify | Add `course: Course` param to all functions |
| `src/lib/leaderboard.ts` | Modify | Aggregate across all courses |
| `src/lib/schema.sql` | Modify | Add `course` column, update unique constraint |
| `migrations/004_add_course_to_progress.sql` | Create | DB migration |
| `src/middleware.ts` | Modify | Update matcher to cover `/:course/...` routes |
| `src/app/page.tsx` | Rewrite | Landing page: login + course selection |
| `src/app/[course]/dashboard/page.tsx` | Create (move from `dashboard/`) | Course dashboard |
| `src/app/[course]/dashboard/loading.tsx` | Create (move) | Dashboard skeleton |
| `src/app/[course]/lecture/[id]/page.tsx` | Create (move from `lecture/[id]/`) | Lecture page |
| `src/app/[course]/lecture/[id]/loading.tsx` | Create (move) | Lecture skeleton |
| `src/app/[course]/lecture/[id]/LectureFlowWrapper.tsx` | Create (move) | Client wrapper — sends `course` to `/api/progress` |
| `src/app/[course]/quiz/page.tsx` | Create (move from `quiz/`) | Practice quiz |
| `src/app/[course]/study/page.tsx` | Create (move from `study/`) | Study mode |
| `src/app/dashboard/page.tsx` | Replace | Redirect → `/aip/dashboard` |
| `src/app/leaderboard/page.tsx` | Modify | Global leaderboard (all courses) |
| `src/app/api/progress/route.ts` | Modify | Accept + validate `course` in request body |
| `src/app/api/leaderboard/route.ts` | No change needed | Already calls `getLeaderboard()` |

**Old files to delete** (after pages moved):
- `src/app/lecture/` (directory)
- `src/app/quiz/` (directory)
- `src/app/study/` (directory)
- `src/lib/content.ts` (renamed to content-aip.ts)

---

## Task 1: DB Migration

**Files:**
- Create: `migrations/004_add_course_to_progress.sql`
- Modify: `src/lib/schema.sql`

- [ ] **Step 1: Write the migration file**

```sql
-- migrations/004_add_course_to_progress.sql
ALTER TABLE progress ADD COLUMN IF NOT EXISTS course VARCHAR(10) NOT NULL DEFAULT 'aip';

ALTER TABLE progress DROP CONSTRAINT IF EXISTS progress_user_id_lecture_id_key;
ALTER TABLE progress ADD CONSTRAINT progress_user_id_course_lecture_id_key
  UNIQUE(user_id, course, lecture_id);
```

- [ ] **Step 2: Apply the migration to AIP's Neon DB**

In the Neon console (or via `psql`), run the migration:
```bash
psql "$DATABASE_URL" -f migrations/004_add_course_to_progress.sql
```
Expected: no errors, constraint renamed.

- [ ] **Step 3: Update schema.sql to reflect the new state**

In `src/lib/schema.sql`, replace:
```sql
  UNIQUE(user_id, lecture_id)
```
with:
```sql
  course             VARCHAR(10) NOT NULL DEFAULT 'aip',
  UNIQUE(user_id, course, lecture_id)
```

Final `schema.sql`:
```sql
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  username      VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  token_version INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS progress (
  id                 SERIAL PRIMARY KEY,
  user_id            INTEGER REFERENCES users(id) ON DELETE CASCADE,
  course             VARCHAR(10) NOT NULL DEFAULT 'aip',
  lecture_id         INTEGER NOT NULL,
  concept_index      INTEGER NOT NULL DEFAULT 0,
  mini_quiz_results  JSONB NOT NULL DEFAULT '{}',
  final_quiz_result  JSONB,
  completed_at       TIMESTAMPTZ,
  updated_at         TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course, lecture_id)
);
```

- [ ] **Step 4: Commit**

```bash
git add migrations/004_add_course_to_progress.sql src/lib/schema.sql
git commit -m "feat: add course column to progress table"
```

---

## Task 2: Course Registry

**Files:**
- Rename: `src/lib/content.ts` → `src/lib/content-aip.ts`
- Create: `src/lib/content-re.ts`
- Create: `src/lib/courses.ts`

- [ ] **Step 1: Rename content.ts to content-aip.ts**

```bash
mv src/lib/content.ts src/lib/content-aip.ts
```

The file content is unchanged — just the filename changes.

- [ ] **Step 2: Copy RE content into the AIP project**

```bash
cp /Users/onurtellioglu/Desktop/Exams/Renewable\ Energies/study-app/src/lib/content.ts src/lib/content-re.ts
```

The first line of `content-re.ts` is a comment `// AUTO-GENERATED`. No edits needed.

- [ ] **Step 3: Create courses.ts**

```ts
// src/lib/courses.ts
import type { Content } from './types'
import { content as aipContent } from './content-aip'
import { content as reContent } from './content-re'

export type Course = 'aip' | 're'

export const COURSE_SLUGS: Course[] = ['aip', 're']

export const COURSES: Record<Course, { label: string; shortLabel: string; content: Content }> = {
  aip: { label: 'AI Perspectives', shortLabel: 'AIP', content: aipContent },
  re:  { label: 'Renewable Energies', shortLabel: 'RE',  content: reContent  },
}

export function getCourseContent(course: Course): Content {
  return COURSES[course].content
}

export function isValidCourse(slug: string): slug is Course {
  return COURSE_SLUGS.includes(slug as Course)
}
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/content-aip.ts src/lib/content-re.ts src/lib/courses.ts
git commit -m "feat: add course registry and RE content"
```

---

## Task 3: Update progress.ts

**Files:**
- Modify: `src/lib/progress.ts`

- [ ] **Step 1: Add `course` to ProgressRow type and all functions**

Replace the entire contents of `src/lib/progress.ts`:

```ts
import sql from './db'
import type { Course } from './courses'

export type QuizResult = {
  answers: number[][]
  score: number
  submittedAt: string
}

export type ProgressRow = {
  lecture_id: number
  concept_index: number
  mini_quiz_results: Record<string, QuizResult>
  final_quiz_result: QuizResult | null
  completed_at: string | null
}

export async function getProgress(userId: number, course: Course): Promise<ProgressRow[]> {
  return sql`
    SELECT lecture_id, concept_index, mini_quiz_results, final_quiz_result, completed_at
    FROM progress WHERE user_id = ${userId} AND course = ${course}
  ` as unknown as Promise<ProgressRow[]>
}

export async function upsertProgress(
  userId: number,
  course: Course,
  lectureId: number,
  patch: Partial<Omit<ProgressRow, 'lecture_id'>>
): Promise<void> {
  await sql`
    INSERT INTO progress (user_id, course, lecture_id, concept_index, mini_quiz_results, final_quiz_result, completed_at)
    VALUES (
      ${userId}, ${course}, ${lectureId},
      ${patch.concept_index ?? 0},
      ${JSON.stringify(patch.mini_quiz_results ?? {})}::jsonb,
      ${patch.final_quiz_result ? JSON.stringify(patch.final_quiz_result) : null}::jsonb,
      ${patch.completed_at ?? null}
    )
    ON CONFLICT (user_id, course, lecture_id) DO UPDATE SET
      concept_index     = EXCLUDED.concept_index,
      mini_quiz_results = progress.mini_quiz_results || EXCLUDED.mini_quiz_results,
      final_quiz_result = COALESCE(EXCLUDED.final_quiz_result, progress.final_quiz_result),
      completed_at      = COALESCE(EXCLUDED.completed_at, progress.completed_at),
      updated_at        = NOW()
  `
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/progress.ts
git commit -m "feat: add course param to progress functions"
```

---

## Task 4: Update leaderboard.ts

**Files:**
- Modify: `src/lib/leaderboard.ts`

- [ ] **Step 1: Rewrite getLeaderboard to aggregate across all courses**

Replace entire `src/lib/leaderboard.ts`:

```ts
import sql from './db'
import { COURSES } from './courses'

export type LeaderboardRow = {
  username: string
  completed_count: number
  avg_score: number
  score: number
}

const totalLectures = Object.values(COURSES).reduce(
  (sum, c) => sum + c.content.lectures.length,
  0
)

export { totalLectures }

export async function getLeaderboard(): Promise<LeaderboardRow[]> {
  const rows = await sql`
    SELECT
      u.username,
      COUNT(p.completed_at)::int AS completed_count,
      AVG((p.final_quiz_result->>'score')::float)
        FILTER (WHERE p.final_quiz_result IS NOT NULL) AS avg_score
    FROM users u
    LEFT JOIN progress p ON p.user_id = u.id
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
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/leaderboard.ts
git commit -m "feat: aggregate leaderboard across all courses"
```

---

## Task 5: Update API Routes

**Files:**
- Modify: `src/app/api/progress/route.ts`

- [ ] **Step 1: Add course validation to the progress API**

Replace entire `src/app/api/progress/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { upsertProgress, type ProgressRow } from '@/lib/progress'
import { isValidCourse } from '@/lib/courses'

const ALLOWED_PATCH_KEYS: Array<keyof Omit<ProgressRow, 'lecture_id'>> = [
  'concept_index',
  'mini_quiz_results',
  'final_quiz_result',
  'completed_at',
]

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { course, lectureId, patch } = await req.json()

  if (!isValidCourse(course))
    return NextResponse.json({ error: 'Invalid course' }, { status: 400 })

  if (typeof lectureId !== 'number')
    return NextResponse.json({ error: 'Invalid lectureId' }, { status: 400 })

  if (!patch || typeof patch !== 'object' || Array.isArray(patch))
    return NextResponse.json({ error: 'Invalid patch' }, { status: 400 })

  const safePatch = Object.fromEntries(
    Object.entries(patch).filter(([key]) => ALLOWED_PATCH_KEYS.includes(key as keyof Omit<ProgressRow, 'lecture_id'>))
  ) as Partial<Omit<ProgressRow, 'lecture_id'>>

  await upsertProgress(session.userId, course, lectureId, safePatch)
  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/progress/route.ts
git commit -m "feat: add course param to progress API"
```

---

## Task 6: Update Middleware

**Files:**
- Modify: `src/middleware.ts`

- [ ] **Step 1: Extend matcher to cover `/:course/...` routes**

Only the `config.matcher` line changes. Replace it:

```ts
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/:course/dashboard/:path*',
    '/:course/lecture/:path*',
    '/:course/quiz/:path*',
    '/:course/study/:path*',
    '/profile/:path*',
    '/leaderboard/:path*',
  ],
}
```

- [ ] **Step 2: Commit**

```bash
git add src/middleware.ts
git commit -m "feat: extend middleware matcher for course routes"
```

---

## Task 7: Create [course] Dashboard Page

**Files:**
- Create: `src/app/[course]/dashboard/page.tsx`
- Create: `src/app/[course]/dashboard/loading.tsx`

- [ ] **Step 1: Read the current loading.tsx for reference**

```bash
cat src/app/dashboard/loading.tsx
```

- [ ] **Step 2: Create `src/app/[course]/dashboard/loading.tsx`**

Copy the content of `src/app/dashboard/loading.tsx` verbatim — no changes needed.

- [ ] **Step 3: Create `src/app/[course]/dashboard/page.tsx`**

```tsx
import { redirect, notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { getProgress } from '@/lib/progress'
import { isValidCourse, getCourseContent, COURSES, type Course } from '@/lib/courses'
import { LectureCard } from '@/components/dashboard/LectureCard'
import { ProgressRing } from '@/components/dashboard/ProgressRing'
import { ExamCountdown } from '@/components/layout/ExamCountdown'
import Link from 'next/link'

export default async function DashboardPage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params
  if (!isValidCourse(course)) notFound()

  const session = await getSession()
  if (!session) redirect('/')

  const content = getCourseContent(course as Course)
  const rows = await getProgress(session.userId, course as Course)
  const byLecture = Object.fromEntries(rows.map(r => [r.lecture_id, r]))
  const completed = rows.filter(r => r.completed_at).length

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: 0 }}>
      <ExamCountdown />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '2.5rem 1.5rem' }}>

        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', animation: 'fadeSlideUp 250ms ease forwards' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 2 }}>
              {COURSES[course as Course].label}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              {session.username}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ textAlign: 'center' }}>
              <ProgressRing value={completed / content.lectures.length} size={60} />
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>
                {completed}/{content.lectures.length}
              </p>
            </div>
            <form action="/api/auth/logout" method="POST">
              <button type="submit" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
                Sign out
              </button>
            </form>
          </div>
        </header>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Practice Mode', href: `/${course}/quiz` },
            { label: 'Study Mode', href: `/${course}/study` },
            { label: 'Leaderboard', href: '/leaderboard' },
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

        <div className="lecture-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.875rem' }}>
          {content.lectures.map((lecture, i) => (
            <div key={lecture.id} style={{ animation: `fadeSlideUp 300ms ease ${i * 30}ms both` }}>
              <LectureCard lecture={lecture} progress={byLecture[lecture.id]} course={course as Course} />
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}
```

- [ ] **Step 4: Update LectureCard to accept a `course` prop**

Read `src/components/dashboard/LectureCard.tsx`, then add `course: Course` to its props and update its link from `/lecture/${lecture.id}` to `/${course}/lecture/${lecture.id}`.

The updated href in the component:
```tsx
// Change the Link/anchor href from:
href={`/lecture/${lecture.id}`}
// to:
href={`/${course}/lecture/${lecture.id}`}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/\[course\]/dashboard/ src/components/dashboard/LectureCard.tsx
git commit -m "feat: add [course]/dashboard page"
```

---

## Task 8: Create [course] Lecture Pages

**Files:**
- Create: `src/app/[course]/lecture/[id]/page.tsx`
- Create: `src/app/[course]/lecture/[id]/loading.tsx`
- Create: `src/app/[course]/lecture/[id]/LectureFlowWrapper.tsx`

- [ ] **Step 1: Create `src/app/[course]/lecture/[id]/loading.tsx`**

Copy content of `src/app/lecture/[id]/loading.tsx` verbatim.

- [ ] **Step 2: Create `src/app/[course]/lecture/[id]/page.tsx`**

```tsx
import { notFound, redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { getProgress } from '@/lib/progress'
import { isValidCourse, getCourseContent, type Course } from '@/lib/courses'
import { LectureFlowWrapper } from './LectureFlowWrapper'

export default async function LecturePage({
  params,
}: {
  params: Promise<{ course: string; id: string }>
}) {
  const { course, id } = await params
  if (!isValidCourse(course)) notFound()

  const session = await getSession()
  if (!session) redirect('/')

  const content = getCourseContent(course as Course)
  const lecture = content.lectures.find(l => l.id === parseInt(id))
  if (!lecture) notFound()

  const currentIndex = content.lectures.findIndex(l => l.id === lecture.id)
  const nextLecture = content.lectures[currentIndex + 1] ?? null

  const rows = await getProgress(session.userId, course as Course)
  const progress = rows.find(r => r.lecture_id === lecture.id)

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <a href={`/${course}/dashboard`} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
              ← Dashboard
            </a>
            <span style={{ fontSize: '0.8rem', color: 'var(--border-strong)', margin: '0 6px' }}>·</span>
            <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              L{lecture.id}
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '2rem', fontWeight: 400, color: 'var(--text-primary)', marginTop: 10, marginBottom: 4 }}>
            {lecture.title}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            {lecture.speaker} · {lecture.concepts.length} concepts · {lecture.questions.length} questions
          </p>
        </div>
        <LectureFlowWrapper
          lecture={lecture}
          course={course as Course}
          initialConceptIndex={progress?.concept_index ?? 0}
          nextLectureId={nextLecture?.id ?? null}
        />
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Create `src/app/[course]/lecture/[id]/LectureFlowWrapper.tsx`**

```tsx
'use client'
import { useState } from 'react'
import type { Lecture } from '@/lib/types'
import type { Course } from '@/lib/courses'
import { LectureFlow } from '@/components/lecture/LectureFlow'

type Props = {
  lecture: Lecture
  course: Course
  initialConceptIndex: number
  nextLectureId: number | null
}

const MAX_RETRIES = 3

async function saveWithRetry(course: Course, lectureId: number, patch: object): Promise<void> {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course, lectureId, patch }),
      })
      if (res.ok) return
      if (res.status === 401) return
      throw new Error(`HTTP ${res.status}`)
    } catch (err) {
      if (attempt === MAX_RETRIES - 1) throw err
      await new Promise(r => setTimeout(r, 300 * 2 ** attempt))
    }
  }
}

export function LectureFlowWrapper({ lecture, course, initialConceptIndex, nextLectureId }: Props) {
  const [saveError, setSaveError] = useState(false)

  async function save(patch: object) {
    try {
      await saveWithRetry(course, lecture.id, patch)
      if (saveError) setSaveError(false)
    } catch {
      setSaveError(true)
    }
  }

  return (
    <>
      {saveError && (
        <div role="alert" style={{
          position: 'fixed', bottom: '1rem', left: '50%', transform: 'translateX(-50%)',
          background: '#7f1d1d', color: '#fef2f2', padding: '0.75rem 1.25rem',
          borderRadius: 8, fontSize: '0.875rem', zIndex: 50, maxWidth: '90vw', textAlign: 'center',
        }}>
          Progress could not be saved. Check your connection and try again.
        </div>
      )}
      <LectureFlow
        lecture={lecture}
        initialConceptIndex={initialConceptIndex}
        onProgress={save}
        nextLectureId={nextLectureId}
        course={course}
      />
    </>
  )
}
```

- [ ] **Step 4: Update LectureFlow to accept `course` prop for its "Next lecture" link**

Read `src/components/lecture/LectureFlow.tsx`. Find where it navigates to the next lecture (something like `router.push('/lecture/' + nextLectureId)`) and change it to `router.push('/' + course + '/lecture/' + nextLectureId)`. Add `course: Course` to its Props type.

- [ ] **Step 5: Commit**

```bash
git add src/app/\[course\]/lecture/ src/components/lecture/LectureFlow.tsx
git commit -m "feat: add [course]/lecture pages"
```

---

## Task 9: Create [course] Quiz and Study Pages

Quiz and study pages are split into a thin server component (validates `course`, calls `notFound()`) and a client component (receives `course` as a prop — no `useParams` needed, no rules-of-hooks issue).

**Files:**
- Create: `src/app/[course]/quiz/page.tsx`
- Create: `src/app/[course]/quiz/QuizClient.tsx`
- Create: `src/app/[course]/study/page.tsx`
- Create: `src/app/[course]/study/StudyClient.tsx`

- [ ] **Step 1: Create `src/app/[course]/quiz/page.tsx`** (server component)

```tsx
import { notFound } from 'next/navigation'
import { isValidCourse, type Course } from '@/lib/courses'
import { QuizClient } from './QuizClient'

export default async function QuizPage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params
  if (!isValidCourse(course)) notFound()
  return <QuizClient course={course as Course} />
}
```

- [ ] **Step 2: Create `src/app/[course]/quiz/QuizClient.tsx`** (client component)

```tsx
'use client'
import { useState } from 'react'
import { COURSES, type Course } from '@/lib/courses'
import { QuizQuestion } from '@/components/quiz/QuizQuestion'

export function QuizClient({ course }: { course: Course }) {
  const content = COURSES[course].content

  const [lectureId, setLectureId] = useState<number | 'all'>('all')
  const [qi, setQi] = useState(0)
  const [scores, setScores] = useState<number[]>([])
  const [answered, setAnswered] = useState(false)
  const [done, setDone] = useState(false)

  const questions = lectureId === 'all'
    ? content.lectures.flatMap(l => l.questions)
    : (content.lectures.find(l => l.id === lectureId)?.questions ?? [])

  async function handleAnswer(selected: number[], score: number) {
    setScores(prev => [...prev, score])
    setAnswered(true)
    if (lectureId !== 'all') {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          course,
          lectureId,
          patch: {
            mini_quiz_results: {
              [questions[qi].id]: { answers: [selected], score, submittedAt: new Date().toISOString() },
            },
          },
        }),
      })
    }
  }

  function next() {
    if (qi + 1 >= questions.length) { setDone(true); return }
    setQi(i => i + 1); setAnswered(false)
  }

  function reset() { setQi(0); setScores([]); setAnswered(false); setDone(false) }

  if (done) {
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length
    return (
      <main style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', animation: 'fadeSlideUp 300ms ease forwards' }}>
          <div style={{ fontFamily: 'var(--font-fraunces)', fontSize: '7rem', fontWeight: 300, color: 'var(--accent)', lineHeight: 1 }}>
            {Math.round(avg * 100)}%
          </div>
          <p style={{ color: 'var(--text-secondary)', marginTop: 10 }}>{scores.length} questions</p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '2rem' }}>
            <button onClick={reset} style={{ padding: '10px 22px', background: 'var(--accent)', color: '#0C0C10', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', minHeight: 44 }}>
              Try Again
            </button>
            <a href={`/${course}/dashboard`} style={{ padding: '10px 22px', border: '1px solid var(--border-default)', borderRadius: 8, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', minHeight: 44 }}>
              ← Dashboard
            </a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <a href={`/${course}/dashboard`} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none' }}>← Dashboard</a>
          <select
            value={lectureId}
            onChange={e => { setLectureId(e.target.value === 'all' ? 'all' : Number(e.target.value)); reset() }}
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', padding: '6px 10px', borderRadius: 6, fontSize: '0.8rem' }}
          >
            <option value="all">All Lectures (Practice)</option>
            {content.lectures.map(l => <option key={l.id} value={l.id}>L{l.id} — {l.title}</option>)}
          </select>
        </div>
        {questions.length > 0 ? (
          <>
            <QuizQuestion
              key={questions[qi].id}
              question={questions[qi]}
              onAnswer={handleAnswer}
              questionIndex={qi}
              totalQuestions={questions.length}
            />
            {answered && (
              <button onClick={next} style={{ marginTop: '1.5rem', padding: '10px 22px', background: 'var(--accent)', color: '#0C0C10', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', minHeight: 44 }}>
                {qi + 1 < questions.length ? 'Next →' : 'Results →'}
              </button>
            )}
          </>
        ) : (
          <p style={{ color: 'var(--text-muted)' }}>No questions available.</p>
        )}
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Create `src/app/[course]/study/page.tsx`** (server component)

```tsx
import { notFound } from 'next/navigation'
import { isValidCourse, type Course } from '@/lib/courses'
import { StudyClient } from './StudyClient'

export default async function StudyPage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params
  if (!isValidCourse(course)) notFound()
  return <StudyClient course={course as Course} />
}
```

- [ ] **Step 4: Create `src/app/[course]/study/StudyClient.tsx`** (client component)

```tsx
'use client'
import { useState } from 'react'
import { COURSES, type Course } from '@/lib/courses'
import { ConceptSection } from '@/components/lecture/ConceptSection'

export function StudyClient({ course }: { course: Course }) {
  const content = COURSES[course].content
  const [lecture, setLecture] = useState(content.lectures[0])
  const [ci, setCi] = useState(0)

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '2rem' }}>
        <nav style={{ borderRight: '1px solid var(--border-subtle)', paddingRight: '1.5rem' }}>
          <a href={`/${course}/dashboard`} style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textDecoration: 'none', display: 'block', marginBottom: '1rem' }}>
            ← Dashboard
          </a>
          <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Lectures
          </p>
          {content.lectures.map(l => (
            <button key={l.id} onClick={() => { setLecture(l); setCi(0) }} style={{
              display: 'block', width: '100%', textAlign: 'left', padding: '5px 8px', borderRadius: 5,
              background: lecture.id === l.id ? 'var(--bg-elevated)' : 'none',
              color: lecture.id === l.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              border: 'none', cursor: 'pointer', fontSize: '0.78rem', marginBottom: 1,
            }}>
              {l.id}. {l.title.slice(0, 22)}{l.title.length > 22 ? '…' : ''}
            </button>
          ))}
        </nav>
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {lecture.concepts.map((_, i) => (
              <button key={i} onClick={() => setCi(i)} style={{
                padding: '3px 10px', borderRadius: 5, border: '1px solid',
                borderColor: i === ci ? 'var(--accent)' : 'var(--border-default)',
                background: i === ci ? 'var(--accent-subtle)' : 'transparent',
                color: i === ci ? 'var(--accent)' : 'var(--text-muted)',
                fontSize: '0.72rem', cursor: 'pointer',
              }}>{i + 1}</button>
            ))}
          </div>
          {lecture.concepts[ci]
            ? <ConceptSection heading={lecture.concepts[ci].heading} body={lecture.concepts[ci].body} index={ci} total={lecture.concepts.length} />
            : <p style={{ color: 'var(--text-muted)' }}>No concepts for this lecture.</p>
          }
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/\[course\]/quiz/ src/app/\[course\]/study/
git commit -m "feat: add [course]/quiz and [course]/study pages"
```

---

## Task 10: New Landing Page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Rewrite `src/app/page.tsx` as course-selection landing page**

```tsx
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { AuthForm } from '@/components/layout/AuthForm'
import { COURSES, COURSE_SLUGS } from '@/lib/courses'
import Link from 'next/link'

export default async function HomePage() {
  const session = await getSession()

  if (session) {
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
            {COURSE_SLUGS.map(slug => (
              <Link key={slug} href={`/${slug}/dashboard`} style={{
                padding: '1.25rem 2rem', border: '1px solid var(--border-default)', borderRadius: 10,
                textDecoration: 'none', background: 'var(--bg-surface)', minWidth: 180,
                transition: 'border-color 150ms ease',
              }}>
                <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '1.5rem', color: 'var(--border-strong)', marginBottom: 4 }}>
                  {COURSES[slug].shortLabel}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                  {COURSES[slug].label}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  {COURSES[slug].content.lectures.length} lectures
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

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: new landing page with course selection"
```

---

## Task 11: Update Leaderboard Page

**Files:**
- Modify: `src/app/leaderboard/page.tsx`

- [ ] **Step 1: Rewrite leaderboard page to use totalLectures from leaderboard.ts**

```tsx
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { getLeaderboard, totalLectures } from '@/lib/leaderboard'
import Link from 'next/link'

export default async function LeaderboardPage() {
  const session = await getSession()
  if (!session) redirect('/')

  const rows = await getLeaderboard()

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>

        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', animation: 'fadeSlideUp 250ms ease forwards' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 2 }}>
              Leaderboard
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              {rows.length} participant{rows.length !== 1 ? 's' : ''} · all courses
            </p>
          </div>
          <Link href="/" style={{
            fontSize: '0.82rem', color: 'var(--text-muted)', textDecoration: 'none',
            padding: '9px 18px', border: '1px solid var(--border-default)',
            borderRadius: 7, background: 'var(--bg-surface)',
          }}>
            ← Home
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

- [ ] **Step 2: Commit**

```bash
git add src/app/leaderboard/page.tsx
git commit -m "feat: update leaderboard page for global multi-course view"
```

---

## Task 12: Backward-Compat Redirect & Cleanup

**Files:**
- Modify: `src/app/dashboard/page.tsx`
- Delete: `src/app/lecture/` directory
- Delete: `src/app/quiz/` directory
- Delete: `src/app/study/` directory

- [ ] **Step 1: Replace old dashboard page with redirect**

Replace the entire contents of `src/app/dashboard/page.tsx`:

```tsx
import { redirect } from 'next/navigation'

export default function DashboardRedirect() {
  redirect('/aip/dashboard')
}
```

- [ ] **Step 2: Delete old course-specific pages**

```bash
rm -rf src/app/lecture src/app/quiz src/app/study
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add /dashboard redirect and remove old course pages"
```

---

## Task 13: Build Check

- [ ] **Step 1: Run the build**

```bash
npm run build
```

Expected: no TypeScript errors, no missing module errors.

If you see `Cannot find module '@/lib/content'`: search for any remaining `from '@/lib/content'` imports and update them to `from '@/lib/courses'` or the appropriate `content-aip`/`content-re` file.

- [ ] **Step 2: Run dev server and smoke-test**

```bash
npm run dev
```

Visit:
- `http://localhost:3000` → should show course selection (if logged in) or login form
- `http://localhost:3000/aip/dashboard` → AIP dashboard
- `http://localhost:3000/re/dashboard` → RE dashboard
- `http://localhost:3000/dashboard` → redirects to `/aip/dashboard`
- `http://localhost:3000/leaderboard` → global leaderboard

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: final build verification pass"
```
