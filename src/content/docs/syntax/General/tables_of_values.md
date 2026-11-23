---
title: Tables of Values
description: Make a table of a function's values over a range, see its graph, and copy the table or save the graph.
sidebar:
  order: 4
---

A table of values lists what an expression gives for each value of a
variable in a range. Write the expression, then `for`, the variable and the
range. The line shows how many values the table has:

```
f(x) = x^2                                   |
f(x) for x from -2 to 2 step 0.5             | 9 values
```

Click the result (tap it on a phone) to open the table and its graph. Here
they are open; click **9 values** to fold them away.

## Writing a table

The long form names the start, the end and the step. Without a step, the
step is 1:

```
x^2 + 1 for x from 1 to 5                    | 5 values
```

The short form puts the range in braces, with the step after a comma:

```
x^2 + 1 {x: 1...5}                           | 5 values
2x + 1 {x: 0...1, 0.25}                      | 5 values
```

The short form also works with a function you defined before. Write
the function call, then the range:

```
f(x) = x^2                                   |
f(x) {x: -2...2, 0.5}                        | 9 values
```

Any expression that uses the variable works, also one with the note's
[variables](/features/variables/) and your own
[functions](/syntax/general/user_functions/). A number right before the
variable multiplies it, so `2x + 1` is 2 times x, plus 1.

A function definition followed by a range defines the function and shows
its table on the same line. You can use the function on the lines below:

```
f(x)=x^2 {x:-2...2, 0.5}                     | 9 values
f(3)                                         | 9
```

To count down, start from the bigger value:

```
x^2 for x from 2 to -2                       | 5 values
```

## What the table holds

- **Both ends** are in the table when the step lands on the end. When it
  doesn't, the table stops before the end: `from 0 to 1 step 0.3` gives 0,
  0.3, 0.6 and 0.9.
- **At most 200 rows.** A range with more values has no result.
- **An empty cell** means the expression has no value there, such as the
  square root of a negative number. The row stays in the table.
- **One value** shows as a normal result:

```
x^2 for x from 3 to 3                        | 9
```

- **The variable alone** lists the values in one column, with no graph:

```
x for x from 1 to 3                          | 3 values
```

The table updates when you change the function, the range or a variable it
uses.

## The graph

The graph draws the function's curve over the range, with a dot for each
row. It shows next to the table when the table has at least 3 rows, at
least 2 values, and numbers or amounts of one unit in both columns.

- The curve follows the function, also between the rows.
- The curve breaks where the function has no value. For `1/x`, its two
  sides never join at 0.
- The axes cross at zero. When zero is out of the range, an axis runs along
  the edge of the graph.
- The axis names carry the units, such as `t (s)`.
- Hover over a dot (touch it on a phone) to see its row.

```
1/x for x from -1 to 1                       | 3 values
```

## Copying the table and saving the graph

- **Copy table** copies the table as text with a tab between the columns.
  Paste it into a spreadsheet, a document or slides. The
  [answer menu](/features/answer_menu/) of a table line has **Copy table**
  too.
- **Save image** saves the graph as a PNG picture. On computers you choose
  where to save it. On phones the share sheet opens, where you can also save
  it to your photos. The web app downloads it.

## With the comma as the decimal point

When the comma is your decimal point, put a semicolon before the step, or a
comma followed by a space. See
[Decimal Point & Thousands Separators](/syntax/decimal_and_thousands/#separating-function-arguments).

```
// With the comma as the decimal point
x^2 {x: -2...2; 0,5}                         | 9 values
```

## In exported notes

When you [export a note](/features/export_and_import/), Markdown, text and
CSV files list the table under its line. A PDF shows the table on the right,
as results are, with its graph beside it. When you import a note you
exported, you get back the lines you typed.
