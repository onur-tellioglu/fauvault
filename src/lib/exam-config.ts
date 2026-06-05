// src/lib/exam-config.ts

/**
 * Exam metadata — single source of truth for date, time, and location.
 * Import from here instead of repeating literals across components.
 */

/** Canonical ISO datetime string for the exam start. */
export const EXAM_ISO = '2026-03-27T08:00:00+01:00'

/** Unix epoch in ms — used by countdown/post-exam client components. */
export const EXAM_TIME = new Date(EXAM_ISO).getTime()

/** Room and building — used wherever a short location string is needed. */
export const EXAM_LOCATION = 'H7 · Technical Faculty'

/**
 * Short date/time suffix for the countdown label.
 * Stored as a literal to avoid toLocaleDateString timezone/locale variance.
 */
const EXAM_SHORT_DATE = '27 Mar 08:00'

/** Full label rendered by ExamCountdown — byte-identical to the original hardcoded string. */
export const EXAM_COUNTDOWN_LABEL = `${EXAM_LOCATION} · ${EXAM_SHORT_DATE}`
