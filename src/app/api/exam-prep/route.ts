import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { isValidCourse, type Course } from '@/lib/courses'
import { getExamPrepExam } from '@/lib/exam-prep'
import { saveAttempt, getBestScores, type AttemptAnswers } from '@/lib/exam-prep-db'

// POST — grade and save attempt
// Body: { course: string, examId: string, answers: Record<taskId, { mc: number|null, numeric: number|null }> }
export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { course, examId, answers } = body

  if (!isValidCourse(course))
    return NextResponse.json({ error: 'Invalid course' }, { status: 400 })

  const exam = getExamPrepExam(course as Course, examId)
  if (!exam)
    return NextResponse.json({ error: 'Exam not found' }, { status: 404 })

  if (!answers || typeof answers !== 'object')
    return NextResponse.json({ error: 'Invalid answers' }, { status: 400 })

  const graded: AttemptAnswers = {}
  let score = 0
  const maxScore = exam.tasks.length * 2

  for (const task of exam.tasks) {
    const submission = answers[task.id] ?? {}
    const mcChoice: number | null = submission.mc ?? null
    const numericValue: number | null =
      submission.numeric !== null && submission.numeric !== undefined && submission.numeric !== ''
        ? Number(submission.numeric)
        : null

    const mcCorrect = mcChoice === task.answer
    const numericCorrect =
      numericValue !== null &&
      Math.abs(numericValue - task.answer) / task.answer <= task.tolerance

    let points = 0
    if (numericCorrect) points = 2
    else if (mcCorrect) points = 1

    score += points
    graded[task.id] = {
      mc: mcChoice,
      numeric: numericValue,
      mc_correct: mcCorrect,
      numeric_correct: numericCorrect,
      points,
    }
  }

  await saveAttempt(session.userId, course as Course, examId, score, maxScore, graded)

  return NextResponse.json({ score, maxScore, graded, tasks: exam.tasks })
}

// GET — fetch best scores for current user
// Query: ?course=re
export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const course = req.nextUrl.searchParams.get('course')
  if (!course || !isValidCourse(course))
    return NextResponse.json({ error: 'Invalid course' }, { status: 400 })

  const bestScores = await getBestScores(session.userId, course as Course)
  return NextResponse.json({ bestScores })
}
