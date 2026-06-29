import Link from 'next/link'
import { EXAM_LOCATION } from '@/lib/exam-config'

export interface CurrentLectureInfo {
  id: number
  title: string
  speaker: string
  conceptCount: number
  questionCount: number
  conceptIndex: number
  readPct: number
}

export interface NewspaperDashboardProps {
  courseSlug: string
  examDate: string
  examLocation?: string
  submissionDate?: string
  currentLecture: CurrentLectureInfo | null
  completedCount: number
  totalLectures: number
  hasFlashcards: boolean
  daysUntilExam: number | null
}

// Format an exam/deadline date; omit the time when it is midnight (our "time TBA" sentinel).
function formatExamDate(iso: string): string {
  const d = new Date(iso)
  const hasTime = d.getHours() !== 0 || d.getMinutes() !== 0
  return d.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    ...(hasTime ? { hour: '2-digit', minute: '2-digit' } : {}),
  })
}

function getLectureProgress(pct: number): string {
  if (pct === 0) return '0%'
  return `${Math.round(pct * 100)}%`
}

function getEstimatedMinutes(conceptCount: number, conceptIndex: number): number {
  const remaining = Math.max(0, conceptCount - conceptIndex)
  return Math.max(1, remaining * 2)
}

export function NewspaperDashboard(props: NewspaperDashboardProps) {
  const {
    courseSlug, examDate, examLocation, submissionDate,
    currentLecture, completedCount, totalLectures,
    hasFlashcards, daysUntilExam,
  } = props

  const onTrackCount = completedCount
  const readPct = currentLecture?.readPct ?? 0
  const readPctLabel = getLectureProgress(readPct)
  const estMinutes = currentLecture
    ? getEstimatedMinutes(currentLecture.conceptCount, currentLecture.conceptIndex)
    : 0

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'var(--density-pad)' }}>
      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 'var(--density-gap)', alignItems: 'start' }}>

        {/* Left — hero */}
        <section>
          <div style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.65rem',
            color: 'var(--accent)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Front Page · Pick up where you left off
          </div>

          {currentLecture ? (
            <>
              <h2 style={{
                fontFamily: 'var(--font-fraunces)',
                fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
                fontWeight: 400,
                color: 'var(--text-primary)',
                lineHeight: 1.15,
                marginBottom: '1rem',
                letterSpacing: '-0.01em',
              }}>
                {currentLecture.title}
              </h2>

              <p style={{
                fontSize: '0.92rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '1.75rem',
                maxWidth: 580,
              }}>
                {readPct > 0 && readPct < 1 ? (
                  <>
                    You&apos;re{' '}
                    <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{readPctLabel}</span>
                    {' '}through lecture {currentLecture.id} with {currentLecture.speaker}.
                    About {estMinutes} minutes of focused reading until the end
                    {currentLecture.questionCount > 0
                      ? ` — then a ${currentLecture.questionCount}-question quiz to close it out.`
                      : '.'}
                  </>
                ) : readPct === 0 ? (
                  <>
                    Lecture {currentLecture.id} with {currentLecture.speaker} is waiting for you.
                    {currentLecture.conceptCount} concepts · {currentLecture.questionCount} questions ·{' '}
                    ~{currentLecture.conceptCount * 2} min read.
                  </>
                ) : (
                  <>
                    You&apos;ve completed lecture {currentLecture.id} with {currentLecture.speaker}.
                    {completedCount < totalLectures
                      ? ' Ready to tackle the next one?'
                      : ' All lectures done — you\'re fully prepared!'}
                  </>
                )}
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link href={`/${courseSlug}/lecture/${currentLecture.id}`} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  background: 'var(--accent)', color: '#0C0C10',
                  padding: '0.7rem 1.5rem', borderRadius: 8,
                  fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none',
                  transition: 'opacity 150ms ease',
                }}>
                  {readPct > 0 && readPct < 1 ? 'Continue reading' : readPct === 0 ? 'Start reading' : 'Review'} →
                </Link>
                <Link href={`/${courseSlug}/lectures`} style={{
                  display: 'inline-flex', alignItems: 'center',
                  background: 'transparent', color: 'var(--text-primary)',
                  padding: '0.7rem 1.5rem', borderRadius: 8,
                  border: '1px solid var(--border-strong)',
                  fontSize: '0.88rem', textDecoration: 'none',
                  transition: 'border-color 150ms ease',
                }}>
                  Skim headlines
                </Link>
              </div>

              {/* Lecture meta */}
              <div style={{
                display: 'flex', gap: '1.5rem', marginTop: '2.5rem',
                paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
              }}>
                {[
                  currentLecture.speaker,
                  `${currentLecture.conceptCount} concepts`,
                  `${currentLecture.questionCount} questions`,
                  `~${currentLecture.conceptCount * 2} min read`,
                ].map((item, i) => (
                  <span key={i} style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}>· {item}</span>
                ))}
              </div>
            </>
          ) : (
            <div style={{ padding: '3rem 0' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                All lectures completed. You&apos;re fully prepared!
              </p>
              <Link href={`/${courseSlug}/quiz`} style={{
                display: 'inline-block', marginTop: '1rem',
                background: 'var(--accent)', color: '#0C0C10',
                padding: '0.7rem 1.5rem', borderRadius: 8,
                fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none',
              }}>
                Practice Mode →
              </Link>
            </div>
          )}
        </section>

        {/* Right — sidebar */}
        <aside style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: 'var(--density-gap)' }}>

          {/* Countdown */}
          {daysUntilExam !== null && daysUntilExam > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}>Countdown</div>
              <div style={{
                fontFamily: 'var(--font-fraunces)',
                fontSize: 'clamp(4rem, 8vw, 5.5rem)',
                fontWeight: 300,
                color: daysUntilExam <= 7 ? 'var(--error)' : 'var(--accent)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}>
                {daysUntilExam}
              </div>
              <div style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                marginTop: '0.25rem',
              }}>
                days until the exam
              </div>
            </div>
          )}

          {/* Lecture progress */}
          <div style={{ marginBottom: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: '1.8rem',
              fontWeight: 300,
              color: 'var(--text-primary)',
            }}>
              <span style={{ color: 'var(--accent)' }}>{onTrackCount}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}> of {totalLectures}</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              lectures completed
            </div>

            {/* Progress bar */}
            <div style={{ height: 3, background: 'var(--progress-bg)', borderRadius: 2, marginTop: '0.75rem' }}>
              <div style={{
                height: '100%', borderRadius: 2,
                background: `linear-gradient(90deg, var(--accent-dim), var(--accent))`,
                width: `${totalLectures > 0 ? Math.round((onTrackCount / totalLectures) * 100) : 0}%`,
                transition: 'width 600ms cubic-bezier(0.4,0,0.2,1)',
              }} />
            </div>
          </div>

          {/* Exam info */}
          {examDate && (
            <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                lineHeight: 1.6,
              }}>
                {examLocation ?? EXAM_LOCATION}
                <br />
                {submissionDate ? `Exam · ${formatExamDate(examDate)}` : formatExamDate(examDate)}
                {submissionDate && (
                  <>
                    <br />
                    {`Submission · ${formatExamDate(submissionDate)}`}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Quick links */}
          <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '0.6rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}>Quick links</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {[
                { label: 'Practice Mode', href: `/${courseSlug}/quiz` },
                { label: 'Browse Lectures', href: `/${courseSlug}/lectures` },
                ...(hasFlashcards ? [{ label: 'Flashcards', href: `/${courseSlug}/flashcard` }] : []),
                { label: '← All Courses', href: '/' },
              ].map(({ label, href }) => (
                <Link key={href + label} href={href} style={{
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  padding: '0.35rem 0',
                  borderBottom: '1px solid var(--border-subtle)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  {label}
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
