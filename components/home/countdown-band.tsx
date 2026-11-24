import { useTranslations } from "next-intl";
import { LiveCountdown } from "@/components/shared/live-countdown";
import { SourceTick } from "@/components/shared/source-tick";
import { ELECTION } from "@/lib/election";
import { AddToCalendar } from "./add-to-calendar";

/** Live countdown to polling day — days, hours, minutes, seconds. */
export function CountdownBand() {
  const t = useTranslations("home.countdown");

  return (
    <section id="countdown" aria-labelledby="countdown-title" className="scroll-mt-4 bg-tea text-white">
      <div className="mx-auto grid max-w-[1312px] items-center gap-8 px-4 py-12 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
        <div className="flex flex-col gap-3">
          <span className="text-[13px] font-semibold tracking-[0.18em] text-white uppercase">{t("kicker")}</span>
          <h2 id="countdown-title" className="m-0 font-display text-3xl font-bold sm:text-4xl">
            <time dateTime={ELECTION.isoDate}>{t("date")}</time>
            <SourceTick id={ELECTION.source} tone="accent" />
          </h2>
          <p className="m-0 text-white/85">{t("lead")}</p>
          <AddToCalendar />
        </div>
        <LiveCountdown variant="tiles" />
      </div>
    </section>
  );
}
