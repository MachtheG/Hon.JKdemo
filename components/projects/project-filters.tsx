"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { CONSTITUENCIES, FINANCIAL_YEARS, SECTORS } from "@/lib/projects";

const selectClass =
  "min-h-11 w-full border border-text bg-surface px-3 font-sans text-base text-text sm:w-auto sm:min-w-48";

/** Sector chips + constituency/year selects. State lives in the URL (?sector=&constituency=&year=). */
export function ProjectFilters({ count }: { count: number }) {
  const t = useTranslations("projects");
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function set(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const q = next.toString();
    router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
  }

  const sector = params.get("sector") ?? "";
  const hasAny = params.has("sector") || params.has("constituency") || params.has("year");

  return (
    <form role="search" aria-label={t("filters.label")} className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <fieldset className="m-0 flex flex-wrap gap-2 border-0 p-0">
        <legend className="mb-2 text-sm font-semibold">{t("filters.sector")}</legend>
        {["", ...SECTORS].map((s) => (
          <button
            key={s || "all"}
            type="button"
            aria-pressed={sector === s}
            onClick={() => set("sector", s)}
            className="min-h-11 border border-text px-4 text-[15px] font-medium aria-pressed:bg-ink aria-pressed:text-accent"
          >
            {s ? t(`sectors.${s}`) : t("filters.all")}
          </button>
        ))}
      </fieldset>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="flex flex-col gap-1 text-sm font-semibold">
          {t("filters.constituency")}
          <select className={selectClass} value={params.get("constituency") ?? ""} onChange={(e) => set("constituency", e.target.value)}>
            <option value="">{t("filters.all")}</option>
            {CONSTITUENCIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm font-semibold">
          {t("filters.year")}
          <select className={selectClass} value={params.get("year") ?? ""} onChange={(e) => set("year", e.target.value)}>
            <option value="">{t("filters.all")}</option>
            {FINANCIAL_YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
        {hasAny ? (
          <button type="button" onClick={() => router.replace(pathname, { scroll: false })} className="min-h-11 px-2 text-left underline">
            {t("filters.clear")}
          </button>
        ) : null}
        <output aria-live="polite" className="font-mono text-sm sm:ml-auto">
          {t("filters.showing", { count })}
        </output>
      </div>
    </form>
  );
}
