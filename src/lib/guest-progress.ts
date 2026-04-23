import type { Course } from './courses'
import type { QuizResult } from './progress'

export type GuestProgressRow = {
  lecture_id: number
  concept_index: number
  mini_quiz_results: Record<string, QuizResult>
  final_quiz_result: QuizResult | null
  completed_at: string | null
}

export type GuestFlashcardProgress = {
  card_index: number
  known: number[]
}

const PROGRESS_KEY = 'guest_progress'
const FLASHCARD_KEY = 'guest_flashcard_progress'

function readProgressStore(): Record<string, GuestProgressRow> {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeProgressStore(store: Record<string, GuestProgressRow>): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(store))
  } catch {}
}

export function getGuestProgress(course: Course): GuestProgressRow[] {
  const store = readProgressStore()
  return Object.entries(store)
    .filter(([key]) => key.startsWith(`${course}:`))
    .map(([, row]) => row)
}

export function upsertGuestProgress(
  course: Course,
  lectureId: number,
  patch: Partial<Omit<GuestProgressRow, 'lecture_id'>>
): void {
  const store = readProgressStore()
  const key = `${course}:${lectureId}`
  const existing = store[key] ?? {
    lecture_id: lectureId,
    concept_index: 0,
    mini_quiz_results: {},
    final_quiz_result: null,
    completed_at: null,
  }
  store[key] = {
    ...existing,
    ...patch,
    mini_quiz_results: {
      ...existing.mini_quiz_results,
      ...(patch.mini_quiz_results ?? {}),
    },
    final_quiz_result: patch.final_quiz_result ?? existing.final_quiz_result,
    completed_at: patch.completed_at ?? existing.completed_at,
  }
  writeProgressStore(store)
}

export function hasGuestProgress(): boolean {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    if (!raw) return false
    return Object.keys(JSON.parse(raw)).length > 0
  } catch {
    return false
  }
}

export function clearGuestProgress(): void {
  try {
    localStorage.removeItem(PROGRESS_KEY)
    localStorage.removeItem(FLASHCARD_KEY)
  } catch {}
}

export function getGuestFlashcardProgress(course: Course): GuestFlashcardProgress {
  try {
    const raw = localStorage.getItem(FLASHCARD_KEY)
    if (!raw) return { card_index: 0, known: [] }
    const store: Record<string, GuestFlashcardProgress> = JSON.parse(raw)
    return store[course] ?? { card_index: 0, known: [] }
  } catch {
    return { card_index: 0, known: [] }
  }
}

export function upsertGuestFlashcardProgress(
  course: Course,
  patch: Partial<GuestFlashcardProgress>
): void {
  try {
    const raw = localStorage.getItem(FLASHCARD_KEY)
    const store: Record<string, GuestFlashcardProgress> = raw ? JSON.parse(raw) : {}
    const existing = store[course] ?? { card_index: 0, known: [] }
    store[course] = { ...existing, ...patch }
    localStorage.setItem(FLASHCARD_KEY, JSON.stringify(store))
  } catch {}
}
