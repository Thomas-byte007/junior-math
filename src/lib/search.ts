import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { SearchDocument } from '@/types/content'

const CONTENT_DIR = path.join(process.cwd(), 'content')

/**
 * Strip MDX/HTML/Katex syntax from text to get plain searchable text
 */
function stripMarkdown(mdx: string): string {
  return mdx
    .replace(/\$\$[\s\S]*?\$\$/g, '')      // Remove display math
    .replace(/\$[\s\S]*?\$/g, '')           // Remove inline math
    .replace(/<[^>]+>/g, '')                // Remove HTML tags
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Replace links with text
    .replace(/[#*`~>|]/g, ' ')              // Remove markdown syntax
    .replace(/\n{3,}/g, '\n\n')            // Collapse multiple newlines
    .trim()
}

/**
 * Build search index from all MDX files at build time
 */
export function buildSearchIndex(): SearchDocument[] {
  const documents: SearchDocument[] = []

  function walkDir(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory() && entry.name !== 'node_modules') {
        walkDir(fullPath)
      } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
        try {
          const raw = fs.readFileSync(fullPath, 'utf-8')
          const { data, content } = matter(raw)
          const frontmatter = data as Record<string, any>

          // Compute relative path as slug
          const relativePath = path.relative(CONTENT_DIR, fullPath)
          const slug = relativePath.replace(/\.mdx$/, '').replace(/\\/g, '/')

          // Get grade and chapter from path
          const parts = slug.split('/')
          const gradeSlug = parts[0] || ''
          const chapterSlug = parts[1] || ''

          documents.push({
            slug,
            title: frontmatter.title || entry.name.replace('.mdx', ''),
            grade: frontmatter.grade || gradeSlug,
            chapter: frontmatter.chapter || chapterSlug,
            tags: frontmatter.tags || [],
            text: stripMarkdown(content),
          })
        } catch {
          // Skip files with parsing errors
        }
      }
    }
  }

  walkDir(CONTENT_DIR)
  return documents
}

/**
 * Write search index to public directory for client-side use
 */
export function writeSearchIndex(outputPath: string): void {
  const index = buildSearchIndex()
  fs.writeFileSync(outputPath, JSON.stringify(index), 'utf-8')
}
