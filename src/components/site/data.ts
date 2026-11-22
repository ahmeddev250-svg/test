import drGhitaPortrait from "@/assets/dr-ghita-portrait.png";
import drGhitaLogo from "@/assets/dr-ghita-logo.png";
import cabinetAccueil from "@/assets/cabinet-accueil.png";
import cabinetAttente from "@/assets/cabinet-attente.png";
import cabinetExamen from "@/assets/cabinet-examen.png";
import cabinetEsthetique from "@/assets/cabinet-esthetique.png";
import laserFotonaCryo from "@/assets/laser-fotona-cryo.png";
import soinsSmartluxHydra from "@/assets/soins-smartlux-hydra.png";
import avantApresLevres from "@/assets/avant-apres-levres.png";
import avantApresDos from "@/assets/avant-apres-dos.png";
import avantApresLesionVisage from "@/assets/avant-apres-lesion-visage.png";
import avantApresAbdomen from "@/assets/avant-apres-abdomen.png";
import type { DEPARTMENTS } from "@/lib/appointment";

type Department = (typeof DEPARTMENTS)[number];

export const soloDoctorInfo = {
  fullTitleFr: "Dr. FILALI BABA GHITA - Cabinet de Dermatologie et Médecine Esthétique طبيبة الجلد",
  fullTitleAr: "د. فيلالي بابا غيتة — عيادة الأمراض الجلدية والطب التجميلي · طبيبة الجلد",
  shortNameFr: "Dr. FILALI BABA GHITA",
  shortNameAr: "د. فيلالي بابا غيتة",
  arabicLabel: "طبيبة الجلد",
  cabinetNameFr: "Cabinet de Dermatologie et Médecine Esthétique",
  cabinetNameAr: "عيادة الأمراض الجلدية والطب التجميلي",
  roleLabelFr: "Dermatologue — Praticienne Unique",
  roleLabelAr: "طبيبة أمراض الجلد والطب التجميلي — متابعة شخصية مباشرة",
  addressFr: "ETG 1 , Appt 1, 1073 Av. Al Massira, Rabat 10150",
  addressAr: "الطابق 1، شقة 1، 1073 شارع المسيرة، الرباط 10150",
  plusCode: "X4F5+98 Rabat",
  phone: "05 37 79 77 57",
  phoneHref: "+212537797757",
  whatsappNumber: "212634193387",
  hoursStatusFr: "Fermé · Ouvre à 09:00 lun.",
  hoursStatusAr: "مغلق حالياً · يفتح الإثنين 09:00",
  rating: 5.0,
  ratingDisplay: "5,0",
  reviewCount: 172,
  heroImage: drGhitaPortrait,
  aboutImage: cabinetAccueil,
  ctaImage: cabinetAttente,
  logoImage: drGhitaLogo,
};

export const clinicPreviewThumbs = [
  cabinetExamen,
  laserFotonaCryo,
  soinsSmartluxHydra,
  avantApresLevres,
];

export const navLinks = [
  { labelFr: "Accueil", labelAr: "الرئيسية", href: "#home" },
  { labelFr: "Le Cabinet", labelAr: "العيادة", href: "#about" },
  {
    labelFr: "Soins & Lasers",
    labelAr: "العلاجات والليزر",
    href: "#services",
    children: [
      { labelFr: "Diagnostic Dermatologique", labelAr: "تشخيص الأمراض الجلدية", href: "#services" },
      { labelFr: "Lasers Fotona SP Dynamis", labelAr: "ليزر فوتونا SP Dynamis", href: "#services" },
      { labelFr: "PRP · Skinbooster · Botox", labelAr: "PRP · سكين بوستر · بوتوكس", href: "#services" },
      { labelFr: "Filler des Lèvres", labelAr: "فيلر الشفاه", href: "#services" },
      { labelFr: "Hydra Beauty & Smartlux IQ", labelAr: "هيدرا بيوتي وسمارتلوكس IQ", href: "#services" },
    ],
  },
  { labelFr: "Praticienne", labelAr: "الطبيبة", href: "#specialists" },
  { labelFr: "Avis (172)", labelAr: "الآراء (172)", href: "#testimonials" },
  { labelFr: "Avant / Après", labelAr: "قبل / بعد", href: "#blog" },
] as const;

export const trustWordsFr = [
  "Dr. FILALI BABA GHITA",
  "طبيبة الجلد",
  "5,0 ★ (172 avis)",
  "Diagnostic (22)",
  "Humaine (21)",
  "Confiance (19)",
  "Lasers · PRP · Skinbooster · Botox",
  "1073 Av. Al Massira · Rabat",
];

export const trustWordsAr = [
  "د. فيلالي بابا غيتة",
  "طبيبة الجلد",
  "5,0 ★ (172 تقييم)",
  "تشخيص دقيق (22)",
  "إنسانية وإنصات (21)",
  "ثقة (19)",
  "ليزر · PRP · سكين بوستر · بوتوكس",
  "1073 شارع المسيرة · الرباط",
];

export interface Service {
  titleFr: string;
  titleAr: string;
  department: Department;
  descFr: string;
  descAr: string;
  image: string;
  tagFr: string;
  tagAr: string;
}

export const services: Service[] = [
  {
    titleFr: "Consultation & Diagnostic Dermatologique",
    titleAr: "استشارة وتشخيص الأمراض الجلدية",
    department: "Dermatologie Clinique",
    descFr:
      "Examen clinique complet en salle de consultation et diagnostic précis posé directement par Dr. Filali Baba Ghita dès la première visite.",
    descAr:
      "فحص سريري شامل في قاعة الاستشارة وتشخيص دقيق مباشر مع الدكتورة فيلالي بابا غيتة منذ الزيارة الأولى.",
    image: cabinetExamen,
    tagFr: "Diagnostic (22)",
    tagAr: "تشخيص (22)",
  },
  {
    title: "Lasers Médicaux Fotona & Cryo",
    titleAr: "أجهزة الليزر الطبية Fotona والتبريد Cryo",
    department: "Lasers Fotona & Hydra Beauty",
    descFr:
      "Plateforme laser Fotona SP Dynamis avec refroidissement Cryo pour les traitements dermatologiques et esthétiques ciblés.",
    descAr:
      "منصة ليزر Fotona SP Dynamis مع نظام التبريد Cryo للعلاجات الجلدية والتجميلية الموجهة.",
    image: laserFotonaCryo,
    tagFr: "Lasers Fotona",
    tagAr: "ليزر Fotona",
  },
  {
    title: "PRP, Skinbooster & Botox",
    titleAr: "PRP وسكين بوستر (Skinbooster) وبوتوكس (Botox)",
    department: "Médecine Esthétique (PRP · Skinbooster · Botox)",
    descFr:
      "Actes injectables réalisés personnellement par la praticienne en salle de soins dédiée pour revitaliser la peau en douceur.",
    descAr:
      "علاجات تجميلية تجريها الطبيبة بنفسها في قاعة العلاجات لتجديد نضارة البشرة وترطيبها بلطف.",
    image: cabinetEsthetique,
    tagFr: "PRP · Skinbooster · Botox",
    tagAr: "PRP · سكين بوستر · بوتوكس",
  },
  {
    title: "Hydra Beauty & Photothérapie Smartlux IQ",
    titleAr: "هيدرا بيوتي (Hydra Beauty) وعلاج Smartlux IQ",
    department: "Lasers Fotona & Hydra Beauty",
    descFr:
      "Soin du visage nettoyant et hydratant Hydra Beauty couplé à la photothérapie LED Smartlux IQ pour l'éclat cutané.",
    descAr:
      "جلسة تنظيف وترطيب عميق للبشرة عبر Hydra Beauty مع العلاج الضوئي Smartlux IQ لإشراقة طبيعية.",
    image: soinsSmartluxHydra,
    tagFr: "Hydra Beauty",
    tagAr: "هيدرا بيوتي",
  },
  {
    title: "Filler des Lèvres — Résultat Naturel",
    titleAr: "فيلر الشفاه — نتيجة طبيعية متوازنة",
    department: "Filler des Lèvres",
    descFr:
      "Apport de volume, définition du contour et hydratation des lèvres avec un rendu harmonieux et naturel.",
    descAr:
      "إبراز حجم الشفاه وتحديد محيطها وترطيبها بلمسة متوازنة وطبيعية تحافظ على تعابير الوجه.",
    image: avantApresLevres,
    tagFr: "Esthétique",
    tagAr: "تجميل",
  },
  {
    title: "Suivi Dermatologique & Prise en Charge Cutanée",
    titleAr: "متابعة جلدية وعلاج الحالات الجلدية",
    department: "Suivi Dermatologique",
    descFr:
      "Accompagnement personnalisé des affections cutanées et lésions dermatologiques avec suivi rigoureux au cabinet de Rabat.",
    descAr:
      "متابعة شخصية للحالات الجلدية والتصبغات والبثور مع تتبع دقيق مع الطبيبة في الرباط.",
    image: avantApresLesionVisage,
    tagFr: "Suivi Direct",
    tagAr: "متابعة مباشرة",
  },
];

export interface Doctor {
  id: string;
  categoryFr: string;
  categoryAr: string;
  department: Department;
  nameFr: string;
  nameAr: string;
  titleFr: string;
  titleAr: string;
  image: string;
  experienceFr: string;
  experienceAr: string;
  patientsFr: string;
  patientsAr: string;
  rating: number;
  reviews: number;
  qualificationsFr: string[];
  qualificationsAr: string[];
  bioFr: string;
  bioAr: string;
  availabilityFr: { days: string; hours: string };
  availabilityAr: { days: string; hours: string };
  feeFr: string;
  feeAr: string;
}

export const doctors: Doctor[] = [
  {
    id: "dermatologie-clinique",
    categoryFr: "Dermatologie",
    categoryAr: "الأمراض الجلدية",
    department: "Dermatologie Clinique",
    nameFr: "Dr. Filali Baba Ghita",
    nameAr: "د. فيلالي بابا غيتة",
    titleFr: "Médecin Dermatologue — Cabinet de Dermatologie et Médecine Esthétique (طبيبة الجلد)",
    titleAr: "طبيبة أمراض الجلد والطب التجميلي — عيادة طبيبة الجلد بالرباط",
    image: drGhitaPortrait,
    experienceFr: "Praticienne Unique",
    experienceAr: "طبيبة واحدة متابعة",
    patientsFr: "172 avis · 5,0 ★",
    patientsAr: "172 تقييم · 5,0 ★",
    rating: 5.0,
    reviews: 172,
    qualificationsFr: ["Diagnostic précis", "Écoute & bienveillance", "Rabat · Av. Al Massira"],
    qualificationsAr: ["تشخيص دقيق", "إنصات ولطف", "الرباط · شارع المسيرة"],
    bioFr:
      "Dr. Filali Baba Ghita assure personnellement chaque consultation dermatologique et chaque acte laser ou esthétique au cabinet de Rabat. Les retours de patients soulignent un diagnostic précis dès la première consultation, une écoute attentive et un accompagnement humain.",
    bioAr:
      "تُشرف الدكتورة فيلالي بابا غيتة مباشرة على كل استشارة جلدية وجلسة ليزر أو عناية تجميلية في العيادة بالرباط. وتُبرز آراء المرضى دقة التشخيص منذ الاستشارة الأولى، والإنصات الكامل، والتعامل الإنساني.",
    availabilityFr: { days: "Dès lundi 09:00", hours: "Créneaux de 30 min" },
    availabilityAr: { days: "الإثنين ابتداءً من 09:00", hours: "مواعيد 30 دقيقة" },
    feeFr: "05 37 79 77 57",
    feeAr: "05 37 79 77 57",
  },
  {
    id: "medecine-esthetique",
    categoryFr: "Lasers · PRP · Botox",
    categoryAr: "ليزر · PRP · بوتوكس",
    department: "Médecine Esthétique (PRP · Skinbooster · Botox)",
    nameFr: "Dr. Filali Baba Ghita",
    nameAr: "د. فيلالي بابا غيتة",
    titleFr: "Plateau Technique : Fotona SP Dynamis, Smartlux IQ, Hydra Beauty, PRP, Skinbooster & Botox",
    titleAr: "التجهيزات الطبية: Fotona SP Dynamis، Smartlux IQ، Hydra Beauty، PRP، Skinbooster وBotox",
    image: laserFotonaCryo,
    experienceFr: "Plateau Médical",
    experienceAr: "تجهيزات حديثة",
    patientsFr: "5,0 ★ Google",
    patientsAr: "5,0 ★ على جوجل",
    rating: 5.0,
    reviews: 172,
    qualificationsFr: ["Fotona SP Dynamis", "PRP · Skinbooster · Botox", "Hydra Beauty & Smartlux IQ"],
    qualificationsAr: ["ليزر Fotona SP Dynamis", "PRP · سكين بوستر · بوتوكس", "هيدرا بيوتي وسمارتلوكس IQ"],
    bioFr:
      "Chaque protocole laser ou esthétique (PRP, Skinbooster, Botox, Filler des lèvres, Fotona 4D, Hydra Beauty) est évalué et réalisé directement par Dr. Filali Baba Ghita selon votre type de peau.",
    bioAr:
      "يتم تقييم وإجراء كل بروتوكول ليزر أو تجميل (PRP، سكين بوستر، بوتوكس، فيلر الشفاه، Fotona 4D، هيدرا بيوتي) مباشرة من طرف الدكتورة فيلالي بابا غيتة حسب طبيعة بشرتك.",
    availabilityFr: { days: "Sur rendez-vous", hours: "À partir de 09:00 lun." },
    availabilityAr: { days: "بموعد مسبق", hours: "ابتداءً من 09:00 الإثنين" },
    feeFr: "1073 Av. Al Massira, Rabat",
    feeAr: "1073 شارع المسيرة، الرباط",
  },
];

export const testimonials = [
  {
    name: "bouchra elhmidi",
    roleFr: "3 avis · il y a 2 jours · PRP, Skinbooster et Botox",
    roleAr: "3 تقييمات · منذ يومين · PRP وSkinbooster وBotox",
    image: avantApresLevres,
    quoteFr:
      "Une très belle expérience à chaque visite ! Une dermatologue exceptionnelle, douce, professionnelle et surtout très à l’écoute. J’ai réalisé plusieurs soins (PRP, Skinbooster et Botox) et je suis pleinement satisfaite à chaque fois.",
    quoteAr:
      "تجربة رائعة في كل زيارة! طبيبة جلد استثنائية، لطيفة، مهنية ومستمعة للغاية. قمت بعدة علاجات (PRP وSkinbooster وBotox) والنتيجة مرضية دائماً.",
  },
  {
    name: "Abbad Andaloussi Mohamed",
    roleFr: "1 avis · il y a une semaine · Consultation dermatologique",
    roleAr: "تقييم واحد · منذ أسبوع · استشارة جلدية",
    image: cabinetExamen,
    quoteFr:
      "Très bonne dermatologue, professionnelle, compétente et à l’écoute. Elle prend le temps d’expliquer et d’accompagner ses patients avec beaucoup de sérieux et de bienveillance. je la recommande vivement.",
    quoteAr:
      "طبيبة جلد ممتازة، مهنية وكفؤة ومستمعة. تأخذ الوقت الكافي للشرح ومرافقة المرضى بجدية ولطف كبيرين. أنصح بها بشدة.",
  },
  {
    name: "Jamal Boussetta",
    roleFr: "9 avis · il y a 5 jours · Diagnostic dès la 1re consultation",
    roleAr: "9 تقييمات · منذ 5 أيام · تشخيص دقيق منذ الاستشارة الأولى",
    image: cabinetEsthetique,
    quoteFr:
      "Médecin très compétente qui va à l'essentiel tout en restant bienveillante. Diagnostic précis et traitement adapté dès la première consultation. Je recommande vivement",
    quoteAr:
      "طبيبة كفؤة جداً وتذهب مباشرة إلى الأساس مع الحفاظ على اللطف. تشخيص دقيق وعلاج مناسب منذ الاستشارة الأولى. أنصح بها بشدة.",
  },
  {
    nameFr: "Patiente Vérifiée — طبيبة الجلد",
    nameAr: "مراجعة موثقة — طبيبة الجلد",
    roleFr: "5,0 ★ sur 172 avis · ETG 1, Appt 1, 1073 Av. Al Massira, Rabat",
    roleAr: "5,0 ★ من 172 تقييم · الطابق 1، شقة 1، 1073 شارع المسيرة، الرباط",
    image: cabinetAccueil,
    quoteFr:
      "Un accueil chaleureux, une écoute attentive et un diagnostic dermatologique clair qui inspire confiance dès la première visite à Rabat.",
    quoteAr:
      "استقبال طيب، إنصات دقيق وتشخيص جلدي واضح يبعث على الثقة منذ الزيارة الأولى في الرباط.",
  },
];

export interface BlogPost {
  titleFr: string;
  titleAr: string;
  categoryFr: string;
  categoryAr: string;
  dateFr: string;
  dateAr: string;
  readTimeFr: string;
  readTimeAr: string;
  excerptFr: string;
  excerptAr: string;
  image: string;
  bodyFr: string[];
  bodyAr: string[];
}

export const blogPosts: BlogPost[] = [
  {
    titleFr: "Filler des lèvres : volume, définition et hydratation naturelle",
    titleAr: "فيلر الشفاه: حجم وتحديد وترطيب طبيعي",
    categoryFr: "Avant / Après",
    categoryAr: "قبل / بعد",
    dateFr: "Cas Clinique",
    dateAr: "حالة سريرية",
    readTimeFr: "Médecine Esthétique",
    readTimeAr: "طب تجميلي",
    excerptFr:
      "Harmonisation du contour et de l'hydratation labiale tout en préservant l'expression et l'équilibre naturel du sourire.",
    excerptAr:
      "تناغم محيط الشفاه وترطيبها مع الحفاظ على تعابير الوجه الطبيعية وتوازن الابتسامة.",
    image: avantApresLevres,
    bodyFr: [
      "Le traitement par acide hyaluronique au niveau des lèvres vise à redonner de la souplesse, une définition nette de l'arc de Cupidon et une hydratation durable.",
      "Chaque injection est dosée avec précision par Dr. Filali Baba Ghita afin d'obtenir un résultat naturel et proportionné à la morphologie du visage.",
      "Une consultation préalable permet d'évaluer vos attentes et les précautions avant et après la séance.",
    ],
    bodyAr: [
      "يهدف حقن الفيلر للشفاه إلى منحها ليونة، تحديداً واضحاً وترطيباً يدوم مع الحفاظ على مظهر طبيعي.",
      "تقوم الدكتورة فيلالي بابا غيتة بتقدير الكمية بدقة لتنسجم النتيجة مع ملامح الوجه.",
      "تتيح الاستشارة الأولية تقييم الحالة وشرح التعليمات قبل وبعد الجلسة.",
    ],
  },
  {
    titleFr: "Prise en charge d'une lésion pigmentée du visage",
    titleAr: "علاج وتقييم تصبغ جلدي على الوجه",
    categoryFr: "Avant / Après",
    categoryAr: "قبل / بعد",
    dateFr: "Cas Clinique",
    dateAr: "حالة سريرية",
    readTimeFr: "Dermatologie",
    readTimeAr: "أمراض الجلد",
    excerptFr:
      "Évaluation dermatologique ciblée et traitement adapté permettant une nette amélioration cutanée avec suivi au cabinet.",
    excerptAr:
      "فحص جلدي دقيق وعلاج مناسب ساعد على تحسن ملحوظ في مظهر الجلد مع المتابعة في العيادة.",
    image: avantApresLesionVisage,
    bodyFr: [
      "Toute lésion pigmentée ou kératosique du visage fait l'objet d'un examen dermatologique attentif avant de choisir le protocole approprié.",
      "Le suivi photographique avant et après traitement permet d'apprécier la cicatrisation et l'homogénéisation progressive de la peau.",
      "N'hésitez pas à consulter dès l'apparition ou la modification d'une lésion cutanée.",
    ],
    bodyAr: [
      "يخضع أي تصبغ أو آفة جلدية على الوجه لفحص دقيق لتحديد العلاج الأنسب.",
      "يساعد التتبع قبل وبعد العلاج على ملاحظة تحسن صفاء البشرة وتجانسها تدريجياً.",
      "يُنصح بمراجعة الطبيبة عند ظهور أي تغير جلدي جديد.",
    ],
  },
  {
    title: "Suivi dermatologique d'une dermatose inflammatoire étendue",
    titleAr: "متابعة حالة التهاب جلدي منتشر",
    categoryFr: "Avant / Après",
    categoryAr: "قبل / بعد",
    dateFr: "Cas Clinique",
    dateAr: "حالة سريرية",
    readTimeFr: "Dermatologie Clinique",
    readTimeAr: "جلدية سريرية",
    excerptFr:
      "Diagnostic précis dès la première consultation et protocole thérapeutique personnalisé permettant l'apaisement cutané.",
    excerptAr:
      "تشخيص دقيق منذ الزيارة الأولى وخطة علاجية مخصصة ساهمت في تهدئة الاحمرار واستعادة راحة الجلد.",
    image: avantApresDos,
    bodyFr: [
      "Les éruptions inflammatoires étendues nécessitent un diagnostic rigoureux afin d'identifier l'origine exacte et d'instaurer un traitement ciblé.",
      "Grâce à une prise en charge adaptée et un suivi régulier avec Dr. Filali Baba Ghita, l'inflammation régresse nettement et la peau retrouve son confort.",
      "Un contrôle clinique assure la consolidation des résultats dans la durée.",
    ],
    bodyAr: [
      "تتطلب الحالات الالتهابية الواسعة تشخيصاً دقيقاً لتحديد السبب واختيار العلاج الملائم.",
      "بفضل المتابعة المنتظمة مع الدكتورة فيلالي بابا غيتة، يتراجع الالتهاب تدريجياً وتتحسن حالة الجلد.",
      "تضمن زيارات المراقبة استقرار النتائج على المدى الطويل.",
    ],
  },
  {
    title: "Traitement d'une mycose cutanée (dermatophytose) avec suivi",
    titleAr: "علاج فطريات جلدية مع المتابعة",
    categoryFr: "Avant / Après",
    categoryAr: "قبل / بعد",
    dateFr: "Cas Clinique",
    dateAr: "حالة سريرية",
    readTimeFr: "Dermatologie Clinique",
    readTimeAr: "جلدية سريرية",
    excerptFr:
      "Identification clinique des lésions annulaires et traitement antifongique adapté pour une résolution complète des plaques.",
    excerptAr:
      "تشخيص سريري للآفات الجلدية واعتماد علاج مناسب أدى إلى زوال الأعراض وتحسن واضح.",
    image: avantApresAbdomen,
    bodyFr: [
      "Les plaques érythémateuses à bordure active nécessitent un diagnostic dermatologique précis pour éviter les traitements inadaptés.",
      "Après mise en place du protocole prescrit au cabinet, les lésions s'estompent progressivement jusqu'à disparition des signes inflammatoires.",
      "Pour tout avis dermatologique à Rabat : ETG 1, Appt 1, 1073 Av. Al Massira · 05 37 79 77 57.",
    ],
    bodyAr: [
      "تحتاج البقع الجلدية ذات الحواف الواضحة إلى تشخيص طبي دقيق لاختيار العلاج الصحيح.",
      "بعد الالتزام بالوصفة الطبية والمتابعة في العيادة، تخف الآفات تدريجياً وتتحسن البشرة.",
      "للتواصل أو حجز موعد بالرباط: الطابق 1، شقة 1، 1073 شارع المسيرة · 05 37 79 77 57.",
    ],
  },
];

export const contactInfo = {
  phone: "05 37 79 77 57",
  emergency: "05 37 79 77 57",
  email: "05 37 79 77 57",
  addressFr: "ETG 1 , Appt 1, 1073 Av. Al Massira, Rabat 10150 (X4F5+98 Rabat)",
  addressAr: "الطابق 1، شقة 1، 1073 شارع المسيرة، الرباط 10150 (X4F5+98 Rabat)",
  hoursFr: "Fermé · Ouvre à 09:00 lun.",
  hoursAr: "مغلق حالياً · يفتح الإثنين 09:00",
};
