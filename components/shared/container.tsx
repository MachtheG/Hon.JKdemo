import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Section wrapper with the site's max width and gutters. */
export function Container({ children, className, as: Tag = "section", ...rest }: {
  children: ReactNode;
  className?: string;
  as?: "section" | "div" | "article";
  "aria-labelledby"?: string;
  "aria-label"?: string;
  id?: string;
}) {
  return (
    <Tag className={cn("mx-auto max-w-[1312px] px-4 py-12 sm:py-16", className)} {...rest}>
      {children}
    </Tag>
  );
}

export function SectionTitle({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="m-0 mb-6 font-display text-[28px] leading-tight font-semibold sm:text-4xl">
      {children}
    </h2>
  );
}
