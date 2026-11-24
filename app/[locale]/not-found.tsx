import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("common.notFound");
  return (
    <section className="mx-auto flex max-w-[1312px] flex-col gap-4 px-4 py-24">
      <p className="m-0 font-mono text-sm text-laterite-ink">404</p>
      <h1 className="m-0 font-display text-5xl font-semibold">{t("title")}</h1>
      <p className="m-0 max-w-xl text-muted">{t("body")}</p>
      <Button asChild variant="ink" className="self-start">
        <Link href="/">{t("home")}</Link>
      </Button>
    </section>
  );
}
