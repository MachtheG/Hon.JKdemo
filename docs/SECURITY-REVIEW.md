# Security review (24 November 2026)

**Scope:** the full repository before the first push. It covers the Server Action and form adapters, rate limiting, inline scripts, external links, response headers, dependencies, secrets and git history.

## Findings and fixes

| # | Severity | Finding | Status |
|---|---|---|---|
| 1 | Medium | `submitForm` checked the form kind with `kind in schemas`. That accepts inherited keys (`constructor`, `toString`), so a crafted POST could make it call `undefined.safeParse` and return a 500. | **Fixed.** Now uses `Object.hasOwn`. Unit test added. |
| 2 | Low | The adapter lookup used the same pattern on `FORM_ADAPTER`. | **Fixed.** Now uses `Object.hasOwn`. |
| 3 | Low | No security response headers were set. | **Fixed.** Added a CSP (`frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'`), `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` and HSTS. |

## Checked and OK
- **Server Action:**
  - Zod re-validates on the server and strips unknown fields.
  - Explicit consent is required.
  - Honeypot submissions are silently accepted and never stored.
  - Errors return generic codes. Adapter errors log only the message, never the submitted data.
  - Phone numbers are masked in console logs.
- **Storage adapters:** API keys are read on the server only (`server-only`). Supabase table names come from a validated enum. Resend email bodies are sent as JSON, so there is no header injection.
- **Inline scripts:** the lite-mode boot script is a static string. JSON-LD is `JSON.stringify` with `<` escaped. No user input reaches `dangerouslySetInnerHTML`.
- **External links:** all use `rel="noopener noreferrer"`.
- **Dependencies:** `npm audit` reports 0 vulnerabilities.
- **Secrets:**
  - No keys or tokens in the tree or in any commit (pattern scan of `git log -p --all`).
  - `.env*` is gitignored except `.env.example`, which has empty values.

## Known limits (accepted, documented)
- The rate limiter is in memory and per instance (5 per 10 minutes per IP and form), so it resets on serverless instances. Add Vercel Firewall rules for real abuse.
- The CSP doesn't restrict `script-src`. That would need per-request nonces, which makes every page dynamic and conflicts with static prerendering.
- The IP for rate limiting comes from `x-forwarded-for`, which is trustworthy on Vercel. Behind another proxy, configure it to overwrite that header.
