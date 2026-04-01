import { redirect, notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { isValidCourse, type Course } from '@/lib/courses'
import { getExamPrepExams } from '@/lib/exam-prep'
import { getBestScores } from '@/lib/exam-prep-db'
import Link from 'next/link'

export default async function ExamPrepListPage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params
  if (!isValidCourse(course)) notFound()

  const session = await getSession()
  if (!session) redirect('/')

  const exams = getExamPrepExams(course as Course)
  if (exams.length === 0) notFound()

  const bestScores = await getBestScores(session.userId, course as Course)
  const bestByExam = Object.fromEntries(bestScores.map(b => [b.exam_id, b]))

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', animation: 'fadeSlideUp 250ms ease forwards' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 2 }}>
              Exam Prep
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Past exam papers — calculate and submit answers
            </p>
          </div>
          <Link href={`/${course}/dashboard`} style={{
            fontSize: '0.82rem', color: 'var(--text-muted)', textDecoration: 'none',
            padding: '9px 18px', border: '1px solid var(--border-default)',
            borderRadius: 7, background: 'var(--bg-surface)',
          }}>
            ← Dashboard
          </Link>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {exams.map((exam, i) => {
            const best = bestByExam[exam.id]
            return (
              <Link
                key={exam.id}
                href={`/${course}/exam-prep/${exam.id}`}
                style={{
                  display: 'block', textDecoration: 'none',
                  border: '1px solid var(--border-default)', borderRadius: 10,
                  background: 'var(--bg-surface)', padding: '1.25rem 1.5rem',
                  animation: `fadeSlideUp 300ms ease ${i * 50}ms both`,
                  transition: 'border-color 150ms ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: 4 }}>
                      {exam.title}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-geist-mono)' }}>
                      {exam.tasks.length} tasks · {exam.tasks.length * 2} pts max
                    </p>
                  </div>
                  {best && (
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-geist-mono)' }}>
                        {best.score}/{best.max_score}
                      </p>
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>best score</p>
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </main>
  )
}
