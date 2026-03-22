# Exam Countdown Redesign

**Date:** 2026-03-22
**Status:** Approved

## Goal

Replace the thin top banner with a hero-style countdown section on the dashboard that gives the exam date visual prominence.

## Design

4 boxes side by side: Days / Hours / Mins / Secs

```
       H7 · Technical Faculty · 27 Mar 08:00

  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐
  │  04  │  │  14  │  │  13  │  │  33  │
  │ DAYS │  │  HRS │  │ MINS │  │ SECS │
  └──────┘  └──────┘  └──────┘  └──────┘
```

### Styling
- Container: full-width, `--bg-elevated` background, `--border-subtle` bottom border, `~120px` total height
- Boxes: `--bg-surface` background, `--border-default` border, `8px` border-radius, `~80px` height
- Numbers: `3.5rem` Geist Mono, `--accent` (amber) color, bold
- Labels: `0.65rem` uppercase letter-spacing, `--text-muted`
- Header line: `0.72rem` Geist Mono, `--text-muted`, centered above boxes
- Urgency: when `days === 0 && hr < 24`, numbers switch to `--error` (red)

### Placement
- `dashboard/page.tsx`: replaces current `<ExamCountdown />` at top (same position)
- `page.tsx` (home): keep or remove — TBD, out of scope

## Files Changed
- `src/components/layout/ExamCountdown.tsx` — full rewrite
