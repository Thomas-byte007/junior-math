import type { MDXComponents } from 'mdx/types'
import Theorem from '@/components/math/Theorem'
import Example from '@/components/math/Example'
import CommonMistake from '@/components/math/CommonMistake'

const components: MDXComponents = {
  Theorem,
  Example,
  CommonMistake,
}

export function useMDXComponents(): MDXComponents {
  return components
}
