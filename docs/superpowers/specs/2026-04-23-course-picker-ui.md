# Spec: Course Picker Page — New UI Alignment

**Date:** 2026-04-23  
**Status:** Approved

## Goal

Redesign the `/` (Choose a Course) page so it feels like a natural part of the same application as the CourseShell. Currently the page is visually disconnected — floating centered cards with no header structure. After this change, users moving between the home page and a course page should experience a consistent design language.

## Layout

### Masthead

Identical structure to CourseShell's header, adapted for context:

- **Left side:** `The FAUVault Daily · v{appVersion}` in `var(--font-geist-mono)`, 0.65rem, muted, uppercase (no "← Courses" back link — this *is* the home)
- **Right side:** `@{username}` as a link to `/profile`, plus ⚙ tweaks button (same style as CourseShell)
- **Below header row:** Large Fraunces heading — `"Choose a "` + `<em>course</em>` in accent italic. Font: `clamp(3rem, 8vw, 5.5rem)`, weight 300, line-height 1.0
- **Below heading:** `"Welcome back, {username}"` in muted mono, 0.85rem

### Course Cards

Vertical stack, `max-width: 700px`, `margin: 0 auto`, `gap: 0.75rem`.

Each card is a `<Link>` with:
- `background: var(--bg-surface)`
- `border: 1px solid var(--border-default)`
- `border-radius: 12px`
- `padding: 1.25rem 1.5rem`
- `transition: border-color 150ms ease`
- `hover: border-color var(--accent)`

Card interior — horizontal flex, `align-items: center`, `gap: 1.25rem`:

| Zone | Content |
|------|---------|
| Left | `<ProgressRing size={64} value={completed/total} />` |
| Middle (flex: 1) | `shortLabel` — mono, 0.65rem, muted, uppercase, letter-spacing 0.08em<br>`courseLabel` — 1rem, `var(--text-primary)`, weight 500<br>`X/Y lectures` — mono, 0.75rem, `var(--text-secondary)` |
| Right | `#N on leaderboard` — mono, 0.7rem, `var(--accent)` (hidden if rank is null)<br>`→` — mono, muted, margin-left auto |

### Footer

`<form action="/api/auth/logout">` with a "Sign out" button. Unchanged from current implementation — muted text, no border, centered below the card list.

## Tweaks Panel

Duplicated inline in the new `CoursePicker.tsx` client component (do not refactor CourseShell). Reads/writes the same localStorage keys (`fv-accent`, `fv-density`) so accent and density preferences persist across the home page and course pages.

State: `showTweaks`, `accentColor`, `density` — identical to CourseShell. The panel applies `--accent` and density CSS variables via an inline `<style>` tag on this page.

Note: density on this page maps as follows — `--density-gap` controls the card list gap (`0.5rem` / `0.75rem` / `1rem` for Compact / Normal / Roomy); `--density-pad` controls each card's internal padding (`1rem 1.25rem` / `1.25rem 1.5rem` / `1.5rem 1.75rem`).

## Implementation Notes

- Page is a Next.js Server Component (`async function HomePage`) — tweaks panel must be extracted into a `'use client'` component (e.g. `CoursePicker.tsx`) that receives course data as props.
- `appVersion` can be read from `package.json` via `fs` at build time or passed from a shared lib constant.
- No new routes, no new API calls — all data fetching stays in the server component.

## Out of Scope

- Guest / unauthenticated state (login form) — unchanged
- Any changes to CourseShell itself
- Mobile-specific layout changes beyond what flexbox handles naturally
