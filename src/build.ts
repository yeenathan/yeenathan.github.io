import * as fs from 'node:fs'
import * as path from 'node:path'
import { spawnSync } from 'node:child_process'
import { parsePost } from './parseMarkdown.js'
import { renderIndex } from './renderIndex.js'
import { renderPost } from './renderPost.js'
import { renderResume } from './renderResume.js'

const rootDir = path.resolve(import.meta.dirname, '..')

function build() {
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

  fs.rmSync(distDir, { recursive: true, force: true })
  fs.mkdirSync(distDir, { recursive: true })

  const staticDir = path.join(rootDir, 'src', 'static')
  if (fs.existsSync(staticDir)) {
    fs.cpSync(staticDir, path.join(distDir, 'static'), { recursive: true })
  }

  // ponytail: admin panel only in dev, not deployed
  if (process.env.DEPLOY !== '1') {
    const adminDir = path.join(rootDir, 'admin', 'public')
    if (fs.existsSync(adminDir)) {
      fs.cpSync(adminDir, path.join(distDir, 'admin'), { recursive: true })
    }
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

build()
