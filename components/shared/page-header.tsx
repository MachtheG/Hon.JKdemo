import type { ReactNode } from "react";
import type { PhotoId } from "@/data/photos";
import { Photo } from "./photo";
import { ConfirmText } from "./to-confirm";

/** Inner-page header: soft panel, gold rule, kicker, bold title, intro and a photograph (every page has one). */
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
    <header className="bg-mist">
      <div className="mx-auto grid max-w-[1312px] items-center gap-10 px-4 py-14 sm:py-20 lg:grid-cols-[3fr_2fr] lg:gap-14">
        <div className="flex flex-col gap-4">
          <div className="tea-rule" aria-hidden />
          <span className="text-[13px] font-semibold tracking-[0.18em] text-tea uppercase">{kicker}</span>
          <h1 className="m-0 font-display text-[38px] leading-[1.05] font-bold sm:text-[54px] lg:text-[60px]">
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
        <Photo id={photo ?? "COUNTY-01"} sizes="(min-width: 1024px) 40vw, 100vw" className="shadow-lg" />
      </div>
    </header>
  );
}
