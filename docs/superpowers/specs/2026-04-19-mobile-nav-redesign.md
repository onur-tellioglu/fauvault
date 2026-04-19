# Mobile Nav & Header Redesign

**Date:** 2026-04-19  
**Status:** Approved

## Problem

On mobile (≤768px) the CourseShell header and nav are crowded:
- Header renders two rows: meta row (Courses link, app name, version, reader label, username, Tweaks button) + large Fraunces serif title
- Nav has 6–7 tabs that overflow horizontally with `overflowX: auto` — visually weak

## Goal

Reduce vertical chrome on mobile so content (e.g. flashcard) is reachable without scrolling past excessive header. Eliminate horizontal scroll on nav.

---

## Section 1: Mobile Header

**≤768px behaviour:**
- Collapse to single row: `← Courses` (left) · course name in compact text (center) · Tweaks button (right)
- Hide: Fraunces large title, "THE FAUVAULT DAILY · vX.X.X" label, "READER" label
- Username (`@handle`) stays visible (part of the Tweaks area or compact row)

**>768px behaviour:** unchanged — existing two-row masthead with large title.

**Implementation:** `@media (max-width: 768px)` in `CourseShell.tsx` via inline style or CSS class. Hide Fraunces `<h1>` with `display: none` at mobile breakpoint.

---

## Section 2: Nav — "More" Dropdown

**≤768px behaviour:**
- Always-visible tabs: **Today · Lectures · Practice · Flashcards** (4 items, always fit)
- Remaining items (Forum · Leaderboard · Exam Prep when present) moved into a **"More ▾"** dropdown tab
- Dropdown opens on tap, closes on outside tap
- If current route is inside "More" group: tab label shows **"More ●"** so user knows where they are
- `overflowX: auto` removed from nav — single row always fits

**>768px behaviour:** unchanged — all tabs visible inline.

**Implementation:** New `MoreMenu` component inside `CourseShell.tsx`. Core tabs hardcoded; overflow tabs computed from `navItems` slice starting at index 4.

---

## Section 3: Flashcard Page Content Cleanup

Remove redundant elements from `src/app/[course]/flashcard/page.tsx`:
- `<h1>Flashcards</h1>` — location already shown by active nav tab
- Subtitle `"Data Engineering 1 · 21 cards"` — course name already in compact mobile header

`FlashcardClient` renders directly after the page wrapper `<div>`, starting with the progress bar.

**Scope:** Flashcard page only. Other pages (Lectures, Quiz) not touched in this change.

---

## Files Affected

| File | Change |
|------|--------|
| `src/components/layout/CourseShell.tsx` | Mobile header collapse + More dropdown nav |
| `src/app/[course]/flashcard/page.tsx` | Remove h1 + subtitle |
