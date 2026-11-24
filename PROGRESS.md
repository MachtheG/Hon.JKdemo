# PROGRESS

| Phase | Status | Date |
|---|---|---|
| 1 — Interview / brief | ✅ Approved | 2026-11-22 |
| 2 — Research | ✅ Approved | 2026-11-22 |
| 3 — Creative direction & canvases | ✅ Approved — Hero A | 2026-11-24 |
| 4 — Scaffold, design system, shell, /styleguide | ✅ Quality gate passed | 2026-11-24 |
| 5 — Home (Hero A, as approved) | ✅ Quality gate passed | 2026-11-24 |
| 6 — Record, Projects, Map, Plan, all tabs, county + constituency pages | ✅ Quality gate passed | 2026-11-24 |
| 7 — Forms, SEO, a11y, Lighthouse, agents | — | |

### Phase 6 quality gate (2026-11-24)
- lint ✅ · typecheck ✅ · unit 13/13 ✅ · build ✅ (all static/PPR) · sources ✅ (78 refs) · translations ✅ (16 namespaces × en/sw)
- e2e 108/108 ✅ at 375 / 768 / 1440 — every page: 200, clean hydration, no sideways scroll; map selection/keyboard/wards; URL filters; 404 placeholder; TO CONFIRM markers visible. Screenshots in docs/screenshots/phase-6/
- **Map:** lightweight server-rendered SVG (brief allows SVG for a small area) from geoBoundaries KEN ADM2/ADM3 — licences in data/credits.ts. Rebuild with `npm run map`. Works with no JS and in lite mode. MapLibre not needed.
- **Charts:** hand-built single-series SVG bars (tea), with hover and keyboard tooltips and a table view. No Recharts dependency yet; data is empty until NGAAF documents arrive.
- **Shading is county-level only** (the only level IEBC published); every constituency and ward panel says "Pending Form 37B/37A".
- Excluded ward "Chaik" (Kericho) that overlapped Konoin after boundary simplification.
- New TO CONFIRM items: WhatsApp channel link; campaign office/phone/email; data controller name and ODPC registration; processors list; retention period.

### Phase 5 quality gate (2026-11-24)
- lint ✅ · typecheck ✅ · unit 10/10 ✅ · build ✅ (static/PPR) · sources ✅ (67 refs) · translations ✅
- e2e 42/42 ✅ at 375 / 768 / 1440, incl. no hydration errors, sourced popover, .ics download, stats never show placeholder zeros — screenshots in docs/screenshots/phase-5/
- Fixed: SourceTick used block elements inside <p> (hydration error); counters could show "0" to non-scrolling viewers.
- Photo slots on home: 7 (see docs/SHOT-LIST.md). Stats, map preview and countdown bands carry no photo by design (data bands).
- Known until Phase 6: nav/CTA links to inner pages 404.

### Phase 4 quality gate (2026-11-24)
- lint ✅ · typecheck ✅ · unit tests 10/10 ✅ · build ✅ (all routes static/PPR)
- source check ✅ (25 sources, 60 refs) · translation check ✅ (3 namespaces × en/sw)
- e2e 18/18 ✅ at 375 / 768 / 1440 — screenshots in docs/screenshots/phase-4/
- Note: Kiswahili shell copy is a first draft — needs native review (item 14).
| 8 — Ship (repo `Hon.JKdemo`, public) | — | |

## [[TO CONFIRM]] register

| # | Item | Needed from | Blocks |
|---|---|---|---|
| 1 | Forms 37B (5 constituencies) — 2017 Woman Rep, Bomet | Campaign agents | Map below county level |
| 2 | Forms 37A / ward tallies (25 wards) | Campaign agents | Ward drill-down |
| 3 | Rejected ballots, 2017 Woman Rep (Form 37C) | Campaign / IEBC | Turnout accuracy |
| 4 | NGAAF allocations & approved project lists FY2017/18–2021/22 | Campaign | Projects page, map overlay, funds chart |
| 5 | Secondary school name (Mugango vs Mucamco) | Campaign | Story timeline |
| 6 | JKUAT diploma title & years | Campaign | Story timeline |
| 7 | Moi University degree — completed? | Campaign | Story timeline |
| 8 | Councillor 2007: elected or nominated; Deputy Mayor dates; Mayor 2011–2013 | Campaign | Story timeline |
| 9 | CBS — year conferred & Gazette notice | Campaign | Honours |
| 10 | County Library Services Bill — current status (assent?) | Parliament | Record page |
| 11 | KNA "early pregnancies" article date; Nation 2017 article date | Research | News |
| 12 | Kenya Gazette notice for 10 Aug 2027 election date | Research | Countdown source |
| 13 | KNBS Vol. I/II table refs (currently via secondary transcriptions) | Research | Context stats |
| 14 | Kiswahili slogan "Mama Arudi Kazini" — native review | Campaign | Theme |
| 15 | Authorised-by line (agent name, address) | Campaign | Footer |
| 16 | WhatsApp channel link; official social accounts | Campaign | Get Involved |
| 17 | Photo rights for Parliament portraits / supplied photos | Campaign | All sections |
| 18 | Three promises — DRAFT until signed off | Campaign | The Plan |

## Known data errors in third-party sources (excluded)
- Mzalendo 12th-Parliament page: 242,775 votes / Gazette 9951 belong to the 2022 winner.
- TransTally 2017: registered voters/turnout use the 2022 register.
