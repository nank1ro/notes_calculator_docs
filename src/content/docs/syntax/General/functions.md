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
