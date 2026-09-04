import { Post } from './types.js'
import { config } from './config.js'
import { html, typeIcon } from './template.js'

export function renderPost(post: Post): string {
  const body = `
    <a href="/" class="text-sm text-gray-500 hover:underline mb-4 inline-block">← Back to posts</a>
    <h1 class="text-3xl font-bold mb-2">${post.title}</h1>
    <div class="flex items-center gap-4 text-sm text-gray-500 mb-6">
      ${typeIcon(post.type)}
      ${post.tags.length > 0 ? `
        <div class="flex flex-wrap gap-2">
          ${post.tags
            .map(
              tag =>
                `<span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">${tag}</span>`,
            )
            .join('')}
        </div>
      ` : ''}
    </div>
    <article class="prose max-w-none">
      ${post.html}
    </article>
  `.trim()

  return html(`${post.title} - ${config.title}`, body)
}
