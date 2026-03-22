-- Migration: Add Row Level Security to progress table
-- Apply manually via Neon dashboard SQL Editor.
-- Safe to run on existing data — policies restrict access only, never modify rows.

ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress FORCE ROW LEVEL SECURITY;

-- Per-user policy: only own rows when user context is set
CREATE POLICY progress_user_isolation ON progress
  USING (user_id = current_setting('app.current_user_id', true)::int)
  WITH CHECK (user_id = current_setting('app.current_user_id', true)::int);

-- Leaderboard policy: aggregate reads when leaderboard flag is set (SELECT only)
CREATE POLICY progress_leaderboard_read ON progress
  FOR SELECT
  USING (current_setting('app.leaderboard_mode', true) = 'true');
