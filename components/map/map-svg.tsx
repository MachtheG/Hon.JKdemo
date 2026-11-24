"use client";

import { bometMap } from "@/data/geo/bomet-paths";
import { binFor, county2017 } from "@/lib/election-results";

export type Level = "constituencies" | "wards";

/**
 * Server-renderable SVG (works without JS and in lite mode). Areas are
 * keyboard-focusable buttons. Fill = county-wide share bin; led = accent outline.
 */
export function MapSvg({
  level,
  selected,
  onSelect,
  label,
}: {
  level: Level;
  selected: string | null;
  onSelect: (slug: string) => void;
  label: string;
}) {
  const fill = binFor(county2017.share).fill;
  const areas = level === "constituencies" ? bometMap.constituencies : bometMap.wards;

  return (
    <svg viewBox={bometMap.viewBox} role="group" aria-label={label} className="h-auto w-full">
      <defs>
        <pattern id="led-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-22)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#F5C400" strokeWidth="2" strokeOpacity="0.55" />
        </pattern>
      </defs>
      {areas.map((a) => {
        const on = selected === a.slug;
        return (
          <g key={a.slug}>
            <path
              d={a.d}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={a.name}
              onClick={() => onSelect(a.slug)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(a.slug);
                }
              }}
              fill={fill}
              stroke={on ? "#F5C400" : "#F6F1E7"}
              strokeWidth={on ? 6 : level === "wards" ? 1.2 : 2.5}
              className="cursor-pointer outline-none focus-visible:stroke-[#F5C400] focus-visible:[stroke-width:6]"
            />
            {county2017.led ? <path d={a.d} fill="url(#led-hatch)" pointerEvents="none" aria-hidden /> : null}
          </g>
        );
      })}
      {/* County outline in accent = "led" marker (identity, not colour alone: legend + summary text say so). */}
      {county2017.led
        ? bometMap.constituencies.map((c) => (
            <path key={`o-${c.slug}`} d={c.d} fill="none" stroke="#F5C400" strokeWidth="1" pointerEvents="none" aria-hidden />
          ))
        : null}
      {areas.map((a) => (
        <text
          key={`t-${a.slug}`}
          x={a.label[0]}
          y={a.label[1]}
          textAnchor="middle"
          pointerEvents="none"
          aria-hidden
          className={level === "wards" ? "hidden fill-paper font-sans font-semibold sm:block" : "fill-paper font-sans font-semibold"}
          style={{ fontSize: level === "wards" ? 18 : 34, paintOrder: "stroke", stroke: "#14201A", strokeWidth: 5 }}
        >
          {a.name}
        </text>
      ))}
    </svg>
  );
}
