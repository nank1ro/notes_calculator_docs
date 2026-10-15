---
title: Getting started
description: Learn how to maximize your productivity with notes calculator.
---

"Notes calculator" is a notepad for working through problems that involve calculations. 
Type a calculation in the input field (left side), and the result will be displayed on the right side.

The currency conversion below uses an illustrative rate of USD 1 = EUR 0.8.
Live currency results vary with the app's current rate.

```
(75 + 25) x 3                        | 300
100 + 50%                            | 150
20% of 40                            | 8

100 dollars in euro                  | €80
60 degree in radians                 | 1,05 rad
1 kg in g                            | 1.000 g
1 day in seconds                     | 86.400 seconds

// You can also use variables: <-- this is a comment, which is ignored
discount = 10%                       | 10% 
cost = 550€                          | €550
cost - discount                      | €495
```

Calculations are performed automatically as you type, and the result is updated in real-time.

## What's new

- [Words and Numbers](/features/words_and_numbers/): lines like `100 groceries` or `3 kg apples` now show a result.
- [Durations](/features/dates_and_times/#durations): `2 weeks + 1 day` shows 2 weeks 1 day, and date differences show years, months, weeks and days.
- [Mixed units](/syntax/units--conversions/converting_units/): feet and inches, pounds and ounces, and mixed currencies follow simple rules.
- [Decimal Point & Thousands Separators](/syntax/decimal_and_thousands/): separators are now strict. With the comma as the decimal point, a dot is always a thousands separator, so `1.5` is 15 (write `1,5`). The same applies the other way round.
- [Unit Reference](/syntax/units--conversions/unit_reference/): new units for electricity, frequency, data rates, torque, typography and more, and `5 V * 2 amps` shows 10 W.
- [Volume Units Setting](/syntax/units--conversions/volume_units/): choose US Customary, Imperial or Metric gallons, pints and cups.
- [Decimal Point & Thousands Separators](/syntax/decimal_and_thousands/): type grouped numbers like `1.234.567` (matching your "Use dot as decimal point" setting) or `1_000_000` with underscores.
- [Line References](/features/line_references/): refer to an earlier line by its number, e.g. `line1`.
- [User-Defined Functions](/syntax/general/user_functions/): define your own functions like `f(x) = 2*x + 1`.
- [Number Bases & Scientific Notation](/syntax/bases_and_scientific/): hex, binary, octal, and scientific literals plus `in hex` / `as scientific` postfixes.

:::tip[Autocomplete]
As you type, Notes Calculator suggests units, currencies, constants,
functions, line references, and timezones. Press **Tab** to accept,
**↑/↓** to navigate, and **Esc** to dismiss. Toggle in
**Settings → Completion hints**.
:::

:::tip[Syntax highlighting]
Numbers, units, variables, operators, line references, and comments
are colour-coded, with a palette that adapts to light and dark mode.
Toggle in **Settings → Syntax highlighting**.
:::
