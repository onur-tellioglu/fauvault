-- Add course column to progress table to support multiple courses
ALTER TABLE progress ADD COLUMN IF NOT EXISTS course VARCHAR(10) NOT NULL DEFAULT 'aip';

-- Drop old unique constraint and create new one that includes course
ALTER TABLE progress DROP CONSTRAINT IF EXISTS progress_user_id_lecture_id_key;
ALTER TABLE progress ADD CONSTRAINT IF NOT EXISTS progress_user_id_course_lecture_id_key
  UNIQUE(user_id, course, lecture_id);
