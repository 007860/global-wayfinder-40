export type StudyDestination = {
  slug: string;
  route: string;
  country: string;
  title: string;
  flag: string;
  heroHeadline: string;
  heroSub: string;
  metaTitle: string;
  metaDescription: string;
  benefits: { title: string; detail: string }[];
  requirements: string[];
  process: string[];
};

export const STUDY_WHATSAPP = "https://wa.me/923434762264";

export const STUDY_DESTINATIONS: StudyDestination[] = [
  {
    slug: "study-in-italy",
    route: "/study-in-italy",
    country: "Italy",
    title: "Study in Italy",
    flag: "🇮🇹",
    heroHeadline: "Study in Italy with 100% Fully Funded DSU Regional Scholarships",
    heroSub:
      "Tuition waivers, annual stipends, free meals and accommodation — guided end-to-end by Al-Bahr's Italy admissions desk.",
    metaTitle: "Study in Italy | 100% Fully Funded DSU Regional Scholarships",
    metaDescription:
      "Apply for fully funded DSU regional scholarships in Italy: tuition fee waiver, €7,000–€8,000 annual stipend, free canteen meals and accommodation. Free eligibility assessment from Al-Bahr Travels & Consultants, Lahore.",
    benefits: [
      { title: "Full Tuition Fee Waiver", detail: "100% tuition covered under DSU regional scholarship awards." },
      { title: "€7,000–€8,000 Annual Stipend", detail: "Paid directly to scholarship holders each academic year." },
      { title: "Free Canteen Meals", detail: "Daily university canteen meals included for DSU winners." },
      { title: "Free Accommodation", detail: "University dormitory housing provided at no cost." },
    ],
    requirements: [
      "Minimum 2.5+ CGPA in the last qualification",
      "English Medium of Instruction (MOI) letter or IELTS 6.0+",
      "HEC attested degrees and transcripts",
      "Family income proof below €25,000 (ISEE parificato)",
    ],
    process: [
      "Document auditing and eligibility screening",
      "University pre-acceptance / pre-evaluation",
      "Universitaly portal submission",
      "Embassy legalization and Declaration of Value (DOV)",
      "DSU regional scholarship application",
      "Visa file submission at the embassy",
    ],
  },
  {
    slug: "study-in-china",
    route: "/study-in-china",
    country: "China",
    title: "Study in China",
    flag: "🇨🇳",
    heroHeadline: "Study in China — Fully Funded CSC & Provincial Government Scholarships",
    heroSub:
      "Professor outreach, CSC filing, and X1 visa handling for Bachelor's, Master's and PhD applicants from Pakistan.",
    metaTitle: "Study in China | Fully Funded CSC & Provincial Scholarships",
    metaDescription:
      "Fully funded CSC and provincial government scholarships in China: 100% tuition waiver, free hostel, RMB 2,500–3,500 monthly stipend and 98%+ visa approval. Free eligibility assessment from Al-Bahr Travels, Lahore.",
    benefits: [
      { title: "100% Tuition Waiver", detail: "Complete tuition coverage under CSC and provincial awards." },
      { title: "Free University Hostel", detail: "On-campus accommodation provided by the host university." },
      { title: "Monthly Stipend", detail: "RMB 2,500 to 3,500 per month depending on degree level." },
      { title: "98%+ Visa Approval Rate", detail: "Strong, documented success rate on X1 student visas." },
    ],
    requirements: [
      "Minimum 2.8+ CGPA in the last qualification",
      "English MOI, IELTS, or HSK certificate (where applicable)",
      "Physical (Foreigner) Examination Form",
      "Police Clearance Certificate",
    ],
    process: [
      "Professor outreach and acceptance letter",
      "CSC portal filing",
      "University portal submission",
      "JW201 / JW202 form issuance",
      "X1 student visa application at VFS / Chinese Embassy",
    ],
  },
  {
    slug: "study-in-hungary",
    route: "/study-in-hungary",
    country: "Hungary",
    title: "Study in Hungary",
    flag: "🇭🇺",
    heroHeadline: "Study in Europe with Stipendium Hungaricum Scholarship",
    heroSub:
      "A fully funded Schengen pathway into EU degrees — HEC nomination, Tempus selection and D-type visa filing handled for you.",
    metaTitle: "Study in Hungary | Stipendium Hungaricum Scholarship 2026",
    metaDescription:
      "Apply for the Stipendium Hungaricum scholarship in Hungary: full tuition waiver, monthly stipend, free dormitory, medical insurance and Schengen access. Free eligibility assessment from Al-Bahr Travels, Lahore.",
    benefits: [
      { title: "100% Tuition Waiver", detail: "Full tuition funded by the Hungarian government." },
      { title: "Monthly Stipend", detail: "Regular monthly allowance for living expenses." },
      { title: "Free Dormitory or Housing Allowance", detail: "Dormitory place or a monthly housing contribution." },
      { title: "Medical Insurance", detail: "Health coverage included for the full study period." },
      { title: "Schengen Area Access", detail: "Travel across the Schengen zone on your student residence permit." },
    ],
    requirements: [
      "Minimum 3.0+ CGPA in the last qualification",
      "IELTS 6.0+ or a strong English MOI letter",
      "HEC verified documents",
      "Motivation letter",
    ],
    process: [
      "HEC online portal application",
      "Tempus Public Foundation selection",
      "University online entrance test / interview",
      "Admission letter issuance",
      "Schengen D-type student visa file at the embassy",
    ],
  },
  {
    slug: "study-in-south-korea",
    route: "/study-in-south-korea",
    country: "South Korea",
    title: "Study in South Korea",
    flag: "🇰🇷",
    heroHeadline: "Study in South Korea — Global Korea Scholarship (GKS) & University Grants",
    heroSub:
      "Embassy track or university track — we build competitive GKS files for Pakistan's strongest applicants.",
    metaTitle: "Study in South Korea | Global Korea Scholarship (GKS) Guidance",
    metaDescription:
      "Global Korea Scholarship (GKS) and university grants for South Korea: full tuition, round-trip airfare, settlement allowance and 1,000,000 KRW monthly stipend. Free eligibility assessment from Al-Bahr Travels, Lahore.",
    benefits: [
      { title: "Full Tuition Coverage", detail: "Complete tuition funded for the entire degree." },
      { title: "Round-trip Airfare", detail: "Flight tickets to and from Korea included." },
      { title: "Settlement Allowance", detail: "One-time arrival grant to set up in Korea." },
      { title: "Monthly Stipend", detail: "Approximately 1,000,000 KRW per month." },
      { title: "High-Tech & Research Opportunities", detail: "Access to world-class labs and industry-linked research." },
    ],
    requirements: [
      "Minimum 80% marks or 3.0+ CGPA",
      "IELTS / TOEFL or English MOI letter",
      "Personal statement",
      "Study plan",
      "Recommendation letters",
    ],
    process: [
      "Embassy track / university track submission",
      "Document screening",
      "Interview round",
      "Official award notice",
      "D-2 student visa application at the Korean Embassy",
    ],
  },
  {
    slug: "study-in-turkey",
    route: "/study-in-turkey",
    country: "Türkiye",
    title: "Study in Turkey",
    flag: "🇹🇷",
    heroHeadline: "Study in Turkey — Türkiye Bursları & Top Private Universities",
    heroSub:
      "Fully funded government scholarships or affordable private university placements, with clean visa filing at Anatolia.",
    metaTitle: "Study in Turkey | Türkiye Bursları Scholarship & Universities",
    metaDescription:
      "Study in Turkey with Türkiye Bursları scholarships or top private universities: monthly allowance, health insurance, affordable tuition and no strict bank statement issues. Free assessment from Al-Bahr Travels, Lahore.",
    benefits: [
      { title: "Fully Funded Scholarship Options", detail: "Türkiye Bursları covers tuition, housing and stipend." },
      { title: "Affordable Tuition", detail: "Competitive private university fees for self-funded students." },
      { title: "Monthly Allowance", detail: "Regular living stipend for scholarship holders." },
      { title: "Health Insurance", detail: "State health coverage during your studies." },
      { title: "No Strict Bank Statement Issues", detail: "Relaxed financial documentation compared to Europe." },
    ],
    requirements: [
      "Minimum 70% for BS / 75% for Master's or MPhil",
      "English MOI letter or IELTS",
      "Complete transcripts",
      "Valid passport",
      "Research proposal (for MPhil applicants)",
    ],
    process: [
      "Online Türkiye Bursları submission",
      "Academic interview",
      "Final selection",
      "Turkish student visa application at Anatolia Visa Center",
    ],
  },
];

export function getDestination(slug: string): StudyDestination {
  const found = STUDY_DESTINATIONS.find((d) => d.slug === slug);
  if (!found) throw new Error(`Unknown destination: ${slug}`);
  return found;
}
