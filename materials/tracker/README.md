# Dev-readiness tracker — how it works

Two pieces, both needed:

1. **`crm-lite/STATUS.md`** — ships inside the starter repo, so every student
   has it the moment they copy the repo. It's a plain markdown checklist, not
   a script or CLI command — a student who's genuinely 🔴 blocked may not have
   a working Node install yet, so the self-report mechanism can't depend on
   tooling that might itself be broken.

2. **The Google Sheet** ([template](./GOOGLE-SHEET-TEMPLATE.md)) — the actual
   room-visible Green/Yellow/Red board, projected or shared with the room.
   The instructor fills in each row by glancing at a student's `STATUS.md`
   during the walk-around.

> **Note:** this two-piece design is a judgment call for the ambiguous
> "custom dashboard that the developer updates in the project + Google Sheet"
> requirement — confirm it matches what you had in mind, or adjust before the
> session.

## Timer

Not a build item — just project a visible countdown timer during work blocks
(any full-screen browser countdown or Pomodoro timer works). 15–20 minute
chunks per lab block is a reasonable default cadence.
