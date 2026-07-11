/**
 * Topic structure data - client-safe (no fs dependency).
 * This mirrors the _meta.json content for use in client components.
 */

export interface TopicEntry {
  slug: string
  title: string
  order: number
}

export interface ChapterTopics {
  [chapterSlug: string]: TopicEntry[]
}

const GRADE_TOPICS: Record<string, ChapterTopics> = {
  'grade-7': {
    'rational-numbers': [
      { slug: 'overview', title: '知识概述', order: 1 },
      { slug: 'operations', title: '有理数运算', order: 2 },
      { slug: 'common-mistakes', title: '易错提醒', order: 3 },
    ],
    'algebraic-expressions': [
      { slug: 'overview', title: '知识概述', order: 1 },
      { slug: 'common-mistakes', title: '易错提醒', order: 2 },
    ],
    'linear-equations': [
      { slug: 'overview', title: '知识概述', order: 1 },
      { slug: 'common-mistakes', title: '易错提醒', order: 2 },
    ],
    'geometry-intro': [
      { slug: 'overview', title: '知识概述', order: 1 },
      { slug: 'common-mistakes', title: '易错提醒', order: 2 },
    ],
    'intersecting-lines': [
      { slug: 'overview', title: '知识概述', order: 1 },
      { slug: 'common-mistakes', title: '易错提醒', order: 2 },
    ],
    'real-numbers': [
      { slug: 'overview', title: '知识概述', order: 1 },
      { slug: 'common-mistakes', title: '易错提醒', order: 2 },
    ],
    'coordinate-plane': [
      { slug: 'overview', title: '知识概述', order: 1 },
      { slug: 'common-mistakes', title: '易错提醒', order: 2 },
    ],
    'linear-systems': [
      { slug: 'overview', title: '知识概述', order: 1 },
      { slug: 'common-mistakes', title: '易错提醒', order: 2 },
    ],
    'inequalities': [
      { slug: 'overview', title: '知识概述', order: 1 },
      { slug: 'common-mistakes', title: '易错提醒', order: 2 },
    ],
    'data-collection': [
      { slug: 'overview', title: '知识概述', order: 1 },
      { slug: 'common-mistakes', title: '易错提醒', order: 2 },
    ],
  },
  'grade-8': {},
  'grade-9': {},
}

// Auto-fill grade-8 and grade-9 with default topics
const G8_CHAPTERS = [
  'triangles', 'congruent-triangles', 'symmetry', 'polynomial-factoring',
  'fractions', 'quadratic-radicals', 'pythagorean', 'parallelograms',
  'linear-functions', 'data-analysis',
]
for (const ch of G8_CHAPTERS) {
  GRADE_TOPICS['grade-8'][ch] = [
    { slug: 'overview', title: '知识概述', order: 1 },
    { slug: 'common-mistakes', title: '易错提醒', order: 2 },
  ]
}

const G9_CHAPTERS = [
  'quadratic-equations', 'quadratic-functions', 'rotation', 'circles',
  'probability', 'inverse-proportion', 'similarity', 'trigonometry',
  'projection-views',
]
for (const ch of G9_CHAPTERS) {
  GRADE_TOPICS['grade-9'][ch] = [
    { slug: 'overview', title: '知识概述', order: 1 },
    { slug: 'common-mistakes', title: '易错提醒', order: 2 },
  ]
}

export function getChapterTopics(gradeSlug: string, chapterSlug: string): TopicEntry[] {
  return GRADE_TOPICS[gradeSlug]?.[chapterSlug] || []
}
