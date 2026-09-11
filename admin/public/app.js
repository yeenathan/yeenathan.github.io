let cur = null

async function api(path, method = 'GET', body) {
  const r = await fetch('/api/' + path, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined
  })
  if (!r.ok) throw await r.text()
  return r.json()
}

async function loadPosts() {
  const posts = await api('posts')
  document.getElementById('post-list').innerHTML = posts.map(p =>
    `<div class="flex justify-between items-center bg-white border p-3 rounded">
      <span>${p.title} <span class="text-gray-400 text-sm">(${p.type})</span></span>
      <button onclick="edit('${p.slug}')" class="px-2 py-0.5 bg-gray-800 text-white rounded text-sm">edit</button>
    </div>`
  ).join('')
}

async function edit(slug) {
  cur = slug
  const p = await api('posts/' + slug)
  document.getElementById('f-title').value = p.title
  document.getElementById('f-desc').value = p.description
  document.getElementById('f-type').value = p.type
  document.getElementById('f-order').value = p.order || ''
  document.getElementById('f-tags').value = p.tags.join(', ')
  document.getElementById('f-body').value = p.body
  document.getElementById('posts').classList.add('hidden')
  document.getElementById('editor').classList.remove('hidden')
  document.getElementById('del-btn').classList.remove('hidden')
}

function newPost() {
  cur = null
  ;['f-title','f-desc','f-tags','f-body','f-order'].forEach(id => document.getElementById(id).value = '')
  document.getElementById('f-type').value = 'dev'
  document.getElementById('posts').classList.add('hidden')
  document.getElementById('editor').classList.remove('hidden')
  document.getElementById('del-btn').classList.add('hidden')
}

function back() {
  document.getElementById('editor').classList.add('hidden')
  document.getElementById('posts').classList.remove('hidden')
  loadPosts()
}

async function savePost() {
  const slug = cur || slugify(document.getElementById('f-title').value)
  const data = {
    slug,
    title: document.getElementById('f-title').value,
    description: document.getElementById('f-desc').value,
    type: document.getElementById('f-type').value,
    order: document.getElementById('f-order').value || undefined,
    tags: document.getElementById('f-tags').value.split(',').map(t => t.trim()).filter(Boolean),
    body: document.getElementById('f-body').value
  }
  await api(cur ? 'posts/' + slug : 'posts', cur ? 'PUT' : 'POST', data)
  status('saved')
  back()
}

async function delPost() {
  if (!confirm('delete?')) return
  await api('posts/' + cur, 'DELETE')
  back()
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

async function loadConfig() {
  const c = await api('config')
  document.getElementById('c-title').value = c.title
  document.getElementById('c-name').value = c.hero.name
  document.getElementById('c-role').value = c.hero.role
  document.getElementById('c-bio').value = c.hero.bio
  document.getElementById('c-email').value = c.hero.links.email
  document.getElementById('c-resume').value = c.hero.links.resume
  document.getElementById('c-github').value = c.hero.links.github
  document.getElementById('c-linkedin').value = c.hero.links.linkedin
}

async function saveConfig() {
  const g = id => document.getElementById(id).value
  await api('config', 'PUT', {
    title: g('c-title'),
    hero: {
      name: g('c-name'), role: g('c-role'), bio: g('c-bio'),
      links: { email: g('c-email'), resume: g('c-resume'), github: g('c-github'), linkedin: g('c-linkedin') }
    }
  })
  status('config saved')
}

async function doBuild() {
  status('building...')
  const r = await api('build', 'POST')
  status(r.message)
}

function status(msg) {
  const el = document.getElementById('status')
  el.textContent = msg
  el.classList.remove('hidden')
}

window.edit = edit
window.newPost = newPost
window.back = back
window.savePost = savePost
window.delPost = delPost
window.saveConfig = saveConfig
window.doBuild = doBuild

loadPosts()
loadConfig()
