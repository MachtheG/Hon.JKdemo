import { useTranslations } from "next-intl";
import { sources, type SourceTier } from "@/data/sources";

const tiers: SourceTier[] = ["official", "secondary", "tertiary"];

export function SourceList() {
  const t = useTranslations("sources");
  return (
    <div className="flex flex-col gap-12">
      {tiers.map((tier) => (
        <section key={tier} aria-labelledby={`tier-${tier}`} className="flex flex-col gap-3">
          <h2 id={`tier-${tier}`} className="m-0 font-display text-[28px] font-semibold">
            {t(`tiers.${tier}`)}
          </h2>
          <ul className="m-0 list-none border-t-2 border-text p-0">
            {sources
              .filter((s) => s.tier === tier)
              .map((s) => (
                <li key={s.id} id={s.id} className="flex flex-col gap-1 border-b border-rule py-4">
                  <span className="font-semibold">{s.title}</span>
                  <span className="text-sm text-muted">
                    {s.publisher}
                    {s.date !== "undated" ? ` · ${s.date}` : ""} · {t("accessed", { date: s.accessed })}
                  </span>
                  {"notes" in s && s.notes ? <span className="text-sm">{s.notes}</span> : null}
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center self-start text-sm break-all">
                    {t("open")} ↗
                  </a>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
