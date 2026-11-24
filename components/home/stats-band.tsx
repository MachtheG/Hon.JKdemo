import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { AnimatedNumber } from "@/components/shared/animated-number";
import { SourceTick } from "@/components/shared/source-tick";
import { results2017 } from "@/data/election/results-2017";
import type { SourceId } from "@/data/sources";
import { recordStats } from "@/data/stats";
import { percent } from "@/lib/format";
import { SITE_URL, whatsappShare } from "@/lib/site";

const county = results2017.county;
const joyce = county.candidates.find((c) => c.isCandidate)!;
const stat = (id: string) => Number(recordStats.find((s) => s.id === id)!.value);

const items: { key: string; value: number; decimals?: number; suffix?: string; source: SourceId }[] = [
  { key: "votes", value: joyce.votes, source: "iebc-data-report-2017" },
  { key: "share", value: percent(joyce.votes, county.totalValidVotes), decimals: 1, suffix: "%", source: "iebc-data-report-2017" },
  { key: "contributions", value: stat("senate-contributions"), source: "mzalendo-senate-13th" },
  { key: "bill", value: stat("senate-bills"), source: "mzalendo-bill-county-library" },
];

export function StatsBand() {
  const t = useTranslations("home.stats");

  return (
    <section aria-labelledby="stats-title" className="mx-auto max-w-[1312px] px-4 pt-10 pb-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 id="stats-title" className="m-0 font-display text-[32px] leading-tight font-semibold sm:text-5xl">
          {t("title")}
        </h2>
        <a
          href={whatsappShare(t("whatsappText", { url: SITE_URL }))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center gap-2.5 border border-tea px-4 font-medium text-tea no-underline hover:bg-tea/5 dark:border-mist dark:text-mist"
        >
          <MessageCircle aria-hidden size={18} />
          {t("whatsapp")}
        </a>
      </div>
      <dl className="m-0 grid grid-cols-2 gap-x-3 gap-y-6 border-t-2 border-text pt-7 lg:grid-cols-4 lg:gap-8">
        {items.map((s) => (
          <div key={s.key} className="flex flex-col-reverse">
            <dt className="text-sm text-muted sm:text-base">{t(s.key)}</dt>
            <dd className="m-0 font-mono text-[30px] leading-tight sm:text-[56px]">
              <AnimatedNumber value={s.value} decimals={s.decimals} suffix={s.suffix} />
              <SourceTick id={s.source} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
