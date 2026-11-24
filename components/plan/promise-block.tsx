import { useTranslations } from "next-intl";
import { SourceTick } from "@/components/shared/source-tick";
import { ConfirmText } from "@/components/shared/to-confirm";
import type { SourceId } from "@/data/sources";

export function PromiseBlock({ k, n, sources }: { k: "one" | "two" | "three"; n: number; sources: SourceId[] }) {
  const t = useTranslations("plan");
  return (
    <article aria-labelledby={`promise-${k}`} className="grid gap-8 border-t-[3px] border-text py-10 lg:grid-cols-3">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-5xl leading-none text-laterite-ink">{String(n).padStart(2, "0")}</span>
        <h2 id={`promise-${k}`} className="m-0 font-display text-[32px] leading-tight font-semibold sm:text-4xl">
          {t(`promises.${k}.title`)}
        </h2>
        <span className="text-sm text-muted">{t(`promises.${k}.audience`)}</span>
      </div>
      <div className="flex flex-col gap-2">
        <strong>{t("doLabel")}</strong>
        <ul className="m-0 flex flex-col gap-1.5 pl-5">
          {(["do1", "do2", "do3"] as const).map((d) => (
            <li key={d}>{t(`promises.${k}.${d}`)}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2 bg-mist p-5 text-ink">
        <span className="font-mono text-xs text-[#7a3418] uppercase">{t("recordLabel")}</span>
        <p className="m-0">
          <ConfirmText text={t(`promises.${k}.record`)} />
          <SourceTick id={sources} />
        </p>
      </div>
    </article>
  );
}
