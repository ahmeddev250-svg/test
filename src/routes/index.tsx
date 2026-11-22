import { createFileRoute } from "@tanstack/react-router";

import { AboutSection } from "@/components/site/AboutSection";
import { AppointmentProvider } from "@/components/site/AppointmentModal";
import { AppointmentSection } from "@/components/site/AppointmentSection";
import { BlogSection } from "@/components/site/BlogSection";
import { Footer } from "@/components/site/Footer";
import { HeroSection } from "@/components/site/HeroSection";
import { LanguageProvider } from "@/components/site/LanguageContext";
import { Navbar } from "@/components/site/Navbar";
import { ServicesSection } from "@/components/site/ServicesSection";
import { SpecialistsSection } from "@/components/site/SpecialistsSection";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { TrustRibbon } from "@/components/site/TrustRibbon";
import { WhyChooseUsSection } from "@/components/site/WhyChooseUsSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. FILALI BABA GHITA - Cabinet de Dermatologie et Médecine Esthétique طبيبة الجلد" },
      {
        name: "description",
        content:
          "Cabinet de Dermatologie et Médecine Esthétique du Dr. Filali Baba Ghita (طبيبة الجلد) à Rabat : ETG 1 , Appt 1, 1073 Av. Al Massira, Rabat 10150 · 05 37 79 77 57 · 5,0 ★ (172 avis).",
      },
      {
        property: "og:title",
        content: "Dr. FILALI BABA GHITA - Cabinet de Dermatologie et Médecine Esthétique طبيبة الجلد",
      },
      {
        property: "og:description",
        content: "Dermatologie clinique, lasers Fotona et médecine esthétique (PRP, Skinbooster, Botox) à Rabat avec Dr. Filali Baba Ghita.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LanguageProvider>
      <AppointmentProvider>
        <Navbar />
        <main>
          <HeroSection />
          <TrustRibbon />
          <ServicesSection />
          <AboutSection />
          <SpecialistsSection />
          <WhyChooseUsSection />
          <TestimonialsSection />
          <AppointmentSection />
          <BlogSection />
        </main>
        <Footer />
      </AppointmentProvider>
    </LanguageProvider>
  );
}
