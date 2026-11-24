import { useTranslations } from "next-intl";
import { SourceTick } from "@/components/shared/source-tick";
import { results2017 } from "@/data/election/results-2017";
import { populationByConstituency2019 } from "@/data/stats";
import { Link } from "@/i18n/navigation";
import { percent } from "@/lib/format";

const county = results2017.county;
const joyce = county.candidates.find((c) => c.isCandidate)!;
const share = percent(joyce.votes, county.totalValidVotes);

/**
 * Schematic preview only (no geography is implied). Until Forms 37B arrive,
 * every constituency carries the county figure and says so.
 */
export function MapPreview() {
  const t = useTranslations("home.map");

  return (
    <section aria-labelledby="map-title" className="mx-auto grid max-w-[1312px] items-center gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:gap-12">
      <ul className="m-0 grid list-none grid-cols-3 gap-1.5 p-0 sm:gap-2" aria-label={t("schematic")}>
        {populationByConstituency2019.map((c) => (
          <li key={c.code} className="hatch flex h-24 flex-col justify-end bg-accent p-2 text-ink sm:h-36 sm:p-2.5">
            <span className="text-xs font-semibold sm:text-base">{c.name}</span>
            <span className="font-mono text-[11px] sm:text-xs">{t("tile", { share })}</span>
          </li>
        ))}
        <li className="flex h-24 items-center justify-center bg-mist p-2 text-center text-xs text-ink sm:h-36 sm:text-sm">
          {t("schematic")}
        </li>
      </ul>
      <div className="flex flex-col gap-3.5">
        <span className="font-mono text-xs tracking-[0.12em] text-laterite-ink uppercase">{t("kicker")}</span>
        <h2 id="map-title" className="m-0 font-display text-[32px] leading-tight font-semibold sm:text-[44px]">
          {t("title")}
        </h2>
        <p className="m-0 text-muted">
          {t("summary", { share })}
          <SourceTick id="iebc-data-report-2017" />
        </p>
        <Link href="/map" className="inline-flex min-h-11 items-center self-start font-semibold">
          {t("cta")} →
        </Link>
      </div>
    </section>
  );
}
