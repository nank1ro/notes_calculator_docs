---
title: Line References
description: Reference the value of an earlier line by its line number.
sidebar:
  order: 6
---

Refer to the value of any earlier line by its line number. References stay
correct as you insert or delete lines — the numbers are renumbered live.

## Referencing a line

Use `line<N>` or the short form `l<N>`. The keyword is case-insensitive,
so `line1`, `LINE1`, `Line1`, `l1`, and `L1` all refer to the same line.

```
42                                     | 42
line1                                  | 42
L1                                     | 42
```

## Use in expressions

Line references behave like any other value — combine them with operators,
units, currencies, and other references.

```
10                                     | 10
5                                      | 5
line1 + line2                          | 15
line1 * 2                              | 20
```

A reference adopts the value type of the line it points to. If line 1 is an
amount with units or a currency, the reference renders the same way:

```
5 miles                                | 5 miles
line1 + 1                              | 6 miles
```

## Live renumbering

Inserting a line above a reference or deleting a line shifts the numbers
automatically — the text `line1` is rewritten to `line2` (and vice versa)
so that the reference keeps pointing at the same logical line.

## Cycle and self-reference

A line that references itself, references a line that doesn't exist, or
references a line that hasn't been parsed yet resolves to `NaN` rather
than raising an error. Arithmetic with a `NaN` reference also yields
`NaN`.

```
line5                                  | (empty — no line 5 yet)
line2                                  | (empty — self-reference on line 2)
```

## Word boundaries

Only the bare `line<N>` and `l<N>` forms are recognised. The parser will
not match references that are run together with other identifiers or
contain underscores:

- `line1foo` — not a reference (would need a space)
- `linear` — not a reference (it's a longer identifier)
- `l_3` — not a reference (underscores aren't allowed)
