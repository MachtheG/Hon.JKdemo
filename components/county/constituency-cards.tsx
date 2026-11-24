import { useTranslations } from "next-intl";
import { Photo } from "@/components/shared/photo";
import type { PhotoId } from "@/data/photos";
import { populationByConstituency2019, wardsByConstituency } from "@/data/stats";
import { Link } from "@/i18n/navigation";
import { formatNumber } from "@/lib/format";
import { slugify } from "@/lib/projects";

export function ConstituencyCards() {
  const t = useTranslations("county.constituencies");
  return (
    <section aria-labelledby="cons-title" className="flex flex-col gap-6">
      <h2 id="cons-title" className="m-0 font-display text-[28px] font-semibold sm:text-4xl">
        {t("title")}
      </h2>
      <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {populationByConstituency2019.map((c) => {
          const slug = slugify(c.name);
          return (
            <li key={c.code}>
              <Link href={`/bomet/${slug}`} className="group flex flex-col gap-2 text-text no-underline">
                <Photo id={`CONST-${slug.toUpperCase()}` as PhotoId} sizes="(min-width: 1024px) 33vw, 100vw" />
                <span className="font-display text-2xl font-semibold group-hover:underline">{c.name}</span>
                <span className="font-mono text-sm text-muted">
                  {t("population", { n: formatNumber(c.population) })} · {t("voters", { n: formatNumber(c.voters2022) })} ·{" "}
                  {t("wards", { n: wardsByConstituency[c.name].length })}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
