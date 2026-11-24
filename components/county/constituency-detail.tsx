import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { SourceTick } from "@/components/shared/source-tick";
import { Stat } from "@/components/shared/stat";
import type { PhotoId } from "@/data/photos";
import { populationByConstituency2019, wardsByConstituency } from "@/data/stats";
import { Link } from "@/i18n/navigation";
import { county2017 } from "@/lib/election-results";
import { formatNumber } from "@/lib/format";
import { allProjects, filterProjects } from "@/lib/projects";
import { MiniMap } from "./mini-map";

export function ConstituencyDetail({ slug, name }: { slug: string; name: string }) {
  const t = useTranslations("county");
  const tc = useTranslations("constituency");
  const ctx = populationByConstituency2019.find((c) => c.name === name)!;
  const wards = wardsByConstituency[name as keyof typeof wardsByConstituency];
  const projects = filterProjects(allProjects, { constituency: slug });

  return (
    <>
      <PageHeader kicker={t("page.kicker", { name })} title={t("page.title", { name })} photo={`CONST-${slug.toUpperCase()}` as PhotoId}>
        <Link href="/bomet" className="inline-flex min-h-11 items-center self-start">
          ← {t("page.back")}
        </Link>
        {slug === "bomet-central" ? (
          <Link href="/bomet-central" className="inline-flex min-h-12 w-fit items-center rounded-md bg-tea px-6 font-semibold text-white no-underline hover:bg-leaf">
            {tc("ward.hub")} →
          </Link>
        ) : null}
      </PageHeader>
      <Container className="flex flex-col gap-14">
        <div className="grid items-start gap-10 lg:grid-cols-[3fr_2fr]">
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-2 gap-6 border-t-2 border-text pt-6">
              <Stat value={formatNumber(ctx.population)} label={t("stats.population")} source="knbs-2019-census" />
              <Stat value={formatNumber(ctx.voters2022)} label={t("stats.voters2022")} source="iebc-rov-2022" />
            </div>
            <section aria-labelledby="wards-title" className="flex flex-col gap-3">
              <h2 id="wards-title" className="m-0 font-display text-[28px] font-semibold">
                {t("page.wardsTitle", { name })}
                <SourceTick id="bomet-county-about" />
              </h2>
              <ul className="m-0 grid list-none gap-2 p-0 sm:grid-cols-2">
                {wards.map((w) => (
                  <li key={w} className="border-b border-rule py-2">
                    {w}
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <MiniMap highlight={slug} label={t("page.map", { name })} />
        </div>
        <section aria-labelledby="result-title" className="flex flex-col gap-3 border border-dashed border-laterite-ink p-6">
          <h2 id="result-title" className="m-0 font-display text-2xl font-semibold">
            {t("page.resultTitle", { name })}
          </h2>
          <p className="m-0 max-w-3xl">
            {t("page.resultBody", { name, share: county2017.share })}
            <SourceTick id="iebc-data-report-2017" />
          </p>
        </section>
        <section aria-labelledby="cons-projects" className="flex flex-col gap-3">
          <h2 id="cons-projects" className="m-0 font-display text-2xl font-semibold">
            {t("page.projectsTitle", { name })}
          </h2>
          {projects.length === 0 ? <p className="m-0 text-muted">{t("page.projectsNone", { name })}</p> : null}
          <Link href={`/projects?constituency=${slug}`} className="inline-flex min-h-11 items-center self-start font-semibold">
            {t("page.projectsLink", { name })} →
          </Link>
        </section>
      </Container>
    </>
  );
}
