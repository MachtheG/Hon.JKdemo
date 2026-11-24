import { cn } from "@/lib/utils";

const ratios = {
  "16/9": "aspect-video",
  "4/5": "aspect-[4/5]",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
} as const;

/**
 * Designed placeholder until real photos arrive. No faces, no silhouettes.
 * Every slot is listed in docs/SHOT-LIST.md.
 */
export function PhotoSlot({
  id,
  ratio,
  shot,
  minSize,
  className,
}: {
  id: string;
  ratio: keyof typeof ratios;
  shot: string;
  minSize: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={shot}
      className={cn("tea-rows flex items-end p-3 text-paper", ratios[ratio], className)}
    >
      <span className="font-mono text-[11px] leading-snug">
        {id} · {ratio.replace("/", ":")} · min {minSize}
        <br />
        {shot}
      </span>
    </div>
  );
}
