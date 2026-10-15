---
title: Dates & Times
description: Work with dates, times, timezones, and duration math in Notes Calculator.
sidebar:
  order: 5
---

The examples in this chapter assume 22 April 2026 at 12:00 UTC and US date
display.

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

**Slash format**: US (`MM/DD/YYYY`) or European (`DD/MM/YYYY`), chosen by the
date format setting. With the US order, a date whose first number is over 12
is read day first, so `22/04/2026` still works. Two-digit years work too.

```
04/22/2026                             | 04/22/2026
22/04/2026                             | 04/22/2026
22/04/26                               | 04/22/2026
```

**Long-form**: month name, day, and optional year:

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

Subtract two dates to get the time between them, in years, months, weeks and
days. The result has a minus sign when the first date is the earlier one:

```
2026-12-25 - today                     | 8 months 3 days
Dec 25 2026 - Oct 14 2026              | 2 months 1 week 4 days
next Monday - today                    | 5 days
2026-01-01 - 2026-03-01                | -2 months
```

Adding months to a date moves it by calendar months. When the day doesn't
exist in the new month, you get that month's last day:

```
2026-01-31 + 1 month                   | 02/28/2026
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

Supported formats:

- City names, single or multi-word: `Tokyo`, `London`, `Los Angeles`, `New York`, `Hong Kong`, `Buenos Aires`, `Ho Chi Minh City`, `Kuala Lumpur`, and ~80 more.
- Full IANA names: `Asia/Tokyo`, `Europe/London`, `America/New_York`.
- US abbreviations: `EST`, `EDT`, `CST`, `CDT`, `MST`, `MDT`, `PST`, `PDT`, `AKST`, `AKDT`, `HST`.
- Named US zones: `eastern time`, `pacific time`, `central time`, `mountain time`, `atlantic time`, `hawaiian time`.
- Airport codes: `LAX`, `JFK`, `LHR`, `CDG`, `NRT`, `SYD`, `HKG`, and ~60 more.
- GMT/UTC offsets: `GMT`, `UTC`, `GMT+8`, `UTC-05:30`.

When a zone's calendar day differs from your local day, the result includes the
date so the day shift is visible. At this chapter's assumed time, Auckland is on
the next day:

```
now in Auckland                        | 04/23/2026 00:00
```

Query the current time in any zone:

```
time in Tokyo                          | 21:00
Tokyo time                             | 21:00
date in Vancouver                      | 04/22/2026
```

Time difference between zones:

```
time difference between Tokyo and New York   | 13 hours
difference between GMT+8 and EST             | 13 hours
```

## Durations

A single duration stays in the unit you wrote, and durations in one unit add
up in that unit:

```
90 min                                 | 90 minutes
25 hours                               | 25 hours
1.5 hours + 1 hour                     | 2.50 hours
```

Adding durations in different units shows a breakdown. Writing them side by
side works the same way:

```
2 weeks + 1 day                        | 2 weeks 1 day
1 h + 30 min                           | 1 hour 30 min
2 weeks 3 days                         | 2 weeks 3 days
```

Subtracting starts the breakdown at the first unit, and dividing splits a
duration into parts:

```
2 weeks - 1 day                        | 1 week 6 days
200 s - 1 min                          | 140 seconds
100 hours / 3                          | 33 hours 20 min
```

Use `in <unit>` for a single unit, or a pair of neighbouring units such as
`in hours and minutes` or `in weeks and days` for a breakdown:

```
1 hour + 1 day in hours                | 25 hours
100 min in hours and minutes           | 1 hour 40 min
10 days in weeks and days              | 1 week 3 days
```

Hover over any duration result to see the raw value in seconds.

Business days and work hours (`5 weekdays`, `5 business days`, `8 work
hours`) are recognised but not supported yet: counting them needs your
country's public holidays, so for now these lines show nothing instead of a
wrong number of days.

### Months and years

A year is the length of the current calendar year: 365 days, or 366 in a leap
year. A month you type as a duration, like `12 months`, is a twelfth of that
year. Dates use calendar months instead (see
[Date Arithmetic](#date-arithmetic)).

```
1 year in days                         | 365 days
12 months in years                     | 1 year
```

## ISO 8601 & Unix Timestamps

**ISO 8601 datetime** (with required timezone):

```
2026-04-22T10:15:00Z                   | 04/22/2026 10:15
2026-04-22T10:15:00+01:00              | 04/22/2026 09:15
```

**Convert between dates and Unix timestamps**:

```
today to timestamp                     | 1776816000
1745280000 to date                     | 04/22/2025
current timestamp                      | 1776859200
```

Millisecond timestamps (≥ `10^11`) are auto-detected:

```
1745280000000 to date                  | 04/22/2025
```

**Format a date as ISO 8601**:

```
today as iso                           | 2026-04-22T00:00:00.000+00:00
2026-04-22T10:15:00Z as iso8601        | 2026-04-22T10:15:00.000Z
```
