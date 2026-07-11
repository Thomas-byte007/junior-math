'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { getGradeBySlug } from '@/lib/constants'
import { getChapterTopics } from '@/lib/topics-data'
import type { TopicEntry } from '@/lib/topics-data'

export default function Sidebar() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const gradeSlug = segments[0] || ''
  const chapterSlug = segments[1] || ''

  const grade = getGradeBySlug(gradeSlug)
  const topics: TopicEntry[] = useMemo(() => {
    if (gradeSlug && chapterSlug) {
      return getChapterTopics(gradeSlug, chapterSlug)
    }
    return []
  }, [gradeSlug, chapterSlug])

  if (!grade) return null

  return (
    <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white lg:block dark:border-gray-800 dark:bg-gray-950">
      <div className="sticky top-16 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
        {/* Current grade chapters */}
        <div className="p-4">
          <Link
            href={`/${grade.slug}`}
            className={`mb-3 flex items-center gap-2 text-sm font-semibold ${
              pathname === `/${grade.slug}`
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <span>{grade.emoji}</span>
            <span>{grade.title}</span>
          </Link>

          <nav className="space-y-0.5">
            {grade.chapters.map((ch) => {
              const isActiveChapter = pathname.includes(`/${grade.slug}/${ch.slug}`)
              return (
                <div key={ch.slug}>
                  <Link
                    href={`/${grade.slug}/${ch.slug}`}
                    className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActiveChapter
                        ? 'bg-gray-100 font-medium text-gray-900 dark:bg-gray-800 dark:text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-white'
                    }`}
                  >
                    {ch.title}
                  </Link>

                  {/* Topic links when chapter is active */}
                  {isActiveChapter && topics.length > 0 && (
                    <div className="ml-2 mt-0.5 space-y-0.5 border-l-2 border-gray-100 pl-2 dark:border-gray-800">
                      {topics.map((topic) => {
                        const isActiveTopic = pathname === `/${grade.slug}/${ch.slug}/${topic.slug}`
                        return (
                          <Link
                            key={topic.slug}
                            href={`/${grade.slug}/${ch.slug}/${topic.slug}`}
                            className={`block rounded-md px-3 py-1.5 text-xs transition-colors ${
                              isActiveTopic
                                ? 'bg-blue-50 font-medium text-blue-600 dark:bg-blue-950 dark:text-blue-300'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                            }`}
                          >
                            {topic.title}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </div>
    </aside>
  )
}
