import { notFound, redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { getProgress } from '@/lib/progress'
import { content } from '@/lib/content'
import { LectureFlowWrapper } from './LectureFlowWrapper'

export default async function LecturePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getSession()
  if (!session) redirect('/')

  const lecture = content.lectures.find(l => l.id === parseInt(id))
  if (!lecture) notFound()

  const rows = await getProgress(session.userId)
  const progress = rows.find(r => r.lecture_id === lecture.id)

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <a href="/dashboard" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
            ← Dashboard
          </a>
          <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '2rem', fontWeight: 400, color: 'var(--text-primary)', marginTop: 10, marginBottom: 4 }}>
            {lecture.title}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            {lecture.speaker} · {lecture.concepts.length} concepts · {lecture.questions.length} questions
          </p>
        </div>
        <LectureFlowWrapper lecture={lecture} initialConceptIndex={progress?.concept_index ?? 0} />
      </div>
    </main>
  )
}
