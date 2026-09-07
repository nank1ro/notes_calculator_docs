---
title: Decimal Point & Thousands Separators
description: How Notes Calculator reads numbers written with a decimal point and thousands separators, based on your "Use dot as decimal point" setting.
---

Notes Calculator reads numbers written with thousands separators the same way it
shows them, so you can type — or paste back — a grouped number like `1.234.567`
and get its value.

Which character is the decimal point and which is the thousands separator is
controlled by the **Use dot as decimal point** setting.

## The two conventions

| Setting | Decimal point | Thousands separator | Example input  | Value      |
| ------- | ------------- | ------------------- | -------------- | ---------- |
| **Off** | `,` comma     | `.` dot             | `1.234.567,89` | 1234567.89 |
| **On**  | `.` dot       | `,` comma           | `1,234,567.89` | 1234567.89 |

With the setting off — comma is the decimal point, dot groups the thousands:

```
1.234.567                              | 1.234.567
1.234.567,89                           | 1.234.567,89
18,5                                   | 18,5
2 * 1.234.567                          | 2.469.134
```

With **Use dot as decimal point** turned on — dot is the decimal point, comma
groups the thousands:

```
1,234,567                              | 1,234,567
1,234,567.89                           | 1,234,567.89
18.5                                   | 18.5
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

- Thousands groups are **three digits** each (the leading group may be 1–3). A
  well-formed number like `1.234.567` is read as `1234567`; a malformed one like
  `1.2.3` is not a valid grouped number and is simply ignored (the line stays
  blank).
- A **single** group counts too. With the comma as the decimal point, `1.500` is
  one thousand five hundred, not one and a half — write `1,5` for one and a
  half. So `2.391 - 2.298` is `93`:

```
2.391 - 2.298                          | 93
1.234 + 1                              | 1.235
```

- Only a genuine group is grouped. Everything else stays a decimal:

| You type (comma as decimal point) | Read as                                      |
| --------------------------------- | -------------------------------------------- |
| `2.391`                           | 2391 — a well-formed three-digit group        |
| `3.14`                            | 3.14 — the tail isn't three digits            |
| `0.001`                           | 0.001 — a group never starts with a zero      |
| `1.500e3`                         | 1500 — the exponent already scales the number |
| `2,391`                           | 2.391 — comma is the decimal point            |

The same holds mirrored when **Use dot as decimal point** is on: `2,391` is
2391, `2.391` stays 2.391, `0,001` is 0.001, and `1,500e3` is 1500.

## Underscores for readability

You can also group the digits of a **whole number** with underscores — the same
trick many programming languages use. Underscores are purely visual, so they
work the same way whatever your decimal-point setting is:

```
1_000_000                              | 1.000.000
123_456_789                            | 123.456.789
2 * 1_000                              | 2.000
```

An underscore has to sit **between two digits** — a leading, trailing, or
doubled underscore (`_1000`, `1000_`, `1__000`) isn't a valid number, so the
line just stays blank. Underscores group the whole-number part only; they aren't
read inside the decimal part or an exponent.

## Inside functions, commas separate arguments

A comma is also how you separate function arguments, so a comma inside a function
call is treated as an argument separator — not a thousands group:

```
sum(100, 200, 300)                     | 600
```

With **Use dot as decimal point** on, `sum(1,234,567)` is therefore read as the
three arguments `1`, `234`, `567` (which sum to `802`), not as one grouped
number. To pass a grouped number as a single argument, wrap it in parentheses:

```
sum((1,234,567), 3)                    | 1,234,570
```
