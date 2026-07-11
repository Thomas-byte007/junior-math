import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 text-6xl">🔍</div>
      <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        页面未找到
      </h1>
      <p className="mb-8 text-gray-500 dark:text-gray-400">
        您访问的页面不存在，请检查地址是否正确
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        >
          返回首页
        </Link>
        <Link
          href="/grade-7"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          七年级
        </Link>
        <Link
          href="/grade-8"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          八年级
        </Link>
        <Link
          href="/grade-9"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          九年级
        </Link>
      </div>
    </div>
  )
}
