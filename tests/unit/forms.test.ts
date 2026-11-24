import { describe, expect, it } from "vitest";
import { contactSchema, normalisePhone, pledgeSchema, volunteerSchema, WARDS } from "@/lib/forms/schemas";

describe("normalisePhone", () => {
  it.each([
    ["0712 345 678", "+254712345678"],
    ["+254712345678", "+254712345678"],
    ["254112345678", "+254112345678"],
    ["0112-345-678", "+254112345678"],
  ])("%s → %s", (input, out) => expect(normalisePhone(input)).toBe(out));
  it.each(["12345", "0812345678", "+1 555 123 4567", ""])("rejects %s", (input) => expect(normalisePhone(input)).toBeNull());
});

describe("schemas", () => {
  const base = { name: "Test Person", phone: "0712345678", ward: "Singorwet", consent: true, updates: false, website: "" };
  it("has all 25 Bomet wards", () => expect(WARDS).toHaveLength(25));
  it("pledge requires explicit consent", () => {
    expect(pledgeSchema.safeParse(base).success).toBe(true);
    const r = pledgeSchema.safeParse({ ...base, consent: false });
    expect(r.success).toBe(false);
    expect(r.error?.issues[0].message).toBe("consent");
  });
  it("rejects wards outside Bomet", () => {
    expect(pledgeSchema.safeParse({ ...base, ward: "Chaik" }).success).toBe(false);
  });
  it("flags the honeypot", () => {
    const r = pledgeSchema.safeParse({ ...base, website: "http://spam" });
    expect(r.error?.issues.some((i) => i.message === "bot")).toBe(true);
  });
  it("volunteer needs at least one role", () => {
    expect(volunteerSchema.safeParse({ ...base, email: "", roles: [] }).success).toBe(false);
    expect(volunteerSchema.safeParse({ ...base, email: "", roles: ["events"] }).success).toBe(true);
  });
  it("contact validates message length and optional email", () => {
    const c = { name: "A Person", email: "", phone: "", subject: "general", message: "Hello there, a question.", consent: true, website: "" };
    expect(contactSchema.safeParse(c).success).toBe(true);
    expect(contactSchema.safeParse({ ...c, email: "not-an-email" }).success).toBe(false);
  });
});
