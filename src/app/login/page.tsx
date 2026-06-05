// src/app/login/page.tsx
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { AuthForm } from '@/components/layout/AuthForm'
import { SITE_NAME, SITE_TAGLINE } from '@/lib/constants'

export const metadata: Metadata = { title: 'Sign In' }

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ callbackUrl?: string }> }) {
  const session = await getSession()
  // Already logged in — send to authenticated home
  if (session) redirect('/')

  const { callbackUrl } = await searchParams

  return (
    <main style={{
      minHeight: '100vh', background: 'var(--bg-base)',
      display: 'flex', flexDirection: 'column', alignItems: 'stretch',
    }}>
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '2rem',
      }}>
        <div style={{ animation: 'fadeSlideUp 300ms ease forwards' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h1 style={{
              fontFamily: 'var(--font-fraunces)', fontSize: '1.6rem',
              fontWeight: 400, color: 'var(--text-primary)', marginBottom: 6,
            }}>
              {SITE_NAME}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {SITE_TAGLINE}
            </p>
          </div>
          <AuthForm callbackUrl={callbackUrl} />
        </div>
      </div>
    </main>
  )
}
