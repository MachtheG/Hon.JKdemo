import { shareBins } from "@/lib/election-results";

/** Legend for the sequential share ramp plus the "led" marker. Labels come from the caller. */
export function MapLegend({ labels }: { labels: Record<"title" | "lt40" | "b4060" | "b6075" | "gte75" | "led" | "countyOnly", string> }) {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <span className="font-semibold">{labels.title}</span>
      <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0">
        {shareBins.map((b) => (
          <li key={b.key} className="flex items-center gap-2">
            <span aria-hidden className="inline-block h-3.5 w-7 border border-ink" style={{ background: b.fill }} />
            {labels[b.key]}
          </li>
        ))}
        <li className="flex items-center gap-2">
          <span aria-hidden className="hatch inline-block h-3.5 w-7 border-2 border-accent bg-tea" />
          {labels.led}
        </li>
      </ul>
      <p className="m-0 text-muted">{labels.countyOnly}</p>
    </div>
  );
}
