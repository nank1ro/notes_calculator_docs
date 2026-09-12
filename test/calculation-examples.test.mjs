import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import vm from 'node:vm'

import {
  parseCalculationFence,
  remarkCalculationExamples,
  renderCalculationFrame,
} from '../src/plugins/calculation-examples.mjs'

test('parses the rightmost whitespace-delimited result separator', () => {
  assert.deepEqual(
    parseCalculationFence('5 | 3       | 7\ntrue || false | true'),
    [
      { input: '5 | 3', result: '7' },
      { input: 'true || false', result: 'true' },
    ],
  )
})

test('preserves blank rows, blank answers, and zero answers', () => {
  assert.deepEqual(parseCalculationFence('# Heading |\n\n0 | 0'), [
    { input: '# Heading', result: null },
    null,
    { input: '0', result: '0' },
  ])
  assert.deepEqual(parseCalculationFence('total ? 1 : 2 |\n0/0 ? 1 : 2 |'), [
    { input: 'total ? 1 : 2', result: null },
    { input: '0/0 ? 1 : 2', result: null },
  ])
})

test('leaves templates, formulas, and language-tagged code alone', () => {
  assert.equal(parseCalculationFence('name = value\nname * 2'), null)
  assert.equal(parseCalculationFence('a | b'), null)
  assert.equal(parseCalculationFence('1 + 1 | 2', 'text'), null)
})

test('renders static accessible HTML with only inputs selectable for copy', () => {
  const html = renderCalculationFrame([
    { input: '<hours> = 2', result: '2' },
    { input: '// note', result: null },
  ])

  assert.match(html, /<figure class="calculation-example"/)
  assert.match(html, /aria-label="Calculation example"/)
  assert.match(html, /data-copy-text="&lt;hours&gt; = 2&#10;\/\/ note"/)
  assert.match(html, /<span class="calculation-example__line" aria-hidden="true">1<\/span>/)
  assert.match(html, /&lt;hours&gt;/)
  assert.doesNotMatch(html, />\s*\|\s*</)
})

test('uses shared identifier context and keeps uppercase units out of currency styling', () => {
  const html = renderCalculationFrame([
    { input: 'hourly rate = 50', result: '50' },
    { input: 'hourly rate * 2', result: '100' },
    { input: '2 GB in MB', result: '2,000 MB' },
  ])

  assert.equal((html.match(/class="tk-variable"/g) ?? []).length, 2)
  assert.match(html, /<span class="tk-unit">GB<\/span>/)
  assert.match(html, /<span class="tk-unit">MB<\/span>/)
})

test('styles an entire comment line even when it contains a colon', () => {
  const html = renderCalculationFrame([
    { input: '// Variables: this whole line is ignored', result: null },
  ])

  assert.match(html, /<span class="tk-comment">\/\/ Variables: this whole line is ignored<\/span>/)
  assert.doesNotMatch(html, /class="tk-label"/)
})

test('does not discover variables inside annotation labels', () => {
  const html = renderCalculationFrame([
    { input: '// Example: bogus = 1', result: null },
    { input: 'bogus + 1', result: '2' },
  ])

  assert.doesNotMatch(html, /class="tk-variable"/)
})

test('styles line-reference spellings case-insensitively', () => {
  const html = renderCalculationFrame([
    { input: 'line1 + L1 + LINE1 + Line1 + l1', result: '5' },
  ])

  assert.equal((html.match(/class="tk-line-ref"/g) ?? []).length, 5)
})

test('styles natural-language arithmetic operators as whole keyword phrases', () => {
  const html = renderCalculationFrame([
    { input: '2 multiplied by 3', result: '6' },
    { input: '8 divided by 2', result: '4' },
    { input: '2 to the power of 3', result: '8' },
    { input: '2 MULTIPLIED BY 3', result: '6' },
  ])

  assert.match(html, /<span class="tk-number">2<\/span> <span class="tk-keyword">multiplied by<\/span> <span class="tk-number">3<\/span>/)
  assert.match(html, /<span class="tk-number">8<\/span> <span class="tk-keyword">divided by<\/span> <span class="tk-number">2<\/span>/)
  assert.match(html, /<span class="tk-number">2<\/span> <span class="tk-keyword">to the power of<\/span> <span class="tk-number">3<\/span>/)
  assert.match(html, /<span class="tk-keyword">MULTIPLIED BY<\/span>/)
})

test('keeps declarations, comments, and longer identifiers ahead of phrase highlighting', () => {
  const html = renderCalculationFrame([
    { input: 'multiplied by = 3', result: '3' },
    { input: 'multiplied by + 1', result: '4' },
    { input: '// 2 multiplied by 3', result: null },
    { input: 'premultiplied byproduct', result: null },
  ])

  assert.equal((html.match(/<span class="tk-variable">multiplied by<\/span>/g) ?? []).length, 2)
  assert.match(html, /<span class="tk-comment">\/\/ 2 multiplied by 3<\/span>/)
  assert.match(html, />premultiplied byproduct<\/code>/)
  assert.doesNotMatch(html, /<span class="tk-keyword">multiplied by<\/span>/)
})

test('matches native root and long-form percentage quirks', () => {
  const html = renderCalculationFrame([
    { input: 'square root of 16', result: '4' },
    { input: 'cube root of -27', result: '-3' },
    { input: '20 as a % of 200', result: '10%' },
    { input: '20 AS A % OF 200', result: '10%' },
  ])

  assert.match(html, />square root <span class="tk-keyword">of<\/span> <span class="tk-number">16<\/span><\/code>/)
  assert.match(html, />cube root <span class="tk-keyword">of<\/span> <span class="tk-operator">-<\/span><span class="tk-number">27<\/span><\/code>/)
  assert.doesNotMatch(html, /class="tk-function">(?:square|cube) root/)
  assert.match(html, /<span class="tk-keyword">as<\/span> <span class="tk-builtin">a<\/span> <span class="tk-operator">%<\/span>/)
  assert.match(html, /<span class="tk-keyword">AS<\/span> A <span class="tk-operator">%<\/span>/)
})

test('keeps lowercase a native-styled in the published parenthetical example', () => {
  const html = renderCalculationFrame([
    { input: '1 (a (b) c) + 1', result: '2' },
  ])

  assert.match(html, /\(<span class="tk-builtin">a<\/span> \(/)
})

test('keeps percentage query words as separate native keyword spans', () => {
  const html = renderCalculationFrame([
    { input: '50 to 75 is what %', result: '50%' },
    { input: '180 is what % off 200', result: '10%' },
    { input: '20/200 as %', result: '10%' },
  ])

  assert.match(html, /<span class="tk-number">50<\/span> <span class="tk-keyword">to<\/span> <span class="tk-number">75<\/span> <span class="tk-keyword">is<\/span> <span class="tk-keyword">what<\/span> <span class="tk-operator">%<\/span>/)
  assert.match(html, /<span class="tk-number">180<\/span> <span class="tk-keyword">is<\/span> <span class="tk-keyword">what<\/span> <span class="tk-operator">%<\/span> <span class="tk-keyword">off<\/span> <span class="tk-number">200<\/span>/)
  assert.match(html, /<span class="tk-number">20<\/span><span class="tk-operator">\/<\/span><span class="tk-number">200<\/span> <span class="tk-keyword">as<\/span> <span class="tk-operator">%<\/span>/)
})

test('remark transformer replaces only qualifying code fences', () => {
  const tree = {
    type: 'root',
    children: [
      { type: 'code', lang: null, value: '1 + 1     | 2' },
      { type: 'code', lang: null, value: 'copy this template' },
    ],
  }

  remarkCalculationExamples()(tree)

  assert.equal(tree.children[0].type, 'html')
  assert.equal(tree.children[1].type, 'code')
})

test('stylesheet includes app palettes, responsive wrapping, and copy isolation', async () => {
  const css = await readFile(new URL('../src/styles/calculation-examples.css', import.meta.url), 'utf8')

  assert.match(css, /--calc-bg:\s*#020817/i)
  assert.match(css, /--calc-number:\s*#93c5fd/i)
  assert.match(css, /--calc-variable:\s*#fdba74/i)
  assert.match(css, /--calc-unit:\s*#c4b5fd/i)
  assert.match(css, /--calc-bg:\s*#fff(?:fff)?/i)
  assert.match(css, /\.tk-comment\s*\{\s*color:\s*var\(--calc-operator\)/)
  assert.match(css, /\.calculation-example table\s*\{[^}]*display:\s*table/s)
  assert.match(css, /overflow-wrap:\s*anywhere/)
  assert.match(css, /\.calculation-example__result\s*\{[^}]*user-select:\s*none/s)
  assert.match(css, /\.calculation-example__line\s*\{[^}]*user-select:\s*none/s)
  assert.match(css, /@media\s*\(max-width:/)
})

async function copyHarness(writeText) {
  const source = await readFile(new URL('../public/calculation-examples.js', import.meta.url), 'utf8')
  const timers = new Map()
  const attributes = new Map([['aria-label', 'Copy calculation inputs']])
  const button = {
    dataset: { copyText: '1 + 1' },
    textContent: 'Copy',
    setAttribute(name, value) { attributes.set(name, value) },
  }
  let clickHandler
  let nextTimer = 1
  vm.runInNewContext(source, {
    document: {
      addEventListener(type, handler) {
        if (type === 'click') clickHandler = handler
      },
    },
    navigator: { clipboard: { writeText } },
    window: {
      clearTimeout(id) { timers.delete(id) },
      setTimeout(callback) {
        const id = nextTimer++
        timers.set(id, callback)
        return id
      },
    },
  })

  return {
    attributes,
    button,
    timers,
    click: () => clickHandler({ target: { closest: () => button } }),
  }
}

test('copy feedback resets from the original label after rapid clicks', async () => {
  const harness = await copyHarness(async () => {})

  await harness.click()
  await harness.click()

  assert.equal(harness.button.textContent, 'Copied')
  assert.equal(harness.timers.size, 1)
  harness.timers.values().next().value()
  assert.equal(harness.button.textContent, 'Copy')
  assert.equal(harness.attributes.get('aria-label'), 'Copy calculation inputs')
})

test('copy failure updates the visible and accessible labels', async () => {
  const harness = await copyHarness(async () => { throw new Error('denied') })

  await harness.click()

  assert.equal(harness.button.textContent, 'Select inputs to copy')
  assert.equal(harness.attributes.get('aria-label'), 'Select calculation inputs to copy')
})

test('conditional prose describes the native missing-else result', async () => {
  const markdown = await readFile(new URL('../src/content/docs/syntax/conditionals.md', import.meta.url), 'utf8')

  assert.match(markdown, /With no `else`, a false condition gives `false`\./)
  assert.doesNotMatch(markdown, /With no `else`, a false condition gives `0`\./)
})

test('timezone docs demonstrate the native Auckland day shift', async () => {
  const markdown = await readFile(new URL('../src/content/docs/features/dates_and_times.md', import.meta.url), 'utf8')

  assert.match(markdown, /now in Auckland\s+\| 04\/23\/2026 00:00/)
  assert.doesNotMatch(markdown, /At this chapter's assumed time, Tokyo remains/)
})
