import { useTranslations } from "next-intl";
import { HeroPledgeForm } from "@/components/forms/hero-pledge-form";
import { Photo } from "@/components/shared/photo";

/**
 * Home hero, after the campaign's reference design: the candidate's photograph
 * fills the right of the frame, a deep green scrim carries a bold white headline
 * and the sign-up form on the left. On phones the photo sits on top.
 */
export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-[#0a3d24] text-white">
      {/* Photo: top block on phones, right-hand full-bleed from md */}
      <div className="hero-push relative h-[380px] sm:h-[460px] md:absolute md:inset-y-0 md:right-0 md:left-[30%] md:h-auto md:[mask-image:linear-gradient(to_right,transparent,black_28%)]">
        <Photo id="HERO-01" fill priority sizes="(min-width: 768px) 70vw, 100vw" rounded={false} focus="42% 28%" />
      </div>
      <div aria-hidden className="hero-scrim pointer-events-none absolute inset-0" />

      <div className="relative mx-auto flex max-w-[1312px] px-4 pb-12 md:min-h-[640px] md:items-center md:py-16 lg:min-h-[700px]">
        <div className="flex w-full max-w-[560px] flex-col gap-5 pt-8 md:pt-0">
          <span className="text-[13px] font-semibold tracking-[0.18em] text-accent uppercase">{t("kicker")}</span>
          <h1 id="hero-title" className="m-0 font-display text-[40px] leading-[1.05] font-bold sm:text-[52px] lg:text-[60px]">
            {t("title")}
          </h1>
          <p className="m-0 max-w-[30rem] text-lg leading-relaxed text-white/85 sm:text-xl">{t("sub")}</p>
          <div className="mt-2">
            <HeroPledgeForm />
          </div>
        </div>
      </div>
    </section>
  );
}
