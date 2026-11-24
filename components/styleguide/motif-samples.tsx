import { useTranslations } from "next-intl";

const steps = ["ward", "assembly", "house", "senate"] as const;

export function MotifSamples() {
  const t = useTranslations("styleguide.motifs");
  return (
    <div className="grid gap-8 md:grid-cols-3">
      <figure className="m-0 flex flex-col gap-2">
        <div className="tea-rows h-40" aria-hidden />
        <figcaption className="text-sm text-muted">{t("teaRows")}</figcaption>
      </figure>
      <figure className="m-0 flex flex-col justify-center gap-2">
        <div className="tea-rule" aria-hidden />
        <figcaption className="text-sm text-muted">{t("teaRule")}</figcaption>
      </figure>
      <figure className="m-0 flex flex-col gap-2">
        <ol className="m-0 flex list-none items-end gap-1 p-0" aria-label={t("ladder")}>
          {steps.map((s, i) => (
            <li
              key={s}
              className="flex min-w-0 flex-1 items-end overflow-hidden bg-tea p-1.5 text-[11px] leading-tight text-paper [overflow-wrap:anywhere] hyphens-auto sm:p-2 sm:text-xs"
              style={{ height: `${40 + i * 30}px` }}
            >
              {t(`ladderSteps.${s}`)}
            </li>
          ))}
        </ol>
        <figcaption className="text-sm text-muted">{t("ladder")}</figcaption>
      </figure>
    </div>
  );
}
