import { expect, test } from "@playwright/test";

const pages = [
  { name: "home-en", path: "/en" },
  { name: "home-sw", path: "/sw" },
  { name: "styleguide-en", path: "/en/styleguide" },
];

for (const p of pages) {
  test(`${p.name}: shell renders, no horizontal scroll, screenshot`, async ({ page }, info) => {
    await page.goto(p.path);
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.locator("main#main")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();

    // Countdown pill hydrates to a day count.
    await expect(page.getByRole("link", { name: /(days until|Siku \d+ hadi)/ })).toBeVisible();

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);

    await page.screenshot({
      path: `docs/screenshots/phase-4/${p.name}-${info.project.name}.png`,
      fullPage: true,
    });
  });
}

test("root redirects to /en", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
});

test("language toggle switches to Kiswahili", async ({ page }) => {
  await page.goto("/en/styleguide");
  await page.getByRole("link", { name: "Switch language to Kiswahili" }).first().click();
  await expect(page).toHaveURL(/\/sw\/styleguide$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "sw");
});

test("skip link targets main", async ({ page }) => {
  await page.goto("/en");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
});
