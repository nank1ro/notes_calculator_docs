// Writes .tmp/example-notes.json: every calculation example of the docs that
// has a table of values (a result such as "9 values"), with its lines and
// written results, for the app's engine to work out the tables and graphs
// and check the results. Then, in the textcalc
// repo, run `TZ=UTC flutter test tool/docs_examples_check_test.dart` and copy
// .tmp/example-tables.json to src/data/example-tables.json.
// An example reads the comma as the decimal point when one of its comments
// says so ("// With the comma as the decimal point").
// Run: node scripts/export-example-notes.mjs
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { exampleKey, parseCalculationFence } from '../src/plugins/calculation-examples.mjs'

const DOCS = new URL('../src/content/docs/', import.meta.url).pathname
const TABLE_RESULT = /^\d+ values?$/
const COMMA = /^\s*\/\/.*comma as the decimal point/i

function* pages(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* pages(path)
    else if (/\.mdx?$/.test(entry.name)) yield path
  }
}

function* fences(source) {
  const fence = /^```([^\n]*)\n([\s\S]*?)^```/gm
  for (const match of source.matchAll(fence)) {
    yield { lang: match[1].trim().split(/\s+/)[0] || null, value: match[2].replace(/\n$/, '') }
  }
}

const examples = []
for (const page of pages(DOCS)) {
  for (const { lang, value } of fences(readFileSync(page, 'utf8'))) {
    const rows = parseCalculationFence(value, lang)
    if (!rows?.some((row) => row?.result && TABLE_RESULT.test(row.result))) continue
    examples.push({
      id: exampleKey(rows),
      lines: rows.map((row) => row?.input ?? ''),
      results: rows.map((row) => row?.result ?? null),
      comma: rows.some((row) => row && COMMA.test(row.input)),
    })
  }
}
mkdirSync(new URL('../.tmp/', import.meta.url), { recursive: true })
writeFileSync(new URL('../.tmp/example-notes.json', import.meta.url), JSON.stringify({ examples }, null, 1))
console.log(examples.length, 'examples with a table of values')
