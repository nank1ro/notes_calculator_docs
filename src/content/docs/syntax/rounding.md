---
title: Rounding
description: Learn how to round numbers in Notes Calculator.
---

## Function forms
```
round(1.5)                      | 2
ceil(1.1)                       | 2
floor(1.9)                      | 1
round(-1.5)                     | -2
```

## Rounding to decimal places
```
round(3.14159, 2)               | 3.14
3.14159 to 2 dp                 | 3.14
3.14159 to 2 digits             | 3.14
```

## Rounded
```
1.5 rounded                     | 2
1.4 rounded                     | 1
0.5 rounded                     | 1
-1.5 rounded                    | -2
```

## Rounded up / down
```
1.2 rounded up                  | 2
1.8 rounded down                | 1
```

## Rounded to nearest multiple
```
47 to nearest 5                 | 45
47 rounded to nearest 5         | 45
23 to nearest 10                | 20
```

## Directional rounding to nearest multiple
```
42 rounded up to nearest 5      | 45
48 rounded down to nearest 5    | 45
```

## Rounded to nearest hundred, thousand, or million
```
1234 rounded to nearest hundred     | 1200
1234 rounded to nearest thousand    | 1000
1500000 rounded to nearest million  | 2000000
```

## Units and currency preserved
```
round(5.6 kg)                   | 6 kg
round($19.99)                   | $20
5.7 m rounded                   | 6 m
```

## Works on variables
```
price = 19.99                   | 19.99
round(price)                    | 20
```
