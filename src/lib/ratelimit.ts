import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// 5 attempts per 1 minute sliding window, keyed by username or IP.
// UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN must be set in production.
// Without them, rate limiting is disabled and a warning is logged.

function makeAuthLimiter() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.warn('[ratelimit] Upstash env vars not set — rate limiting is DISABLED')
    return null
  }
  return new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, '1 m'),
    prefix: 'aip:auth',
  })
}

const limiter = makeAuthLimiter()

export async function checkAuthLimit(key: string): Promise<boolean> {
  if (!limiter) return true // allow when not configured
  const { success } = await limiter.limit(key)
  return success
}
