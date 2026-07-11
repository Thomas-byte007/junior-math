export interface TopicMeta {
  slug: string
  title: string
  order: number
}

export interface ChapterMeta {
  slug: string
  title: string
  description?: string
  order: number
  topics: TopicMeta[]
}

export interface GradeMeta {
  slug: string
  title: string
  titleShort: string
  emoji: string
  color: string
  description: string
  chapters: ChapterMeta[]
}

export interface ContentFrontmatter {
  title: string
  grade: string
  chapter: string
  tags?: string[]
  order: number
  updated?: string
}

export interface ContentPage {
  frontmatter: ContentFrontmatter
  content: string
  slug: string
  chapterSlug: string
  gradeSlug: string
}

export interface SearchDocument {
  slug: string
  title: string
  grade: string
  chapter: string
  tags: string[]
  text: string
}

export interface AdjacentContent {
  prev: { gradeSlug: string; chapterSlug: string; topicSlug: string; title: string } | null
  next: { gradeSlug: string; chapterSlug: string; topicSlug: string; title: string } | null
}
