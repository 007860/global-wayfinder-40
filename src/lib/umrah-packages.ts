export type Occ = "sharing" | "quad" | "triple" | "double";
export const OCCS: { key: Occ; label: string }[] = [
  { key: "sharing", label: "Sharing" },
  { key: "quad", label: "Quad (4 Bed)" },
  { key: "triple", label: "Triple (3 Bed)" },
  { key: "double", label: "Double (2 Bed)" },
];

export type Hotel = { name: string; dist: string; min: number; note?: string };
export type UmrahPkg = {
  id: string;
  no: string;
  series: "sep" | "oct";
  airline: string;
  makkah: Hotel;
  madinah: Hotel;
  flights: string[];
  prices: Record<Occ, number>;
};

const H = {
  rawafed: { name: "Rawafed Al Asmiah", dist: "1500–2000m", min: 1500, note: "Shuttle Service" },
  masar: { name: "Al Masar Ajyad", dist: "800–900m", min: 800, note: "Ajyad Road" },
  juhanni: { name: "Al Juhanni Ajyad", dist: "500–600m", min: 500, note: "Ajyad Road" },
  eiman: { name: "Dar Al Eiman Ajyad", dist: "300–400m", min: 300, note: "Ajyad Road" },
  meridien: { name: "Le Meridien Towers", dist: "100–200m", min: 100, note: "Near Haram" },
  rayan: { name: "Anwar Al Rayan", dist: "1200m", min: 1200, note: "Ibrahim Khalil Road, Out side Kubri" },
  marjan: { name: "Manazil Al Marjan", dist: "1500–2000m", min: 1500, note: "Shuttle Service" },
  diyar: { name: "Diyar Safa", dist: "800–900m", min: 800, note: "Masjid Bilal Side" },
  nozl: { name: "Nozl Al Falah", dist: "550–650m", min: 550, note: "Gate #365, opposite Al Baik" },
  concorde: { name: "Concorde Dar Al Khair", dist: "200–300m", min: 200 },
  taiba: { name: "Taiba Front", dist: "100–200m", min: 100, note: "Near Masjid" },
  mather: { name: "Mather Al Jewar", dist: "500–550m", min: 500, note: "Hijra Road" },
  emaar: { name: "Emaar Al Khair Golden", dist: "800–900m", min: 800, note: "Hijra Road" },
  arjawan: { name: "Arjawan Al Madina", dist: "250–300m", min: 250, note: "Gate No 7, inside Markaziya" },
  alkaram: { name: "Alkaram Alajed / Alkaram Alatif", dist: "350–400m", min: 350, note: "Babul Islam side" },
} satisfies Record<string, Hotel>;

const p = (sharing: number, quad: number, triple: number, double: number) => ({ sharing, quad, triple, double });
const SJ = "Saudia / Fly-Jinnah";

export const UMRAH_PACKAGES: UmrahPkg[] = [
  { id: "o01", no: "01", series: "oct", airline: "Saudia (SV 739 / SV 734)", makkah: H.rayan, madinah: H.marjan, flights: ["22 Oct · LHE→JED 02:40–05:45 → 12 Nov · JED→LHE 02:10–08:45"], prices: p(266999, 273999, 286999, 311999) },
  { id: "o02", no: "02", series: "oct", airline: "Saudia (SV 739 / SV 738 / SV 732)", makkah: H.rayan, madinah: H.marjan, flights: ["Option A: 28 Oct LHE→JED → 17 Nov JED→LHE", "Option B: 31 Oct LHE→JED → 20 Nov JED→LHE"], prices: p(264999, 272999, 284999, 308999) },
  { id: "o03", no: "03", series: "oct", airline: "Saudia (SV 739 / SV 734)", makkah: H.juhanni, madinah: H.nozl, flights: ["04 Oct · LHE→JED 02:40–05:45 → 24 Oct · JED→LHE 02:10–08:45"], prices: p(279999, 290999, 308999, 344999) },
  { id: "o04", no: "04", series: "oct", airline: "Saudia (SV 739 / SV 738)", makkah: H.juhanni, madinah: H.alkaram, flights: ["07 Oct · LHE→JED 02:40–05:45 → 28 Oct · JED→LHE 18:05–01:00"], prices: p(290999, 303999, 326999, 371999) },
  { id: "o05", no: "05", series: "oct", airline: "Saudia (SV 735 / 738 / 739 / 734 / 732)", makkah: H.juhanni, madinah: H.alkaram, flights: ["Option A: 16 Oct LHE→JED → 05 Nov JED→LHE", "Option B: 17 Oct LHE→JED → 06 Nov JED→LHE", "Option C: 18 Oct LHE→JED → 07 Nov JED→LHE", "Option D: 21 Oct LHE→JED → 10 Nov JED→LHE"], prices: p(287999, 300999, 322999, 366999) },
  { id: "o06", no: "06", series: "oct", airline: "Saudia (SV 739 / SV 734)", makkah: H.juhanni, madinah: H.alkaram, flights: ["30 Oct · LHE→JED 02:40–05:45 → 19 Nov · JED→LHE 02:10–08:45"], prices: p(287999, 300999, 322999, 366999) },
  { id: "n01", no: "N-01", series: "oct", airline: "Saudia", makkah: H.rawafed, madinah: H.marjan, flights: ["SV739 05 Oct LHE→JED 02:40–05:45 → SV734 24 Oct JED→LHE 01:55–08:30", "SV735 06 Oct LHE→JED 10:30–13:35 → SV738 25 Oct JED→LHE 17:15–23:55", "SV739 06 Oct LHE→JED 02:40–05:45 → SV738 27 Oct JED→LHE 17:15–23:55", "SV735 06 Oct LHE→JED 10:30–13:35 → SV738 26 Oct JED→LHE 17:15–23:55"], prices: p(253999, 258999, 265999, 280999) },
  { id: "n02", no: "N-02", series: "oct", airline: "Saudia", makkah: H.juhanni, madinah: H.alkaram, flights: ["SV739 07 Oct LHE→JED 02:40–05:45 → SV738 28 Oct JED→LHE 17:15–23:55", "SV735 07 Oct LHE→JED 10:30–13:35 → SV738 27 Oct JED→LHE 17:15–23:55", "SV735 09 Oct LHE→JED 10:30–13:35 → SV738 29 Oct JED→LHE 17:15–23:55", "SV739 09 Oct LHE→JED 02:40–05:45 → SV732 30 Oct JED→LHE 09:30–16:30"], prices: p(287999, 309999, 322999, 366999) },
  { id: "n03", no: "N-03", series: "oct", airline: "Saudia", makkah: H.emaar, madinah: H.nozl, flights: ["SV739 10 Oct LHE→JED 02:40–05:45 → SV734 30 Oct JED→LHE 02:10–08:45", "SV735 10 Oct LHE→JED 10:30–13:35 → SV738 30 Oct JED→LHE 17:15–23:55", "SV739 11 Oct LHE→JED 02:40–05:45 → SV734 31 Oct JED→LHE 02:10–08:45"], prices: p(283999, 295999, 315999, 356999) },
  { id: "n04", no: "N-04", series: "oct", airline: "Saudia", makkah: H.juhanni, madinah: H.nozl, flights: ["Flight dates on request (from Lahore)"], prices: p(279999, 290999, 308999, 344999) },
  { id: "n05", no: "N-05", series: "oct", airline: "Saudia", makkah: H.mather, madinah: H.arjawan, flights: ["Flight dates on request (from Lahore)"], prices: p(314999, 334999, 366999, 432999) },
];

export const DISTANCE_BANDS = [
  { key: "all", label: "Any distance", test: () => true },
  { key: "u300", label: "Under 300m", test: (m: number) => m < 300 },
  { key: "300", label: "300m – 600m", test: (m: number) => m >= 300 && m < 600 },
  { key: "600", label: "600m – 1000m", test: (m: number) => m >= 600 && m < 1000 },
  { key: "1000", label: "1000m+ Shuttle", test: (m: number) => m >= 1000 },
] as const;

export const MAKKAH_HOTELS: Hotel[] = [H.rayan, H.juhanni, H.rawafed, H.masar, H.emaar, H.mather, H.eiman, H.meridien];
export const MADINAH_HOTELS: Hotel[] = [H.marjan, H.nozl, H.alkaram, H.diyar, H.arjawan, H.concorde, H.taiba];

export const fmtPKR = (n: number) => `PKR ${n.toLocaleString("en-US")}/-`;
