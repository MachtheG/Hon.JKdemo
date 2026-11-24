# Joyce Korir 2027: campaign website

The campaign site for **Hon. Joyce Chepkoech Korir**, candidate for **Woman Representative, Bomet County**, in Kenya's general election on **10 August 2027**. It is in English and Kiswahili.

The site has one rule: **every figure links to its source.** Anything not yet verified is shown on the page as `[[TO CONFIRM: …]]` and tracked in [PROGRESS.md](PROGRESS.md).

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Cache Components, partial prefetching), React 19, TypeScript strict |
| Styling | Tailwind CSS v4, design tokens in `app/globals.css`, shadcn-style components (`components/ui`) |
| i18n | next-intl 4 with `en` / `sw` routes (`/en/…`, `/sw/…`); locale read via `next/root-params` |
| Map | Server-rendered SVG built from openly licensed geoBoundaries data (`npm run map`) |
| Forms | React Hook Form + Zod (same schemas on client and server), Server Action, pluggable storage (console / Resend / Supabase) |
| Images | `next/image` (AVIF/WebP on demand), plus `npm run images` (sharp) for EXIF stripping, sizing and blur placeholders |
| Tests | Vitest (unit), Playwright (e2e at 375/768/1440), axe-core (WCAG 2.2 AA), Lighthouse |
| CI | GitHub Actions: lint, typecheck, source check, translation check, unit, build, e2e |

## Run it

```bash
npm ci
cp .env.example .env.local      # FORM_ADAPTER=console for local dev
# NEXT_PUBLIC_SHOW_TO_CONFIRM=true  → internal review build showing [[TO CONFIRM]] markers
npm run dev                     # http://localhost:3000 → redirects to /en
```

| Script | What it does |
|---|---|
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` · `npm run typecheck` | ESLint · route typegen + `tsc` |
| `npm test` | Unit tests (data integrity, forms, Server Action, countdown) |
| `npm run test:e2e` | Playwright at 375/768/1440, plus axe, forms and SEO. Writes screenshots to `docs/screenshots/` |
| `npm run check:sources` | Every source id used exists; no figure rests only on a wiki or aggregator |
| `npm run check:translations` | `en` and `sw` have identical keys, with no empty strings |
| `npm run images` | Processes photos in `public/images/` (see below) |
| `npm run map` | Rebuilds `data/geo/bomet-paths.ts` from the boundary GeoJSON |

## Folder map

```
app/
  [locale]/            one folder per tab: page.tsx (+ layout, not-found, opengraph-image)
    record/ projects/ projects/[id]/ map/ plan/ story/ bomet/ bomet/[constituency]/
    gallery/ news/ get-involved/ contact/ privacy/ sources/ credits/ styleguide/
  actions/forms.ts     the single Server Action for all forms
  sitemap.ts robots.ts global-not-found.tsx globals.css
components/
  <tab>/               components for that tab only (one per file)
  layout/ shared/ ui/ forms/
data/                  ← the content. Every claim lives here or in messages/
  sources.ts           source registry (title, publisher, date, URL, notes, tier)
  stats.ts             census, voter and Senate figures
  election/results-2017.ts   IEBC results (county level; constituencies pending Forms 37B)
  projects.ts          NGAAF projects ledger (empty until documents arrive)
  bio.ts news.ts photos.ts credits.ts
  geo/                 boundary GeoJSON + generated SVG paths
messages/en|sw/<tab>.json   all visible text, one file per tab
i18n/                  routing, request config, navigation helpers
lib/                   election maths, formatting, SEO, forms (schemas, adapters, rate limit)
scripts/               check-sources, check-translations, build-map, images
tests/unit · tests/e2e
docs/                  BRIEF, RESEARCH-SUMMARY, CREATIVE-DIRECTION, SHOT-LIST, LIGHTHOUSE, screenshots
.claude/agents/        fact-checker and design-critic review agents
```

## Common tasks

### Add a photo
1. Get the photographer's permission and credit. Never use AI images of Joyce or any real person.
2. Drop the original into `public/images/<category>/`. The categories are `portrait`, `community`, `parliament`, `projects` and `events`.
3. Run `npm run images`. It fixes the rotation, strips EXIF/GPS, caps the size at 3200px, generates a blur placeholder, and lists any files that aren't linked to a slot yet.
4. In `data/photos.ts`, set `file: "/images/<category>/<name>.jpg"` on the matching slot (see [docs/SHOT-LIST.md](docs/SHOT-LIST.md)). Then add `credit`, `licence` and optionally `alt` and `caption` in both languages. For a project's before/after photos, set `linkedProject` to the project's id.

### Add a project (NGAAF)
1. Add the supporting document to `data/sources.ts` as a new source with `tier: "official"`.
2. Add an entry to `data/projects.ts`:
   - **Role:** one of `sponsored`, `lobbied`, `allocated`, `oversaw` or `delivered`. Never claim "built" unless the source says so.
   - **`amountKind`:** say whether the figure is an `allocation`, a `disbursement` or `expenditure`.
3. Charts, filters, the detail page, the map overlay and the sitemap all update automatically. Run `npm run check:sources`.

### Add election results (Forms 37B / 37A)
1. Register each form (or the agent's certified copy) in `data/sources.ts`.
2. Fill `constituencies` / `wards` in `data/election/results-2017.ts`. Record only the numbers printed on the forms. Never estimate.
3. Remove the "pending" states in `components/map/` and the results table. Then run the tests and the fact-checker agent.

### Edit text or translations
Change both `messages/en/<tab>.json` and `messages/sw/<tab>.json` and run `npm run check:translations`. ICU plurals are supported (`{days, plural, one {…} other {…}}`). Keep the `[[TO CONFIRM: …]]` markers until the fact is verified. They render as visible chips and are stripped from search snippets.

### Review before release
Use Claude Code's review agents in `.claude/agents/`. Run **fact-checker** after any change to data or text, and **design-critic** after visual changes.

## Deploy (Vercel)

1. Import the GitHub repo into Vercel. The framework (Next.js) is detected automatically.
2. Set these environment variables:
   - `NEXT_PUBLIC_SITE_URL`: the public URL, e.g. `https://joycekorir.co.ke`.
   - `FORM_ADAPTER`: `resend` or `supabase`. **Forms are off in production until this is set.**
   - For Resend: `RESEND_API_KEY`, `FORM_NOTIFY_EMAIL`, `FORM_FROM_EMAIL` (a verified sender).
   - For Supabase: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, plus tables `form_pledge`, `form_volunteer` and `form_contact`, with row-level security on and no public policies.
3. Deploy. Check `/sitemap.xml` and the share card at `/en/opengraph-image`, then run PageSpeed Insights (see [docs/LIGHTHOUSE.md](docs/LIGHTHOUSE.md)).
4. Before launch:
   - fill in the authorised-by line and the data-controller details in the privacy notice
   - register with the ODPC
   - get the Kiswahili reviewed by a native speaker

## Data protection (Kenya DPA 2019)
- Each form asks for explicit, unticked consent for a named purpose, with a separate opt-in for updates and a link to `/privacy`.
- Minimal data: no ID numbers, no dates of birth. Phone numbers are masked in logs.
- The server re-validates every submission, drops unknown fields, rate-limits and uses a honeypot.
- No tracking cookies. The only stored setting is the lite-mode choice, in the visitor's own browser.

## Licences and credits
- Boundaries: IEBC/OCHA (CC BY 3.0 IGO) and Omare & Omare (CC BY 4.0), via geoBoundaries.
- Fonts: OFL.
- Full list: `/credits` and `data/credits.ts`.
