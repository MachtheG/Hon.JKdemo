import { useTranslations } from "next-intl";
import { SourceTick } from "@/components/shared/source-tick";
import { ToConfirm } from "@/components/shared/to-confirm";
import type { SourceId } from "@/data/sources";

const rungs: { level: string; years: string; title: string; note: string; sources: SourceId[]; confirm?: string }[] = [
  { level: "ward", years: "2007–2013", title: "councillor", note: "councillorNote", sources: ["parl-na-profile-2017"], confirm: "years as Deputy Mayor and as Mayor" },
  { level: "county", years: "2013–2017", title: "mca", note: "mcaNote", sources: ["parl-na-profile-2017"] },
  { level: "national", years: "2017–2022", title: "wr", note: "wrNote", sources: ["iebc-data-report-2017", "parl-na-profile-2017"] },
  { level: "senate", years: "2022–", title: "senator", note: "senatorNote", sources: ["parl-senate-profile", "parl-psc-vice-chair"] },
];

/** The "Ngazi" motif: four steps of office, rising left to right. */
export function OfficeLadder() {
  const t = useTranslations("record.ladder");
  return (
    <section aria-labelledby="ladder-title" className="flex flex-col gap-6">
      <h2 id="ladder-title" className="sr-only">
        {t("title")}
      </h2>
      <ol className="m-0 grid list-none gap-0 border-t-2 border-text p-0 sm:grid-cols-2 lg:grid-cols-4">
        {rungs.map((r, i) => (
          <li key={r.level} className="flex flex-col gap-2 border-b border-rule py-5 sm:pr-5">
            <div aria-hidden className="mb-2 flex h-16 w-24 flex-col-reverse justify-between border-x-2 border-tea px-0">
              {[0, 1, 2, 3].map((step) => (
                <span key={step} className={step === i ? "h-2.5 bg-tea" : step < i ? "hatch h-1 bg-mist" : "h-0.5 bg-tea/40"} />
              ))}
            </div>
            <span className="font-mono text-xs text-laterite-ink uppercase">
              {r.years} · {t(r.level)}
            </span>
            <strong className="font-display text-[22px] leading-tight font-semibold">
              {t(r.title)}
              <SourceTick id={r.sources} />
            </strong>
            <span className="text-sm text-muted">
              {t(r.note)}
              {r.confirm ? <ToConfirm note={r.confirm} /> : null}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
