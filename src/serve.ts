import { createServer } from 'http'
import { readFileSync, statSync, existsSync } from 'fs'
import { join, extname } from 'path'

const DIST = join(import.meta.dirname, '..', 'dist')
const PORTS = [8000, 8800]
const HOST = '0.0.0.0'

const mimeTypes: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
}

const handler = (req: any, res: any) => {
  let url = req.url || '/'
  url = url.split('?')[0]

  let filePath = join(DIST, url)

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = join(DIST, url, 'index.html')
  }

  if (!existsSync(filePath)) {
    res.writeHead(404)
    res.end('404 Not Found')
    return
  }

  const ext = extname(filePath)
  const contentType = mimeTypes[ext] || 'application/octet-stream'

  try {
    const content = readFileSync(filePath)
    res.writeHead(200, { 'Content-Type': contentType })
    res.end(content)
  } catch {
    res.writeHead(500)
    res.end('Internal Server Error')
  }
}

function tryPort(idx: number): void {
  if (idx >= PORTS.length) {
    console.error(`Failed to start server on ports ${PORTS.join(', ')}`)
    process.exit(1)
  }

  const port = PORTS[idx]
  const server = createServer(handler)

  server.on('error', () => {
    tryPort(idx + 1)
  })

  server.listen(port, HOST, () => {
    console.log(`Serving ${DIST}`)
    console.log(`Local: http://localhost:${port}`)
    console.log(`Network: http://${HOST}:${port}`)
  })
}

tryPort(0)
