import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getGradeBySlug, getChapterMeta } from '@/lib/constants'
import { readChapterTopics, getChapterTitle } from '@/lib/content'
import Breadcrumb from '@/components/layout/Breadcrumb'
import type { TopicMeta } from '@/types/content'

interface Props {
  params: Promise<{ grade: string; chapter: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { grade: gradeSlug, chapter: chapterSlug } = await params
  const grade = getGradeBySlug(gradeSlug)
  const chapterTitle = getChapterTitle(gradeSlug, chapterSlug)
  return {
    title: `${chapterTitle || ''}${grade ? ` - ${grade.title}` : ''} - 初中数学知识大全`,
    description: `${grade?.title || ''} ${chapterTitle || ''} - 知识点列表`,
  }
}

export async function generateStaticParams() {
  const grades = ['grade-7', 'grade-8', 'grade-9']
  const params: { grade: string; chapter: string }[] = []
  for (const gradeSlug of grades) {
    const grade = getGradeBySlug(gradeSlug)
    if (grade) {
      for (const ch of grade.chapters) {
        params.push({ grade: gradeSlug, chapter: ch.slug })
      }
    }
  }
  return params
}

export default async function ChapterPage({ params }: Props) {
  const { grade: gradeSlug, chapter: chapterSlug } = await params
  const grade = getGradeBySlug(gradeSlug)
  if (!grade) notFound()

  const chapterMeta = getChapterMeta(gradeSlug, chapterSlug)
  if (!chapterMeta) notFound()

  let topics: TopicMeta[] = []
  try {
    topics = readChapterTopics(gradeSlug, chapterSlug)
  } catch {
    notFound()
  }

  const chapterTitle = getChapterTitle(gradeSlug, chapterSlug) || chapterSlug

  return (
    <div>
      <Breadcrumb gradeSlug={gradeSlug} chapterSlug={chapterSlug} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {chapterTitle}
        </h1>
        {chapterMeta.description && (
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {chapterMeta.description}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/${gradeSlug}/${chapterSlug}/${topic.slug}`}
            className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-md hover:-translate-y-0.5 dark:border-gray-800 dark:bg-gray-900"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-lg text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              {topic.slug === 'overview' ? '📖' : topic.slug === 'common-mistakes' ? '⚠️' : '📝'}
            </span>
            <div>
              <span className="font-medium text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {topic.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
