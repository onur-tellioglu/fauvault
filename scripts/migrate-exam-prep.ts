import { neon } from '@neondatabase/serverless'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL!)

async function migrate() {
  await sql`
    CREATE TABLE IF NOT EXISTS mock_exam_attempts (
      id           SERIAL PRIMARY KEY,
      user_id      INT         NOT NULL REFERENCES users(id),
      course       TEXT        NOT NULL,
      exam_id      TEXT        NOT NULL,
      score        INT         NOT NULL,
      max_score    INT         NOT NULL,
      answers      JSONB       NOT NULL,
      submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`
    CREATE INDEX IF NOT EXISTS mock_exam_attempts_user_course_exam
      ON mock_exam_attempts(user_id, course, exam_id)
  `
  console.log('Migration complete.')
}

migrate().catch(err => { console.error(err); process.exit(1) })
