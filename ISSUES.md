# Starter issues

Pick one, build it, demo it. Each is scoped to roughly one file or one small
component — reasonable for a repo you cloned an hour ago.

1. **Contact search bar** — add a text input on `/contacts` that filters the
   list client-side by name or company as you type.

2. **Change deal stage** — add a `<select>` on each deal card (`components/DealCard.tsx`)
   that `PATCH`es `/api/deals/[id]` to move it to a new stage.

3. **Pipeline value summary** — show a total dollar value per stage column
   header on `/deals` (sum `valueCents` of deals in that stage; exclude `LOST`).

4. **Contact form validation** — add required-field and email-format
   validation to the new-contact form (`components/ContactForm.tsx`), with
   inline error messages.

5. **Empty states** — show a friendly "No contacts yet" / "No deals in this
   stage" message instead of a blank list when there's no data.

6. **Edit a deal** — add an edit view or modal for a deal's title, value, and
   expected close date.

7. **Delete a contact with confirmation** — add a delete button with a
   confirm step; warn (or block) if the contact has open (non-WON/LOST) deals.

8. *(stretch)* **Sort deals** — add a sort control (by value or expected
   close date) within each pipeline stage column.

## Ground rules

- Read `CLAUDE.md` first — it has the commands, data model, and conventions.
- One ticket at a time. Get it working end-to-end before moving on.
- If you get blocked, update your `STATUS.md` and flag it.
