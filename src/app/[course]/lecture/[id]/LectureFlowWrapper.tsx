'use client'
import { useState, useCallback } from 'react'
import type { Lecture } from '@/lib/types'
import type { Course } from '@/lib/courses'
import { LectureFlow } from '@/components/lecture/LectureFlow'
import { upsertGuestProgress } from '@/lib/guest-progress'

type Props = {
  lecture: Lecture
  course: Course
  initialConceptIndex: number
  nextLectureId: number | null
  isAuthenticated: boolean
}

const MAX_RETRIES = 3

async function saveWithRetry(course: Course, lectureId: number, patch: object): Promise<void> {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course, lectureId, patch }),
      })
      if (res.ok) return
      if (res.status === 401) return
      throw new Error(`HTTP ${res.status}`)
    } catch (err) {
      if (attempt === MAX_RETRIES - 1) throw err
      await new Promise(r => setTimeout(r, 300 * 2 ** attempt))
    }
  }
}

export function LectureFlowWrapper({ lecture, course, initialConceptIndex, nextLectureId, isAuthenticated }: Props) {
  const [saveError, setSaveError] = useState(false)

  const resolvedInitialIndex = isAuthenticated
    ? initialConceptIndex
    : (() => {
        try {
          const raw = localStorage.getItem('guest_progress')
          if (!raw) return 0
          const store = JSON.parse(raw)
          return store[`${course}:${lecture.id}`]?.concept_index ?? 0
        } catch {
          return 0
        }
      })()

  const save = useCallback(async (patch: object) => {
    if (!isAuthenticated) {
      upsertGuestProgress(course, lecture.id, patch as Parameters<typeof upsertGuestProgress>[2])
      return
    }
    try {
      await saveWithRetry(course, lecture.id, patch)
      if (saveError) setSaveError(false)
    } catch {
      setSaveError(true)
    }
  }, [isAuthenticated, course, lecture.id, saveError])

  return (
    <>
      {saveError && (
        <div role="alert" style={{
          position: 'fixed', bottom: '1rem', left: '50%', transform: 'translateX(-50%)',
          background: '#7f1d1d', color: '#fef2f2', padding: '0.75rem 1.25rem',
          borderRadius: 8, fontSize: '0.875rem', zIndex: 50, maxWidth: '90vw', textAlign: 'center',
        }}>
          Progress could not be saved. Check your connection and try again.
        </div>
      )}
      <LectureFlow
        lecture={lecture}
        initialConceptIndex={resolvedInitialIndex}
        onProgress={save}
        nextLectureId={nextLectureId}
        course={course}
      />
    </>
  )
}
