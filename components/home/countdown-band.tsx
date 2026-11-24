import { useTranslations } from "next-intl";
import { SourceTick } from "@/components/shared/source-tick";
import { ELECTION } from "@/lib/election";
import { AddToCalendar } from "./add-to-calendar";
import { CountdownDays } from "./countdown-days";

export function CountdownBand() {
  const t = useTranslations("home.countdown");

  return (
    <section id="countdown" aria-label={t("kicker")} className="scroll-mt-4 bg-tea text-paper">
      <div className="mx-auto grid max-w-[1312px] items-end gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col">
          <span className="font-mono text-xs tracking-[0.12em] text-mist uppercase">{t("kicker")}</span>
          <span className="font-display text-[28px]">
            <time dateTime={ELECTION.isoDate}>{t("date")}</time>
            <SourceTick id={ELECTION.source} tone="accent" />
          </span>
        </div>
        <div className="flex flex-col border-t-2 border-accent pt-2">
          <CountdownDays />
        </div>
        <div className="flex flex-col border-t-2 border-mist pt-2">
          <span className="font-mono text-[52px] leading-none tabular">
            <time dateTime={ELECTION.campaignOpens}>29.05</time>
          </span>
          <span className="text-sm text-mist">{t("campaignOpens")}</span>
        </div>
        <AddToCalendar />
      </div>
    </section>
  );
}
