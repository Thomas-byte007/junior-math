interface TheoremProps {
  title: string
  children: React.ReactNode
}

export default function Theorem({ title, children }: TheoremProps) {
  return (
    <div className="my-6 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-950/50">
      {title && (
        <div className="mb-2 flex items-center gap-2">
          <span className="text-lg">📖</span>
          <span className="font-semibold text-blue-700 dark:text-blue-300">
            {title}
          </span>
        </div>
      )}
      <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-200 [&_.katex]:text-blue-600 dark:[&_.katex]:text-blue-300">
        {children}
      </div>
    </div>
  )
}
