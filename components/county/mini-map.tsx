import { bometMap } from "@/data/geo/bomet-paths";
import { Link } from "@/i18n/navigation";

/** Bounding box of an SVG path made of M/L/Z with absolute "x,y" pairs. */
function bbox(d: string) {
  const nums = d.match(/-?\d+(\.\d+)?/g)!.map(Number);
  const xs = nums.filter((_, i) => i % 2 === 0);
  const ys = nums.filter((_, i) => i % 2 === 1);
  return { minX: Math.min(...xs), minY: Math.min(...ys), maxX: Math.max(...xs), maxY: Math.max(...ys) };
}

/**
 * Static locator map: constituencies are links. With `highlight`, the view zooms
 * to that constituency and draws its wards. Label sizes are set relative to the
 * viewBox so they stay at least ~12px on a 375px screen.
 */
export function MiniMap({ highlight, ward, label }: { highlight?: string; ward?: string; label: string }) {
  const focus = highlight ? bometMap.constituencies.find((c) => c.slug === highlight) : undefined;
  const wards = highlight ? bometMap.wards.filter((w) => w.constituency === highlight) : [];
  let viewBox: string = bometMap.viewBox;
  let fontSize = 36;
  if (focus) {
    const b = bbox(focus.d);
    const pad = Math.max(b.maxX - b.minX, b.maxY - b.minY) * 0.08;
    const w = b.maxX - b.minX + pad * 2;
    viewBox = `${(b.minX - pad).toFixed(0)} ${(b.minY - pad).toFixed(0)} ${w.toFixed(0)} ${(b.maxY - b.minY + pad * 2).toFixed(0)}`;
    fontSize = Math.round(w / 26);
  }

  return (
    <svg viewBox={viewBox} role="group" aria-label={label} className="h-auto w-full bg-mist">
      {bometMap.constituencies.map((c) => {
        const on = c.slug === highlight;
        return (
          <Link key={c.slug} href={`/bomet/${c.slug}`} aria-label={c.name}>
            <path
              d={c.d}
              fill={on || !highlight ? "#1F4D3A" : "#B5D0BE"}
              stroke="#F6F1E7"
              strokeWidth={highlight ? 2 : 3}
              vectorEffect="non-scaling-stroke"
              className="hover:opacity-85"
            />
          </Link>
        );
      })}
      {wards.map((w) => (
        <path key={w.slug} d={w.d} fill={w.slug === ward ? "#D4A62A" : "none"} fillOpacity={w.slug === ward ? 0.9 : 0} stroke="#D4A62A" strokeWidth={w.slug === ward ? 3 : 1.5} vectorEffect="non-scaling-stroke" aria-hidden />
      ))}
      {(highlight ? wards : bometMap.constituencies).map((a) => (
        <text
          key={`t-${a.slug}`}
          x={a.label[0]}
          y={a.label[1]}
          textAnchor="middle"
          aria-hidden
          className={a.slug === ward ? "pointer-events-none fill-ink font-sans font-bold" : "pointer-events-none fill-paper font-sans font-semibold"}
          style={{ fontSize, paintOrder: "stroke", stroke: a.slug === ward ? "#FFFFFF" : "#0C3320", strokeWidth: fontSize / 6 }}
        >
          {a.name}
        </text>
      ))}
    </svg>
  );
}
