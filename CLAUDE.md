# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## CRM Lite

A small business CRM: contacts and a sales pipeline (deals moving through stages),
built with Next.js 16, Prisma 7, and Postgres.

This is a **teaching starter repo** for a Claude Code workshop. Students clone it,
pick a ticket from `project-notes/ISSUES.md`, and build it end-to-end in one session.
That shapes the design: no auth, no tests, no migration history, plain CSS, and
deliberately thin API routes — readability for a first-time reader beats completeness.

## Commands

```bash
pnpm install       # first-time setup (postinstall runs `prisma generate`)
pnpm db:up         # start local Postgres via Docker (skip if using a hosted DB)
pnpm db:push       # sync prisma/schema.prisma to your database
pnpm db:seed       # load demo contacts and deals (wipes both tables first)
pnpm dev           # start the app at http://localhost:3000
pnpm lint          # eslint
pnpm build         # prisma generate + next build (validates the whole app compiles)
pnpm db:studio     # browse/edit the database in a GUI
pnpm db:reset      # wipe the DB, re-push schema, re-seed (use if data gets messy)
pnpm db:down       # stop the local Docker Postgres
```

Fresh clone, from zero (Docker Postgres): copy `.env.example` to `.env`, then
`pnpm install && pnpm db:up && pnpm db:push && pnpm db:seed && pnpm dev`.

No Docker? Comment out the `DATABASE_URL` in `.env` and use a free Neon/Supabase
instance instead (see `.env.example`), then skip `pnpm db:up`/`db:down`.

**There is no test suite and no typecheck script.** `pnpm build` is the type/compile
gate (`tsc` runs under `next build` with `strict: true`). Verify behavior by running
`pnpm dev` and checking the browser. Run `pnpm lint` and `pnpm build` before
considering a change done.

## Stack and wiring

- Next.js App Router + TypeScript, React 19. Path alias `@/*` → repo root.
- Prisma 7 with the **driver-adapter** setup: `@prisma/adapter-pg` over `pg`, not
  Prisma's own query engine.
- `prisma/schema.prisma` intentionally has **no `url` in the `datasource` block** —
  the connection string is supplied in two places instead: `prisma.config.ts`
  (for CLI commands like `db:push`/`db:seed`) and `lib/prisma.ts` (for the app,
  via `new PrismaPg({ connectionString: process.env.DATABASE_URL })`).
- The generated Prisma client lives at `lib/generated/prisma`, **not** in
  `node_modules`. Always import it as `@/lib/generated/prisma/client` — importing
  `@prisma/client` directly will not work. Scripts outside the Next.js build
  (e.g. `prisma/seed.ts`) use the relative path `../lib/generated/prisma/client`,
  since the `@/*` alias is TypeScript-only.
- Plain CSS in `app/globals.css` — no component library, no CSS modules, no Tailwind.
  Style with the existing class names (`card`, `muted`, `contact-list`, `contact-row`,
  `pipeline`, `pipeline-column`, `deal-card`).
- ESLint (`eslint-config-next`) ignores `lib/generated/**`.

## Data model

- `Contact`: a business's customer — name, email, phone, company, notes.
- `Deal`: a potential sale tied to one `Contact`, moving through a `DealStage`
  enum (`LEAD → QUALIFIED → PROPOSAL → NEGOTIATION → WON`/`LOST`).
  Deleting a contact cascades to its deals (`onDelete: Cascade`).
- Deal value is stored as `valueCents` (an integer), never a float — avoids
  rounding bugs with money. Display it with `formatCents()` from `lib/format.ts`.
- `STAGE_ORDER` and `STAGE_LABELS` in `lib/format.ts` are the single source of
  truth for pipeline column order and display names. If you add or reorder a
  `DealStage` value, update both — the schema enum alone won't move the UI.

## Folder map

```text
prisma/schema.prisma   # data model
prisma/seed.ts         # demo data (12 contacts, deals across all stages)
prisma.config.ts       # points the Prisma CLI at the schema + DATABASE_URL
lib/prisma.ts          # Prisma client singleton — import `prisma` from here
lib/format.ts          # money/date formatting + stage label/order constants
components/            # ContactList, ContactForm, PipelineBoard, DealCard
app/contacts/          # contacts list + detail pages
app/deals/             # pipeline board page
app/api/contacts/, app/api/deals/   # REST-ish API routes (GET/POST/PATCH/DELETE)
project-notes/         # workshop material: ISSUES.md (tickets), STATUS.md
materials/             # install cheat-sheets and tracker templates for the session
```

`app/page.tsx` is just a `redirect("/contacts")`.

## Architecture patterns

**Read path — server components query Prisma directly.** Every page is an `async`
server component that calls `prisma` and passes plain data down. All three pages
set `export const dynamic = "force-dynamic"` so the seeded data always shows up
fresh; keep that on any new page that reads the database.

**Write path — client components POST/PATCH to `/api/*`, then `router.refresh()`.**
See `components/ContactForm.tsx` for the pattern: `"use client"`, uncontrolled
form read via `FormData`, `fetch` the API route, `reset()`, then
`router.refresh()` to re-run the server component and pull the new row in.
Don't introduce a client-side data store or Server Actions — follow the existing shape.

**Component props are hand-written structural types, not Prisma types.** `ContactList`,
`DealCard`, and `PipelineBoard` each declare a local `type` describing only the
fields they use (and `PipelineBoard` types `stage` as `string`, not the enum).
Keep this — it lets a page narrow its query with `select` without fighting types.

**API route conventions:**
- Return the model JSON directly — no `{ data: ... }` wrapper envelope.
- `POST` → `201` with the created row; `DELETE` → `204` with an empty body;
  missing row on `GET` → `404 { error: "Not found" }`.
- Dynamic route params are async in Next.js 16:
  `{ params }: { params: Promise<{ id: string }> }` — `await params` before use.
  This applies to pages too (`app/contacts/[id]/page.tsx`).
- Routes currently trust the request body with no validation, and `PATCH` handlers
  pass fields through undefined-as-no-op. That's the deliberate starting point,
  not an invariant — ticket 4 in `project-notes/ISSUES.md` is adding validation.

## Conventions

- IDs are cuids (`@default(cuid())`), fields are camelCase.
- Add `@@index` on any column you'll frequently filter/group by (see `stage`,
  `contactId`, `company` in the schema).
- Named exports for components (`export function ContactList`), default exports
  for pages and route handlers (as Next.js requires).

## What NOT to touch

- Don't hand-edit anything under `lib/generated/prisma/**` — it's regenerated by
  `prisma generate` / `postinstall`.
- Don't rename `contactId` or `stage` without also updating `prisma/seed.ts`.
- Don't add auth, payments, or email — out of scope for this session.
- Don't switch `db:push` to `migrate dev` — this project intentionally has no
  migration history so every student's fresh clone "just works."

## How to pick up work

1. Keep changes small and scoped to a single, reviewable diff.
2. Run `pnpm dev` and check your change in the browser before considering it done.
