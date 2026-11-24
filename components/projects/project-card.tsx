"use client";

import { useTranslations } from "next-intl";
import type { Project } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import { formatNumber } from "@/lib/format";

export function ProjectCard({ project: p }: { project: Project }) {
  const t = useTranslations("projects");
  return (
    <article className="flex flex-col border border-text">
      <div className="tea-rows aspect-[3/2]" aria-hidden />
      <div className="flex flex-col gap-2 p-5">
        <span className="font-mono text-xs text-laterite-ink uppercase">
          {t(`sectors.${p.sector}`)} · {p.ward ? `${p.ward}, ` : ""}
          {p.constituency} · FY {p.year}
        </span>
        <h3 className="m-0 font-display text-[22px] leading-tight font-semibold">{p.name}</h3>
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0 text-[13px]">
          <li className="border border-text px-2 py-0.5">{t("card.role", { role: t(`roleNames.${p.role}`) })}</li>
          {p.amountKes !== null && p.amountKind ? (
            <li className="border border-text px-2 py-0.5">
              {t("card.amount", { amount: formatNumber(p.amountKes), kind: t(`kinds.${p.amountKind}`) })}
            </li>
          ) : null}
          <li className="border border-text px-2 py-0.5">{t("card.status", { status: t(`statuses.${p.status}`) })}</li>
        </ul>
        <Link href={`/projects/${p.id}`} className="mt-1 inline-flex min-h-11 items-center self-start font-semibold">
          {t("card.view")} →
        </Link>
      </div>
    </article>
  );
}
