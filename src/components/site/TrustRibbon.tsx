import { Asterisk } from "lucide-react";

import { trustWordsAr, trustWordsFr } from "./data";
import { useLanguage } from "./LanguageContext";

function Row({ words, reverse = false, muted = false }: { words: readonly string[]; reverse?: boolean; muted?: boolean }) {
  const repeated = [...words, ...words];
  return (
    <div className={reverse ? "flex w-max animate-marquee-reverse" : "flex w-max animate-marquee"}>
      {[0, 1].map((copy) => (
        <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1 || muted}>
          {repeated.map((w, i) => (
            <li key={`${w}-${i}`} className="flex items-center gap-6 px-6">
              <span className="font-display text-xl font-bold uppercase tracking-wide sm:text-2xl">{w}</span>
              <Asterisk className="h-6 w-6 shrink-0" />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export function TrustRibbon() {
  const { isAr } = useLanguage();
  const words = isAr ? trustWordsAr : trustWordsFr;

  return (
    <div className="relative z-10 -mt-14 overflow-hidden py-10 sm:-mt-16" aria-label={isAr ? "مميزات العيادة" : "Points clés du cabinet"}>
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[2.2deg] bg-primary-soft py-4 text-primary-deep/50">
        <Row words={words} reverse muted />
      </div>
      <div className="relative -rotate-[1.6deg] bg-gradient-primary py-4 text-primary-foreground shadow-glow">
        <Row words={words} />
      </div>
    </div>
  );
}
