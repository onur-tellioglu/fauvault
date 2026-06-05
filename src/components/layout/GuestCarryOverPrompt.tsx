'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthModal } from './AuthModalContext'
import { getGuestProgress, clearGuestProgress } from '@/lib/guest-progress'
import { COURSE_SLUGS, type Course } from '@/lib/courses'

export function GuestCarryOverPrompt() {
  const { showCarryOver, dismissCarryOver } = useAuthModal()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()

  if (!showCarryOver) return null

  async function handleYes() {
    setSaving(true)
    setError(false)
    try {
      const entries: Array<{ course: Course; lectureId: number; patch: object }> = []
      for (const course of COURSE_SLUGS) {
        for (const row of getGuestProgress(course)) {
          entries.push({
            course,
            lectureId: row.lecture_id,
            patch: {
              concept_index: row.concept_index,
              mini_quiz_results: row.mini_quiz_results,
              final_quiz_result: row.final_quiz_result,
              completed_at: row.completed_at,
            },
          })
        }
      }
      await Promise.all(
        entries.map(({ course, lectureId, patch }) =>
          fetch('/api/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ course, lectureId, patch }),
          })
        )
      )
      clearGuestProgress()
      dismissCarryOver()
      router.refresh()
    } catch {
      setError(true)
      setSaving(false)
    }
  }

  function handleNo() {
    clearGuestProgress()
    dismissCarryOver()
  }

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 110 }} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 111,
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-default)',
        borderRadius: 16,
        padding: '2rem',
        width: 'min(90vw, 380px)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
      }}>
        <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.4rem', fontWeight: 400, color: 'var(--text-primary)', marginTop: 0, marginBottom: '0.75rem' }}>
          Save guest progress?
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 0, marginBottom: '1.5rem' }}>
          You made progress as a guest. Save it to your account?
        </p>
        {error && (
          <p style={{ color: 'var(--error)', fontSize: '0.8rem', marginBottom: '1rem' }}>
            Something went wrong. Try again.
          </p>
        )}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={handleYes}
            disabled={saving}
            style={{
              flex: 1, padding: '10px', background: 'var(--accent)', color: '#0C0C10',
              border: 'none', borderRadius: 8, fontWeight: 600, cursor: saving ? 'wait' : 'pointer',
              fontFamily: 'var(--font-body)', fontSize: '0.9rem',
            }}
          >
            {saving ? 'Saving…' : 'Yes, save it'}
          </button>
          <button
            onClick={handleNo}
            style={{
              flex: 1, padding: '10px', background: 'transparent', color: 'var(--text-muted)',
              border: '1px solid var(--border-default)', borderRadius: 8, cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontSize: '0.9rem',
            }}
          >
            No thanks
          </button>
        </div>
      </div>
    </>
  )
}
