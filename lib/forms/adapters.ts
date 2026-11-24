import "server-only";
import type { FormKind } from "./schemas";

/**
 * Pluggable storage/notification for form submissions. Choose with FORM_ADAPTER:
 *   console  — development only; logs the field names and a masked phone, never the data.
 *   resend   — emails each submission to FORM_NOTIFY_EMAIL via the Resend API.
 *   supabase — inserts a row into the table `form_<kind>` via the Supabase REST API.
 * In production with no adapter set, forms are switched off (nothing is silently dropped).
 */
export type Record_ = Record<string, unknown> & { kind: FormKind; consentAt: string; privacyVersion: string; locale: string };

export interface FormAdapter {
  name: string;
  submit(record: Record_): Promise<void>;
}

const mask = (v: unknown) => (typeof v === "string" && v.length > 4 ? `${"•".repeat(v.length - 3)}${v.slice(-3)}` : "•••");

const consoleAdapter: FormAdapter = {
  name: "console",
  async submit(r) {
    console.info(`[form:${r.kind}] fields=${Object.keys(r).join(",")} phone=${mask(r.phone)} locale=${r.locale}`);
  },
};

const resendAdapter: FormAdapter = {
  name: "resend",
  async submit(r) {
    const key = process.env.RESEND_API_KEY;
    const to = process.env.FORM_NOTIFY_EMAIL;
    const from = process.env.FORM_FROM_EMAIL ?? "forms@resend.dev";
    if (!key || !to) throw new Error("Resend adapter is missing RESEND_API_KEY or FORM_NOTIFY_EMAIL");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        subject: `New ${r.kind} — ${String(r.ward ?? r.subject ?? "")}`,
        text: Object.entries(r)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v)}`)
          .join("\n"),
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  },
};

const supabaseAdapter: FormAdapter = {
  name: "supabase",
  async submit(r) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error("Supabase adapter is missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/form_${r.kind}`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify(r),
    });
    if (!res.ok) throw new Error(`Supabase responded ${res.status}`);
  },
};

export function getAdapter(): FormAdapter | null {
  const chosen = process.env.FORM_ADAPTER ?? (process.env.NODE_ENV === "production" ? "" : "console");
  const adapters: Record<string, FormAdapter> = { console: consoleAdapter, resend: resendAdapter, supabase: supabaseAdapter };
  return Object.hasOwn(adapters, chosen) ? adapters[chosen] : null;
}
