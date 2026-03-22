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
