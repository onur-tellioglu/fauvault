# UX Flow Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix the disconnected UX flow, remove the unused Study page, and make the app fully responsive.

**Architecture:** The Study page is deleted and the Lecture page becomes the single learning surface. Navigation between pages is made explicit with CTAs. The Dashboard grid becomes responsive via CSS media queries.

**Tech Stack:** Next.js App Router, React, inline styles with CSS custom properties, no new dependencies.

---

### Task 1: Fix broken LectureFlow.tsx (leftover from flag removal)

`flags.ts` was deleted in a previous session but `LectureFlow.tsx` still imports it. This causes a build error. Fix it first.

**Files:**
- Modify: `src/components/lecture/LectureFlow.tsx`

**Step 1: Remove broken import and usage**

In `src/components/lecture/LectureFlow.tsx`, make these three removals:

Line 7 — delete entirely:
```typescript
import { useFlaggedQuestions } from '@/lib/flags'
```

Lines 37–38 — delete entirely:
```typescript
  const { flagged, toggle: toggleFlag } = useFlaggedQuestions()
```

Lines 144–145 — delete these two props from the `<QuizQuestion>` call in the `final` stage:
```typescript
          flagged={flagged.has(q.id)}
          onFlag={() => toggleFlag(q.id)}
```

**Step 2: Verify the build compiles**

```bash
cd /Users/onurtellioglu/Desktop/Exams/AIP/study-app && npm run build 2>&1 | tail -20
```

Expected: no TypeScript errors about `flags` or `flagged`.

**Step 3: Commit**

```bash
git add src/components/lecture/LectureFlow.tsx
git commit -m "fix: remove leftover flags import from LectureFlow"
```

---

### Task 2: Delete the Study page

**Files:**
- Delete: `src/app/study/page.tsx`

**Step 1: Delete the file**

```bash
rm /Users/onurtellioglu/Desktop/Exams/AIP/study-app/src/app/study/page.tsx
```

**Step 2: Verify the route is gone**

```bash
ls /Users/onurtellioglu/Desktop/Exams/AIP/study-app/src/app/study/
```

Expected: No such file or directory (or empty directory).

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: remove Study page (absorbed into Lecture flow)"
```

---

### Task 3: Dashboard — remove Study Mode, style action buttons

**Files:**
- Modify: `src/app/dashboard/page.tsx`

**Step 1: Update the quick actions section**

Find this block (lines 47–54):
```tsx
        {/* Quick actions */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
          {[{ label: 'Quiz Mode', href: '/quiz' }, { label: 'Study Mode', href: '/study' }, { label: 'Profile', href: '/profile' }].map(({ label, href }) => (
            <Link key={href} href={href} style={{
              padding: '7px 14px', border: '1px solid var(--border-default)', borderRadius: 7,
              color: 'var(--text-secondary)', fontSize: '0.8rem', textDecoration: 'none',
            }}>{label}</Link>
          ))}
        </div>
```

Replace with:
```tsx
        {/* Quick actions */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
          {[{ label: 'Pratik Modu', href: '/quiz' }, { label: 'Profil', href: '/profile' }].map(({ label, href }) => (
            <Link key={href} href={href} style={{
              padding: '9px 18px', border: '1px solid var(--border-default)', borderRadius: 7,
              color: 'var(--text-secondary)', fontSize: '0.82rem', textDecoration: 'none',
              background: 'var(--bg-surface)', transition: 'border-color 150ms ease',
              minHeight: 44, display: 'inline-flex', alignItems: 'center',
            }}>{label}</Link>
          ))}
        </div>
```

**Step 2: Verify page loads with no Study Mode link**

Run the dev server and open `/dashboard`. Confirm only "Pratik Modu" and "Profil" links appear.

**Step 3: Commit**

```bash
git add src/app/dashboard/page.tsx
git commit -m "feat: remove Study Mode link, style quick action buttons"
```

---

### Task 4: Dashboard — responsive grid

The grid already uses `repeat(auto-fill, minmax(260px, 1fr))` which collapses to 1 column on phones naturally. The only fix needed is adding a media query class for very small screens and ensuring the page padding doesn't cut off cards.

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Add responsive utility**

At the bottom of `src/app/globals.css`, add:

```css
/* Responsive: single-column grid on narrow screens */
@media (max-width: 480px) {
  .lecture-grid {
    grid-template-columns: 1fr !important;
  }
}
```

**Step 2: Apply the class to the grid in dashboard**

In `src/app/dashboard/page.tsx`, find the grid div (line 57):
```tsx
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.875rem' }}>
```

Add `className="lecture-grid"`:
```tsx
        <div className="lecture-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.875rem' }}>
```

**Step 3: Commit**

```bash
git add src/app/globals.css src/app/dashboard/page.tsx
git commit -m "feat: responsive lecture grid on mobile"
```

---

### Task 5: LectureCard — accent hover, better CTA text

**Files:**
- Modify: `src/components/dashboard/LectureCard.tsx`

**Step 1: Update hover color**

Find:
```tsx
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-default)')}
```

Replace with:
```tsx
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-default)')}
```

**Step 2: Update CTA text**

Find (bottom of the card, last `<p>`):
```tsx
        <p style={{ fontSize: '0.7rem', color: done ? 'var(--success)' : progress ? 'var(--accent)' : 'var(--text-muted)', marginTop: 8 }}>
          {done ? 'Done ✓' : progress ? 'Continue →' : 'Not started'}
        </p>
```

Replace with:
```tsx
        <p style={{ fontSize: '0.7rem', color: done ? 'var(--success)' : progress ? 'var(--accent)' : 'var(--text-muted)', marginTop: 8 }}>
          {done ? 'Tamamlandı ✓' : progress ? 'Devam Et →' : 'Başla →'}
        </p>
```

**Step 3: Commit**

```bash
git add src/components/dashboard/LectureCard.tsx
git commit -m "feat: accent hover on cards, Turkish CTA labels"
```

---

### Task 6: Lecture page — breadcrumb header

**Files:**
- Modify: `src/app/lecture/[id]/page.tsx`

**Step 1: Update the back link to include lecture number**

Find (line 22–23):
```tsx
          <a href="/dashboard" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
            ← Dashboard
          </a>
```

Replace with:
```tsx
          <a href="/dashboard" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
            ← Dashboard
          </a>
          <span style={{ fontSize: '0.8rem', color: 'var(--border-strong)', margin: '0 6px' }}>·</span>
          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            L{lecture.id}
          </span>
```

Note: this sits inside the `<div style={{ marginBottom: '2rem' }}>` wrapper, on the same line as the back link. Keep the existing `<h1>` below it.

**Step 2: Commit**

```bash
git add src/app/lecture/[id]/page.tsx
git commit -m "feat: add lecture number breadcrumb to lecture header"
```

---

### Task 7: LectureFlow — "Sonraki Ders →" after completion

After finishing a lecture, the user should be able to go directly to the next one without returning to the dashboard.

**Files:**
- Modify: `src/app/lecture/[id]/page.tsx`
- Modify: `src/app/lecture/[id]/LectureFlowWrapper.tsx`
- Modify: `src/components/lecture/LectureFlow.tsx`

**Step 1: Compute next lecture id in the page**

In `src/app/lecture/[id]/page.tsx`, after `const lecture = content.lectures.find(...)`, add:

```tsx
  const currentIndex = content.lectures.findIndex(l => l.id === lecture.id)
  const nextLecture = content.lectures[currentIndex + 1] ?? null
```

Then pass it to `LectureFlowWrapper`:
```tsx
        <LectureFlowWrapper lecture={lecture} initialConceptIndex={progress?.concept_index ?? 0} nextLectureId={nextLecture?.id ?? null} />
```

**Step 2: Thread nextLectureId through LectureFlowWrapper**

In `src/app/lecture/[id]/LectureFlowWrapper.tsx`, update the Props type and pass it to LectureFlow:

```tsx
type Props = { lecture: Lecture; initialConceptIndex: number; nextLectureId: number | null }

export function LectureFlowWrapper({ lecture, initialConceptIndex, nextLectureId }: Props) {
  // ... existing state/save logic unchanged ...
  return (
    <>
      {saveError && ( /* ... unchanged ... */ )}
      <LectureFlow lecture={lecture} initialConceptIndex={initialConceptIndex} onProgress={save} nextLectureId={nextLectureId} />
    </>
  )
}
```

**Step 3: Add nextLectureId prop to LectureFlow and render button**

In `src/components/lecture/LectureFlow.tsx`, update Props:

```tsx
type Props = {
  lecture: Lecture
  initialConceptIndex: number
  onProgress: (patch: object) => void
  nextLectureId: number | null
}
```

And destructure:
```tsx
export function LectureFlow({ lecture, initialConceptIndex, onProgress, nextLectureId }: Props) {
```

In the `done` results screen (the last `return` block), replace the existing single button:
```tsx
      <a href="/dashboard" style={{
        display: 'inline-block', marginTop: '2rem', padding: '10px 24px',
        background: 'var(--accent)', color: '#0C0C10', borderRadius: 8, textDecoration: 'none', fontWeight: 600,
      }}>← Back to Dashboard</a>
```

With:
```tsx
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
        {nextLectureId !== null && (
          <a href={`/lecture/${nextLectureId}`} style={{
            display: 'inline-flex', alignItems: 'center', padding: '10px 24px', minHeight: 44,
            background: 'var(--accent)', color: '#0C0C10', borderRadius: 8, textDecoration: 'none', fontWeight: 600,
            fontFamily: 'var(--font-body)',
          }}>Sonraki Ders →</a>
        )}
        <a href="/dashboard" style={{
          display: 'inline-flex', alignItems: 'center', padding: '10px 24px', minHeight: 44,
          border: '1px solid var(--border-default)', color: 'var(--text-secondary)',
          borderRadius: 8, textDecoration: 'none', fontSize: '0.9rem',
        }}>← Dashboard</a>
      </div>
```

**Step 4: Verify**

Navigate to the last lecture (`/lecture/21` or whichever is last) and confirm only "← Dashboard" appears (no next). On any other lecture, confirm "Sonraki Ders →" appears alongside "← Dashboard".

**Step 5: Commit**

```bash
git add src/app/lecture/[id]/page.tsx src/app/lecture/[id]/LectureFlowWrapper.tsx src/components/lecture/LectureFlow.tsx
git commit -m "feat: add next-lecture button to completion screen"
```

---

### Task 8: Quiz page — rename "All Lectures" label

**Files:**
- Modify: `src/app/quiz/page.tsx`

**Step 1: Update the dropdown option**

Find (line 78):
```tsx
            <option value="all">All Lectures</option>
```

Replace with:
```tsx
            <option value="all">Tüm Dersler (Pratik)</option>
```

**Step 2: Commit**

```bash
git add src/app/quiz/page.tsx
git commit -m "fix: rename All Lectures to Tüm Dersler (Pratik)"
```

---

### Task 9: Responsive tap targets — quiz and lecture buttons

Ensure all interactive buttons are at least 44px tall on mobile (Apple/Google HIG standard).

**Files:**
- Modify: `src/app/quiz/page.tsx`
- Modify: `src/components/lecture/LectureFlow.tsx`

**Step 1: Quiz page buttons**

In `src/app/quiz/page.tsx`, the `btnStyle` inside `LectureFlow` is already handled in Task 7. The quiz page itself has two buttons:

1. The "Next →" / "Results →" button (line 93):
```tsx
              <button onClick={next} style={{ marginTop: '1.5rem', padding: '10px 22px', background: 'var(--accent)', color: '#0C0C10', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
```
Add `minHeight: 44` to its style.

2. The "Try Again" button on the done screen (line 56):
```tsx
            <button onClick={reset} style={{ padding: '10px 22px', background: 'var(--accent)', color: '#0C0C10', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
```
Add `minHeight: 44` to its style.

3. The "← Dashboard" link on done screen (line 59):
```tsx
            <a href="/dashboard" style={{ padding: '10px 22px', border: '1px solid var(--border-default)', borderRadius: 8, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
```
Add `minHeight: 44` to its style.

**Step 2: LectureFlow buttons**

In `src/components/lecture/LectureFlow.tsx`, find the `btnStyle` object (lines 43–48):
```tsx
  const btnStyle: React.CSSProperties = {
    marginTop: '1.5rem', padding: '10px 22px',
    background: 'var(--accent)', color: '#0C0C10',
    border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer',
    fontFamily: 'var(--font-body)',
  }
```

Add `minHeight: 44` and `display: 'inline-flex'`, `alignItems: 'center'`:
```tsx
  const btnStyle: React.CSSProperties = {
    marginTop: '1.5rem', padding: '10px 22px',
    background: 'var(--accent)', color: '#0C0C10',
    border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer',
    fontFamily: 'var(--font-body)', minHeight: 44,
    display: 'inline-flex', alignItems: 'center',
  }
```

**Step 3: Commit**

```bash
git add src/app/quiz/page.tsx src/components/lecture/LectureFlow.tsx
git commit -m "feat: 44px min tap targets on all interactive buttons"
```

---

### Task 10: Final check

**Step 1: Full build**

```bash
cd /Users/onurtellioglu/Desktop/Exams/AIP/study-app && npm run build
```

Expected: Build succeeds with no TypeScript errors.

**Step 2: Smoke test in dev**

```bash
npm run dev
```

Visit and verify:
- `/dashboard` — no Study Mode link, 2 buttons, lecture cards with accent hover
- `/lecture/1` — breadcrumb shows `L1`, quiz completion shows "Sonraki Ders →"
- `/lecture/21` (or last) — quiz completion shows only "← Dashboard"
- `/quiz` — dropdown shows "Tüm Dersler (Pratik)"
- `/study` — 404 (route deleted)
- Mobile viewport (375px) — dashboard cards stack to 1 column
