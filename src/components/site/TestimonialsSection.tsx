import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { soloDoctorInfo, testimonials } from "./data";
import { useLanguage } from "./LanguageContext";
import { SectionHeading } from "./SectionHeading";
import { Stars } from "./Stars";

export function TestimonialsSection() {
  const { isAr } = useLanguage();
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const t = testimonials[index] ?? testimonials[0]!;
  const shortName = isAr ? soloDoctorInfo.shortNameAr : soloDoctorInfo.shortNameFr;

  const go = useCallback((dir: number) => {
    setState(([i]) => [(i + dir + testimonials.length) % testimonials.length, dir]);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => go(1), 7000);
    return () => window.clearInterval(id);
  }, [paused, go]);

  const authorName = isAr && "nameAr" in t && t.nameAr ? t.nameAr : t.name;
  const authorRole = isAr ? t.roleAr : t.roleFr;
  const quoteText = isAr ? t.quoteAr : t.quoteFr;

  return (
    <section id="testimonials" className="section-y relative overflow-hidden bg-secondary">
      <div className="bg-pattern-cross pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-site relative">
        <SectionHeading
          eyebrow={
            isAr
              ? `آراء المرضى · ${soloDoctorInfo.ratingDisplay} ★ (${soloDoctorInfo.reviewCount} مراجعة)`
              : `Avis Patients · ${soloDoctorInfo.ratingDisplay} ★ (${soloDoctorInfo.reviewCount} avis)`
          }
          title={
            isAr ? (
              <>
                آراء المرضى حول <span className="text-primary">{shortName}</span>
              </>
            ) : (
              <>
                Ce Que Disent les Patients du <span className="text-primary">{shortName}</span>
              </>
            )
          }
          description={
            isAr
              ? "أبرز الكلمات المتكررة: تشخيص دقيق (22) · إنسانية (21) · ثقة (19)."
              : "Thèmes fréquents : diagnostic (22) · humaine (21) · confiance (19)."
          }
        />

        <div
          className="mx-auto mt-14 grid max-w-5xl items-center gap-8 lg:grid-cols-[1fr_auto]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="relative min-h-[22rem] overflow-hidden rounded-[2rem] bg-background p-7 shadow-card sm:min-h-[19rem] sm:p-12" aria-live="polite">
            <Quote className="absolute right-8 top-8 h-16 w-16 text-primary/10" aria-hidden="true" />
            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={`${t.name}-${isAr ? "ar" : "fr"}`}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Stars count={5} />
                <blockquote className="mt-5 font-display text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
                  “{quoteText}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <img src={t.image} alt={authorName} width={56} height={56} loading="lazy" className="h-14 w-14 rounded-full object-cover ring-4 ring-primary-soft" />
                  <div>
                    <p className="font-display text-lg font-bold">{authorName}</p>
                    <p className="text-sm text-muted-foreground">{authorRole}</p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between gap-6 lg:flex-col">
            <div className="flex gap-3 lg:flex-col" role="group" aria-label={isAr ? "اختيار تقييم" : "Choisir un avis"}>
              {testimonials.map((p, i) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  aria-label={isAr ? `عرض رأي ${p.name}` : `Afficher l'avis de ${p.name}`}
                  aria-current={i === index}
                  className={cn(
                    "cursor-pointer overflow-hidden rounded-full transition-all duration-300",
                    i === index ? "scale-110 ring-4 ring-primary" : "opacity-60 grayscale hover:opacity-100 hover:grayscale-0",
                  )}
                >
                  <img src={p.image} alt="" width={48} height={48} loading="lazy" className="h-12 w-12 object-cover" />
                </button>
              ))}
            </div>
            <div className="flex gap-3 lg:flex-col">
              <Button variant="light" size="icon-pill" onClick={() => go(-1)} aria-label={isAr ? "الرأي السابق" : "Avis précédent"}>
                <ChevronLeft />
              </Button>
              <Button variant="hero" size="icon-pill" onClick={() => go(1)} aria-label={isAr ? "الرأي التالي" : "Avis suivant"}>
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
