---
title: Number Bases & Scientific Notation
description: Hex, binary, octal, and scientific-notation literals plus display-mode postfixes.
---

Notes Calculator accepts numbers written in scientific notation or in
hexadecimal, binary, and octal — and you can ask any result to render in
those formats with an `in` / `as` postfix.

## Scientific notation literals

Use `e` (or `E`) to write a number in scientific notation. The exponent
sign is optional.

```
1.5e6                                  | 1,500,000
2.5E-3                                 | 0.0025
5e+3                                   | 5,000
1e10                                   | 10,000,000,000
```

Scientific literals participate in arithmetic exactly like any other
number:

```
1.5e6 + 1                              | 1,500,001
1.5e6 * 2                              | 3,000,000
```

## Hex, binary, and octal literals

Prefix integer literals with `0x` (hex), `0b` (binary), or `0o`
(octal). The prefix and digits are case-insensitive.

```
0xFF                                   | 255
0xDEADBEEF                             | 3,735,928,559
0b1010                                 | 10
0b11111111                             | 255
0o17                                   | 15
0O377                                  | 255
```

Mix bases freely in expressions:

```
0xFF + 1                               | 256
0b1010 + 5                             | 15
```

## Display postfix: `in` / `as`

Append `in <format>` or `as <format>` to a number or expression to
choose how the result is displayed. The underlying value is unchanged
— only the rendering is affected.

```
255 in hex                             | FF
255 in binary                          | 11111111
255 in octal                           | 377
1234567 as scientific                  | 1.234567e6
1234567 as fixed                       | 1,234,567
```

Both `in` and `as` are accepted, and `as decimal` is an alias for
`as fixed`.

The postfix attaches to the whole expression on its left, so
parentheses can be used to format an arithmetic result:

```
(0xFF + 1) in hex                      | 100
(0b1010 + 5) in binary                 | 1111
```

`in hex`, `in binary`, and `in octal` require an integer value —
non-integers produce an error.

## Global default format

The default format for numeric results is set in **Settings → Number
format**:

- **Auto** — plain decimal for everyday values; switches to scientific
  for very large or very small numbers. (Default.)
- **Scientific** — every number renders in scientific notation.
- **Fixed** — every number renders as a plain decimal, never in
  scientific notation.

A per-line `as scientific` / `as fixed` postfix always overrides the
global setting.
