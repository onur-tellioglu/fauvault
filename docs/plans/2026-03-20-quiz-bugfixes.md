# Quiz Bugfixes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix 4 bugs: global quiz progress not saved, selected answers lost in LectureFlow, missing `answers` field in final_quiz_result, and implement question flagging (işaretleme) with "flag & next" flow.

**Architecture:** Bug fixes are isolated to existing files. Flagging adds minimal state to `quiz/page.tsx` + `QuizQuestion` component. No new routes needed — flagged question IDs stored in `localStorage` (no DB schema change).

**Tech Stack:** Next.js App Router, React useState, TypeScript, localStorage for flags

---

## Bug 1: Global Quiz Progress Not Saved

**Problem:** `quiz/page.tsx` tracks scores in local `useState` only — never calls `/api/progress`.

### Task 1: Save score after each question in global quiz

**Files:**
- Modify: `src/app/quiz/page.tsx`

**Step 1: Add `saveScore` fetch call inside `handleAnswer`**

In `quiz/page.tsx`, replace the `handleAnswer` function:

```typescript
async function handleAnswer(_: number[], score: number) {
  setScores(prev => [...prev, score])
  setAnswered(true)
  // Save progress: use lectureId if a specific lecture is selected
  if (lectureId !== 'all') {
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lectureId,
        patch: {
          mini_quiz_results: {
            [questions[qi].id]: {
              answers: [_],
              score,
              submittedAt: new Date().toISOString(),
            },
          },
        },
      }),
    })
  }
}
```

> Note: global "all lectures" mode has no single lectureId, so we skip saving. Per-lecture mode saves each answer.

**Step 2: Test manually**
1. `cd study-app && npm run dev`
2. Go to `/quiz`, select a specific lecture from dropdown
3. Answer a question
4. Check DB or `/api/progress` (GET not yet implemented) — for now confirm no console errors

**Step 3: Commit**
```bash
git add src/app/quiz/page.tsx
git commit -m "fix: save per-question progress in global quiz page"
```

---

## Bug 2: Selected Answers Always Stored as `[]` in LectureFlow

**Problem:** `LectureFlow.tsx:118` passes `(_, score) => afterFinal(stage.qi, score)` — drops the `selected` array. Then `afterFinal` hardcodes `selected: []`.

### Task 2: Pass and store actual selected answers

**Files:**
- Modify: `src/components/lecture/LectureFlow.tsx`

**Step 1: Fix `afterFinal` to accept and store selected**

Replace (lines 60-65):
```typescript
function afterFinal(qi: number, score: number) {
  const updated = [...finalAnswers]
  updated[qi] = { selected: [], score }
  setFinalAnswers(updated)
  setAnswered(true)
}
```

With:
```typescript
function afterFinal(qi: number, selected: number[], score: number) {
  const updated = [...finalAnswers]
  updated[qi] = { selected, score }
  setFinalAnswers(updated)
  setAnswered(true)
}
```

**Step 2: Fix the `onAnswer` call site (line 118)**

Replace:
```typescript
onAnswer={(_, score) => afterFinal(stage.qi, score)}
```

With:
```typescript
onAnswer={(selected, score) => afterFinal(stage.qi, selected, score)}
```

**Step 3: Commit**
```bash
git add src/components/lecture/LectureFlow.tsx
git commit -m "fix: store actual selected answers in finalAnswers (was always [])"
```

---

## Bug 3: `final_quiz_result` Missing `answers` Field

**Problem:** `LectureFlow.tsx:72-75` sends `{ score, submittedAt }` but `QuizResult` type requires `answers: number[][]`.

### Task 3: Include answers array in final_quiz_result

**Files:**
- Modify: `src/components/lecture/LectureFlow.tsx`

**Step 1: Fix `nextFinal` to include answers**

Replace (lines 70-78):
```typescript
function nextFinal(qi: number) {
  if (qi + 1 < finalQs.length) {
    setStage({ kind: 'final', qi: qi + 1 }); setAnswered(false)
  } else {
    const avg = finalAnswers.reduce((s, a) => s + (a?.score ?? 0), 0) / finalQs.length
    onProgress({
      final_quiz_result: { score: avg, submittedAt: new Date().toISOString() },
      completed_at: new Date().toISOString(),
    })
    setStage({ kind: 'done', score: avg, total: finalQs.length })
  }
}
```

With:
```typescript
function nextFinal(qi: number) {
  if (qi + 1 < finalQs.length) {
    setStage({ kind: 'final', qi: qi + 1 }); setAnswered(false)
  } else {
    const avg = finalAnswers.reduce((s, a) => s + (a?.score ?? 0), 0) / finalQs.length
    const answers = finalQs.map((_, i) => finalAnswers[i]?.selected ?? [])
    onProgress({
      final_quiz_result: {
        answers,
        score: avg,
        submittedAt: new Date().toISOString(),
      },
      completed_at: new Date().toISOString(),
    })
    setStage({ kind: 'done', score: avg, total: finalQs.length })
  }
}
```

**Step 2: Commit**
```bash
git add src/components/lecture/LectureFlow.tsx
git commit -m "fix: include answers array in final_quiz_result (was missing, type mismatch)"
```

---

## Bug 4: Soru İşaretleme (Question Flagging) Yok

**Problem:** Feature doesn't exist. Need: flag button on each question, "flag & skip" flow in quiz, flagged questions listed/reviewable.

**Design decision:** Store flagged question IDs in `localStorage` (key: `flagged_questions`). No DB change. Works across both `quiz/page.tsx` and lecture mode.

### Task 4a: Add flag toggle hook

**Files:**
- Create: `src/lib/flags.ts`

**Step 1: Write the hook**

```typescript
// src/lib/flags.ts
import { useState, useEffect } from 'react'

const KEY = 'flagged_questions'

export function useFlaggedQuestions() {
  const [flagged, setFlagged] = useState<Set<string>>(new Set())

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY)
      if (stored) setFlagged(new Set(JSON.parse(stored)))
    } catch {}
  }, [])

  function toggle(questionId: string) {
    setFlagged(prev => {
      const next = new Set(prev)
      if (next.has(questionId)) {
        next.delete(questionId)
      } else {
        next.add(questionId)
      }
      localStorage.setItem(KEY, JSON.stringify([...next]))
      return next
    })
  }

  return { flagged, toggle }
}
```

**Step 2: Commit**
```bash
git add src/lib/flags.ts
git commit -m "feat: add useFlaggedQuestions hook (localStorage)"
```

---

### Task 4b: Add flag button to QuizQuestion

**Files:**
- Modify: `src/components/quiz/QuizQuestion.tsx`

**Step 1: Add `flagged` and `onFlag` props**

Add to the `Props` type:
```typescript
type Props = {
  question: Question
  onAnswer: (selected: number[], score: number) => void
  questionIndex?: number
  totalQuestions?: number
  flagged?: boolean          // new
  onFlag?: () => void        // new
}
```

**Step 2: Add flag button to the question header**

In the header `<p>` (lines 48-57), add a flag button after the question counter:

```tsx
{totalQuestions != null && (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
    <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>
      Q {(questionIndex ?? 0) + 1} / {totalQuestions}
      {question.type === 'multiple' && (
        <span style={{ marginLeft: 10, color: 'var(--accent)', background: 'var(--accent-subtle)', borderRadius: 4, padding: '1px 7px', fontSize: '0.68rem' }}>
          Multiple correct
        </span>
      )}
    </p>
    {onFlag && (
      <button
        onClick={onFlag}
        title={flagged ? 'İşareti kaldır' : 'İşaretle'}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: '1.1rem', opacity: flagged ? 1 : 0.35,
          transition: 'opacity 150ms ease', padding: '2px 6px',
        }}
      >
        🚩
      </button>
    )}
  </div>
)}
```

**Step 3: Commit**
```bash
git add src/components/quiz/QuizQuestion.tsx
git commit -m "feat: add flag button to QuizQuestion component"
```

---

### Task 4c: Wire flagging into quiz/page.tsx with "flag & next" flow

**Files:**
- Modify: `src/app/quiz/page.tsx`

**Step 1: Import and use the hook**

Add at top:
```typescript
import { useFlaggedQuestions } from '@/lib/flags'
```

Add inside `QuizPage`:
```typescript
const { flagged, toggle: toggleFlag } = useFlaggedQuestions()
```

**Step 2: Add "Flag & Skip" button and wire flag into QuizQuestion**

Replace the `<QuizQuestion .../>` block:
```tsx
<QuizQuestion
  key={questions[qi].id}
  question={questions[qi]}
  onAnswer={handleAnswer}
  questionIndex={qi}
  totalQuestions={questions.length}
  flagged={flagged.has(questions[qi].id)}
  onFlag={() => toggleFlag(questions[qi].id)}
/>
{!answered && (
  <button
    onClick={() => { toggleFlag(questions[qi].id); next() }}
    style={{
      marginTop: '0.75rem', padding: '8px 18px',
      background: 'none', border: '1px solid var(--border-default)',
      color: 'var(--text-muted)', borderRadius: 8, cursor: 'pointer',
      fontSize: '0.8rem', fontFamily: 'var(--font-body)',
    }}
  >
    🚩 İşaretle & Geç
  </button>
)}
{answered && (
  <button onClick={next} style={{ marginTop: '1.5rem', padding: '10px 22px', background: 'var(--accent)', color: '#0C0C10', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
    {qi + 1 < questions.length ? 'Next →' : 'Results →'}
  </button>
)}
```

**Step 3: Show flagged count in results screen**

In the results `<div>`, after the `<p>{scores.length} questions</p>`:
```tsx
{flagged.size > 0 && (
  <p style={{ color: 'var(--accent)', fontSize: '0.85rem', marginTop: 6 }}>
    🚩 {flagged.size} soru işaretlendi
  </p>
)}
```

**Step 4: Commit**
```bash
git add src/app/quiz/page.tsx
git commit -m "feat: wire flag & skip into quiz page, show flagged count in results"
```

---

### Task 4d: Wire flagging into LectureFlow final quiz

**Files:**
- Modify: `src/components/lecture/LectureFlow.tsx`

**Step 1: Import hook**

```typescript
import { useFlaggedQuestions } from '@/lib/flags'
```

**Step 2: Add hook inside `LectureFlow`**

```typescript
const { flagged, toggle: toggleFlag } = useFlaggedQuestions()
```

**Step 3: Add `flagged`/`onFlag` props to the final quiz `<QuizQuestion>`**

In the `stage.kind === 'final'` block (line 116-121):
```tsx
<QuizQuestion
  question={q}
  onAnswer={(selected, score) => afterFinal(stage.qi, selected, score)}
  questionIndex={stage.qi}
  totalQuestions={finalQs.length}
  flagged={flagged.has(q.id)}
  onFlag={() => toggleFlag(q.id)}
/>
```

**Step 4: Commit**
```bash
git add src/components/lecture/LectureFlow.tsx
git commit -m "feat: add flagging to LectureFlow final quiz"
```

---

## Verification Checklist

After all tasks:

- [ ] Global quiz: answer a question in per-lecture mode, refresh page — score visible in DB / no console errors
- [ ] LectureFlow: complete a lecture's final quiz, check DB `final_quiz_result.answers` is not empty arrays
- [ ] Flag button appears on every question (🚩, dim when not flagged, bright when flagged)
- [ ] "İşaretle & Geç" skips current question without requiring an answer
- [ ] Flagging persists across page refreshes (localStorage)
- [ ] Results screen shows flagged count when > 0
