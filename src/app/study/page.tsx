'use client'
import { useState } from 'react'
import { content } from '@/lib/content'
import { ConceptSection } from '@/components/lecture/ConceptSection'

export default function StudyPage() {
  const [lecture, setLecture] = useState(content.lectures[0])
  const [ci, setCi] = useState(0)

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '2rem' }}>

        {/* Sidebar */}
        <nav style={{ borderRight: '1px solid var(--border-subtle)', paddingRight: '1.5rem' }}>
          <a href="/dashboard" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textDecoration: 'none', display: 'block', marginBottom: '1rem' }}>
            ← Dashboard
          </a>
          <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Lectures
          </p>
          {content.lectures.map(l => (
            <button key={l.id} onClick={() => { setLecture(l); setCi(0) }} style={{
              display: 'block', width: '100%', textAlign: 'left', padding: '5px 8px', borderRadius: 5,
              background: lecture.id === l.id ? 'var(--bg-elevated)' : 'none',
              color: lecture.id === l.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              border: 'none', cursor: 'pointer', fontSize: '0.78rem', marginBottom: 1,
            }}>
              {l.id}. {l.title.slice(0, 22)}{l.title.length > 22 ? '…' : ''}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {lecture.concepts.map((_, i) => (
              <button key={i} onClick={() => setCi(i)} style={{
                padding: '3px 10px', borderRadius: 5, border: '1px solid',
                borderColor: i === ci ? 'var(--accent)' : 'var(--border-default)',
                background: i === ci ? 'var(--accent-subtle)' : 'transparent',
                color: i === ci ? 'var(--accent)' : 'var(--text-muted)',
                fontSize: '0.72rem', cursor: 'pointer',
              }}>{i + 1}</button>
            ))}
          </div>
          {lecture.concepts[ci]
            ? <ConceptSection heading={lecture.concepts[ci].heading} body={lecture.concepts[ci].body} index={ci} total={lecture.concepts.length} />
            : <p style={{ color: 'var(--text-muted)' }}>No concepts for this lecture.</p>
          }
        </div>

      </div>
    </main>
  )
}
