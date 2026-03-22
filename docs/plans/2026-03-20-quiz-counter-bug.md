# Quiz Counter Bug Fix Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix two bugs in `LectureFlow`: (1) the final quiz counter showing N-1 instead of N total questions, and (2) a question appearing twice when a lecture has only 1 question.

**Architecture:** All logic lives in `src/components/lecture/LectureFlow.tsx`. The `split()` function divides lecture questions between mini-quiz (one per concept, runs inline after each concept) and final quiz (remaining questions). The bugs stem from: (a) the counter only knowing about `finalQs` length, not the full question pool, and (b) a fallback in `split` that re-uses all questions when `finalQs` is empty.

**Tech Stack:** React 19, Next.js 15, TypeScript, Vitest

---

## Background: How the flow works

Every lecture currently has **1 concept** and **N questions** (N = 1–9 across 21 lectures).

`split(lecture)` does:
1. Assigns 1 question per concept to `miniMap` (the "Concept Check" shown inline after reading)
2. Remaining questions → `finalQs` (the "Lecture Quiz" shown at the end)
3. **Buggy fallback:** if `finalQs` is empty, returns `lecture.questions` instead — causing duplication

With 1 concept and 8 questions:
- `miniMap[0] = [q0]` — shown as "Concept Check" (no counter displayed)
- `finalQs = [q1..q7]` — shown as "Lecture Quiz" with counter "Q 1 / 7"
- User sees 8 questions total but counter only goes to 7 ❌

With 1 concept and 1 question (Lecture 1):
- `miniMap[0] = [q0]` — shown as "Concept Check"
- `finalQs = []` → fallback to `lecture.questions = [q0]` — q0 shown **again** ❌

---

## Bug 1: Counter is off

**Root cause:** `LectureFlow.tsx:128`
```tsx
totalQuestions={finalQs.length}   // 7, not 8
questionIndex={stage.qi}           // 0-based within finalQs only
```

**Fix:** Pass global index and total:
```tsx
totalQuestions={lecture.questions.length}               // 8
questionIndex={stage.qi + miniQuestionCount}            // 0 + 1 = 1 → displays "Q 2 / 8"
```

Where `miniQuestionCount = Object.values(miniMap).flat().length`.

---

## Bug 2: Duplicate question

**Root cause:** `LectureFlow.tsx:22`
```ts
return { miniMap, finalQs: finalQs.length > 0 ? finalQs : lecture.questions }
//                                               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                                               repeats all questions!
```

**Fix:** Always return real `finalQs` (may be empty):
```ts
return { miniMap, finalQs }
```

Then handle the empty case in `nextAfterMini`: when the last concept is done and `finalQs` is empty, go straight to the done screen instead of entering an empty final quiz.

---

## Bug 3 (follow-on): Done screen shows wrong total

**Root cause:** `LectureFlow.tsx:83`
```ts
setStage({ kind: 'done', score: avg, total: finalQs.length })
// "Lecture complete · 7 questions" — misses the mini-quiz question
```

**Fix:** Use `lecture.questions.length` for the total.

---

## Task 1: Export `split` and write failing tests

**Files:**
- Modify: `src/components/lecture/LectureFlow.tsx` (export `split`)
- Create: `src/components/lecture/LectureFlow.test.ts`

**Step 1: Export `split` from LectureFlow.tsx**

Change line 15 from:
```ts
function split(lecture: Lecture) {
```
To:
```ts
export function split(lecture: Lecture) {
```

**Step 2: Create the test file with failing tests**

Create `src/components/lecture/LectureFlow.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { split } from './LectureFlow'
import type { Lecture } from '@/lib/types'

function makeLecture(conceptCount: number, questionCount: number): Lecture {
  return {
    id: 1,
    title: 'Test',
    speaker: 'Test',
    concepts: Array.from({ length: conceptCount }, (_, i) => ({ heading: `C${i}`, body: '' })),
    questions: Array.from({ length: questionCount }, (_, i) => ({
      id: `q${i}`, text: `Q${i}`, type: 'single' as const,
      options: ['A', 'B'], correct: [0], explanation: '',
    })),
  }
}

describe('split', () => {
  it('1 concept, 8 questions → 1 mini, 7 final (no duplication)', () => {
    const { miniMap, finalQs } = split(makeLecture(1, 8))
    expect(Object.keys(miniMap)).toHaveLength(1)
    expect(miniMap[0]).toHaveLength(1)
    expect(finalQs).toHaveLength(7)
    // Mini question must NOT appear in final
    expect(finalQs.map(q => q.id)).not.toContain(miniMap[0][0].id)
  })

  it('1 concept, 1 question → 1 mini, 0 final (no duplication)', () => {
    const { miniMap, finalQs } = split(makeLecture(1, 1))
    expect(miniMap[0]).toHaveLength(1)
    expect(finalQs).toHaveLength(0)  // currently FAILS — returns [q0] due to fallback
  })

  it('3 concepts, 5 questions → 3 mini, 2 final', () => {
    const { miniMap, finalQs } = split(makeLecture(3, 5))
    expect(Object.keys(miniMap)).toHaveLength(3)
    expect(finalQs).toHaveLength(2)
  })

  it('concepts >= questions → finalQs is empty, no fallback', () => {
    const { finalQs } = split(makeLecture(5, 3))
    expect(finalQs).toHaveLength(0)  // currently FAILS — returns all 3 questions
  })
})
```

**Step 3: Run the tests — confirm 2 fail**

```bash
npx vitest run src/components/lecture/LectureFlow.test.ts
```

Expected: 2 tests FAIL (`finalQs` is not empty when it should be), 2 PASS.

---

## Task 2: Fix `split` — remove the fallback

**Files:**
- Modify: `src/components/lecture/LectureFlow.tsx:22`

**Step 1: Remove the fallback**

Change line 22 from:
```ts
return { miniMap, finalQs: finalQs.length > 0 ? finalQs : lecture.questions }
```
To:
```ts
return { miniMap, finalQs }
```

**Step 2: Run the `split` tests — all 4 should pass**

```bash
npx vitest run src/components/lecture/LectureFlow.test.ts
```

Expected: 4/4 PASS.

**Step 3: Run all tests**

```bash
npx vitest run
```

Expected: all pass.

**Step 4: Commit**

```bash
git add src/components/lecture/LectureFlow.tsx src/components/lecture/LectureFlow.test.ts
git commit -m "fix: remove split() fallback that duplicated questions in final quiz"
```

---

## Task 3: Handle empty `finalQs` — skip final quiz, go to done

**Context:** After removing the fallback, when `finalQs` is empty (Lecture 1: 1 concept, 1 question), `nextAfterMini` transitions to `{ kind: 'final', qi: 0 }` but `finalQs[0]` is `undefined` → crash.

We also need to track mini-quiz scores so the done screen has a meaningful score.

**Files:**
- Modify: `src/components/lecture/LectureFlow.tsx`

**Step 1: Add `miniScores` state (line ~36)**

After the existing `finalAnswers` state:
```ts
const [miniScores, setMiniScores] = useState<number[]>([])
```

**Step 2: Record mini-quiz score in the mini-quiz `onAnswer` callback (line ~106)**

Change:
```tsx
<QuizQuestion question={q} onAnswer={() => setAnswered(true)} />
```
To:
```tsx
<QuizQuestion question={q} onAnswer={(_, score) => { setMiniScores(prev => [...prev, score]); setAnswered(true) }} />
```

**Step 3: Handle `finalQs.length === 0` in `nextAfterMini` (line ~53)**

Change the `else` branch that transitions to `final`:
```ts
function nextAfterMini(ci: number) {
  if (ci + 1 < lecture.concepts.length) {
    setStage({ kind: 'concept', ci: ci + 1 })
    onProgress({ concept_index: ci + 1 })
  } else if (finalQs.length === 0) {
    // All questions were used as mini-quizzes — skip final, go to done
    const avg = miniScores.length > 0
      ? miniScores.reduce((a, b) => a + b, 0) / miniScores.length
      : 0
    onProgress({
      final_quiz_result: { answers: [], score: avg, submittedAt: new Date().toISOString() },
      completed_at: new Date().toISOString(),
    })
    setStage({ kind: 'done', score: avg, total: lecture.questions.length })
  } else {
    setStage({ kind: 'final', qi: 0 }); setAnswered(false)
  }
}
```

**Step 4: Run all tests**

```bash
npx vitest run
```

Expected: all pass.

**Step 5: Commit**

```bash
git add src/components/lecture/LectureFlow.tsx
git commit -m "fix: skip final quiz and go to done when all questions used in mini-quiz"
```

---

## Task 4: Fix the counter and done screen total

**Files:**
- Modify: `src/components/lecture/LectureFlow.tsx`

**Step 1: Compute `miniQuestionCount` inside the component (after the `useMemo` call, line ~32)**

```ts
const { miniMap, finalQs } = useMemo(() => split(lecture), [lecture])
const miniQuestionCount = useMemo(
  () => Object.values(miniMap).reduce((sum, qs) => sum + qs.length, 0),
  [miniMap]
)
```

**Step 2: Fix the counter props passed to `QuizQuestion` in the final quiz render (line ~127)**

Change:
```tsx
questionIndex={stage.qi}
totalQuestions={finalQs.length}
```
To:
```tsx
questionIndex={stage.qi + miniQuestionCount}
totalQuestions={lecture.questions.length}
```

**Step 3: Fix the done screen total (line ~83)**

Change:
```ts
setStage({ kind: 'done', score: avg, total: finalQs.length })
```
To:
```ts
setStage({ kind: 'done', score: avg, total: lecture.questions.length })
```

**Step 4: Run all tests**

```bash
npx vitest run
```

Expected: all pass.

**Step 5: Manual smoke test**

Start dev server:
```bash
npm run dev
```

Open a lecture with multiple questions (e.g., Lecture 3 — 9 questions):
1. Read the concept → click "Quick Check →"
2. Answer the Concept Check question → click "Continue →"
3. Lecture Quiz appears
4. ✅ Counter should show **"Q 2 / 9"** (not "Q 1 / 8")
5. Answer through all 8 remaining → ✅ counter ends at "Q 9 / 9"
6. Done screen: ✅ "Lecture complete · 9 questions"

Open Lecture 1 (1 concept, 1 question):
1. Read the concept → click "Quick Check →"
2. Answer the single Concept Check question → click "Continue →"
3. ✅ Goes directly to done screen (no repeated question)
4. ✅ Done screen shows "Lecture complete · 1 questions"

**Step 6: Commit**

```bash
git add src/components/lecture/LectureFlow.tsx
git commit -m "fix: quiz counter now shows global question index and total across all stages"
```

---

## Task 5: Deploy to production

**Step 1: Run full test suite**

```bash
npx vitest run
```

Expected: all pass.

**Step 2: Deploy**

```bash
npx vercel --prod --yes
```

Expected: build passes, aliased to `https://study-app-two-jade.vercel.app`.

---

## What changes, summarized

| Location | Before | After |
|---|---|---|
| `split()` return | `finalQs.length > 0 ? finalQs : lecture.questions` | `finalQs` (always real slice) |
| `nextAfterMini()` | always goes to `final` stage | skips to `done` if `finalQs` is empty |
| Mini `onAnswer` | `() => setAnswered(true)` | `(_, score) => { recordScore; setAnswered(true) }` |
| Final `questionIndex` | `stage.qi` (0-based within finalQs) | `stage.qi + miniQuestionCount` (global) |
| Final `totalQuestions` | `finalQs.length` | `lecture.questions.length` |
| Done `total` | `finalQs.length` | `lecture.questions.length` |
