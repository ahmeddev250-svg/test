import { ArrowRight, PhoneCall, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAppointment } from "./AppointmentModal";
import { contactInfo, soloDoctorInfo } from "./data";
import { useLanguage } from "./LanguageContext";
import { Reveal } from "./Reveal";

export function AppointmentSection() {
  const { openAppointment } = useAppointment();
  const { isAr } = useLanguage();

  const shortName = isAr ? soloDoctorInfo.shortNameAr : soloDoctorInfo.shortNameFr;
  const cabinetName = isAr ? soloDoctorInfo.cabinetNameAr : soloDoctorInfo.cabinetNameFr;
  const address = isAr ? soloDoctorInfo.addressAr : soloDoctorInfo.addressFr;
  const hoursStatus = isAr ? soloDoctorInfo.hoursStatusAr : soloDoctorInfo.hoursStatusFr;
  const hours = isAr ? contactInfo.hoursAr : contactInfo.hoursFr;

  return (
    <section id="appointment" className="section-y">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-elevated">
            <img src={soloDoctorInfo.ctaImage} alt="" loading="lazy" width={1100} height={733} className="absolute inset-0 h-full w-full object-cover" />
            <div className="bg-gradient-cta absolute inset-0" aria-hidden="true" />
            <div className="bg-pattern-cross absolute inset-0 opacity-50" aria-hidden="true" />

            <div className="relative grid gap-10 px-6 py-14 sm:px-12 sm:py-20 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:px-16">
              <div className="text-primary-foreground">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-1.5 text-sm font-medium backdrop-blur">
                  <ShieldCheck className="h-4 w-4" /> {hoursStatus}
                </span>
                <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  {isAr ? (
                    <>استشارة مباشرة مع {shortName}.</>
                  ) : (
                    <>Consultation Directe avec {shortName}.</>
                  )}
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
                  {cabinetName} ({soloDoctorInfo.arabicLabel}) — {address}.
                </p>
                <div className="mt-9 flex flex-wrap gap-4">
                  <Button
                    variant="warm"
                    size="xl"
                    onClick={() => openAppointment({ doctor: shortName })}
                  >
                    {isAr ? "حجز موعد" : "Prendre RDV"} <ArrowRight />
                  </Button>
                  <Button variant="ghost-light" size="xl" asChild>
                    <a href="#contact">{isAr ? "العنوان والهاتف" : "Adresse & Téléphone"}</a>
                  </Button>
                </div>
              </div>

              <div className="justify-self-start rounded-3xl bg-background/95 p-6 shadow-elevated backdrop-blur lg:justify-self-end">
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-warm-soft text-warm">
                    <PhoneCall className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground">{isAr ? "هاتف العيادة" : "Téléphone du cabinet"}</p>
                    <a href={`tel:${soloDoctorInfo.phoneHref}`} className="font-display text-2xl font-bold text-foreground hover:text-primary">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
                <div className="mt-5 border-t border-border pt-5 text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">{isAr ? "أوقات العمل والموقع" : "Horaires & Localisation"}</p>
                  <p className="mt-1">{hours}</p>
                  <p className="mt-0.5">{address} · {soloDoctorInfo.plusCode}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
