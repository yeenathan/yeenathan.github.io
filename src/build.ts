import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { parsePost } from './parseMarkdown.js'
import { renderIndex } from './renderIndex.js'
import { renderPost } from './renderPost.js'
import { renderResume } from './renderResume.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)



export function build() {
  const rootDir = path.resolve(__dirname, '..')
  const postsDir = path.join(rootDir, 'src', 'posts')
  const distDir = path.join(rootDir, 'dist')

  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))

  if (files.length === 0) {
    console.log('No posts found.')
    return
  }

  const posts = files.map(file => {
    const slug = file.replace(/\.md$/, '')
    const content = fs.readFileSync(path.join(postsDir, file), 'utf-8')
    return parsePost(content, slug)
  })

  fs.mkdirSync(distDir, { recursive: true })

  const staticDir = path.join(rootDir, 'src', 'static')
  if (fs.existsSync(staticDir)) {
    fs.cpSync(staticDir, path.join(distDir, 'static'), { recursive: true })
  }

  // Compile Tailwind CSS
  const tailwindResult = spawnSync(
    'npx',
    ['tailwindcss', '-i', path.join(rootDir, 'src', 'input.css'), '-o', path.join(distDir, 'styles.css'), '--minify'],
    { stdio: 'inherit', cwd: rootDir }
  )
  if (tailwindResult.error) {
    console.error('Tailwind CSS compilation failed:', tailwindResult.error)
    process.exit(1)
  }

  fs.writeFileSync(
    path.join(distDir, 'index.html'),
    renderIndex(posts)
  )

  const resumeContent = fs.readFileSync(
    path.join(staticDir, 'resume.md'),
    'utf-8'
  )
  fs.writeFileSync(
    path.join(distDir, 'resume.html'),
    renderResume(resumeContent)
  )

  for (const post of posts) {
    const postDir = path.join(distDir, 'post', post.slug)
    fs.mkdirSync(postDir, { recursive: true })
    fs.writeFileSync(
      path.join(postDir, 'index.html'),
      renderPost(post)
    )
  }

  console.log(`Built ${posts.length} post(s) to ${distDir}`)
}

if (import.meta.url === `file://${__filename}`) {
  build()
}
