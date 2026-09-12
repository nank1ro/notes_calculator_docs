const KEYWORDS = new Set([
  'in', 'as', 'to', 'into', 'hex', 'binary', 'octal', 'scientific', 'fixed', 'decimal',
  'iso', 'iso8601', 'unix', 'timestamp', 'difference', 'between', 'time', 'date',
  'total', 'previous', 'prev', 'sum', 'avg', 'average', 'median', 'stddev',
  'if', 'unless', 'then', 'else', 'and', 'or', 'not', 'xor', 'plus', 'minus', 'mod',
  'rounded', 'up', 'down', 'nearest', 'hundred', 'thousand', 'million', 'dp', 'digits',
  'of', 'off', 'on', 'is', 'what', 'true', 'false',
])

const FUNCTIONS = new Set([
  'min', 'max', 'clamp', 'log', 'hypot', 'gcd', 'lcm', 'sqrt', 'cbrt', 'abs',
  'round', 'ceil', 'floor', 'sin', 'cos', 'tan', 'ln', 'log2', 'log10', 'acos',
  'asin', 'atan', 'csc', 'sec', 'cot', 'exp', 'fact', 'pi', 'sqrt2', 'sqrt3',
])

const BUILTINS = new Set([
  'today', 'tomorrow', 'yesterday', 'now', 'monday', 'tuesday', 'wednesday',
  'thursday', 'friday', 'saturday', 'sunday', 'january', 'february', 'march',
  'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november',
  'december', 'next', 'last', 'day', 'days', 'week', 'weeks', 'hour', 'hours',
  'minute', 'minutes', 'second', 'seconds', 'month', 'months', 'year', 'years',
  'am', 'pm', 'utc', 'gmt',
])

const CURRENCIES = new Set([
  'dollar', 'dollars', 'euro', 'euros', 'euri', 'yen', 'pound', 'pounds',
  'sterling', 'sterlings', 'kuai', 'renminbi', 'krona', 'kronor', 'usd', 'eur',
  'gbp', 'btc', 'eth',
])

// This covers the published examples without copying the app's parser catalogue
// into the docs build.
const UNITS = new Set([
  'degree', 'degrees', 'radian', 'radians', 'rad', 'meter', 'meters', 'metre',
  'metres', 'm', 'centimeter', 'centimeters', 'cm', 'millimeter', 'millimeters',
  'mm', 'kilometer', 'kilometers', 'km', 'mile', 'miles', 'foot', 'feet', 'ft',
  'inch', 'inches', 'kg', 'g', 'gram', 'grams', 'pounds', 'day', 'days', 'week',
  'weeks', 'seconds', 'gb', 'mb', 'tb', 'kib', 'mib', 'gib', 'w', 'kw', 'n',
  'kcal', 'cal', 'dyne', 'liters', 'liter', 'ml', 'hectares', 'acres', 'gallons',
  'fahrenheit', 'celsius',
])

const RESULT_SEPARATOR = /\s\|(?=\s|$)/g

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/\n/g, '&#10;')
}

function span(kind, value) {
  return `<span class="tk-${kind}">${escapeHtml(value)}</span>`
}

function splitResult(line) {
  let separator
  for (const match of line.matchAll(RESULT_SEPARATOR)) separator = match
  if (!separator) return null

  const input = line.slice(0, separator.index).trimEnd()
  if (!input) return null
  const result = line.slice(separator.index + separator[0].length).trim()
  return { input, result: result || null }
}

function isAnnotation(input) {
  return /^\s*(?:\/\/|#{1,6}\s|".*"\s*$)/.test(input)
}

function isPlausibleResult(result) {
  return /\d/.test(result) || /^(?:true|false|NaN|Infinity)$/i.test(result) || /^[A-F]+$/.test(result)
}

function labelOffset(input) {
  if (isAnnotation(input)) return 0
  const label = /^\s*[^:]+?:\s+/.exec(input)
  if (!label || /\?\s+\S/.test(label[0].slice(0, -2))) return 0
  return label[0].length
}

/** Recognise transcripts while leaving ordinary fenced code untouched. */
export function parseCalculationFence(value, lang = null) {
  if (lang) return null

  let sawSeparator = false
  let separatorCount = 0
  let sawResult = false
  let sawAnnotation = false
  const rows = []

  for (const line of value.split('\n')) {
    if (!line.trim()) {
      rows.push(null)
      continue
    }

    const row = splitResult(line)
    if (row) {
      sawSeparator = true
      separatorCount += 1
      sawResult ||= row.result !== null && isPlausibleResult(row.result)
      sawAnnotation ||= row.result === null && isAnnotation(row.input)
      rows.push(row)
      continue
    }

    if (isAnnotation(line)) {
      sawAnnotation = true
      rows.push({ input: line.trimEnd(), result: null })
      continue
    }

    return null
  }

  return sawSeparator && (sawResult || sawAnnotation || separatorCount > 1) ? rows : null
}

function identifierContext(rows) {
  const names = new Set()
  for (const row of rows) {
    if (!row) continue
    const source = row.input.slice(labelOffset(row.input))
    const fn = /^\s*([A-Za-z][A-Za-z0-9_]*)\s*\(([^)]*)\)\s*=/.exec(source)
    if (fn) {
      names.add(fn[1])
      for (const parameter of fn[2].split(',')) {
        const name = parameter.trim()
        if (/^[A-Za-z][A-Za-z0-9_]*$/.test(name)) names.add(name)
      }
      continue
    }
    const variable = /^\s*([A-Za-z][A-Za-z0-9_ ]*?)\s*=(?!=)/.exec(source)
    if (variable) names.add(variable[1].trim())
  }
  return [...names].sort((a, b) => b.length - a.length)
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function tokenRegex(userNames) {
  const user = userNames.length
    ? `(?<![A-Za-z0-9_])(?:${userNames.map(escapeRegExp).join('|')})(?![A-Za-z0-9_])`
    : '(?!)'
  return new RegExp([
    '(?<comment>\\/\\/.*$)',
    '(?<quote>"[^"\\n]*")',
    '(?<base>0[xX][0-9a-fA-F]+|0[bB][01]+|0[oO][0-7]+)',
    `(?<user>${user})`,
    '(?<lineRef>(?:[Ll][Ii][Nn][Ee]|[Ll])\\d+)',
    '(?<number>\\d+(?:_\\d+)*(?:[.,]\\d+)*(?:[eE][+\\-]?\\d+)?(?:[kMGTPEZYRQ](?![A-Za-z]))?[²³⁰¹⁴⁵⁶⁷⁸⁹]?)',
    '(?<currency>[€$¥£₿])',
    '(?<mathSymbol>π|√2|√3)',
    '(?<operator><<|>>|\\*\\*|&&|\\|\\||==|!=|<=|>=|(?<=\\d)x(?=\\d)|(?<![A-Za-z0-9_])x(?![A-Za-z0-9_])|[+\\-*/=÷×^%&|~<>!?])',
    '(?<word>[A-Za-z_][A-Za-z0-9_]*)',
  ].join('|'), 'g')
}

function highlightInput(input, regex) {
  if (/^\s*#{1,6}\s/.test(input)) return span('heading', input)
  if (/^\s*\/\//.test(input)) return span('comment', input)

  const offset = labelOffset(input)
  let output = offset ? span('label', input.slice(0, offset)) : ''
  let cursor = offset
  regex.lastIndex = cursor

  for (const match of input.matchAll(regex)) {
    output += escapeHtml(input.slice(cursor, match.index))
    const { groups } = match
    if (groups.comment || groups.quote) output += span('comment', groups.comment || groups.quote)
    else if (groups.base) output += span('base', groups.base)
    else if (groups.user) output += span('variable', groups.user)
    else if (groups.lineRef) output += span('line-ref', groups.lineRef)
    else if (groups.number) output += span('number', groups.number)
    else if (groups.currency) output += span('currency', groups.currency)
    else if (groups.mathSymbol) output += span('function', groups.mathSymbol)
    else if (groups.operator) output += span('operator', groups.operator)
    else if (groups.word) {
      const lower = groups.word.toLowerCase()
      if (KEYWORDS.has(lower)) output += span('keyword', groups.word)
      else if (CURRENCIES.has(lower)) output += span('currency', groups.word)
      else if (groups.word === 'G' || groups.word === 'e') output += span('function', groups.word)
      else if (FUNCTIONS.has(lower)) output += span('function', groups.word)
      else if (BUILTINS.has(lower)) output += span('builtin', groups.word)
      else if (UNITS.has(lower)) output += span('unit', groups.word)
      else if (/^[A-Z]{3,6}$/.test(groups.word)) output += span('currency', groups.word)
      else output += escapeHtml(groups.word)
    }
    cursor = match.index + match[0].length
  }

  return output + escapeHtml(input.slice(cursor))
}

export function renderCalculationFrame(rows) {
  const inputs = rows.map((row) => row?.input ?? '').join('\n')
  const regex = tokenRegex(identifierContext(rows))
  const body = rows.map((row, index) => {
    const source = row ? highlightInput(row.input, regex) : ''
    const result = row?.result ? escapeHtml(row.result) : ''
    const annotation = row?.result == null ? ' calculation-example__annotation' : ''
    return `<tr class="calculation-example__row${annotation}"><td class="calculation-example__input"><span class="calculation-example__source-wrap"><span class="calculation-example__line" aria-hidden="true">${index + 1}</span><code class="calculation-example__source">${source}</code></span></td><td class="calculation-example__result">${result}</td></tr>`
  }).join('')

  return `<figure class="calculation-example"><div class="calculation-example__titlebar"><img class="calculation-example__app-mark" src="/notes-calculator-icon.png" alt="" width="24" height="24"><span class="calculation-example__title">Notes Calculator</span><button class="calculation-example__copy" type="button" data-copy-text="${escapeAttribute(inputs)}" aria-label="Copy calculation inputs">Copy</button></div><table aria-label="Calculation example"><caption>Calculation example</caption><colgroup><col class="calculation-example__source-column"><col class="calculation-example__result-column"></colgroup><thead><tr><th scope="col">Calculation</th><th scope="col">Result</th></tr></thead><tbody>${body}</tbody></table></figure>`
}

function transform(node) {
  if (!node || typeof node !== 'object') return
  if (node.type === 'code') {
    const rows = parseCalculationFence(node.value, node.lang)
    if (rows) {
      node.type = 'html'
      node.value = renderCalculationFrame(rows)
      delete node.lang
      delete node.meta
    }
    return
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) transform(child)
  }
}

export function remarkCalculationExamples() {
  return transform
}
