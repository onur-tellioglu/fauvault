# RLS Progress Table Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Row Level Security to the `progress` table via SET LOCAL session variables inside Neon transactions, protecting against both forgotten userId filters and DATABASE_URL credential leaks.

**Architecture:** Two Postgres policies on `progress` — one per-user (checks `app.current_user_id`), one for leaderboard aggregate reads (checks `app.leaderboard_mode`). App code wraps queries in transactions that set these variables with `set_config(..., true)` (LOCAL scope). Migration is applied manually in Neon dashboard.

**Tech Stack:** Neon Postgres, `@neondatabase/serverless` (transaction API), TypeScript.

---

### Task 1: Write the migration file

**Files:**
- Create: `migrations/003_add_progress_rls.sql`

**Step 1: Create the file**

```sql
-- Migration: Add Row Level Security to progress table
-- Apply manually via Neon dashboard SQL Editor.
-- Safe to run on existing data — policies restrict access only, never modify rows.

ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress FORCE ROW LEVEL SECURITY;

-- Per-user policy: only own rows when user context is set
CREATE POLICY progress_user_isolation ON progress
  USING (user_id = current_setting('app.current_user_id', true)::int)
  WITH CHECK (user_id = current_setting('app.current_user_id', true)::int);

-- Leaderboard policy: aggregate reads when leaderboard flag is set (SELECT only)
CREATE POLICY progress_leaderboard_read ON progress
  FOR SELECT
  USING (current_setting('app.leaderboard_mode', true) = 'true');
```

**Step 2: Commit**

```bash
git add migrations/003_add_progress_rls.sql
git commit -m "feat: add RLS migration for progress table"
```

---

### Task 2: Add context helpers to db.ts

**Files:**
- Modify: `src/lib/db.ts`

**Step 1: Replace the entire file**

```ts
import { neon, type NeonQueryFunction } from '@neondatabase/serverless'

// DATABASE_URL is a runtime-only env var — not available during `next build`.
// The proxy defers neon() until the first actual query, avoiding build-time errors.
let _sql: ReturnType<typeof neon> | undefined

function getSql(): ReturnType<typeof neon> {
  if (!_sql) _sql = neon(process.env.DATABASE_URL!)
  return _sql
}

const sql = new Proxy((() => {}) as unknown as ReturnType<typeof neon>, {
  apply(_target, thisArg, args: unknown[]) {
    return (getSql() as unknown as (...a: unknown[]) => unknown).apply(thisArg, args)
  },
  get(_target, prop) {
    return (getSql() as unknown as Record<string | symbol, unknown>)[prop]
  },
})

export default sql

// Runs fn inside a transaction with app.current_user_id set (LOCAL scope).
// All queries inside fn must use the tx parameter, not the global sql.
export async function withUserContext<T>(
  userId: number,
  fn: (tx: NeonQueryFunction<false>) => Promise<T>
): Promise<T> {
  return getSql().transaction(async (tx) => {
    await tx`SELECT set_config('app.current_user_id', ${String(userId)}, true)`
    return fn(tx)
  }) as Promise<T>
}

// Runs fn inside a transaction with app.leaderboard_mode set (LOCAL scope).
// Use only for read-only aggregate queries (leaderboard).
export async function withLeaderboardContext<T>(
  fn: (tx: NeonQueryFunction<false>) => Promise<T>
): Promise<T> {
  return getSql().transaction(async (tx) => {
    await tx`SELECT set_config('app.leaderboard_mode', 'true', true)`
    return fn(tx)
  }) as Promise<T>
}
```

**Step 2: Verify TypeScript compiles**

```bash
cd /Users/onurtellioglu/Desktop/Exams/AIP/study-app
npx tsc --noEmit
```

Expected: no errors.

**Step 3: Commit**

```bash
git add src/lib/db.ts
git commit -m "feat: add withUserContext and withLeaderboardContext helpers to db.ts"
```

---

### Task 3: Update progress.ts to use withUserContext

**Files:**
- Modify: `src/lib/progress.ts`

**Step 1: Replace the entire file**

```ts
import sql, { withUserContext } from './db'

export type QuizResult = {
  answers: number[][]
  score: number
  submittedAt: string
}

export type ProgressRow = {
  lecture_id: number
  concept_index: number
  mini_quiz_results: Record<string, QuizResult>
  final_quiz_result: QuizResult | null
  completed_at: string | null
}

export async function getProgress(userId: number): Promise<ProgressRow[]> {
  return withUserContext(userId, (tx) => tx`
    SELECT lecture_id, concept_index, mini_quiz_results, final_quiz_result, completed_at
    FROM progress WHERE user_id = ${userId}
  ` as unknown as Promise<ProgressRow[]>)
}

export async function upsertProgress(
  userId: number,
  lectureId: number,
  patch: Partial<Omit<ProgressRow, 'lecture_id'>>
): Promise<void> {
  await withUserContext(userId, (tx) => tx`
    INSERT INTO progress (user_id, lecture_id, concept_index, mini_quiz_results, final_quiz_result, completed_at)
    VALUES (
      ${userId}, ${lectureId},
      ${patch.concept_index ?? 0},
      ${JSON.stringify(patch.mini_quiz_results ?? {})}::jsonb,
      ${patch.final_quiz_result ? JSON.stringify(patch.final_quiz_result) : null}::jsonb,
      ${patch.completed_at ?? null}
    )
    ON CONFLICT (user_id, lecture_id) DO UPDATE SET
      concept_index     = EXCLUDED.concept_index,
      mini_quiz_results = progress.mini_quiz_results || EXCLUDED.mini_quiz_results,
      final_quiz_result = COALESCE(EXCLUDED.final_quiz_result, progress.final_quiz_result),
      completed_at      = COALESCE(EXCLUDED.completed_at, progress.completed_at),
      updated_at        = NOW()
  `)
}
```

**Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

**Step 3: Commit**

```bash
git add src/lib/progress.ts
git commit -m "feat: wrap progress queries with withUserContext for RLS"
```

---

### Task 4: Update leaderboard.ts to use withLeaderboardContext

**Files:**
- Modify: `src/lib/leaderboard.ts`

**Step 1: Replace the entire file**

```ts
import { withLeaderboardContext } from './db'

export type LeaderboardRow = {
  username: string
  completed_count: number
  avg_score: number
  score: number
}

export async function getLeaderboard(): Promise<LeaderboardRow[]> {
  const rows = await withLeaderboardContext((tx) => tx`
    SELECT
      u.username,
      COUNT(p.completed_at)::int AS completed_count,
      AVG((p.final_quiz_result->>'score')::float)
        FILTER (WHERE p.final_quiz_result IS NOT NULL) AS avg_score
    FROM users u
    LEFT JOIN progress p ON p.user_id = u.id
    GROUP BY u.id, u.username
    HAVING COUNT(p.completed_at) > 0
    ORDER BY (
      COUNT(p.completed_at) * 100 +
      COALESCE(
        AVG((p.final_quiz_result->>'score')::float)
          FILTER (WHERE p.final_quiz_result IS NOT NULL),
        0
      ) * 100
    ) DESC
    LIMIT 50
  ` as unknown as Promise<{ username: string; completed_count: number; avg_score: number | null }[]>)

  return rows.map(r => {
    const completed = Number(r.completed_count)
    const avg = r.avg_score != null ? Number(r.avg_score) : 0
    return {
      username: r.username,
      completed_count: completed,
      avg_score: avg,
      score: completed * 100 + Math.round(avg * 100),
    }
  })
}
```

**Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

**Step 3: Commit**

```bash
git add src/lib/leaderboard.ts
git commit -m "feat: wrap leaderboard query with withLeaderboardContext for RLS"
```

---

### Task 5: Apply migration in Neon dashboard

**This step is manual — cannot be automated.**

**Step 1: Open Neon dashboard**

Go to your Neon project → SQL Editor.

**Step 2: Paste and run the migration**

Copy the contents of `migrations/003_add_progress_rls.sql` and run it.

Expected output: `ALTER TABLE`, `ALTER TABLE`, `CREATE POLICY`, `CREATE POLICY` — no errors.

**Step 3: Verify RLS is active**

Run in SQL Editor:
```sql
SELECT tablename, rowsecurity, forcerowsecurity
FROM pg_tables
WHERE tablename = 'progress';
```

Expected: `rowsecurity = true`, `forcerowsecurity = true`.

---

### Task 6: Deploy and smoke test

**Step 1: Build locally**

```bash
npm run build
```

Expected: no errors.

**Step 2: Deploy**

```bash
vercel --prod
```

**Step 3: Smoke test**

- Log in to the app
- Open dashboard — progress data loads correctly
- Open leaderboard — rankings appear correctly
- Save quiz progress — no errors in browser console
