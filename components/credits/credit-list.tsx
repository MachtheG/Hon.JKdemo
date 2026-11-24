import { useLocale, useTranslations } from "next-intl";
import { credits } from "@/data/credits";
import { uniqueImages } from "@/data/photos";

export function CreditList() {
  const t = useTranslations("credits");
  const locale = useLocale() as "en" | "sw";
  const published = uniqueImages.map((img) => ({ id: img.file, credit: `${img.alt[locale]} — ${img.credit} (${img.licence})` }));
  return (
    <div className="flex flex-col gap-12">
      <section aria-labelledby="c-photos" className="flex flex-col gap-3">
        <h2 id="c-photos" className="m-0 font-display text-[28px] font-semibold">
          {t("photos")}
        </h2>
        {published.length === 0 ? (
          <p className="m-0 text-muted">{t("photosNone")}</p>
        ) : (
          <ul className="m-0 list-none p-0">
            {published.map((p) => (
              <li key={p.id} className="border-b border-rule py-3">
                {p.credit}
              </li>
            ))}
          </ul>
        )}
      </section>
      <section aria-labelledby="c-data" className="flex flex-col gap-3">
        <h2 id="c-data" className="m-0 font-display text-[28px] font-semibold">
          {t("data")}
        </h2>
        <ul className="m-0 list-none border-t-2 border-text p-0">
          {credits.map((c) => (
            <li key={c.id} className="flex flex-col gap-1 border-b border-rule py-4">
              <span className="font-semibold">{c.what}</span>
              <span className="text-sm">{c.author}</span>
              <span className="text-sm">
                <a href={c.licenceUrl} target="_blank" rel="noopener noreferrer">
                  {t("licence", { licence: c.licence })}
                </a>
                {" · "}
                <a href={c.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {new URL(c.sourceUrl).hostname}
                </a>
              </span>
              {c.notes ? <span className="text-sm text-muted">{c.notes}</span> : null}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
