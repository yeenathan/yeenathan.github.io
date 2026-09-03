export function html(pageTitle: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${pageTitle}</title>
  <link rel="stylesheet" href="/styles.css"/>
  </head>
<body class="min-h-screen text-gray-900">
  <main class="max-w-2xl mx-auto px-6 py-12">
    ${body}
  </main>
</body>
</html>`
}
