---
title: User-Defined Functions
description: Define your own reusable functions and call them on later lines.
sidebar:
  order: 3
---

Define a function once and reuse it on subsequent lines. Function bodies
support the full expression syntax — operators, units, currencies,
constants, and built-in functions.

## Defining a function

A definition has the form `name(param) = body`. The line that contains
the definition produces no result; the function is registered for use on
later lines.

```
f(x) = 2*x + 1                         |
f(5)                                   | 11
f(10)                                  | 21
```

## Multiple arguments

Functions accept any number of parameters separated by commas.

```
area(w, h) = w * h                     |
area(3, 4)                             | 12

vol(l, w, h) = l * w * h               |
vol(2, 3, 4)                           | 24
```

## Naming rules

- Names start with a letter and may contain letters, digits, and
  underscores. No spaces, no leading digit.
- At least one parameter is required. For zero-argument values, use a
  [variable](/features/variables/) instead (`pi_sq = pi * pi`).
- Parameter names within a single definition must be distinct —
  `f(x, x) = …` is rejected.

## Bodies can use the full expression language

Function bodies parse with the same grammar as ordinary lines, so they
can use built-in functions, constants, units, currencies, and operators.

```
hyp(a, b) = sqrt(a*a + b*b)            |
hyp(3, 4)                              | 5

circle(r) = pi * r * r                 |
circle(2)                              | 12.57

withTax(x) = x * 1.10                  |
withTax(100)                           | 110
```

Calls compose with arithmetic and with each other:

```
double(x) = 2 * x                      |
double(5) + 1                          | 11
double(double(5))                      | 20

square(x) = x * x                      |
square(2 + 3)                          | 25
```

## Restrictions

A few intentional limits keep function calls fast and predictable:

- **Definitions must come before calls.** A line can only reference a
  function defined on an earlier line.
- **No recursion.** A function body cannot call itself, and two
  functions cannot call each other (mutual recursion). Recursive calls
  resolve to nothing rather than hanging.
- **Bodies are isolated from line-scoped operations.** Inside a body,
  `line1`, `previous`, and `total` do not see the surrounding document
  — `previous` and `total` resolve to `0`, and `line<N>` resolves to
  `NaN`.
- **Outer variables don't leak into bodies.** Only the function's own
  parameters are in scope; you cannot reference `y` inside a body
  unless `y` is one of the parameters.
- **Built-in names always win.** Defining `sum(x) = x + 1` does not
  override the built-in `sum(…)` — calls go to the built-in. Pick a
  different name to avoid the clash.
