import { useTranslations } from "next-intl";

const roles = ["sponsored", "lobbied", "allocated", "oversaw", "delivered"] as const;

/** Explains the honest-crediting vocabulary used on every project. */
export function RoleKey() {
  const t = useTranslations("projects.roles");
  return (
    <aside aria-labelledby="roles-title" className="flex flex-col gap-3 bg-mist p-6 text-ink">
      <h2 id="roles-title" className="m-0 font-display text-xl font-semibold">
        {t("title")}
      </h2>
      <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-[15px]">
        {roles.map((r) => (
          <li key={r}>{t(r)}</li>
        ))}
      </ul>
      <p className="m-0 border-t border-ink/20 pt-3 text-[15px] font-semibold">{t("amounts")}</p>
    </aside>
  );
}
