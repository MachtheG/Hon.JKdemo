import { useTranslations } from "next-intl";

export function ProjectsEmptyState() {
  const t = useTranslations("projects.empty");
  return (
    <div className="flex flex-col gap-3 border border-dashed border-laterite-ink p-6 sm:p-8">
      <span className="font-mono text-sm text-laterite-ink uppercase">{t("title")}</span>
      <p className="m-0 max-w-3xl">{t("body")}</p>
      <p className="m-0 max-w-3xl text-sm text-muted">{t("need")}</p>
    </div>
  );
}
