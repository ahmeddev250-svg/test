import { ArrowUpRight } from "lucide-react";

import { useAppointment } from "./AppointmentModal";
import { services, soloDoctorInfo } from "./data";
import { useLanguage } from "./LanguageContext";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function ServicesSection() {
  const { openAppointment } = useAppointment();
  const { isAr } = useLanguage();
  const shortName = isAr ? soloDoctorInfo.shortNameAr : soloDoctorInfo.shortNameFr;

  return (
    <section id="services" className="section-y">
      <div className="container-site">
        <SectionHeading
          eyebrow={isAr ? "الأمراض الجلدية، الليزر والطب التجميلي" : "Dermatologie, Lasers & Médecine Esthétique"}
          title={
            isAr ? (
              <>
                العلاجات بإشراف <span className="text-primary">{shortName}</span>
              </>
            ) : (
              <>
                Soins Assurés par <span className="text-primary">{shortName}</span>
              </>
            )
          }
          description={
            isAr
              ? "متابعة مباشرة مع نفس الطبيبة للاستشارات الجلدية، جلسات الليزر Fotona والعلاجات التجميلية (PRP، سكين بوستر، بوتوكس وفيلر الشفاه)."
              : "Un interlocuteur médical unique pour vos consultations dermatologiques, vos séances laser Fotona et vos actes esthétiques (PRP, Skinbooster, Botox, Filler des lèvres)."
          }
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const title = isAr ? s.titleAr : s.titleFr;
            const desc = isAr ? s.descAr : s.descFr;
            const tag = isAr ? s.tagAr : s.tagFr;
            return (
              <Reveal key={s.titleFr} delay={(i % 3) * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-3 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-card">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary">
                    <img
                      src={s.image}
                      alt={title}
                      loading="lazy"
                      width={900}
                      height={900}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="bg-fade-bottom absolute inset-0 opacity-60" aria-hidden="true" />
                    <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-primary-deep backdrop-blur">
                      {tag}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
                    <h3 className="font-display text-xl font-bold text-foreground">{title}</h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                    <button
                      type="button"
                      onClick={() => openAppointment({ department: s.department, doctor: shortName })}
                      className="mt-5 inline-flex cursor-pointer items-center justify-between gap-3 rounded-full bg-muted py-1.5 pl-5 pr-1.5 text-sm font-semibold text-primary-deep transition-colors duration-300 group-hover:bg-primary-soft"
                      aria-label={isAr ? `طلب موعد لـ ${title}` : `Demander un rendez-vous pour ${title}`}
                    >
                      {isAr ? "طلب هذا الموعد" : "Demander ce soin"}
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-background text-primary transition-all duration-500 group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
