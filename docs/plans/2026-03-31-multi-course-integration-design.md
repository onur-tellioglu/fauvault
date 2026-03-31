# Multi-Course Integration Design

**Date:** 2026-03-31
**Status:** Approved

## Goal

Merge the Renewable Energies (RE) study-app into the AIP study-app so that both courses are accessible from a single site, with shared user accounts, a unified global leaderboard, and course-scoped routing.

## Decisions

| Question | Decision |
|----------|----------|
| User accounts | Shared — single `users` table in AIP's Neon DB |
| Base codebase | AIP study-app (`/Desktop/Exams/AIP/study-app`) |
| URL structure | `/[course]/dashboard`, `/[course]/lecture/[id]`, etc. |
| Leaderboard | Global — sum of scores across all courses per user |
| Content storage | Static `content.ts` files (no DB migration of content) |

---

## URL Structure

```
/                          → Landing page: login + course selection cards
/[course]/dashboard        → Course dashboard  (course = 'aip' | 're')
/[course]/lecture/[id]     → Lecture page
/[course]/quiz             → Practice quiz
/[course]/study            → Study mode
/leaderboard               → Global leaderboard (all courses aggregated)
/profile                   → Profile (shared, course-agnostic)
/api/auth/*                → Unchanged
/api/progress              → Accepts course param
/api/leaderboard           → Aggregates across all courses

# Backward-compat redirects
/dashboard                 → /aip/dashboard
```

---

## Architecture

### Course Registry

```ts
// src/lib/courses.ts
export type Course = 'aip' | 're'

export const COURSES: Record<Course, { label: string; content: Content }> = {
  aip: { label: 'AI Perspectives',    content: aipContent },
  re:  { label: 'Renewable Energies', content: reContent  },
}

export function getCourseContent(course: Course): Content {
  return COURSES[course].content
}
```

### Content Files

- `src/lib/content-aip.ts` — renamed from current `content.ts`
- `src/lib/content-re.ts` — copied from RE project's `content.ts`

---

## Database Changes

The `progress` table uses `lecture_id` as integer, and both courses have IDs starting at 1 — collision without a `course` discriminator.

```sql
-- migrations/add-course-to-progress.sql
ALTER TABLE progress ADD COLUMN course VARCHAR(10) NOT NULL DEFAULT 'aip';

ALTER TABLE progress DROP CONSTRAINT progress_user_id_lecture_id_key;
ALTER TABLE progress ADD CONSTRAINT progress_user_id_course_lecture_id_key
  UNIQUE(user_id, course, lecture_id);
```

All `progress.ts` functions gain a `course: Course` parameter. All queries filter/insert with `course`.

---

## File Changes

### Move (course-specific pages)

| From | To |
|------|----|
| `src/app/dashboard/` | `src/app/[course]/dashboard/` |
| `src/app/lecture/` | `src/app/[course]/lecture/` |
| `src/app/quiz/` | `src/app/[course]/quiz/` |
| `src/app/study/` | `src/app/[course]/study/` |

### Rewrite

| File | Change |
|------|--------|
| `src/app/page.tsx` | New landing page — login form + course selection |
| `src/app/leaderboard/page.tsx` | Global leaderboard aggregating all courses |
| `src/lib/progress.ts` | Add `course` param to all functions |
| `src/lib/leaderboard.ts` | Sum scores across courses per user |
| `src/lib/schema.sql` | Add `course` column, update unique constraint |

### Stay Unchanged

- `src/components/` — all shared components; receive `course` as prop where needed
- `src/app/profile/` — course-agnostic
- `src/app/api/auth/` — unchanged
- `src/lib/auth.ts`, `src/lib/db.ts`, `src/lib/scoring.ts`, `src/lib/shuffle.ts`

### Add

| File | Purpose |
|------|---------|
| `src/lib/courses.ts` | Course registry + type |
| `src/lib/content-aip.ts` | AIP content (renamed) |
| `src/lib/content-re.ts` | RE content (copied) |
| `src/app/dashboard/page.tsx` | Redirect → `/aip/dashboard` |
| `migrations/add-course-to-progress.sql` | DB migration |

---

## Leaderboard Aggregation

Global leaderboard sums each user's `final_quiz_result.score` across all completed lectures in all courses:

```sql
SELECT u.username,
       SUM((final_quiz_result->>'score')::int) AS total_score,
       COUNT(*) FILTER (WHERE completed_at IS NOT NULL) AS total_completed
FROM progress p
JOIN users u ON u.id = p.user_id
WHERE final_quiz_result IS NOT NULL
GROUP BY u.id, u.username
ORDER BY total_score DESC;
```

---

## Out of Scope

- RE user migration (RE has a separate user base; no account merging needed — users re-register on the unified site)
- Content DB migration (static files sufficient)
- Per-course leaderboard (global only, per decision)
