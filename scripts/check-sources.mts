/**
 * Source check. Fails when:
 *  - a source id is duplicated or its URL is not https;
 *  - code references a source id that is not in data/sources.ts;
 *  - a published figure cites only a "tertiary" source (wiki/aggregator).
 * References are `source: "id"`, `source="id"` and `<SourceTick id="id" />`.
 * Run: node scripts/check-sources.ts
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const registry = readFileSync("data/sources.ts", "utf8");
const entries = [...registry.matchAll(/id:\s*"([a-z0-9-]+)",[\s\S]*?url:\s*"([^"]+)",[\s\S]*?tier:\s*"(\w+)"/g)];
const tier = new Map<string, string>();
const errors: string[] = [];

for (const [, id, url, t] of entries) {
  if (tier.has(id)) errors.push(`duplicate source id: ${id}`);
  tier.set(id, t);
  if (!url.startsWith("https://")) errors.push(`source ${id}: URL is not https (${url})`);
}

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return walk(p);
    return /\.tsx?$/.test(p) && !p.endsWith("sources.ts") ? [p] : [];
  });
}

const patterns = [/\b(?:source|registeredVotersSource)\s*[:=]\s*"([a-z0-9-]+)"/g, /<SourceTick[^>]*\bid="([a-z0-9-]+)"/g];
let refs = 0;
for (const file of ["data", "components", "app", "lib"].flatMap(walk)) {
  const text = readFileSync(file, "utf8");
  for (const re of patterns) {
    for (const [, id] of text.matchAll(re)) {
      refs++;
      if (!tier.has(id)) errors.push(`${file}: unknown source id "${id}"`);
      else if (tier.get(id) === "tertiary") errors.push(`${file}: cites tertiary source "${id}"`);
    }
  }
}

if (errors.length) {
  console.error(`Source check failed (${errors.length}):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log(`Source check passed: ${tier.size} sources, ${refs} references.`);
