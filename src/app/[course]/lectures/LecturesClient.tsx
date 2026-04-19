'use client'
import { useState } from 'react'
import type { Course } from '@/lib/courses'
import { LectureCard } from '@/components/dashboard/LectureCard'
import { StudyClient } from '@/app/[course]/study/StudyClient'

type LectureProgress = {
  lecture_id: number
  concept_index?: number | null
  completed_at?: string | null
  final_quiz_result?: unknown
}

type LectureMeta = {
  id: number
  title: string
  speaker: string
  concepts: unknown[]
  questions: unknown[]
  flashcards?: unknown[]
}

type Props = {
  course: Course
  lectures: LectureMeta[]
  byLecture: Record<number, LectureProgress>
  totalCount: number
}

export function LecturesClient({ course, lectures, byLecture, totalCount }: Props) {
  const [mode, setMode] = useState<'grid' | 'browse'>('grid')

  const toggleStyle = (active: boolean): React.CSSProperties => ({
    padding: '4px 12px',
    borderRadius: 6,
    border: '1px solid var(--border-default)',
    background: active ? 'var(--bg-elevated)' : 'transparent',
    color: active ? 'var(--text-primary)' : 'var(--text-muted)',
    fontSize: '0.75rem',
    fontFamily: 'var(--font-geist-mono)',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  })

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'var(--density-pad)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          All Lectures · {totalCount} total
        </div>
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          <button style={toggleStyle(mode === 'grid')} onClick={() => setMode('grid')}>Grid</button>
          <button style={toggleStyle(mode === 'browse')} onClick={() => setMode('browse')}>Browse</button>
        </div>
      </div>

      {mode === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--density-gap)' }}>
          {lectures.map(lecture => (
            <LectureCard
              key={lecture.id}
              lecture={lecture as Parameters<typeof LectureCard>[0]['lecture']}
              progress={byLecture[lecture.id] as Parameters<typeof LectureCard>[0]['progress']}
              course={course}
            />
          ))}
        </div>
      ) : (
        <StudyClient course={course} />
      )}
    </div>
  )
}
