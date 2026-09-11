import * as fs from 'node:fs'
import * as path from 'node:path'
import { spawnSync } from 'node:child_process'
import { parseFrontmatter } from './parseMarkdown.js'

const rootDir = path.resolve(import.meta.dirname, '..')
const postsDir = path.join(rootDir, 'src', 'posts')
const configPath = path.join(rootDir, 'src', 'config.ts')

export function listPosts() {
  return fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const slug = f.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(postsDir, f), 'utf-8')
      const { data } = parseFrontmatter(raw)
      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        type: data.type as string,
        tags: Array.isArray(data.tags) ? data.tags : [],
        order: data.order
      }
    })
    .sort((a, b) => {
      const ao = a.order ? Number(a.order) : Infinity
      const bo = b.order ? Number(b.order) : Infinity
      if (ao !== bo) return ao - bo
      return a.title.localeCompare(b.title)
    })
}

export function getPost(slug: string) {
  const raw = fs.readFileSync(path.join(postsDir, slug + '.md'), 'utf-8')
  const { data, body } = parseFrontmatter(raw)
  return {
    slug,
    title: data.title,
    description: data.description,
    type: data.type,
    tags: Array.isArray(data.tags) ? data.tags : [],
    order: data.order,
    body
  }
}

function serializeFrontmatter(post: any): string {
  const lines = ['---']
  lines.push(`title: ${post.title}`)
  lines.push(`description: ${post.description}`)
  lines.push(`type: ${post.type}`)
  if (post.order !== undefined && post.order !== null && post.order !== '') {
    lines.push(`order: ${post.order}`)
  }
  if (post.tags && post.tags.length > 0) {
    lines.push('tags:')
    post.tags.forEach((t: string) => lines.push(`  - ${t}`))
  }
  lines.push('---')
  return lines.join('\n')
}

export function savePost(slug: string, post: any) {
  const frontmatter = serializeFrontmatter(post)
  const content = frontmatter + '\n' + post.body
  fs.writeFileSync(path.join(postsDir, slug + '.md'), content)
}

export function deletePost(slug: string) {
  fs.unlinkSync(path.join(postsDir, slug + '.md'))
}

export function getConfig() {
  const raw = fs.readFileSync(configPath, 'utf-8')
  // ponytail: naive extraction of config values from the TS file
  const title = raw.match(/title:\s*'([^']+)'/)?.[1] || ''
  const name = raw.match(/name:\s*'([^']+)'/)?.[1] || ''
  const role = raw.match(/role:\s*'([^']+)'/)?.[1] || ''
  const bio = raw.match(/bio:\s*'([^']+)'/)?.[1] || ''
  const resume = raw.match(/resume:\s*'([^']+)'/)?.[1] || ''
  const github = raw.match(/github:\s*'([^']+)'/)?.[1] || ''
  const linkedin = raw.match(/linkedin:\s*'([^']+)'/)?.[1] || ''
  const email = raw.match(/email:\s*'([^']+)'/)?.[1] || ''
  return { title, hero: { name, role, bio, links: { resume, github, linkedin, email } } }
}

export function saveConfig(config: any) {
  const { title, hero } = config
  const content = `import { SiteConfig } from './types.js'

export const config: SiteConfig = {
  title: '${title}',
  hero: {
    name: '${hero.name}',
    role: '${hero.role}',
    bio: '${hero.bio}',
    links: {
      resume: '${hero.links.resume}',
      github: '${hero.links.github}',
      linkedin: '${hero.links.linkedin}',
      email: '${hero.links.email}',
    },
  },
}
`
  fs.writeFileSync(configPath, content)
}

export function build() {
  const result = spawnSync('npm', ['run', 'build'], { cwd: rootDir, stdio: 'inherit' })
  if (result.status !== 0) {
    throw new Error('Build failed')
  }
  return { message: 'Build complete' }
}
