# Exam Prep Feature Design
**Date:** 2026-04-01
**Status:** Approved

## Goal
Add solvable past exam papers as "Exam Prep" to the RE course. Students work through real FAU calculation problems online. Results affect the leaderboard.

## Scope
- Tutorial 3 (WS 2024/25) — Solar PV on Greek island, 5 tasks
- Tutorial 4 (SS 2025) — Wind turbines in Patagonia, 6 tasks
- RE course only for now; architecture is extensible to AIP

## Approach: A+B
Each task has **both**:
- **4 multiple-choice options** (student calculates, picks the right answer)
- **Numerical input field** (student types their answer with unit hint)

Scoring per task:
| Result | Points |
|---|---|
| Numerical correct (±5% tolerance) | 2 pts |
| MC correct only | 1 pt |
| Both wrong | 0 pts |

No time limit. Retakes allowed — leaderboard uses best score.

## Data Model

### Content (`src/lib/exam-prep-re.ts`)
```typescript
type ExamPrepTask = {
  id: number
  text: string           // full question text
  unit: string           // 'kW', '€/kWh', '%', etc.
  answer: number         // correct numerical value
  tolerance: number      // e.g. 0.05 = ±5%
  choices: [number, number, number, number]  // 4 options, answer is one of them
  explanation: string    // shown after submission
}

type ExamPrepExam = {
  id: string             // 'tutorial-3', 'tutorial-4'
  title: string          // 'Tutorial 3 – Solar PV (WS 2024/25)'
  scenario: string       // full problem description, Markdown
  tasks: ExamPrepTask[]
}

export const examPrepExams: ExamPrepExam[] = [ /* Tutorial 3, Tutorial 4 */ ]
```

### Database (`mock_exam_attempts` table)
```sql
CREATE TABLE mock_exam_attempts (
  id           SERIAL PRIMARY KEY,
  user_id      INT  NOT NULL REFERENCES users(id),
  course       TEXT NOT NULL,
  exam_id      TEXT NOT NULL,
  score        INT  NOT NULL,   -- points earned
  max_score    INT  NOT NULL,   -- max possible (tasks × 2)
  answers      JSONB NOT NULL,  -- per-task breakdown
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX ON mock_exam_attempts(user_id, course, exam_id);
```

`answers` JSONB shape per task:
```json
{
  "1": { "mc": 2, "numeric": 143.5, "mc_correct": true, "numeric_correct": false, "points": 1 }
}
```

## Routes

| Route | Description |
|---|---|
| `/re/exam-prep` | Exam list — cards for each exam with best score if attempted |
| `/re/exam-prep/[id]` | Exam page — scenario + tasks, client-side interaction |
| `POST /api/exam-prep` | Save attempt, return per-task results |

Dashboard nav for `/re/dashboard` gets an **"Exam Prep"** button alongside Practice Mode, Study Mode, etc.

## UI Flow

1. `/re/exam-prep` — list page with two cards (Tutorial 3, Tutorial 4); shows best score badge if previously attempted
2. `/re/exam-prep/[id]` — exam page:
   - Scenario text at top (full Markdown, all visible)
   - Tasks listed sequentially
   - Each task: question text → 4 radio options → numeric input + unit
   - "Submit Exam" button at bottom
3. Results screen (same page, client state): per-task breakdown — earned pts, correct answer, student's numeric answer, explanation

## Leaderboard Scoring

New formula for per-course leaderboard:
```
total_score = lecture_score + exam_prep_bonus
lecture_score   = completed_count × 100 + avg_quiz_score × 100   (unchanged)
exam_prep_bonus = SUM over exams of ROUND(best_score / max_score × 500)
```

Tutorial 3 perfect = +500 pts. Tutorial 4 perfect = +500 pts.
Max exam prep contribution for RE = 1000 pts vs ~1000 from lectures — meaningful but balanced.

## Changes Required

1. **`src/lib/exam-prep-re.ts`** — new file with Tutorial 3 and Tutorial 4 content
2. **`src/lib/exam-prep.ts`** — shared types + `getExamPrepExams(course)` helper
3. **DB migration** — `CREATE TABLE mock_exam_attempts`
4. **`POST /api/exam-prep`** — save attempt, return graded results
5. **`GET /api/exam-prep?course=re&userId=X`** — fetch best scores per exam for list page
6. **`/re/exam-prep/page.tsx`** — exam list (server component)
7. **`/re/exam-prep/[id]/page.tsx`** — server shell (loads exam content)
8. **`/re/exam-prep/[id]/ExamClient.tsx`** — client component (interaction + submission)
9. **`src/lib/leaderboard.ts`** — update `getLeaderboardByCourse` and `getRankForUser` to include exam prep bonus
10. **`/re/dashboard/page.tsx`** — add "Exam Prep" nav button
11. **`src/middleware.ts`** — add `/re/exam-prep/:path*` to matcher
