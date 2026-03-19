import type { Content, Lecture, Question, Concept } from '../lib/types'

export function parseStudyGuide(markdown: string): Content {
  const lectures: Lecture[] = []

  // Split on ## LECTURE N headings (uppercase, as in actual file)
  const parts = markdown.split(/(?=^## LECTURE \d+)/m)

  for (const part of parts) {
    // Match: ## LECTURE 1 — Introduction (Castellini, 15.10.2025)
    const headerMatch = part.match(/^## LECTURE (\d+) — ([^\n(]+?)(?:\s*\(([^)]+)\))?\s*\n/)
    if (!headerMatch) continue

    const id = parseInt(headerMatch[1])
    const title = headerMatch[2].trim()
    const speakerInfo = headerMatch[3]?.trim() ?? ''
    // Extract speaker name (before the date comma): "Castellini" from "Castellini, 15.10.2025"
    const speaker = speakerInfo.split(',')[0].trim()

    const concepts = parseConcepts(part)
    const questions = parseQuestions(part, id)

    lectures.push({ id, title, speaker, concepts, questions })
  }

  return { lectures }
}

function parseConcepts(block: string): Concept[] {
  // Extract ### Key Concepts/Facts to Memorize section (before ### Practice Questions or ---)
  const sectionMatch = block.match(/^(### Key [^\n]+)\n([\s\S]+?)(?=\n---\n|\n### Practice Questions|$)/m)
  if (!sectionMatch) return []

  const heading = sectionMatch[1].replace(/^### /, '').trim()
  const body = sectionMatch[2].trim()

  return [{ heading, body }]
}

function parseQuestions(block: string, lectureId: number): Question[] {
  const questions: Question[] = []

  // Find ### Practice Questions section
  const practiceMatch = block.match(/^### Practice Questions\n([\s\S]+)$/m)
  if (!practiceMatch) return questions

  const section = practiceMatch[1]

  // Match each question block: **Q1.** or **Q1. (multiple correct)**
  const qRegex = /\*\*Q(\d+)\.\s*(\(multiple correct\))?\s*\*\*\s*([\s\S]+?)(?=\n\*\*Q\d+\.|\n---|\n## |$)/g
  let match

  while ((match = qRegex.exec(section)) !== null) {
    const qNum = match[1]
    const multipleFlag = !!match[2]
    const body = match[3].trim()
    const lines = body.split('\n').map(l => l.trim()).filter(Boolean)

    if (!lines.length) continue

    // First line is the question text
    const text = lines[0]

    // Parse options: - A) text  or  A) text
    const options: string[] = []
    for (const line of lines) {
      const m = line.match(/^-?\s*([A-F])\)\s+(.+)/)
      if (m) options.push(m[2].trim())
    }

    // Find answer line: **Answer: C** ... or **Correct answers: A, B, C** ...
    const answerLine = lines.find(l => /^\*\*(?:Answer|Correct answers):/i.test(l)) ?? ''
    let correct: number[] = []
    let explanation = ''

    if (answerLine) {
      // Extract letters inside the **...** bold part only
      const boldMatch = answerLine.match(/\*\*(?:Answer|Correct answers):\s*([^*]+)\*\*/)
      if (boldMatch) {
        const lettersStr = boldMatch[1]
        const letters = [...lettersStr.matchAll(/[A-F]/g)].map(m => m[0])
        correct = letters.map(l => l.charCodeAt(0) - 65)
      }
      // Explanation is after the em-dash
      const dashIdx = answerLine.indexOf('—')
      if (dashIdx >= 0) {
        explanation = answerLine.slice(dashIdx + 1).trim()
      }
    }

    const isMultiple = multipleFlag || correct.length > 1

    if (text && options.length >= 2 && correct.length > 0) {
      questions.push({
        id: `L${lectureId}Q${qNum}`,
        text,
        options,
        correct,
        explanation,
        type: isMultiple ? 'multiple' : 'single',
      })
    }
  }

  return questions
}
