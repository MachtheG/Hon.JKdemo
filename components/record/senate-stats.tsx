import { useTranslations } from "next-intl";
import { Stat } from "@/components/shared/stat";
import { recordStats } from "@/data/stats";

const items = [
  { key: "contributions", id: "senate-contributions" },
  { key: "statements", id: "senate-statements" },
  { key: "papers", id: "senate-papers-laid" },
  { key: "motions", id: "senate-motions-seconded" },
  { key: "bill", id: "senate-bills" },
] as const;

export function SenateStats() {
  const t = useTranslations("record.stats");
  return (
    <section aria-labelledby="senate-stats-title" className="flex flex-col gap-5">
      <h2 id="senate-stats-title" className="m-0 font-display text-[28px] font-semibold sm:text-4xl">
        {t("title")}
      </h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((s) => {
          const stat = recordStats.find((r) => r.id === s.id)!;
          return <Stat key={s.key} value={String(stat.value)} label={t(s.key)} source={stat.source} size="md" />;
        })}
      </div>
      <p className="m-0 font-mono text-xs text-muted">{t("note")}</p>
      <p className="m-0 text-sm">{t("committees")}</p>
    </section>
  );
}
