'use client'
import { useState } from 'react'
import type { Lecture } from '@/lib/types'
import { LectureFlow } from '@/components/lecture/LectureFlow'

type Props = { lecture: Lecture; initialConceptIndex: number; nextLectureId: number | null }

const MAX_RETRIES = 3

async function saveWithRetry(lectureId: number, patch: object): Promise<void> {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lectureId, patch }),
      })
      if (res.ok) return
      if (res.status === 401) return // Session expired — middleware will redirect
      throw new Error(`HTTP ${res.status}`)
    } catch (err) {
      if (attempt === MAX_RETRIES - 1) throw err
      await new Promise(r => setTimeout(r, 300 * 2 ** attempt)) // 300ms, 600ms, 1200ms
    }
  }
}

export function LectureFlowWrapper({ lecture, initialConceptIndex, nextLectureId }: Props) {
  const [saveError, setSaveError] = useState(false)

  async function save(patch: object) {
    try {
      await saveWithRetry(lecture.id, patch)
      if (saveError) setSaveError(false)
    } catch {
      setSaveError(true)
    }
  }

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
      <LectureFlow lecture={lecture} initialConceptIndex={initialConceptIndex} onProgress={save} nextLectureId={nextLectureId} />
    </>
  )
}
