import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getGradeBySlug } from '@/lib/constants'
import { readGradeMeta } from '@/lib/content'
import Breadcrumb from '@/components/layout/Breadcrumb'
import type { ChapterMeta } from '@/types/content'

interface Props {
  params: Promise<{ grade: string }>
}

export async function generateStaticParams() {
  return [
    { grade: 'grade-7' },
    { grade: 'grade-8' },
    { grade: 'grade-9' },
  ]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { grade: gradeSlug } = await params
  const grade = getGradeBySlug(gradeSlug)
  if (!grade) return { title: '页面未找到' }
  return {
    title: `${grade.title} - 初中数学知识大全`,
    description: grade.description,
  }
}

export default async function GradePage({ params }: Props) {
  const { grade: gradeSlug } = await params
  const grade = getGradeBySlug(gradeSlug)
  if (!grade) notFound()

  let chapters: ChapterMeta[] = []
  try {
    chapters = readGradeMeta(gradeSlug)
  } catch {
    chapters = grade.chapters
  }

  return (
    <div>
      <Breadcrumb gradeSlug={gradeSlug} />

      <div className="mb-8">
        <div className="mb-2 text-4xl">{grade.emoji}</div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {grade.title}
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          {grade.description}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {chapters.map((chapter) => (
          <Link
            key={chapter.slug}
            href={`/${gradeSlug}/${chapter.slug}`}
            className="group rounded-xl border border-gray-200 bg-white p-5 transition-all hover:shadow-md hover:-translate-y-0.5 dark:border-gray-800 dark:bg-gray-900"
          >
            <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
              {chapter.title}
            </h2>
            {chapter.description && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {chapter.description}
              </p>
            )}
            {chapter.topics && chapter.topics.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {chapter.topics.map((topic) => (
                  <span
                    key={topic.slug}
                    className="rounded-md bg-gray-50 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                  >
                    {topic.title}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
