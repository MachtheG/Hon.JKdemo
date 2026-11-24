import { expect, test } from "@playwright/test";

test.describe("pledge form", () => {
  test("shows inline errors and requires consent", async ({ page }) => {
    await page.goto("/en/get-involved");
    const form = page.getByRole("form", { name: "Pledge my vote" });
    await form.getByRole("button", { name: "Pledge my vote" }).click();
    await expect(form.getByText("Please enter your full name.")).toBeVisible();
    await expect(form.getByText("We need your consent to use these details.")).toBeVisible();
    await expect(form.getByLabel("Full name")).toHaveAttribute("aria-invalid", "true");
    // Consent is never pre-ticked.
    await expect(form.getByRole("checkbox").first()).not.toBeChecked();
  });

  test("submits with valid data and consent", async ({ page }) => {
    await page.goto("/en/get-involved");
    const form = page.getByRole("form", { name: "Pledge my vote" });
    await form.getByLabel("Full name").fill("Test Voter");
    await form.getByLabel("Phone number").fill("0712 345 678");
    await form.getByLabel("Your ward").selectOption("Singorwet");
    await form.getByRole("checkbox", { name: /counting pledges by ward/ }).check();
    await form.getByRole("button", { name: "Pledge my vote" }).click();
    await expect(page.getByRole("status").filter({ hasText: "your pledge is counted" })).toBeVisible();
  });

  test("rejects a non-Kenyan phone number", async ({ page }) => {
    await page.goto("/en/get-involved");
    const form = page.getByRole("form", { name: "Pledge my vote" });
    await form.getByLabel("Phone number").fill("+1 555 123 4567");
    await form.getByRole("button", { name: "Pledge my vote" }).click();
    await expect(form.getByText("Enter a Kenyan mobile number")).toBeVisible();
  });
});

test("volunteer form needs a role", async ({ page }) => {
  await page.goto("/en/get-involved");
  const form = page.getByRole("form", { name: "Sign me up" });
  await form.getByLabel("Full name").fill("Test Volunteer");
  await form.getByLabel("Phone number").fill("0112345678");
  await form.getByLabel("Your ward").selectOption("Kipsonoi");
  await form.getByRole("checkbox", { name: /organising volunteers/ }).check();
  await form.getByRole("button", { name: "Sign me up" }).click();
  await expect(form.getByText("Choose at least one way to help.")).toBeVisible();
  await form.getByLabel("Events and rallies").check();
  await form.getByRole("button", { name: "Sign me up" }).click();
  await expect(page.getByRole("status").filter({ hasText: "a coordinator for your ward" })).toBeVisible();
});

test("contact form needs email or phone, then sends", async ({ page }) => {
  await page.goto("/en/contact");
  const form = page.getByRole("form", { name: "Send message" });
  await form.getByLabel("Full name").fill("Press Person");
  await form.getByLabel("Message", { exact: true }).fill("Could Joyce speak at our event in Sotik?");
  await form.getByRole("checkbox", { name: /replying to my message/ }).check();
  await form.getByRole("button", { name: "Send message" }).click();
  await expect(form.getByText("Enter a valid email address.")).toBeVisible();
  await form.getByLabel("Email (optional)").fill("press@example.org");
  await form.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status").filter({ hasText: "your message has been sent" })).toBeVisible();
});

test("Kiswahili form labels and errors", async ({ page }) => {
  await page.goto("/sw/get-involved");
  const form = page.getByRole("form", { name: "Ahidi kura yangu" });
  await form.getByRole("button", { name: "Ahidi kura yangu" }).click();
  await expect(form.getByText("Tunahitaji idhini yako kutumia maelezo haya.")).toBeVisible();
});

test.describe("SEO", () => {
  test("hreflang, canonical, OG and JSON-LD on a page", async ({ request }) => {
    const html = await (await request.get("/en/record")).text();
    expect(html).toMatch(/<link rel="canonical" href="[^"]*\/en\/record"/);
    expect(html).toMatch(/hrefLang="sw-KE" href="[^"]*\/sw\/record"/i);
    expect(html).toMatch(/hrefLang="x-default"/i);
    expect(html).toContain('property="og:image"');
    expect(html).toContain('"@type":"Person"');
  });
  test("sitemap lists both languages; robots points to it", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).toContain("/sw/bomet/konoin");
    expect(sitemap).toContain("/en/map");
    expect(await (await request.get("/robots.txt")).text()).toContain("Sitemap:");
  });
  test("share card renders", async ({ request }) => {
    const res = await request.get("/en/opengraph-image");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/png");
  });
});
