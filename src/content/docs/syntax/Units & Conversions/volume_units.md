---
title: Volume Units Setting
description: Choose whether gallons, pints, cups and other kitchen units are US Customary, Imperial or Metric.
sidebar:
  order: 3
---

A gallon in the US isn't the same as a gallon in the UK. The **Volume units**
setting decides which one you mean when you write a plain unit name. Choose
from:

- **US Customary**
- **Imperial**
- **Metric**

It starts from your device's region: US Customary in the United States,
Imperial in the United Kingdom, and Metric everywhere else.

## Which units it affects

| You write | US Customary | Imperial | Metric |
| --- | --- | --- | --- |
| `gallon`, `gal` | US gallon (3.79 L) | Imperial gallon (4.55 L) | US gallon |
| `quart`, `qt` | US quart (0.95 L) | Imperial quart (1.14 L) | US quart |
| `pint`, `pt` | US pint (473 ml) | Imperial pint (568 ml) | US pint |
| `cup` | US cup (237 ml) | US cup | Metric cup (250 ml) |
| `tablespoon`, `tbsp` | US (14.8 ml) | Imperial (17.8 ml) | Metric (15 ml) |
| `teaspoon`, `tsp` | US (4.9 ml) | Imperial (5.9 ml) | Metric (5 ml) |
| `fluid ounce`, `fl oz` | US (29.6 ml) | Imperial (28.4 ml) | US |
| `mpg` | Miles per US gallon | Miles per imperial gallon | Miles per US gallon |
| `ton` | Short ton (907 kg) | Metric ton (1,000 kg) | Metric ton |

With US Customary:

```
1 gallon in L                          | 3.79 L
1 tbsp in ml                           | 14.79 ml
1 ton in kg                            | 907.18 kg
```

## Picking a unit yourself

Add `US`, `imperial` or `metric` to the name to pick a unit regardless of the
setting:

```
1 US gallon in L                       | 3.79 L
1 imperial pint in ml                  | 568.26 ml
1 metric cup in ml                     | 250 ml
1 short ton in kg                      | 907.18 kg
1 long ton in kg                       | 1,016.05 kg
30 mpg imperial in km/l                | 10.62 km/L
```

Metric units such as liters and milliliters never change.
