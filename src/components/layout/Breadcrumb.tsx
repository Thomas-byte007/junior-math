import Link from 'next/link'
import { getGradeBySlug, getChapterMeta } from '@/lib/constants'
import { getTopicTitle } from '@/lib/content'

interface BreadcrumbProps {
  gradeSlug: string
  chapterSlug?: string
  topicSlug?: string
}

export default function Breadcrumb({ gradeSlug, chapterSlug, topicSlug }: BreadcrumbProps) {
  const grade = getGradeBySlug(gradeSlug)
  const chapter = chapterSlug ? getChapterMeta(gradeSlug, chapterSlug) : null
  const topicTitle =
    topicSlug && chapterSlug
      ? getTopicTitle(gradeSlug, chapterSlug, topicSlug)
      : null

  return (
    <nav className="mb-4 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
      <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">
        首页
      </Link>

      {grade && (
        <>
          <span className="text-gray-300 dark:text-gray-600">/</span>
          <Link
            href={`/${gradeSlug}`}
            className="hover:text-gray-700 dark:hover:text-gray-200"
          >
            {grade.title}
          </Link>
        </>
      )}

      {chapter && (
        <>
          <span className="text-gray-300 dark:text-gray-600">/</span>
          <Link
            href={`/${gradeSlug}/${chapterSlug}`}
            className="hover:text-gray-700 dark:hover:text-gray-200"
          >
            {chapter.title}
          </Link>
        </>
      )}

      {topicTitle && (
        <>
          <span className="text-gray-300 dark:text-gray-600">/</span>
          <span className="text-gray-900 dark:text-white">{topicTitle}</span>
        </>
      )}
    </nav>
  )
}
