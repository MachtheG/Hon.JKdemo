"use client";

import { useTranslations } from "next-intl";
import { useDaysToElection } from "@/lib/use-days-to-election";

/** Big live day count. Server HTML shows a dash; the client fills the number. */
export function CountdownDays() {
  const t = useTranslations("home.countdown");
  const days = useDaysToElection();

  if (days === 0) {
    return <span className="font-display text-3xl">{t("today")}</span>;
  }
  if (days !== null && days < 0) {
    return <span className="font-display text-3xl">{t("past")}</span>;
  }
  return (
    <>
      <span className="font-mono text-[52px] leading-none tabular" aria-live="off">
        {days ?? "—"}
      </span>
      <span className="text-sm text-mist">{t("days", { days: days ?? 2 })}</span>
    </>
  );
}
