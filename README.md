# fauvault

An open-source study and exam-prep web app for university courses. Each course
bundles lecture summaries, interactive quizzes, flashcards, an exam-prep mode,
and a community leaderboard — so studying for finals is active, not passive.

Live: **[fauvault.space](https://fauvault.space)**

> Built originally for [FAU](https://www.fau.eu/) courses, but the platform is
> course-agnostic — anyone can add their own course (see
> [Contributing](#contributing)).

## Features

- **Lectures** — readable, Markdown-rendered concept summaries per lecture, with
  LaTeX math support (KaTeX) for inline `$…$` and block `$$…$$` formulas.
- **Quizzes** — single- and multiple-correct questions with explanations and
  LaTeX-rendered math.
- **Flashcards** — spaced front/back cards with progress tracking.
- **Exam-prep mode** — focused review built from the highest-yield material.
- **Leaderboard** — per-course ranking to keep a study group motivated.
- **Accounts** — username/password auth with secure sessions; guest access for
  read-only browsing of most pages.

## Tech stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, React 19, Turbopack)
- **Database:** [Neon](https://neon.tech/) serverless Postgres
- **Auth:** [`jose`](https://github.com/panva/jose) JWT sessions + [`bcryptjs`](https://github.com/dcodeIO/bcrypt.js)
- **Rate limiting:** [Upstash](https://upstash.com/) Redis
- **UI:** Tailwind CSS v4, [shadcn/ui](https://ui.shadcn.com/) + Radix, `lucide-react`
- **Testing:** [Vitest](https://vitest.dev/)
- **Hosting:** [Vercel](https://vercel.com/)

## Getting started

### Prerequisites

- Node.js 24+ (see [`.nvmrc`](.nvmrc) — `nvm use` to match)
- A [Neon](https://neon.tech/) Postgres database (free tier works)
- Optionally, an [Upstash](https://upstash.com/) Redis database for rate limiting

### Setup

```bash
# 1. Clone and install
git clone https://github.com/onur-tellioglu/fauvault.git
cd fauvault
npm install

# 2. Configure environment
cp .env.example .env.local
#   then edit .env.local with your DATABASE_URL, JWT_SECRET, and Upstash creds

# 3. Apply database migrations (run each file against your database, in order)
#    e.g. with psql:
psql "$DATABASE_URL" -f src/lib/schema.sql
for f in migrations/0*.sql; do psql "$DATABASE_URL" -f "$f"; done

# 4. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

See [`.env.example`](.env.example) for the full list. Required: `DATABASE_URL`,
`JWT_SECRET`. Recommended for production: `UPSTASH_REDIS_REST_URL`,
`UPSTASH_REDIS_REST_TOKEN`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npx vitest` | Run the test suite |

## Project structure

```
src/
  app/            Next.js App Router (routes, API handlers)
    [course]/     Per-course pages: lecture, study, quiz, flashcard, exam-prep, leaderboard
    api/          Route handlers: auth, progress, leaderboard, tips, ...
  components/     UI components (layout, quiz, shadcn)
  lib/
    courses.ts    Course registry — register new courses here
    content-*.ts  Per-course content (lectures, questions, flashcards)
    types.ts      Content/Lecture/Question/Flashcard types
    auth.ts       Session creation/verification
    db.ts         Neon client
    ratelimit.ts  Upstash rate limiter
migrations/       SQL migrations (apply in order)
```

## Contributing

Contributions are welcome — bug fixes, features, and **new courses**. Adding a
course is the most impactful way to help: see
[CONTRIBUTING.md](CONTRIBUTING.md) for the content schema and a step-by-step
guide.

**Please note:** course content must be your own original study material.
Never commit copyrighted source lecture slides or PDFs to this repository.

## License

- **Source code:** [AGPL-3.0](LICENSE) — copyleft; distributed or network-hosted
  forks must release their full source under the same license.
- **Course content** (`src/lib/content-*.ts`): [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

See [LICENSE](LICENSE) for details.
