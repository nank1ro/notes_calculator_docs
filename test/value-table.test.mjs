import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'

import { EXAMPLE_TABLES, exampleKey, parseCalculationFence, renderCalculationFrame } from '../src/plugins/calculation-examples.mjs'
import { graphSvg, tableHtml } from '../src/plugins/value-table.mjs'

// As the app's engine writes it (scripts/export-example-notes.mjs, then
// textcalc's tool/docs_examples_check_test.dart).
const parabola = {
  variable: 'x',
  header: 'f(x)',
  oneColumn: false,
  rows: [['-2', '4'], ['-1', '1'], ['0', '0'], ['1', '1'], ['2', '4']],
  graph: {
    points: [[-2, 4, 0], [-1, 1, 1], [0, 0, 2], [1, 1, 3], [2, 4, 4]],
    segments: [[[-2, 4], [-1, 1], [0, 0], [1, 1], [2, 4]]],
    axes: { minX: -2, maxX: 2, minY: 0, maxY: 4.32, xStep: 1, yStep: 2 },
    xTicks: { '-2': '-2', '-1': '-1', 0: '0', 1: '1', 2: '2' },
    yTicks: { 0: '0', 1: '2', 2: '4' },
    xUnit: '',
    yUnit: '',
  },
}

test('the graph draws the line, a dot per row and the axis names', () => {
  const svg = graphSvg(parabola)
  assert.match(svg, /^<svg class="value-graph"/)
  assert.match(svg, /aria-label="Graph of f\(x\) for x"/)
  assert.equal(svg.match(/<path class="value-graph__line"/g).length, 1)
  assert.equal(svg.match(/<circle /g).length, 5)
  assert.match(svg, /<title>x = -2, f\(x\) = 4<\/title>/)
  assert.match(svg, />f\(x\)<\/text>/)
  assert.match(svg, />x<\/text>/)
})

test('grid lines sit at the y numbers only, none at the padded top', () => {
  const svg = graphSvg(parabola)
  // 2 and 4: 0 is the axis, 4.32 (the top) is no number.
  assert.equal(svg.match(/class="value-graph__grid"/g).length, 2)
})

test('an x number the x name would cover is left out', () => {
  const svg = graphSvg({ ...parabola, graph: { ...parabola.graph, xUnit: 'seconds' } })
  assert.match(svg, />x \(seconds\)<\/text>/)
  assert.doesNotMatch(svg, /text-anchor="middle">2<\/text>/)
  assert.match(svg, /text-anchor="middle">-2<\/text>/)
})

test('a gap breaks the line: 1/x never joins its two sides', () => {
  const svg = graphSvg({
    ...parabola,
    header: '1/x',
    graph: {
      ...parabola.graph,
      points: [[-1, -1, 0], [0, null, 1], [1, 1, 2]],
      segments: [[[-1, -1], [-0.2, -5]], [[0.2, 5], [1, 1]]],
      axes: { minX: -1, maxX: 1, minY: -5, maxY: 5, xStep: 0.5, yStep: 2 },
    },
  })
  const d = svg.match(/d="([^"]+)"/)[1]
  assert.equal(d.match(/M/g).length, 2)
  // No dot for the empty row.
  assert.equal(svg.match(/<circle /g).length, 2)
})

test('the variable alone: one column, no graph', () => {
  const table = { variable: 'x', header: 'x', oneColumn: true, rows: [['1', '1'], ['2', '2']], graph: null }
  assert.equal(graphSvg(table), '')
  assert.equal(tableHtml(table).match(/<td>/g).length, 2)
})

test('a table line shows its chip, and its table and graph open under it', () => {
  const rows = parseCalculationFence('f(x) = x^2               |\nf(x) for x from -2 to 2   | 5 values')
  const html = renderCalculationFrame(rows, { [rows.map((r) => r.input).join('\n')]: [null, parabola] })
  assert.match(html, /<input type="checkbox" class="value-table-toggle" checked/)
  assert.match(html, /5 values/)
  const line = html.indexOf('f(x) for x from')
  const panel = html.indexOf('class="value-table-panel"')
  assert.ok(line > 0 && panel > line)
  assert.match(html, /<tr class="calculation-example__values"><td colspan="2">/)
})

test('an example without tables renders as before', () => {
  const rows = parseCalculationFence('1 + 1 | 2')
  assert.equal(renderCalculationFrame(rows, {}), renderCalculationFrame(rows))
  assert.doesNotMatch(renderCalculationFrame(rows), /value-table/)
})

const DOCS = new URL('../src/content/docs/', import.meta.url).pathname

function* pages(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* pages(path)
    else if (/\.mdx?$/.test(entry.name)) yield path
  }
}

/** The "page: row" of every "N values" result with no table in `tables`. */
function missingTables(tables) {
  const missing = []
  for (const page of pages(DOCS)) {
    const source = readFileSync(page, 'utf8')
    for (const match of source.matchAll(/^```([^\n]*)\n([\s\S]*?)^```/gm)) {
      const lang = match[1].trim().split(/\s+/)[0] || null
      const rows = parseCalculationFence(match[2].replace(/\n$/, ''), lang)
      rows?.forEach((row, index) => {
        if (row?.result && /^\d+ values?$/.test(row.result) && !tables[exampleKey(rows)]?.[index]) {
          missing.push(`${page}: ${row.input}`)
        }
      })
    }
  }
  return missing
}

test('every "N values" example in the pages has generated table data', () => {
  assert.deepEqual(missingTables(EXAMPLE_TABLES), [])
})

test('the missing-data check reports a table that has no data', () => {
  assert.ok(missingTables({}).length > 0)
})
