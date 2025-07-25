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

```
1 == 1 && 2 == 2                      | true
1 == 1 and 2 != 2                      | false
1 == 1 || 2 != 2                      | true
1 != 1 or 2 != 2                      | false
```

## if, else, then

The `if`, `else`, and `then` keywords are used to control the flow of execution based on conditions.

```
earnings = $25k                                  | $25,000
if earnings > $30k then tax = 15% else tax = 5%  | 5%
earnings x tax                                   | $1,250
```

## Declare a variable using a conditional

```
income = $40k                                    | $40,000
expenses = $25k                                  | $25,000   
profitable = true if income > expenses           | true
insolvent = false unless expenses > income       | false
```
