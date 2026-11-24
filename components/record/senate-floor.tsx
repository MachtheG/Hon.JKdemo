import { useFormatter, useLocale, useTranslations } from "next-intl";
import { SourceTick } from "@/components/shared/source-tick";
import { senateHighlights } from "@/data/bio";

export function SenateFloor() {
  const t = useTranslations("record.floor");
  const locale = useLocale() as "en" | "sw";
  const format = useFormatter();

  return (
    <section aria-labelledby="floor-title" className="flex flex-col gap-4">
      <h2 id="floor-title" className="m-0 font-display text-[28px] font-semibold sm:text-4xl">
        {t("title")}
      </h2>
      <ol className="m-0 list-none border-t-2 border-text p-0">
        {senateHighlights.map((h) => (
          <li key={h.date + h.kind} className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[180px_120px_1fr] sm:gap-4">
            <time dateTime={h.date} className="font-mono text-sm">
              {format.dateTime(new Date(h.date), { day: "numeric", month: "short", year: "numeric" })}
            </time>
            <span className="font-mono text-xs text-laterite-ink uppercase sm:pt-0.5">{t(`kinds.${h.kind}`)}</span>
            <span>
              {h.topic[locale]}
              <SourceTick id={h.source} />
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
