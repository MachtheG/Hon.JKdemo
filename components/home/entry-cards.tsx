import { useTranslations } from "next-intl";
import { Photo } from "@/components/shared/photo";
import type { PhotoId } from "@/data/photos";
import { Link } from "@/i18n/navigation";

const cards: { key: "who" | "record" | "next"; href: string; photo: PhotoId }[] = [
  { key: "who", href: "/story", photo: "CARD-WHO" },
  { key: "record", href: "/record", photo: "CARD-RECORD" },
  { key: "next", href: "/plan", photo: "CARD-NEXT" },
];

/** The three numbered entry cards: Who / Record / What's next. */
export function EntryCards() {
  const t = useTranslations("home.entry");

  return (
    <section aria-label={t("label")} className="mx-auto max-w-[1312px] px-4 pt-16 pb-10 sm:pt-20">
      <div className="tea-rule mb-6" aria-hidden />
      <ol className="m-0 grid list-none gap-8 p-0 md:grid-cols-3 md:gap-6">
        {cards.map((c, i) => (
          <li key={c.key}>
            <Link href={c.href} className="group flex flex-col gap-3.5 text-text no-underline">
              <Photo id={c.photo} sizes="(min-width: 768px) 33vw, 100vw" />
              <span className="font-mono text-[28px] text-laterite-ink">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-[30px] leading-tight font-semibold group-hover:underline">
                {t(`${c.key}.title`)}
              </span>
              <span className="text-muted">{t(`${c.key}.body`)}</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
