interface ExampleProps {
  title?: string
  problem?: string
  steps?: string[] | string
  answer?: string
}

export default function Example({ title = '', problem = '', steps = [], answer = '' }: ExampleProps) {
  // Handle steps that might be passed as a string (pipe-delimited) from MDX
  const stepsList: string[] = Array.isArray(steps)
    ? steps
    : typeof steps === 'string'
      ? steps.split('|').map(s => s.trim())
      : []
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-emerald-200 bg-white dark:border-emerald-800 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 dark:bg-emerald-950/50">
        <span className="rounded bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white">
          例题
        </span>
        <span className="font-medium text-emerald-700 dark:text-emerald-300">
          {title}
        </span>
      </div>

      {/* Problem */}
      <div className="border-b border-emerald-100 px-4 py-3 dark:border-emerald-800/50">
        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
          题目
        </div>
        <div className="text-gray-800 dark:text-gray-200 [&_.katex]:text-emerald-600 dark:[&_.katex]:text-emerald-300">
          {problem}
        </div>
      </div>

      {/* Steps */}
      <div className="border-b border-emerald-100 px-4 py-3 dark:border-emerald-800/50">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          解题步骤
        </div>
        <ol className="space-y-2">
          {stepsList.map((step, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-medium text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300">
                {i + 1}
              </span>
              <span className="[&_.katex]:text-emerald-600 dark:[&_.katex]:text-emerald-300">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Answer */}
      <div className="bg-emerald-50/50 px-4 py-3 dark:bg-emerald-950/20">
        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
          答案
        </div>
        <div className="font-medium text-emerald-700 dark:text-emerald-300 [&_.katex]:text-emerald-600 dark:[&_.katex]:text-emerald-300">
          {answer}
        </div>
      </div>
    </div>
  )
}
