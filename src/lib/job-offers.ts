// Job offer flyers — data taken verbatim from the 7 uploaded Al-Bahr flyers (Oct 2026).
import flyerTurkeyGarments from "@/assets/job-flyer-turkey-garments.png";
import flyerTurkeyBiscuit from "@/assets/job-flyer-turkey-biscuit.png";
import flyerTurkeySewing from "@/assets/job-flyer-turkey-sewing.png";
import flyerTurkeyGeneral from "@/assets/job-flyer-turkey-general.png";
import flyerPolandJobs from "@/assets/job-flyer-poland-jobs.png";
import flyerAlbania from "@/assets/job-flyer-albania.png";
import flyerPolandPermit from "@/assets/job-flyer-poland-permit.png";

export type JobCountry = "Turkey" | "Poland" | "Albania";

export type JobOffer = {
  id: string;
  country: JobCountry;
  flag: string;
  title: string;
  roles: string[];
  salary: string;
  age?: string;
  gender?: string;
  paymentPlan?: string;
  benefits: string[];
  note?: string;
  flyer: string;
};

export const JOB_OFFERS: JobOffer[] = [
  {
    id: "tr-garments",
    country: "Turkey",
    flag: "🇹🇷",
    title: "Turkey Garments Factory Jobs",
    roles: ["Cutting & sewing — garments factory"],
    salary: "PKR 180,000 / month",
    paymentPlan: "60% advance before processing · 40% after visa",
    benefits: ["Free food", "Legal visa", "Best manpower handling", "Limited seats"],
    flyer: flyerTurkeyGarments,
  },
  {
    id: "tr-biscuit",
    country: "Turkey",
    flag: "🇹🇷",
    title: "Turkey Biscuit & Cookie Packing",
    roles: ["Biscuit / cookie packing workers"],
    salary: "PKR 180,000 / month",
    gender: "Ladies only",
    age: "18–40 years (age relaxation possible)",
    benefits: ["Free food", "Free accommodation", "Direct hiring from Pakistan"],
    flyer: flyerTurkeyBiscuit,
  },
  {
    id: "tr-sewing",
    country: "Turkey",
    flag: "🇹🇷",
    title: "Turkey Garment Factory Workers",
    roles: [
      "Sewing machine operators (plain sewing)",
      "Garment / packing workers",
      "Steel press · loading / unloading",
      "Stock picker · stock dispatcher",
    ],
    salary: "PKR 180,000 / month",
    gender: "Male",
    age: "19–40 years",
    benefits: [
      "Free food",
      "Free accommodation",
      "Free transport",
      "Free medical",
      "Direct hiring from Pakistan",
      "Limited seats",
    ],
    flyer: flyerTurkeySewing,
  },
  {
    id: "tr-general",
    country: "Turkey",
    flag: "🇹🇷",
    title: "Turkey General Workers",
    roles: ["General labour"],
    salary: "TRY 28,000 / month (Turkish Lira)",
    gender: "Male",
    age: "18–50 years",
    benefits: ["Food & accommodation free", "8-hour duty", "1-year contract (renewable)"],
    note: "Important notice (flyer): no fee is charged before the work permit is issued.",
    flyer: flyerTurkeyGeneral,
  },
  {
    id: "pl-jobs",
    country: "Poland",
    flag: "🇵🇱",
    title: "Poland Work Permit Jobs",
    roles: ["Agriculture", "Restaurant worker", "Warehouse packing", "Construction worker"],
    salary: "Salary on request",
    benefits: [
      "Legal work permit",
      "Accommodation provided",
      "Food facility",
      "Health insurance",
      "Professional guidance",
    ],
    flyer: flyerPolandJobs,
  },
  {
    id: "pl-permit",
    country: "Poland",
    flag: "🇵🇱",
    title: "Poland Work Permit — Professional",
    roles: [
      "Engineers",
      "IT persons",
      "Bankers",
      "Workers for construction",
      "Packing",
      "Restaurant",
      "Agriculture",
    ],
    salary: "Salary on request",
    gender: "Males & females",
    benefits: [
      "Easy step-by-step payment plan",
      "100% genuine jobs",
      "Legal & safe process",
      "Complete support",
    ],
    flyer: flyerPolandPermit,
  },
  {
    id: "al-all",
    country: "Albania",
    flag: "🇦🇱",
    title: "Albania Work Permit Jobs",
    roles: [
      "Parlor & hair camp jobs",
      "Cleaner",
      "Helper",
      "Restaurant workers",
      "Bar & coffee attendant",
      "General worker",
    ],
    salary: "€1,200 – €1,600 / month",
    benefits: [
      "Free accommodation (shared)",
      "Food provided (at work)",
      "Medical insurance",
      "Transportation support",
      "Legal work permit",
    ],
    flyer: flyerAlbania,
  },
];

export const JOB_COUNTRIES: { key: JobCountry | "all"; label: string; flag: string }[] = [
  { key: "all", label: "All Offers", flag: "🌍" },
  { key: "Turkey", label: "Turkey", flag: "🇹🇷" },
  { key: "Poland", label: "Poland", flag: "🇵🇱" },
  { key: "Albania", label: "Albania", flag: "🇦🇱" },
];
