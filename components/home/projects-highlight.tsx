import { useTranslations } from "next-intl";
import { Photo } from "@/components/shared/photo";
import { projects } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import { formatNumber } from "@/lib/format";

/** Up to three featured projects; an honest "awaiting documents" state until sourced. */
export function ProjectsHighlight() {
  const t = useTranslations("home.projects");
  const featured = projects.slice(0, 3);

  return (
    <section aria-labelledby="projects-title" className="bg-ink text-paper">
      <div className="mx-auto grid max-w-[1312px] gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-xs tracking-[0.12em] text-accent uppercase">{t("kicker")}</span>
          <h2 id="projects-title" className="m-0 font-display text-[32px] leading-tight font-semibold sm:text-[44px]">
            {t("title")}
          </h2>
          <p className="m-0 text-mist">{t("body")}</p>
          <Photo id="HOME-PROJECTS" sizes="(min-width: 1024px) 50vw, 100vw" className="mt-2" />
          <Link href="/projects" className="inline-flex min-h-11 items-center self-start font-medium text-paper">
            {t("cta")} →
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="flex flex-col justify-center gap-2.5 self-start border border-dashed border-mist p-6 sm:p-8">
            <span className="font-mono text-sm text-accent uppercase">{t("emptyTitle")}</span>
            <p className="m-0 text-mist">{t("emptyBody")}</p>
          </div>
        ) : (
          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {featured.map((p) => (
              <li key={p.id} className="border border-mist/40 p-5">
                <Link href={`/projects/${p.id}`} className="flex flex-col gap-1 text-paper no-underline">
                  <span className="font-mono text-xs text-accent uppercase">
                    {p.sector} · {p.constituency} · FY {p.year}
                  </span>
                  <span className="font-display text-xl font-semibold">{p.name}</span>
                  {p.amountKes !== null ? (
                    <span className="font-mono text-sm text-mist">
                      KSh {formatNumber(p.amountKes)} · {p.amountKind}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
