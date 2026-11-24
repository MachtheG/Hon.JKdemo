import { bometMap } from "@/data/geo/bomet-paths";
import { Link } from "@/i18n/navigation";

/** Static locator map: constituencies as links; optional highlight with its wards drawn. */
export function MiniMap({ highlight, label }: { highlight?: string; label: string }) {
  const wards = highlight ? bometMap.wards.filter((w) => w.constituency === highlight) : [];
  return (
    <svg viewBox={bometMap.viewBox} role="group" aria-label={label} className="h-auto w-full bg-mist">
      {bometMap.constituencies.map((c) => {
        const on = c.slug === highlight;
        return (
          <Link key={c.slug} href={`/bomet/${c.slug}`} aria-label={c.name}>
            <path d={c.d} fill={on ? "#1F4D3A" : highlight ? "#B5D0BE" : "#3E7D5A"} stroke="#F6F1E7" strokeWidth="3" className="hover:opacity-85" />
          </Link>
        );
      })}
      {wards.map((w) => (
        <path key={w.slug} d={w.d} fill="none" stroke="#F5C400" strokeWidth="1.5" aria-hidden />
      ))}
      {(highlight ? wards : bometMap.constituencies).map((a) => (
        <text
          key={`t-${a.slug}`}
          x={a.label[0]}
          y={a.label[1]}
          textAnchor="middle"
          aria-hidden
          className="pointer-events-none fill-paper font-sans font-semibold"
          style={{ fontSize: highlight ? 24 : 30, paintOrder: "stroke", stroke: "#14201A", strokeWidth: 4 }}
        >
          {a.name}
        </text>
      ))}
    </svg>
  );
}
