# Creative Direction: "Back to Work"

**Hon. Joyce Chepkoech Korir · Woman Rep, Bomet · 10 August 2027**
Phase 3 · 22 November 2026 · Built from [BRIEF.md](BRIEF.md) and [RESEARCH-SUMMARY.md](RESEARCH-SUMMARY.md)

## 1. Concept

**"The work, on the record."** A documentary campaign. Real photographs of Joyce at work in Bomet: tea farms, markets, schools, women's groups, the Senate floor. Over them sit thin, sourced data overlays, like a field reporter's notes. Every number on screen carries a tiny source mark, and tapping it opens the source. The proof is the design.

The theme line is **"Back to work for Bomet's women" / "Mama Arudi Kazini"**. The site reads as a work log for a returning leader. It isn't framed as a re-election.

## 2. Signature motifs

| Motif | Origin | Use |
|---|---|---|
| **Tea rows** | Bomet's tea-terraced hills seen from above: parallel, gently curving lines | Section dividers, chart gridlines, map hatching for constituencies she led, placeholder texture |
| **The ladder ("Ngazi")** | Her four levels of office: Ward → County Assembly → National Assembly → Senate | Story timeline, the 3 numbered entry cards, the progress bar on the countdown |
| **Source tick** | A small superscript square ▪ beside every figure | Opens a popover with the title, publisher, date and link from `sources.ts` |
| **Field-note overlay** | A reporter's notebook on a photo | A semi-opaque ink strip on the photo, holding a large numeral, a label and a source tick |
| **5 · 25** | 5 constituencies, 25 wards | Navigation for county and constituency pages, map legend, footer pattern |

## 3. Palette (from the Bomet landscape, with a UDA accent)

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#14201A` | Text, overlay strips, dark surfaces |
| `--tea` | `#1F4D3A` | Primary brand: header, the chart's main series |
| `--leaf` | `#3E7D5A` | Secondary series, hover states |
| `--laterite` | `#B4532A` | Red-earth highlight: emphasis, "pending" states, second chart series |
| `--laterite-ink` | `#9A4220` | Laterite for small text on paper (≈5.9:1; base laterite ≈4.4:1 fails AA) |
| `--muted` | `#4A5A50` | Secondary text on paper (≈6.5:1) |
| `--mist` | `#D9DED8` | Mau-forest mist: dividers, quiet fills |
| `--paper` | `#F6F1E7` | Page background (light) |
| `--accent` | `#F5C400` | **UDA yellow.** Used only for CTAs, the countdown pill and the map areas where she led. *Approximated; confirm the party's brand hex.* |

- **Rules:** yellow appears only on ink or tea, never as text on paper. All text pairs meet WCAG 2.2 AA, and the accent sits on ink at ≥ 4.5:1 for small text.
- **Dark mode:** the paper becomes ink `#0F1813`, with the tea surfaces lifted to `#1B3A2D`.

## 4. Type

- **Display:** *Fraunces*, a variable serif with a slightly soft optical size. It's editorial and warm, for headlines and the theme line.
- **UI and body:** *Inter*, for clarity in English and Kiswahili alike.
- **Data:** *IBM Plex Mono* with tabular numerals, for all statistics, countdown digits and table figures.
- **Scale:** mobile-first at 375px. Body 17/1.55, H1 44 (mobile) to 88 (desktop), stat numerals 56 to 120.
- **Licence:** all three are free under the OFL. Load them from Google Fonts and subset Latin plus Latin Extended.

## 5. Motion (choreographed, restrained)

- **Stat counters** tick up once when they come into view (≤ 900 ms, ease-out). The final value is always in the DOM for screen readers.
- **Tea-row lines** draw in left to right as section dividers (≤ 600 ms).
- **Hero portrait** gets a slow 1.04× push-in over 8 s, once.
- **Map:** areas fade in by constituency in a stagger. On tap, a margin chip rises in.
- **`prefers-reduced-motion`:** everything becomes static at its final state. **Lite mode**, for Save-Data or slow 2G/3G, turns off motion and video, serves AVIF thumbnails only, and swaps the map for a static image.

## 6. Photography treatment

- **Style:** documentary, natural light, eye-level, people working, not posing. Joyce appears in every section.
- **Grade:** slightly warm, lifted blacks, never filtered into duotone. Overlays carry the colour so the photos stay true.
- **Crops:** full-bleed 4:5 portrait on mobile and 16:9 on desktop for the hero, 3:2 for cards, 1:1 for the gallery grid.
- **Placeholders** (until photos arrive): a tea-row line texture in tea on mist, with the slot ID, aspect ratio and the shot needed in mono type. No faces and no silhouettes of people.
- **Credits:** every image is credited in a caption and in the footer's credits list.

## 7. Voice

Data-driven and modern. Short sentences, active verbs, and numbers first. Roles are honest: "sponsored", "allocated", "moved", never "built" unless a source says so. English and Kiswahili sit side by side with equal weight.

## 8. Canvases to publish (for your pick)

1. **Hero:** 3 directions. (A) full-bleed portrait with the field-note overlay; (B) a split layout with portrait and ledger column; (C) a large type-led theme line over a tea-row band with a portrait inset.
2. **Full home page:** mobile 375 and desktop 1440.
3. **Record and Projects:** filters, timeline, funds-by-year chart, by-sector chart, project card. Projects show "awaiting documents" states.
4. **Election map:** "Where we led in 2017". County result now, with constituency drill-down states and an accessible table.
5. **The Plan:** 3 DRAFT promises.

## 9. Canvas

Published (private): https://claude.ai/artifact/EDdN8VC22NkJSBac3hwf1A — 8 artboards.
