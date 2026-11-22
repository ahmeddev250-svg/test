import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus, ChevronDown, Globe, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppointment } from "./AppointmentModal";
import { navLinks, soloDoctorInfo } from "./data";
import { useLanguage } from "./LanguageContext";
import { Logo } from "./Logo";

export function Navbar() {
  const { openAppointment } = useAppointment();
  const { isAr, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const close = () => setMobileOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5">
      <nav
        aria-label={isAr ? "التنقل الرئيسي" : "Main"}
        className={cn(
          "container-site flex h-16 items-center justify-between rounded-2xl transition-all duration-500 lg:h-[4.5rem]",
          scrolled ? "bg-background/90 shadow-card backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const label = isAr ? link.labelAr : link.labelFr;
            return (
              <li key={link.labelFr} className="group relative">
                <a
                  href={link.href}
                  className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-[0.95rem] font-medium text-foreground/80 transition-colors hover:bg-primary-soft hover:text-primary-deep"
                >
                  {label}
                  {"children" in link && (
                    <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                  )}
                </a>
                {"children" in link && (
                  <div className="invisible absolute left-1/2 top-full z-10 -translate-x-1/2 pt-3 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="w-60 rounded-2xl border border-border bg-popover p-2 shadow-elevated">
                      {link.children.map((child) => (
                        <li key={child.labelFr}>
                          <a
                            href={child.href}
                            className="block rounded-xl px-4 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-secondary hover:text-primary-deep"
                          >
                            {isAr ? child.labelAr : child.labelFr}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={isAr ? "Passer en français" : "التبديل إلى العربية"}
            className="inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-full border border-border bg-background/90 px-3.5 text-xs font-bold text-foreground shadow-soft transition hover:border-primary hover:bg-primary-soft"
          >
            <Globe className="h-3.5 w-3.5 text-primary" />
            <span>{isAr ? "FR" : "العربية"}</span>
          </button>

          <Button
            variant="hero"
            size="pill"
            className="hidden sm:inline-flex"
            onClick={() => openAppointment({ doctor: isAr ? soloDoctorInfo.shortNameAr : soloDoctorInfo.shortNameFr })}
          >
            <CalendarPlus /> {isAr ? "حجز موعد" : "Prendre RDV"}
          </Button>
          <Button
            variant="light"
            size="icon-pill"
            className="lg:hidden"
            aria-label={mobileOpen ? (isAr ? "إغلاق القائمة" : "Close menu") : (isAr ? "فتح القائمة" : "Open menu")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="container-site mt-2 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-border bg-background p-4 shadow-elevated lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => {
                const label = isAr ? link.labelAr : link.labelFr;
                return (
                  <li key={link.labelFr} className="border-b border-border last:border-none">
                    {"children" in link ? (
                      <>
                        <button
                          type="button"
                          className="flex w-full cursor-pointer items-center justify-between py-3.5 text-base font-medium"
                          aria-expanded={expanded === link.labelFr}
                          onClick={() => setExpanded((e) => (e === link.labelFr ? null : link.labelFr))}
                        >
                          {label}
                          <ChevronDown
                            className={cn("h-4 w-4 transition-transform", expanded === link.labelFr && "rotate-180")}
                          />
                        </button>
                        {expanded === link.labelFr && (
                          <ul className="mb-3 grid gap-1 rounded-xl bg-muted p-2">
                            {link.children.map((child) => (
                              <li key={child.labelFr}>
                                <a
                                  href={child.href}
                                  onClick={close}
                                  className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-background hover:text-primary-deep"
                                >
                                  {isAr ? child.labelAr : child.labelFr}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <a href={link.href} onClick={close} className="block py-3.5 text-base font-medium">
                        {label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
            <Button
              variant="hero"
              size="xl"
              className="mt-4 w-full"
              onClick={() => {
                close();
                openAppointment({ doctor: isAr ? soloDoctorInfo.shortNameAr : soloDoctorInfo.shortNameFr });
              }}
            >
              <CalendarPlus /> {isAr ? "حجز موعد" : "Prendre RDV"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
