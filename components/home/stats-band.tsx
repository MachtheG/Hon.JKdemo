import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { AnimatedNumber } from "@/components/shared/animated-number";
import { Photo } from "@/components/shared/photo";
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

/** The record in four sourced figures, beside a photograph of Joyce at work. */
export function StatsBand() {
  const t = useTranslations("home.stats");

  return (
    <section aria-labelledby="stats-title" className="bg-ink text-white">
      <div className="mx-auto grid max-w-[1312px] items-center gap-12 px-4 py-20 lg:grid-cols-[1fr_1.2fr]">
        <Photo id="RECORD-01" sizes="(min-width: 1024px) 45vw, 100vw" />
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="tea-rule" aria-hidden />
            <h2 id="stats-title" className="m-0 font-display text-[34px] leading-tight font-bold sm:text-[44px]">
              {t("title")}
            </h2>
          </div>
          <dl className="m-0 grid grid-cols-1 gap-x-6 gap-y-7 min-[400px]:grid-cols-2">
            {items.map((s) => (
              <div key={s.key} className="flex flex-col-reverse justify-end border-l-2 border-accent pl-4">
                <dt className="text-[15px] text-white/80">{t(s.key)}</dt>
                <dd className="m-0 font-display text-[40px] leading-tight font-bold whitespace-nowrap text-accent sm:text-[52px]">
                  <AnimatedNumber value={s.value} decimals={s.decimals} suffix={s.suffix} />
                  <SourceTick id={s.source} tone="accent" />
                </dd>
              </div>
            ))}
          </dl>
          <a
            href={whatsappShare(t("whatsappText", { url: SITE_URL }))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 w-fit items-center gap-2.5 rounded-md border border-white/40 px-5 font-semibold text-white no-underline hover:bg-white/10"
          >
            <MessageCircle aria-hidden size={18} />
            {t("whatsapp")}
          </a>
        </div>
      </div>
    </section>
  );
}
