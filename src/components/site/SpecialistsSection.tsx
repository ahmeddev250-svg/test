import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Clock, GraduationCap, MessageCircle, Sparkles, Stethoscope } from "lucide-react";
import { useState, type KeyboardEvent } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppointment } from "./AppointmentModal";
import { doctors, soloDoctorInfo } from "./data";
import { useLanguage } from "./LanguageContext";
import { SectionHeading } from "./SectionHeading";
import { Stars } from "./Stars";

const icons: Record<string, typeof Stethoscope> = {
  "dermatologie-clinique": Stethoscope,
  "medecine-esthetique": Sparkles,
};

export function SpecialistsSection() {
  const [active, setActive] = useState(0);
  const { openAppointment, openMessage } = useAppointment();
  const { isAr } = useLanguage();
  const doctor = doctors[active] ?? doctors[0]!;
  const shortName = isAr ? soloDoctorInfo.shortNameAr : soloDoctorInfo.shortNameFr;

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : -1) + doctors.length) % doctors.length;
    setActive(next);
    document.getElementById(`tab-${doctors[next]!.id}`)?.focus();
  };

  const docName = isAr ? doctor.nameAr : doctor.nameFr;
  const docTitle = isAr ? doctor.titleAr : doctor.titleFr;
  const docBio = isAr ? doctor.bioAr : doctor.bioFr;
  const docCategory = isAr ? doctor.categoryAr : doctor.categoryFr;
  const docExp = isAr ? doctor.experienceAr : doctor.experienceFr;
  const docPatients = isAr ? doctor.patientsAr : doctor.patientsFr;
  const docQuals = isAr ? doctor.qualificationsAr : doctor.qualificationsFr;
  const docAvail = isAr ? doctor.availabilityAr : doctor.availabilityFr;
  const docFee = isAr ? doctor.feeAr : doctor.feeFr;

  return (
    <section id="specialists" className="section-y bg-secondary">
      <div className="container-site">
        <SectionHeading
          eyebrow={isAr ? "متابعة مع طبيبة واحدة" : "Praticienne Unique"}
          title={
            isAr ? (
              <>
                طبيبتكم: <span className="text-primary">{shortName}</span>
              </>
            ) : (
              <>
                Votre Médecin : <span className="text-primary">{shortName}</span>
              </>
            )
          }
          description={
            isAr
              ? `تُجرى جميع الاستشارات الجلدية وجلسات الليزر والطب التجميلي مباشرة مع ${shortName} (${soloDoctorInfo.arabicLabel}).`
              : "Toutes les consultations dermatologiques, actes laser et soins de médecine esthétique sont assurés directement par Dr. Filali Baba Ghita (طبيبة الجلد)."
          }
        />

        <div
          role="tablist"
          aria-label={isAr ? "محاور التخصص" : "Axes de pratique du Dr. Filali Baba Ghita"}
          onKeyDown={onKey}
          className="mx-auto mt-12 flex max-w-2xl gap-2 overflow-x-auto rounded-full bg-background p-2 shadow-soft [scrollbar-width:none]"
        >
          {doctors.map((d, i) => {
            const Icon = icons[d.id] ?? Stethoscope;
            const selected = i === active;
            return (
              <button
                key={d.id}
                id={`tab-${d.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls="specialist-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  "relative flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-300 sm:flex-1 sm:justify-center",
                  selected ? "text-primary-foreground" : "text-muted-foreground hover:text-primary-deep",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-gradient-primary shadow-glow"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon className="relative h-4 w-4" />
                <span className="relative">{isAr ? d.categoryAr : d.categoryFr}</span>
              </button>
            );
          })}
        </div>

        <div id="specialist-panel" role="tabpanel" aria-labelledby={`tab-${doctor.id}`} className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid overflow-hidden rounded-[2rem] bg-background shadow-card md:grid-cols-[0.9fr_1.2fr]"
            >
              <div className="relative min-h-80 bg-secondary md:min-h-full">
                <img
                  src={doctor.image}
                  alt={isAr ? `صورة ${docName}` : `Portrait de ${docName}`}
                  loading="lazy"
                  width={900}
                  height={1350}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-background/90 px-4 py-3 backdrop-blur">
                  <div>
                    <p className="text-xs text-muted-foreground">{isAr ? "التقييم" : "Évaluation"}</p>
                    <p className="font-display text-xl font-bold">{docPatients}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{isAr ? "النظام" : "Organisation"}</p>
                    <p className="font-display text-xl font-bold text-primary">{docExp}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-10">
                <span className="inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary-deep">
                  {docCategory} · {soloDoctorInfo.arabicLabel}
                </span>
                <h3 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">{docName}</h3>
                <p className="mt-1 text-base font-medium text-muted-foreground">{docTitle}</p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Stars count={doctor.rating} />
                  <span className="text-sm font-semibold text-foreground">{soloDoctorInfo.ratingDisplay}</span>
                  <span className="text-sm text-muted-foreground">
                    ({doctor.reviews} {isAr ? "تقييم" : "avis"})
                  </span>
                </div>

                <p className="mt-6 leading-relaxed text-muted-foreground">{docBio}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {docQuals.map((q) => (
                    <span
                      key={q}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground"
                    >
                      <GraduationCap className="h-3.5 w-3.5 text-primary" /> {q}
                    </span>
                  ))}
                </div>

                <div className="mt-7 grid gap-3 rounded-2xl bg-muted p-4 sm:grid-cols-3">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">{isAr ? "المواعيد" : "Disponibilité"}</p>
                      <p className="text-sm font-semibold">{docAvail.days}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">{isAr ? "المدة" : "Horaires"}</p>
                      <p className="text-sm font-semibold">{docAvail.hours}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Stethoscope className="h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">{isAr ? "العيادة" : "Cabinet"}</p>
                      <p className="text-sm font-semibold">{docFee}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    variant="hero"
                    size="xl"
                    onClick={() => openAppointment({ department: doctor.department, doctor: shortName })}
                  >
                    <CalendarDays /> {isAr ? "حجز موعد" : "Prendre RDV"}
                  </Button>
                  <Button variant="outline-primary" size="xl" onClick={() => openMessage(shortName)}>
                    <MessageCircle /> {isAr ? "إرسال رسالة" : "Envoyer un Message"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
