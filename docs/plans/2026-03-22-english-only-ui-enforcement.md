# English-Only UI Enforcement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ensure every user-visible string in the app is English-only, remove existing non-English UI text, and prevent regressions in future content/UI updates.

**Architecture:** Apply a layered approach: (1) fix current visible non-English strings, (2) add automated English-only validation for generated content and UI text sources, and (3) enforce checks in CI/scripts. This keeps runtime UX clean while catching non-English text during development before deployment.

**Tech Stack:** Next.js 15, TypeScript, Vitest, npm scripts, GitHub Actions (optional CI gate)

---

## Scope Summary

- Confirmed non-English user-visible string in code: `src/components/layout/ExamCountdown.tsx` countdown units (`g s d sn`).
- Screenshot hints (`Tamamlandı`, `Tüm Dersler (Pratik)`, Turkish explanation sentence) suggest historical/stale content; current tracked source appears mostly English.
- Plan includes explicit audit + guardrails so any Turkish/non-English text in future generated content or UI code is blocked.

---

### Task 1: Build an automated language audit test for user-visible sources

**Files:**
- Create: `src/lib/language/english-audit.test.ts`
- Create: `src/lib/language/english-audit.ts`
- Modify: `vitest.config.ts`

**Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest'
import { collectNonEnglishFindings } from './english-audit'

describe('english-only user-visible text', () => {
  it('finds zero non-English strings in audited sources', () => {
    const findings = collectNonEnglishFindings()
    expect(findings).toEqual([])
  })
})
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/language/english-audit.test.ts`
Expected: FAIL with finding containing `ExamCountdown.tsx` (`g s d sn`).

**Step 3: Write minimal implementation**

```ts
export type LanguageFinding = {
  file: string
  line: number
  text: string
}

const NON_ENGLISH_HINTS = [
  /\b(Tamamlandı|Tüm|Dersler|Pratik|Başla|Devam|Tekrar|Sınav|dakika|soru|yanlış)\b/i,
  /[ÇĞİÖŞÜçğıöşü]/
]

export function collectNonEnglishFindings(): LanguageFinding[] {
  // Read only user-visible source domains:
  // src/app, src/components, src/lib/content.ts
  // Parse line-by-line and return matched snippets.
  return []
}
```

**Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/language/english-audit.test.ts`
Expected: PASS once Task 2 fix is done.

**Step 5: Commit**

```bash
git add src/lib/language/english-audit.ts src/lib/language/english-audit.test.ts vitest.config.ts
git commit -m "test: add english-only audit for user-visible text"
```

---

### Task 2: Fix currently visible non-English text in countdown UI

**Files:**
- Modify: `src/components/layout/ExamCountdown.tsx:45`
- Test: `src/lib/language/english-audit.test.ts`

**Step 1: Write the failing test**

Use Task 1 test as the failing test (already fails due to countdown units).

**Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/language/english-audit.test.ts`
Expected: FAIL referencing `ExamCountdown.tsx`.

**Step 3: Write minimal implementation**

Replace Turkish abbreviations with English units:

```tsx
{left.days}d&nbsp;{String(left.hr).padStart(2, '0')}h&nbsp;{String(left.min).padStart(2, '0')}m&nbsp;{String(left.sec).padStart(2, '0')}s
```

**Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/language/english-audit.test.ts`
Expected: PASS and no findings.

**Step 5: Commit**

```bash
git add src/components/layout/ExamCountdown.tsx src/lib/language/english-audit.test.ts src/lib/language/english-audit.ts
git commit -m "fix: replace countdown units with english abbreviations"
```

---

### Task 3: Enforce English-only in content generation pipeline

**Files:**
- Modify: `src/scripts/parse-content.ts`
- Modify: `src/scripts/generate-content.ts`
- Modify: `src/scripts/parse-content.test.ts`
- (Optional helper) Create: `src/scripts/language-guards.ts`

**Step 1: Write the failing test**

```ts
it('rejects non-English explanation text', () => {
  const badGuide = `
## LECTURE 1 — Intro (Speaker, 01.01.2026)
### Key Concepts
Some text.
### Practice Questions
**Q1.** What?
A) A
B) B
**Answer: A** — Sınav 90 dakikadır.
`
  expect(() => parseStudyGuide(badGuide)).toThrow(/non-english/i)
})
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run src/scripts/parse-content.test.ts`
Expected: FAIL because parser currently accepts non-English text.

**Step 3: Write minimal implementation**

Add validation in parsing/generation:

- Validate `lecture.title`, `concept.heading`, `concept.body`, `question.text`, `question.options`, `question.explanation`.
- Throw explicit error with location (lecture/question id + field name) when non-English markers are detected.

```ts
function assertEnglishOnly(input: string, context: string): void {
  if (/[ÇĞİÖŞÜçğıöşü]/.test(input)) {
    throw new Error(`Non-English text detected in ${context}: ${input}`)
  }
}
```

**Step 4: Run test to verify it passes**

Run: `npx vitest run src/scripts/parse-content.test.ts`
Expected: PASS including the new rejection case.

**Step 5: Commit**

```bash
git add src/scripts/parse-content.ts src/scripts/generate-content.ts src/scripts/parse-content.test.ts src/scripts/language-guards.ts
git commit -m "feat: enforce english-only validation in content parser"
```

---

### Task 4: Add repeatable project-level validation command

**Files:**
- Modify: `package.json`
- (Optional) Create: `.github/workflows/english-only.yml`

**Step 1: Write the failing test/check**

Add command and ensure it fails when Turkish chars are present (pre-fix state or temporary injected test string).

**Step 2: Run check to verify it fails**

Run: `npm run verify:english-only`
Expected: FAIL if a non-English marker exists.

**Step 3: Write minimal implementation**

Add script:

```json
{
  "scripts": {
    "verify:english-only": "node -e \"require('./dist-or-ts-runner').runEnglishAudit?.()\""
  }
}
```

Preferred practical implementation:
- Reuse `collectNonEnglishFindings()` and fail non-zero on findings.
- Print actionable output: file, line, text snippet.

**Step 4: Run check to verify it passes**

Run: `npm run verify:english-only`
Expected: PASS with `No non-English user-visible text found`.

**Step 5: Commit**

```bash
git add package.json .github/workflows/english-only.yml src/lib/language/english-audit.ts
git commit -m "chore: add english-only verification command and ci gate"
```

---

### Task 5: Full regression validation and rollout verification

**Files:**
- Modify: `README.md` (if language policy section exists; otherwise skip)
- No code changes expected unless issues found

**Step 1: Write final validation checklist (failing state if unmet)**

Checklist:
- `english-audit.test.ts` passes
- `parse-content.test.ts` passes with new non-English rejection case
- `npm run lint` passes
- `npm run build` passes

**Step 2: Run validation commands**

Run: `npx vitest run src/lib/language/english-audit.test.ts src/scripts/parse-content.test.ts && npm run lint && npm run build`
Expected: all PASS.

**Step 3: Manual UI smoke verification**

Run app and verify pages:
- `/dashboard` (cards, countdown, status labels)
- `/quiz` (dropdown labels, explanation box, buttons)
- `/lecture/[id]` (concept and question flow)

Expected: no Turkish/non-English UI copy visible.

**Step 4: Document policy (if needed)**

Add brief guideline: user-visible copy must be English-only, and `verify:english-only` is mandatory before merge.

**Step 5: Commit**

```bash
git add README.md
git commit -m "docs: document english-only ui policy"
```

---

## Notes / Considerations

- `src/lib/content.ts` is auto-generated; long-term correctness depends on parser-time validation, not manual edits.
- Avoid over-restricting proper nouns/abbreviations (e.g., person names, FAU, AI, MRI); reject only clear non-English markers.
- If screenshots still show Turkish after code fixes, clear cache and verify deployment branch/environment uses latest build.
- If non-English appears from external source data not in repo, add the same validation at ingest boundary before persistence.

