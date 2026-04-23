# Guest Access Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Allow unauthenticated visitors to browse all course content (lectures, quizzes, flashcards, exam prep), with auth only required for persisting progress — guest progress is stored in localStorage and carried over after login.

**Architecture:** Remove course routes from the middleware matcher so server components receive `session | null`. Client components save progress to localStorage when unauthenticated and to the API when authenticated. A global `AuthModalContext` lets any component trigger a login modal without redirecting away from the current page. After login, a carry-over prompt offers to bulk-write guest localStorage data to the DB.

**Tech Stack:** Next.js 15 App Router, React 19, JWT auth via `jose`, Neon Postgres, localStorage for guest state.

---

## File Structure

| File | Action | Purpose |
|---|---|---|
| `src/lib/guest-progress.ts` | **Create** | localStorage CRUD for lecture + flashcard progress |
| `src/lib/guest-progress.test.ts` | **Create** | Unit tests for guest-progress helpers |
| `src/components/layout/AuthModalContext.tsx` | **Create** | React context + `useAuthModal` hook |
| `src/components/layout/AuthModal.tsx` | **Create** | Modal shell wrapping `AuthForm` |
| `src/components/layout/GuestCarryOverPrompt.tsx` | **Create** | Post-login prompt to carry over guest progress |
| `src/components/layout/AuthForm.tsx` | **Modify** | Add optional `onSuccess?: () => void` prop |
| `src/components/layout/CourseShell.tsx` | **Modify** | Accept `username: string \| null`; show Sign In button for guests |
| `src/middleware.ts` | **Modify** | Remove course routes from matcher |
| `src/app/[course]/layout.tsx` | **Modify** | Session optional; mount `AuthModalProvider`, `AuthModal`, `GuestCarryOverPrompt` |
| `src/app/[course]/lecture/[id]/page.tsx` | **Modify** | Session optional; pass `isAuthenticated` to wrapper |
| `src/app/[course]/lecture/[id]/LectureFlowWrapper.tsx` | **Modify** | Guest mode: save to localStorage instead of API |
| `src/app/[course]/lectures/page.tsx` | **Modify** | Session optional; pass empty `byLecture` for guests |
| `src/app/[course]/quiz/QuizClient.tsx` | **Modify** | Guest mode: save to localStorage |
| `src/app/[course]/flashcard/page.tsx` | **Modify** | Session optional; read initial state from localStorage for guests |
| `src/app/[course]/flashcard/FlashcardClient.tsx` | **Modify** | Guest mode: save to localStorage |
| `src/app/[course]/exam-prep/[id]/page.tsx` | **Modify** | Remove auth redirect |
| `src/app/[course]/forum/page.tsx` | **Modify** | Session optional; pass `username: null` for guests |
| `src/app/[course]/forum/TipsClient.tsx` | **Modify** | Hide write actions when `username` is null |

---

## Task 1: Create `src/lib/guest-progress.ts`

Pure localStorage utility — no React, no API calls. Mirrors the shape of the DB `progress` and `flashcard_progress` tables.

**Files:**
- Create: `src/lib/guest-progress.ts`
- Create: `src/lib/guest-progress.test.ts`

- [ ] **Step 1.1: Write failing tests**

Create `src/lib/guest-progress.test.ts`:

```ts
import {
  upsertGuestProgress,
  getGuestProgress,
  clearGuestProgress,
  getGuestFlashcardProgress,
  upsertGuestFlashcardProgress,
  hasGuestProgress,
} from './guest-progress'

const mockStorage: Record<string, string> = {}

beforeEach(() => {
  Object.keys(mockStorage).forEach(k => delete mockStorage[k])
  Object.defineProperty(globalThis, 'localStorage', {
    value: {
      getItem: (k: string) => mockStorage[k] ?? null,
      setItem: (k: string, v: string) => { mockStorage[k] = v },
      removeItem: (k: string) => { delete mockStorage[k] },
    },
    writable: true,
    configurable: true,
  })
})

describe('lecture progress', () => {
  it('returns empty array when no data', () => {
    expect(getGuestProgress('aip')).toEqual([])
  })

  it('upserts and retrieves progress', () => {
    upsertGuestProgress('aip', 3, { concept_index: 2 })
    const rows = getGuestProgress('aip')
    expect(rows).toHaveLength(1)
    expect(rows[0].lecture_id).toBe(3)
    expect(rows[0].concept_index).toBe(2)
  })

  it('merges mini_quiz_results on repeated upsert', () => {
    upsertGuestProgress('aip', 1, { mini_quiz_results: { q1: { answers: [[0]], score: 1, submittedAt: 'x' } } })
    upsertGuestProgress('aip', 1, { mini_quiz_results: { q2: { answers: [[1]], score: 0, submittedAt: 'y' } } })
    const rows = getGuestProgress('aip')
    expect(Object.keys(rows[0].mini_quiz_results)).toHaveLength(2)
  })

  it('clears all guest progress', () => {
    upsertGuestProgress('aip', 1, { concept_index: 1 })
    clearGuestProgress()
    expect(getGuestProgress('aip')).toEqual([])
    expect(hasGuestProgress()).toBe(false)
  })

  it('hasGuestProgress returns true when data exists', () => {
    upsertGuestProgress('aip', 1, { concept_index: 1 })
    expect(hasGuestProgress()).toBe(true)
  })
})

describe('flashcard progress', () => {
  it('returns default when no data', () => {
    const p = getGuestFlashcardProgress('aip')
    expect(p.card_index).toBe(0)
    expect(p.known).toEqual([])
  })

  it('saves and retrieves flashcard progress', () => {
    upsertGuestFlashcardProgress('aip', { card_index: 5, known: [1, 3] })
    const p = getGuestFlashcardProgress('aip')
    expect(p.card_index).toBe(5)
    expect(p.known).toEqual([1, 3])
  })
})
```

- [ ] **Step 1.2: Run tests to confirm they fail**

```bash
cd /Users/onurtellioglu/Documents/Exams/AIP/study-app
npx jest src/lib/guest-progress.test.ts --no-coverage 2>&1 | tail -20
```

Expected: FAIL — "Cannot find module './guest-progress'"

- [ ] **Step 1.3: Implement `src/lib/guest-progress.ts`**

```ts
import type { Course } from './courses'
import type { QuizResult } from './progress'

export type GuestProgressRow = {
  lecture_id: number
  concept_index: number
  mini_quiz_results: Record<string, QuizResult>
  final_quiz_result: QuizResult | null
  completed_at: string | null
}

export type GuestFlashcardProgress = {
  card_index: number
  known: number[]
}

const PROGRESS_KEY = 'guest_progress'
const FLASHCARD_KEY = 'guest_flashcard_progress'

function readProgressStore(): Record<string, GuestProgressRow> {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeProgressStore(store: Record<string, GuestProgressRow>): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(store))
  } catch {}
}

export function getGuestProgress(course: Course): GuestProgressRow[] {
  const store = readProgressStore()
  return Object.entries(store)
    .filter(([key]) => key.startsWith(`${course}:`))
    .map(([, row]) => row)
}

export function upsertGuestProgress(
  course: Course,
  lectureId: number,
  patch: Partial<Omit<GuestProgressRow, 'lecture_id'>>
): void {
  const store = readProgressStore()
  const key = `${course}:${lectureId}`
  const existing = store[key] ?? {
    lecture_id: lectureId,
    concept_index: 0,
    mini_quiz_results: {},
    final_quiz_result: null,
    completed_at: null,
  }
  store[key] = {
    ...existing,
    ...patch,
    mini_quiz_results: {
      ...existing.mini_quiz_results,
      ...(patch.mini_quiz_results ?? {}),
    },
    final_quiz_result: patch.final_quiz_result ?? existing.final_quiz_result,
    completed_at: patch.completed_at ?? existing.completed_at,
  }
  writeProgressStore(store)
}

export function hasGuestProgress(): boolean {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    if (!raw) return false
    return Object.keys(JSON.parse(raw)).length > 0
  } catch {
    return false
  }
}

export function clearGuestProgress(): void {
  try {
    localStorage.removeItem(PROGRESS_KEY)
    localStorage.removeItem(FLASHCARD_KEY)
  } catch {}
}

export function getGuestFlashcardProgress(course: Course): GuestFlashcardProgress {
  try {
    const raw = localStorage.getItem(FLASHCARD_KEY)
    if (!raw) return { card_index: 0, known: [] }
    const store: Record<string, GuestFlashcardProgress> = JSON.parse(raw)
    return store[course] ?? { card_index: 0, known: [] }
  } catch {
    return { card_index: 0, known: [] }
  }
}

export function upsertGuestFlashcardProgress(
  course: Course,
  patch: Partial<GuestFlashcardProgress>
): void {
  try {
    const raw = localStorage.getItem(FLASHCARD_KEY)
    const store: Record<string, GuestFlashcardProgress> = raw ? JSON.parse(raw) : {}
    const existing = store[course] ?? { card_index: 0, known: [] }
    store[course] = { ...existing, ...patch }
    localStorage.setItem(FLASHCARD_KEY, JSON.stringify(store))
  } catch {}
}
```

- [ ] **Step 1.4: Run tests to confirm they pass**

```bash
npx jest src/lib/guest-progress.test.ts --no-coverage 2>&1 | tail -10
```

Expected: PASS — 8 tests passed

- [ ] **Step 1.5: Commit**

```bash
git add src/lib/guest-progress.ts src/lib/guest-progress.test.ts
git commit -m "feat: add guest-progress localStorage helpers"
git push
```

---

## Task 2: Update `AuthForm` — add `onSuccess` prop

`AuthForm` currently always does `router.push('/dashboard')` after login. When used inside a modal (mid-course), we want it to stay on the current page and signal success instead.

**Files:**
- Modify: `src/components/layout/AuthForm.tsx`

- [ ] **Step 2.1: Add `onSuccess` prop**

Replace the `export function AuthForm()` signature and the success handler:

```ts
// Old signature:
export function AuthForm() {

// New signature:
export function AuthForm({ onSuccess }: { onSuccess?: () => void } = {}) {
```

Replace the success block inside `handleSubmit` (after `setLoading(false)`):

```ts
// Old:
if (!res.ok) { setError(data.error); return }
router.push('/dashboard')
router.refresh()

// New:
if (!res.ok) { setError(data.error); return }
router.refresh()
if (onSuccess) {
  onSuccess()
} else {
  router.push('/dashboard')
}
```

- [ ] **Step 2.2: Verify TypeScript compiles**

```bash
cd /Users/onurtellioglu/Documents/Exams/AIP/study-app
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors

- [ ] **Step 2.3: Commit**

```bash
git add src/components/layout/AuthForm.tsx
git commit -m "feat: add onSuccess prop to AuthForm"
git push
```

---

## Task 3: Create `AuthModalContext`

**Files:**
- Create: `src/components/layout/AuthModalContext.tsx`

- [ ] **Step 3.1: Create the context**

```tsx
'use client'
import { createContext, useContext, useState, useCallback } from 'react'
import { hasGuestProgress } from '@/lib/guest-progress'

type AuthModalOptions = { reason?: string }

type AuthModalContextValue = {
  isOpen: boolean
  options: AuthModalOptions
  triggerAuthModal: (opts?: AuthModalOptions) => void
  closeModal: () => void
  showCarryOver: boolean
  onLoginSuccess: () => void
  dismissCarryOver: () => void
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null)

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<AuthModalOptions>({})
  const [showCarryOver, setShowCarryOver] = useState(false)

  const triggerAuthModal = useCallback((opts: AuthModalOptions = {}) => {
    setOptions(opts)
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => setIsOpen(false), [])

  const onLoginSuccess = useCallback(() => {
    setIsOpen(false)
    try {
      if (hasGuestProgress()) setShowCarryOver(true)
    } catch {}
  }, [])

  const dismissCarryOver = useCallback(() => setShowCarryOver(false), [])

  return (
    <AuthModalContext.Provider value={{ isOpen, options, triggerAuthModal, closeModal, showCarryOver, onLoginSuccess, dismissCarryOver }}>
      {children}
    </AuthModalContext.Provider>
  )
}

export function useAuthModal(): AuthModalContextValue {
  const ctx = useContext(AuthModalContext)
  if (!ctx) throw new Error('useAuthModal must be used within AuthModalProvider')
  return ctx
}
```

- [ ] **Step 3.2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors

- [ ] **Step 3.3: Commit**

```bash
git add src/components/layout/AuthModalContext.tsx
git commit -m "feat: add AuthModalContext"
git push
```

---

## Task 4: Create `AuthModal`

**Files:**
- Create: `src/components/layout/AuthModal.tsx`

- [ ] **Step 4.1: Create the modal**

```tsx
'use client'
import { useAuthModal } from './AuthModalContext'
import { AuthForm } from './AuthForm'

const REASON_MESSAGES: Record<string, string> = {
  save_progress: 'Sign in to save your progress permanently.',
  post_forum: 'Sign in to post in the forum.',
}

export function AuthModal() {
  const { isOpen, options, closeModal, onLoginSuccess } = useAuthModal()
  if (!isOpen) return null

  const message = options.reason ? REASON_MESSAGES[options.reason] : null

  return (
    <>
      <div
        onClick={closeModal}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
          zIndex: 100, backdropFilter: 'blur(2px)',
        }}
      />
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 101,
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-default)',
        borderRadius: 16,
        padding: '2rem',
        width: 'min(90vw, 400px)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--text-primary)', margin: 0 }}>
              Welcome back
            </h2>
            {message && (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 4, marginBottom: 0 }}>
                {message}
              </p>
            )}
          </div>
          <button
            onClick={closeModal}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.25rem', lineHeight: 1, padding: '0 4px' }}
          >
            ×
          </button>
        </div>
        <AuthForm onSuccess={onLoginSuccess} />
      </div>
    </>
  )
}
```

- [ ] **Step 4.2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors

- [ ] **Step 4.3: Commit**

```bash
git add src/components/layout/AuthModal.tsx
git commit -m "feat: add AuthModal component"
git push
```

---

## Task 5: Create `GuestCarryOverPrompt`

**Files:**
- Create: `src/components/layout/GuestCarryOverPrompt.tsx`

- [ ] **Step 5.1: Create the component**

```tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthModal } from './AuthModalContext'
import { getGuestProgress, clearGuestProgress } from '@/lib/guest-progress'
import type { Course } from '@/lib/courses'

export function GuestCarryOverPrompt() {
  const { showCarryOver, dismissCarryOver } = useAuthModal()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()

  if (!showCarryOver) return null

  async function handleYes() {
    setSaving(true)
    setError(false)
    try {
      const COURSE_SLUGS: Course[] = ['aip', 're', 'de1', 'ap']
      const entries: Array<{ course: Course; lectureId: number; patch: object }> = []
      for (const course of COURSE_SLUGS) {
        for (const row of getGuestProgress(course)) {
          entries.push({
            course,
            lectureId: row.lecture_id,
            patch: {
              concept_index: row.concept_index,
              mini_quiz_results: row.mini_quiz_results,
              final_quiz_result: row.final_quiz_result,
              completed_at: row.completed_at,
            },
          })
        }
      }
      await Promise.all(
        entries.map(({ course, lectureId, patch }) =>
          fetch('/api/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ course, lectureId, patch }),
          })
        )
      )
      clearGuestProgress()
      dismissCarryOver()
      router.refresh()
    } catch {
      setError(true)
      setSaving(false)
    }
  }

  function handleNo() {
    clearGuestProgress()
    dismissCarryOver()
  }

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 110 }} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 111,
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-default)',
        borderRadius: 16,
        padding: '2rem',
        width: 'min(90vw, 380px)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
      }}>
        <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.4rem', fontWeight: 400, color: 'var(--text-primary)', marginTop: 0, marginBottom: '0.75rem' }}>
          Save guest progress?
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 0, marginBottom: '1.5rem' }}>
          You made progress as a guest. Save it to your account?
        </p>
        {error && (
          <p style={{ color: 'var(--error)', fontSize: '0.8rem', marginBottom: '1rem' }}>
            Something went wrong. Try again.
          </p>
        )}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={handleYes}
            disabled={saving}
            style={{
              flex: 1, padding: '10px', background: 'var(--accent)', color: '#0C0C10',
              border: 'none', borderRadius: 8, fontWeight: 600, cursor: saving ? 'wait' : 'pointer',
              fontFamily: 'var(--font-body)', fontSize: '0.9rem',
            }}
          >
            {saving ? 'Saving…' : 'Yes, save it'}
          </button>
          <button
            onClick={handleNo}
            style={{
              flex: 1, padding: '10px', background: 'transparent', color: 'var(--text-muted)',
              border: '1px solid var(--border-default)', borderRadius: 8, cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontSize: '0.9rem',
            }}
          >
            No thanks
          </button>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 5.2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors

- [ ] **Step 5.3: Commit**

```bash
git add src/components/layout/GuestCarryOverPrompt.tsx
git commit -m "feat: add GuestCarryOverPrompt"
git push
```

---

## Task 6: Update middleware

**Files:**
- Modify: `src/middleware.ts`

- [ ] **Step 6.1: Remove course routes from matcher**

In `src/middleware.ts`, replace the `config` export:

```ts
// Old:
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/:course(aip|re)/:path*',
    '/profile/:path*',
  ],
}

// New:
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
  ],
}
```

- [ ] **Step 6.2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors

- [ ] **Step 6.3: Commit**

```bash
git add src/middleware.ts
git commit -m "feat: remove course routes from auth middleware"
git push
```

---

## Task 7: Update `CourseShell` — optional username + Sign In button

**Files:**
- Modify: `src/components/layout/CourseShell.tsx`

- [ ] **Step 7.1: Change `username` prop type and add Sign In button**

Change the `CourseShellProps` interface — `username: string` → `username: string | null`:

```ts
export interface CourseShellProps {
  courseSlug: string
  courseLabel: string
  username: string | null   // was: string
  hasFlashcards: boolean
  hasExamPrep: boolean
  appVersion: string
  children: React.ReactNode
}
```

Add import at top of file (after existing imports):

```ts
import { useAuthModal } from './AuthModalContext'
```

Inside the `CourseShell` function, add after the existing `useState`/`useEffect` hooks:

```ts
const { triggerAuthModal } = useAuthModal()
```

Replace the username link block in the masthead (the `<Link href="/profile" ...>` and surrounding `<div>`):

```tsx
// Old:
<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
  <Link href="/profile" style={{ textDecoration: 'none' }}>
    <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.82rem', color: 'var(--text-primary)' }}>@{username}</span>
  </Link>
  <button
    onClick={() => setShowTweaks(p => !p)}
    ...

// New:
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
    ...
```

- [ ] **Step 7.2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors

- [ ] **Step 7.3: Commit**

```bash
git add src/components/layout/CourseShell.tsx
git commit -m "feat: CourseShell supports guest username with Sign In button"
git push
```

---

## Task 8: Update `[course]/layout.tsx` — session optional

**Files:**
- Modify: `src/app/[course]/layout.tsx`

- [ ] **Step 8.1: Remove redirect, mount providers**

Replace the entire file content:

```tsx
import { notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { isValidCourse, COURSES, type Course } from '@/lib/courses'
import { CourseShell } from '@/components/layout/CourseShell'
import { AuthModalProvider } from '@/components/layout/AuthModalContext'
import { AuthModal } from '@/components/layout/AuthModal'
import { GuestCarryOverPrompt } from '@/components/layout/GuestCarryOverPrompt'
import { getExamPrepExams } from '@/lib/exam-prep'
import { version } from '../../../package.json'

export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ course: string }>
}) {
  const { course } = await params
  if (!isValidCourse(course)) notFound()

  const session = await getSession()

  const courseData = COURSES[course as Course]
  const hasFlashcards = courseData.content.lectures.some(
    (l: { flashcards?: unknown[] }) => l.flashcards?.length
  )
  const hasExamPrep = getExamPrepExams(course as Course).length > 0

  return (
    <AuthModalProvider>
      <CourseShell
        courseSlug={course}
        courseLabel={courseData.label}
        username={session?.username ?? null}
        hasFlashcards={hasFlashcards}
        hasExamPrep={hasExamPrep}
        appVersion={version}
      >
        {children}
      </CourseShell>
      <AuthModal />
      <GuestCarryOverPrompt />
    </AuthModalProvider>
  )
}
```

- [ ] **Step 8.2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors

- [ ] **Step 8.3: Commit**

```bash
git add src/app/\[course\]/layout.tsx
git commit -m "feat: make course layout session-optional, mount auth modal providers"
git push
```

---

## Task 9: Lecture page + `LectureFlowWrapper` — guest mode

**Files:**
- Modify: `src/app/[course]/lecture/[id]/page.tsx`
- Modify: `src/app/[course]/lecture/[id]/LectureFlowWrapper.tsx`

- [ ] **Step 9.1: Update `lecture/[id]/page.tsx`**

Replace the file content:

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { getProgress } from '@/lib/progress'
import { isValidCourse, getCourseContent, type Course } from '@/lib/courses'
import { LectureFlowWrapper } from './LectureFlowWrapper'

export async function generateMetadata({ params }: { params: Promise<{ course: string; id: string }> }): Promise<Metadata> {
  const { course, id } = await params
  if (!isValidCourse(course)) return { title: 'Lecture' }
  const lecture = getCourseContent(course as Course).lectures.find(l => l.id === parseInt(id))
  return { title: lecture?.title ?? 'Lecture' }
}

export default async function LecturePage({
  params,
}: {
  params: Promise<{ course: string; id: string }>
}) {
  const { course, id } = await params
  if (!isValidCourse(course)) notFound()

  const content = getCourseContent(course as Course)
  const lecture = content.lectures.find(l => l.id === parseInt(id))
  if (!lecture) notFound()

  const currentIndex = content.lectures.findIndex(l => l.id === lecture.id)
  const nextLecture = content.lectures[currentIndex + 1] ?? null

  const session = await getSession()
  let initialConceptIndex = 0
  if (session) {
    const rows = await getProgress(session.userId, course as Course)
    const progress = rows.find(r => r.lecture_id === lecture.id)
    initialConceptIndex = progress?.concept_index ?? 0
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <a href={`/${course}/lectures`} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
              ← Lectures
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
          initialConceptIndex={initialConceptIndex}
          nextLectureId={nextLecture?.id ?? null}
          isAuthenticated={!!session}
        />
      </div>
    </main>
  )
}
```

- [ ] **Step 9.2: Update `LectureFlowWrapper.tsx`**

Replace the file content:

```tsx
'use client'
import { useState, useCallback } from 'react'
import type { Lecture } from '@/lib/types'
import type { Course } from '@/lib/courses'
import { LectureFlow } from '@/components/lecture/LectureFlow'
import { upsertGuestProgress } from '@/lib/guest-progress'

type Props = {
  lecture: Lecture
  course: Course
  initialConceptIndex: number
  nextLectureId: number | null
  isAuthenticated: boolean
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

export function LectureFlowWrapper({ lecture, course, initialConceptIndex, nextLectureId, isAuthenticated }: Props) {
  const [saveError, setSaveError] = useState(false)

  const resolvedInitialIndex = isAuthenticated
    ? initialConceptIndex
    : (() => {
        try {
          const raw = localStorage.getItem('guest_progress')
          if (!raw) return 0
          const store = JSON.parse(raw)
          return store[`${course}:${lecture.id}`]?.concept_index ?? 0
        } catch {
          return 0
        }
      })()

  const save = useCallback(async (patch: object) => {
    if (!isAuthenticated) {
      upsertGuestProgress(course, lecture.id, patch as Parameters<typeof upsertGuestProgress>[2])
      return
    }
    try {
      await saveWithRetry(course, lecture.id, patch)
      if (saveError) setSaveError(false)
    } catch {
      setSaveError(true)
    }
  }, [isAuthenticated, course, lecture.id, saveError])

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
        initialConceptIndex={resolvedInitialIndex}
        onProgress={save}
        nextLectureId={nextLectureId}
        course={course}
      />
    </>
  )
}
```

- [ ] **Step 9.3: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors

- [ ] **Step 9.4: Commit**

```bash
git add src/app/\[course\]/lecture/\[id\]/page.tsx src/app/\[course\]/lecture/\[id\]/LectureFlowWrapper.tsx
git commit -m "feat: lecture page guest mode — save to localStorage when unauthenticated"
git push
```

---

## Task 10: `lectures/page.tsx` — session optional

**Files:**
- Modify: `src/app/[course]/lectures/page.tsx`

- [ ] **Step 10.1: Remove auth redirect, pass empty progress for guests**

Replace the file content:

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { isValidCourse, getCourseContent, COURSES, type Course } from '@/lib/courses'
import { getProgress } from '@/lib/progress'
import { LecturesClient } from './LecturesClient'

export async function generateMetadata({ params }: { params: Promise<{ course: string }> }): Promise<Metadata> {
  const { course } = await params
  const shortLabel = isValidCourse(course) ? COURSES[course as Course].shortLabel : course.toUpperCase()
  return { title: `Lectures · ${shortLabel}` }
}

export default async function LecturesPage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params
  if (!isValidCourse(course)) notFound()

  const content = getCourseContent(course as Course)
  const session = await getSession()

  let byLecture: Record<number, { lecture_id: number; concept_index?: number | null; completed_at?: string | null; final_quiz_result?: unknown }> = {}
  if (session) {
    const rows = await getProgress(session.userId, course as Course)
    byLecture = Object.fromEntries(rows.map(r => [r.lecture_id, r]))
  }

  return (
    <LecturesClient
      course={course as Course}
      lectures={content.lectures}
      byLecture={byLecture}
      totalCount={content.lectures.length}
    />
  )
}
```

- [ ] **Step 10.2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors

- [ ] **Step 10.3: Commit**

```bash
git add src/app/\[course\]/lectures/page.tsx
git commit -m "feat: lectures page session-optional — guests see lectures without progress"
git push
```

---

## Task 11: `quiz/QuizClient.tsx` — guest mode

When a specific lecture is selected in quiz mode, QuizClient saves `mini_quiz_results` to the API. For guests, save to localStorage instead.

**Files:**
- Modify: `src/app/[course]/quiz/QuizClient.tsx`

- [ ] **Step 11.1: Add guest save logic**

Add import at the top:

```ts
import { upsertGuestProgress } from '@/lib/guest-progress'
```

Replace the `handleAnswer` function:

```ts
async function handleAnswer(selected: number[], score: number) {
  setScores(prev => [...prev, score])
  setAnswered(true)
  if (lectureId === 'all') return

  const patch = {
    mini_quiz_results: {
      [questions[qi].id]: { answers: [selected], score, submittedAt: new Date().toISOString() },
    },
  }

  const res = await fetch('/api/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ course, lectureId, patch }),
  })

  if (res.status === 401) {
    upsertGuestProgress(course, lectureId as number, patch)
  }
}
```

- [ ] **Step 11.2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors

- [ ] **Step 11.3: Commit**

```bash
git add src/app/\[course\]/quiz/QuizClient.tsx
git commit -m "feat: quiz guest mode — fall back to localStorage on 401"
git push
```

---

## Task 12: `flashcard` — session optional + guest mode

**Files:**
- Modify: `src/app/[course]/flashcard/page.tsx`
- Modify: `src/app/[course]/flashcard/FlashcardClient.tsx`

- [ ] **Step 12.1: Update `flashcard/page.tsx`**

Replace the file content:

```tsx
import { notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { isValidCourse, getCourseContent, COURSES, type Course } from '@/lib/courses'
import { getFlashcardProgress } from '@/lib/flashcard-progress'
import { FlashcardClient } from './FlashcardClient'

export default async function FlashcardPage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params
  if (!isValidCourse(course)) notFound()

  const content = getCourseContent(course as Course)
  const allCards = content.lectures.flatMap(l => l.flashcards ?? [])
  if (allCards.length === 0) notFound()

  const session = await getSession()
  const initialIndex = 0
  const initialKnown: number[] = []

  if (session) {
    const progress = await getFlashcardProgress(session.userId, course as Course)
    return (
      <div style={{ maxWidth: 680, margin: '0 auto', padding: 'var(--density-pad)' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '2rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 4 }}>
            Flashcards
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            {COURSES[course as Course].label} · {allCards.length} cards
          </p>
        </div>
        <FlashcardClient
          flashcards={allCards}
          course={course as Course}
          initialIndex={Math.min(progress.card_index, allCards.length - 1)}
          initialKnown={progress.known}
          isAuthenticated={true}
        />
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: 'var(--density-pad)' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '2rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 4 }}>
          Flashcards
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          {COURSES[course as Course].label} · {allCards.length} cards
        </p>
      </div>
      <FlashcardClient
        flashcards={allCards}
        course={course as Course}
        initialIndex={initialIndex}
        initialKnown={initialKnown}
        isAuthenticated={false}
      />
    </div>
  )
}
```

- [ ] **Step 12.2: Update `FlashcardClient.tsx` — add `isAuthenticated` prop and guest save**

Add to imports at top:

```ts
import { upsertGuestFlashcardProgress, getGuestFlashcardProgress } from '@/lib/guest-progress'
```

Change `Props` type:

```ts
type Props = {
  flashcards: Flashcard[]
  course: Course
  initialIndex: number
  initialKnown: number[]
  isAuthenticated: boolean
}
```

Change function signature:

```ts
export function FlashcardClient({ flashcards, course, initialIndex, initialKnown, isAuthenticated }: Props) {
```

Add guest initial state resolution — replace the first two `useState` lines:

```ts
const total = flashcards.length
const [index, setIndex] = useState(() => {
  if (isAuthenticated) return initialIndex
  try {
    return getGuestFlashcardProgress(course).card_index
  } catch {
    return 0
  }
})
const [known, setKnown] = useState<Set<number>>(() => {
  if (isAuthenticated) return new Set(initialKnown)
  try {
    return new Set(getGuestFlashcardProgress(course).known)
  } catch {
    return new Set()
  }
})
```

Replace the `save` callback:

```ts
const save = useCallback((nextKnown: Set<number>, nextIndex: number) => {
  if (isAuthenticated) {
    fetch('/api/flashcard-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ course, known: [...nextKnown], cardIndex: nextIndex }),
    })
  } else {
    upsertGuestFlashcardProgress(course, { card_index: nextIndex, known: [...nextKnown] })
  }
}, [course, isAuthenticated])
```

- [ ] **Step 12.3: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors

- [ ] **Step 12.4: Commit**

```bash
git add src/app/\[course\]/flashcard/page.tsx src/app/\[course\]/flashcard/FlashcardClient.tsx
git commit -m "feat: flashcard guest mode — localStorage for unauthenticated users"
git push
```

---

## Task 13: `exam-prep/[id]/page.tsx` — remove auth redirect

Exam prep just renders and grades — no progress is saved per se, so guests can fully use it.

**Files:**
- Modify: `src/app/[course]/exam-prep/[id]/page.tsx`

- [ ] **Step 13.1: Remove auth redirect**

Remove these two lines from `ExamPage`:

```ts
const session = await getSession()
if (!session) redirect('/')
```

Also remove the `redirect` and `getSession` imports if they are no longer used in this file. The updated imports should be:

```ts
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isValidCourse, type Course } from '@/lib/courses'
import { getExamPrepExam } from '@/lib/exam-prep'
import { ExamClient } from './ExamClient'
```

- [ ] **Step 13.2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors

- [ ] **Step 13.3: Commit**

```bash
git add src/app/\[course\]/exam-prep/\[id\]/page.tsx
git commit -m "feat: exam-prep page accessible to guests"
git push
```

---

## Task 14: Forum — session optional, guests read-only

**Files:**
- Modify: `src/app/[course]/forum/page.tsx`
- Modify: `src/app/[course]/forum/TipsClient.tsx`

- [ ] **Step 14.1: Update `forum/page.tsx`**

Replace the file content:

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { isValidCourse, COURSES, type Course } from '@/lib/courses'
import { getTips, getUserRole } from '@/lib/tips'
import { TipsClient } from './TipsClient'

export async function generateMetadata({ params }: { params: Promise<{ course: string }> }): Promise<Metadata> {
  const { course } = await params
  const shortLabel = isValidCourse(course) ? COURSES[course as Course].shortLabel : course.toUpperCase()
  return { title: `Tips · ${shortLabel}` }
}

export default async function TipsPage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params
  if (!isValidCourse(course)) notFound()

  const session = await getSession()
  const tips = await getTips(course as Course, session?.userId ?? null)
  const role = session ? await getUserRole(session.userId) : null

  return (
    <TipsClient
      course={course as Course}
      initialTips={tips}
      username={session?.username ?? null}
      isAdmin={role === 'admin'}
      courseLabel={COURSES[course as Course].label}
    />
  )
}
```

- [ ] **Step 14.2: Check `getTips` signature**

Open `src/lib/tips.ts` and check if `getTips` accepts `userId: number | null`. If it currently requires `number`, update it to accept `number | null` and skip the upvote join when null.

Run:

```bash
grep -n "getTips\|getUserRole" /Users/onurtellioglu/Documents/Exams/AIP/study-app/src/lib/tips.ts | head -20
```

If `getTips(course, userId)` requires a non-null `userId`, find the SQL query and add a null guard:

```ts
// Example change if needed — skip upvote join for guests:
export async function getTips(course: Course, userId: number | null): Promise<Tip[]> {
  if (userId === null) {
    return sql`
      SELECT id, body, author, upvote_count, verified, created_at, false AS upvoted_by_me
      FROM tips WHERE course = ${course} ORDER BY verified DESC, upvote_count DESC, created_at DESC
    ` as unknown as Promise<Tip[]>
  }
  // existing query with upvote join...
}
```

- [ ] **Step 14.3: Update `TipsClient.tsx` — accept `username: string | null`**

Change the `Props` type:

```ts
type Props = {
  course: Course
  initialTips: Tip[]
  username: string | null   // was: string
  isAdmin: boolean
  courseLabel: string
}
```

In the JSX, wrap the "post new tip" form and action buttons so they only appear when `username` is not null. Find the form/textarea where tips are submitted and add a guard. Typical pattern — wrap the tip submission area:

```tsx
{username ? (
  <div>
    {/* existing tip submission UI */}
  </div>
) : (
  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
    <button
      onClick={() => {/* will need useAuthModal here */}}
      style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}
    >
      Sign in
    </button>
    {' '}to post tips and upvote.
  </p>
)}
```

For the Sign In button in `TipsClient`, add context usage:

```ts
import { useAuthModal } from '@/components/layout/AuthModalContext'
// inside component:
const { triggerAuthModal } = useAuthModal()
// button onClick:
onClick={() => triggerAuthModal({ reason: 'post_forum' })}
```

Also hide per-tip action buttons (upvote, delete, verify) when `username` is null.

- [ ] **Step 14.4: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors

- [ ] **Step 14.5: Commit**

```bash
git add src/app/\[course\]/forum/page.tsx src/app/\[course\]/forum/TipsClient.tsx src/lib/tips.ts
git commit -m "feat: forum read-only for guests, show Sign In prompt for write actions"
git push
```

---

## Self-Review Checklist

**Spec coverage:**
- ✅ Route access matrix — middleware removed, layout no longer redirects, dashboard page keeps redirect
- ✅ Guest progress storage — `guest-progress.ts` with `upsertGuestProgress`, `getGuestProgress`, `clearGuestProgress`, flashcard variants
- ✅ Auth modal system — `AuthModalContext`, `AuthModal`, `useAuthModal`, `triggerAuthModal`
- ✅ Carry-over flow — `GuestCarryOverPrompt` with Yes/No, bulk write, localStorage clear
- ✅ Forum read-only for guests
- ✅ localStorage unavailable handled — all try/catch wrapping in `guest-progress.ts`
- ✅ Carry-over failure handling — error state in `GuestCarryOverPrompt`, localStorage preserved on failure

**Missing coverage check:**
- `exam-prep/page.tsx` (list page) — currently protected by layout, which we removed the redirect from. No individual redirect in that file — access is already open after Task 8. ✅
- `leaderboard/page.tsx` and `study/page.tsx` — neither file was shown to have an individual auth redirect, so they become open automatically after the layout change. ✅
- `/[course]/dashboard/page.tsx` — keeps its own `if (!session) redirect('/')` — not touched in any task. ✅ Correctly remains auth-required.

**Type consistency:**
- `GuestProgressRow.mini_quiz_results` uses `Record<string, QuizResult>` — matches `ProgressRow` in `progress.ts` ✅
- `upsertGuestProgress` third param `patch: Partial<Omit<GuestProgressRow, 'lecture_id'>>` — matches usage in `LectureFlowWrapper` ✅
- `username: string | null` flows: `CourseShell` ← `layout.tsx` ← `session?.username ?? null` ✅
- `isAuthenticated: boolean` flows: `lecture/[id]/page.tsx` → `LectureFlowWrapper` ✅
- `onLoginSuccess` in `AuthModalContext` matches what `AuthModal` calls after `AuthForm.onSuccess` ✅
