import { useTranslations } from "next-intl";

export function TypeSpecimen() {
  const t = useTranslations("styleguide.type");
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs tracking-[0.12em] text-laterite-ink uppercase">{t("display")}</span>
        <p className="m-0 font-display text-5xl leading-none font-semibold sm:text-8xl">{t("sample")}</p>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs tracking-[0.12em] text-laterite-ink uppercase">{t("body")}</span>
        <p className="m-0 max-w-2xl">{t("bodySample")}</p>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs tracking-[0.12em] text-laterite-ink uppercase">{t("data")}</span>
        <p className="m-0 font-mono text-5xl tabular sm:text-7xl">205,964 · 78.5%</p>
      </div>
    </div>
  );
}
