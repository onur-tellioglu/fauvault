import { withUserContext } from './db'

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
