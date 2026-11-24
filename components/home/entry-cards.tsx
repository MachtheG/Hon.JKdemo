import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Photo } from "@/components/shared/photo";
import type { PhotoId } from "@/data/photos";
import { Link } from "@/i18n/navigation";

const cards: { key: "who" | "record" | "next"; href: string; photo: PhotoId }[] = [
  { key: "who", href: "/story", photo: "CARD-WHO" },
  { key: "record", href: "/record", photo: "CARD-RECORD" },
  { key: "next", href: "/plan", photo: "CARD-NEXT" },
];

/** Three numbered entry cards: Joyce's Story / Record / Plan. */
export function EntryCards() {
  const t = useTranslations("home.entry");

  return (
    <section aria-labelledby="entry-title" className="mx-auto max-w-[1312px] px-4 py-20">
      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <div className="tea-rule" aria-hidden />
        <h2 id="entry-title" className="m-0 font-display text-[34px] font-bold sm:text-[44px]">
          {t("title")}
        </h2>
        <p className="m-0 max-w-2xl text-lg text-muted">{t("lead")}</p>
      </div>
      <ol className="m-0 grid list-none gap-8 p-0 md:grid-cols-3 md:gap-6">
        {cards.map((c, i) => (
          <li key={c.key}>
            <Link
              href={c.href}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-rule bg-white text-ink no-underline shadow-sm transition-shadow hover:shadow-lg"
            >
              <Photo id={c.photo} sizes="(min-width: 768px) 33vw, 100vw" rounded={false} />
              <span className="flex flex-1 flex-col gap-2 p-6">
                <span className="text-[13px] font-semibold tracking-[0.18em] text-tea uppercase">0{i + 1}</span>
                <span className="font-display text-2xl font-bold">{t(`${c.key}.title`)}</span>
                <span className="text-muted">{t(`${c.key}.body`)}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-3 font-semibold text-tea group-hover:gap-2.5">
                  {t("more")} <ArrowRight aria-hidden size={16} />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
