import { expect, test } from "@playwright/test";

/** Elements sticking out past the viewport — named in the failure message so CI shows the culprit. */
async function overflowReport(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const over = document.documentElement.scrollWidth - window.innerWidth;
    const culprits = [...document.querySelectorAll("body *")]
      .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 0.5)
      .slice(0, 5)
      .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} → right ${Math.round(el.getBoundingClientRect().right)}`);
    return { over, culprits: culprits.join(" | ") };
  });
}

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
    await expect(page.getByRole("link", { name: /^(\d+ days|Siku \d+) · 10\.08\.2027 (until the election|hadi uchaguzi)$/ })).toBeVisible();

    const { over, culprits } = await overflowReport(page);
    expect(over, culprits).toBeLessThanOrEqual(0);

    await page.screenshot({
      path: `docs/screenshots/phase-7/${p.name}-${info.project.name}.png`,
      fullPage: true,
    });
  });
}

test("home: all approved sections render in order", async ({ page }) => {
  await page.goto("/en");
  await expect(page.getByRole("heading", { level: 1, name: "Mama Arudi Kazini." })).toBeVisible();
  for (const name of [
    "The work, on the record.",
    "Every shilling, by ward.",
    "Where we led in 2017",
    "Three promises for the next term",
    "Join the work.",
  ]) {
    await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
  }
  await expect(page.locator("#countdown")).toContainText(/days to go/);
  await expect(page.getByRole("link", { name: "Share these numbers on WhatsApp" })).toHaveAttribute("href", /^https:\/\/wa\.me\/\?text=/);
});

test("home: stats never show a placeholder zero, before or after scrolling", async ({ page }) => {
  await page.goto("/en");
  const stats = page.locator("section[aria-labelledby=stats-title] dd");
  await expect(stats.first()).toContainText("205,964");
  await stats.first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await expect(stats.nth(0)).toContainText("205,964");
  await expect(stats.nth(1)).toContainText("78.5%");
});

for (const path of ["/en", "/sw", "/en/styleguide"]) {
  test(`${path}: hydrates with no page errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });
}

test("home: a source tick opens its source", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("button", { name: /Source: Data Report of the 2017 General Election/ }).first().click();
  const pop = page.getByRole("dialog", { name: "Data Report of the 2017 General Election" }).first();
  await expect(pop).toBeVisible();
  await expect(pop.getByRole("link", { name: /Open source/ })).toHaveAttribute("href", /iebc\.or\.ke/);
});

test("home: final figures are in the server HTML", async ({ request }) => {
  const html = await (await request.get("/en")).text();
  expect(html).toContain("205,964");
  expect(html).toContain("78.5%");
});

test("home: add to calendar downloads an .ics", async ({ page }) => {
  await page.goto("/en");
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Add to calendar" }).click();
  expect((await download).suggestedFilename()).toBe("election-2027-08-10.ics");
});

test("root redirects to /en", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
});

test("language toggle switches to Kiswahili", async ({ page }) => {
  await page.goto("/en/styleguide");
  const visibleSwitch = page.getByRole("link", { name: /Switch language to Kiswahili/ }).filter({ visible: true });
  // On phones the language switch lives inside the menu.
  if ((await visibleSwitch.count()) === 0) await page.getByRole("button", { name: "Open menu" }).click();
  await visibleSwitch.first().click();
  await expect(page).toHaveURL(/\/sw\/styleguide$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "sw");
});

test("skip link targets main", async ({ page }) => {
  await page.goto("/en");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
});
