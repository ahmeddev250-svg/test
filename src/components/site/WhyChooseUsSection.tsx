import { ArrowRight, Clock3, HeartHandshake, ShieldPlus, Smile, Stethoscope, Users } from "lucide-react";

import soinsSmartluxHydra from "@/assets/soins-smartlux-hydra.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Counter } from "./Counter";
import { soloDoctorInfo } from "./data";
import { useLanguage } from "./LanguageContext";
import { Reveal } from "./Reveal";

const featuresFr = [
  {
    icon: HeartHandshake,
    title: "Humaine & à l'écoute",
    text: "Un accompagnement bienveillant où chaque question reçoit des explications claires.",
  },
  {
    icon: ShieldPlus,
    title: "Diagnostic dès la 1re visite",
    text: "Une évaluation clinique précise et un traitement adapté menés par une praticienne unique.",
  },
  {
    icon: Clock3,
    title: "Équipements médicaux modernes",
    text: "Lasers Fotona SP Dynamis, photothérapie Smartlux IQ et soins Hydra Beauty à Rabat.",
  },
];

const featuresAr = [
  {
    icon: HeartHandshake,
    title: "تعامل إنساني وإنصات كامل",
    text: "مرافقة طبية لطيفة مع شرح واضح لكل سؤال واستفسار.",
  },
  {
    icon: ShieldPlus,
    title: "تشخيص دقيق منذ الزيارة الأولى",
    text: "تقييم سريري مباشر وخطة علاج مناسبة مع طبيبة واحدة.",
  },
  {
    icon: Clock3,
    title: "تجهيزات طبية حديثة في الرباط",
    text: "أجهزة ليزر Fotona SP Dynamis، علاج Smartlux IQ وجلسات Hydra Beauty.",
  },
];

export function WhyChooseUsSection() {
  const { isAr } = useLanguage();
  const shortName = isAr ? soloDoctorInfo.shortNameAr : soloDoctorInfo.shortNameFr;
  const features = isAr ? featuresAr : featuresFr;

  const stats = [
    {
      to: 22,
      suffix: "",
      label: isAr ? "إشادات بـ « التشخيص »" : "Mentions « diagnostic »",
      icon: Stethoscope,
      featured: false,
    },
    {
      to: 172,
      suffix: isAr ? " مراجعة" : " avis",
      label: isAr ? "بتقييم 5,0 ★ على جوجل" : "Notés 5,0 ★ sur Google",
      icon: Smile,
      featured: true,
    },
    {
      to: 21,
      suffix: "",
      label: isAr ? "إشادات بـ « الإنسانية »" : "Mentions « humaine »",
      icon: Users,
      featured: false,
    },
  ];

  return (
    <section id="why-us" className="section-y relative overflow-hidden">
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative order-2 mx-auto w-full max-w-md lg:order-1 lg:max-w-none">
            <div className="relative mx-auto w-full max-w-[30rem]">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-secondary shadow-elevated">
                <img
                  src={soinsSmartluxHydra}
                  alt={isAr ? "أجهزة Smartlux IQ وHydra Beauty في العيادة" : "Équipements Smartlux IQ et Hydra Beauty au cabinet Dr. Filali Baba Ghita à Rabat"}
                  loading="lazy"
                  width={900}
                  height={1200}
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
              <div className="absolute -left-3 top-6 z-20 rounded-2xl bg-background px-4 py-3 shadow-card sm:-left-6">
                <p className="text-xs text-muted-foreground">{isAr ? "ثقة (19)" : "Confiance (19)"}</p>
                <p className="font-display text-lg font-bold text-primary-deep">{soloDoctorInfo.ratingDisplay} ★</p>
              </div>
              <div className="absolute -bottom-4 right-3 z-20 flex items-center gap-2 rounded-2xl bg-background px-4 py-3 shadow-card sm:right-6">
                <Smile className="h-6 w-6 text-warm" />
                <p className="font-display text-sm font-bold leading-tight">
                  {soloDoctorInfo.arabicLabel}
                  <br />
                  {isAr ? "الرباط" : "Rabat"}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="eyebrow">
                <span className="h-px w-6 bg-warm" aria-hidden="true" />
                {isAr ? "لماذا تختار هذه العيادة" : "Pourquoi Choisir ce Cabinet"}
              </span>
              <h2 className="display-title mt-4 text-3xl sm:text-4xl lg:text-[2.9rem]">
                {isAr ? (
                  <>
                    متابعة فردية قائمة على <span className="text-primary">الإنصات والثقة</span>
                  </>
                ) : (
                  <>
                    Une Pratique Solo Centrée sur <span className="text-primary">l'Écoute &amp; la Confiance</span>
                  </>
                )}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {isAr
                  ? `تُشيد مراجعات المرضى بدقة التشخيص، التعامل الإنساني، والثقة المباشرة مع ${shortName} في الرباط.`
                  : `Les avis de nos patients mettent particulièrement en avant la qualité du diagnostic, la dimension humaine et la confiance établie avec ${shortName} à Rabat.`}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-8 grid gap-4">
                {features.map((f) => (
                  <li key={f.title} className="group flex gap-4 rounded-2xl p-3 transition-colors hover:bg-muted">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <f.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold">{f.title}</h3>
                      <p className="text-sm text-muted-foreground">{f.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Button variant="hero" size="xl" className="mt-8" asChild>
                <a href="#testimonials">
                  {isAr ? "الاطلاع على آراء المرضى" : "Lire les Avis Patients"} <ArrowRight />
                </a>
              </Button>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div
                className={cn(
                  "group relative h-full overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1.5",
                  s.featured
                    ? "bg-gradient-primary text-primary-foreground shadow-glow md:-translate-y-4 md:hover:-translate-y-5"
                    : "border border-border bg-card shadow-soft hover:shadow-card",
                )}
              >
                <s.icon
                  className={cn(
                    "absolute -right-4 -top-4 h-28 w-28 opacity-10 transition-transform duration-700 group-hover:rotate-12",
                    s.featured ? "text-primary-foreground" : "text-primary",
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "grid h-12 w-12 place-items-center rounded-xl",
                    s.featured ? "bg-primary-foreground/15" : "bg-primary-soft text-primary",
                  )}
                >
                  <s.icon className="h-6 w-6" />
                </span>
                <p className="mt-6 font-display text-5xl font-extrabold tracking-tight">
                  <Counter to={s.to} suffix={s.suffix} />
                </p>
                <p className={cn("mt-2 text-base font-medium", s.featured ? "text-primary-foreground/85" : "text-muted-foreground")}>
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
