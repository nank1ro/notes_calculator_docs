---
title: Converting Units
description: Learn how to convert between different units of measurement in your code.
sidebar:
  order: 1
---

Use `to` or `in` or `as` to convert into a particular unit.

See all the available units in the [Unit Reference](/syntax/units--conversions/unit_reference/).

```
10 km in m                            | 10.000 m
3 weeks in days                       | 21 days 
100 pounds in kg                      | 45,36 kg
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

When doing calculations with mixed unit types, the lowest common unit will be used.
```
1km + 1,000m                          | 2.000 m
```

When units don't share a common base unit, the last used unit wins:
```
$200 + €200                           | €372
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


