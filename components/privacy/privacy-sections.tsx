import { useTranslations } from "next-intl";
import { ConfirmText } from "@/components/shared/to-confirm";

const keys = ["controller", "collect", "why", "basis", "share", "keep", "rights", "complain", "cookies", "children"] as const;

export function PrivacySections() {
  const t = useTranslations("privacy.sections");
  return (
    <div className="flex max-w-3xl flex-col gap-8">
      {keys.map((k) => (
        <section key={k} aria-labelledby={`p-${k}`} className="flex flex-col gap-2">
          <h2 id={`p-${k}`} className="m-0 font-display text-2xl font-semibold">
            {t(`${k}.title`)}
          </h2>
          <p className="m-0">
            <ConfirmText text={t(`${k}.body`)} />
          </p>
        </section>
      ))}
    </div>
  );
}
