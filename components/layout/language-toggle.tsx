"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";
import { clsx as cn } from "clsx";

export function LanguageToggle({ className }: { className?: string }) {
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
              "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 text-[13px] font-medium uppercase no-underline",
              active ? "bg-paper text-ink" : "text-paper hover:bg-paper/10",
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
