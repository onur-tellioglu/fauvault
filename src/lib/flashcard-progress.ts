import sql from './db'
import type { Course } from './courses'

export type FlashcardProgressRow = {
  known: number[]
  card_index: number
}

export async function getFlashcardProgress(userId: number, course: Course): Promise<FlashcardProgressRow> {
  const rows = await sql`
    SELECT known, card_index FROM flashcard_progress
    WHERE user_id = ${userId} AND course = ${course}
  ` as unknown as FlashcardProgressRow[]
  return rows[0] ?? { known: [], card_index: 0 }
}

export async function upsertFlashcardProgress(
  userId: number,
  course: Course,
  known: number[],
  cardIndex: number
): Promise<void> {
  await sql`
    INSERT INTO flashcard_progress (user_id, course, known, card_index)
    VALUES (${userId}, ${course}, ${known}, ${cardIndex})
    ON CONFLICT (user_id, course) DO UPDATE SET
      known      = EXCLUDED.known,
      card_index = EXCLUDED.card_index,
      updated_at = NOW()
  `
}
