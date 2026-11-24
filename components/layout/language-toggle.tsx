"use client";

import { clsx as cn } from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";

/** EN | SW. `tone="green"` for the green utility bar, `"light"` for white panels. */
export function LanguageToggle({ className, tone = "light" }: { className?: string; tone?: "green" | "light" }) {
  const t = useTranslations("common.language");
  const current = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("label")} className={cn("flex items-center gap-1", className)}>
      {locales.map((loc) => {
        const active = loc === current;
        return (
          <Link
            key={loc}
            href={pathname}
            locale={loc}
            hrefLang={loc}
            lang={loc}
            aria-current={active ? "true" : undefined}
            className={cn(
              "inline-flex min-h-9 min-w-10 items-center justify-center rounded px-2.5 text-[12px] font-semibold tracking-[0.1em] uppercase no-underline",
              tone === "green"
                ? active
                  ? "bg-white text-tea"
                  : "text-white hover:bg-white/15"
                : active
                  ? "bg-tea text-white"
                  : "text-ink hover:bg-mist",
            )}
          >
            {loc}
            <span className="sr-only normal-case"> — {active ? t(loc) : t("switchTo", { language: t(loc) })}</span>
          </Link>
        );
      })}
    </nav>
  );
}
