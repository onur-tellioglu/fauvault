'use client'
import type { Lecture } from '@/lib/types'
import { LectureFlow } from '@/components/lecture/LectureFlow'

type Props = { lecture: Lecture; initialConceptIndex: number }

export function LectureFlowWrapper({ lecture, initialConceptIndex }: Props) {
  async function save(patch: object) {
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lectureId: lecture.id, patch }),
    })
  }
  return <LectureFlow lecture={lecture} initialConceptIndex={initialConceptIndex} onProgress={save} />
}
