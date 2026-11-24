"use client";

import { useTranslations } from "next-intl";
import { useSyncExternalStore } from "react";
import { LITE_EVENT, LITE_KEY } from "@/lib/lite-mode";
import { clsx as cn } from "clsx";

const subscribe = (onChange: () => void) => {
  window.addEventListener(LITE_EVENT, onChange);
  return () => window.removeEventListener(LITE_EVENT, onChange);
};
const getSnapshot = () => document.documentElement.dataset.lite === "true";
const getServerSnapshot = () => false;

export function LiteModeToggle() {
  const t = useTranslations("common.lite");
  const lite = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next = !lite;
    document.documentElement.dataset.lite = String(next);
    try {
      localStorage.setItem(LITE_KEY, String(next));
    } catch {
      /* storage blocked — the setting lasts for this page only */
    }
    window.dispatchEvent(new Event(LITE_EVENT));
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={lite}
      aria-label={t("label")}
      onClick={toggle}
      className="inline-flex min-h-11 items-center gap-3 text-left text-paper"
    >
      <span aria-hidden className={cn("relative h-6 w-11 rounded-full border border-mist", lite ? "bg-accent" : "bg-tea")}>
        <span
          className={cn(
            "absolute top-0.5 left-0.5 size-[18px] rounded-full transition-transform",
            lite ? "translate-x-5 bg-ink" : "bg-paper",
          )}
        />
      </span>
      {lite ? t("on") : t("off")}
    </button>
  );
}
