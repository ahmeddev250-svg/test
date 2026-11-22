import { motion } from "framer-motion";
import { ArrowRight, HeartPulse, Plus, ShieldCheck, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAppointment } from "./AppointmentModal";
import { Counter } from "./Counter";
import { clinicPreviewThumbs, soloDoctorInfo } from "./data";
import { useLanguage } from "./LanguageContext";
import { Stars } from "./Stars";

const ease = [0.22, 1, 0.36, 1] as const;

function TrustBadge({ badgeText }: { badgeText: string }) {
  return (
    <div className="relative grid h-32 w-32 place-items-center rounded-full bg-background shadow-card sm:h-36 sm:w-36">
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text className="fill-primary-deep text-[10px] font-semibold uppercase">
          <textPath href="#badge-circle" textLength="270" lengthAdjust="spacing">
            {badgeText}
          </textPath>
        </text>
      </svg>
      <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow">
        <ShieldCheck className="h-7 w-7" />
      </span>
    </div>
  );
}

export function HeroSection() {
  const { openAppointment } = useAppointment();
  const { isAr } = useLanguage();

  const shortName = isAr ? soloDoctorInfo.shortNameAr : soloDoctorInfo.shortNameFr;
  const cabinetName = isAr ? soloDoctorInfo.cabinetNameAr : soloDoctorInfo.cabinetNameFr;
  const address = isAr ? soloDoctorInfo.addressAr : soloDoctorInfo.addressFr;
  const hoursStatus = isAr ? soloDoctorInfo.hoursStatusAr : soloDoctorInfo.hoursStatusFr;

  return (
    <section id="home" className="bg-hero relative overflow-hidden pt-28 lg:pt-32">
      <div className="bg-pattern-cross pointer-events-none absolute inset-0" aria-hidden="true" />
      <Plus className="pointer-events-none absolute left-[6%] top-40 h-8 w-8 animate-float text-primary/25" aria-hidden="true" />
      <Plus className="pointer-events-none absolute right-[42%] top-32 h-5 w-5 animate-float-slow text-warm/50" aria-hidden="true" />
      <HeartPulse className="pointer-events-none absolute bottom-40 left-[44%] h-10 w-10 animate-float-slow text-primary/15" aria-hidden="true" />

      <div className="container-site relative grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        <div className="relative z-10 pb-6 lg:pb-28">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/80 px-4 py-2 text-sm font-medium text-primary-deep shadow-soft backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {hoursStatus} · {address}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="display-title mt-6 text-[2.35rem] sm:text-5xl xl:text-[4.1rem]"
          >
            {shortName}{" "}
            <span className="text-primary">
              {isAr ? "أمراض الجلد والطب التجميلي." : "Dermatologie & Esthétique."}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {isAr
              ? `${cabinetName} (${soloDoctorInfo.arabicLabel}) بإشراف مباشر من طبيبة واحدة في الرباط. تشخيص جلدي دقيق، ليزر طبي وعلاجات تجميلية (PRP، سكين بوستر، بوتوكس).`
              : `${cabinetName} (${soloDoctorInfo.arabicLabel}) assuré par une praticienne unique à Rabat. Diagnostic dermatologique attentif, lasers médicaux et soins esthétiques (PRP, Skinbooster, Botox).`}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button variant="hero" size="xl" onClick={() => openAppointment({ doctor: shortName })}>
              {isAr ? "حجز موعد" : "Prendre RDV"} <ArrowRight />
            </Button>
            <Button variant="outline-primary" size="xl" asChild>
              <a href="#services">{isAr ? "العلاجات والليزر" : "Soins & Lasers"}</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            className="mt-10 flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {clinicPreviewThumbs.map((src, i) => (
                <img
                  key={`${src}-${i}`}
                  src={src}
                  alt={isAr ? `صورة من العيادة ${i + 1}` : `Aperçu du cabinet et des soins ${i + 1}`}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full border-[3px] border-background object-cover shadow-soft"
                />
              ))}
              <span className="grid h-12 w-12 place-items-center rounded-full border-[3px] border-background bg-warm text-sm font-bold text-warm-foreground">
                {soloDoctorInfo.ratingDisplay}
              </span>
            </div>
            <div>
              <Stars count={5} />
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                {isAr ? (
                  <>
                    تقييم <span className="font-bold text-foreground">{soloDoctorInfo.ratingDisplay}</span> من{" "}
                    <span className="font-bold text-foreground">{soloDoctorInfo.reviewCount}</span> مراجعة على جوجل
                  </>
                ) : (
                  <>
                    Note <span className="font-bold text-foreground">{soloDoctorInfo.ratingDisplay}</span> sur{" "}
                    <span className="font-bold text-foreground">{soloDoctorInfo.reviewCount}</span> avis Google
                  </>
                )}
              </p>
            </div>
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-[34rem] self-end lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease }}
            className="absolute bottom-0 left-1/2 aspect-square w-[88%] -translate-x-1/2 rounded-t-full bg-gradient-glow"
            aria-hidden="true"
          >
            <div className="absolute inset-6 rounded-t-full border border-primary-foreground/25" />
            <div className="absolute inset-14 rounded-t-full border border-primary-foreground/15" />
          </motion.div>

          <motion.img
            src={soloDoctorInfo.heroImage}
            alt={isAr ? "الدكتورة فيلالي بابا غيتة — طبيبة الجلد في الرباط" : "Dr. Filali Baba Ghita — Cabinet de Dermatologie et Médecine Esthétique à Rabat"}
            width={900}
            height={1350}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease }}
            className="relative z-10 mx-auto h-[26rem] w-auto rounded-t-3xl object-cover object-top sm:h-[34rem] lg:h-[40rem]"
          />

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="absolute bottom-24 left-0 z-20 sm:bottom-32 lg:-left-6"
          >
            <div className="flex animate-float items-center gap-3 rounded-2xl bg-background/95 p-3 pr-5 shadow-elevated backdrop-blur sm:p-4 sm:pr-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-warm-soft text-warm sm:h-12 sm:w-12">
                <Users className="h-6 w-6" />
              </span>
              <div>
                <p className="font-display text-2xl font-extrabold leading-none text-foreground sm:text-3xl">
                  <Counter to={soloDoctorInfo.reviewCount} />
                </p>
                <p className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">
                  {isAr ? "تقييم · 5,0 ★" : "Avis · 5,0 ★"}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.75, ease }}
            className="absolute right-0 top-10 z-20 scale-75 sm:scale-100 lg:-right-2 lg:top-16"
          >
            <TrustBadge badgeText={isAr ? "د. فيلالي • طبيبة الجلد •" : "Dr. Filali • طبيبة الجلد •"} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
