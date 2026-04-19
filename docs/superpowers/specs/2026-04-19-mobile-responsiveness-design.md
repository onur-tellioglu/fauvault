# Mobile Responsiveness Design

**Date:** 2026-04-19
**Status:** Approved

## Overview

Improve mobile and tablet responsiveness across the study app. Target: phones (360–430px) and tablets (768px). Approach: CSS breakpoints in `globals.css` for layout fixes, minimal JS state only for the study mode drawer.

## Breakpoint Strategy

Two breakpoints:

- `max-width: 768px` — tablet + phone: sidebars stack, tweaks panel repositions
- `max-width: 480px` — phone only: padding reduction, font adjustments

All CSS overrides are appended as a block at the end of `globals.css`. Components receive semantic `className` values to enable targeting (no changes to inline style logic).

## Section 1: CourseShell (Nav + Tweaks Panel)

**File:** `src/components/layout/CourseShell.tsx`

**Navigation:**
- `flex-wrap: wrap` is already present — no change needed.
- Add class `course-shell-masthead` to the masthead container.
- At `max-width: 768px`: reduce masthead padding to `0.75rem 1rem`.

**Tweaks Panel:**
- Current: `position: fixed; top: 4.5rem; right: 1.5rem; min-width: 220px`
- Add class `tweaks-panel` to the panel container.
- At `max-width: 768px`: `right: 0.5rem`, `min-width: unset`, `max-width: calc(100vw - 1rem)`.
- Toggle button behavior unchanged.

## Section 2: Dashboard

**File:** `src/components/dashboard/NewspaperDashboard.tsx`

**Main grid:**
- Current: `gridTemplateColumns: '1fr 280px'` (inline style)
- Add class `dashboard-grid` to the grid container.
- At `max-width: 768px`: `grid-template-columns: 1fr` — sidebar stacks below main content.
- DOM order is already correct (main content first, sidebar second).

**Leaderboard table:**
- `overflow-x: auto` already present — keep as-is.
- Add class `leaderboard-table` to the table element.
- At `max-width: 480px`: reduce `font-size` to `0.8rem`, cell `padding` to `0.4rem 0.5rem`.

## Section 3: Study Mode Drawer

**File:** `src/app/[course]/study/StudyClient.tsx`

**Desktop (≥769px):** No change. `gridTemplateColumns: '200px 1fr'` remains.

**Mobile/tablet (≤768px):**
- Grid becomes single column, sidebar hidden (`display: none`).
- A hamburger toggle button (`☰`) is added: `position: sticky; top: 0; z-index: 10`.
- Add `className="study-toggle-btn"` for styling.

**Drawer behavior:**
- State: `const [sidebarOpen, setSidebarOpen] = useState(false)` in `StudyClient`.
- When open: sidebar renders as `position: fixed; left: 0; top: 0; height: 100vh; width: 260px; z-index: 50; overflow-y: auto`.
- A semi-transparent backdrop (`position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 49`) is rendered behind the drawer; clicking it closes the drawer.
- At `max-width: 480px`: drawer width expands to `100vw`.

**Classes to add:**
- `study-sidebar` on the sidebar element
- `study-backdrop` on the backdrop element
- `study-toggle-btn` on the hamburger button

## Files Changed

| File | Change |
|------|--------|
| `src/app/globals.css` | Add responsive override block |
| `src/components/layout/CourseShell.tsx` | Add `className` to masthead + tweaks panel |
| `src/components/dashboard/NewspaperDashboard.tsx` | Add `className` to grid + table |
| `src/app/[course]/study/StudyClient.tsx` | Add `useState`, drawer, backdrop, toggle button |

## Out of Scope

- Quiz, flashcard, exam-prep, forum, profile pages — already single-column, no changes needed.
- Lecture content page — `overflow-x: auto` on tables already handles it.
- Design system tokens (`--density-pad`, `--density-gap`) — preserved as-is.
