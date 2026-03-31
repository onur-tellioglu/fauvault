CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  username      VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  token_version INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS progress (
  id                 SERIAL PRIMARY KEY,
  user_id            INTEGER REFERENCES users(id) ON DELETE CASCADE,
  course             VARCHAR(10) NOT NULL DEFAULT 'aip',
  lecture_id         INTEGER NOT NULL,
  concept_index      INTEGER NOT NULL DEFAULT 0,
  mini_quiz_results  JSONB NOT NULL DEFAULT '{}',
  final_quiz_result  JSONB,
  completed_at       TIMESTAMPTZ,
  updated_at         TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course, lecture_id)
);
