---
title: Totals and Subtotals
description: Learn how to calculate totals and subtotals in Notes Calculator.
sidebar:
  order: 4
---


| Method | Name        | Behaviour                                    |
| -------- | ----------- | -------------------------------------------- |
| `total` or `sum`  | Total | Returns the sum of all previous consecutive numbers |
| `average` or `avg` | Average | Returns the average of all previous consecutive numbers |
| `previous` or `prev` | Previous | Returns the number before the current line (defaults to 0) |

## Total

```
1                                | 1
2                                | 2
3                                | 3
total                            | 6    
```

The `total` command calculates the sum of all previous __consecutive__ numbers.

With __consecutive__ numbers, we mean that the `total` command will only sum the non-empty lines that come before it, and it will stop at the first empty line or a line that does not contain a number.

```
1                                | 1
2                                | 2
3                                | 3
total                            | 6    

4                                | 4
2                                | 2
total                            | 6
```

In the example above, the first `total` command sums the numbers `1`, `2`, and `3`, while the second `total` command sums only the numbers `4` and `2`, because it stops at the first empty line, making it to act like a subtotal.

## Average

```
1                                | 1
2                                | 2
3                                | 3
average                          | 2
```

## Previous

```
1                                | 1
2                                | 2
3                                | 3
previous                         | 3
```

## Multi-argument forms

`sum` and `avg` are also available as ordinary multi-argument functions
when you want to combine specific values rather than the previous
consecutive lines:

```
sum(1, 2, 3, 4)                  | 10
avg(10, 20, 30)                  | 20
```

See the [Functions](/syntax/general/functions/) page for the full list
of multi-argument built-ins (`min`, `max`, `clamp`, `median`, `stddev`,
and more).
