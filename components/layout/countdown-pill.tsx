"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useDaysToElection } from "@/lib/use-days-to-election";

/** Header pill. The server renders the date; the client adds the live day count. */
export function CountdownPill() {
  const t = useTranslations("common.countdown");
  const days = useDaysToElection();

  return (
    <Link
      href="/#countdown"
      aria-label={days === null ? undefined : t("pillLabel", { days })}
      className="inline-flex min-h-11 items-center rounded-full bg-accent px-4 font-mono text-[13px] font-medium whitespace-nowrap text-ink tabular no-underline hover:bg-[#ffd633]"
    >
      {days === null ? t("loading") : t("pill", { days })}
    </Link>
  );
}
