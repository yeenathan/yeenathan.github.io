export interface Post {
  slug: string
  title: string
  description: string
  type: 'dev' | 'design'
  tags: string[]
  order?: number
  html: string
}

export interface HeroConfig {
  name: string
  role: string
  bio: string
  links: {
    resume: string
    github: string
    linkedin: string
    email: string
  }
}

export interface SiteConfig {
  title: string
  author: string
  url: string
  hero: HeroConfig
}
