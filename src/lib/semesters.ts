export type Semester = {
  id: string
  label: string
  startDate: Date
  endDate: Date
}

export const SEMESTERS: Semester[] = [
  {
    id: '2025-winter',
    label: '2025 Winter',
    startDate: new Date('2025-10-13T00:00:00Z'),
    endDate: new Date('2026-04-12T23:59:59Z'),
  },
  {
    id: '2026-summer',
    label: '2026 Summer',
    startDate: new Date('2026-04-13T00:00:00Z'),
    endDate: new Date('2026-10-12T23:59:59Z'),
  },
]

export function getSemesterForDate(date: Date): Semester | null {
  return SEMESTERS.find(s => date >= s.startDate && date <= s.endDate) ?? null
}
