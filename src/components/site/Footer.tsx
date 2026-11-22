import { ArrowUp, MapPin, Phone, Star } from "lucide-react";

import { contactInfo, services, soloDoctorInfo } from "./data";
import { useLanguage } from "./LanguageContext";
import { Logo } from "./Logo";

export function Footer() {
  const { isAr } = useLanguage();

  const fullTitle = isAr ? soloDoctorInfo.fullTitleAr : soloDoctorInfo.fullTitleFr;
  const shortName = isAr ? soloDoctorInfo.shortNameAr : soloDoctorInfo.shortNameFr;
  const address = isAr ? soloDoctorInfo.addressAr : soloDoctorInfo.addressFr;
  const hours = isAr ? contactInfo.hoursAr : contactInfo.hoursFr;

  const quickLinks = [
    { label: isAr ? "الرئيسية" : "Accueil", href: "#home" },
    { label: isAr ? "العيادة" : "Le Cabinet", href: "#about" },
    { label: isAr ? "العلاجات والليزر" : "Soins & Lasers", href: "#services" },
    { label: isAr ? "الطبيبة" : "Praticienne", href: "#specialists" },
    { label: isAr ? "الآراء (172)" : "Avis (172)", href: "#testimonials" },
    { label: isAr ? "قبل / بعد" : "Avant / Après", href: "#blog" },
  ];

  return (
    <footer id="contact" className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="container-site">
        <div className="grid gap-6 border-b border-ink-line py-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">{fullTitle}</h2>
            <p className="mt-2 text-ink-muted">
              {address} · Plus Code : {soloDoctorInfo.plusCode}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-foreground/10 px-4 py-2 text-sm font-semibold text-ink-foreground ring-1 ring-ink-line">
              <Star className="h-4 w-4 fill-star text-star" /> {soloDoctorInfo.ratingDisplay} ({soloDoctorInfo.reviewCount}{" "}
              {isAr ? "تقييم" : "avis"})
            </span>
            <a
              href={`tel:${soloDoctorInfo.phoneHref}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              <Phone className="h-4 w-4" /> {soloDoctorInfo.phone}
            </a>
          </div>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
              {isAr
                ? `عيادة فردية للأمراض الجلدية والليزر والطب التجميلي بإشراف ${shortName} (${soloDoctorInfo.arabicLabel}) في الرباط.`
                : `Cabinet individuel de dermatologie, lasers et médecine esthétique animé par ${shortName} (${soloDoctorInfo.arabicLabel}) à Rabat.`}
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold">{isAr ? "تصفح سريع" : "Navigation"}</h3>
            <ul className="mt-5 grid gap-3 text-sm text-ink-muted">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-primary-glow">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold">{isAr ? "العلاجات والليزر" : "Soins & Lasers"}</h3>
            <ul className="mt-5 grid gap-3 text-sm text-ink-muted">
              {services.map((s) => (
                <li key={s.titleFr}>
                  <a href="#services" className="transition-colors hover:text-primary-glow">
                    {isAr ? s.tagAr : s.tagFr}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold">{isAr ? "التواصل والموقع" : "Contact & Accès"}</h3>
            <ul className="mt-5 grid gap-4 text-sm text-ink-muted">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-glow" />
                <span>{address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-glow" />
                <a href={`tel:${soloDoctorInfo.phoneHref}`} className="hover:text-primary-glow">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="rounded-xl bg-ink-foreground/5 p-3 ring-1 ring-ink-line">
                <p className="font-semibold text-ink-foreground">{isAr ? "أوقات العمل" : "Horaires"}</p>
                <p className="mt-0.5">{hours}</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-ink-line py-6 text-sm text-ink-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {fullTitle}.</p>
          <a href="#home" className="inline-flex items-center gap-2 transition-colors hover:text-primary-glow">
            {isAr ? "العودة للأعلى" : "Haut de page"} <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
