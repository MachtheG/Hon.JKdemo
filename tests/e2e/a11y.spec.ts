import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const paths = [
  "/en",
  "/sw",
  "/en/record",
  "/en/projects",
  "/en/map",
  "/en/plan",
  "/en/story",
  "/en/bomet",
  "/en/bomet/konoin",
  "/en/bomet-central",
  "/en/bomet-central/singorwet",
  "/en/gallery",
  "/en/news",
  "/en/get-involved",
  "/en/donate",
  "/en/contact",
  "/en/privacy",
  "/en/sources",
  "/en/credits",
  "/sw/get-involved",
];

for (const path of paths) {
  test(`${path}: no WCAG 2.2 A/AA violations (axe)`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.length} × ${v.nodes[0]?.target.join(" ")}`);
    expect(summary, summary.join("\n")).toEqual([]);
  });
}
