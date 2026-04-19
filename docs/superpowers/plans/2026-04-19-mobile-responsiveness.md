# Mobile Responsiveness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the study app fully usable on phones (360–430px) and tablets (768px) by stacking sidebar layouts and fixing the tweaks panel overflow.

**Architecture:** CSS-only breakpoint overrides in `globals.css` for layout fixes (masthead, dashboard grid, tweaks panel, leaderboard table); minimal JS state added only to `StudyClient.tsx` for the study-mode drawer sidebar.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS v4, inline styles + className-targeted CSS overrides.

---

## File Map

| File | Change |
|------|--------|
| `src/app/globals.css` | Append responsive override block (all media queries) |
| `src/components/layout/CourseShell.tsx` | Add `className="course-shell-masthead"` to header inner div; add `className="tweaks-panel"` to tweaks panel div |
| `src/components/dashboard/NewspaperDashboard.tsx` | Add `className="dashboard-grid"` to the grid container div (line 66) |
| `src/app/[course]/leaderboard/page.tsx` | Add `className="leaderboard-table"` to the `<table>` element |
| `src/app/[course]/study/StudyClient.tsx` | Add `useState` for sidebar open/close; add drawer, backdrop, toggle button |

---

## Task 1: CourseShell — add classNames

**Files:**
- Modify: `src/components/layout/CourseShell.tsx`

The masthead inner `<div>` (the `maxWidth: 1100` container inside `<header>`) needs `className="course-shell-masthead"`. The tweaks panel `<div>` (the fixed-positioned panel rendered when `showTweaks` is true) needs `className="tweaks-panel"`.

- [ ] **Step 1: Add className to masthead inner div**

In `CourseShell.tsx` at line 106, change:
```tsx
<div style={{ maxWidth: 1100, margin: '0 auto' }}>
```
to:
```tsx
<div className="course-shell-masthead" style={{ maxWidth: 1100, margin: '0 auto' }}>
```

- [ ] **Step 2: Add className to tweaks panel div**

At line 193, change:
```tsx
<div style={{ position: 'fixed', top: '4.5rem', right: '1.5rem', zIndex: 50, background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 12, padding: '1.25rem', minWidth: 220, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
```
to:
```tsx
<div className="tweaks-panel" style={{ position: 'fixed', top: '4.5rem', right: '1.5rem', zIndex: 50, background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 12, padding: '1.25rem', minWidth: 220, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/CourseShell.tsx
git commit -m "feat: add classNames to CourseShell for mobile targeting"
git push
```

---

## Task 2: Dashboard — add className

**Files:**
- Modify: `src/components/dashboard/NewspaperDashboard.tsx`

- [ ] **Step 1: Add className to the grid container**

In `NewspaperDashboard.tsx` at line 66, change:
```tsx
<div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 'var(--density-gap)', alignItems: 'start' }}>
```
to:
```tsx
<div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 'var(--density-gap)', alignItems: 'start' }}>
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/dashboard/NewspaperDashboard.tsx
git commit -m "feat: add className to dashboard grid for mobile targeting"
git push
```

---

## Task 3: Leaderboard — add className

**Files:**
- Modify: `src/app/[course]/leaderboard/page.tsx`

- [ ] **Step 1: Add className to the table element**

In `page.tsx` at line 41, change:
```tsx
<table style={{ width: '100%', borderCollapse: 'collapse' }}>
```
to:
```tsx
<table className="leaderboard-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/[course]/leaderboard/page.tsx
git commit -m "feat: add className to leaderboard table for mobile targeting"
git push
```

---

## Task 4: globals.css — add responsive override block

**Files:**
- Modify: `src/app/globals.css`

This adds all CSS media queries. The existing file ends at line 143 after the `lecture-grid` media query block.

- [ ] **Step 1: Append responsive override block**

Add the following to the end of `src/app/globals.css`:

```css
/* ── Mobile Responsiveness ── */

/* 768px: tablets + phones */
@media (max-width: 768px) {
  /* Masthead padding */
  .course-shell-masthead {
    padding: 0 0.5rem !important;
  }

  /* Tweaks panel: keep within viewport */
  .tweaks-panel {
    right: 0.5rem !important;
    min-width: unset !important;
    max-width: calc(100vw - 1rem) !important;
  }

  /* Dashboard: stack sidebar below main content */
  .dashboard-grid {
    grid-template-columns: 1fr !important;
  }
}

/* 480px: phones only */
@media (max-width: 480px) {
  /* Leaderboard table: compact font + padding */
  .leaderboard-table td,
  .leaderboard-table th {
    font-size: 0.8rem !important;
    padding: 0.4rem 0.5rem !important;
  }
}
```

- [ ] **Step 2: Start dev server and verify layout at 768px**

Run: `npm run dev`

Open browser DevTools → set viewport to 768px wide. Navigate to a course dashboard. Verify:
- Dashboard sidebar stacks below the main content (not side-by-side)
- Tweaks panel (click "Tweaks") stays within screen bounds
- Masthead header content is not clipped

- [ ] **Step 3: Verify layout at 375px (iPhone)**

In DevTools, switch to iPhone SE preset or set width to 375px. Verify the same views look correct.

- [ ] **Step 4: Verify leaderboard table at 375px**

Navigate to the leaderboard page at 375px. Verify table rows are readable (text not too large, no horizontal overflow beyond the `overflow: hidden` container).

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add mobile responsive breakpoints for dashboard, tweaks panel, leaderboard"
git push
```

---

## Task 5: Study mode — mobile drawer

**Files:**
- Modify: `src/app/[course]/study/StudyClient.tsx`

The current layout is a two-column grid (`gridTemplateColumns: '200px 1fr'`). On mobile, the `<nav>` sidebar needs to become a drawer.

The approach:
- Add `useState` for `sidebarOpen`
- Render a hamburger toggle button only on mobile (via a CSS class toggled by media query)
- The sidebar always renders in the DOM, but gets `className="study-sidebar"` — CSS hides it on mobile and makes it a fixed drawer when open
- A backdrop div renders conditionally (only when `sidebarOpen && isMobile`) — but since we avoid a JS `useMediaQuery`, we instead always render the backdrop alongside the drawer open state, and hide it on desktop via CSS

The simplest approach: render the hamburger and backdrop in the DOM always; CSS shows/hides them by breakpoint.

- [ ] **Step 1: Rewrite StudyClient.tsx**

Replace the entire file content with:

```tsx
'use client'
import { useState } from 'react'
import { COURSES, type Course } from '@/lib/courses'
import { ConceptSection } from '@/components/lecture/ConceptSection'

export function StudyClient({ course }: { course: Course }) {
  const content = COURSES[course].content
  const [lecture, setLecture] = useState(content.lectures[0])
  const [ci, setCi] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
      {/* Mobile toggle button — hidden on desktop via CSS */}
      <button
        className="study-toggle-btn"
        onClick={() => setSidebarOpen(o => !o)}
        style={{
          display: 'none', /* overridden to flex on mobile via CSS */
          position: 'sticky',
          top: '0.75rem',
          zIndex: 10,
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-default)',
          borderRadius: 8,
          padding: '0.45rem 0.75rem',
          fontSize: '1rem',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          marginBottom: '1rem',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        ☰ <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-geist-mono)', color: 'var(--text-muted)' }}>Lectures</span>
      </button>

      {/* Backdrop — visible only on mobile when sidebar is open, via CSS */}
      {sidebarOpen && (
        <div
          className="study-backdrop"
          onClick={() => setSidebarOpen(false)}
          style={{
            display: 'none', /* overridden on mobile via CSS */
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 49,
          }}
        />
      )}

      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '2rem' }}>
        <nav
          className={`study-sidebar${sidebarOpen ? ' study-sidebar--open' : ''}`}
          style={{ borderRight: '1px solid var(--border-subtle)', paddingRight: '1.5rem' }}
        >
          <a href={`/${course}/dashboard`} style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textDecoration: 'none', display: 'block', marginBottom: '1rem' }}>
            ← Dashboard
          </a>
          <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Lectures
          </p>
          {content.lectures.map(l => (
            <button key={l.id} onClick={() => { setLecture(l); setCi(0); setSidebarOpen(false) }} style={{
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

- [ ] **Step 2: Add study drawer CSS to globals.css**

Append to the end of `src/app/globals.css` (after the block added in Task 4):

```css
/* Study mode drawer — mobile only */
@media (max-width: 768px) {
  /* Show the toggle button */
  .study-toggle-btn {
    display: flex !important;
  }

  /* Show the backdrop when sidebar is open */
  .study-backdrop {
    display: block !important;
  }

  /* Hide sidebar in normal grid flow */
  .study-sidebar {
    display: none !important;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 260px;
    z-index: 50;
    overflow-y: auto;
    background: var(--bg-elevated);
    border-right: 1px solid var(--border-default);
    padding: 1.5rem 1.25rem;
    box-shadow: 4px 0 24px rgba(0,0,0,0.5);
  }

  /* Show as drawer when open */
  .study-sidebar--open {
    display: block !important;
  }

  /* Full-width drawer on small phones */
  @media (max-width: 480px) {
    .study-sidebar {
      width: 100vw;
    }
  }

  /* Grid becomes single column (sidebar removed from flow) */
  .study-sidebar ~ div {
    /* content div takes full width */
    min-width: 0;
  }
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Verify study mode at 375px in browser**

Navigate to `/[course]/study` at 375px viewport. Verify:
- Sidebar is hidden by default
- "☰ Lectures" button is visible at top
- Clicking the button opens the sidebar as a full-screen drawer
- Backdrop is visible behind the drawer
- Clicking a lecture closes the drawer and shows the selected lecture
- Clicking the backdrop closes the drawer
- On desktop (resize to 1024px): sidebar is always visible, toggle button is hidden, no drawer behavior

- [ ] **Step 5: Commit**

```bash
git add src/app/[course]/study/StudyClient.tsx src/app/globals.css
git commit -m "feat: study mode mobile drawer sidebar"
git push
```

---

## Self-Review Checklist

- Spec section 1 (CourseShell): masthead className → Task 1 ✓; tweaks panel className → Task 1 ✓; CSS overrides → Task 4 ✓
- Spec section 2 (Dashboard): dashboard-grid className → Task 2 ✓; CSS stack → Task 4 ✓; leaderboard-table className → Task 3 ✓; leaderboard CSS → Task 4 ✓
- Spec section 3 (Study drawer): `useState` + drawer → Task 5 ✓; CSS → Task 5 ✓; 480px full-width → Task 5 ✓
- `display: none` on `.study-sidebar` with `!important` overrides the inline `gridTemplateColumns` — the grid item simply won't render in flow. ✓
- Closing drawer on lecture select (`setSidebarOpen(false)` in button onClick) — included ✓
- `study-sidebar` `border-right` is set twice in the CSS — remove the duplicate. Fix: keep only `border-right: 1px solid var(--border-default)` and remove `border-right-style: solid` line.
