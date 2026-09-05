import { createServer } from 'node:http'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { readFileSync, statSync, existsSync } from 'node:fs'
import { join, extname } from 'node:path'

const DIST = join(import.meta.dirname, '..', 'dist')
const PORT = 8000
const HOST = '0.0.0.0'

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.pdf': 'application/pdf'
}

function getMime(filePath: string): string {
  const ext = extname(filePath).toLowerCase()
  return MIME[ext] || 'application/octet-stream'
}

function handler(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)
  let pathname = decodeURIComponent(url.pathname)

  // Resolve the file path safely to prevent path traversal
  const safePath = join(DIST, pathname)
  if (!safePath.startsWith(DIST)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' })
    res.end('403 Forbidden')
    return
  }

  let filePath = safePath

  // If it's a directory, look for index.html
  try {
    const stats = statSync(filePath)
    if (stats.isDirectory()) {
      filePath = join(filePath, 'index.html')
    }
  } catch {
    // File doesn't exist yet
  }

  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('404 Not Found')
    return
  }

  const content = readFileSync(filePath)
  res.writeHead(200, { 'Content-Type': getMime(filePath) })
  res.end(content)
}

const server = createServer(handler)

server.on('error', (err: NodeJS.ErrnoException) => {
  console.error(err.message)
  process.exit(1)
})

server.listen(PORT, HOST, () => {
  console.log(`Serving ${DIST}`)
  console.log(`Local: http://localhost:${PORT}`)
  console.log(`Network: http://${HOST}:${PORT}`)
})
