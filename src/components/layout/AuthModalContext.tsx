'use client'
import { createContext, useContext, useState, useCallback } from 'react'
import { hasGuestProgress } from '@/lib/guest-progress'

type AuthModalOptions = { reason?: string }

type AuthModalContextValue = {
  isOpen: boolean
  options: AuthModalOptions
  triggerAuthModal: (opts?: AuthModalOptions) => void
  closeModal: () => void
  showCarryOver: boolean
  onLoginSuccess: () => void
  dismissCarryOver: () => void
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null)

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<AuthModalOptions>({})
  const [showCarryOver, setShowCarryOver] = useState(false)

  const triggerAuthModal = useCallback((opts: AuthModalOptions = {}) => {
    setOptions(opts)
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => setIsOpen(false), [])

  const onLoginSuccess = useCallback(() => {
    setIsOpen(false)
    try {
      if (hasGuestProgress()) setShowCarryOver(true)
    } catch {}
  }, [])

  const dismissCarryOver = useCallback(() => setShowCarryOver(false), [])

  return (
    <AuthModalContext.Provider value={{ isOpen, options, triggerAuthModal, closeModal, showCarryOver, onLoginSuccess, dismissCarryOver }}>
      {children}
    </AuthModalContext.Provider>
  )
}

export function useAuthModal(): AuthModalContextValue {
  const ctx = useContext(AuthModalContext)
  if (!ctx) throw new Error('useAuthModal must be used within AuthModalProvider')
  return ctx
}
