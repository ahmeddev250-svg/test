import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useAppointment } from "./AppointmentModal";
import { blogPosts, soloDoctorInfo, type BlogPost } from "./data";
import { useLanguage } from "./LanguageContext";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function BlogSection() {
  const { isAr } = useLanguage();
  const [post, setPost] = useState<BlogPost | null>(null);
  const { openAppointment } = useAppointment();
  const shortName = isAr ? soloDoctorInfo.shortNameAr : soloDoctorInfo.shortNameFr;

  return (
    <section id="blog" className="section-y">
      <div className="container-site">
        <SectionHeading
          eyebrow={isAr ? "النتائج والحالات السريرية" : "Résultats & Cas Cliniques"}
          title={
            isAr ? (
              <>
                قبل / بعد — <span className="text-primary">{shortName}</span>
              </>
            ) : (
              <>
                Avant / Après — <span className="text-primary">{shortName}</span>
              </>
            )
          }
          description={
            isAr
              ? "نماذج من المتابعة الجلدية والعلاجات التجميلية المجراة في العيادة بالرباط."
              : "Aperçu de prises en charge en dermatologie clinique et médecine esthétique réalisées au cabinet à Rabat."
          }
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {blogPosts.map((p, i) => {
            const title = isAr ? p.titleAr : p.titleFr;
            const category = isAr ? p.categoryAr : p.categoryFr;
            const date = isAr ? p.dateAr : p.dateFr;
            const readTime = isAr ? p.readTimeAr : p.readTimeFr;
            const excerpt = isAr ? p.excerptAr : p.excerptFr;

            return (
              <Reveal key={p.titleFr} delay={i * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card">
                  <div className="relative aspect-[4/4] overflow-hidden bg-secondary">
                    <img src={p.image} alt={title} loading="lazy" width={800} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute left-4 top-4 rounded-full bg-warm px-3 py-1 text-xs font-semibold text-warm-foreground">
                      {category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5 text-primary" />
                        <time>{date}</time>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-primary" /> {readTime}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary-deep">
                      {title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{excerpt}</p>
                    <button
                      type="button"
                      onClick={() => setPost(p)}
                      className="mt-5 inline-flex cursor-pointer items-center gap-2 self-start text-sm font-semibold text-primary transition-all hover:gap-3"
                    >
                      {isAr ? "عرض التفاصيل" : "Voir les détails"} <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Dialog open={post !== null} onOpenChange={(o) => !o && setPost(null)}>
        <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto rounded-3xl border-none p-0 shadow-elevated">
          {post && (
            <article dir={isAr ? "rtl" : "ltr"}>
              <img src={post.image} alt="" width={800} height={800} className="max-h-[26rem] w-full rounded-t-3xl bg-secondary object-contain" />
              <div className="p-6 sm:p-9">
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full bg-warm px-3 py-1 font-semibold text-warm-foreground">
                    {isAr ? post.categoryAr : post.categoryFr}
                  </span>
                  <span>{isAr ? post.dateAr : post.dateFr}</span>
                  <span>•</span>
                  <span>{isAr ? post.readTimeAr : post.readTimeFr}</span>
                </div>
                <DialogTitle className="mt-4 font-display text-2xl font-bold leading-snug sm:text-3xl">
                  {isAr ? post.titleAr : post.titleFr}
                </DialogTitle>
                <DialogDescription className="mt-3 text-base text-muted-foreground">
                  {isAr ? post.excerptAr : post.excerptFr}
                </DialogDescription>
                <div className="mt-6 space-y-4 leading-relaxed text-foreground/85">
                  {(isAr ? post.bodyAr : post.bodyFr).map((para) => (
                    <p key={para.slice(0, 24)}>{para}</p>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-secondary p-5">
                  <p className="text-sm font-medium">
                    {isAr ? "هل ترغب في حجز استشارة أو متابعة؟" : "Souhaitez-vous demander une consultation ?"}
                  </p>
                  <Button
                    variant="hero"
                    size="pill"
                    onClick={() => {
                      setPost(null);
                      openAppointment({ doctor: shortName });
                    }}
                  >
                    {isAr ? "حجز موعد" : "Prendre RDV"}
                  </Button>
                </div>
              </div>
            </article>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
