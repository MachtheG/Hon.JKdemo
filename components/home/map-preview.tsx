import { useTranslations } from "next-intl";
import { MiniMap } from "@/components/county/mini-map";
import { SourceTick } from "@/components/shared/source-tick";
import { Link } from "@/i18n/navigation";
import { county2017 } from "@/lib/election-results";
import { formatNumber } from "@/lib/format";

/** The real Bomet map with the 2017 county result. Only the county figure is official, so no constituency results are implied. */
export function MapPreview() {
  const t = useTranslations("home.map");

  return (
    <section aria-labelledby="map-title" className="mx-auto grid max-w-[1312px] items-center gap-10 px-4 py-20 lg:grid-cols-2 lg:gap-16">
      <div className="order-2 flex flex-col gap-5 lg:order-1">
        <div className="tea-rule" aria-hidden />
        <span className="text-[13px] font-semibold tracking-[0.18em] text-tea uppercase">{t("kicker")}</span>
        <h2 id="map-title" className="m-0 font-display text-[34px] leading-tight font-bold sm:text-[44px]">
          {t("title")}
        </h2>
        <p className="m-0 text-lg text-muted">
          {t("summary", { votes: formatNumber(county2017.votes), share: county2017.share })}
          <SourceTick id="iebc-data-report-2017" />
        </p>
        <Link href="/map" className="inline-flex min-h-12 w-fit items-center rounded-md border-2 border-tea px-6 font-semibold text-tea no-underline hover:bg-tea hover:text-white">
          {t("cta")}
        </Link>
      </div>
      <div className="order-1 overflow-hidden rounded-xl ring-4 ring-accent/70 lg:order-2">
        <MiniMap label={t("title")} />
      </div>
    </section>
  );
}
