---
title: Sharing a Note as a Link
description: Share a note as a link that opens in the Notes Calculator web app, custom result text and your settings included.
sidebar:
  order: 9
---

Share any note as a link. Whoever opens the link sees the note in the Notes
Calculator web app with the same results you see: its custom result text and
decimal places, worked out with your settings.

## Creating a link

- **Desktop and web:** right-click the note's tab and choose **Share link**,
  or open the command palette (**Cmd/Ctrl + K**) and choose **Share link** to
  share the open note. The link is copied to your clipboard.
- **iOS and Android:** tap the share icon in the top bar to share the open
  note, long-press a tab and choose **Share link**, or tap the share icon next
  to a note in the **Notes** tab. Your device's share sheet opens with the
  link.

An empty note can't be shared, and a very long note is too big for a link:
in both cases a message tells you so. Export a long note instead (the tab
menu's **Export**).

## What the link contains

The note travels inside the link itself: its title, its text, and any
[custom result text and decimal places](/features/answer_menu/) you set,
and your [settings](/features/settings/) for it (see below). It isn't stored
on a server. The link is a copy of the note as it was when you
shared it, so later edits don't change it: share again to send the new
version.

## Opening a shared note

The link opens the note in the web app.

- **Lifetime:** the shared note opens in a new tab and is saved like any other
  note.
- **Free plan:** if you have no note yet, or only the untouched sample note or
  an empty note, the shared note becomes your note. Otherwise it opens
  read-only in its own tab, so your note stays as it is.

If a link is broken or incomplete, you see "This shared note couldn't be
opened." instead.

### The sender's settings

A shared note opens with the settings of the person who shared it: decimal
point, date format, volume units, result decimals, number format, compact
result and result alignment. A note written as `1,5 + 1` by someone who uses
the comma as the decimal point shows 2,5 for you too, even if you use the dot.

Your own settings don't change, and your other notes keep using them. If the
sender's settings are the same as yours, the note opens as an ordinary note.
Links shared before version 2.9.0 don't carry settings, so they open with
yours.

A note that uses the sender's settings has a banner at the top listing what
differs from yours, for example:

> Calculated with the sender's settings: comma decimals, DD/MM/YYYY
> dates, Metric volume units.

Choose **Use mine** in the banner to switch the note to your settings. Its
text stays as written. When the decimal point, date format or volume units
differ, some lines may calculate differently with your settings (`1,5` may
no longer mean one and a half, `03/04` may become March 4 instead of 3
April), so you're asked first. When only how results look differs, the note
switches straight away.

Sharing a note you received sends it with the settings it uses.

### Shared notes on the free plan

A shared note that opens read-only has a banner at the top saying so. In that
tab:

- you can read the note and scroll it, but not edit it;
- the [answer menu](/features/answer_menu/) only has **Copy result**;
- the tab can't be renamed or deleted;
- the note isn't saved: closing the tab discards it.

Lifetime saves shared notes in their own tabs: once you upgrade, any shared
note you have open is saved as an ordinary note.

## Examples from the website

The examples on [notescalculator.com](https://notescalculator.com) link
straight into the app with **Open in Notes Calculator**. Each one is a shared
note, so it opens the same way as a link someone sends you (see above): in its
own tab on Lifetime, and on the free plan as your note or in a read-only tab.

The examples are written with the dot as the decimal point, MM/DD/YYYY dates
and US Customary volume units, and they open with those settings, so they show
the same results as the website. If your settings differ, the banner lists
what's different, and **Use mine** switches the example to your settings.
