import { ArrowRight, Award, BadgeCheck, CheckCircle2, ClipboardCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Counter } from "./Counter";
import { soloDoctorInfo } from "./data";
import { useLanguage } from "./LanguageContext";
import { Reveal } from "./Reveal";

const pointsFr = [
  "Pratique assurée directement par Dr. Filali Baba Ghita (médecin unique)",
  "Diagnostic dermatologique précis et explications claires dès la 1re visite",
  "Plateau complet : Lasers Fotona, PRP, Skinbooster, Botox & Hydra Beauty",
];

const pointsAr = [
  "متابعة مباشرة مع الدكتورة فيلالي بابا غيتة (طبيبة واحدة متابعة)",
  "تشخيص جلدي دقيق وشرح واضح منذ الزيارة الأولى",
  "تجهيزات متكاملة: ليزر Fotona، PRP، سكين بوستر، بوتوكس وهيدرا بيوتي",
];

export function AboutSection() {
  const { isAr } = useLanguage();
  const shortName = isAr ? soloDoctorInfo.shortNameAr : soloDoctorInfo.shortNameFr;
  const cabinetName = isAr ? soloDoctorInfo.cabinetNameAr : soloDoctorInfo.cabinetNameFr;
  const address = isAr ? soloDoctorInfo.addressAr : soloDoctorInfo.addressFr;
  const points = isAr ? pointsAr : pointsFr;

  return (
    <section id="about" className="section-y relative overflow-hidden">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="absolute -left-4 -top-4 h-40 w-40 rounded-3xl bg-pattern-cross bg-secondary" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[2rem] shadow-elevated">
            <img
              src={soloDoctorInfo.aboutImage}
              alt={isAr ? "استقبال العيادة في الرباط" : "Accueil du cabinet du Dr. Filali Baba Ghita à Rabat"}
              loading="lazy"
              width={900}
              height={1350}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div className="absolute -right-3 top-10 flex animate-float items-center gap-3 rounded-2xl bg-background p-4 shadow-elevated sm:-right-8">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
              <BadgeCheck className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-lg font-bold leading-tight">
                {soloDoctorInfo.ratingDisplay} ★ ({soloDoctorInfo.reviewCount} {isAr ? "تقييم" : "avis"})
              </p>
              <p className="text-xs text-muted-foreground">
                {soloDoctorInfo.arabicLabel} · {isAr ? "الرباط" : "Rabat"}
              </p>
            </div>
          </div>

          <div className="absolute -bottom-6 left-6 rounded-2xl bg-gradient-primary p-5 text-primary-foreground shadow-glow sm:left-10">
            <p className="font-display text-3xl font-extrabold leading-none">
              <Counter to={30} suffix={isAr ? " دقيقة" : " min"} />
            </p>
            <p className="mt-1 text-sm text-primary-foreground/85">
              {isAr ? "متابعة مباشرة مع الطبيبة" : "Suivi direct avec la praticienne"}
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-warm" aria-hidden="true" />
              {isAr ? `متابعة فردية — ${soloDoctorInfo.arabicLabel}` : `Praticienne Unique — ${soloDoctorInfo.arabicLabel}`}
            </span>
            <h2 className="display-title mt-4 text-3xl sm:text-4xl lg:text-[2.9rem]">
              {isAr ? (
                <>
                  رعاية طبية مباشرة مع <span className="text-primary">{shortName}.</span>
                </>
              ) : (
                <>
                  Une Prise en Charge Directe par <span className="text-primary">{shortName}.</span>
                </>
              )}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-muted p-5">
              <Award className="h-6 w-6 text-warm" />
              <p className="mt-3 font-display text-3xl font-extrabold text-foreground sm:text-4xl">
                {soloDoctorInfo.ratingDisplay}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {isAr ? `متوسط التقييم (${soloDoctorInfo.reviewCount} مراجعة)` : `Note moyenne (${soloDoctorInfo.reviewCount} avis)`}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-muted p-5">
              <ClipboardCheck className="h-6 w-6 text-primary" />
              <p className="mt-3 font-display text-3xl font-extrabold text-foreground sm:text-4xl">
                <Counter to={22} suffix="+" />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {isAr ? "إشادات بدقة التشخيص" : "Mentions « diagnostic »"}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {isAr
                ? `في ${cabinetName}، يستفيد كل مريض من متابعة طبية مع طبيبة واحدة — ${shortName} — في ${address}. إنصات كامل، تشخيص دقيق، أجهزة ليزر طبية وعلاجات تجميلية (PRP، سكين بوستر، بوتوكس).`
                : `Au ${cabinetName}, chaque patient est reçu par un médecin unique — ${shortName} — au ${address}. Écoute attentive, rigueur diagnostique, lasers médicaux et soins esthétiques (PRP, Skinbooster, Botox) se rejoignent dans un cadre moderne.`}
            </p>
            <ul className="mt-6 grid gap-3">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm font-medium text-foreground sm:text-base">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" /> {p}
                </li>
              ))}
            </ul>
            <Button variant="hero" size="xl" className="mt-9" asChild>
              <a href="#specialists">
                {isAr ? "التعرف على الطبيبة" : "Découvrir la Praticienne"} <ArrowRight />
              </a>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
