import { config } from './config.js'
import { html } from './template.js'

export function renderPage(): string {
  const body = `
    <h1 class="text-3xl font-bold mb-2">Page Title</h1>
    <nav class="mb-8 text-sm text-gray-600 space-x-4">
      <a href="/" class="hover:underline">Posts</a>
      <a href="/tags.html" class="hover:underline">Tags</a>
      <a href="/page.html" class="hover:underline font-semibold">Page</a>
    </nav>
    <article class="prose max-w-none">
      <!-- your content here -->
    </article>
  `.trim()

  return html(`Page Title - ${config.title}`, body)
}