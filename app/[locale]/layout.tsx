import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { notFound } from "next/navigation";
import { locale as rootLocale } from "next/root-params";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SkipLink } from "@/components/layout/skip-link";
import { isLocale, locales } from "@/i18n/routing";
import { PersonJsonLd } from "@/components/layout/person-json-ld";
import { SHOW_TO_CONFIRM, stripConfirm } from "@/components/shared/to-confirm";
import { liteModeBootScript } from "@/lib/lite-mode";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

const outfit = Outfit({ subsets: ["latin", "latin-ext"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter" });

/**
 * Only the namespaces that client components read are sent to the browser
 * (server components translate on the server). Keeps hydration payload small.
 */
const CLIENT_NAMESPACES = ["common", "forms", "map", "projects"] as const;
async function clientMessages() {
  const all = (await getMessages()) as Record<string, Record<string, unknown>>;
  const picked: Record<string, unknown> = Object.fromEntries(CLIENT_NAMESPACES.map((ns) => [ns, all[ns]]));
  picked.home = { countdown: all.home?.countdown };
  // Internal review notes never ship in the public page source.
  return (SHOW_TO_CONFIRM ? picked : stripMarkers(picked)) as typeof all;
}
function stripMarkers(v: unknown): unknown {
  if (typeof v === "string") return v.includes("[[TO CONFIRM") ? stripConfirm(v) : v;
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, stripMarkers(x)]));
  return v;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common.meta");
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("siteName"), template: `%s · ${t("titleSuffix")}` },
    description: t("description"),
    applicationName: t("siteName"),
    authors: [{ name: "Joyce Korir 2027 campaign" }],
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#0B6E3A",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await rootLocale();
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={`${outfit.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: liteModeBootScript }} />
        <PersonJsonLd locale={locale} />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <NextIntlClientProvider messages={await clientMessages()}>
          <SkipLink />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
