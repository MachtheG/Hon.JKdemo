import Image from "next/image";
import { useLocale } from "next-intl";
import { photoFiles } from "@/data/photo-files.generated";
import { photoById, type PhotoId, type Ratio } from "@/data/photos";
import { cn } from "@/lib/utils";

const ratioClass: Record<Ratio, string> = {
  "16/9": "aspect-video",
  "4/5": "aspect-[4/5]",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
};

/**
 * A manifest photo with a blur placeholder and the slot's focal point.
 * `fill` covers the parent (heroes). `rounded` gives the soft card corners.
 * If a file is ever missing, a plain brand gradient shows — never slot text.
 */
export function Photo({
  id,
  fill,
  sizes = "100vw",
  priority,
  className,
  rounded = true,
  focus,
}: {
  id: PhotoId;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  rounded?: boolean;
  focus?: string;
}) {
  const locale = useLocale() as "en" | "sw";
  const p = photoById[id];
  const alt = (p.alt ?? p.shot)[locale];
  const box = fill ? "absolute inset-0" : ratioClass[p.ratio];
  const corner = !fill && rounded ? "rounded-xl" : "";

  if (!p.file) {
    return <div role="img" aria-label={alt} className={cn("tea-rows", box, corner, className)} />;
  }
  const f = photoFiles[p.file];
  return (
    <div className={cn("relative overflow-hidden bg-mist", box, corner, className)}>
      <Image
        src={p.file}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: focus ?? p.focus ?? "50% 50%" }}
        {...(f ? { placeholder: "blur" as const, blurDataURL: f.blurDataURL } : {})}
      />
    </div>
  );
}
