import Link from 'next/link'
import type { AdjacentContent } from '@/types/content'

interface PrevNextNavProps {
  adjacent: AdjacentContent
}

export default function PrevNextNav({ adjacent }: PrevNextNavProps) {
  const { prev, next } = adjacent

  return (
    <nav className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
      <div>
        {prev ? (
          <Link
            href={`/${prev.gradeSlug}/${prev.chapterSlug}/${prev.topicSlug}`}
            className="group flex flex-col items-start gap-1 text-sm"
          >
            <span className="text-gray-400 dark:text-gray-500">← 上一篇</span>
            <span className="font-medium text-gray-700 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-400">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>

      <div>
        {next ? (
          <Link
            href={`/${next.gradeSlug}/${next.chapterSlug}/${next.topicSlug}`}
            className="group flex flex-col items-end gap-1 text-sm"
          >
            <span className="text-gray-400 dark:text-gray-500">下一篇 →</span>
            <span className="font-medium text-gray-700 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-400">
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  )
}
