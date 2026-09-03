---
title: Conditionals
description: Learn how to use conditionals in your code to control the flow of execution based on certain conditions.
---

Like other programming languages, [conditionals](https://en.wikipedia.org/wiki/Conditional_(computer_programming)) are supported in Notes Calculator.

The first two fundamental values you need to know are `true` and `false`. These values are used to represent the truthiness of a condition.

```
true                                  | true
false                                 | false
```

## Comparison Operators
Comparison operators are used to compare two values and return a boolean result (`true` or `false`).

| Operator | Name | Behaviour |
| :--- | :--- | :--- |
| `==` | Equal to | Returns true if left value and right value are equal |
| `!=` | Not equal to | Returns true if left value and right value are not equal |
| `>` | Greater than | Returns true if the left value is greater than the right value |
| `<` | Less than | Returns true if the left value is less than the right value |
| `>=` | Greater than or equal to | Returns true if the left value is greater than or equal to the right value |
| `<=` | Less than or equal to | Returns true if the left value is less than or equal to the right value |

For example:
```
1 == 1                                | true
1 != 2                                | true
1 < 2                                 | true
2 < 1                                 | false
1 >= 1                                | true
2 <= 2                                | true
```

## Logical Operators
Logical operators are used to combine multiple conditions. The result is `true` if the combined condition

| Operator          | Name | Behaviour |
| ------------- | -------- | ---------- |
| `&&` or `and` | and | Returns true if both conditions are true |
| `\|\|` or `or` | or | Returns true if at least one condition is true |
| `not` | not | Flips a condition — true becomes false and back |
| `xor` | exclusive or | Returns true if exactly one of the two conditions is true |

```
1 == 1 && 2 == 2                      | true
1 == 1 and 2 != 2                     | false
1 == 1 || 2 != 2                      | true
1 != 1 or 2 != 2                      | false
```

`not` and `xor` are case-insensitive, and a plain number works as a condition
too — zero is false, anything else is true.

```
not false                             | true
not true and false                    | false
true xor false                        | true
true xor true                         | false
5 and 3                               | true
5 and 0                               | false
```

`not` binds looser than `xor`, so put it in brackets to use it as an `xor`
operand: `true xor (not false)`.

The integer `xor` is unchanged — with whole numbers it still works bit by bit:

```
5 xor 3                               | 6
```

## if, else, then

The `if`, `else`, and `then` keywords are used to control the flow of execution based on conditions.

```
earnings = $25k                                  | $25,000
if earnings > $30k then tax = 15% else tax = 5%  | 5%
earnings x tax                                   | $1,250
```

Conditions can be variables, comparisons, or combinations of them:

```
x = 5                                            | 5
if x > 1 and x < 9 then 1 else 2                 | 1
if 0 then 1 else 2                               | 2
if false then 7                                  | 0
```

```
weekend = false                                  | false
if not weekend then 1 else 0                     | 1
```

With no `else`, a false condition gives `0`.

## The `? :` shorthand

`condition ? value if true : value if false` does the same job in fewer
characters:

```
true ? 1 : 0                                     | 1
5 > 3 ? 10 : 20                                  | 10
not false ? 1 : 0                                | 1
true xor false ? 10 : 20                         | 10
```

## Conditionals inside a calculation

Wrap a conditional in brackets and it behaves like any other value:

```
member = true                                    | true
100 x (if member then 0.9 else 1)                | 90
100 x (member ? 0.9 : 1)                         | 90
2 * (5 > 3 ? 10 : 20)                            | 20
```

The branches keep their own type, so a conditional can return money or a unit
amount, not just a plain number:

```
member = false                                   | false
member ? 10€ : 20€                               | €20
if member then 5 kg else 3 kg                    | 3 kg
```

## When a condition has no answer

If the condition itself can't be worked out — an empty `total`, or something
like `0/0` — the line shows no answer at all, rather than quietly taking the
false branch:

```
total ? 1 : 2                                    |
0/0 ? 1 : 2                                      |
```

## Declare a variable using a conditional

```
income = $40k                                    | $40,000
expenses = $25k                                  | $25,000   
profitable = true if income > expenses           | true
insolvent = false unless expenses > income       | false
```
