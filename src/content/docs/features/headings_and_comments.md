---
title: Headings and Comments
description: Learn how to use headings and comments in Notes Calculator.
sidebar:
  order: 5
---

## Headings

Use the `#` character to indicate a heading line. Heading lines are emboldened and do not display an answer (even if there are numbers in the heading).

```
# Heading 1                          |
## Heading 2                         |
### Heading 3                        |
#### Heading 4                       |
##### Heading 5                      |
###### Heading 6                     | 
```

## Comments

If you want to add a comment to your notes, use the `//` characters. Comments are not evaluated and do not display an answer.

```
// This is a comment                           |
// Comments can also start after an expression |
2 // the number of apples                      | 2
```

## Quoted notes

Text in double quotes is a note, not part of the calculation. You can use as
many quoted notes as you like on one line.

```
1 + 1 "two"                                    | 2
1 "a" + 2 "b"                                  | 3
"just a quote line"                            |
```

A `//` comment always wins, even over a quote that opens before it: in
`"a // b" + 1` everything from `//` onwards is a comment, so nothing is left to
calculate and the line stays blank.

## Labels

Start a line with a few words followed by a colon **and a space** to label it.
The label is ignored, and the rest of the line is calculated as usual.

```
Total: 42                                      | 42
Rent: 100 + 50                                 | 150
Tip: 20%                                       | 20%
Label with number 5: 10 + 1                    | 11
14: 45                                         | 45
```

The space after the colon is what makes it a label:

- `14:45` is a time, not a label — there is no space after the colon.
- `Total:100` isn't a label either, so the line stays blank.
- A ternary's colon is never read as a label: `gas = inverno ? 1 : 0` still
  calculates (see [Conditionals](/syntax/conditionals/)).
- Only the first label on a line is stripped.

## Notes in brackets

Anything in brackets that isn't a valid calculation is treated as a note and
ignored:

```
100 (rent) + 200 (food)                        | 300
999 (for iPhone 16)                            | 999
1 (a (b) c) + 1                                | 2
(just a note)                                  |
```

Brackets that *do* contain a calculation keep their usual meaning — they group
it, and a group written next to a value multiplies:

```
100 * (2 + 3)                                  | 500
5 (2+3)                                        | 25
```

See [Operators](/syntax/general/operators/) for that multiplication shorthand.

## An unfinished bracket or quote

A line you are still typing isn't thrown away: if the only problem is an
unclosed bracket or quote, the best answer available is shown.

```
1 (unbalanced                                  | 1
1+(2                                           | 3
(2                                             | 2
1 + "oops                                      | 1
```

Plain prose with nothing to calculate still shows no answer.
