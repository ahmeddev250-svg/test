import { z } from "zod";
import type { Lang } from "@/components/site/LanguageContext";

export const DEPARTMENTS = [
  "Dermatologie Clinique",
  "Médecine Esthétique (PRP · Skinbooster · Botox)",
  "Lasers Fotona & Hydra Beauty",
  "Filler des Lèvres",
  "Suivi Dermatologique",
] as const;

export const DEPARTMENT_LABELS: Record<(typeof DEPARTMENTS)[number], { fr: string; ar: string }> = {
  "Dermatologie Clinique": {
    fr: "Dermatologie Clinique",
    ar: "الأمراض الجلدية السريرية",
  },
  "Médecine Esthétique (PRP · Skinbooster · Botox)": {
    fr: "Médecine Esthétique (PRP · Skinbooster · Botox)",
    ar: "الطب التجميلي (PRP · سكين بوستر · بوتوكس)",
  },
  "Lasers Fotona & Hydra Beauty": {
    fr: "Lasers Fotona & Hydra Beauty",
    ar: "ليزر فوتونا وهيدرا بيوتي (Fotona & Hydra Beauty)",
  },
  "Filler des Lèvres": {
    fr: "Filler des Lèvres",
    ar: "فيلر الشفاه (Filler)",
  },
  "Suivi Dermatologique": {
    fr: "Suivi Dermatologique",
    ar: "متابعة وعلاج الجلد",
  },
};

export const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
] as const;

export function todayISO(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function makeEmailSchema(lang: Lang = "fr") {
  const isAr = lang === "ar";
  return z
    .string()
    .trim()
    .min(1, isAr ? "يرجى إدخال البريد الإلكتروني" : "Veuillez saisir votre adresse e-mail")
    .email(isAr ? "يرجى إدخال بريد إلكتروني صحيح" : "Veuillez saisir une adresse e-mail valide")
    .max(255, isAr ? "البريد الإلكتروني طويل جداً" : "L'adresse e-mail est trop longue");
}

export const emailSchema = makeEmailSchema("fr");

export function makeAppointmentSchema(now: Date = new Date(), lang: Lang = "fr") {
  const isAr = lang === "ar";
  const today = todayISO(now);
  return z.object({
    name: z
      .string()
      .trim()
      .min(2, isAr ? "يرجى إدخال الاسم الكامل" : "Veuillez saisir votre nom complet")
      .max(80, isAr ? "يجب ألا يتجاوز الاسم 80 حرفاً" : "Le nom doit contenir moins de 80 caractères"),
    email: makeEmailSchema(lang),
    phone: z
      .string()
      .trim()
      .refine((v) => {
        const digits = v.replace(/\D/g, "");
        return digits.length >= 7 && digits.length <= 15 && /^[+\d\s().-]+$/.test(v);
      }, isAr ? "يرجى إدخال رقم هاتف صحيح" : "Veuillez saisir un numéro de téléphone valide"),
    department: z.enum(DEPARTMENTS, {
      errorMap: () => ({
        message: isAr ? "يرجى اختيار سبب الاستشارة أو العناية" : "Veuillez choisir un motif de consultation",
      }),
    }),
    doctor: z.string().optional(),
    date: z
      .string()
      .min(1, isAr ? "يرجى اختيار التاريخ" : "Veuillez choisir une date")
      .refine((v) => /^\d{4}-\d{2}-\d{2}$/.test(v), isAr ? "يرجى اختيار تاريخ صحيح" : "Veuillez choisir une date valide")
      .refine((v) => v >= today, isAr ? "يرجى اختيار اليوم أو تاريخ قادم" : "Veuillez choisir aujourd'hui ou une date future"),
    time: z.enum(TIME_SLOTS, {
      errorMap: () => ({
        message: isAr ? "يرجى اختيار توقيت (30 دقيقة)" : "Veuillez choisir un créneau de 30 min",
      }),
    }),
    notes: z
      .string()
      .trim()
      .max(500, isAr ? "يجب ألا تتجاوز الملاحظات 500 حرف" : "Les précisions doivent contenir moins de 500 caractères")
      .optional(),
  });
}

export type AppointmentInput = z.infer<ReturnType<typeof makeAppointmentSchema>>;

export function makeMessageSchema(lang: Lang = "fr") {
  const isAr = lang === "ar";
  return z.object({
    name: z.string().trim().min(2, isAr ? "يرجى إدخال الاسم الكامل" : "Veuillez saisir votre nom complet").max(80),
    email: makeEmailSchema(lang),
    message: z
      .string()
      .trim()
      .min(10, isAr ? "يرجى كتابة 10 أحرف على الأقل" : "Veuillez écrire au moins 10 caractères")
      .max(1000, isAr ? "يجب ألا يتجاوز الرسالة 1000 حرف" : "Le message doit contenir moins de 1000 caractères"),
  });
}

export const messageSchema = makeMessageSchema("fr");

export type FieldErrors = Record<string, string>;

export function collectErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
