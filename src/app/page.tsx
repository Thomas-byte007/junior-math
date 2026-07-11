import Link from 'next/link'
import { GRADES } from '@/lib/constants'

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          📚 初中数学知识大全
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          系统梳理七年级至九年级全部数学知识点，涵盖概念讲解、公式定理、
          典型例题和易错提醒，助力中考数学复习
        </p>
      </section>

      {/* Grade Cards */}
      <section className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {GRADES.map((grade) => (
          <Link
            key={grade.slug}
            href={`/${grade.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="mb-4 text-4xl">{grade.emoji}</div>
            <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              {grade.title}
            </h2>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              {grade.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {grade.chapters.slice(0, 5).map((ch) => (
                <span
                  key={ch.slug}
                  className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                >
                  {ch.title}
                </span>
              ))}
              {grade.chapters.length > 5 && (
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-400 dark:bg-gray-800 dark:text-gray-500">
                  +{grade.chapters.length - 5} 章
                </span>
              )}
            </div>
          </Link>
        ))}
      </section>

      {/* Features */}
      <section className="mt-16 grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: '📖', title: '知识概述', desc: '简明扼要的概念讲解，快速建立知识框架' },
          { icon: '📝', title: '典型例题', desc: '精选例题配详细步骤解析，举一反三' },
          { icon: '⚠️', title: '易错提醒', desc: '常见错误归纳总结，避免踩坑丢分' },
          { icon: '🔍', title: '全文搜索', desc: '快速查找任意知识点，精准定位' },
        ].map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="mb-3 text-2xl">{feature.icon}</div>
            <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {feature.desc}
            </p>
          </div>
        ))}
      </section>
    </div>
  )
}
