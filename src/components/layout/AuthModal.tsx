'use client'
import { useRef, useEffect } from 'react'
import { useAuthModal } from './AuthModalContext'
import { AuthForm } from './AuthForm'

const REASON_MESSAGES: Record<string, string> = {
  save_progress: 'Sign in to save your progress permanently.',
  post_forum: 'Sign in to post in the forum.',
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => !el.hasAttribute('disabled') && el.offsetParent !== null,
  )
}

export function AuthModal() {
  const { isOpen, options, closeModal, onLoginSuccess } = useAuthModal()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeModalRef = useRef(closeModal)
  closeModalRef.current = closeModal

  useEffect(() => {
    if (!isOpen) return

    const previouslyFocused = document.activeElement as HTMLElement | null

    // Move focus into the dialog on open
    const dialog = dialogRef.current
    if (dialog) {
      const focusable = getFocusableElements(dialog)
      if (focusable.length > 0) {
        focusable[0].focus()
      } else {
        dialog.focus()
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeModalRef.current()
        return
      }

      if (e.key === 'Tab' && dialog) {
        const focusable = getFocusableElements(dialog)
        if (focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus()
    }
  }, [isOpen])

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
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        tabIndex={-1}
        style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 101,
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-default)',
          borderRadius: 16,
          padding: '2rem',
          width: 'min(90vw, 400px)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h2 id="auth-modal-title" style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--text-primary)', margin: 0 }}>
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
            aria-label="Close dialog"
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
