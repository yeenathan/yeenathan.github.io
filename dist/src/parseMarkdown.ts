import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import type { Post } from './types.js'

const md = new MarkdownIt({
  breaks: true,
  html: true
})

md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
  tokens[idx].attrSet('target', '_blank')
  return self.renderToken(tokens, idx, options)
}

export function parsePost(content: string, slug: string): Post {
  const { data, content: body } = matter(content)

  if (!data.title) {
    throw new Error(`Post "${slug}" is missing a "title" in front matter`)
  }

  if (!data.description) {
    throw new Error(`Post "${slug}" is missing a "description" in front matter`)
  }

  if (!data.type || (data.type !== 'dev' && data.type !== 'design')) {
    throw new Error(`Post "${slug}" must have a "type" of "dev" or "design" in front matter`)
  }

  return {
    slug,
    title: data.title,
    description: data.description,
    tags: data.tags ?? [],
    type: data.type,
    order: typeof data.order === 'number' ? data.order : undefined,
    html: md.render(body)
  }
}