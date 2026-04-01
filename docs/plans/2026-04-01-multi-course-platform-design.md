# Multi-Course Study Platform Design
**Date:** 2026-04-01
**Status:** Approved

## Goal
Consolidate AIP and RE study apps into a single platform. Users log in once, choose a course, and study. New courses can be added by dropping in a content file.

## Architecture

AIP app (`/Desktop/Exams/AIP/study-app`) is the sole platform. RE standalone app is deprecated.

### Routes
| Route | Description |
|-------|-------------|
| `/` | Login (unauthenticated) or redirect to `/dashboard` |
| `/dashboard` | Course selector — all courses as cards |
| `/[course]/dashboard` | Course study hub (existing) |
| `/[course]/lecture/[id]` | Lecture viewer (existing) |
| `/[course]/quiz` | Practice mode (existing) |
| `/[course]/study` | Study mode (existing) |
| `/[course]/leaderboard` | Per-course leaderboard (new) |
| `/leaderboard` | Global leaderboard — keep as-is |
| `/profile` | User profile (existing) |

### Course Selector Card (`/dashboard`)
Each course card shows:
- Course name
- `ProgressRing` with completed/total lectures
- Leaderboard rank for that course (e.g. "#3 in RE")
- Clicking navigates to `/[course]/dashboard`

### Adding a New Course
1. Add entry to `src/lib/courses.ts` (label, shortLabel, examDate, description)
2. Create `src/lib/content-xxx.ts` with lecture/question data
3. Done — routing, progress, leaderboard all work automatically

## Changes Required

1. **`/dashboard/page.tsx`** — replace redirect with course selector UI (server component, parallel fetch progress + rank per course)
2. **`src/lib/courses.ts`** — add `examDate` and `description` fields to each course
3. **`/[course]/leaderboard/page.tsx`** — new route, course-filtered leaderboard
4. **`src/lib/leaderboard.ts`** — add `getLeaderboardByCourse(course)` and `getRankForUser(userId, course)` functions
5. **`/[course]/dashboard/page.tsx`** — add "← All Courses" back link
6. **`/` (home page)** — redirect logged-in users to `/dashboard` instead of `/aip/dashboard`

## Data
No schema changes needed. `progress` table already has `course` column with `UNIQUE(user_id, course, lecture_id)`.
