/**
 * Translation check: every locale has every namespace file, with the same keys
 * (deep), and no empty strings. Run: node scripts/check-translations.ts
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const locales = ["en", "sw"];
const namespaces = ["common", "home", "styleguide"];

function keys(obj: unknown, prefix = ""): string[] {
  if (typeof obj !== "object" || obj === null) return [prefix];
  return Object.entries(obj).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k));
}
function empties(obj: unknown, prefix = ""): string[] {
  if (typeof obj === "string") return obj.trim() === "" ? [prefix] : [];
  if (typeof obj !== "object" || obj === null) return [];
  return Object.entries(obj).flatMap(([k, v]) => empties(v, prefix ? `${prefix}.${k}` : k));
}

const errors: string[] = [];
for (const ns of namespaces) {
  const sets = new Map<string, Set<string>>();
  for (const loc of locales) {
    const file = join("messages", loc, `${ns}.json`);
    if (!existsSync(file)) {
      errors.push(`missing ${file}`);
      continue;
    }
    const json: unknown = JSON.parse(readFileSync(file, "utf8"));
    sets.set(loc, new Set(keys(json)));
    for (const e of empties(json)) errors.push(`${file}: empty string at ${e}`);
  }
  const base = sets.get("en");
  for (const [loc, set] of sets) {
    if (!base || loc === "en") continue;
    for (const k of base) if (!set.has(k)) errors.push(`${loc}/${ns}: missing key ${k}`);
    for (const k of set) if (!base.has(k)) errors.push(`${loc}/${ns}: extra key ${k}`);
  }
}

if (errors.length) {
  console.error(`Translation check failed (${errors.length}):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log(`Translation check passed: ${namespaces.length} namespaces × ${locales.length} locales.`);
