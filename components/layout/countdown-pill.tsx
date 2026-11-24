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
      className="inline-flex min-h-11 items-center rounded-full bg-accent px-4 font-mono text-[13px] font-medium whitespace-nowrap text-ink tabular no-underline hover:bg-[#ffd633]"
    >
      {/* Visible text stays in the accessible name (WCAG 2.5.3); extra context is screen-reader only. */}
      {days === null ? t("loading") : t("pill", { days })}
      <span className="sr-only"> {t("srSuffix")}</span>
    </Link>
  );
}
