// src/lib/lecture-videos.ts
//
// Reference URLs to publicly-hosted lecture recordings on fau.tv.
// This module stores ONLY external reference URLs — no video files are
// hosted, embedded, or downloaded by this app. These links are gated behind
// authentication at the page level (see app/[course]/lectures/page.tsx): guest
// users never receive these URLs in their HTML/props.
//
// Shape per course:
//   seriesUrl  — optional link to the whole recording series on fau.tv.
//   byLecture  — map of lecture `id` (from the course content) to a fau.tv
//                clip/recording URL. Populated only when an individual
//                recording can be reliably matched to a lecture id.

import type { Course } from './courses'

export type CourseVideos = {
  seriesUrl?: string
  byLecture: Record<number, string>
}

const LECTURE_VIDEOS: Record<Course, CourseVideos> = {
  aip: { byLecture: {} },
  re: { byLecture: {} },
  de1: { byLecture: {} },
  ap: { byLecture: {} },
  bio: { byLecture: {} },
  ads: {
    // The fau.tv series bundles 11 recordings (S23) whose titles/ordering do
    // not map 1:1 onto the 7 current course lectures, so we surface the series
    // link rather than fabricate per-lecture matches.
    seriesUrl: 'https://www.fau.tv/series/applied-data-science-in-medicine-amp-psychology-s25',
    byLecture: {},
  },
}

export function getLectureVideos(course: Course): CourseVideos {
  return LECTURE_VIDEOS[course]
}
