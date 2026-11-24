import Image from "next/image";
import { useLocale } from "next-intl";
import { photoById, type PhotoId, type Ratio } from "@/data/photos";
import { cn } from "@/lib/utils";

const ratioClass: Record<Ratio, string> = {
  "16/9": "aspect-video",
  "4/5": "aspect-[4/5]",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
};

/**
 * Renders a manifest photo, or its designed placeholder until the file exists.
 * `fill` makes it cover its parent (for full-bleed heroes). `labelPosition="top"`
 * keeps a placeholder's slot tag clear of overlays at the bottom.
 */
export function Photo({
  id,
  fill,
  sizes = "100vw",
  priority,
  className,
  labelPosition = "bottom",
}: {
  id: PhotoId;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  labelPosition?: "top" | "bottom";
}) {
  const locale = useLocale() as "en" | "sw";
  const p = photoById[id];
  const alt = (p.alt ?? p.shot)[locale];
  const box = fill ? "absolute inset-0" : ratioClass[p.ratio];

  if (p.file) {
    return (
      <div className={cn("relative overflow-hidden bg-tea", box, className)}>
        <Image src={p.file} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn("tea-rows flex p-3 text-paper", labelPosition === "top" ? "items-start justify-end" : "items-end", box, className)}
    >
      {/* Field-note tag: legible on the texture, clearly a placeholder. */}
      <span className="max-w-[34ch] bg-ink/80 px-2 py-1.5 font-mono text-[11px] leading-snug">
        {p.id} · {p.ratio.replace("/", ":")} · min {p.minSize}
        <br />
        {p.shot[locale]}
      </span>
    </div>
  );
}
