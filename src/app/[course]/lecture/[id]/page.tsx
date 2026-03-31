import { notFound, redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { getProgress } from '@/lib/progress'
import { isValidCourse, getCourseContent, type Course } from '@/lib/courses'
import { LectureFlowWrapper } from './LectureFlowWrapper'

export default async function LecturePage({
  params,
}: {
  params: Promise<{ course: string; id: string }>
}) {
  const { course, id } = await params
  if (!isValidCourse(course)) notFound()

  const session = await getSession()
  if (!session) redirect('/')

  const content = getCourseContent(course as Course)
  const lecture = content.lectures.find(l => l.id === parseInt(id))
  if (!lecture) notFound()

  const currentIndex = content.lectures.findIndex(l => l.id === lecture.id)
  const nextLecture = content.lectures[currentIndex + 1] ?? null

  const rows = await getProgress(session.userId, course as Course)
  const progress = rows.find(r => r.lecture_id === lecture.id)

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <a href={`/${course}/dashboard`} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
              ← Dashboard
            </a>
            <span style={{ fontSize: '0.8rem', color: 'var(--border-strong)', margin: '0 6px' }}>·</span>
            <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              L{lecture.id}
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '2rem', fontWeight: 400, color: 'var(--text-primary)', marginTop: 10, marginBottom: 4 }}>
            {lecture.title}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            {lecture.speaker} · {lecture.concepts.length} concepts · {lecture.questions.length} questions
          </p>
        </div>
        <LectureFlowWrapper
          lecture={lecture}
          course={course as Course}
          initialConceptIndex={progress?.concept_index ?? 0}
          nextLectureId={nextLecture?.id ?? null}
        />
      </div>
    </main>
  )
}
