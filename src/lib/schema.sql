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

ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user';

CREATE TABLE IF NOT EXISTS tips (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course      VARCHAR(10) NOT NULL,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body        TEXT NOT NULL CHECK (char_length(body) <= 1000),
  verified    BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tip_comments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tip_id      UUID NOT NULL REFERENCES tips(id) ON DELETE CASCADE,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body        TEXT NOT NULL CHECK (char_length(body) <= 500),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tip_upvotes (
  tip_id      UUID NOT NULL REFERENCES tips(id) ON DELETE CASCADE,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (tip_id, user_id)
);
