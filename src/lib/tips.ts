import sql from './db'
import type { Course } from './courses'

export type Tip = {
  id: string
  course: string
  user_id: number
  username: string
  body: string
  verified: boolean
  upvote_count: number
  upvoted_by_me: boolean
  comment_count: number
  created_at: string
}

export type TipComment = {
  id: string
  tip_id: string
  user_id: number
  username: string
  body: string
  created_at: string
}

export async function getTips(course: Course, userId: number | null): Promise<Tip[]> {
  if (userId === null) {
    const rows = await sql`
      SELECT
        t.id::text,
        t.course,
        t.user_id,
        u.username,
        t.body,
        t.verified,
        t.created_at,
        COUNT(DISTINCT tu.user_id)::int AS upvote_count,
        COUNT(DISTINCT tc.id)::int AS comment_count,
        false AS upvoted_by_me
      FROM tips t
      JOIN users u ON u.id = t.user_id
      LEFT JOIN tip_upvotes tu ON tu.tip_id = t.id
      LEFT JOIN tip_comments tc ON tc.tip_id = t.id
      WHERE t.course = ${course}
      GROUP BY t.id, u.username
      ORDER BY t.verified DESC, t.created_at DESC
    `
    return rows as Tip[]
  }
  const rows = await sql`
    SELECT
      t.id::text,
      t.course,
      t.user_id,
      u.username,
      t.body,
      t.verified,
      t.created_at,
      COUNT(DISTINCT tu.user_id)::int AS upvote_count,
      COUNT(DISTINCT tc.id)::int AS comment_count,
      BOOL_OR(tu.user_id = ${userId}) AS upvoted_by_me
    FROM tips t
    JOIN users u ON u.id = t.user_id
    LEFT JOIN tip_upvotes tu ON tu.tip_id = t.id
    LEFT JOIN tip_comments tc ON tc.tip_id = t.id
    WHERE t.course = ${course}
    GROUP BY t.id, u.username
    ORDER BY t.verified DESC, t.created_at DESC
  `
  return rows as Tip[]
}

export async function createTip(course: Course, userId: number, body: string): Promise<void> {
  await sql`
    INSERT INTO tips (course, user_id, body)
    VALUES (${course}, ${userId}, ${body})
  `
}

export async function deleteTip(tipId: string, userId: number, isAdmin: boolean): Promise<void> {
  if (isAdmin) {
    await sql`DELETE FROM tips WHERE id = ${tipId}::uuid`
  } else {
    await sql`DELETE FROM tips WHERE id = ${tipId}::uuid AND user_id = ${userId}`
  }
}

export async function toggleVerified(tipId: string): Promise<void> {
  await sql`UPDATE tips SET verified = NOT verified WHERE id = ${tipId}::uuid`
}

export async function getTipComments(tipId: string): Promise<TipComment[]> {
  const rows = await sql`
    SELECT tc.id::text, tc.tip_id::text, tc.user_id, u.username, tc.body, tc.created_at
    FROM tip_comments tc
    JOIN users u ON u.id = tc.user_id
    WHERE tc.tip_id = ${tipId}::uuid
    ORDER BY tc.created_at ASC
  `
  return rows as TipComment[]
}

export async function createComment(tipId: string, userId: number, body: string): Promise<void> {
  await sql`
    INSERT INTO tip_comments (tip_id, user_id, body)
    VALUES (${tipId}::uuid, ${userId}, ${body})
  `
}

export async function deleteComment(commentId: string, userId: number, isAdmin: boolean): Promise<void> {
  if (isAdmin) {
    await sql`DELETE FROM tip_comments WHERE id = ${commentId}::uuid`
  } else {
    await sql`DELETE FROM tip_comments WHERE id = ${commentId}::uuid AND user_id = ${userId}`
  }
}

export async function toggleUpvote(tipId: string, userId: number): Promise<void> {
  const existing = await sql`
    SELECT 1 FROM tip_upvotes WHERE tip_id = ${tipId}::uuid AND user_id = ${userId}
  ` as unknown[]
  if (existing.length > 0) {
    await sql`DELETE FROM tip_upvotes WHERE tip_id = ${tipId}::uuid AND user_id = ${userId}`
  } else {
    await sql`INSERT INTO tip_upvotes (tip_id, user_id) VALUES (${tipId}::uuid, ${userId})`
  }
}

export async function getUserRole(userId: number): Promise<'user' | 'admin'> {
  const rows = await sql`SELECT role FROM users WHERE id = ${userId}` as { role: string }[]
  return (rows[0]?.role ?? 'user') as 'user' | 'admin'
}
