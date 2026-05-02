---
title: Functions
description: Learn all about functions in Notes Calculator.
sidebar:
  order: 2
---

| Function | Name        | Behaviour                                    |
| -------- | ----------- | -------------------------------------------- |
| `sqrt()`  | Square Root | Returns the square root of a number (also known as `√`) |
| `cbrt()`   | Cube Root   | Returns the cube root of a number            |
| `abs()`   | Absolute value   | Returns the absolute value of a number (i.e makes a negative number positive)            |
| `round()` | Round   | Returns the nearest integer (half-away-from-zero). Also accepts a second arg for decimal places. |
| `ceil()`  | Ceiling | Rounds up to the nearest integer |
| `floor()` | Floor   | Rounds down to the nearest integer |
| `sin()`   | Sine      | Returns the sine of an angle (in radians)   |
| `cos()`   | Cosine    | Returns the cosine of an angle (in radians) |
| `tan()`   | Tangent   | Returns the tangent of an angle (in radians) |
| `ln()`   | Natural Logarithm | The natural logarithm of a number is its logarithm to the base of the mathematical constant `e`. |
| `log2` | Logarithm Base 2 | Returns the logarithm of a number to the base 2 |
| `log10` | Logarithm Base 10 | Returns the logarithm of a number to the base 10 |
| `acos()` | Arc Cosine | Returns the arc cosine of a number (inverse of cosine) |
| `asin()` | Arc Sine   | Returns the arc sine of a number (inverse of sine) |
| `atan()` | Arc Tangent | Returns the arc tangent of a number (inverse of tangent) |
| `csc()` | Cosecant | Returns the cosecant of an angle (1/sin) |
| `sec()` | Secant | Returns the secant of an angle (1/cos) |
| `cot()` | Cotangent | Returns the cotangent of an angle (1/tan) |
| `exp()`   | Exponential | Returns the value of e raised to the power of a number |
| `fact()` | Factorial | Returns the factorial of a number `n!` (if the number is negative, the absolute value of it is used) |

### Examples
```
sqrt(16)                    | 4
cbrt(27)                    | 3
abs(-5)                     | 5
fact(5)                     | 120
ln(20)                      | 3
log2(32)                    | 5
ln(e)                       | 1
round(1.5)                  | 2
ceil(1.1)                   | 2
floor(1.9)                  | 1
round(3.14159, 2)           | 3.14
```

See the [Rounding](/syntax/rounding/) page for natural-language rounding syntax and more examples.

## Multi-argument functions

These functions accept two or more arguments separated by commas.

| Function | Arity | Behaviour |
| -------- | ----- | --------- |
| `min(a, b, …)`     | ≥1 | Returns the smallest of its arguments |
| `max(a, b, …)`     | ≥1 | Returns the largest of its arguments |
| `clamp(x, lo, hi)` | 3  | Constrains `x` to the range `[lo, hi]`. Errors if `lo > hi` |
| `log(x, base)`     | 2  | Logarithm of `x` to an arbitrary `base` |
| `hypot(a, b, …)`   | ≥1 | Returns `√(a² + b² + …)` |
| `gcd(a, b, …)`     | ≥2 | Greatest common divisor (integers only) |
| `lcm(a, b, …)`     | ≥2 | Least common multiple (integers only) |
| `sum(a, b, …)`     | ≥1 | Sum of its arguments |
| `avg(a, b, …)`     | ≥1 | Arithmetic mean |
| `median(a, b, …)`  | ≥1 | Median value |
| `stddev(a, b, …)`  | ≥2 | Sample standard deviation (uses `n−1` denominator) |

### Examples
```
min(3, 7, 2)                | 2
max(3, 7, 2)                | 7
clamp(15, 0, 10)            | 10
log(1000, 10)               | 3
hypot(3, 4)                 | 5
gcd(12, 18)                 | 6
lcm(4, 6)                   | 12
sum(1, 2, 3, 4)             | 10
avg(1, 2, 3, 4)             | 2.5
median(1, 2, 3, 4, 5)       | 3
stddev(2, 4, 4, 4, 5, 5, 7, 9) | 2
```

`sum` and `avg` also exist as bare keywords that aggregate previous
consecutive lines — see [Totals and Subtotals](/features/totals_and_subtotals/).

To define your own functions like `f(x) = 2*x + 1`, see
[User-Defined Functions](/syntax/general/user_functions/).
