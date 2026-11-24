import { useTranslations } from "next-intl";
import { Photo } from "@/components/shared/photo";
import { photoList as photos, type PhotoCategory } from "@/data/photos";

const order: PhotoCategory[] = ["portrait", "community", "projects", "parliament", "events"];

/** Every manifest photo, grouped by category, with its credit. */
export function GalleryGrid() {
  const t = useTranslations("gallery");
  return (
    <div className="flex flex-col gap-14">
      {order.map((cat) => {
        const list = photos.filter((p) => p.category === cat);
        if (!list.length) return null;
        return (
          <section key={cat} aria-labelledby={`g-${cat}`} className="flex flex-col gap-5">
            <h2 id={`g-${cat}`} className="m-0 font-display text-[28px] font-semibold">
              {t(`categories.${cat}`)}
            </h2>
            <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <li key={p.id}>
                  <figure className="m-0 flex flex-col gap-2">
                    <Photo id={p.id} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                    <figcaption className="font-mono text-xs text-muted">
                      {p.credit ? t("credit", { credit: p.credit }) : t("creditPending")}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
