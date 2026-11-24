import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Photo } from "@/components/shared/photo";
import { bometCentralWards } from "@/data/bomet-central";
import { Link } from "@/i18n/navigation";
import { formatNumber } from "@/lib/format";

/** The five wards of Bomet Central, each linking to its own page. `exclude` hides the current ward. */
export function WardCards({ exclude, titleKey = "wards.title" }: { exclude?: string; titleKey?: "wards.title" | "ward.others" }) {
  const t = useTranslations("constituency");
  const list = bometCentralWards.filter((w) => w.slug !== exclude);
  return (
    <section aria-labelledby={`wards-${exclude ?? "all"}`} className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="tea-rule" aria-hidden />
        <h2 id={`wards-${exclude ?? "all"}`} className="m-0 font-display text-[30px] font-bold sm:text-4xl">
          {t(titleKey)}
        </h2>
      </div>
      <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((w) => (
          <li key={w.slug}>
            <Link
              href={`/bomet-central/${w.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-rule bg-white text-ink no-underline shadow-sm transition-shadow hover:shadow-lg"
            >
              <Photo id={w.photo} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" rounded={false} />
              <span className="flex flex-1 flex-col gap-1.5 p-5">
                <span className="font-display text-xl font-bold">{w.name}</span>
                <span className="text-sm text-muted">{t("wards.voters", { n: formatNumber(w.voters2022) })}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 font-semibold text-tea group-hover:gap-2.5">
                  {t("wards.open", { name: w.name })} <ArrowRight aria-hidden size={16} />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
