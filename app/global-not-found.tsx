import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Page not found · Ukurasa haukupatikana",
};

/** Unmatched routes skip the [locale] layout, so this page is bilingual. */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh items-center justify-center bg-ink p-6 text-paper">
        <main className="flex max-w-xl flex-col gap-4">
          <p className="m-0 font-mono text-sm text-accent">404</p>
          <h1 className="m-0 font-display text-5xl font-semibold">Page not found</h1>
          <p className="m-0 text-mist" lang="sw">
            Ukurasa haukupatikana.
          </p>
          <p className="m-0 text-mist">This page isn&apos;t here yet. The campaign site is still being built.</p>
          <div className="flex gap-4">
            <Link href="/en" className="inline-flex min-h-12 items-center bg-accent px-6 font-semibold text-ink no-underline">
              Home
            </Link>
            <Link href="/sw" lang="sw" className="inline-flex min-h-12 items-center border border-paper px-6 text-paper no-underline">
              Nyumbani
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
