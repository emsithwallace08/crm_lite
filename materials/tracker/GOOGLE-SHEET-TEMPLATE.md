# Dev-readiness tracker — Google Sheet template

Build this sheet manually (no Sheets API integration exists for this — it's a
template to set up by hand, not an automated sync). Once built, project it or
share the link with the room during setup and work blocks.

## Columns

| Student Name | OS | Node ✓ | Git ✓ | VS Code ✓ | Claude Code ✓ | Repo Copied ✓ | DB Seeded ✓ | Status | Blocker Notes | Last Updated |
|---|---|---|---|---|---|---|---|---|---|---|

- One row per student, pre-filled with names before the session starts.
- The checkbox-style columns (`✓`): use Sheets' checkbox data type
  (Insert → Checkbox) for a fast visual scan.
- **Status** column: add data validation → dropdown list with exactly
  `Green`, `Yellow`, `Red`.

## Conditional formatting for the Status column

Set up three rules on the `Status` column:

| Value | Background |
|---|---|
| `Green` | `#d9ead3` |
| `Yellow` | `#fff2cc` |
| `Red` | `#f4cccc` |

This makes the room-visible board readable at a glance from across the room.

## Who updates it

Recommend **instructor/TA-updates-only** during the walk-around — safest
option, avoids accidental edits mid-lecture from many editors on one sheet.
Each student's own `crm-lite/STATUS.md` (in their copy of the starter repo) is
what you glance at on their screen to decide what to enter in their row.

See [README.md](./README.md) for how this ties together with `STATUS.md`.
