'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import type { SearchDocument } from '@/types/content'

function SearchResultsInner() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<SearchDocument[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    // Dynamic import Fuse.js for client-side
    import('fuse.js').then(({ default: Fuse }) => {
      fetch('/search-index.json')
        .then((res) => res.json())
        .then((data: SearchDocument[]) => {
          const fuse = new Fuse(data, {
            keys: [
              { name: 'title', weight: 2 },
              { name: 'tags', weight: 1.5 },
              { name: 'text', weight: 1 },
              { name: 'chapter', weight: 0.5 },
            ],
            threshold: 0.4,
            includeMatches: true,
          })
          const fuseResults = fuse.search(query)
          setResults(fuseResults.map((r) => r.item))
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    })
  }, [query])

  // Group results by grade
  const grouped: Record<string, SearchDocument[]> = {}
  for (const doc of results) {
    const grade = doc.grade || '其他'
    if (!grouped[grade]) grouped[grade] = []
    grouped[grade].push(doc)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          搜索结果
        </h1>
        {query && (
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {loading
              ? '搜索中...'
              : `找到 ${results.length} 个与 "${query}" 相关的结果`}
          </p>
        )}
      </div>

      {!query && (
        <p className="text-gray-400 dark:text-gray-500">
          请在搜索框中输入关键词开始搜索
        </p>
      )}

      {query && !loading && results.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-2 text-4xl">🔍</div>
          <p className="text-gray-500 dark:text-gray-400">
            未找到与 &ldquo;{query}&rdquo; 相关的内容
          </p>
          <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
            请尝试其他关键词</p>
        </div>
      )}

      {Object.entries(grouped).map(([grade, docs]) => (
        <section key={grade} className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
            {grade}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {docs.map((doc) => {
              const parts = doc.slug.split('/')
              const gradeSlug = parts[0]
              const chapterSlug = parts[1]
              const topicSlug = parts[2]
              return (
                <Link
                  key={doc.slug}
                  href={`/${gradeSlug}/${chapterSlug}/${topicSlug}`}
                  className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {doc.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
                    {doc.chapter}
                  </p>
                  {doc.tags && doc.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {doc.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-gray-500">加载中...</div>}>
      <SearchResultsInner />
    </Suspense>
  )
}
