# PROGRESS

| Phase | Status | Date |
|---|---|---|
| 1 — Interview / brief | ✅ Approved | 2026-11-22 |
| 2 — Research | ✅ Approved | 2026-11-22 |
| 3 — Creative direction & canvases | ✅ Approved — Hero A | 2026-11-24 |
| 4 — Scaffold, design system, shell, /styleguide | ✅ Quality gate passed | 2026-11-24 |
| 5 — Home (Hero A, as approved) | ✅ Quality gate passed | 2026-11-24 |
| 6 — Record, Projects, Map, Plan, all tabs, county + constituency pages | ✅ Quality gate passed | 2026-11-24 |
| 7 — Forms, SEO, a11y, Lighthouse, review agents | ✅ Done (Lighthouse perf 82–91 < 95 — see docs/LIGHTHOUSE.md) | 2026-11-24 |
| 8 — Ship: https://github.com/MachtheG/Hon.JKdemo (public) | ✅ CI green | 2026-11-24 |

### Phase 8 — ship (2026-11-24)
- Code review (6 findings) and security review (docs/SECURITY-REVIEW.md) fixed before push; npm audit 0; secret scan of tree + history clean; commits attributed to the GitHub no-reply address.
- First CI runs failed on one test: a 1px sideways scroll on /en/styleguide at 768px under Linux fonts, caused by the source tick's invisible hit area. Fixed in 3550d3f; CI green: https://github.com/MachtheG/Hon.JKdemo/actions/runs/45441477191

### Phase 7 quality gate (2026-11-24)
- **Checks:** lint ✅ · typecheck ✅ · unit 27/27 ✅ · build ✅ · sources ✅ (72 refs) · translations ✅ (17 namespaces × en/sw)
- **Browser tests:** 186/186 ✅ at 375 / 768 / 1440:
  - **Accessibility:** axe WCAG 2.0/2.1/2.2 A+AA reports 0 violations on 17 pages.
  - **Forms:** validation, explicit consent, success messages, Kiswahili errors.
  - **SEO:** canonical, hreflang, OG image, JSON-LD, sitemap, robots, share card.
- **Lighthouse (mobile, local):** Accessibility, Best practices and SEO are 100 on every page. Performance medians are 82–91, **below the 95 target**, because of runtime Total Blocking Time. Details and options are in docs/LIGHTHOUSE.md.
- **Forms:** set `FORM_ADAPTER` to `resend` or `supabase` in production. Until it is set, forms answer "not open yet" and nothing is lost silently.
- **Fact-checker:** first run was **FAIL** (1 blocker, 5 majors). All fixed. **Re-run: PASS**, and its 4 remaining minors are fixed too (share card, site name, nomination wording, election-day message).
  - **Blocker:** the county page and the header implied she is the current Woman Rep. Both are now past tense, or "candidate".
  - **Majors:** two unsourced NGAAF-role claims and a dead KNA link are now marked TO CONFIRM. The unread "first woman Mayor 2011" claim is replaced by the official profile's wording, "Mayor/Deputy Mayor", and the related news item is hidden.
  - **Minors:** source citations corrected (ladder, JKUAT, Senate rung). Source notes now record committee names and statement dates. "Votes for Woman Rep" instead of "as Woman Rep". The unsourced "6am" is removed. The 2027 party ticket is marked TO CONFIRM.
- **Design critic:** 18 findings, all addressed. The most important:
  - two-tone focus ring (it was invisible on paper and on yellow)
  - mobile results table no longer clips
  - mobile hero is now a true 4:5 Hero A
  - rung ladder replaces the bars
  - shape-coded timeline markers
  - designed TO CONFIRM chips
  - empty-state chip, with the explanation shown first
  - map teaser uses tea + hatch with an accent outline
  - multi-source ticks merged, with a 44px hit area
  - EN/SW switch moved into the mobile menu
  - zoomed constituency maps with readable labels

### Phase 6 quality gate (2026-11-24)
- **Checks:** lint ✅ · typecheck ✅ · unit 13/13 ✅ · build ✅ · sources ✅ · translations ✅. e2e 108/108 ✅.
- **Map:** SVG from geoBoundaries (licences in data/credits.ts). Shading is county-level only. The ward "Chaik" is excluded (it is a Kericho ward).
- **Charts:** hand-built single-series SVG with a table view. No Recharts yet, because there is no data to chart.

### Phase 5 quality gate (2026-11-24)
- **Checks:** lint ✅ · typecheck ✅ · unit 10/10 ✅ · build ✅ · e2e 42/42 ✅. SourceTick hydration fix. Counters never show zeros.

### Phase 4 quality gate (2026-11-24)
- **Checks:** lint ✅ · typecheck ✅ · unit 10/10 ✅ · build ✅ · e2e 18/18 ✅.

## Race corrected to MP, Bomet Central (2026-11-24)
- All titles, hero, share card, calendar invite, footer, nav (Bomet Central dropdown), county and donate copy switched to MP, Bomet Central (EN/SW). Past Woman Rep record kept as history.
- Plan rewritten for an MP; still DRAFT until the campaign signs off.
- Follow-up offered: one page per Bomet Central ward (brief's MP structure) and NG-CDF Bomet Central allocations research. Done — see below.

## Bomet Central hub, ward pages and NG-CDF (2026-11-24)
- **/bomet-central** hub: constituency figures, five ward cards, NG-CDF allocations chart + table, NG-CDF-listed projects. Nav "Bomet Central" now points here.
- **/bomet-central/[ward]** for Silibwet Township, Ndaraweta, Singorwet, Chesoen and Mutarakwa: 2022 and 2017 registered voters, 2017 polling stations, locator map (ward in gold), pledge call to action. Singorwet carries Joyce's councillor/MCA record.
- **Sources:** IEBC registered voters per ward 2022 (`iebc-rov-caw-2022`) and 2017 (`iebc-rov-caw-2017`); NG-CDF Board allocations for constituency 197, FY 2013/14–2026/27 (`ngcdf-allocations-197`; KSh 192.6m approved for 2026/27); NG-CDF Bomet Central project list (`ngcdf-bomet-central-projects`). Ward sums are unit-tested against the constituency totals.
- Allocations are shown as approved amounts managed under the MPs of the day, not as Joyce's work. NG-CDF does not publish projects by ward or amount; ward results still wait on Forms 37A (register item 2). Nothing is estimated.

## Client redesign (2026-11-24)
- Rebuilt to the campaign's reference layout: white base, UDA green + gold, Outfit/Inter type, Senate seal + wordmark, pill navigation with dropdowns, gold Donate button, hero with photo + green scrim + sign-up form, live countdown (days/hours/minutes/seconds), real photographs in every slot (no placeholders).
- **Public vs review build:** the public build omits every unverified item (no visible [[TO CONFIRM]] markers, and claims that depend on them are left out). Set `NEXT_PUBLIC_SHOW_TO_CONFIRM=true` for an internal review build that shows them. The register below is unchanged.
- Photos: 3 press/official photos of Joyce (credited; permission to confirm) + 1 official portrait + 3 openly licensed Bomet landscapes (CC BY-SA 4.0, credited on /credits).

## [[TO CONFIRM]] register

| # | Item | Needed from | Blocks |
|---|---|---|---|
| 1 | Forms 37B (5 constituencies), 2017 Woman Rep, Bomet | Campaign agents | Map below county level |
| 2 | Forms 37A / ward tallies (25 wards) | Campaign agents | Ward drill-down |
| 3 | Rejected ballots, 2017 Woman Rep (Form 37C) | Campaign / IEBC | Turnout accuracy |
| 4 | NGAAF allocations & approved project lists FY2017/18–2021/22 | Campaign | Projects page, map overlay, funds chart |
| 5 | Secondary school name (Mugango in the 2017 profile vs Mucamco in the 2022 profile) | Campaign | Story timeline |
| 6 | JKUAT diploma: 2017 profile says County Governance 2014–2017; 2022 profile says 2015–2017 | Campaign | Story timeline |
| 7 | Moi University degree: completed? | Campaign | Story timeline |
| 8 | Years as Deputy Mayor and as Mayor. "Elected councillor, Singorwet" is now confirmed by the NA profile. | Campaign | Record, Story |
| 9 | CBS: seen only in a search snippet of the PSC report. Page, year conferred, Gazette notice. | Campaign / Research | Story (honours) |
| 10 | County Library Services Bill: current status (assent?) | Parliament | Record page |
| 11 | KNA "early pregnancies" article: link now returns 404. Need an archived copy (news item hidden; Plan claim marked). | Research | Plan, News |
| 12 | Kenya Gazette notice for the 10 Aug 2027 election date (currently cited via The Standard) | Research | Countdown source |
| 13 | KNBS Vol. I/II table references (figures currently via secondary transcriptions) | Research | Context stats |
| 14 | Kiswahili: slogan "Mama Arudi Kazini" and all site copy, native review | Campaign | Theme, all pages |
| 15 | Authorised-by line (agent name, address) | Campaign | Footer |
| 16 | Official WhatsApp channel link; official social accounts | Campaign | Get Involved |
| 17 | Photo rights for Parliament portraits / supplied photos | Campaign | All sections |
| 18 | Three promises: DRAFT until signed off | Campaign | The Plan |
| 19 | Official source for the Woman Rep's NGAAF role (e.g. PFM (NGAAF) Regulations, NGAAF Board) | Research | Projects intro, Plan #1 |
| 20 | "First woman Mayor of Bomet" (Daily Nation, 4 Jul 2011): article unread (403) | Research | Hidden news item |
| 21 | Campaign office address, phone, email | Campaign | Contact |
| 22 | Data controller legal name, postal address, email, ODPC registration number | Campaign | Privacy notice |
| 23 | Final list of data processors (e.g. Vercel, Resend/Supabase) and where they store data | Campaign | Privacy notice |
| 24 | Retention period for form data (draft: until 30 Nov 2027) | Campaign | Privacy notice |
| 25 | 2027 UDA ticket (IEBC candidate nominations 29 May – 11 Jun 2027; party primary date needs its own source) | Campaign | Footer party line |
| 26 | UDA brand colours (gold approximated as #D4A62A, green #0B6E3A) | Campaign | Palette |
| 27 | **Written authorisation to use the Parliament of Kenya (Senate) seal** beside the candidate's name (used at the campaign's instruction; file: public/brand/senate-seal.png) | Campaign / Parliament | Header, footer |
| 28 | Permission for press photos (Kenyans.co.ke ×2, Parliament of Kenya ×2) and higher-resolution originals for the hero | Campaign | Hero and all photo slots |
| 29 | M-Pesa paybill/till and contribution rules for the Donate page | Campaign | Donate |

## Known data errors in third-party sources (excluded)
- Mzalendo 12th-Parliament page: 242,775 votes / Gazette 9951 belong to the 2022 winner.
- TransTally 2017: registered voters and turnout use the 2022 register.
