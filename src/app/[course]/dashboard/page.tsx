import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { getProgress } from '@/lib/progress'
import { getLeaderboardByCourse } from '@/lib/leaderboard'
import { isValidCourse, getCourseContent, COURSES, type Course } from '@/lib/courses'
import { NewspaperDashboard } from '@/components/dashboard/NewspaperDashboard'

export async function generateMetadata({ params }: { params: Promise<{ course: string }> }): Promise<Metadata> {
  const { course } = await params
  const label = isValidCourse(course) ? COURSES[course as Course].label : 'Dashboard'
  return { title: label }
}

function getDaysUntilExam(examDate: string): number | null {
  if (!examDate) return null
  const diff = new Date(examDate).getTime() - Date.now()
  if (diff <= 0) return null
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}


export default async function DashboardPage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params
  if (!isValidCourse(course)) notFound()

  const session = await getSession()

  const content = getCourseContent(course as Course)
  const [progressRows, leaderboard] = await Promise.all([
    session ? getProgress(session.userId, course as Course) : Promise.resolve([]),
    getLeaderboardByCourse(course as Course),
  ])

  const byLecture = Object.fromEntries(progressRows.map(r => [r.lecture_id, r]))
  const completed = progressRows.filter(r => r.completed_at).length

  // Find the current lecture: first in-progress (not completed), or first not started
  const currentLectureRaw =
    content.lectures.find(l => byLecture[l.id] && !byLecture[l.id].completed_at) ??
    content.lectures.find(l => !byLecture[l.id]) ??
    content.lectures[content.lectures.length - 1]

  const currentProgress = currentLectureRaw ? byLecture[currentLectureRaw.id] : undefined

  const currentLecture = currentLectureRaw
    ? {
        id: currentLectureRaw.id,
        title: currentLectureRaw.title,
        speaker: currentLectureRaw.speaker,
        conceptCount: currentLectureRaw.concepts.length,
        questionCount: currentLectureRaw.questions.length,
        conceptIndex: currentProgress?.concept_index ?? 0,
        readPct: currentProgress
          ? currentProgress.completed_at
            ? 1
            : Math.min(
                (currentProgress.concept_index ?? 0) / Math.max(currentLectureRaw.concepts.length, 1),
                1,
              )
          : 0,
      }
    : null

  const topUsers = leaderboard
    .filter(u => u.username !== session?.username)
    .slice(0, 6)
    .map(u => ({ username: u.username, completedCount: u.completed_count }))

  const hasFlashcards = content.lectures.some(l => l.flashcards?.length)

  return (
    <NewspaperDashboard
      courseSlug={course}
      examDate={COURSES[course as Course].examDate}
      currentLecture={currentLecture}
      completedCount={completed}
      totalLectures={content.lectures.length}
      hasFlashcards={hasFlashcards}
      topUsers={topUsers}
      daysUntilExam={getDaysUntilExam(COURSES[course as Course].examDate)}
    />
  )
}
