# Guest Access Design

**Date:** 2026-04-23  
**Status:** Approved

## Summary

Allow unauthenticated visitors to browse all course content (lectures, quizzes, flashcards, exam prep). Authentication is only required when saving progress. Guest progress is stored in localStorage and can be carried over to a user account after login.

---

## Route Access Matrix

| Route | Guest | Authenticated |
|---|---|---|
| `/[course]/lectures` | ✅ Open | ✅ |
| `/[course]/lecture/[id]` | ✅ Open | ✅ |
| `/[course]/quiz` | ✅ Open | ✅ |
| `/[course]/flashcard` | ✅ Open | ✅ |
| `/[course]/exam-prep` | ✅ Open | ✅ |
| `/[course]/exam-prep/[id]` | ✅ Open | ✅ |
| `/[course]/study` | ✅ Open | ✅ |
| `/[course]/forum` | 👁 Read-only | ✅ Read + Write |
| `/[course]/leaderboard` | ✅ Open | ✅ |
| `/[course]/dashboard` | 🔒 Auth required | ✅ |
| `/dashboard` | 🔒 Auth required | ✅ |
| `/profile` | 🔒 Auth required | ✅ |

---

## Architecture

### Middleware

Remove `/:course(aip|re|de1)/:path*` from the middleware matcher. Only `/dashboard/:path*` and `/profile/:path*` remain protected at the middleware level.

```ts
// src/middleware.ts — matcher after change
matcher: ['/dashboard/:path*', '/profile/:path*']
```

### Course Layout (`[course]/layout.tsx`)

Remove the hard `if (!session) redirect('/')`. Session becomes optional:

```ts
const session = await getSession() // null for guests
// Pass session | null to CourseShell
```

`CourseShell` uses session presence to conditionally render username vs. a "Sign In" button in the navbar.

### Individual Pages

Pages receive `session | null`. Content always renders. Write actions (progress saves) check session and trigger the auth modal if null. The one exception: `[course]/dashboard/page.tsx` keeps its hard redirect because its content is entirely personal.

---

## Guest Progress Storage

Guest progress is stored in `localStorage` under the key `"guest_progress"`.

```ts
type GuestProgressStore = {
  [key: `${string}:${number}`]: {  // key format: "course:lectureId"
    concept_index: number
    mini_quiz_results: Record<string, QuizResult>
    final_quiz_result: QuizResult | null
    completed_at: string | null
  }
}
```

A `upsertGuestProgress(course, lectureId, patch)` helper mirrors the signature of the existing `upsertProgress` DB function. Components call one or the other depending on session presence:

```ts
if (session) {
  await upsertProgress(session.userId, course, lectureId, patch)
} else {
  upsertGuestProgress(course, lectureId, patch)
}
```

Reading guest progress for initial state uses a parallel `getGuestProgress(course)` helper.

---

## Auth Modal System

A `AuthModalContext` wraps the course layout (or root layout). It exposes:

```ts
const { triggerAuthModal } = useAuthModal()
triggerAuthModal({ reason: 'save_progress' })
```

The `reason` field renders a contextual message at the top of the modal (e.g., "Sign in to save your progress."). The modal reuses the existing `AuthForm` component without modification.

On successful login/signup:
1. Modal closes.
2. User stays on the current page.
3. If `localStorage` contains guest progress, a carry-over prompt appears: "You made progress as a guest. Save it to your account?"
   - **Yes:** all guest records are written to the DB in bulk, localStorage is cleared.
   - **No / dismiss:** localStorage is cleared, guest data is discarded.

---

## Components

| New / Changed | Purpose |
|---|---|
| `src/lib/guest-progress.ts` | `upsertGuestProgress`, `getGuestProgress`, `clearGuestProgress` |
| `src/components/layout/AuthModalContext.tsx` | Context + `useAuthModal` hook |
| `src/components/layout/AuthModal.tsx` | Modal shell wrapping `AuthForm`, shows contextual reason message |
| `src/components/layout/GuestCarryOverPrompt.tsx` | Post-login prompt to carry over guest progress |
| `src/middleware.ts` | Remove course routes from matcher |
| `src/app/[course]/layout.tsx` | Make session optional, remove redirect |
| `src/app/[course]/lecture/[id]/page.tsx` | Remove redirect, pass session to `LectureFlowWrapper` |
| `src/components/lecture/LectureFlow.tsx` | Call `triggerAuthModal` instead of assuming session |
| Other pages (quiz, flashcard, exam-prep) | Same session-optional pattern |

---

## Error Handling

- `localStorage` unavailable (private browsing with strict settings): guest progress silently skips storage, carry-over prompt never appears. Content still fully accessible.
- Carry-over bulk write partial failure: wrap in a single transaction; on failure show an error toast, keep localStorage intact so user can retry.
