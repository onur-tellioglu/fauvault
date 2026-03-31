import sql from './db'
import type { Course } from './courses'

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

export async function getProgress(userId: number, course: Course): Promise<ProgressRow[]> {
  return sql`
    SELECT lecture_id, concept_index, mini_quiz_results, final_quiz_result, completed_at
    FROM progress WHERE user_id = ${userId} AND course = ${course}
  ` as unknown as Promise<ProgressRow[]>
}

export async function upsertProgress(
  userId: number,
  course: Course,
  lectureId: number,
  patch: Partial<Omit<ProgressRow, 'lecture_id'>>
): Promise<void> {
  await sql`
    INSERT INTO progress (user_id, course, lecture_id, concept_index, mini_quiz_results, final_quiz_result, completed_at)
    VALUES (
      ${userId}, ${course}, ${lectureId},
      ${patch.concept_index ?? 0},
      ${JSON.stringify(patch.mini_quiz_results ?? {})}::jsonb,
      ${patch.final_quiz_result ? JSON.stringify(patch.final_quiz_result) : null}::jsonb,
      ${patch.completed_at ?? null}
    )
    ON CONFLICT (user_id, course, lecture_id) DO UPDATE SET
      concept_index     = EXCLUDED.concept_index,
      mini_quiz_results = progress.mini_quiz_results || EXCLUDED.mini_quiz_results,
      final_quiz_result = COALESCE(EXCLUDED.final_quiz_result, progress.final_quiz_result),
      completed_at      = COALESCE(EXCLUDED.completed_at, progress.completed_at),
      updated_at        = NOW()
  `
}
