import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { getGradeBySlug, getChapterMeta } from '@/lib/constants'
import {
  getTopicContent,
  getTopicTitle,
  getAdjacentContent,
  getAllTopicPaths,
  getChapterTitle,
} from '@/lib/content'
import Breadcrumb from '@/components/layout/Breadcrumb'
import PrevNextNav from '@/components/content/PrevNextNav'
import { useMDXComponents } from '@/mdx-components'

interface Props {
  params: Promise<{ grade: string; chapter: string; topic: string }>
}

export async function generateStaticParams() {
  return getAllTopicPaths().map((p) => ({
    grade: p.gradeSlug,
    chapter: p.chapterSlug,
    topic: p.topicSlug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { grade: gradeSlug, chapter: chapterSlug, topic: topicSlug } = await params
  const grade = getGradeBySlug(gradeSlug)
  const chapterTitle = getChapterTitle(gradeSlug, chapterSlug)
  const topicTitle = getTopicTitle(gradeSlug, chapterSlug, topicSlug)

  return {
    title: `${topicTitle || ''} - ${chapterTitle || ''}${grade ? ` - ${grade.title}` : ''} - 初中数学知识大全`,
    description: `${grade?.title || ''} ${chapterTitle || ''} - ${topicTitle || ''}知识点总结，包含概念讲解、公式定理、典型例题和易错提醒`,
  }
}

export default async function TopicPage({ params }: Props) {
  const { grade: gradeSlug, chapter: chapterSlug, topic: topicSlug } = await params

  const grade = getGradeBySlug(gradeSlug)
  if (!grade) notFound()

  const chapterMeta = getChapterMeta(gradeSlug, chapterSlug)
  if (!chapterMeta) notFound()

  const content = getTopicContent(gradeSlug, chapterSlug, topicSlug)
  if (!content) notFound()

  const topicTitle = getTopicTitle(gradeSlug, chapterSlug, topicSlug) || topicSlug
  const chapterTitle = getChapterTitle(gradeSlug, chapterSlug) || chapterSlug
  const adjacent = getAdjacentContent(gradeSlug, chapterSlug, topicSlug)

  const mdxComponents = useMDXComponents()

  return (
    <div>
      <Breadcrumb
        gradeSlug={gradeSlug}
        chapterSlug={chapterSlug}
        topicSlug={topicSlug}
      />

      <article className="prose-math">
        <header className="mb-8">
          <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            {grade.title} / {chapterTitle}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {topicTitle}
          </h1>
          {content.frontmatter.tags && content.frontmatter.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {content.frontmatter.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="mdx-content">
          <MDXRemote
            source={content.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkMath],
                rehypePlugins: [rehypeKatex],
              },
            }}
          />
        </div>
      </article>

      <PrevNextNav adjacent={adjacent} />
    </div>
  )
}
