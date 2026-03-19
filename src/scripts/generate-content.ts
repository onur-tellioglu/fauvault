import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { parseStudyGuide } from './parse-content'

const guide = readFileSync(join(__dirname, '../../../STUDY_GUIDE.md'), 'utf-8')
const content = parseStudyGuide(guide)

const output = `// AUTO-GENERATED — run: npm run generate-content
import type { Content } from './types'
export const content: Content = ${JSON.stringify(content, null, 2)} as const
`

writeFileSync(join(__dirname, '../lib/content.ts'), output, 'utf-8')
console.log(`Parsed ${content.lectures.length} lectures:`)
content.lectures.forEach(l =>
  console.log(`  L${l.id}: ${l.concepts.length} concepts, ${l.questions.length} questions`)
)
