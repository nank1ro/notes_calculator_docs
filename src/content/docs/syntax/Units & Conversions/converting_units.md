---
title: Converting Units
description: Learn how to convert between different units of measurement in your code.
sidebar:
  order: 1
---

Use `to` or `in` or `as` to convert into a particular unit.

See all the available units in the [Unit Reference](/syntax/units--conversions/unit_reference/).

The examples on this page use the dot as the decimal point (see
[Decimal Point & Thousands Separators](/syntax/decimal_and_thousands/)).

```
10 km in m                            | 10,000 m
3 weeks in days                       | 21 days
100 pounds in kg                      | 45.36 kg
```

## Wrapping a Value in a Unit

When the left-hand side is a plain number or an expression with no
source unit, `in <unit>` (or just the unit, with no `in`) attaches the
unit without conversion. This works for variables, parenthesised
expressions, and [user-function parameters](/syntax/general/user_functions/).

```
20 in EUR                             | €20
(5 + 3) m                             | 8 m
50 in km                              | 50 km
```

## Mixing Units & Plain Numbers

When mixing plain numbers with units, the nearest unit will be used automatically.
```
300 + 20 km                           | 320 km
$20 + 30                              | $50
```

## Adding & Subtracting Mixed Units

Adding different units of the same kind answers in the larger unit, whichever
order you type them in. Subtracting keeps the first unit.
Use `in <unit>` to choose a different unit.
```
1 km + 300 m                          | 1.30 km
500 ml + 1 L                          | 1.50 L
1 L + 500 ml                          | 1.50 L
1 cm - 1 m                            | -99 cm
1 km + 300 m in m                     | 1,300 m
```

Durations have their own rules, see
[Durations](/features/dates_and_times/#durations).

## Currencies

Adding different currencies answers in the last currency, and subtracting
keeps the first. The results below use illustrative rates; live currency
results vary with the app's current rates.
```
5 USD + 3 EUR                         | €7.55
5 EUR - 3 USD                         | €2.27
5 GBP + 3 EUR in USD                  | $9.73
```

## Feet and Inches, Pounds and Ounces

Feet and inches, and pounds and ounces, show as a breakdown:
```
5 ft + 3 in                           | 5 feet 3 inches
63 inches                             | 5 feet 3 inches
1 lb + 8 oz                           | 1 lb 8 oz
20 oz                                 | 1 lb 4 oz
```

Convert with `in feet and inches` or `in pounds and ounces`. For a decimal,
write `in ft` or use a fraction:
```
190.5 cm in feet and inches           | 6 feet 3 inches
5 ft 11 in in cm                      | 180.34 cm
63 inches in ft                       | 5.25 feet
1/3 ft                                | 0.33 feet
```

## Multiplying Units

When multiplying units, the result will be a supported math compound unit:

```
10m x 10m                             | 100 m²
```

An implicit rate will be made when a supported unit cannot be created through multiplication:
```
$30 × 4 days                          | $120
```


