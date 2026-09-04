import { Post } from './types.js'
import { config } from './config.js'
import { html, typeIcon } from './template.js'

export function renderIndex(posts: Post[]): string {
  const { hero } = config

  const sorted = [...posts].sort((a, b) => {
    const aHasOrder = typeof a.order === 'number'
    const bHasOrder = typeof b.order === 'number'
    if (aHasOrder && !bHasOrder) return -1
    if (!aHasOrder && bHasOrder) return 1
    if (aHasOrder && bHasOrder) return a.order! - b.order!
    return a.slug.localeCompare(b.slug)
  })

  const linkClass = 'flex items-center gap-4 text-gray-700 hover:text-gray-900 transition-all'
  const iconClass = 'w-6 h-6 grayscale transition-all duration-200'
  const linkIconClass = 'group-hover:saturate-100 group-hover:scale-110'

  const body = `
    <header class="mb-12">
      <h1 class="text-4xl font-bold mb-2">${hero.name}</h1>
      <p class="text-xl text-gray-600 mb-3">${hero.role}</p>
      <p class="text-gray-700 mb-6">${hero.bio}</p>
      <nav class="flex flex-wrap gap-6">
        <a href="${hero.links.resume}" class="group ${linkClass}" title="Resume">
          <img src="/static/icons/resume.svg" alt="" class="${iconClass} ${linkIconClass}" />
        </a>
        <a href="${hero.links.github}" target="_blank" rel="noopener noreferrer" class="group ${linkClass}" title="GitHub">
          <img src="/static/icons/gh.svg" alt="" class="${iconClass} ${linkIconClass}" />
        </a>
        <a href="${hero.links.linkedin}" target="_blank" rel="noopener noreferrer" class="group ${linkClass}" title="LinkedIn">
          <img src="/static/icons/linkedin.svg" alt="" class="${iconClass} ${linkIconClass}" />
        </a>
        <button onclick="copyEmail('${hero.links.email}')" class="group ${linkClass} cursor-pointer" title="Copy email">
          <img src="/static/icons/mail.svg" alt="" class="${iconClass} ${linkIconClass}" />
          <span id="email-label"> </span>
        </button>
      </nav>
      <script>
        function copyEmail(email) {
          navigator.clipboard.writeText(email).then(() => {
            const label = document.getElementById('email-label');
            label.textContent = email + ' (copied.)';
          });
        }
      </script>
    </header>
    <div class="flex gap-2 mb-8 justify-end">
      <button class="filter-btn px-3 py-1 text-sm rounded-full transition-colors data-[active=true]:bg-gray-800 data-[active=true]:text-white data-[active=false]:bg-gray-100 data-[active=false]:text-gray-700 hover:bg-gray-200" data-filter="all">All</button>
      <button class="filter-btn px-3 py-1 text-sm rounded-full transition-colors data-[active=true]:bg-gray-800 data-[active=true]:text-white data-[active=false]:bg-gray-100 data-[active=false]:text-gray-700 hover:bg-gray-200" data-filter="dev" data-active="true">Dev</button>
      <button class="filter-btn px-3 py-1 text-sm rounded-full transition-colors data-[active=true]:bg-gray-800 data-[active=true]:text-white data-[active=false]:bg-gray-100 data-[active=false]:text-gray-700 hover:bg-gray-200" data-filter="design">Design</button>
    </div>
    <section class="space-y-6">
      ${sorted.map(post => `
        <article data-type="${post.type}">
          <h2 class="text-xl font-semibold">
            <a href="/post/${post.slug}/index.html" class="hover:underline">${post.title}</a>
          </h2>
          <p class="line-clamp-2 text-sm text-gray-600 mt-1">${post.description}</p>
          <div class="flex items-center flex-wrap gap-2 mt-2">
            ${typeof post.order === 'number' ? `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400" title="Pinned"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path></svg>` : ''}
            ${typeIcon(post.type)}
            ${post.tags.length > 0 ? post.tags.map(tag => `<span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">${tag}</span>`).join('') : ''}
          </div>
        </article>
      `).join('\n\n')}
    </section>
    <script>
      (function() {
        const filterPosts = (filter) => {
          document.querySelectorAll('article[data-type]').forEach(article => {
            const show = filter === 'all' || article.dataset.type === filter
            article.classList.toggle('hidden', !show)
          })
        }
        filterPosts('dev')
        document.querySelectorAll('.filter-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const filter = btn.dataset.filter
            document.querySelectorAll('.filter-btn').forEach(b => b.dataset.active = 'false')
            btn.dataset.active = 'true'
            filterPosts(filter)
          })
        })
      })()
    </script>
  `.trim()

  return html(config.title, body)
}
