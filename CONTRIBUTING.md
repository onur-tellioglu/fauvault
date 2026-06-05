# Contributing to fauvault

Thanks for your interest! This project welcomes bug fixes, features, and —
most of all — **new courses and content**. This guide explains how to set up
the project and how to contribute.

## Code of conduct

Be kind and constructive. We're all here to help students study better.

## Content rules (read first)

The course content in this repo must be **your own original study material**:
summaries you wrote, questions you authored, flashcards you made.

- ✅ Do: write concise, original explanations of concepts.
- ✅ Do: author your own quiz questions and flashcards.
- ❌ Don't: upload or commit copyrighted lecture **slides, PDFs, or images**.
- ❌ Don't: copy-paste large verbatim passages from textbooks or slides.

Course content is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/);
by contributing content you agree to license it under those terms.

## Development setup

See [README — Getting started](README.md#getting-started) for full setup.
In short:

```bash
npm install
cp .env.example .env.local   # fill in DATABASE_URL and JWT_SECRET
npm run dev
```

Before opening a PR, make sure these pass:

```bash
npm run lint     # ESLint
npx tsc --noEmit # Type check
npx vitest run   # Tests
npm run build    # Production build compiles
```

## Adding a new course

A course is two things: a **content file** and a **registry entry**.

### 1. Create the content file

Create `src/lib/content-<slug>.ts`, where `<slug>` is a short lowercase id
(e.g. `cs101`). It must export a `content` object typed as `Content`.

```ts
// src/lib/content-cs101.ts
import type { Content } from './types'

export const content: Content = {
  lectures: [
    {
      id: 1,
      title: 'Introduction',
      speaker: 'Prof. Example',
      concepts: [
        {
          heading: 'What is an algorithm?',
          body: 'A finite sequence of well-defined steps... (Markdown supported)',
        },
      ],
      questions: [
        {
          id: 'L1Q1',
          text: 'Which of the following best describes an algorithm?',
          options: ['A random process', 'A finite sequence of steps', 'A database'],
          correct: [1],          // 0-indexed; array supports multiple-correct
          explanation: 'An algorithm is a finite, well-defined sequence of steps.',
          type: 'single',        // 'single' | 'multiple'
        },
      ],
      flashcards: [
        { front: 'Define: algorithm', back: 'A finite sequence of well-defined steps.' },
      ],
    },
  ],
}
```

### 2. Register the course

Edit [`src/lib/courses.ts`](src/lib/courses.ts):

1. Import your content: `import { content as cs101Content } from './content-cs101'`
2. Add the slug to the `Course` union type and `COURSE_SLUGS` array.
3. Add an entry to the `COURSES` record:

```ts
cs101: {
  label: 'Introduction to Computer Science',
  shortLabel: 'CS101',
  description: 'Your University · 12 Lectures',
  examDate: '2026-07-01T08:00:00', // ISO string, or '' if TBD
  content: cs101Content,
},
```

That's it — the new course appears in the UI automatically at `/<slug>`.

## Content schema reference

Defined in [`src/lib/types.ts`](src/lib/types.ts):

| Type | Fields |
| --- | --- |
| `Lecture` | `id` (number), `title`, `speaker`, `concepts[]`, `questions[]`, `flashcards?[]` |
| `Concept` | `heading`, `body` (Markdown) |
| `Question` | `id` (e.g. `"L1Q1"`), `text`, `options[]`, `correct[]` (0-indexed), `explanation`, `type` (`'single'`/`'multiple'`), `shuffle?` |
| `Flashcard` | `front`, `back` |

Notes:
- `correct` is an array of 0-indexed option positions. Use `type: 'multiple'`
  when more than one option is correct.
- Set `shuffle: false` on a question to keep options in their written order
  (e.g. "all of the above" answers).
- `body`, `text`, `explanation`, etc. all support Markdown (rendered via
  `react-markdown`), including tables and code blocks.

## Pull request process

1. Fork the repo and create a branch: `git checkout -b feat/add-cs101-course`.
2. Make atomic commits. Message format: `type: what and why`
   (`feat`, `fix`, `refactor`, `chore`). Write in English.
3. Run lint, typecheck, tests, and build (see above).
4. Open a PR describing what you changed. For a new course, list the course
   name and how many lectures/questions you added.
5. A maintainer will review. Thanks for contributing! 🎉

## Reporting bugs / requesting courses

Open an issue using the provided templates. For a course request, mention the
course and university so others know what's wanted.
