import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: '#0A0A0A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            border: '1.5px solid #E8C547',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#E8C547',
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  )
}
