import { CalendarCheck2, CheckCircle2, Clock, MessageSquareText, Stethoscope } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useState, type FormEvent, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DEPARTMENTS,
  DEPARTMENT_LABELS,
  TIME_SLOTS,
  collectErrors,
  makeAppointmentSchema,
  makeMessageSchema,
  todayISO,
  type FieldErrors,
} from "@/lib/appointment";
import { cn } from "@/lib/utils";
import { soloDoctorInfo } from "./data";
import { useLanguage } from "./LanguageContext";

type Mode = "appointment" | "message";

interface OpenOptions {
  mode?: Mode;
  department?: string;
  doctor?: string;
}

interface AppointmentContextValue {
  openAppointment: (opts?: Omit<OpenOptions, "mode">) => void;
  openMessage: (doctor?: string) => void;
}

const AppointmentContext = createContext<AppointmentContextValue | null>(null);

export function useAppointment() {
  const ctx = useContext(AppointmentContext);
  if (!ctx) throw new Error("useAppointment must be used inside AppointmentProvider");
  return ctx;
}

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const { isAr } = useLanguage();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<OpenOptions>({ mode: "appointment" });
  const [session, setSession] = useState(0);

  const defaultDoctor = isAr ? soloDoctorInfo.shortNameAr : soloDoctorInfo.shortNameFr;

  const openAppointment = useCallback(
    (opts: Omit<OpenOptions, "mode"> = {}) => {
      setOptions({ ...opts, doctor: opts.doctor ?? defaultDoctor, mode: "appointment" });
      setSession((s) => s + 1);
      setOpen(true);
    },
    [defaultDoctor],
  );

  const openMessage = useCallback(
    (doctor?: string) => {
      setOptions({ mode: "message", doctor: doctor ?? defaultDoctor });
      setSession((s) => s + 1);
      setOpen(true);
    },
    [defaultDoctor],
  );

  const value = useMemo(() => ({ openAppointment, openMessage }), [openAppointment, openMessage]);

  return (
    <AppointmentContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92vh] max-w-xl overflow-y-auto rounded-3xl border-none p-0 shadow-elevated">
          <div dir={isAr ? "rtl" : "ltr"}>
            {options.mode === "message" ? (
              <MessageForm key={session} doctor={options.doctor} onDone={() => setOpen(false)} />
            ) : (
              <AppointmentForm
                key={session}
                department={options.department}
                doctor={options.doctor}
                onDone={() => setOpen(false)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </AppointmentContext.Provider>
  );
}

const selectClass =
  "flex h-11 w-full cursor-pointer appearance-none rounded-xl border border-input bg-background px-3.5 text-sm text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const inputClass = "h-11 rounded-xl px-3.5 focus-visible:ring-2";

function FieldError({ id, message }: { id: string; message?: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-xs font-medium text-destructive">
      {message}
    </p>
  );
}

function ModalHeader({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="bg-hero rounded-t-3xl px-6 pb-6 pt-7 sm:px-8">
      <DialogHeader className="text-start">
        <span className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
          {icon}
        </span>
        <DialogTitle className="font-display text-2xl font-bold">{title}</DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">{description}</DialogDescription>
      </DialogHeader>
    </div>
  );
}

function Confirmation({
  title,
  lines,
  doneLabel,
  onDone,
}: {
  title: string;
  lines: string[];
  doneLabel: string;
  onDone: () => void;
}) {
  return (
    <div className="px-6 py-10 text-center sm:px-10">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary-soft text-primary">
        <CheckCircle2 className="h-8 w-8" />
      </span>
      <DialogTitle className="mt-5 font-display text-2xl font-bold">{title}</DialogTitle>
      <DialogDescription className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
        {lines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </DialogDescription>
      <Button variant="hero" size="pill" className="mt-6" onClick={onDone}>
        {doneLabel}
      </Button>
    </div>
  );
}

function AppointmentForm({
  department,
  doctor,
  onDone,
}: {
  department?: string | undefined;
  doctor?: string | undefined;
  onDone: () => void;
}) {
  const { isAr, lang } = useLanguage();
  const shortName = isAr ? soloDoctorInfo.shortNameAr : soloDoctorInfo.shortNameFr;
  const address = isAr ? soloDoctorInfo.addressAr : soloDoctorInfo.addressFr;
  const hoursStatus = isAr ? soloDoctorInfo.hoursStatusAr : soloDoctorInfo.hoursStatusFr;

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    department: department ?? "",
    doctor: doctor ?? shortName,
    date: "",
    time: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ ref: string } | null>(null);

  const set = (key: keyof typeof values) => (e: { target: { value: string } }) => {
    const v = e.target.value;
    setValues((prev) => ({ ...prev, [key]: v }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = makeAppointmentSchema(new Date(), lang).safeParse(values);
    if (!result.success) {
      setErrors(collectErrors(result.error));
      return;
    }
    setSubmitting(true);
    const ref = `FIL-${Math.floor(100000 + Math.random() * 900000)}`;
    const deptLabel =
      DEPARTMENT_LABELS[values.department as (typeof DEPARTMENTS)[number]]?.[lang] ?? values.department;
    const msgLines = [
      `Demande de RDV (${soloDoctorInfo.shortNameFr}) : ${values.name.trim()} - ${values.phone.trim()} - ${values.date} (${values.time})`,
      `Motif : ${deptLabel}`,
      ...(values.notes.trim() ? [`Précisions : ${values.notes.trim()}`] : []),
      `Réf : ${ref}`,
    ];
    const waUrl = `https://wa.me/${soloDoctorInfo.whatsappNumber}?text=${encodeURIComponent(msgLines.join("\n"))}`;
    window.setTimeout(() => {
      setSubmitting(false);
      setDone({ ref });
      if (typeof window !== "undefined") {
        window.open(waUrl, "_blank", "noopener,noreferrer");
      }
    }, 400);
  };

  if (done) {
    const deptLabel =
      DEPARTMENT_LABELS[values.department as (typeof DEPARTMENTS)[number]]?.[lang] ?? values.department;
    const date = new Date(`${values.date}T00:00:00`).toLocaleDateString(isAr ? "ar-MA" : "fr-FR", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    return (
      <Confirmation
        title={isAr ? "تم تسجيل طلب الموعد" : "Demande enregistrée"}
        doneLabel={isAr ? "إغلاق" : "Fermer"}
        lines={[
          isAr
            ? `${values.name.trim()}، تم تسجيل طلب موعدكم مع ${shortName} (${deptLabel}) ليوم ${date} على الساعة ${values.time}.`
            : `${values.name.trim()}, votre demande avec ${shortName} (${deptLabel}) est notée pour le ${date} à ${values.time}.`,
          `WhatsApp : 0634193387 · ${isAr ? "المرجع" : "Réf"} : ${done.ref}`,
        ]}
        onDone={onDone}
      />
    );
  }

  const err = (k: string) => (errors[k] ? { "aria-invalid": true, "aria-describedby": `${k}-error` } : {});

  return (
    <>
      <ModalHeader
        icon={<CalendarCheck2 className="h-5 w-5" />}
        title={isAr ? `حجز موعد — ${shortName}` : `Prendre RDV — ${shortName}`}
        description={`${address} · WhatsApp : 0634193387`}
      />
      <form onSubmit={onSubmit} noValidate className="grid gap-4 px-6 pb-7 pt-5 sm:grid-cols-2 sm:px-8">
        <div className="sm:col-span-2">
          <Label htmlFor="name">{isAr ? "الاسم الكامل" : "Nom complet"}</Label>
          <Input
            id="name"
            className={cn(inputClass, "mt-1.5")}
            value={values.name}
            onChange={set("name")}
            placeholder={isAr ? "الاسم والنسب" : "Nom et prénom"}
            autoComplete="name"
            {...err("name")}
          />
          <FieldError id="name-error" message={errors["name"]} />
        </div>
        <div>
          <Label htmlFor="email">{isAr ? "البريد الإلكتروني" : "E-mail"}</Label>
          <Input
            id="email"
            type="email"
            className={cn(inputClass, "mt-1.5")}
            value={values.email}
            onChange={set("email")}
            placeholder="nom@exemple.ma"
            autoComplete="email"
            {...err("email")}
          />
          <FieldError id="email-error" message={errors["email"]} />
        </div>
        <div>
          <Label htmlFor="phone">{isAr ? "رقم الهاتف" : "Téléphone"}</Label>
          <Input
            id="phone"
            type="tel"
            className={cn(inputClass, "mt-1.5")}
            value={values.phone}
            onChange={set("phone")}
            placeholder="06 XX XX XX XX"
            autoComplete="tel"
            {...err("phone")}
          />
          <FieldError id="phone-error" message={errors["phone"]} />
        </div>
        <div>
          <Label htmlFor="department">{isAr ? "سبب الاستشارة أو العناية" : "Motif de consultation / soin"}</Label>
          <select
            id="department"
            className={cn(selectClass, "mt-1.5")}
            value={values.department}
            onChange={set("department")}
            {...err("department")}
          >
            <option value="">{isAr ? "اختر السبب" : "Choisir un motif"}</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {DEPARTMENT_LABELS[d][lang]}
              </option>
            ))}
          </select>
          <FieldError id="department-error" message={errors["department"]} />
        </div>
        <div>
          <Label htmlFor="doctor">{isAr ? "الطبيبة" : "Praticienne"}</Label>
          <Input id="doctor" readOnly className={cn(inputClass, "mt-1.5 bg-muted")} value={shortName} />
        </div>
        <div>
          <Label htmlFor="date">{isAr ? "التاريخ المقترح" : "Date souhaitée"}</Label>
          <Input
            id="date"
            type="date"
            min={todayISO()}
            className={cn(inputClass, "mt-1.5")}
            value={values.date}
            onChange={set("date")}
            {...err("date")}
          />
          <FieldError id="date-error" message={errors["date"]} />
        </div>
        <div>
          <Label htmlFor="time">{isAr ? "التوقيت المقترح (30 دقيقة)" : "Créneau souhaité (30 min)"}</Label>
          <select id="time" className={cn(selectClass, "mt-1.5")} value={values.time} onChange={set("time")} {...err("time")}>
            <option value="">{isAr ? "اختر الساعة" : "Choisir une heure"}</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <FieldError id="time-error" message={errors["time"]} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="notes">{isAr ? "ملاحظات إضافية (اختياري)" : "Précisions (optionnel)"}</Label>
          <Textarea
            id="notes"
            className="mt-1.5 min-h-20 rounded-xl px-3.5"
            value={values.notes}
            onChange={set("notes")}
            placeholder={
              isAr
                ? "وضّح طلبك (استشارة جلدية، PRP، سكين بوستر، بوتوكس، ليزر، فيلر...)"
                : "Précisez votre demande (consultation, PRP, Skinbooster, Botox, Laser, Filler...)"
            }
            {...err("notes")}
          />
          <FieldError id="notes-error" message={errors["notes"]} />
        </div>
        <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" /> {hoursStatus}
          </p>
          <Button type="submit" variant="hero" size="pill" disabled={submitting}>
            {submitting ? (isAr ? "جارٍ الإرسال…" : "Envoi…") : isAr ? "تأكيد الطلب (واتساب)" : "Confirmer sur WhatsApp"}
          </Button>
        </div>
      </form>
    </>
  );
}

function MessageForm({ doctor, onDone }: { doctor?: string | undefined; onDone: () => void }) {
  const { isAr, lang } = useLanguage();
  const shortName = doctor ?? (isAr ? soloDoctorInfo.shortNameAr : soloDoctorInfo.shortNameFr);
  const address = isAr ? soloDoctorInfo.addressAr : soloDoctorInfo.addressFr;

  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const set = (key: keyof typeof values) => (e: { target: { value: string } }) => {
    setValues((p) => ({ ...p, [key]: e.target.value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: "" }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = makeMessageSchema(lang).safeParse(values);
    if (!result.success) {
      setErrors(collectErrors(result.error));
      return;
    }
    setSending(true);
    const waUrl = `https://wa.me/${soloDoctorInfo.whatsappNumber}?text=${encodeURIComponent(
      `Message de ${values.name.trim()} (${values.email.trim()}) : ${values.message.trim()}`,
    )}`;
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
      if (typeof window !== "undefined") {
        window.open(waUrl, "_blank", "noopener,noreferrer");
      }
    }, 400);
  };

  if (sent) {
    return (
      <Confirmation
        title={isAr ? "تم تسجيل الرسالة" : "Message préparé"}
        doneLabel={isAr ? "إغلاق" : "Fermer"}
        lines={[
          isAr ? `تم تسجيل رسالتكم الموجهة إلى ${shortName}.` : `Votre message à l'attention de ${shortName} a bien été noté.`,
        ]}
        onDone={onDone}
      />
    );
  }

  const err = (k: string) => (errors[k] ? { "aria-invalid": true, "aria-describedby": `m-${k}-error` } : {});

  return (
    <>
      <ModalHeader
        icon={doctor ? <Stethoscope className="h-5 w-5" /> : <MessageSquareText className="h-5 w-5" />}
        title={isAr ? `رسالة إلى ${shortName}` : `Message — ${shortName}`}
        description={`${address} · WhatsApp : 0634193387`}
      />
      <form onSubmit={onSubmit} noValidate className="grid gap-4 px-6 pb-7 pt-5 sm:px-8">
        <div>
          <Label htmlFor="m-name">{isAr ? "الاسم الكامل" : "Nom complet"}</Label>
          <Input id="m-name" className={cn(inputClass, "mt-1.5")} value={values.name} onChange={set("name")} autoComplete="name" {...err("name")} />
          <FieldError id="m-name-error" message={errors["name"]} />
        </div>
        <div>
          <Label htmlFor="m-email">{isAr ? "البريد الإلكتروني" : "E-mail"}</Label>
          <Input id="m-email" type="email" className={cn(inputClass, "mt-1.5")} value={values.email} onChange={set("email")} autoComplete="email" {...err("email")} />
          <FieldError id="m-email-error" message={errors["email"]} />
        </div>
        <div>
          <Label htmlFor="m-message">{isAr ? "الرسالة" : "Message"}</Label>
          <Textarea
            id="m-message"
            className="mt-1.5 min-h-28 rounded-xl px-3.5"
            value={values.message}
            onChange={set("message")}
            placeholder={isAr ? "اكتب سؤالك للعيادة..." : "Votre question pour le cabinet..."}
            {...err("message")}
          />
          <FieldError id="m-message-error" message={errors["message"]} />
        </div>
        <Button type="submit" variant="hero" size="pill" className="justify-self-end" disabled={sending}>
          {sending ? (isAr ? "جارٍ الإرسال…" : "Envoi…") : isAr ? "إرسال" : "Envoyer"}
        </Button>
      </form>
    </>
  );
}
