interface CommonMistakeProps {
  title: string
  children: React.ReactNode
}

export default function CommonMistake({ title, children }: CommonMistakeProps) {
  return (
    <div className="my-6 rounded-lg border-l-4 border-red-400 bg-red-50 p-4 dark:border-red-600 dark:bg-red-950/40">
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-400 text-sm text-white">
          ⚠
        </span>
        <span className="font-semibold text-red-600 dark:text-red-300">
          {title}
        </span>
      </div>
      <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-200">
        {children}
      </div>
    </div>
  )
}
