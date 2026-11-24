import { beforeEach, describe, expect, it, vi } from "vitest";

// The Server Action reads request headers and the adapter is server-only; stub both.
vi.mock("server-only", () => ({}));
vi.mock("next/headers", () => ({ headers: async () => new Headers({ "x-forwarded-for": "203.0.113.7" }) }));

const { submitForm } = await import("@/app/actions/forms");

const valid = { name: "Test Person", phone: "0712345678", ward: "Singorwet", consent: true, updates: false, website: "" };

describe("submitForm (Server Action)", () => {
  beforeEach(() => {
    vi.stubEnv("FORM_ADAPTER", "console");
    vi.spyOn(console, "info").mockImplementation(() => {});
  });

  it("rejects inherited object keys as a form kind (no crash)", async () => {
    for (const kind of ["constructor", "toString", "__proto__", "hasOwnProperty"]) {
      // @ts-expect-error — deliberately invalid kind from a crafted POST
      await expect(submitForm(kind, "en", valid)).resolves.toEqual({ ok: false, code: "invalid" });
    }
  });

  it("re-validates on the server and never trusts the client", async () => {
    const r = await submitForm("pledge", "en", { ...valid, consent: false });
    expect(r).toMatchObject({ ok: false, code: "invalid", fields: { consent: "consent" } });
  });

  it("drops unknown fields and the honeypot before storage", async () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => {});
    await submitForm("pledge", "en", { ...valid, idNumber: "12345678", isAdmin: true });
    const logged = info.mock.calls.map((c) => String(c[0])).join("\n");
    expect(logged).not.toMatch(/idNumber|isAdmin|website/);
    expect(logged).not.toContain("0712345678"); // phone is masked in logs
  });

  it("treats a filled honeypot as success without storing", async () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => {});
    await expect(submitForm("pledge", "en", { ...valid, website: "http://spam" })).resolves.toEqual({ ok: true });
    expect(info).not.toHaveBeenCalled();
  });

  it("is switched off in production when no adapter is configured", async () => {
    vi.stubEnv("FORM_ADAPTER", "");
    vi.stubEnv("NODE_ENV", "production");
    await expect(submitForm("pledge", "en", { ...valid, phone: "0798765432" })).resolves.toEqual({ ok: false, code: "unavailable" });
    vi.unstubAllEnvs();
  });
});
