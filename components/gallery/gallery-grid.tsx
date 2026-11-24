import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { photoFiles } from "@/data/photo-files.generated";
import { uniqueImages } from "@/data/photos";

/** Every photograph on the site, once, with its caption and credit. */
export function GalleryGrid() {
  const t = useTranslations("gallery");
  const locale = useLocale() as "en" | "sw";
  return (
    <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {uniqueImages.map((img) => {
        const f = photoFiles[img.file];
        return (
          <li key={img.file}>
            <figure className="m-0 flex flex-col gap-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-mist shadow-sm">
                <Image
                  src={img.file}
                  alt={img.alt[locale]}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                  style={{ objectPosition: img.focus }}
                  {...(f ? { placeholder: "blur" as const, blurDataURL: f.blurDataURL } : {})}
                />
              </div>
              <figcaption className="flex flex-col gap-0.5">
                <span className="font-medium">{img.alt[locale]}</span>
                <span className="text-sm text-muted">{t("credit", { credit: `${img.credit} · ${img.licence.split(" — ")[0]}` })}</span>
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
