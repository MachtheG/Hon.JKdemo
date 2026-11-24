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
  "record",
  "projects",
  "map",
  "plan",
  "story",
  "bomet",
  "bomet/sotik",
  "gallery",
  "news",
  "get-involved",
  "donate",
  "contact",
  "privacy",
  "sources",
  "credits",
];

for (const p of pages) {
  test(`/en/${p}: renders, hydrates cleanly, no sideways scroll`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const res = await page.goto(`/en/${p}`);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
    const { over, culprits } = await overflowReport(page);
    expect(over, culprits).toBeLessThanOrEqual(0);
    await page.screenshot({ path: `docs/screenshots/client-v2/${p.replace("/", "-")}-${info.project.name}.png`, fullPage: true });
  });
}

test("every page also renders in Kiswahili", async ({ request }) => {
  for (const p of pages) {
    const res = await request.get(`/sw/${p}`);
    expect(res.status(), p).toBe(200);
    expect(await res.text(), p).toContain('lang="sw"');
  }
});

test("map: selecting a constituency shows pending, never an estimate", async ({ page }) => {
  await page.goto("/en/map");
  await page.getByRole("button", { name: "Sotik", exact: true }).click();
  const panel = page.locator("aside[aria-live=polite]");
  await expect(panel).toContainText("Sotik");
  await expect(panel).toContainText("Pending Form 37B");
  await page.getByRole("button", { name: "Show county total" }).click();
  await expect(panel).toContainText("205,964");
});

test("map: wards level shows all 25 wards; table has county row", async ({ page }) => {
  await page.goto("/en/map");
  await page.getByRole("button", { name: "Wards", exact: true }).click();
  await expect(page.locator("svg [role=button]")).toHaveCount(25);
  await expect(page.getByRole("table")).toContainText("205,964");
  await expect(page.getByRole("table")).toContainText("Pending Form 37B");
});

test("map: keyboard can select an area", async ({ page }) => {
  await page.goto("/en/map");
  await page.getByRole("button", { name: "Konoin", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("aside[aria-live=polite]")).toContainText("Konoin");
});

test("projects: filters are kept in the URL", async ({ page }) => {
  await page.goto("/en/projects");
  await page.getByRole("button", { name: "Bursaries", exact: true }).click();
  await expect(page).toHaveURL(/sector=bursaries/);
  await page.getByLabel("Constituency").selectOption("konoin");
  await expect(page).toHaveURL(/constituency=konoin/);
  await page.reload();
  await expect(page.getByRole("button", { name: "Bursaries", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText("Awaiting documents").first()).toBeVisible();
});

test("projects: placeholder detail route is a 404", async ({ request }) => {
  expect((await request.get("/en/projects/__none")).status()).toBe(404);
});

test("constituency page lists its five wards", async ({ page }) => {
  await page.goto("/en/bomet/bomet-central");
  for (const w of ["Mutarakwa", "Silibwet Township", "Singorwet", "Chesoen", "Ndaraweta"]) {
    await expect(page.getByRole("listitem").filter({ hasText: w }).first()).toBeVisible();
  }
});

test("public build never shows TO CONFIRM markers or placeholder slot text", async ({ request }) => {
  for (const p of ["", ...pages]) {
    for (const loc of ["en", "sw"]) {
      const html = await (await request.get(`/${loc}/${p}`)).text();
      expect(html, `${loc}/${p}`).not.toContain("[[TO CONFIRM");
      expect(html, `${loc}/${p}`).not.toMatch(/HERO-01 · 16:9|min 2880×1620/);
    }
  }
});

test("every page shows real photographs", async ({ page }) => {
  for (const p of ["", "record", "story", "plan", "bomet", "news", "privacy"]) {
    await page.goto(`/en/${p}`);
    const imgs = page.locator("main img[src*='/_next/image'], main img[src*='/images/']");
    expect(await imgs.count(), p).toBeGreaterThan(0);
  }
});

test("header shows the Senate seal beside her name", async ({ page }) => {
  await page.goto("/en");
  const banner = page.getByRole("banner");
  await expect(banner.locator("img[src*='senate-seal']").first()).toBeVisible();
  await expect(banner.getByText("Joyce Korir", { exact: true })).toBeVisible();
});
