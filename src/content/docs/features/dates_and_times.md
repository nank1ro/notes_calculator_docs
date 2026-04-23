---
title: Dates & Times
description: Work with dates, times, timezones, and duration math in Notes Calculator.
sidebar:
  order: 5
---

## Keywords

Use built-in keywords to refer to common dates and times.

```
today                                  | 04/22/2026
yesterday                              | 04/21/2026
tomorrow                               | 04/23/2026
now                                    | 12:00
```

`today`, `yesterday`, and `tomorrow` resolve to a date. `now` resolves to the
current time of day (displayed as `HH:mm`).

## Date Formats

Notes Calculator accepts several date input formats.

**ISO format** (`YYYY-MM-DD`):

```
2026-12-25                             | 12/25/2026
```

**Slash format** — US (`MM/DD/YYYY`) or EU (`DD/MM/YYYY`, enabled in Settings):

```
04/22/2026                             | 04/22/2026
```

**Long-form** — month name, day, and optional year:

```
April 22 2026                          | 04/22/2026
Apr 22                                 | 04/22/2026
22 April 2026                          | 04/22/2026
```

## Named Weekdays

Reference specific weekdays relative to today.

```
next Monday                            | 04/27/2026
last Friday                            | 04/17/2026
Monday in 3 weeks                      | 05/18/2026
```

## Date Arithmetic

Add or subtract days from a date. A bare number is treated as days.

```
today + 7                              | 04/29/2026
today + 3 days                         | 04/25/2026
today + 2 weeks                        | 05/06/2026
today - 1                              | 04/21/2026
```

Subtract two dates to get a duration:

```
2026-12-25 - today                     | 247 days
next Monday - today                    | 5 days
```

Add a time amount to a date:

```
today + 3 hours                        | 04/22/2026
now + 90 minutes                       | 13:30
```

## Timezones

Append `in <zone>` to interpret a date or time in a specific timezone.

```
now in Tokyo                           | 21:00
today in UTC                           | 04/22/2026
2026-04-22 in America/New_York         | 04/22/2026
```

Supported formats: city names (`Tokyo`, `London`, `New_York`) and full IANA
names (`Asia/Tokyo`, `Europe/London`, `America/New_York`).

## Duration Formatting

A duration result is displayed in human-readable form.

```
2026-12-25 - today                     | 247 days
tomorrow - now                         | 11 hours 59 minutes
```

Hover over any duration result to see the raw value in seconds.
