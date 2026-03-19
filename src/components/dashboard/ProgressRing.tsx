type Props = { value: number; size?: number }

export function ProgressRing({ value, size = 72 }: Props) {
  const r = size / 2 - 5
  const circ = 2 * Math.PI * r
  const dash = circ * value
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--progress-bg)" strokeWidth={3.5} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--accent)" strokeWidth={3.5}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 600ms cubic-bezier(0.4,0,0.2,1)' }} />
    </svg>
  )
}
