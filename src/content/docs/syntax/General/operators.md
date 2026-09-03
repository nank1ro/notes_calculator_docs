---
title: Operators
description: Learn all about operators in Notes Calculator.
sidebar:
  order: 1
---

## Operator Symbols

| Operator  | Behaviour                                                 |
| --------- | --------------------------------------------------------- |
| `+` or `plus` | Adds numbers together |
| `–` or `minus` | Subtracts the second number from the first |
| `x` or `*` or `multiplied by` | Multiplies numbers together |
| `/` or `÷` or `divided by` | Divides the first number by the second number |
| `^` or `**` or `to the power of` | Raises the first number to the power of the second number |
| `mod` | Gives you the remainder after a division |

### Examples

```
1 plus 1                            | 2
6 minus 3                           | 3
2 multiplied by 3                   | 6
8 divided by 2                      | 4
2 to the power of 3                 | 8
11 mod 2                            | 1
```

## Multiplying by writing values side by side

A bracketed group written next to a value multiplies it, with or without a
space between them:

```
5 (2+3)                             | 25
5(2+3)                              | 25
2(3)                                | 6
(2+3)(4+5)                          | 45
(2)(3)(4)                           | 24
```

It multiplies at the same level as `x` and `/`, from left to right, so:

```
1 + 2 (3)                           | 7
6 / 2(3)                            | 9
2(3)^2                              | 18
-2(3)                               | -6
```

If the brackets don't contain a calculation they are a note instead, and are
ignored — `100 (rent)` is `100`. See
[Headings and Comments](/features/headings_and_comments/).

## The minus sign

A leading minus applies to the whole power or factorial that follows it, the
way it does in maths textbooks and in the system calculator:

```
-3^2                                | -9
-3!                                 | -6
5 * -3^2                            | -45
2^-3                                | 0,125
-(2+3)                              | -5
- 3 + 5                             | 2
--3                                 | 3
```

The typographic minus sign `−` (the one word processors often produce)
works everywhere the plain `-` does, so pasted text calculates:

```
5−3                                 | 2
10 + −5                             | 5
3 × −2                              | -6
10 − −5                             | 15
```
