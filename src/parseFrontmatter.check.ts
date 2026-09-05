// Run: npx tsx src/parseFrontmatter.check.ts
import assert from 'node:assert'
import { parseFrontmatter, parsePost } from './parseMarkdown.js'

const sample = `---
title: "Remedify"
description: "AI-powered medication reminder app"
type: "dev"
tags:
  - React Native
  - OCR
order: 1 
---

# body
`

const { data, body } = parseFrontmatter(sample)
assert.strictEqual(data.title, 'Remedify')
assert.strictEqual(data.description, 'AI-powered medication reminder app')
assert.strictEqual(data.type, 'dev')
assert.deepStrictEqual(data.tags, ['React Native', 'OCR'])
assert.strictEqual(String(data.order).trim(), '1')
assert.ok(body.startsWith('\n# body'))

// no front matter -> empty data, body untouched
const plain = 'just a body'
const p = parseFrontmatter(plain)
assert.deepStrictEqual(p.data, {})
assert.strictEqual(p.body, plain)

// no tags key
const noTags = parseFrontmatter('---\ntitle: "X"\n---\nbody')
assert.strictEqual(noTags.data.tags, undefined)

// parsePost: numeric order kept, non-numeric order ignored (not NaN)
const base = '---\ntitle: "X"\ndescription: "d"\ntype: "dev"\n'
assert.strictEqual(parsePost(base + 'order: 2\n---\nbody', 'x').order, 2)
assert.strictEqual(parsePost(base + 'order: one\n---\nbody', 'x').order, undefined)

console.log('parseFrontmatter checks passed')
