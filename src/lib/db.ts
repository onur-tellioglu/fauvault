import { neon } from '@neondatabase/serverless'

// DATABASE_URL is a runtime-only env var — not available during `next build`.
// The proxy defers neon() until the first actual query, avoiding build-time errors.
let _sql: ReturnType<typeof neon> | undefined

const sql = new Proxy((() => {}) as unknown as ReturnType<typeof neon>, {
  apply(_target, thisArg, args: unknown[]) {
    if (!_sql) _sql = neon(process.env.DATABASE_URL!)
    return (_sql as unknown as (...a: unknown[]) => unknown).apply(thisArg, args)
  },
  get(_target, prop) {
    if (!_sql) _sql = neon(process.env.DATABASE_URL!)
    return (_sql as unknown as Record<string | symbol, unknown>)[prop]
  },
})

export default sql
