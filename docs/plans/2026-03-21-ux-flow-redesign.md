# UX Flow Redesign

**Date:** 2026-03-21
**Goal:** Fix disconnected UX flow and make the app fully responsive. The app should not feel cheap — every page should have a clear purpose and lead the user to the next step.

---

## Information Architecture

### Pages

| Route | Role |
|-------|------|
| `/` | Login |
| `/dashboard` | Main hub — see progress, start a lecture |
| `/lecture/[id]` | Complete a lecture (concepts → quiz) |
| `/quiz` | Free practice mode (all lectures mixed) |
| `/profile` | Stats |

### Removed

- `/study` page is **deleted entirely** — it duplicates the lecture page without adding value.

### Primary Flow

```
Dashboard → Lecture (concepts) → Lecture (quiz) → Dashboard
                                                 ↘ Next lecture
```

The Quiz page remains as a standalone "practice" mode for cross-lecture drilling, but the main learning flow runs entirely through lecture pages.

---

## Dashboard

### Changes

- Remove "Study Mode" quick link (page is deleted)
- "Quiz Mode" and "Profile" become small but visible action buttons, not plain text links
- Lecture grid becomes responsive: 1 col (mobile) → 2 col (tablet) → 3 col (desktop)
- Lecture cards get a hover state: `border-color: var(--accent)` transition
- Each card shows a clear CTA: "Başla →" (not started), "Devam Et →" (in progress), "Tekrar Al →" (completed)

### Layout (mobile-first)

```
[Header: title + username + progress ring + sign out]
[2 action buttons: Pratik Modu | Profil]
[Lecture card grid — responsive]
```

---

## Lecture Page

### Changes

- On the last concept, replace "Next →" with a prominent **"Quiz'e Başla →"** CTA
- After quiz completion, show two options:
  - "Sonraki Ders →" (link to next lecture)
  - "Dashboard'a Dön"
- Header gets a breadcrumb: `← Dashboard · L{id}`
- All tap targets minimum 44px height

### Flow

```
[Concept 1] → [Concept 2] → ... → [Last Concept: "Quiz'e Başla →"]
→ [Q1] → [Q2] → ... → [Results: score + "Sonraki Ders →" / "Dashboard'a Dön"]
```

---

## Quiz Page (Practice Mode)

### Changes

- Rename "All Lectures" → "Tüm Dersler (Pratik)" in the dropdown
- Results screen already has "Try Again" and "← Dashboard" — no changes needed
- Tap targets minimum 44px

---

## Responsive Design

**Breakpoint:** `640px` (mobile below, tablet/desktop above)

| Page | Change |
|------|--------|
| Dashboard | Grid: `1fr` mobile, `repeat(2, 1fr)` tablet, `repeat(auto-fill, minmax(260px, 1fr))` desktop |
| Lecture | Already `max-width: 680px`, needs tap target sizing |
| Quiz | Already `max-width: 640px`, needs tap target sizing |
| Profile | 2-col stat grid stays — acceptable on mobile |
| Study | Deleted |

---

## What We Are NOT Doing

- No new pages
- No dark/light mode toggle
- No keyboard shortcuts
- No animations beyond what already exists
- No backend changes
