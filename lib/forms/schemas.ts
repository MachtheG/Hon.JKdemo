import { z } from "zod";
import { wardsByConstituency } from "@/data/stats";

/**
 * Shared by client (React Hook Form) and server (Server Action) — the server
 * always re-validates. Error messages are translation keys under `forms.errors`.
 * Data minimisation (DPA 2019 s.25): no ID numbers, no dates of birth.
 */
export const WARDS = Object.values(wardsByConstituency).flat() as string[];

/** Accepts 07…, 01…, +2547…, 2547… (spaces/dashes allowed); returns +254XXXXXXXXX. */
export function normalisePhone(input: string): string | null {
  const digits = input.replace(/[\s()-]/g, "");
  const m = digits.match(/^(?:\+?254|0)([17]\d{8})$/);
  return m ? `+254${m[1]}` : null;
}

const name = z.string().trim().min(2, "nameShort").max(80, "nameLong");
const phone = z
  .string()
  .trim()
  .refine((v) => normalisePhone(v) !== null, "phone");
const ward = z.string().refine((v) => WARDS.includes(v), "ward");
const consent = z.literal(true, { error: "consent" });
const updates = z.boolean().default(false);
/** Honeypot — real people never see or fill it. */
const website = z.string().max(0, "bot").optional().default("");

export const pledgeSchema = z.object({ name, phone, ward, consent, updates, website });

export const VOLUNTEER_ROLES = ["doorToDoor", "womensGroups", "events", "pollingAgent", "online"] as const;
export const volunteerSchema = z.object({
  name,
  phone,
  ward,
  email: z.union([z.literal(""), z.email("email")]).default(""),
  roles: z.array(z.enum(VOLUNTEER_ROLES)).min(1, "roles"),
  consent,
  updates,
  website,
});

export const contactSchema = z.object({
  name,
  email: z.union([z.literal(""), z.email("email")]).default(""),
  phone: z.union([z.literal(""), phone]).default(""),
  subject: z.enum(["general", "event", "press"]),
  message: z.string().trim().min(10, "messageShort").max(2000, "messageLong"),
  consent,
  website,
});

export type PledgeInput = z.input<typeof pledgeSchema>;
export type VolunteerInput = z.input<typeof volunteerSchema>;
export type ContactInput = z.input<typeof contactSchema>;
export type FormKind = "pledge" | "volunteer" | "contact";

export const schemas = { pledge: pledgeSchema, volunteer: volunteerSchema, contact: contactSchema } as const;

/** Version of the privacy notice the person consented to (bump when the notice changes). */
export const PRIVACY_VERSION = "2026-11-24";
