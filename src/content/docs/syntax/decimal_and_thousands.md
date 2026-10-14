---
title: Decimal Point & Thousands Separators
description: How Notes Calculator reads numbers written with a decimal point and thousands separators, based on your "Use dot as decimal point" setting.
---

Notes Calculator reads numbers written with thousands separators the same way it
shows them, so you can type or paste a grouped number like `1.234.567` and get
its value.

Which character is the decimal point and which is the thousands separator is
controlled by the **Use dot as decimal point** setting.

## The two conventions

| Setting | Decimal point | Thousands separator | Example input  | Value      |
| ------- | ------------- | ------------------- | -------------- | ---------- |
| **Off** | `,` comma     | `.` dot             | `1.234.567,89` | 1234567.89 |
| **On**  | `.` dot       | `,` comma           | `1,234,567.89` | 1234567.89 |

With the setting off: comma is the decimal point, dot groups the thousands:

```
1.234.567                              | 1.234.567
1.234.567,89                           | 1.234.567,89
18,5                                   | 18,50
2 * 1.234.567                          | 2.469.134
```

With **Use dot as decimal point** turned on: dot is the decimal point, comma
groups the thousands:

```
1,234,567                              | 1,234,567
1,234,567.89                           | 1,234,567.89
18.5                                   | 18.50
```

## It starts from your device's region

There is no fixed default any more. Until you pick a side, the setting follows
the region your device formats numbers in:

- A United States, United Kingdom, Indian, Japanese, Chinese or Korean region
  starts with the **dot** as the decimal point.
- A German, Italian, French, Spanish, Brazilian or Dutch region starts with the
  **comma**.
- The region wins over the language. English with an Italian region gets the
  comma, because that is how macOS and iOS format numbers there.
- If the region can't be recognised, the comma is used.

Choosing the setting yourself always wins over the region, and the lines you
already wrote are re-read straight away. If you are signed in, your choice is
remembered for the account, so every device you use shows the same separator.

## Rules

The setting is strict: only your decimal point can start a decimal part. The
other separator is always read as a thousands separator, so it is skipped
when reading the number, wherever it sits. With the comma as the decimal point:

| You type  | Shows    | Value                   |
| --------- | -------- | ----------------------- |
| `1.234`   | 1.234    | one thousand two hundred thirty-four |
| `1.234,5` | 1.234,50 | one thousand two hundred thirty-four and a half |
| `1,5`     | 1,50     | one and a half          |
| `1.5`     | 15       | fifteen: the dot is skipped |
| `3.14`    | 314      | three hundred fourteen  |
| `0.001`   | 1        | one                     |

```
1.234 + 1                              | 1.235
2.391 - 2.298                          | 93
3.14                                   | 314
```

With **Use dot as decimal point** on, it works the other way round: `1,000`
is one thousand, `1.5` is one and a half, and `1,5` is fifteen.

## Underscores for readability

You can also group the digits of a **whole number** with underscores, just as
many programming languages do. Underscores are purely visual, so they
work the same way whatever your decimal-point setting is:

```
1_000_000                              | 1.000.000
123_456_789                            | 123.456.789
2 * 1_000                              | 2.000
```

An underscore has to sit **between two digits**: a leading, trailing, or
doubled underscore (`_1000`, `1000_`, `1__000`) isn't a valid number, so the
line just stays blank. Underscores group the whole-number part only; they aren't
read inside the decimal part or an exponent.

## Inside functions, commas separate arguments

A comma is also how you separate function arguments, so a comma inside a function
call is treated as an argument separator rather than a thousands group:

```
sum(100, 200, 300)                     | 600
```

With **Use dot as decimal point** on, `sum(1,234,567)` is therefore read as the
three arguments `1`, `234`, `567` (which sum to `802`), not as one grouped
number. To pass a grouped number as a single argument, wrap it in parentheses:

```
sum((1,234,567), 3)                    | 1,234,570
```
