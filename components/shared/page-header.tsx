import type { ReactNode } from "react";
import type { PhotoId } from "@/data/photos";
import { Photo } from "./photo";
import { ConfirmText } from "./to-confirm";

/** Standard inner-page header: kicker, title, intro, and the candidate's photo. */
export function PageHeader({
  kicker,
  title,
  intro,
  photo,
  children,
}: {
  kicker: string;
  title: string;
  intro?: ReactNode;
  photo?: PhotoId;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto grid max-w-[1312px] items-end gap-8 px-4 py-12 sm:py-16 lg:grid-cols-[3fr_2fr] lg:gap-12">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-xs tracking-[0.12em] text-laterite-ink uppercase">{kicker}</span>
          <h1 className="m-0 font-display text-[40px] leading-none font-semibold tracking-[-0.015em] sm:text-[64px] lg:text-[72px]">
            {title}
          </h1>
          {intro ? (
            <div className="max-w-2xl text-lg text-muted">
              {typeof intro === "string" ? (
                <p className="m-0">
                  <ConfirmText text={intro} />
                </p>
              ) : (
                intro
              )}
            </div>
          ) : null}
          {children}
        </div>
        {photo ? <Photo id={photo} sizes="(min-width: 1024px) 40vw, 100vw" /> : null}
      </div>
    </header>
  );
}
