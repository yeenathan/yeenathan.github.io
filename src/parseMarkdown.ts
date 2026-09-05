import MarkdownIt from 'markdown-it'
import type { Post } from './types.js'

export const md = new MarkdownIt({
  breaks: true,
  html: true
})

md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
  tokens[idx].attrSet('target', '_blank')
  return self.renderToken(tokens, idx, options)
}

function unquote(s: string): string {
  return s.length > 1 && s.startsWith('"') && s.endsWith('"') ? s.slice(1, -1) : s
}

// ponytail: parses only the flat subset of YAML our front matter uses
// (scalar values, block lists). Nested maps/inline lists need a real YAML parser.
export function parseFrontmatter(raw: string): {
  data: Record<string, string | string[]>
  body: string
} {
  const m = raw.match(/^---\n([\s\S]*?)\n---\r?\n?([\s\S]*)$/)
  if (!m) return { data: {}, body: raw }

  const data: Record<string, string | string[]> = {}
  let listKey: string | null = null

  for (const line of m[1].split('\n')) {
    const item = line.match(/^\s+-\s*(\S.*)$/)
    if (item) {
      const list = listKey ? data[listKey] : undefined
      if (!Array.isArray(list)) {
        throw new Error(`Front matter list item without a list key: ${line.trim()}`)
      }
      list.push(unquote(item[1].trim()))
      continue
    }
    const kv = line.match(/^([\w-]+):\s*(.*)$/)
    if (!kv) continue
    listKey = kv[1]
    const value = kv[2].trim()
    data[listKey] = value === '' ? [] : unquote(value)
  }

  return { data, body: m[2] }
}

export function parsePost(content: string, slug: string): Post {
  const { data, body } = parseFrontmatter(content)
  const { title, description, type } = data

  if (typeof title !== 'string' || !title) {
    throw new Error(`Post "${slug}" is missing a "title" in front matter`)
  }

  if (typeof description !== 'string' || !description) {
    throw new Error(`Post "${slug}" is missing a "description" in front matter`)
  }

  if (type !== 'dev' && type !== 'design') {
    throw new Error(`Post "${slug}" must have a "type" of "dev" or "design" in front matter`)
  }

  const rawOrder = data.order !== undefined ? Number(data.order) : undefined

  return {
    slug,
    title,
    description,
    tags: Array.isArray(data.tags) ? data.tags : [],
    type,
    order: rawOrder !== undefined && Number.isFinite(rawOrder) ? rawOrder : undefined,
    html: md.render(body)
  }
}
