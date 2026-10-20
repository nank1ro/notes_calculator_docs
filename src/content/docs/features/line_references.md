---
title: Line References
description: Reference the value of an earlier line by its line number, or add up a block of lines with a range like line2...line6.
sidebar:
  order: 6
---

Refer to the value of any earlier line by its line number. References stay
correct as you insert or delete lines: the numbers are renumbered live.

## Referencing a line

Use `line<N>` or the short form `l<N>`. The keyword is case-insensitive,
so `line1`, `LINE1`, `Line1`, `l1`, and `L1` all refer to the same line.

```
42                                     | 42
line1                                  | 42
L1                                     | 42
```

## Use in expressions

Line references behave like any other value: combine them with operators,
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
5 miles                                | 5 mi
line1 + 1                              | 6 mi
```

## Line ranges

Write two line numbers with three dots between them to use a block of lines:
`line2...line5`, the short form `l2...l5`, or just `2...5`. On its own, a
range adds up the lines, first and last included:

```
# Groceries                            |
12.50                                  | 12.50
8.20                                   | 8.20
                                       |
4.30                                   | 4.30
line2...line5                          | 25
2...5                                  | 25
```

Blank lines, headings, text and earlier total lines inside the range are
skipped. The order doesn't matter: `l5...l2` is the same as `l2...l5`.
Amounts with units and currencies add up the same way as with `+`:

```
1 hour                                 | 1 hour
45 min                                 | 45 minutes
2 hours                                | 2 hours
1...3                                  | 3 hours 45 min
```

Inside a function, a range is the list of its values, so you can mix it with
other arguments:

```
10                                     | 10
20                                     | 20
30                                     | 30
40                                     | 40
avg(1...4)                             | 25
max(line1...line4, 50)                 | 50
sum(l1...l3)                           | 60
median(1...4)                          | 25
```

This works with `sum`, `avg`, `min`, `max`, `median` and `stddev` (see
[multi-argument functions](/syntax/general/functions/#multi-argument-functions)).

Only three dots make a range (the `…` character works too). Two dots
(`line2..line5`) and a colon (`2:5`) aren't ranges, so those lines stay blank.

Editing any line inside the range updates the result.

## Live renumbering

Inserting a line above a reference or deleting a line shifts the numbers
automatically: the text `line1` is rewritten to `line2` (and vice versa)
so that the reference keeps pointing at the same logical line. Ranges are
renumbered the same way.

Results that depend on a referenced line, such as `total`, `prev` or a
variable defined from it, update as soon as you edit that line.

## Cycle and self-reference

A line that references itself, references a line that doesn't exist, or
references a line that hasn't been parsed yet resolves to `NaN` rather
than raising an error. Arithmetic with a `NaN` reference also yields
`NaN`.

```
line5                                  |
line2                                  |
```

## Word boundaries

Only the bare `line<N>` and `l<N>` forms are recognised. The parser will
not match references that are run together with other identifiers or
contain underscores:

- `line1foo`: not a reference (would need a space)
- `linear`: not a reference (it's a longer identifier)
- `l_3`: not a reference (underscores aren't allowed)
