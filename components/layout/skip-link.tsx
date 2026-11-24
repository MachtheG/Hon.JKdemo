import { getTranslations } from "next-intl/server";

export async function SkipLink() {
  const t = await getTranslations("common");
  return (
    <a
      href="#main"
      className="sr-only z-50 bg-accent px-4 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
    >
      {t("skipLink")}
    </a>
  );
}
