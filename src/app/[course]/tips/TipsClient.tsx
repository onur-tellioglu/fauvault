'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { Course } from '@/lib/courses'
import type { Tip, TipComment } from '@/lib/tips'

type Props = {
  course: Course
  initialTips: Tip[]
  username: string
  isAdmin: boolean
  courseLabel: string
}

export function TipsClient({ course, initialTips, username, isAdmin, courseLabel }: Props) {
  const [tips, setTips] = useState(initialTips)
  const [newBody, setNewBody] = useState('')
  const [posting, setPosting] = useState(false)
  const [expandedTip, setExpandedTip] = useState<string | null>(null)
  const [comments, setComments] = useState<Record<string, TipComment[]>>({})
  const [commentBody, setCommentBody] = useState<Record<string, string>>({})

  async function submitTip() {
    if (!newBody.trim()) return
    setPosting(true)
    await fetch('/api/tips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ course, body: newBody.trim() }),
    })
    setPosting(false)
    window.location.reload()
  }

  async function toggleUpvote(tipId: string) {
    await fetch(`/api/tips/${tipId}/upvote`, { method: 'POST' })
    setTips(prev => prev.map(t =>
      t.id === tipId
        ? { ...t, upvote_count: t.upvoted_by_me ? t.upvote_count - 1 : t.upvote_count + 1, upvoted_by_me: !t.upvoted_by_me }
        : t
    ))
  }

  async function deleteTip(tipId: string) {
    await fetch(`/api/tips/${tipId}`, { method: 'DELETE' })
    setTips(prev => prev.filter(t => t.id !== tipId))
  }

  async function toggleVerify(tipId: string) {
    await fetch(`/api/tips/${tipId}/verify`, { method: 'PATCH' })
    setTips(prev => prev.map(t => t.id === tipId ? { ...t, verified: !t.verified } : t))
  }

  async function expandComments(tipId: string) {
    if (expandedTip === tipId) { setExpandedTip(null); return }
    setExpandedTip(tipId)
    if (!comments[tipId]) {
      const res = await fetch(`/api/tips/${tipId}/comments`)
      const data = await res.json()
      setComments(prev => ({ ...prev, [tipId]: data }))
    }
  }

  async function submitComment(tipId: string) {
    const body = commentBody[tipId]?.trim()
    if (!body) return
    await fetch(`/api/tips/${tipId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body }),
    })
    setCommentBody(prev => ({ ...prev, [tipId]: '' }))
    const res = await fetch(`/api/tips/${tipId}/comments`)
    const data = await res.json()
    setComments(prev => ({ ...prev, [tipId]: data }))
    setTips(prev => prev.map(t => t.id === tipId ? { ...t, comment_count: t.comment_count + 1 } : t))
  }

  async function deleteComment(tipId: string, commentId: string) {
    await fetch(`/api/tips/${tipId}/comments/${commentId}`, { method: 'DELETE' })
    setComments(prev => ({ ...prev, [tipId]: (prev[tipId] ?? []).filter(c => c.id !== commentId) }))
    setTips(prev => prev.map(t => t.id === tipId ? { ...t, comment_count: t.comment_count - 1 } : t))
  }

  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
    borderRadius: 10, padding: '1rem', marginBottom: '0.75rem',
  }
  const mutedText: React.CSSProperties = { color: 'var(--text-muted)', fontSize: '0.78rem', fontFamily: 'var(--font-geist-mono)' }
  const btnBase: React.CSSProperties = {
    background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem',
    color: 'var(--text-muted)', padding: '4px 8px', borderRadius: 5,
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>

        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', animation: 'fadeSlideUp 250ms ease forwards' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 2 }}>
              Tips
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              {tips.length} tip{tips.length !== 1 ? 's' : ''} · {courseLabel}
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

        <div style={{ ...cardStyle, marginBottom: '1.5rem' }}>
          <textarea
            value={newBody}
            onChange={e => setNewBody(e.target.value)}
            placeholder="Share something useful — exam format, prof tip, exercise class insight…"
            maxLength={1000}
            rows={3}
            style={{
              width: '100%', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)',
              borderRadius: 7, padding: '10px 12px', color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)', fontSize: '0.9rem', resize: 'vertical', outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
            <span style={mutedText}>{newBody.length}/1000</span>
            <button
              onClick={submitTip}
              disabled={posting || !newBody.trim()}
              style={{
                padding: '8px 18px', background: 'var(--accent)', color: '#0C0C10',
                border: 'none', borderRadius: 7, fontWeight: 600, fontSize: '0.85rem',
                cursor: posting || !newBody.trim() ? 'not-allowed' : 'pointer',
                opacity: posting || !newBody.trim() ? 0.5 : 1,
              }}
            >
              {posting ? '…' : 'Post'}
            </button>
          </div>
        </div>

        {tips.length === 0 && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', marginTop: '4rem' }}>
            No tips yet. Be the first to share something!
          </p>
        )}

        {tips.map((tip, i) => (
          <div key={tip.id} style={{ ...cardStyle, animation: `fadeSlideUp 300ms ease ${i * 25}ms both` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
              <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', margin: 0, flex: 1, lineHeight: 1.5 }}>
                {tip.body}
              </p>
              {tip.verified && (
                <span style={{ fontSize: '0.7rem', color: 'var(--accent)', fontFamily: 'var(--font-geist-mono)', whiteSpace: 'nowrap', padding: '2px 8px', border: '1px solid var(--accent)', borderRadius: 4 }}>
                  ✓ Verified
                </span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
              <span style={mutedText}>{tip.username} · {new Date(tip.created_at).toLocaleDateString()}</span>
              <span style={{ ...mutedText, marginLeft: 'auto' }} />

              <button onClick={() => toggleUpvote(tip.id)} style={{ ...btnBase, color: tip.upvoted_by_me ? 'var(--accent)' : 'var(--text-muted)' }}>
                ↑ {tip.upvote_count}
              </button>

              <button onClick={() => expandComments(tip.id)} style={btnBase}>
                💬 {tip.comment_count}
              </button>

              {isAdmin && (
                <>
                  <button onClick={() => toggleVerify(tip.id)} style={btnBase}>
                    {tip.verified ? 'Unverify' : 'Verify'}
                  </button>
                  <button onClick={() => deleteTip(tip.id)} style={{ ...btnBase, color: 'var(--error, #f87171)' }}>
                    Delete
                  </button>
                </>
              )}

              {!isAdmin && tip.username === username && (
                <button onClick={() => deleteTip(tip.id)} style={{ ...btnBase, color: 'var(--error, #f87171)' }}>
                  Delete
                </button>
              )}
            </div>

            {expandedTip === tip.id && (
              <div style={{ marginTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                {(comments[tip.id] ?? []).map(c => (
                  <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <span style={{ ...mutedText, marginRight: 6 }}>{c.username}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{c.body}</span>
                    </div>
                    {(isAdmin || c.username === username) && (
                      <button onClick={() => deleteComment(tip.id, c.id)} style={{ ...btnBase, fontSize: '0.7rem', color: 'var(--error, #f87171)' }}>×</button>
                    )}
                  </div>
                ))}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <input
                    value={commentBody[tip.id] ?? ''}
                    onChange={e => setCommentBody(prev => ({ ...prev, [tip.id]: e.target.value }))}
                    placeholder="Add a comment…"
                    maxLength={500}
                    style={{
                      flex: 1, background: 'var(--bg-elevated)', border: '1px solid var(--border-default)',
                      borderRadius: 6, padding: '7px 10px', color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)', fontSize: '0.85rem', outline: 'none',
                    }}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitComment(tip.id) } }}
                  />
                  <button
                    onClick={() => submitComment(tip.id)}
                    disabled={!(commentBody[tip.id]?.trim())}
                    style={{
                      padding: '7px 14px', background: 'var(--accent)', color: '#0C0C10',
                      border: 'none', borderRadius: 6, fontWeight: 600, fontSize: '0.82rem',
                      cursor: commentBody[tip.id]?.trim() ? 'pointer' : 'not-allowed',
                      opacity: commentBody[tip.id]?.trim() ? 1 : 0.5,
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
