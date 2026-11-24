import { getRequestConfig } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import { isLocale, namespaces, routing } from "./routing";

export default getRequestConfig(async ({ locale: override }) => {
  const segment = override ?? (await rootLocale());
  const locale = isLocale(segment) ? segment : routing.defaultLocale;

  const entries = await Promise.all(
    namespaces.map(async (ns) => {
      const mod = (await import(`../messages/${locale}/${ns}.json`)) as {
        default: Record<string, unknown>;
      };
      return [ns, mod.default] as const;
    }),
  );

  return {
    locale,
    messages: Object.fromEntries(entries),
    timeZone: "Africa/Nairobi",
  };
});
