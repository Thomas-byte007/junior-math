/**
 * Build search index script.
 * Runs as postbuild to generate search-index.json for client-side search.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CONTENT_DIR = path.resolve(__dirname, '..', 'content')
const OUTPUT_PATH = path.resolve(__dirname, '..', 'public', 'search-index.json')

function stripMarkdown(mdx) {
  return mdx
    .replace(/\$\$[\s\S]*?\$\$/g, '')
    .replace(/\$[\s\S]*?\$/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#*`~>|]/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function parseFrontmatter(raw) {
  const frontmatter = {}
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/)
  if (match) {
    const lines = match[1].split('\n')
    for (const line of lines) {
      const sep = line.indexOf(':')
      if (sep > 0) {
        const key = line.slice(0, sep).trim()
        let val = line.slice(sep + 1).trim()
        // Handle arrays like [tag1, tag2]
        if (val.startsWith('[') && val.endsWith(']')) {
          val = val.slice(1, -1).split(',').map((s) => s.trim().replace(/"/g, ''))
        }
        // Remove quotes
        if (typeof val === 'string') val = val.replace(/^"(.*)"$/, '$1')
        frontmatter[key] = val
      }
    }
  }
  return frontmatter
}

function getContentAfterFrontmatter(raw) {
  const match = raw.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/)
  return match ? match[1].trim() : raw.trim()
}

function buildSearchIndex() {
  const documents = []

  function walkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory() && entry.name !== 'node_modules') {
        walkDir(fullPath)
      } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
        try {
          const raw = fs.readFileSync(fullPath, 'utf-8')
          const frontmatter = parseFrontmatter(raw)
          const content = getContentAfterFrontmatter(raw)

          const relativePath = path.relative(CONTENT_DIR, fullPath)
          const slug = relativePath.replace(/\.mdx$/, '').replace(/\\/g, '/')
          const parts = slug.split('/')
          const gradeSlug = parts[0] || ''
          const chapterSlug = parts[1] || ''

          let tags = frontmatter.tags || []
          if (typeof tags === 'string') tags = [tags]

          documents.push({
            slug,
            title: frontmatter.title || entry.name.replace('.mdx', ''),
            grade: frontmatter.grade || gradeSlug,
            chapter: frontmatter.chapter || chapterSlug,
            tags: tags,
            text: stripMarkdown(content),
          })
        } catch (e) {
          console.error(`Error parsing ${entry.name}:`, e.message)
        }
      }
    }
  }

  walkDir(CONTENT_DIR)

  // Ensure public directory exists
  const publicDir = path.dirname(OUTPUT_PATH)
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(documents), 'utf-8')
  console.log(`Search index generated: ${documents.length} documents written to ${OUTPUT_PATH}`)

  // Also generate sitemap.xml
  generateSitemap(documents)
}

function generateSitemap(documents) {
  const baseUrl = 'https://junior-math.example.com'
  const sitemapPath = path.resolve(__dirname, '..', 'public', 'sitemap.xml')

  const pages = new Set()
  pages.add({ url: baseUrl, priority: '1.0' })
  pages.add({ url: `${baseUrl}/grade-7`, priority: '0.9' })
  pages.add({ url: `${baseUrl}/grade-8`, priority: '0.9' })
  pages.add({ url: `${baseUrl}/grade-9`, priority: '0.9' })

  for (const doc of documents) {
    const parts = doc.slug.split('/')
    if (parts.length >= 3) {
      const pageUrl = `${baseUrl}/${parts[0]}/${parts[1]}/${parts[2]}`
      pages.add({ url: pageUrl, priority: '0.7' })
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(pages).map((p) => `  <url>\n    <loc>${p.url}</loc>\n    <priority>${p.priority}</priority>\n  </url>`).join('\n')}
</urlset>`

  fs.writeFileSync(sitemapPath, xml, 'utf-8')
  console.log(`Sitemap generated: ${pages.size} URLs written to ${sitemapPath}`)
}

buildSearchIndex()
