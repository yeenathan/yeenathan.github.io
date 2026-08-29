import { Post } from './types.js'
import { config } from './config.js'
import { html } from './template.js'

export function renderTags(posts: Post[]): string {
  const tagMap = new Map<string, Post[]>()
  for (const post of posts) {
    for (const tag of post.tags) {
      const list = tagMap.get(tag) || []
      list.push(post)
      tagMap.set(tag, list)
    }
  }

  const sortedTags = [...tagMap.keys()].sort()

  const body = `
    <h1 class="text-3xl font-bold mb-2">Tags</h1>
    <nav class="mb-8 text-sm text-gray-600 space-x-4">
      <a href="/" class="hover:underline">Posts</a>
      <a href="/tags.html" class="hover:underline font-semibold">Tags</a>
    </nav>
    <section class="space-y-6">
      ${sortedTags
        .map(
          tag => `
            <div>
              <h2 class="text-lg font-semibold mb-2">${tag}</h2>
              <ul class="space-y-1 text-gray-700">
                ${tagMap
                  .get(tag)!
                  .map(
                    post => `
                      <li>
                        <a href="/post/${post.slug}/index.html" class="hover:underline">${post.title}</a>
                      </li>
                    `.trim(),
                  )
                  .join('\n')}
              </ul>
            </div>
          `.trim(),
        )
        .join('\n\n')}
    </section>
  `.trim()

  return html(`Tags - ${config.title}`, body)
}
