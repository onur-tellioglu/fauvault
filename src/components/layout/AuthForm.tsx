'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Mode = 'login' | 'register'

export function AuthForm({ onSuccess, callbackUrl }: { onSuccess?: () => void; callbackUrl?: string } = {}) {
  const [mode, setMode] = useState<Mode>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (mode === 'register' && !/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('Username may only contain letters, numbers, and underscores')
      setLoading(false)
      return
    }

    const res = await fetch(`/api/auth/${mode}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error); return }
    router.refresh()
    if (onSuccess) {
      onSuccess()
    } else {
      router.push(callbackUrl ?? '/')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', borderRadius: 8,
    background: 'var(--bg-elevated)', border: '1px solid var(--border-default)',
    color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6,
  }

  return (
    <div style={{ width: '100%', maxWidth: 340 }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="auth-username" style={labelStyle}>Username</label>
          <input id="auth-username" value={username} onChange={e => setUsername(e.target.value)} style={inputStyle} autoComplete="username" required />
        </div>
        <div>
          <label htmlFor="auth-password" style={labelStyle}>Password</label>
          <input id="auth-password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle}
            autoComplete={mode === 'register' ? 'new-password' : 'current-password'} required />
        </div>
        {error && <p style={{ color: 'var(--error)', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
        <button type="submit" disabled={loading} style={{
          padding: '11px', background: 'var(--accent)', color: '#0C0C10',
          border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '0.9rem',
          cursor: loading ? 'wait' : 'pointer', transition: 'background 120ms ease',
          fontFamily: 'var(--font-body)',
        }}>
          {loading ? '...' : mode === 'login' ? 'Sign In' : 'Create Account'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        {mode === 'login' ? "No account?" : 'Have an account?'}{' '}
        <button onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setError('') }}
          style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}>
          {mode === 'login' ? 'Register' : 'Sign in'}
        </button>
      </p>
    </div>
  )
}
