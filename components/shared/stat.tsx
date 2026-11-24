import type { SourceId } from "@/data/sources";
import { cn } from "@/lib/utils";
import { SourceTick } from "./source-tick";

/** A sourced figure: big tabular numeral, label, and source tick. */
export function Stat({
  value,
  label,
  source,
  size = "md",
  className,
}: {
  value: string;
  label: string;
  source: SourceId;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = { sm: "text-2xl sm:text-3xl", md: "text-[32px] sm:text-5xl", lg: "text-5xl sm:text-7xl" };
  return (
    <div className={cn("flex min-w-0 flex-col", className)}>
      <span className={cn("font-mono leading-tight whitespace-nowrap tabular", sizes[size])}>
        {value}
        <SourceTick id={source} />
      </span>
      <span className="text-muted">{label}</span>
    </div>
  );
}
