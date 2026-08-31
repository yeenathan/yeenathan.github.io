import { config } from './config.js'
import { html } from './template.js'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  breaks: true,
  html: true
})

md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
  tokens[idx].attrSet('target', '_blank')
  return self.renderToken(tokens, idx, options)
}

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
