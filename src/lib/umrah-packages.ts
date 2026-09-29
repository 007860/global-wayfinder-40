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
  alkaram: { name: "Alkaram Aljadid / Alkirram Alfidi", dist: "350–400m", min: 350, note: "Babul Islam side, first row after Markazia" },
} satisfies Record<string, Hotel>;

const p = (sharing: number, quad: number, triple: number, double: number) => ({ sharing, quad, triple, double });
const SJ = "Saudia / Fly-Jinnah";

export const UMRAH_PACKAGES: UmrahPkg[] = [
  { id: "s01", no: "01", series: "sep", airline: SJ, makkah: H.rawafed, madinah: H.marjan, flights: ["SV 739 · 03 Sep · LHE→JED 02:40–05:45", "SV 734 · 23 Sep · JED→LHE 01:55–08:50"], prices: p(234999, 254999, 264999, 284999) },
  { id: "s02", no: "02", series: "sep", airline: SJ, makkah: H.masar, madinah: H.diyar, flights: ["SV 739 · 07 Sep · LHE→JED 02:40–05:45", "SV 734 · 27 Sep · JED→LHE 01:55–08:50"], prices: p(254999, 280999, 297999, 334999) },
  { id: "s03", no: "03", series: "sep", airline: SJ, makkah: H.juhanni, madinah: H.nozl, flights: ["SV 735 · 10 Sep · LHE→JED 10:30–13:35", "SV 734 · 30 Sep · JED→LHE 18:05–01:00"], prices: p(264999, 294999, 314999, 357999) },
  { id: "s04", no: "04", series: "sep", airline: SJ, makkah: H.eiman, madinah: H.concorde, flights: ["SV 739 · 17 Sep · LHE→JED 02:40–05:45", "SV 734 · 07 Oct · JED→LHE 01:55–08:50"], prices: p(274999, 299999, 324999, 369999) },
  { id: "s05", no: "05", series: "sep", airline: SJ, makkah: H.meridien, madinah: H.taiba, flights: ["SV 739 · 24 Sep · LHE→JED 02:40–05:45", "SV 734 · 14 Oct · JED→LHE 01:55–08:50"], prices: p(289999, 319999, 339999, 379999) },
  { id: "s06", no: "06", series: "sep", airline: SJ, makkah: H.rawafed, madinah: H.marjan, flights: ["SV 735 · 10 Sep · LHE→JED 10:30–13:35", "SV 738 · 30 Sep · JED→LHE 18:05–01:00"], prices: p(282000, 287000, 297000, 315000) },
  { id: "s07", no: "07", series: "sep", airline: SJ, makkah: H.masar, madinah: H.diyar, flights: ["SV 735 · 11 Sep · LHE→JED 10:30–13:35", "SV 738 · 01 Oct · JED→LHE 18:05–01:00"], prices: p(282000, 287000, 297000, 315000) },
  { id: "s08", no: "08", series: "sep", airline: SJ, makkah: H.juhanni, madinah: H.nozl, flights: ["SV 735 · 28 Sep · LHE→JED 10:30–13:35", "SV 734 · 18 Oct · JED→LHE 18:50–01:00"], prices: p(282000, 287000, 297000, 315000) },
  { id: "s09", no: "09", series: "sep", airline: SJ, makkah: H.eiman, madinah: H.concorde, flights: ["SV 735 · 21 Sep · LHE→JED 10:30–13:35", "SV 734 · 15 Oct · JED→LHE 01:55–08:50"], prices: p(299000, 309000, 325000, 358000) },
  { id: "s10", no: "10", series: "sep", airline: SJ, makkah: H.meridien, madinah: H.taiba, flights: ["23 Sep · LHE→JED 02:40–05:45", "SV 734 · 18 Oct · JED→LHE 18:50–01:00"], prices: p(299000, 309000, 325000, 358000) },
  { id: "s11", no: "11", series: "sep", airline: SJ, makkah: H.masar, madinah: H.diyar, flights: ["SV 735 · 05 Sep · LHE→JED 10:30–13:35", "SV 738 · 25 Sep · JED→LHE 18:05–01:00"], prices: p(282000, 287000, 297000, 315000) },
  { id: "s12", no: "12", series: "sep", airline: SJ, makkah: H.masar, madinah: H.diyar, flights: ["SV 739 · 08 Sep · LHE→JED 02:40–05:45", "SV 734 · 28 Sep · JED→LHE 01:55–08:50"], prices: p(282000, 287000, 297000, 315000) },
  { id: "s13", no: "13", series: "sep", airline: SJ, makkah: H.juhanni, madinah: H.nozl, flights: ["SV 735 · 12 Sep · LHE→JED 10:30–13:35", "SV 738 · 02 Oct · JED→LHE 18:05–01:00"], prices: p(282000, 287000, 297000, 315000) },
  { id: "s14", no: "14", series: "sep", airline: SJ, makkah: H.eiman, madinah: H.concorde, flights: ["SV 739 · 15 Sep · LHE→JED 02:40–05:45", "SV 734 · 05 Oct · JED→LHE 01:55–08:50"], prices: p(299000, 309000, 325000, 358000) },
  { id: "s15", no: "15", series: "sep", airline: SJ, makkah: H.meridien, madinah: H.taiba, flights: ["SV 739 · 19 Sep · LHE→JED 02:40–05:45", "SV 734 · 09 Oct · JED→LHE 01:55–08:50"], prices: p(299000, 309000, 325000, 358000) },
  // Oct–Nov Saudia departures
  { id: "o06", no: "06", series: "oct", airline: "Saudia", makkah: H.rayan, madinah: H.marjan, flights: ["SV 739 · 22 Oct · LHE→JED 02:40–05:45", "SV 734 · 12 Nov · JED→LHE 02:10–08:45"], prices: p(266999, 273999, 286999, 311999) },
  { id: "o07", no: "07", series: "oct", airline: "Saudia", makkah: H.rayan, madinah: H.marjan, flights: ["SV 739 · 28 Oct → SV 738 · 17 Nov", "SV 739 · 31 Oct → SV 732 · 20 Nov"], prices: p(264999, 272999, 284999, 308999) },
  { id: "o08", no: "08", series: "oct", airline: "Saudia", makkah: H.juhanni, madinah: H.nozl, flights: ["SV 739 · 04 Oct · LHE→JED 02:40–05:45", "SV 734 · 24 Oct · JED→LHE 02:10–08:45"], prices: p(279999, 290999, 308999, 344999) },
  { id: "o09", no: "09", series: "oct", airline: "Saudia", makkah: H.juhanni, madinah: H.alkaram, flights: ["SV 739 · 07 Oct · LHE→JED 02:40–05:45", "SV 738 · 28 Oct · JED→LHE 18:05–01:00"], prices: p(290999, 303999, 326999, 371999) },
  { id: "o10", no: "10", series: "oct", airline: "Saudia", makkah: H.juhanni, madinah: H.alkaram, flights: ["SV 735 · 16 Oct → SV 738 · 05 Nov", "SV 739 · 17 Oct → SV 734 · 06 Nov"], prices: p(287999, 300999, 322999, 366999) },
  { id: "o11", no: "11", series: "oct", airline: "Saudia", makkah: H.juhanni, madinah: H.alkaram, flights: ["SV 739 · 18 Oct → SV 732 · 07 Nov", "SV 735 · 21 Oct → SV 738 · 10 Nov"], prices: p(287999, 300999, 322999, 366999) },
  { id: "o12", no: "12", series: "oct", airline: "Saudia", makkah: H.juhanni, madinah: H.alkaram, flights: ["SV 739 · 30 Oct · LHE→JED 02:40–05:45", "SV 734 · 19 Nov · JED→LHE 02:10–08:45"], prices: p(287999, 300999, 322999, 366999) },
];

export const DISTANCE_BANDS = [
  { key: "all", label: "Any distance", test: () => true },
  { key: "u300", label: "Under 300m", test: (m: number) => m < 300 },
  { key: "300", label: "300m – 600m", test: (m: number) => m >= 300 && m < 600 },
  { key: "600", label: "600m – 1000m", test: (m: number) => m >= 600 && m < 1000 },
  { key: "1000", label: "1000m+ Shuttle", test: (m: number) => m >= 1000 },
] as const;

export const MAKKAH_HOTELS: Hotel[] = [H.rawafed, H.masar, H.rayan, { name: "Emar Al Khair Golden", dist: "800–900m", min: 800, note: "Hijra Road" }, H.juhanni, H.eiman, H.meridien, { name: "Mather Al Jewar", dist: "500–550m", min: 500, note: "Hilal Road" }];
export const MADINAH_HOTELS: Hotel[] = [H.marjan, H.diyar, H.nozl, H.concorde, H.taiba];

export const fmtPKR = (n: number) => `PKR ${n.toLocaleString("en-US")}/-`;
