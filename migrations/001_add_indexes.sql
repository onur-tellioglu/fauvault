-- Migration: Add missing indexes for performance
-- Run in Neon SQL editor or via psql before deploying to production.
--
-- Step 1: Verify the primary key column order on the progress table.
-- If user_id is first, WHERE user_id = ? already uses the PK prefix — skip the index below.
-- If lecture_id is first (or unsure), create the explicit index.

SELECT a.attname
FROM pg_index i
JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
WHERE i.indrelid = 'progress'::regclass AND i.indisprimary
ORDER BY array_position(i.indkey, a.attnum);

-- Step 2: Add a standalone user_id index on progress (safe to run either way — IF NOT EXISTS).
-- This ensures getProgress(userId) always does an index scan, not a full table scan.
CREATE INDEX IF NOT EXISTS idx_progress_user_id ON progress(user_id);

-- Step 3: Add a unique index on users(username) for fast login lookups.
-- If a non-unique index already exists it must be dropped first:
--   DROP INDEX IF EXISTS idx_users_username;
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Step 4 (optional): Confirm index usage with EXPLAIN ANALYZE.
-- Run these in the Neon SQL editor and look for "Index Scan" (good) vs "Seq Scan" (bad).
--
-- EXPLAIN ANALYZE
--   SELECT lecture_id, concept_index, mini_quiz_results, final_quiz_result, completed_at
--   FROM progress WHERE user_id = 1;
--
-- EXPLAIN ANALYZE
--   SELECT id, username, password_hash FROM users WHERE username = 'testuser';
