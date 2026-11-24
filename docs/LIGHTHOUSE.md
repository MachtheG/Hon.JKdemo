# Lighthouse (mobile): 24 November 2026

**Setup:** Lighthouse 13.6, mobile preset (simulated Moto G, 4× CPU slowdown, slow 4G), Playwright Chromium. Production build served by `next start` on a Windows laptop (benchmarkIndex ≈ 1,220). Each page was run 3 times. Raw JSON reports are gitignored.

| Page | Performance (3 runs) | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| /en (home) | 74 · 87 · 84 | 100 | 100 | 100 |
| /en/map | 84 · 84 · 85 | 100 | 100 | 100 |
| /en/get-involved | 84 · 80 · 83 | 100 | 100 | 100 |
| /en/privacy (baseline) | 87 · 91 · 91 | 100 | 100 | 100 |

- **LCP** ≈ 0.9–1.1 s and **CLS** ≈ 0 on every page.
- **The gap to 95 is Total Blocking Time** (≈ 370–850 ms simulated), mostly React/Next runtime hydration that every page shares. Even the near-static Privacy page carries most of it.

## Already done
- The browser now gets only the translation namespaces that client components use (4 of 17).
- The Motion library was replaced with a native counter, about 70 KB less JavaScript.
- tailwind-merge was removed from the header's client components (28 KB).
- The hero push-in animation runs on its own compositor layer.
- SEO went from 92 to 100. It had only failed because the canonical points to the production domain; measured with `NEXT_PUBLIC_SITE_URL` set to the test host, it passes.

## Options to reach ≥ 95 (each one is a trade-off; needs a decision)
1. **Measure on the real host first.** Run PageSpeed Insights on the Vercel URL after Phase 8. The edge CDN and Brotli usually score higher than a laptop, and simulated TBT varies a lot between machines (the home page ranged 74–87 here).
2. **Render the header controls on the server.** Turn the menu and language toggle into server-rendered `<details>` and plain links. This removes most client components from pages that have no forms.
3. **Drop the client-side translation provider on read-only pages.** Pass translated strings as props instead. This is the biggest saving, but it's a larger refactor.
4. **Turn off link prefetching** for footer links. The measured effect was small (within noise).
