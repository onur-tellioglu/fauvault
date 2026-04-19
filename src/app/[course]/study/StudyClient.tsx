'use client'
import { useState } from 'react'
import { COURSES, type Course } from '@/lib/courses'
import { ConceptSection } from '@/components/lecture/ConceptSection'

export function StudyClient({ course }: { course: Course }) {
  const content = COURSES[course].content
  const [lecture, setLecture] = useState(content.lectures[0])
  const [ci, setCi] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.5rem' }}>
      {/* Mobile toggle button — hidden on desktop via CSS */}
      <button
        className="study-toggle-btn"
        onClick={() => setSidebarOpen(o => !o)}
        style={{
          display: 'none', /* overridden to flex on mobile via CSS */
          position: 'sticky',
          top: '0.75rem',
          zIndex: 10,
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-default)',
          borderRadius: 8,
          padding: '0.45rem 0.75rem',
          fontSize: '1rem',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          marginBottom: '1rem',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        ☰ <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-geist-mono)', color: 'var(--text-muted)' }}>Lectures</span>
      </button>

      {/* Backdrop — visible only on mobile when sidebar is open, via CSS */}
      {sidebarOpen && (
        <div
          className="study-backdrop"
          onClick={() => setSidebarOpen(false)}
          style={{
            display: 'none', /* overridden on mobile via CSS */
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 49,
          }}
        />
      )}

      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '2rem' }}>
        <nav
          className={`study-sidebar${sidebarOpen ? ' study-sidebar--open' : ''}`}
          style={{ borderRight: '1px solid var(--border-subtle)', paddingRight: '1.5rem' }}
        >
          <a href={`/${course}/dashboard`} style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textDecoration: 'none', display: 'block', marginBottom: '1rem' }}>
            ← Dashboard
          </a>
          <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Lectures
          </p>
          {content.lectures.map(l => (
            <button key={l.id} onClick={() => { setLecture(l); setCi(0); setSidebarOpen(false) }} style={{
              display: 'block', width: '100%', textAlign: 'left', padding: '5px 8px', borderRadius: 5,
              background: lecture.id === l.id ? 'var(--bg-elevated)' : 'none',
              color: lecture.id === l.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              border: 'none', cursor: 'pointer', fontSize: '0.78rem', marginBottom: 1,
            }}>
              {l.id}. {l.title.slice(0, 22)}{l.title.length > 22 ? '…' : ''}
            </button>
          ))}
        </nav>
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
