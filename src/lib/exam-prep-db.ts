// src/lib/exam-prep-db.ts
import sql from './db'
import type { Course } from './courses'

export type AttemptAnswers = Record<string, {
  mc: number | null
  numeric: number | null
  mc_correct: boolean
  numeric_correct: boolean
  points: number
}>

export type ExamAttempt = {
  id: number
  exam_id: string
  score: number
  max_score: number
  answers: AttemptAnswers
  submitted_at: string
}

export type BestScore = {
  exam_id: string
  score: number
  max_score: number
}

export async function saveAttempt(
  userId: number,
  course: Course,
  examId: string,
  score: number,
  maxScore: number,
  answers: AttemptAnswers,
): Promise<void> {
  await sql`
    INSERT INTO mock_exam_attempts (user_id, course, exam_id, score, max_score, answers)
    VALUES (${userId}, ${course}, ${examId}, ${score}, ${maxScore}, ${JSON.stringify(answers)}::jsonb)
  `
}

export async function getBestScores(userId: number, course: Course): Promise<BestScore[]> {
  return sql`
    SELECT DISTINCT ON (exam_id) exam_id, score, max_score
    FROM mock_exam_attempts
    WHERE user_id = ${userId} AND course = ${course}
    ORDER BY exam_id, score DESC
  ` as unknown as Promise<BestScore[]>
}

export async function getExamPrepBonus(userId: number, course: Course): Promise<number> {
  const rows = await sql`
    SELECT exam_id, MAX(score::float / max_score) AS ratio
    FROM mock_exam_attempts
    WHERE user_id = ${userId} AND course = ${course}
    GROUP BY exam_id
  ` as Array<{ exam_id: string; ratio: number }>

  return rows.reduce((sum, r) => sum + Math.round(Number(r.ratio) * 500), 0)
}

export async function getExamPrepBonusForAll(course: Course): Promise<Record<number, number>> {
  const rows = await sql`
    SELECT user_id, exam_id, MAX(score::float / max_score) AS ratio
    FROM mock_exam_attempts
    WHERE course = ${course}
    GROUP BY user_id, exam_id
  ` as Array<{ user_id: number; exam_id: string; ratio: number }>

  const bonuses: Record<number, number> = {}
  for (const r of rows) {
    bonuses[r.user_id] = (bonuses[r.user_id] ?? 0) + Math.round(Number(r.ratio) * 500)
  }
  return bonuses
}
