import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { extname, resolve } from 'node:path'
import test from 'node:test'

const root = resolve(import.meta.dirname, '..')

function contentFiles(directory) {
  return readdirSync(resolve(root, directory), { withFileTypes: true }).flatMap(
    (entry) => {
      const path = `${directory}/${entry.name}`
      if (entry.isDirectory()) return contentFiles(path)
      return ['.md', '.mdx'].includes(extname(entry.name)) ? [path] : []
    },
  )
}

test('published documentation does not use em dashes', () => {
  for (const path of [...contentFiles('src/content/docs'), 'public/llms.txt']) {
    assert.doesNotMatch(readFileSync(resolve(root, path), 'utf8'), /—/u, path)
  }
})
