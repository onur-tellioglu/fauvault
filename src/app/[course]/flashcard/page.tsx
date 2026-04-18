import { notFound, redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { isValidCourse, getCourseContent, COURSES, type Course } from '@/lib/courses'
import { getFlashcardProgress } from '@/lib/flashcard-progress'
import { FlashcardClient } from './FlashcardClient'

export default async function FlashcardPage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params
  if (!isValidCourse(course)) notFound()

  const session = await getSession()
  if (!session) redirect('/')

  const content = getCourseContent(course as Course)
  const allCards = content.lectures.flatMap(l => l.flashcards ?? [])
  if (allCards.length === 0) notFound()

  const progress = await getFlashcardProgress(session.userId, course as Course)

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: 'var(--density-pad)' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '2rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 4 }}>
          Flashcards
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          {COURSES[course as Course].label} · {allCards.length} cards
        </p>
      </div>
      <FlashcardClient
        flashcards={allCards}
        course={course as Course}
        initialIndex={Math.min(progress.card_index, allCards.length - 1)}
        initialKnown={progress.known}
      />
    </div>
  )
}
