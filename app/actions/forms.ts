"use server";

import { headers } from "next/headers";
import { getAdapter } from "@/lib/forms/adapters";
import { allow } from "@/lib/forms/rate-limit";
import { normalisePhone, PRIVACY_VERSION, schemas, type FormKind } from "@/lib/forms/schemas";

export type FormResult =
  | { ok: true }
  | { ok: false; code: "invalid" | "rateLimited" | "unavailable" | "error"; fields?: Record<string, string> };

/**
 * Single entry point for all forms. Server Functions are reachable by direct
 * POST, so everything is re-validated here regardless of the client.
 */
export async function submitForm(kind: FormKind, locale: string, input: unknown): Promise<FormResult> {
  // Own keys only: `in` would also accept inherited names like "constructor" from a crafted POST.
  if (typeof kind !== "string" || !Object.hasOwn(schemas, kind)) return { ok: false, code: "invalid" };

  const parsed = schemas[kind].safeParse(input);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) fields[String(issue.path[0] ?? "form")] ??= issue.message;
    // Honeypot filled: pretend success so bots learn nothing.
    if (fields.website === "bot") return { ok: true };
    return { ok: false, code: "invalid", fields };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? "unknown";
  if (!allow(`${kind}:${ip}`)) return { ok: false, code: "rateLimited" };

  const adapter = getAdapter();
  if (!adapter) return { ok: false, code: "unavailable" };

  const { website: _honeypot, ...data } = parsed.data as Record<string, unknown>;
  void _honeypot;
  if (typeof data.phone === "string" && data.phone) data.phone = normalisePhone(data.phone);

  try {
    await adapter.submit({
      ...data,
      kind,
      locale: locale === "sw" ? "sw" : "en",
      consentAt: new Date().toISOString(),
      privacyVersion: PRIVACY_VERSION,
    });
    return { ok: true };
  } catch (e) {
    console.error(`[form:${kind}] adapter ${adapter.name} failed:`, e instanceof Error ? e.message : "unknown");
    return { ok: false, code: "error" };
  }
}
