'use client'
import { useAuthModal } from './AuthModalContext'
import { AuthForm } from './AuthForm'

const REASON_MESSAGES: Record<string, string> = {
  save_progress: 'Sign in to save your progress permanently.',
  post_forum: 'Sign in to post in the forum.',
}

export function AuthModal() {
  const { isOpen, options, closeModal, onLoginSuccess } = useAuthModal()
  if (!isOpen) return null

  const message = options.reason ? REASON_MESSAGES[options.reason] : null

  return (
    <>
      <div
        onClick={closeModal}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
          zIndex: 100, backdropFilter: 'blur(2px)',
        }}
      />
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 101,
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-default)',
        borderRadius: 16,
        padding: '2rem',
        width: 'min(90vw, 400px)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--text-primary)', margin: 0 }}>
              Welcome back
            </h2>
            {message && (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 4, marginBottom: 0 }}>
                {message}
              </p>
            )}
          </div>
          <button
            onClick={closeModal}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.25rem', lineHeight: 1, padding: '0 4px' }}
          >
            ×
          </button>
        </div>
        <AuthForm onSuccess={onLoginSuccess} />
      </div>
    </>
  )
}
