import "server-only";

/**
 * Best-effort, per-instance limiter (5 submissions / 10 minutes / IP+form).
 * On serverless this resets per instance — pair with Vercel's firewall rules for real abuse.
 */
const WINDOW_MS = 10 * 60 * 1000;
/** Override with FORM_RATE_LIMIT (e.g. a high value for the e2e test server only). */
const LIMIT = Number(process.env.FORM_RATE_LIMIT) || 5;
const hits = new Map<string, number[]>();

export function allow(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 10_000) hits.clear();
  return true;
}
