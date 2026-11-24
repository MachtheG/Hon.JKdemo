"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { projects } from "@/data/projects";
import { MapLegend } from "./map-legend";
import { MapPanel } from "./map-panel";
import { MapSvg, type Level } from "./map-svg";

/** "Where we led in 2017": level toggle, selectable areas, detail panel, projects overlay. */
export function ElectionMap() {
  const t = useTranslations("map");
  const [level, setLevel] = useState<Level>("constituencies");
  const [selected, setSelected] = useState<string | null>(null);
  const [overlay, setOverlay] = useState(false);

  const toggle = (on: boolean) =>
    "min-h-11 border border-text px-4 text-sm font-medium " + (on ? "bg-ink text-accent" : "bg-transparent");

  return (
    <div className="flex flex-wrap gap-8">
      <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div role="group" aria-label={t("controls.level")} className="flex gap-2">
            {(["constituencies", "wards"] as const).map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={level === l}
                className={toggle(level === l)}
                onClick={() => {
                  setLevel(l);
                  setSelected(null);
                }}
              >
                {t(`controls.${l}`)}
              </button>
            ))}
          </div>
          <button type="button" aria-pressed={overlay} className={toggle(overlay)} onClick={() => setOverlay(!overlay)}>
            {t("controls.projects")}: {overlay ? t("controls.on") : t("controls.off")}
          </button>
        </div>
        <div className="bg-mist p-3 sm:p-5">
          <MapSvg level={level} selected={selected} onSelect={setSelected} label={t("title")} />
        </div>
        {overlay && projects.length === 0 ? (
          <p role="status" className="m-0 border border-dashed border-laterite-ink p-3 text-sm text-laterite-ink">
            {t("controls.projectsNone")}
          </p>
        ) : null}
        <MapLegend
          labels={{
            title: t("legend.title"),
            lt40: t("legend.lt40"),
            b4060: t("legend.b4060"),
            b6075: t("legend.b6075"),
            gte75: t("legend.gte75"),
            led: t("legend.led"),
            countyOnly: t("legend.countyOnly"),
          }}
        />
      </div>
      <div className="min-w-0 flex-[1_1_320px]">
        <MapPanel level={level} selected={selected} onReset={() => setSelected(null)} />
      </div>
    </div>
  );
}
