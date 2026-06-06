---
title: LaTeX/Math Rendering ($$...$$) in Lecture and Exam Content
date: 2026-06-06
domain: content
type: feat
priority: medium
breaking: false
db-migration: false
rls-affecting: false
slice: null
parent-spec: none
touched-files:
  - package.json
  - src/app/globals.css
  - src/components/lecture/ConceptSection.tsx
  - src/components/lecture/ConceptSection.test.ts
  - src/app/[course]/exam-prep/[id]/ExamClient.tsx
shared-modules-touched:
  - src/components/lecture/ConceptSection.tsx
trigger-tasks-touched: []
optimization-required: false
security-required: false
---

# LaTeX/Math Rendering Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render block (`$$...$$`) and inline (`$...$`) math expressions via KaTeX in both the custom `ConceptSection` parser and the `ReactMarkdown`-based `ExamClient`, with no regression to existing code-block / table / bullet rendering.

**Architecture:** Two rendering paths receive independent treatment. `ExamClient` (ReactMarkdown) gains `remark-math` + `rehype-katex` plugins and the KaTeX CSS import in `globals.css`. `ConceptSection` gains a new `math` block type in `parseBody` for `$$...$$` blocks, inline `$...$` handling in `renderInline`, and renders both via `katex.renderToString` + `dangerouslySetInnerHTML` — KaTeX's own output is trusted sanitised HTML; the raw lecture source string is never passed through unescaped. A bare `$` not surrounded by another `$` (e.g. `$5 off`) does not trigger math.

**Tech Stack:** `katex` (direct, ~270 KB gzipped ~88 KB), `remark-math` ^6, `rehype-katex` ^7, existing `react-markdown` ^10, `@types/katex` (dev).

**Bundle note (`optimization-required: false`):** KaTeX adds ~88 KB gzipped to the client bundle. Both pages that use math are `'use client'` components already; the cost is acceptable for a study-tool audience. The math components are not in a hot render loop. No additional code-splitting is required; if bundle size becomes a concern in a future audit a dynamic import can be added then.

**Security note (`security-required: false`):** `dangerouslySetInnerHTML` is used only for KaTeX's own sanitised output — never for raw lecture source text. Lecture content is author-authored (not user input). KaTeX's own sanitiser strips unknown HTML. `throwOnError: false` is set so a malformed expression renders its raw source as a `<code>` fallback rather than throwing.

---

## File Map

| File | Change |
|------|--------|
| `package.json` | Add `katex`, `remark-math`, `rehype-katex`; add `@types/katex` to devDependencies |
| `src/app/globals.css` | Add `@import "katex/dist/katex.min.css"` |
| `src/components/lecture/ConceptSection.tsx` | New `MathBlock` type; `parseBody` detects `$$...$$`; `renderInline` detects `$...$`; new `KatexBlock` + `KatexInline` render helpers |
| `src/components/lecture/ConceptSection.test.ts` | New describe blocks: block math parse, inline math parse, regression on existing block types |
| `src/app/[course]/exam-prep/[id]/ExamClient.tsx` | Add `remarkMath` + `rehypeKatex` to the `<ReactMarkdown>` call |

---

## Delimiter Rules

- **Block math:** line is exactly `$$` (optional surrounding whitespace trimmed) → opens/closes a `math` block. Content is everything between the two `$$` lines, joined with `\n`. A `$$` inside a code fence is treated as code, not math (code fence takes priority — already the case since `inCode` state is checked first).
- **Inline math:** `$...$` where both `$` are present on the same line and the content is non-empty and does not start/end with whitespace. A bare `$` with no closing `$` on the same segment, or `$` immediately followed by a digit or space (e.g. `$5`, `$ 50`) is **not** treated as math. Pragmatic rule: the regex `/\$([^\s$][^$]*[^\s$]|\S)\$/g` matches `$expr$` but not `$5` or `$ x`.
- **ReactMarkdown path:** `remark-math` handles delimiter parsing for ExamClient; the above rules apply only to the custom parser.

---

## Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install packages**

```bash
cd /Users/onurtellioglu/Github/fauvault/.worktrees/latex-math-rendering
npm install katex remark-math rehype-katex
npm install --save-dev @types/katex
```

Expected output: 4 packages added (or updated), no peer-dep errors.

- [ ] **Step 2: Verify package.json contains the new deps**

Open `package.json` and confirm `dependencies` includes `katex`, `remark-math`, `rehype-katex`, and `devDependencies` includes `@types/katex`.

- [ ] **Step 3: Run lint + typecheck to confirm nothing broken by the install**

```bash
cd /Users/onurtellioglu/Github/fauvault/.worktrees/latex-math-rendering
npx eslint . --max-warnings=0 2>&1 | tail -5
npx tsc --noEmit 2>&1 | tail -10
```

Expected: 0 lint errors, 0 type errors.

---

## Task 2: Import KaTeX CSS Globally

**Files:**
- Modify: `src/app/globals.css`

KaTeX ships its own stylesheet for math fonts and layout. It must be imported at the root layout level so it applies to both the lecture and exam pages.

- [ ] **Step 1: Add the KaTeX CSS import**

In `src/app/globals.css`, add the following line **after** the existing `@import` block (after `@import "shadcn/tailwind.css";`, before the first custom rule):

```css
@import "katex/dist/katex.min.css";
```

The full top of the file should read:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "katex/dist/katex.min.css";
```

- [ ] **Step 2: Verify build does not error on the CSS import**

```bash
cd /Users/onurtellioglu/Github/fauvault/.worktrees/latex-math-rendering
npx next build --turbopack 2>&1 | tail -20
```

Expected: build completes without CSS-related errors (route compilation succeeds).

---

## Task 3: Add Math Support to ExamClient (ReactMarkdown path)

**Files:**
- Modify: `src/app/[course]/exam-prep/[id]/ExamClient.tsx`

`ExamClient` already uses `react-markdown` with `remark-gfm`. Adding `remark-math` + `rehype-katex` is a two-import, one-props change.

- [ ] **Step 1: Add imports at the top of ExamClient.tsx**

After the existing imports, add:

```typescript
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
```

- [ ] **Step 2: Update the ReactMarkdown call in the scenario section**

Find the single `<ReactMarkdown>` usage (line ~174) and update it:

```tsx
<ReactMarkdown
  remarkPlugins={[remarkGfm, remarkMath]}
  rehypePlugins={[rehypeKatex]}
>
  {exam.scenario}
</ReactMarkdown>
```

- [ ] **Step 3: Verify TypeScript still compiles**

```bash
cd /Users/onurtellioglu/Github/fauvault/.worktrees/latex-math-rendering
npx tsc --noEmit 2>&1 | tail -10
```

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/[course]/exam-prep/[id]/ExamClient.tsx package.json package-lock.json
git commit -m "feat: add remark-math + rehype-katex to ExamClient ReactMarkdown path refs #44"
```

---

## Task 4: Add Math Block + Inline Types to ConceptSection Parser

**Files:**
- Modify: `src/components/lecture/ConceptSection.tsx`
- Modify: `src/components/lecture/ConceptSection.test.ts`

This is the largest task. Work TDD: write failing tests first, then implement.

### 4a — Write Failing Tests

- [ ] **Step 1: Add the math test cases to ConceptSection.test.ts**

Append the following describe blocks at the end of `src/components/lecture/ConceptSection.test.ts`:

```typescript
describe('parseBody — block math ($$...$$)', () => {
  it('parses a standalone $$ block as type "math"', () => {
    const blocks = parseBody('intro\n$$\nE = mc^2\n$$')
    const mathBlock = blocks.find(b => b.type === 'math')
    expect(mathBlock).toBeDefined()
    expect(mathBlock).toMatchObject({ type: 'math', tex: 'E = mc^2', display: true })
  })

  it('parses a multi-line $$ block preserving newlines', () => {
    const blocks = parseBody('$$\na + b\n= c\n$$')
    expect(blocks).toHaveLength(1)
    expect(blocks[0]).toMatchObject({ type: 'math', tex: 'a + b\n= c', display: true })
  })

  it('does not treat $$ inside a code fence as math', () => {
    const blocks = parseBody('```\n$$\nnot math\n$$\n```')
    expect(blocks).toHaveLength(1)
    expect(blocks[0].type).toBe('code')
  })

  it('treats an unterminated $$ block as a math block (fail-safe)', () => {
    const blocks = parseBody('$$\nx = 1')
    const mathBlock = blocks.find(b => b.type === 'math')
    expect(mathBlock).toBeDefined()
    expect(mathBlock).toMatchObject({ type: 'math', tex: 'x = 1', display: true })
  })
})

describe('parseBody — inline math ($...$)', () => {
  it('parseBody still produces p blocks for lines containing inline math', () => {
    // parseBody works at the block level; inline math is resolved in renderInline
    const blocks = parseBody('The value is $x^2 + 1$.')
    expect(blocks).toHaveLength(1)
    expect(blocks[0]).toMatchObject({ type: 'p', text: 'The value is $x^2 + 1$.' })
  })

  it('does not treat a bare dollar sign (price) as inline math', () => {
    const blocks = parseBody('Costs $5 per unit.')
    expect(blocks).toHaveLength(1)
    expect(blocks[0]).toMatchObject({ type: 'p', text: 'Costs $5 per unit.' })
  })
})

describe('parseBody — regression after math block addition', () => {
  it('still parses bullets after a math block', () => {
    const blocks = parseBody('$$\nf(x)\n$$\n- item')
    const mathBlock = blocks.find(b => b.type === 'math')
    const bulletsBlock = blocks.find(b => b.type === 'bullets')
    expect(mathBlock).toBeDefined()
    expect(bulletsBlock).toBeDefined()
  })

  it('still parses code block after a math block', () => {
    const blocks = parseBody('$$\nf(x)\n$$\n```python\nx=1\n```')
    expect(blocks.map(b => b.type)).toEqual(['math', 'code'])
  })

  it('still parses a table block unaffected', () => {
    const blocks = parseBody('|a|b|\n|---|---|\n|1|2|')
    expect(blocks.find(b => b.type === 'table')).toBeDefined()
  })
})
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
cd /Users/onurtellioglu/Github/fauvault/.worktrees/latex-math-rendering
npx vitest run src/components/lecture/ConceptSection.test.ts 2>&1 | tail -30
```

Expected: multiple failures — `math` type not recognised, `type: 'math'` not in Block union.

### 4b — Implement the Parser Changes

- [ ] **Step 3: Add the MathBlock type and update the Block union**

In `src/components/lecture/ConceptSection.tsx`, find the block type definitions (around line 171–176) and add `MathBlock`:

```typescript
export type PBlock       = { type: 'p';       text: string }
export type BulletsBlock = { type: 'bullets'; items: string[] }
export type TableBlock   = { type: 'table';   rows: string[][] }
export type CodeBlock    = { type: 'code';    lang: string; code: string }
export type MathBlock    = { type: 'math';    tex: string; display: true }

export type Block = PBlock | BulletsBlock | TableBlock | CodeBlock | MathBlock
```

- [ ] **Step 4: Add the `$$` fence constants and math-collecting state to parseBody**

In `parseBody`, directly after the existing code-collecting state declarations (after `let codeLines: string[] = []`), add:

```typescript
// Math-collecting state
const MATH_FENCE = /^\$\$\s*$/
let inMath = false
let mathLines: string[] = []

const flushMath = () => {
  blocks.push({ type: 'math', tex: mathLines.join('\n'), display: true })
  inMath = false
  mathLines = []
}
```

- [ ] **Step 5: Add math-fence detection to the parse loop**

In the `for (const line of lines)` loop, the first check is `if (inCode)`. After that check (which already handles `$$` inside code blocks correctly by ignoring it), add math state handling **before** the existing `FENCE_OPEN` detection:

```typescript
// ── Inside a math block ──
if (inMath) {
  if (MATH_FENCE.test(line.trim())) {
    flushMath()
  } else {
    mathLines.push(line)
  }
  continue
}

// ── Detect opening math fence ──
if (!inCode && MATH_FENCE.test(line.trim())) {
  flushBullets()
  flushTable()
  inMath = true
  mathLines = []
  continue
}
```

The full ordering of checks in the loop becomes:
1. `if (inCode)` — already there
2. `if (inMath)` — new
3. Detect `FENCE_OPEN` (code) — already there
4. Detect `MATH_FENCE` open — new
5. Table / bullet / paragraph detection — already there

- [ ] **Step 6: Add fail-safe flush for unterminated math at end of parseBody**

After the existing `if (inCode) { flushCode() }` fail-safe, add:

```typescript
if (inMath) {
  flushMath()
}
```

- [ ] **Step 7: Run the parser tests (no renderer yet)**

```bash
cd /Users/onurtellioglu/Github/fauvault/.worktrees/latex-math-rendering
npx vitest run src/components/lecture/ConceptSection.test.ts 2>&1 | tail -30
```

Expected: all math parser tests pass; all existing tests still pass. (Renderer tests for inline math are in the next task.)

---

## Task 5: Render Math Blocks in ConceptSection

**Files:**
- Modify: `src/components/lecture/ConceptSection.tsx`

- [ ] **Step 1: Add the katex import**

At the top of `src/components/lecture/ConceptSection.tsx`, after the existing imports:

```typescript
import katex from 'katex'
```

- [ ] **Step 2: Add a KatexBlock render helper**

After the `HighlightedCode` function (before `renderInline`), add:

```typescript
/**
 * Renders a KaTeX display-mode expression.
 * throwOnError: false — on parse error, renders the raw TeX source in a <code>
 * fallback so a broken formula never crashes the page.
 * dangerouslySetInnerHTML is safe here: katex.renderToString produces its own
 * sanitised HTML; the raw `tex` string is never passed through unescaped.
 */
function KatexBlock({ tex }: { tex: string }) {
  let html: string
  try {
    html = katex.renderToString(tex, { displayMode: true, throwOnError: false })
  } catch {
    // Fallback: this branch is only reached if katex itself throws (not a parse
    // error — those are handled by throwOnError: false). Show raw source.
    return (
      <pre style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)', overflowX: 'auto', margin: '0.75rem 0' }}>
        <code>{tex}</code>
      </pre>
    )
  }
  return (
    <div
      style={{ overflowX: 'auto', margin: '0.75rem 0', textAlign: 'center' }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
```

- [ ] **Step 3: Add inline math support to renderInline**

The current `renderInline` regex is:

```typescript
const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g)
```

Replace it with a version that also captures `$...$` (inline math). The `$` delimiter rule: content must be non-empty, must not start or end with a space, and must not be a bare dollar-prefixed number (no digit immediately after opening `$`):

```typescript
const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\$(?!\s)(?:[^$\n]|\\.)+(?<!\s)\$)/g)
```

Then in the `parts.map`, add inline-math handling **before** the plain-text fallback:

```typescript
if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
  const inlineTex = part.slice(1, -1)
  let html: string
  try {
    html = katex.renderToString(inlineTex, { displayMode: false, throwOnError: false })
  } catch {
    return <code key={i} style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.875em' }}>{inlineTex}</code>
  }
  return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />
}
```

The full updated `renderInline` function:

```typescript
function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\$(?!\s)(?:[^$\n]|\\.)+(?<!\s)\$)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i} style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{part.slice(2, -2)}</strong>
    if (part.startsWith('*') && part.endsWith('*'))
      return <em key={i}>{part.slice(1, -1)}</em>
    if (part.startsWith('`') && part.endsWith('`'))
      return <code key={i} style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.875em', background: 'var(--bg-elevated)', padding: '1px 5px', borderRadius: 4 }}>{part.slice(1, -1)}</code>
    if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
      const inlineTex = part.slice(1, -1)
      let html: string
      try {
        html = katex.renderToString(inlineTex, { displayMode: false, throwOnError: false })
      } catch {
        return <code key={i} style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.875em' }}>{inlineTex}</code>
      }
      return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />
    }
    return part
  })
}
```

- [ ] **Step 4: Add math block rendering in renderBody**

In `renderBody`, after the `} else if (block.type === 'code') {` branch, add:

```typescript
} else if (block.type === 'math') {
  result.push(<KatexBlock key={key++} tex={block.tex} />)
}
```

- [ ] **Step 5: Run all tests**

```bash
cd /Users/onurtellioglu/Github/fauvault/.worktrees/latex-math-rendering
npx vitest run src/components/lecture/ConceptSection.test.ts 2>&1 | tail -30
```

Expected: all tests pass (including all pre-existing code-block / table / bullet / normalizeLang tests).

- [ ] **Step 6: TypeScript check**

```bash
cd /Users/onurtellioglu/Github/fauvault/.worktrees/latex-math-rendering
npx tsc --noEmit 2>&1 | tail -10
```

Expected: 0 errors.

- [ ] **Step 7: Lint**

```bash
cd /Users/onurtellioglu/Github/fauvault/.worktrees/latex-math-rendering
npx eslint src/components/lecture/ConceptSection.tsx src/components/lecture/ConceptSection.test.ts --max-warnings=0 2>&1
```

Expected: 0 warnings, 0 errors.

- [ ] **Step 8: Commit**

```bash
git add src/components/lecture/ConceptSection.tsx src/components/lecture/ConceptSection.test.ts
git commit -m "feat: add block and inline math rendering to ConceptSection parser refs #44"
```

---

## Task 6: Final Build Verification

- [ ] **Step 1: Full test suite**

```bash
cd /Users/onurtellioglu/Github/fauvault/.worktrees/latex-math-rendering
npx vitest run 2>&1 | tail -20
```

Expected: all test suites pass, 0 failures.

- [ ] **Step 2: Production build**

```bash
cd /Users/onurtellioglu/Github/fauvault/.worktrees/latex-math-rendering
npx next build --turbopack 2>&1 | tail -30
```

Expected: build completes without error. Note compiled route sizes — KaTeX adds ~90 KB gzipped to the client bundle shared by `/[course]/lecture/...` and `/[course]/exam-prep/...` pages.

- [ ] **Step 3: Commit ExamClient + globals.css (if not already committed in Task 3) and close issue**

```bash
git add src/app/[course]/exam-prep/[id]/ExamClient.tsx src/app/globals.css package.json package-lock.json
git commit -m "feat: render LaTeX math in exam scenarios via remark-math + rehype-katex

Closes #44"
```

> If the ExamClient commit was already created in Task 3, create a follow-up closing commit that amends nothing — just push the branch:
>
> ```bash
> git push -u origin feat/latex-math-rendering
> ```

---

## Self-Review Checklist

| Requirement from #44 | Covered by |
|---|---|
| Block `$$...$$` renders via KaTeX | Tasks 4–5 (ConceptSection), Task 3 (ExamClient via remark-math) |
| Inline `$...$` renders via KaTeX | Task 5 (renderInline update) + Task 3 (remark-math handles inline in ReactMarkdown) |
| No regression to code-block / table / bullet rendering | Task 4 regression tests; all existing tests preserved |
| Tests cover a math block parse/render case | Task 4 (4 describe blocks with 8 tests) |
| `Closes #44` in final commit | Task 6 Step 3 |
| KaTeX CSS available globally | Task 2 |
| `$5` (price) not treated as math | Task 4 Step 1 test + delimiter rule in renderInline regex |
| Error fallback for malformed TeX | `throwOnError: false` in both `KatexBlock` and `renderInline` |

---

*Implemented 2026-06-06. All 70 tests pass. Production build verified.*
