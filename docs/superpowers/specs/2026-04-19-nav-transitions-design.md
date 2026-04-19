# Nav Transitions — Smooth Tab Switching

**Date:** 2026-04-19  
**Status:** Approved

## Problem

Tab navigation feels sluggish because:
1. The active underline only updates after the new route finishes loading (`usePathname()` updates late).
2. Most tab routes have no `loading.tsx`, so the user sees a blank screen while the server component fetches data.

## Solution

Two complementary changes: a sliding indicator that responds instantly on click, and skeleton loading for all missing routes.

---

## Part 1: Sliding Nav Indicator

**File:** `src/components/layout/CourseShell.tsx`

### State additions

```ts
const [pendingHref, setPendingHref] = useState<string | null>(null)
const tabRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())
const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null)
```

### Active href

```ts
const activeHref = pendingHref ?? navItems.find(item => pathname.endsWith('/' + item.href.split('/').pop()!))?.href ?? ''
```

### Click handler

Each `<Link>` gets `onClick={() => setPendingHref(item.href)}`.  
`pendingHref` is cleared in a `useEffect` watching `pathname`.

### Indicator position

```ts
useEffect(() => {
  const el = tabRefs.current.get(activeHref)
  if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth })
}, [activeHref])
```

### Indicator element

Replaces `borderBottom` on individual links. Sits inside the nav container (which gets `position: relative`):

```tsx
{indicator && (
  <div style={{
    position: 'absolute',
    bottom: -1,
    left: indicator.left,
    width: indicator.width,
    height: 2,
    background: 'var(--accent)',
    transition: 'left 150ms ease, width 150ms ease',
    pointerEvents: 'none',
  }} />
)}
```

Individual link `borderBottom` is set to `2px solid transparent` always (no longer driven by active state).  
Link color still uses `active` (derived from `pathname`) for text color — it updates when navigation completes, which is fine.

### Ref assignment

```tsx
ref={(el) => {
  if (el) tabRefs.current.set(item.href, el)
  else tabRefs.current.delete(item.href)
}}
```

---

## Part 2: Skeleton Loading Files

All skeletons follow the existing pattern: `var(--bg-elevated)` blocks + `pulse 1.5s ease-in-out infinite` animation.

| File | Layout |
|---|---|
| `src/app/[course]/lectures/loading.tsx` | Toggle bar + 6-card grid |
| `src/app/[course]/quiz/loading.tsx` | Title block + 4 option rows |
| `src/app/[course]/forum/loading.tsx` | Textarea box + 4 tip cards |
| `src/app/[course]/leaderboard/loading.tsx` | Title + 8 table rows |
| `src/app/[course]/exam-prep/loading.tsx` | Title + 5 list items |
| `src/app/[course]/flashcard/loading.tsx` | Single centered card |

---

## Out of scope

- No changes to server component data fetching or caching.
- No Framer Motion or other animation libraries.
- No changes to route structure.
