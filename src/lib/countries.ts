export type Country = { code: string; name: string; flag: string };

export const GCC_COUNTRIES: Country[] = [
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "QA", name: "Qatar", flag: "🇶🇦" },
  { code: "AE", name: "UAE", flag: "🇦🇪" },
  { code: "KW", name: "Kuwait", flag: "🇰🇼" },
  { code: "OM", name: "Oman", flag: "🇴🇲" },
  { code: "BH", name: "Bahrain", flag: "🇧🇭" },
];

export const EU_COUNTRIES: Country[] = [
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "PL", name: "Poland", flag: "🇵🇱" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
];

export const COUNTRIES: Country[] = [...GCC_COUNTRIES, ...EU_COUNTRIES];

export const LEAD_EMAIL = "al.bahr.medical.appointments@gmail.com";
export const WHATSAPP_NUMBER = "923434762264";
export const WHATSAPP_DISPLAY = "+92 343 4762264";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const BRANCH_ADDRESS =
  "78 E Block, Architect Engineering Housing Society, Lahore, Pakistan";
export const BRAND_NAME = "Al-Bahr Travels & Consultants";
