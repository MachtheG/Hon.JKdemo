import { useLocale, useTranslations } from "next-intl";
import { SourceTick } from "@/components/shared/source-tick";
import { ToConfirm } from "@/components/shared/to-confirm";
import { timeline } from "@/data/bio";

export function Timeline() {
  const t = useTranslations("story");
  const locale = useLocale() as "en" | "sw";
  return (
    <section aria-labelledby="timeline-title" className="flex flex-col gap-4">
      <h2 id="timeline-title" className="m-0 font-display text-[28px] font-semibold sm:text-4xl">
        {t("timeline")}
      </h2>
      <p className="m-0 text-sm text-muted">{t("pending")}</p>
      <ol className="m-0 list-none border-l-2 border-tea p-0">
        {timeline.map((e) => (
          <li key={e.year + e.title.en} className="relative grid gap-1 py-4 pl-6 sm:grid-cols-[150px_110px_1fr] sm:gap-4">
            <span aria-hidden className={`absolute top-6 -left-[7px] size-3 ${e.kind === "office" ? "bg-tea" : "border-2 border-tea bg-surface"}`} />
            <span className="font-mono text-sm">{e.year}</span>
            <span className="font-mono text-xs text-laterite-ink uppercase sm:pt-0.5">{t(`kinds.${e.kind}`)}</span>
            <span>
              {e.title[locale]}
              <SourceTick id={e.source} />
              {e.confirm ? <ToConfirm note={e.confirm} /> : null}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
