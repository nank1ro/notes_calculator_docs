---
title: Exporting and Importing Notes
description: Save a note as a Markdown, text, CSV or PDF file, and open Markdown, text or CSV files as new notes.
sidebar:
  order: 10
---

Export a note to keep it as a file or to work on it in another app. Import a
file to turn it into a note.

## Exporting a note

Choose **Export** in the note's menu, then a format:

- **Desktop and web:** right-click the note in the sidebar, or its tab with
  the tabs layout.
- **iOS and Android tablets:** long-press the note in the sidebar, or its tab.
- **Phones:** open the **⋯** menu of the open note, or of a note in the notes
  list (see [On phones](/features/notes_and_tabs/#on-phones)).

| Format | What the file holds |
| ------ | ------------------- |
| **Markdown** (.md) | Each line, with its result in a column on the right. Headings, lists, quotes and bold or italic text keep their Markdown markers. |
| **Plain text** (.txt) | Each line, with its result in a column on the right. |
| **CSV** (.csv) | One row per line, with a **Line** and a **Result** column. It opens in a spreadsheet. |
| **PDF** (.pdf) | The note as the editor shows it: its colours, the line numbers and the line rules when they are on, and the results where you place them. |

With **Highlight results** on, results in a PDF take the colours of the text
you type, as in the app (see [Settings](/features/settings/)).

In a CSV file, a line that a spreadsheet would run as a formula, such as one
that starts with `=`, gets an apostrophe in front of it. A plain number such
as `-5` doesn't.

Where the file goes:

- **Desktop apps:** a save panel opens, so you choose the folder and the name.
- **iOS and Android:** the share sheet opens. Save the file or send it to
  another app.
- **Web app:** the browser downloads the file.

## Importing notes

Choose **Import notes**, then pick one or more Markdown (.md), text (.txt) or
CSV (.csv) files. Each file opens as a new note.

- **Desktop, web and tablets:** click the **Import notes** button (a file
  with an arrow) in the top bar, next to the command palette button or the
  **+** of the tabs. You can also open the command palette (**Cmd/Ctrl + K**)
  and choose **Import notes**, next to **New note**.
- **Phones:** tap your avatar at the top of the notes list, then choose
  **Import notes**.

What comes back:

- **Markdown:** headings, lists, quotes, rules, and bold, italic, struck and
  code text.
- **Plain text:** every line as you wrote it.
- **CSV:** a file the app exported gives back its **Line** column. Any other
  CSV file is read as plain text.

A note's title is its first heading. Without a heading, the note takes the
file's name.

A file the app exported comes back without its results column: the note
works the results out again. So you can export a note and import it again,
and get the same note. In a CSV file, a line that starts with an apostrophe
before `=`, `+`, `-` or `@` keeps its apostrophe.

PDF files can't be imported, and a file must be text in UTF-8.
