-- Migration: Add token_version for JWT revocation support
-- Run in Neon SQL editor or via psql before deploying.
--
-- This column allows server-side session invalidation.
-- On logout (or forced sign-out), increment this value.
-- Middleware checks that the JWT claim matches the stored version.
-- Any token with a stale version is rejected immediately.

ALTER TABLE users ADD COLUMN IF NOT EXISTS token_version INTEGER NOT NULL DEFAULT 0;
