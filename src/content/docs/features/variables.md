---
title: Variables
description: Learn all about variables in Notes Calculator.
sidebar:
  order: 2
---

## Declaring variables

Declare a variable with the equals symbol `=`.

```
discount = 10%                         | 10%
cost =  200€                           | €200
cost - discount                        | €180
```

A variable can be a single word or an entire phrase (i.e. `red apples = 10`).

## Redefining variables

A variable can be redefined by giving it a new value.

The most recently defined value will be used on subsequent lines.

```
amount = 50€                           | €50
amount x 2                             | €100
amount = 20€                           | €20         
amount x 2                             | €40 
```

## Variables named like units

A variable can have the same name as a unit, like `l` (liters). On the lines
below it, the name means your variable:

```
l = 2                                  | 2
l * 3                                  | 6
```

This also holds after a number: with `m = 4`, `2m` is 2 times your `m`, not
2 metres.

```
m = 4                                  | 4
2m                                     | 8
```

If a note declares a name that is also a unit, such as `m`, `h` or `t`,
check the lines below it that use that unit.
