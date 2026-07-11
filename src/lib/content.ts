import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getGradeBySlug } from './constants'
import type {
  ChapterMeta,
  ContentPage,
  ContentFrontmatter,
  AdjacentContent,
  TopicMeta,
} from '@/types/content'

const CONTENT_DIR = path.join(process.cwd(), 'content')

/** Read and parse a grade-level _meta.json */
export function readGradeMeta(gradeSlug: string): ChapterMeta[] {
  const metaPath = path.join(CONTENT_DIR, gradeSlug, '_meta.json')
  const raw = fs.readFileSync(metaPath, 'utf-8')
  return JSON.parse(raw).chapters as ChapterMeta[]
}

/** Read and parse a chapter-level _meta.json to get topic listing */
export function readChapterTopics(
  gradeSlug: string,
  chapterSlug: string
): TopicMeta[] {
  const metaPath = path.join(CONTENT_DIR, gradeSlug, chapterSlug, '_meta.json')
  const raw = fs.readFileSync(metaPath, 'utf-8')
  return JSON.parse(raw).topics as TopicMeta[]
}

/** Get the full content of a topic MDX file */
export function getTopicContent(
  gradeSlug: string,
  chapterSlug: string,
  topicSlug: string
): ContentPage | null {
  try {
    const filePath = path.join(
      CONTENT_DIR,
      gradeSlug,
      chapterSlug,
      `${topicSlug}.mdx`
    )
    if (!fs.existsSync(filePath)) return null

    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)

    return {
      frontmatter: data as ContentFrontmatter,
      content,
      slug: topicSlug,
      chapterSlug,
      gradeSlug,
    }
  } catch {
    return null
  }
}

/** Get the title of a topic from its meta */
export function getTopicTitle(
  gradeSlug: string,
  chapterSlug: string,
  topicSlug: string
): string | null {
  try {
    const topics = readChapterTopics(gradeSlug, chapterSlug)
    return topics.find((t) => t.slug === topicSlug)?.title ?? null
  } catch {
    return null
  }
}

/** Get previous and next content for navigation */
export function getAdjacentContent(
  gradeSlug: string,
  chapterSlug: string,
  topicSlug: string
): AdjacentContent {
  let allTopics: { gradeSlug: string; chapterSlug: string; topicSlug: string; title: string }[] = []
  const grade = getGradeBySlug(gradeSlug)

  if (grade) {
    for (const ch of grade.chapters) {
      try {
        const topics = readChapterTopics(gradeSlug, ch.slug)
        for (const t of topics) {
          allTopics.push({
            gradeSlug,
            chapterSlug: ch.slug,
            topicSlug: t.slug,
            title: `${ch.title} · ${t.title}`,
          })
        }
      } catch {
        // skip chapters without meta
      }
    }
  }

  const currentIndex = allTopics.findIndex(
    (t) =>
      t.gradeSlug === gradeSlug &&
      t.chapterSlug === chapterSlug &&
      t.topicSlug === topicSlug
  )

  return {
    prev: currentIndex > 0 ? allTopics[currentIndex - 1] : null,
    next: currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null,
  }
}

/** Get all (gradeSlug, chapterSlug, topicSlug) triples for static generation */
export function getAllTopicPaths(): {
  gradeSlug: string
  chapterSlug: string
  topicSlug: string
}[] {
  const paths: { gradeSlug: string; chapterSlug: string; topicSlug: string }[] = []
  const grades = fs.readdirSync(CONTENT_DIR)

  for (const gradeSlug of grades) {
    const gradePath = path.join(CONTENT_DIR, gradeSlug)
    if (!fs.statSync(gradePath).isDirectory()) continue

    const chapters = fs.readdirSync(gradePath)
    for (const chapterSlug of chapters) {
      const chapterPath = path.join(gradePath, chapterSlug)
      if (!fs.statSync(chapterPath).isDirectory()) continue

      try {
        const topics = readChapterTopics(gradeSlug, chapterSlug)
        for (const topic of topics) {
          paths.push({ gradeSlug, chapterSlug, topicSlug: topic.slug })
        }
      } catch {
        // skip chapters without meta
      }
    }
  }

  return paths
}

/** Get the chapter display title for a given slug and grade */
export function getChapterTitle(gradeSlug: string, chapterSlug: string): string | null {
  const grade = getGradeBySlug(gradeSlug)
  return grade?.chapters.find((c) => c.slug === chapterSlug)?.title ?? null
}
