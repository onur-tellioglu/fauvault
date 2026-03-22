import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { AuthForm } from '@/components/layout/AuthForm'
import { ExamCountdown } from '@/components/layout/ExamCountdown'

export default async function HomePage() {
  const session = await getSession()
  if (session) redirect('/dashboard')

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
      <ExamCountdown />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ animation: 'fadeSlideUp 300ms ease forwards' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ fontFamily: 'var(--font-fraunces)', fontSize: '6rem', fontWeight: 300, color: 'var(--border-subtle)', lineHeight: 1, marginBottom: '-1rem', userSelect: 'none' }}>
              AIP
            </div>
            <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.6rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 6 }}>
              AI Perspectives
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>FAU · 21 Lectures · Exam March 27</p>
          </div>
          <AuthForm />
        </div>
      </div>
    </main>
  )
}
