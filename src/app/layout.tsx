import type { Metadata } from 'next'
import { Geist, Geist_Mono, Fraunces } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', axes: ['opsz', 'SOFT', 'WONK'] })

export const metadata: Metadata = {
  title: {
    template: '%s · FAUVault',
    default: 'FAUVault',
  },
  description: 'FAU exam prep platform prepared by students — AI Perspectives, Renewable Energies & Data Engineering 1',
  openGraph: {
    title: 'FAUVault',
    description: 'FAU exam prep platform prepared by students — AI Perspectives, Renewable Energies & Data Engineering 1',
    url: 'https://fauvault.space',
    siteName: 'FAUVault',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAUVault',
    description: 'FAU exam prep platform prepared by students — AI Perspectives, Renewable Energies & Data Engineering 1',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${fraunces.variable}`}>
      <body>
        {children}
        <footer style={{ textAlign: 'center', padding: '2rem 1rem 1.5rem', marginTop: 'auto' }}>
          <a
            href="https://github.com/onur-tellioglu"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-geist-mono)', textDecoration: 'none', opacity: 0.6 }}
          >
            made by onur
          </a>
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
