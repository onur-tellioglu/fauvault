// src/lib/constants.ts

/**
 * Accent color palette used across CoursePicker and CourseShell.
 * Single source of truth — do not redefine locally.
 */
export const ACCENT_COLORS = [
  '#E8B84B', '#E8934B', '#E8604A', '#E84B7A', '#C84BE8', '#7A4BE8',
  '#4B7AE8', '#4BC8E8', '#4BE8C8', '#4BE87A', '#A0E84B', '#E8D84B',
] as const

/**
 * Brand identity — single source of truth for share/metadata and branding UI.
 * Deliberately enumerates NO courses, so the share snippet never goes stale
 * when the catalog (src/lib/courses.ts) changes. Plain strings only, so this
 * module stays safe to import from the Edge-runtime opengraph-image route.
 */
export const SITE_NAME = 'FAUVault'
export const SITE_TAGLINE = 'FAU exam prep platform prepared by students'
