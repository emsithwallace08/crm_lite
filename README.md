# CRM Lite

A small business CRM: contacts and a sales pipeline (deals moving through stages),
built with Next.js, Prisma, and Postgres.

## Stack

- Next.js App Router + TypeScript
- Prisma 7 + Postgres, via `@prisma/adapter-pg`
- Plain CSS (`app/globals.css`), no component library

## Getting started

Fresh clone, from zero (Docker Postgres):

```bash
cp .env.example .env
pnpm install
pnpm db:up      # start local Postgres via Docker
pnpm db:push    # sync prisma/schema.prisma to your database
pnpm db:seed    # load demo contacts and deals
pnpm dev        # start the app at http://localhost:3000
```

No Docker? Comment out `DATABASE_URL` in `.env` and point it at a free
Neon/Supabase instance instead (see `.env.example`), then skip `pnpm db:up`/`db:down`.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the app at http://localhost:3000 |
| `pnpm lint` | Run ESLint |
| `pnpm build` | Generate the Prisma client and build for production |
| `pnpm db:push` | Sync `prisma/schema.prisma` to your database |
| `pnpm db:seed` | Load demo contacts and deals |
| `pnpm db:studio` | Browse/edit the database in a GUI |
| `pnpm db:reset` | Wipe the DB, re-push schema, re-seed |
| `pnpm db:up` / `pnpm db:down` | Start/stop local Docker Postgres |

## Data model

- `Contact`: a business's customer — name, email, phone, company, notes.
- `Deal`: a potential sale tied to one `Contact`, moving through a `DealStage`
  enum (`LEAD → QUALIFIED → PROPOSAL → NEGOTIATION → WON`/`LOST`). Value is
  stored as `valueCents` (an integer) to avoid rounding bugs with money.

## Project layout

```text
prisma/schema.prisma   # data model
prisma/seed.ts         # demo data
lib/prisma.ts          # Prisma client singleton
lib/format.ts          # money/date formatting + stage label/order constants
components/            # ContactList, ContactForm, PipelineBoard, DealCard
app/contacts/          # contacts list + detail pages
app/deals/              # pipeline board page
app/api/contacts/, app/api/deals/   # REST-ish API routes (GET/POST/PATCH/DELETE)
```

## Working on this repo with Claude Code

See [CLAUDE.md](CLAUDE.md) for conventions, architecture notes, and what not
to touch. Keep changes small and reviewable, and run `pnpm dev` to check your
change in the browser before considering it done.
