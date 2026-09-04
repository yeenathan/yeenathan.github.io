import { config } from './config.js'
import { html } from './template.js'
import { md } from './parseMarkdown.js'

export function renderResume(content: string): string {
  const htmlContent = md.render(content)

  const body = `
    <a href="/" class="text-sm text-gray-500 hover:underline block">← Back to home</a>
    <article class="prose-compact max-w-none">
      ${htmlContent}
    </article>
  `.trim()

  return html(`Resume - ${config.title}`, body)
}
