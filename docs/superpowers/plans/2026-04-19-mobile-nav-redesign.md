# Mobile Nav & Header Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce mobile chrome by collapsing the header to a single row, replacing the horizontal-scroll nav with a 4-tab + "More ▾" dropdown, and removing the redundant h1/subtitle from the flashcard page.

**Architecture:** All changes are in `CourseShell.tsx` (header + nav) and `flashcard/page.tsx` (content cleanup). Mobile behaviour is controlled via CSS classes added to the existing `<style>` tag in `CourseShell.tsx`. No new files needed.

**Tech Stack:** Next.js 14 App Router, React, inline styles + CSS-in-JS via `<style>` tag, TypeScript

---

### Task 1: Mobile Header Collapse

**Files:**
- Modify: `src/components/layout/CourseShell.tsx`

- [ ] **Step 1: Extend the CSS string with mobile media query classes**

In `CourseShell.tsx`, find the `css` const (currently only sets CSS vars). Extend it to add mobile-specific class rules:

```ts
const css = `
  :root {
    --accent: ${accentColor};
    --accent-subtle: ${accentColor}1e;
    --accent-hover: ${accentColor}cc;
    --accent-dim: ${accentColor}88;
    --density-gap: ${gapMap[density]};
    --density-pad: ${padMap[density]};
  }
  @media (max-width: 768px) {
    .masthead-app-label { display: none !important; }
    .masthead-reader-label { display: none !important; }
    .masthead-title { display: none !important; }
    .masthead-compact { display: flex !important; }
    .masthead-meta-row { margin-bottom: 0 !important; }
    .course-shell-masthead header { padding: 0.75rem 1rem !important; }
  }
`
```

- [ ] **Step 2: Add class names to existing masthead elements**

In the masthead `<header>`, add `className` attributes to the elements that need mobile visibility control:

```tsx
{/* Masthead */}
<header style={{ borderBottom: '1px solid var(--border-default)', padding: 'var(--density-pad)' }}>
  <div className="course-shell-masthead" style={{ maxWidth: 1100, margin: '0 auto' }}>
    <div className="masthead-meta-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link
          href="/"
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textDecoration: 'none', transition: 'color 150ms ease' }}
        >
          ← Courses
        </Link>
        <span className="masthead-app-label" style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          The FAUVault Daily · v{appVersion}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Link href="/profile" style={{ textAlign: 'right', textDecoration: 'none' }}>
          <div className="masthead-reader-label" style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Reader</div>
          <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.82rem', color: 'var(--text-primary)' }}>@{username}</div>
        </Link>
        <button
          onClick={() => setShowTweaks(p => !p)}
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase' }}
        >
          Tweaks
        </button>
      </div>
    </div>

    {/* Desktop-only large title */}
    <h1 className="masthead-title" style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: 300, lineHeight: 1.0, color: 'var(--text-primary)', margin: '0.25rem 0', letterSpacing: '-0.01em' }}>
      {titleFirst}{' '}
      <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{titleLast}</em>
    </h1>

    {/* Mobile-only compact course name — hidden on desktop via CSS */}
    <div className="masthead-compact" style={{ display: 'none', alignItems: 'center', justifyContent: 'center', flex: 1, pointerEvents: 'none' }}>
      <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
        {courseLabel}
      </span>
    </div>
  </div>
</header>
```

Note: `masthead-compact` is `display: none` by default (desktop), switched to `display: flex` by the media query on mobile. The compact course name sits inside `masthead-meta-row` — adjust the row to be `position: relative` if centering is needed.

- [ ] **Step 3: Adjust header padding via CSS (not inline style)**

The `padding: 'var(--density-pad)'` on `<header>` is inline and can't be overridden by a non-`!important` media query rule. The `!important` on `.course-shell-masthead header` in the CSS handles this. Verify after dev server start that mobile header padding reduces correctly.

- [ ] **Step 4: Start dev server and verify on mobile viewport**

```bash
npm run dev
```

Open Chrome DevTools → iPhone 14 Pro Max (430px). Check:
- Big Fraunces title hidden ✓
- "THE FAUVAULT DAILY · vX.X.X" hidden ✓
- "READER" label hidden ✓
- `@username` still visible ✓
- Compact course name visible in center ✓
- Header is single row, less vertical height ✓
- Desktop (>768px) looks unchanged ✓

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/CourseShell.tsx
git commit -m "feat: collapse header to single row on mobile"
```

---

### Task 2: Nav "More ▾" Dropdown

**Files:**
- Modify: `src/components/layout/CourseShell.tsx`

- [ ] **Step 1: Add `showMore` state**

At the top of the `CourseShell` function body, alongside existing state declarations, add:

```ts
const [showMore, setShowMore] = useState(false)
```

- [ ] **Step 2: Split navItems into core and overflow**

After the existing `navItems` array definition, add:

```ts
const CORE_NAV_COUNT = 4
const coreItems = navItems.slice(0, CORE_NAV_COUNT)
const overflowItems = navItems.slice(CORE_NAV_COUNT)
const overflowActive = overflowItems.some(item => pathname.endsWith('/' + item.href.split('/').pop()!))
```

- [ ] **Step 3: Add CSS for mobile nav layout**

Extend the `@media (max-width: 768px)` block in the `css` const:

```ts
  @media (max-width: 768px) {
    .masthead-app-label { display: none !important; }
    .masthead-reader-label { display: none !important; }
    .masthead-title { display: none !important; }
    .masthead-compact { display: flex !important; }
    .masthead-meta-row { margin-bottom: 0 !important; }
    .course-shell-masthead header { padding: 0.75rem 1rem !important; }
    .course-shell-nav { overflow-x: visible !important; padding: 0 1rem !important; }
    .nav-overflow-items { display: none !important; }
    .nav-more-btn { display: inline-block !important; }
  }
```

- [ ] **Step 4: Replace nav render logic**

Replace the current `<nav>` block (lines 140–184 in the original file) with:

```tsx
{/* Nav */}
<nav className="course-shell-nav" style={{ borderBottom: '1px solid var(--border-default)', padding: '0 2.5rem', background: 'var(--bg-base)', position: 'sticky', top: 0, zIndex: 30, overflowX: 'auto' }}>
  <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 0, flexWrap: 'nowrap', position: 'relative' }}>
    {/* Core tabs — always visible */}
    {coreItems.map(item => {
      const segment = item.href.split('/').pop()!
      const active = pathname.endsWith('/' + segment)
      return (
        <Link
          key={item.href}
          href={item.href}
          ref={(el) => {
            if (el) tabRefs.current.set(item.href, el)
            else tabRefs.current.delete(item.href)
          }}
          onClick={() => setPendingHref(item.href)}
          style={{
            display: 'inline-block',
            padding: '0.85rem 1.1rem',
            fontSize: '0.82rem',
            color: active ? 'var(--accent)' : 'var(--text-secondary)',
            textDecoration: 'none',
            borderBottom: '2px solid transparent',
            fontWeight: active ? 500 : 400,
            whiteSpace: 'nowrap',
            transition: 'color 150ms ease',
            marginBottom: '-1px',
          }}
        >
          {item.label}
        </Link>
      )
    })}

    {/* Overflow tabs — visible on desktop, hidden on mobile */}
    {overflowItems.map(item => {
      const segment = item.href.split('/').pop()!
      const active = pathname.endsWith('/' + segment)
      return (
        <Link
          key={item.href}
          href={item.href}
          ref={(el) => {
            if (el) tabRefs.current.set(item.href, el)
            else tabRefs.current.delete(item.href)
          }}
          onClick={() => setPendingHref(item.href)}
          className="nav-overflow-items"
          style={{
            display: 'inline-block',
            padding: '0.85rem 1.1rem',
            fontSize: '0.82rem',
            color: active ? 'var(--accent)' : 'var(--text-secondary)',
            textDecoration: 'none',
            borderBottom: '2px solid transparent',
            fontWeight: active ? 500 : 400,
            whiteSpace: 'nowrap',
            transition: 'color 150ms ease',
            marginBottom: '-1px',
          }}
        >
          {item.label}
        </Link>
      )
    })}

    {/* "More" button — hidden on desktop, visible on mobile */}
    {overflowItems.length > 0 && (
      <div className="nav-more-btn" style={{ display: 'none', position: 'relative' }}>
        <button
          onClick={() => setShowMore(p => !p)}
          style={{
            display: 'inline-block',
            padding: '0.85rem 1.1rem',
            fontSize: '0.82rem',
            color: overflowActive ? 'var(--accent)' : 'var(--text-secondary)',
            background: 'none',
            border: 'none',
            borderBottom: '2px solid transparent',
            fontWeight: overflowActive ? 500 : 400,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            marginBottom: '-1px',
          }}
        >
          {overflowActive ? 'More ●' : 'More ▾'}
        </button>
        {showMore && (
          <>
            <div onClick={() => setShowMore(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              zIndex: 50,
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              borderRadius: 8,
              overflow: 'hidden',
              minWidth: 140,
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            }}>
              {overflowItems.map(item => {
                const segment = item.href.split('/').pop()!
                const active = pathname.endsWith('/' + segment)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => { setPendingHref(item.href); setShowMore(false) }}
                    style={{
                      display: 'block',
                      padding: '0.65rem 1rem',
                      fontSize: '0.82rem',
                      color: active ? 'var(--accent)' : 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontWeight: active ? 500 : 400,
                      background: active ? 'var(--accent-subtle)' : 'none',
                    }}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </>
        )}
      </div>
    )}

    {/* Sliding indicator */}
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
  </div>
</nav>
```

- [ ] **Step 5: Verify on mobile and desktop**

Dev server should still be running. Check:
- Mobile: 4 core tabs + "More ▾" button visible, no horizontal scroll ✓
- Mobile: tap "More ▾" → dropdown shows Forum / Leaderboard / Exam Prep ✓
- Mobile: tap outside dropdown → closes ✓
- Mobile: navigate to Forum → "More ●" shown in tab bar ✓
- Desktop: all tabs visible, "More" button hidden ✓
- Sliding indicator still works on desktop ✓

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/CourseShell.tsx
git commit -m "feat: add More dropdown nav for mobile, remove horizontal scroll"
```

---

### Task 3: Flashcard Page Content Cleanup

**Files:**
- Modify: `src/app/[course]/flashcard/page.tsx`

- [ ] **Step 1: Remove the h1 + subtitle div**

In `page.tsx`, remove the entire `<div style={{ marginBottom: '2rem' }}>` block containing the `<h1>` and `<p>` elements. The file should change from:

```tsx
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
    <FlashcardClient ... />
  </div>
)
```

To:

```tsx
return (
  <div style={{ maxWidth: 680, margin: '0 auto', padding: 'var(--density-pad)' }}>
    <FlashcardClient
      flashcards={allCards}
      course={course as Course}
      initialIndex={Math.min(progress.card_index, allCards.length - 1)}
      initialKnown={progress.known}
    />
  </div>
)
```

- [ ] **Step 2: Verify flashcard page on mobile**

In browser at `/[course]/flashcard`:
- No "Flashcards" heading ✓
- No subtitle line ✓
- Progress bar starts immediately ✓
- Desktop: also check no regression (page still looks clean) ✓

- [ ] **Step 3: Commit**

```bash
git add src/app/[course]/flashcard/page.tsx
git commit -m "fix: remove redundant Flashcards h1 and subtitle from flashcard page"
```

---

### Task 4: Push and verify

- [ ] **Step 1: Push branch**

```bash
git push
```

- [ ] **Step 2: Final mobile check**

Open Chrome DevTools → iPhone 14 Pro Max (430px) → navigate to `/[course]/flashcard`. Verify the full experience:
1. Compact single-row header visible
2. 4 tabs + More ▾ in nav, no scroll
3. Flashcard card visible without scrolling past header
4. "More ▾" dropdown works for overflow routes
5. Desktop unchanged
