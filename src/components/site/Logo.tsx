import drGhitaLogo from "@/assets/dr-ghita-logo.png";
import { cn } from "@/lib/utils";
import { soloDoctorInfo } from "./data";
import { useLanguage } from "./LanguageContext";

export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  const { isAr } = useLanguage();
  const title = isAr ? soloDoctorInfo.fullTitleAr : soloDoctorInfo.fullTitleFr;
  const shortName = isAr ? soloDoctorInfo.shortNameAr : soloDoctorInfo.shortNameFr;
  const subLabel = isAr
    ? `الأمراض الجلدية والطب التجميلي · ${soloDoctorInfo.arabicLabel}`
    : `Dermatologie & Esthétique · ${soloDoctorInfo.arabicLabel}`;

  return (
    <a href="#home" className={cn("group inline-flex items-center gap-2.5", className)} aria-label={title}>
      <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-background p-1 shadow-soft ring-1 ring-border">
        <img
          src={drGhitaLogo}
          alt="Logo Dr. Ghita Filali Baba — Dermatologue · Lasers · Médecine Esthétique"
          className="h-full w-full object-contain"
        />
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-display text-base font-extrabold tracking-tight sm:text-lg",
            light ? "text-ink-foreground" : "text-foreground",
          )}
        >
          {shortName}
        </span>
        <span className={cn("text-[11px] font-medium", light ? "text-ink-muted" : "text-muted-foreground")}>
          {subLabel}
        </span>
      </span>
    </a>
  );
}
