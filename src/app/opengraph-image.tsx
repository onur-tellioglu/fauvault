import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'FAUVault'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f0f0f',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-2px',
            marginBottom: 24,
          }}
        >
          FAUVault
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#888888',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.5,
          }}
        >
          FAU exam prep platform prepared by students
        </div>
        <div
          style={{
            fontSize: 22,
            color: '#555555',
            marginTop: 16,
          }}
        >
          AI Perspectives · Renewable Energies · Data Engineering
        </div>
      </div>
    ),
    { ...size }
  )
}
