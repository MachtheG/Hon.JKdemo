import { useTranslations } from "next-intl";
import { Photo } from "@/components/shared/photo";
import { projects } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import { formatNumber } from "@/lib/format";

/** Projects section. Shows sourced projects when they exist; otherwise explains the ledger, without placeholder boxes. */
export function ProjectsHighlight() {
  const t = useTranslations("home.projects");
  const featured = projects.slice(0, 3);

  return (
    <section aria-labelledby="projects-title" className="bg-mist">
      <div className="mx-auto grid max-w-[1312px] items-center gap-10 px-4 py-20 lg:grid-cols-2 lg:gap-16">
        <Photo id="HOME-PROJECTS" sizes="(min-width: 1024px) 50vw, 100vw" />
        <div className="flex flex-col gap-5">
          <div className="tea-rule" aria-hidden />
          <span className="text-[13px] font-semibold tracking-[0.18em] text-tea uppercase">{t("kicker")}</span>
          <h2 id="projects-title" className="m-0 font-display text-[34px] leading-tight font-bold sm:text-[44px]">
            {t("title")}
          </h2>
          <p className="m-0 text-lg text-muted">{t("body")}</p>
          {featured.length > 0 ? (
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {featured.map((p) => (
                <li key={p.id} className="rounded-lg bg-white p-5 shadow-sm">
                  <Link href={`/projects/${p.id}`} className="flex flex-col gap-1 text-ink no-underline">
                    <span className="font-display text-lg font-semibold">{p.name}</span>
                    {p.amountKes !== null ? (
                      <span className="text-sm text-muted">
                        KSh {formatNumber(p.amountKes)} · {p.amountKind}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[16px]">
              {(["one", "two", "three"] as const).map((k) => (
                <li key={k} className="flex gap-3">
                  <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-accent" />
                  {t(`points.${k}`)}
                </li>
              ))}
            </ul>
          )}
          <Link href="/projects" className="inline-flex min-h-12 w-fit items-center rounded-md bg-tea px-6 font-semibold text-white no-underline hover:bg-leaf">
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
