import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Seal + wordmark. The Parliament of Kenya (Senate) seal is used at the
 * campaign's instruction; written authorisation is tracked in PROGRESS.md.
 * Swap the file at public/brand/senate-seal.png to change the crest.
 */
export async function Brand({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const t = await getTranslations("common.brand");
  return (
    <Link href="/" className={cn("group flex items-center gap-3 no-underline", className)}>
      <Image src="/brand/senate-seal.png" alt="" width={48} height={47} priority className="size-11 shrink-0 sm:size-12" />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[22px] font-extrabold tracking-[0.06em] uppercase sm:text-[26px]", tone === "dark" ? "text-tea" : "text-white")}>
          {t("name")}
        </span>
        <span className={cn("mt-1 font-display text-[12px] font-medium tracking-[0.16em] uppercase sm:text-[13px]", tone === "dark" ? "text-muted" : "text-white/80")}>
          {t("office")}
        </span>
      </span>
    </Link>
  );
}
