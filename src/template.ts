export const styles = `
body {
  font-family: Georgia, serif;
  background-color: #faf8f5;
}
h1, h2, h3, h4, h5, h6, th {
  font-family: Helvetica, Tahoma, Arial, sans-serif;
}
.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  font-weight: 600;
  margin-top: 1em;
  margin-bottom: 0.5em;
  line-height: 1.25;
}
.prose h1 { font-size: 1.875rem; }
.prose h2 { font-size: 1.5rem; }
.prose h3 { font-size: 1.25rem; }
.prose h4 { font-size: 1.125rem; }
.prose p { margin-top: 1em; margin-bottom: 1em; line-height: 1.25; }
.prose a { color: #2563eb; text-decoration: underline; text-underline-offset: 2px; }
.prose a:hover { color: #1d4ed8; }
.prose strong { font-weight: 600; }
.prose em { font-style: italic; }
.prose del { text-decoration: line-through; color: #6b7280; }
.prose code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.875em;
  background: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
}
.prose pre {
  margin-top: 1em;
  margin-bottom: 1em;
  padding: 1rem 1.25rem;
  background: #374151;
  color: #e5e7eb;
  border-radius: 0.5rem;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.7;
}
.prose pre code {
  background: none;
  padding: 0;
  font-size: inherit;
  color: inherit;
}
.prose blockquote {
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  padding-left: 1em;
  border-left: 4px solid #e5e7eb;
  color: #4b5563;
  font-style: italic;
}
.prose ul, .prose ol { margin-top: 1em; margin-bottom: 1em; padding-left: 1.625rem; }
.prose ul { list-style-type: disc; }
.prose ol { list-style-type: decimal; }
.prose li { margin-top: 0.25em; margin-bottom: 0.25em; }
.prose li > ul, .prose li > ol { margin-top: 0; margin-bottom: 0; }
.prose hr {
  margin-top: 2em;
  margin-bottom: 2em;
  border: none;
  border-top: 1px solid #e5e7eb;
}
.prose img {
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  border-radius: 0.5rem;
  max-width: 100%;
}
.prose table {
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9em;
}
.prose th, .prose td {
  padding: 0.625rem 0.875rem;
  border: 1px solid #e5e7eb;
  text-align: left;
}
.prose th {
  background: #f9fafb;
  font-weight: 600;
}
.prose tbody tr:nth-child(even) {
  background: #f9fafb;
}
.prose-compact h1, .prose-compact h2, .prose-compact h3, .prose-compact h4, .prose-compact h5, .prose-compact h6 {
  font-weight: 600;
  margin-top: 1em;
  margin-bottom: 0.25em;
  line-height: 1.25;
}
.prose-compact h1 { font-size: 1.5rem; }
.prose-compact h2 { font-size: 1.25rem; }
.prose-compact h3 { font-size: 1.125rem; }
.prose-compact h4 { font-size: 1.0625rem; }
.prose-compact p { margin-top: 0.5em; margin-bottom: 0.5em; line-height: 1.3; font-size: 1rem; }
.prose-compact a { color: #2563eb; text-decoration: underline; text-underline-offset: 2px; }
.prose-compact a:hover { color: #1d4ed8; }
.prose-compact strong { font-weight: 600; }
.prose-compact em { font-style: italic; }
.prose-compact del { text-decoration: line-through; color: #6b7280; }
.prose-compact code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.875em;
  background: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
}
.prose-compact pre {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
  padding: 0.75rem 1rem;
  background: #374151;
  color: #e5e7eb;
  border-radius: 0.5rem;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.6;
}
.prose-compact pre code {
  background: none;
  padding: 0;
  font-size: inherit;
  color: inherit;
}
.prose-compact blockquote {
  margin-top: 1em;
  margin-bottom: 1em;
  padding-left: 0.875rem;
  border-left: 3px solid #e5e7eb;
  color: #4b5563;
  font-style: italic;
  font-size: 1rem;
}
.prose-compact ul, .prose-compact ol { margin-top: 0.25em; margin-bottom: 0.25em; padding-left: 1.5rem; line-height: 1.3 }
.prose-compact ul { list-style-type: disc; }
.prose-compact ol { list-style-type: decimal; }
.prose-compact li { margin-top: 0; margin-bottom: 0; }
.prose-compact li > ul, .prose-compact li > ol { margin-top: 0; margin-bottom: 0; }
.prose-compact hr {
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  border: none;
  border-top: 1px solid #e5e7eb;
}
.prose-compact img {
  margin-top: 1em;
  margin-bottom: 1em;
  border-radius: 0.375rem;
  max-width: 100%;
}
.prose-compact table {
  margin-top: 1em;
  margin-bottom: 1em;
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}
.prose-compact th, .prose-compact td {
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
  text-align: left;
}
.prose-compact th {
  background: #f9fafb;
  font-weight: 600;
}
.prose-compact tbody tr:nth-child(even) {
  background: #f9fafb;
}
`

export function html(pageTitle: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${pageTitle}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="/styles.css"/>
  </head>
<body class="min-h-screen text-gray-900">
  <main class="max-w-2xl mx-auto px-6 py-12">
    ${body}
  </main>
</body>
</html>`
}
