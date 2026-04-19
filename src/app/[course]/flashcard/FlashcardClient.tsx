'use client'
import { useState, useCallback } from 'react'
import type { Flashcard } from '@/lib/types'
import type { Course } from '@/lib/courses'

type Props = {
  flashcards: Flashcard[]
  course: Course
  initialIndex: number
  initialKnown: number[]
}

export function FlashcardClient({ flashcards, course, initialIndex, initialKnown }: Props) {
  const total = flashcards.length
  const [index, setIndex] = useState(initialIndex)
  const [known, setKnown] = useState<Set<number>>(new Set(initialKnown))
  const [flipped, setFlipped] = useState(false)

  const card = flashcards[index]
  const isKnown = known.has(index)

  const save = useCallback((nextKnown: Set<number>, nextIndex: number) => {
    fetch('/api/flashcard-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ course, known: [...nextKnown], cardIndex: nextIndex }),
    })
  }, [course])

  function goTo(nextIndex: number) {
    setFlipped(false)
    setIndex(nextIndex)
    save(known, nextIndex)
  }

  function toggleKnown() {
    const next = new Set(known)
    if (next.has(index)) next.delete(index)
    else next.add(index)
    setKnown(next)
    save(next, index)
  }

  const btnBase: React.CSSProperties = {
    padding: '10px 20px', borderRadius: 8, fontWeight: 600, cursor: 'pointer',
    fontSize: '0.875rem', border: 'none', minHeight: 44,
  }

  return (
    <div>
      {/* Progress bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          {index + 1} / {total}
        </span>
        <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.7rem', color: 'var(--success)' }}>
          {known.size} / {total} known
        </span>
      </div>
      <div style={{ height: 3, background: 'var(--border-subtle)', borderRadius: 2, marginBottom: '1.75rem' }}>
        <div style={{ height: '100%', background: 'var(--success)', borderRadius: 2, width: `${(known.size / total) * 100}%`, transition: 'width 300ms ease' }} />
      </div>

      {/* Card */}
      <div
        onClick={() => setFlipped(f => !f)}
        style={{
          minHeight: 220, background: 'var(--bg-surface)', border: '1px solid',
          borderColor: isKnown ? 'var(--success)' : flipped ? 'var(--accent)' : 'var(--border-default)',
          borderRadius: 14, padding: '2rem', cursor: 'pointer',
          transition: 'border-color 150ms ease', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', userSelect: 'none',
        }}
      >
        {!flipped ? (
          <div style={{ animation: 'fadeSlideUp 200ms ease forwards' }}>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Question — tap to flip
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: 1.6, fontWeight: 500 }}>
              {card.front}
            </p>
          </div>
        ) : (
          <div style={{ animation: 'fadeSlideUp 200ms ease forwards' }}>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.65rem', color: 'var(--accent)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Answer — tap to flip back
            </p>
            <p style={{ fontSize: '0.975rem', color: 'var(--text-secondary)', lineHeight: 1.75, whiteSpace: 'pre-line' }}>
              {card.back}
            </p>
          </div>
        )}
      </div>

      {/* Navigation + Got it */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', gap: '0.5rem' }}>
        <button
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          style={{ ...btnBase, background: 'none', border: '1px solid var(--border-default)', color: index === 0 ? 'var(--text-muted)' : 'var(--text-secondary)', opacity: index === 0 ? 0.4 : 1 }}
        >
          ← Prev
        </button>

        <button
          onClick={toggleKnown}
          style={{
            ...btnBase,
            background: isKnown ? 'var(--success)' : 'none',
            border: `1px solid ${isKnown ? 'var(--success)' : 'var(--border-default)'}`,
            color: isKnown ? '#fff' : 'var(--text-secondary)',
          }}
        >
          {isKnown ? 'Known ✓' : 'Mark known'}
        </button>

        <button
          onClick={() => goTo(index + 1)}
          disabled={index === total - 1}
          style={{ ...btnBase, background: 'none', border: '1px solid var(--border-default)', color: index === total - 1 ? 'var(--text-muted)' : 'var(--text-secondary)', opacity: index === total - 1 ? 0.4 : 1 }}
        >
          Next →
        </button>
      </div>
    </div>
  )
}
