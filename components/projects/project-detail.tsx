import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/container";
import { Photo } from "@/components/shared/photo";
import { SourceTick } from "@/components/shared/source-tick";
import type { Project } from "@/data/projects";
import { photoList, type PhotoId } from "@/data/photos";
import { Link } from "@/i18n/navigation";
import { formatNumber } from "@/lib/format";

/** One project: facts with roles stated honestly, its source, and a before/after gallery. */
export function ProjectDetail({ project: p }: { project: Project }) {
  const t = useTranslations("projects");
  const gallery: PhotoId[] = photoList.filter((ph) => ph.linkedProject === p.id).map((ph) => ph.id);

  const facts: [string, React.ReactNode][] = [
    [t("detail.sector"), t(`sectors.${p.sector}`)],
    [t("detail.place"), `${p.ward ?? "—"}, ${p.constituency}`],
    [t("detail.year"), p.year],
    [t("detail.funding"), p.fundingSource],
    [
      t("detail.amount"),
      p.amountKes !== null && p.amountKind ? `KSh ${formatNumber(p.amountKes)} (${t(`kinds.${p.amountKind}`)})` : "—",
    ],
    [t("detail.status"), t(`statuses.${p.status}`)],
    [t("detail.role"), t(`roleNames.${p.role}`)],
  ];

  return (
    <Container as="article" className="flex flex-col gap-10">
      <Link href="/projects" className="inline-flex min-h-11 items-center self-start">
        ← {t("detail.back")}
      </Link>
      <header className="flex flex-col gap-3">
        <span className="font-mono text-xs text-laterite-ink uppercase">{t(`sectors.${p.sector}`)} · FY {p.year}</span>
        <h1 className="m-0 font-display text-[40px] leading-none font-semibold sm:text-6xl">
          {p.name}
          <SourceTick id={p.source} />
        </h1>
      </header>
      <section aria-labelledby="facts-title">
        <h2 id="facts-title" className="sr-only">
          {t("detail.facts")}
        </h2>
        <dl className="m-0 grid border-t-2 border-text sm:grid-cols-2">
          {facts.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-rule py-3 sm:pr-6">
              <dt className="text-muted">{k}</dt>
              <dd className="m-0 text-right font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section aria-labelledby="gallery-title" className="flex flex-col gap-4">
        <h2 id="gallery-title" className="m-0 font-display text-3xl font-semibold">
          {t("detail.gallery")}
        </h2>
        {gallery.length ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {gallery.map((id) => (
              <Photo key={id} id={id} sizes="(min-width: 640px) 50vw, 100vw" />
            ))}
          </div>
        ) : (
          <p className="m-0 text-muted">{t("detail.noPhotos")}</p>
        )}
      </section>
    </Container>
  );
}
