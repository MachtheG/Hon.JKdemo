"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";

/** Pill-style dropdown for the desktop nav. Closes on navigation, outside click and Escape. */
export function NavDropdown({ label, items }: { label: string; items: { href: string; label: string }[] }) {
  const [openPath, setOpenPath] = useState<string | null>(null);
  const pathname = usePathname();
  const open = openPath === pathname;
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpenPath(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenPath(null);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpenPath(open ? null : pathname)}
        className="inline-flex min-h-10 items-center gap-1 rounded-md border border-rule bg-white px-3.5 text-[12.5px] font-semibold tracking-[0.08em] text-ink uppercase transition-colors hover:border-tea hover:text-tea"
      >
        {label}
        <ChevronDown aria-hidden size={14} className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>
      <ul
        id={id}
        hidden={!open}
        className="absolute top-full right-0 z-50 mt-2 min-w-52 list-none overflow-hidden rounded-lg border border-rule bg-white p-1.5 shadow-xl"
      >
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} className="flex min-h-11 items-center rounded-md px-3 text-[15px] text-ink no-underline hover:bg-mist hover:text-tea">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
