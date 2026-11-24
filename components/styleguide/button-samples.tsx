import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function ButtonSamples() {
  const t = useTranslations("styleguide.buttons");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        <Button variant="accent">{t("accent")}</Button>
        <Button variant="ink">{t("ink")}</Button>
        <Button variant="outline">{t("outline")}</Button>
        <Button variant="accent" disabled>
          {t("disabled")}
        </Button>
      </div>
      <div className="flex flex-wrap gap-3 bg-ink p-6 text-paper">
        <Button variant="accent">{t("accent")}</Button>
        <Button variant="outline">{t("outline")}</Button>
      </div>
    </div>
  );
}
