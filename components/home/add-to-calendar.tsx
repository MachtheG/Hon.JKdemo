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
      className="mt-2 inline-flex min-h-12 w-fit items-center gap-2.5 rounded-md border border-white/40 px-5 text-[14px] font-semibold text-white transition-colors hover:bg-white/10"
    >
      <CalendarPlus aria-hidden size={18} />
      {t("addToCalendar")}
    </button>
  );
}
