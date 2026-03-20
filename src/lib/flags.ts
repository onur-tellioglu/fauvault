import { useState, useEffect } from 'react'

const KEY = 'flagged_questions'

export function useFlaggedQuestions() {
  const [flagged, setFlagged] = useState<Set<string>>(new Set())

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY)
      if (stored) setFlagged(new Set(JSON.parse(stored)))
    } catch {}
  }, [])

  function toggle(questionId: string) {
    setFlagged(prev => {
      const next = new Set(prev)
      if (next.has(questionId)) {
        next.delete(questionId)
      } else {
        next.add(questionId)
      }
      localStorage.setItem(KEY, JSON.stringify([...next]))
      return next
    })
  }

  return { flagged, toggle }
}
