import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { useTranslations } from "next-intl";
import { PromiseBlock } from "@/components/plan/promise-block";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("plan", "/plan");
}

export default function PlanPage() {
  const t = useTranslations("plan");
  return (
    <>
      <p role="note" className="m-0 bg-gold-soft px-4 py-2.5 text-center text-sm font-medium text-ink">
        {t("banner")}
      </p>
      <PageHeader kicker={t("kicker")} title={t("title")} photo="PLAN-01" />
      <Container className="flex flex-col">
        <PromiseBlock k="one" n={1} sources={["parl-na-profile-2017", "parl-psc-vice-chair", "ngcdf-allocations-197"]} />
        <PromiseBlock k="two" n={2} sources={["mzalendo-senate-13th"]} />
        <PromiseBlock k="three" n={3} sources={["mzalendo-bill-county-library", "mzalendo-senate-13th"]} />
      </Container>
      <section className="bg-accent text-ink">
        <div className="mx-auto flex max-w-[1312px] flex-wrap items-center justify-between gap-5 px-4 py-14">
          <h2 className="m-0 font-display text-[32px] font-bold sm:text-[44px]">{t("cta")}</h2>
          <Button asChild variant="ink" size="lg">
            <Link href="/get-involved#pledge">{t("ctaButton")}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
