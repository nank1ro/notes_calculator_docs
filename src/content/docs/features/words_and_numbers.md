---
title: Words and Numbers
description: Write notes in plain words and Notes Calculator still finds the numbers.
sidebar:
  order: 3
---

You don't have to write pure math. Lines can mix words and numbers, and Notes
Calculator picks out the amounts and ignores the rest.

```
100 groceries                          | 100
3 kg apples                            | 3 kg
2 weeks vacation                       | 2 weeks
I spent $20 on books                   | $20
```

The math still works around the words:

```
rent $1200 + utilities $150            | $1,350
$10 for lunch + 15% tip                | $11.50
4 nights * 95 EUR                      | €380
```

## Totals

Because these lines have a result, `total` and the other
[totals](/features/totals_and_subtotals/) add them up:

```
100 groceries                          | 100
200 flight                             | 200
total                                  | 300
```

## Several numbers on one line

When a line has several plain numbers and no operator between them, the
last number wins:

```
123 456 789                            | 789
```

Amounts with units written side by side are different: they add up.

```
2 weeks 3 days                         | 2 weeks 3 days
5 ft 11 in                             | 5 feet 11 inches
```

Any number on a line counts, even in a reminder like `Call John at 5`. To
keep a number out of your results, put it in a
[comment or a quoted note](/features/headings_and_comments/):

```
Call John at 5                         | 5
"Call John at 5"                       |
```

## When a line stays blank

A line shows nothing when:

- it has no numbers at all, like `meeting notes about the offsite`;
- its meaning isn't clear, like `$5 coffee and $3 tea` or `5 and 3`. Write
  `$5 coffee + $3 tea` to add them up;
- it uses business days or work hours, like `5 weekdays`, which aren't
  supported yet (see [Durations](/features/dates_and_times/#durations)).
