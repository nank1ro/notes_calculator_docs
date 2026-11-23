// A table of values (app 2.15) as the app shows it when its "N values"
// result is open: the table in a frame and, when it plots as one line, its
// graph beside it. Static HTML and SVG, no script: hovering a dot shows its
// row through the SVG title. The data comes from the app's own engine (see
// scripts/export-example-notes.mjs), never from this file.
//
// The same module lives in the website repo (src/utils/value-table.mjs);
// keep the two copies the same.

const W = 300
const H = 200
// The y numbers' column, the gap after the plot, the y name's row and the x
// numbers' row (the app's graph: 40, 8, 18 and 22 px).
const LEFT = 40
const RIGHT = 8
const TOP = 18
const BOTTOM = 22
const FONT = 11
// Geist at 11 px: about 6.2 px a character (an estimate for collisions).
const CHAR = 6.2

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function round(value) {
  return Math.round(value * 100) / 100
}

/** `name (unit)`, or the name alone without a unit. */
function named(name, unit) {
  return unit ? `${name} (${unit})` : name
}

/** The table's graph as an SVG string, or '' when it has none. */
export function graphSvg(table) {
  const graph = table.graph
  if (!graph) return ''
  const { minX, maxX, minY, maxY, xStep, yStep } = graph.axes
  const plotW = W - LEFT - RIGHT
  const plotH = H - TOP - BOTTOM
  const px = (x) => round(LEFT + ((x - minX) / (maxX - minX || 1)) * plotW)
  const py = (y) => round(TOP + ((maxY - y) / (maxY - minY || 1)) * plotH)
  const eps = (step) => step * 1e-9
  const parts = []

  // The grid, as in a maths book: at the y numbers only.
  for (const [k, label] of Object.entries(graph.yTicks)) {
    const y = Number(k) * yStep
    if (y < minY - eps(yStep) || y > maxY + eps(yStep)) continue
    if (y > minY + eps(yStep)) {
      parts.push(`<line class="value-graph__grid" x1="${LEFT}" x2="${W - RIGHT}" y1="${py(y)}" y2="${py(y)}"/>`)
    }
    parts.push(`<text class="value-graph__tick" x="${LEFT - 6}" y="${round(py(y) + FONT / 3)}" text-anchor="end">${escapeHtml(label)}</text>`)
  }

  // The axes: through zero, else along the edge their numbers are on.
  const axisY = minY <= 0 && maxY >= 0 ? 0 : minY
  const axisX = minX <= 0 && maxX >= 0 ? 0 : minX
  parts.push(`<line class="value-graph__axis" x1="${LEFT}" x2="${W - RIGHT}" y1="${py(axisY)}" y2="${py(axisY)}"/>`)
  parts.push(`<line class="value-graph__axis" x1="${px(axisX)}" x2="${px(axisX)}" y1="${TOP}" y2="${TOP + plotH}"/>`)

  // The x numbers, with the x name at the end of their row: a number it
  // would cover is left out.
  const xName = named(table.variable, graph.xUnit)
  const nameStart = W - RIGHT - xName.length * CHAR - 6
  const row = TOP + plotH + 15
  for (const [k, label] of Object.entries(graph.xTicks)) {
    const x = Number(k) * xStep
    if (x < minX - eps(xStep) || x > maxX + eps(xStep)) continue
    if (px(x) + (label.length * CHAR) / 2 > nameStart) continue
    parts.push(`<text class="value-graph__tick" x="${px(x)}" y="${row}" text-anchor="middle">${escapeHtml(label)}</text>`)
  }
  parts.push(`<text class="value-graph__name" x="${W - RIGHT}" y="${row}" text-anchor="end">${escapeHtml(xName)}</text>`)

  // The y name tops the vertical axis, kept inside the graph.
  const yName = named(table.header, graph.yUnit)
  const half = (yName.length * CHAR) / 2
  const yNameX = round(Math.min(Math.max(px(axisX), half), W - half))
  parts.push(`<text class="value-graph__name" x="${yNameX}" y="${FONT}" text-anchor="middle">${escapeHtml(yName)}</text>`)

  // The function's line, stretch by stretch: a gap where it has no value.
  const path = graph.segments
    .filter((s) => s.length > 1)
    .map((s) => s.map(([x, y], i) => `${i ? 'L' : 'M'}${px(x)} ${py(y)}`).join(''))
    .join('')
  if (path) parts.push(`<path class="value-graph__line" d="${path}"/>`)

  // A dot per row, up to 40; hovering one shows its row.
  if (graph.points.length <= 40) {
    for (const [x, y, rowIndex] of graph.points) {
      if (y == null) continue
      const [cellX, cellY] = table.rows[rowIndex] ?? [String(x), String(y)]
      const title = `${table.variable} = ${cellX}, ${table.header} = ${cellY}`
      parts.push(`<circle class="value-graph__dot" cx="${px(x)}" cy="${py(y)}" r="4"><title>${escapeHtml(title)}</title></circle>`)
    }
  }

  const label = `Graph of ${table.header} for ${table.variable}`
  return `<svg class="value-graph" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${escapeHtml(label)}">${parts.join('')}</svg>`
}

/** The table in its frame: one column when it lists the variable alone. */
export function tableHtml(table) {
  const head = table.oneColumn
    ? `<tr><th scope="col">${escapeHtml(table.variable)}</th></tr>`
    : `<tr><th scope="col">${escapeHtml(table.variable)}</th><th scope="col">${escapeHtml(table.header)}</th></tr>`
  const body = table.rows
    .map(([x, y]) => table.oneColumn
      ? `<tr><td>${escapeHtml(x)}</td></tr>`
      : `<tr><td>${escapeHtml(x)}</td><td>${escapeHtml(y)}</td></tr>`)
    .join('')
  return `<table class="value-table"><thead>${head}</thead><tbody>${body}</tbody></table>`
}

/** The open result: the table and, beside it, its graph. */
export function valueTableHtml(table) {
  return `<div class="value-table-panel">${tableHtml(table)}${graphSvg(table)}</div>`
}
