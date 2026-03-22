# RLS for Progress Table — Design

**Date:** 2026-03-22
**Status:** Approved

## Goal

Add Row Level Security to the `progress` table as defense-in-depth: protects against both code mistakes (forgotten userId filter) and DATABASE_URL credential leaks.

## Scope

- `progress` table only. `users` table is out of scope (auth is app-layer protected).
- Existing data is untouched — RLS policies restrict access, not data.

## Migration

`migrations/003_add_progress_rls.sql`:

```sql
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress FORCE ROW LEVEL SECURITY;

-- Per-user policy: only own rows when user context is set
CREATE POLICY progress_user_isolation ON progress
  USING (user_id = current_setting('app.current_user_id', true)::int)
  WITH CHECK (user_id = current_setting('app.current_user_id', true)::int);

-- Leaderboard policy: aggregate reads when leaderboard flag is set
CREATE POLICY progress_leaderboard_read ON progress
  FOR SELECT
  USING (current_setting('app.leaderboard_mode', true) = 'true');
```

Applied manually via Neon dashboard SQL editor (not auto-run on deploy).

## Code Changes

### db.ts — two new helpers

```ts
export async function withUserContext<T>(
  userId: number,
  fn: (tx: NeonQueryFunction<false>) => Promise<T>
): Promise<T>

export async function withLeaderboardContext<T>(
  fn: (tx: NeonQueryFunction<false>) => Promise<T>
): Promise<T>
```

Each helper wraps the callback in a Neon transaction, sets the relevant session variable with `set_config(..., true)` (LOCAL scope), then runs the query.

### progress.ts

- `getProgress(userId)` → wrapped in `withUserContext(userId, tx => tx\`...\`)`
- `upsertProgress(userId, ...)` → wrapped in `withUserContext(userId, tx => tx\`...\`)`

### leaderboard.ts

- `getLeaderboard()` → wrapped in `withLeaderboardContext(tx => tx\`...\`)`

## Files Changed

| File | Action |
|------|--------|
| `migrations/003_add_progress_rls.sql` | Create |
| `src/lib/db.ts` | Add `withUserContext`, `withLeaderboardContext` |
| `src/lib/progress.ts` | Use `withUserContext` |
| `src/lib/leaderboard.ts` | Use `withLeaderboardContext` |

## How to Apply Migration

1. Open Neon dashboard → SQL Editor
2. Paste contents of `migrations/003_add_progress_rls.sql`
3. Run
4. Deploy updated app code
