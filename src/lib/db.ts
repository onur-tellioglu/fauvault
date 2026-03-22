import { neon, type NeonQueryFunctionInTransaction, type NeonQueryInTransaction } from '@neondatabase/serverless'

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
  fn: (tx: NeonQueryFunctionInTransaction<boolean, boolean>) => Promise<T>
): Promise<T> {
  const results = await getSql().transaction(
    (async (tx: NeonQueryFunctionInTransaction<boolean, boolean>) => {
      await tx`SELECT set_config('app.current_user_id', ${String(userId)}, true)`
      return fn(tx)
    }) as unknown as (tx: NeonQueryFunctionInTransaction<boolean, boolean>) => NeonQueryInTransaction[]
  )
  return results as T
}

// Runs fn inside a transaction with app.leaderboard_mode set (LOCAL scope).
// Use only for read-only aggregate queries (leaderboard).
export async function withLeaderboardContext<T>(
  fn: (tx: NeonQueryFunctionInTransaction<boolean, boolean>) => Promise<T>
): Promise<T> {
  const results = await getSql().transaction(
    (async (tx: NeonQueryFunctionInTransaction<boolean, boolean>) => {
      await tx`SELECT set_config('app.leaderboard_mode', 'true', true)`
      return fn(tx)
    }) as unknown as (tx: NeonQueryFunctionInTransaction<boolean, boolean>) => NeonQueryInTransaction[]
  )
  return results as T
}
