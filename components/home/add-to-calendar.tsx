"use client";

import { CalendarPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { electionIcs } from "@/lib/election";

/** Downloads an .ics all-day event for 10 August 2027. */
export function AddToCalendar() {
  const t = useTranslations("home.countdown");

  function download() {
    const blob = new Blob([electionIcs(t("icsSummary"), t("icsDescription"))], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "election-2027-08-10.ics";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={download}
      className="inline-flex min-h-13 items-center gap-2.5 justify-self-start border border-paper px-5 text-paper hover:bg-paper/10"
    >
      <CalendarPlus aria-hidden size={18} />
      {t("addToCalendar")}
    </button>
  );
}
