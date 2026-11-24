import { useFormatter, useLocale, useTranslations } from "next-intl";
import { news } from "@/data/news";
import { sourceById } from "@/data/sources";

/** Our own summaries; the publisher's headline links to the original. */
export function NewsList() {
  const t = useTranslations("news");
  const locale = useLocale() as "en" | "sw";
  const format = useFormatter();
  return (
    <ol className="m-0 list-none border-t-2 border-text p-0">
      {news
        .filter((n) => n.showOnSite)
        .map((n) => {
          const s = sourceById[n.source];
          return (
            <li key={n.source} className="grid gap-2 border-b border-rule py-6 sm:grid-cols-[170px_1fr] sm:gap-6">
              {n.date === "undated" ? (
                <span className="font-mono text-sm text-laterite-ink">{t("undated")}</span>
              ) : (
                <time dateTime={n.date} className="font-mono text-sm">
                  {format.dateTime(new Date(n.date), { day: "numeric", month: "short", year: "numeric" })}
                </time>
              )}
              <article className="flex flex-col gap-1.5">
                <h2 className="m-0 font-display text-[22px] leading-snug font-semibold">{n.headline}</h2>
                <p className="m-0">{n.summary[locale]}</p>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center self-start text-sm font-semibold">
                  {t("read", { publisher: s.publisher })} ↗
                </a>
              </article>
            </li>
          );
        })}
    </ol>
  );
}
