import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { SourceTick } from "@/components/shared/source-tick";
import { NGCDF_PROJECTS_SOURCE, ngcdfProjects } from "@/data/bomet-central";

/** Projects as listed on the official NG-CDF Bomet Central site — attributed to NG-CDF, not to Joyce. */
export function NgcdfProjects() {
  const t = useTranslations("constituency.projects");
  return (
    <section aria-labelledby="ngcdf-projects" className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <div className="tea-rule" aria-hidden />
        <h2 id="ngcdf-projects" className="m-0 font-display text-[30px] font-bold sm:text-4xl">
          {t("title")}
          <SourceTick id={NGCDF_PROJECTS_SOURCE} />
        </h2>
        <p className="m-0 max-w-3xl text-lg text-muted">{t("lead")}</p>
      </div>
      <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
        {ngcdfProjects.map((p) => (
          <li key={p.name} className="flex items-start gap-4 rounded-xl border border-rule bg-white p-5 shadow-sm">
            <CheckCircle2 aria-hidden size={24} className="mt-0.5 shrink-0 text-tea" />
            <span className="flex flex-col gap-1">
              <span className="font-display text-lg font-bold">{p.name}</span>
              <span className="text-sm text-muted">
                {t("complete")} · {p.fy ?? t("fyUnknown")}
              </span>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-semibold text-tea">
                {t("view")} ↗
              </a>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
