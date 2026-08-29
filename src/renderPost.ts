import { Post } from './types.js'
import { config } from './config.js'
import { html } from './template.js'

function typeIcon(type: 'dev' | 'design'): string {
  if (type === 'dev') {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>`
}

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
