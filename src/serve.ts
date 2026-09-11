import { createServer } from 'node:http'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { readFileSync, statSync, existsSync } from 'node:fs'
import { join, extname } from 'node:path'
import { listPosts, getPost, savePost, deletePost, getConfig, saveConfig, build } from './admin-api.js'

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

function json(res: ServerResponse, data: any, status = 200) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}

async function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', () => resolve(body))
    req.on('error', reject)
  })
}

async function handleApi(req: IncomingMessage, res: ServerResponse, pathname: string) {
  try {
    // POST /api/build
    if (pathname === '/api/build' && req.method === 'POST') {
      return json(res, build())
    }

    // GET /api/posts
    if (pathname === '/api/posts' && req.method === 'GET') {
      return json(res, listPosts())
    }

    // POST /api/posts (create)
    if (pathname === '/api/posts' && req.method === 'POST') {
      const body = JSON.parse(await readBody(req))
      savePost(body.slug, body)
      return json(res, { ok: true })
    }

    // GET/PUT/DELETE /api/posts/:slug
    const postMatch = pathname.match(/^\/api\/posts\/([^\/]+)$/)  
    if (postMatch) {
      const slug = postMatch[1]
      if (req.method === 'GET') {
        return json(res, getPost(slug))
      }
      if (req.method === 'PUT') {
        const body = JSON.parse(await readBody(req))
        savePost(slug, body)
        return json(res, { ok: true })
      }
      if (req.method === 'DELETE') {
        deletePost(slug)
        return json(res, { ok: true })
      }
    }

    // GET/PUT /api/config
    if (pathname === '/api/config') {
      if (req.method === 'GET') {
        return json(res, getConfig())
      }
      if (req.method === 'PUT') {
        const body = JSON.parse(await readBody(req))
        saveConfig(body)
        return json(res, { ok: true })
      }
    }
  } catch (e: any) {
    json(res, { error: e.message }, 500)
  }
}

async function handler(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)
  let pathname = decodeURIComponent(url.pathname)

  // API routes
  if (pathname.startsWith('/api/')) {
    return handleApi(req, res, pathname)
  }

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
