import type { LeaderboardRow } from '@/lib/leaderboard'

interface LeaderboardTableProps {
  rows: LeaderboardRow[]
  currentUsername: string
  totalLectures: number
  tableClassName?: string
}

export default function LeaderboardTable({
  rows,
  currentUsername,
  totalLectures,
  tableClassName,
}: LeaderboardTableProps) {
  return (
    <div style={{ border: '1px solid var(--border-default)', borderRadius: 10, overflow: 'hidden', background: 'var(--bg-surface)' }}>
      <table className={tableClassName} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
            {['#', 'User', 'Completed', 'Semester', 'Score'].map(h => (
              <th key={h} scope="col" style={{
                padding: '0.75rem 1rem',
                textAlign: h === '#' || h === 'Score' || h === 'Completed' ? 'center' : 'left',
                fontSize: '0.75rem', fontFamily: 'var(--font-geist-mono)',
                color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const isMe = row.username === currentUsername
            return (
              <tr
                key={row.username}
                style={{
                  borderBottom: i < rows.length - 1 ? '1px solid var(--border-subtle)' : undefined,
                  background: isMe ? 'var(--bg-highlight, rgba(255,255,255,0.04))' : undefined,
                  animation: `fadeSlideUp 300ms ease ${i * 25}ms both`,
                }}
              >
                <td style={{ padding: '0.75rem 1rem', textAlign: 'center', fontFamily: 'var(--font-geist-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {i === 0 ? <span role="img" aria-label="Gold medal — 1st place">🥇</span>
                    : i === 1 ? <span role="img" aria-label="Silver medal — 2nd place">🥈</span>
                    : i === 2 ? <span role="img" aria-label="Bronze medal — 3rd place">🥉</span>
                    : i + 1}
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: isMe ? 600 : 400 }}>
                  {row.username}{isMe ? ' (you)' : ''}
                </td>
                <td style={{ padding: '0.75rem 1rem', textAlign: 'center', fontFamily: 'var(--font-geist-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {row.completed_count}/{totalLectures}
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-geist-mono)', whiteSpace: 'nowrap' }}>
                  {row.first_semester ?? '—'}
                </td>
                <td style={{ padding: '0.75rem 1rem', textAlign: 'center', fontFamily: 'var(--font-geist-mono)', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                  {row.score}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
