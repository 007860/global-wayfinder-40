// Focus-city landing pages — one data entry per Pakistan city the company
// serves. Every fact is grounded in the site’s own copy and the live
// December 2026 Umrah groups (35 groups, 1–31 Dec 2026, Lahore + Karachi
// departures, Saudi Arabian Airlines + Fly Jinnah, 14/19/20/21 nights).
// Never invent prices, dates, offers or distances for a city.

export type FocusCity = {
  slug: string;
  route: string;
  city: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSub: string;
  intro: string[];
  decemberNote: string;
  services: { title: string; detail: string; href: string }[];
  steps: { title: string; detail: string }[];
  /** FAQ content for FAQPage schema — answers must match the copy above. */
  faqs: { q: string; a: string }[];
};

const SERVICES: FocusCity["services"] = [
  {
    title: "Umrah & Hajj Packages",
    detail:
      "December 2026 group departures with named Makkah & Madinah hotels, distances from the Haram and full PKR prices.",
    href: "/umrah-packages",
  },
  {
    title: "Global Visit Visas",
    detail:
      "Tourist and business visa files, embassy appointments and cover letters for the UK, USA, Europe and beyond.",
    href: "/countries",
  },
  {
    title: "International Air Ticketing",
    detail: "Competitive airfares, group and labour ticketing, and date-change support.",
    href: "/contact",
  },
  {
    title: "GAMCA / Wafid Medical Appointments",
    detail:
      "Gulf medical fitness appointments at GAMCA/Wafid-approved centres for Saudi Arabia, UAE, Qatar, Bahrain, Oman and Kuwait.",
    href: "/medical-appointments",
  },
  {
    title: "Jobs Abroad",
    detail: "Work-permit jobs in Turkey, Poland and Albania for Pakistani applicants.",
    href: "/jobs",
  },
  {
    title: "Study Abroad",
    detail: "Study guidance for Germany, Italy, China, Hungary, South Korea and Turkey.",
    href: "/study-in-germany",
  },
];

const STEPS: FocusCity["steps"] = [
  {
    title: "Message us on WhatsApp",
    detail:
      "Call or message +92 343 4762264 — tell us your city, travel dates and number of travellers.",
  },
  {
    title: "Get a written quotation",
    detail:
      "We confirm the package, hotel, flights and full PKR price in writing on WhatsApp before any payment.",
  },
  {
    title: "Confirm your booking",
    detail:
      "Visa, return ticket, hotels and transport in Saudi Arabia are arranged, and your consultant stays in touch until you travel.",
  },
];

const OFFICE_FAQ_A =
  "78 E Block, Architect Engineering Housing Society, Lahore, Pakistan 54600. Open Monday–Friday 10 AM–7 PM and Saturday 10 AM–5 PM; closed on Sunday.";

export const CITIES: FocusCity[] = [
  {
    slug: "lahore",
    route: "/umrah-from-lahore",
    city: "Lahore",
    metaTitle: "Umrah from Lahore | December 2026 Groups | AL BAHR HORIZON",
    metaDescription:
      "December 2026 Umrah groups from Lahore on Saudia & Fly Jinnah, named Makkah & Madinah hotels, sharing from PKR 272,999. Book on WhatsApp +92 343 4762264.",
    heroHeadline: "Umrah from Lahore — December 2026 Groups",
    heroSub:
      "31 group departures from Lahore, 1–31 December 2026, on Saudi Arabian Airlines and Fly Jinnah — named Makkah & Madinah hotels, distances from the Haram and full PKR prices.",
    intro: [
      "AL BAHR HORIZON TRAVELS AND CONSULTANTS is based in Lahore — our office is at 78 E Block, Architect Engineering Housing Society, Lahore 54600 — and Lahore is the departure city for our December 2026 Umrah groups. Travellers from Lahore can visit the office in person or book entirely on WhatsApp.",
      "Every December group shows the airline, flight times, Makkah and Madinah hotels with distances from the Haram, and sharing, quad, triple and double prices in PKR. Every booking is confirmed with a written quotation on WhatsApp before any payment.",
    ],
    decemberNote:
      "December 2026 from Lahore: 31 groups depart 1–31 December 2026 — 14, 19, 20 and 21 nights, with 8–12 nights in Makkah and 6–9 nights in Madinah. Sharing from PKR 272,999; double up to PKR 489,999.",
    services: SERVICES,
    steps: STEPS,
    faqs: [
      {
        q: "How much does a December 2026 Umrah package from Lahore cost?",
        a: "Lahore departures in December 2026 start at PKR 272,999 sharing, with quad, triple and double rates on every group. The exact quote is confirmed on WhatsApp before any payment.",
      },
      {
        q: "How do I book an Umrah package from Lahore?",
        a: "Message us on WhatsApp at +92 343 4762264 with your travel dates and number of travellers, or visit our Lahore office at 78 E Block, Architect Engineering Housing Society. Every booking is confirmed with a written quotation on WhatsApp before any payment.",
      },
      {
        q: "What services does AL BAHR HORIZON offer in Lahore?",
        a: "Umrah and Hajj packages, global visit visas, international air ticketing, GAMCA/Wafid medical appointments, jobs abroad and study abroad guidance — all from our Lahore office.",
      },
      {
        q: "Where is the AL BAHR HORIZON office in Lahore?",
        a: OFFICE_FAQ_A,
      },
    ],
  },
  {
    slug: "islamabad",
    route: "/umrah-from-islamabad",
    city: "Islamabad",
    metaTitle: "Umrah from Islamabad | Travel Agent | AL BAHR HORIZON",
    metaDescription:
      "Umrah packages, visit visas, GAMCA appointments, air ticketing, jobs abroad and study in Germany for travellers from Islamabad. WhatsApp +92 343 4762264.",
    heroHeadline: "Umrah & Travel Services for Islamabad",
    heroSub:
      "December 2026 Umrah groups, visit visas, embassy appointments, GAMCA/Wafid medical appointments, air ticketing, jobs abroad and study in Germany — served from our Lahore office and booked on WhatsApp.",
    intro: [
      "Travellers from Islamabad use AL BAHR HORIZON TRAVELS AND CONSULTANTS for Umrah packages, global visit visas, embassy appointments, GAMCA/Wafid medical appointments, international ticketing, jobs abroad and study in Germany. Our office is in Lahore, and every service is booked on WhatsApp and by phone — with a written quotation before any payment.",
      "December 2026 Umrah groups depart from Lahore and Karachi. Travellers from Islamabad book the same packages, and we arrange their travel from Islamabad — message us on WhatsApp for the latest departures and prices.",
    ],
    decemberNote:
      "December 2026 Umrah groups depart from Lahore (31 groups, 1–31 December 2026) and Karachi (4 groups) on Saudi Arabian Airlines and Fly Jinnah, 14–21 nights, sharing from PKR 248,999. Travellers from Islamabad book the same packages — ask on WhatsApp.",
    services: SERVICES,
    steps: STEPS,
    faqs: [
      {
        q: "How do I book an Umrah package from Islamabad?",
        a: "Message us on WhatsApp at +92 343 4762264 with your travel dates and number of travellers. December 2026 groups depart from Lahore and Karachi, and we arrange your travel from Islamabad with the same packages. Every booking is confirmed with a written quotation before any payment.",
      },
      {
        q: "How much does a December 2026 Umrah package cost?",
        a: "December 2026 groups are priced from PKR 248,999 sharing, depending on departure city, hotel and room type. The exact quote for travel from Islamabad is confirmed on WhatsApp before any payment.",
      },
      {
        q: "What services does AL BAHR HORIZON offer in Islamabad?",
        a: "Umrah and Hajj packages, global visit visas and embassy appointments, international air ticketing, GAMCA/Wafid medical appointments, jobs abroad and study abroad guidance.",
      },
      {
        q: "Where is the AL BAHR HORIZON office?",
        a: `${OFFICE_FAQ_A} Travellers from Islamabad are served on WhatsApp and by phone.`,
      },
    ],
  },
  {
    slug: "bahawalnagar",
    route: "/umrah-from-bahawalnagar",
    city: "Bahawalnagar",
    metaTitle: "Umrah from Bahawalnagar | Travel Agent | AL BAHR HORIZON",
    metaDescription:
      "Umrah packages, visit visas, GAMCA appointments, air ticketing, jobs abroad and study in Germany for travellers from Bahawalnagar. WhatsApp +92 343 4762264.",
    heroHeadline: "Umrah & Travel Services for Bahawalnagar",
    heroSub:
      "December 2026 Umrah groups, visit visas, GAMCA/Wafid medical appointments, air ticketing, jobs abroad and study in Germany — served from our Lahore office and booked on WhatsApp.",
    intro: [
      "Travellers from Bahawalnagar use AL BAHR HORIZON TRAVELS AND CONSULTANTS for Umrah packages, global visit visas, international ticketing, GAMCA/Wafid medical appointments, jobs abroad and study in Germany. Our office is in Lahore, and every service is booked on WhatsApp and by phone — with a written quotation before any payment.",
      "Families and groups from Bahawalnagar can book together — tell us the number of travellers on WhatsApp and we will quote sharing, quad, triple and double rates for your group. December 2026 Umrah groups depart from Lahore and Karachi.",
    ],
    decemberNote:
      "December 2026 Umrah groups depart from Lahore (31 groups, 1–31 December 2026) and Karachi (4 groups) on Saudi Arabian Airlines and Fly Jinnah, 14–21 nights, sharing from PKR 248,999. Travellers from Bahawalnagar book the same packages — ask on WhatsApp.",
    services: SERVICES,
    steps: STEPS,
    faqs: [
      {
        q: "How do I book an Umrah package from Bahawalnagar?",
        a: "Message us on WhatsApp at +92 343 4762264 with your travel dates and number of travellers. December 2026 groups depart from Lahore and Karachi, and we arrange your travel from Bahawalnagar with the same packages. Every booking is confirmed with a written quotation before any payment.",
      },
      {
        q: "How much does a December 2026 Umrah package cost?",
        a: "December 2026 groups are priced from PKR 248,999 sharing, depending on departure city, hotel and room type. The exact quote for travel from Bahawalnagar is confirmed on WhatsApp before any payment.",
      },
      {
        q: "What services does AL BAHR HORIZON offer in Bahawalnagar?",
        a: "Umrah and Hajj packages, global visit visas, international air ticketing, GAMCA/Wafid medical appointments, jobs abroad and study abroad guidance.",
      },
      {
        q: "Where is the AL BAHR HORIZON office?",
        a: `${OFFICE_FAQ_A} Travellers from Bahawalnagar are served on WhatsApp and by phone.`,
      },
    ],
  },
  {
    slug: "marla-chowk",
    route: "/umrah-from-marla-chowk",
    city: "Marla Chowk",
    metaTitle: "Umrah from Marla Chowk | Travel Agent | AL BAHR HORIZON",
    metaDescription:
      "Umrah packages, visit visas, GAMCA appointments, air ticketing, jobs abroad and study in Germany for travellers from Marla Chowk. WhatsApp +92 343 4762264.",
    heroHeadline: "Umrah & Travel Services for Marla Chowk",
    heroSub:
      "December 2026 Umrah groups, visit visas, GAMCA/Wafid medical appointments, air ticketing, jobs abroad and study in Germany — served from our Lahore office and booked on WhatsApp.",
    intro: [
      "Travellers from Marla Chowk use AL BAHR HORIZON TRAVELS AND CONSULTANTS for Umrah packages, global visit visas, international ticketing, GAMCA/Wafid medical appointments, jobs abroad and study in Germany. Our office is in Lahore, and every service is booked on WhatsApp and by phone — with a written quotation before any payment.",
      "Travellers from Marla Chowk who are going to the Gulf for work can also book GAMCA/Wafid medical appointments with us at approved centres. December 2026 Umrah groups depart from Lahore and Karachi.",
    ],
    decemberNote:
      "December 2026 Umrah groups depart from Lahore (31 groups, 1–31 December 2026) and Karachi (4 groups) on Saudi Arabian Airlines and Fly Jinnah, 14–21 nights, sharing from PKR 248,999. Travellers from Marla Chowk book the same packages — ask on WhatsApp.",
    services: SERVICES,
    steps: STEPS,
    faqs: [
      {
        q: "How do I book an Umrah package from Marla Chowk?",
        a: "Message us on WhatsApp at +92 343 4762264 with your travel dates and number of travellers. December 2026 groups depart from Lahore and Karachi, and we arrange your travel from Marla Chowk with the same packages. Every booking is confirmed with a written quotation before any payment.",
      },
      {
        q: "How much does a December 2026 Umrah package cost?",
        a: "December 2026 groups are priced from PKR 248,999 sharing, depending on departure city, hotel and room type. The exact quote for travel from Marla Chowk is confirmed on WhatsApp before any payment.",
      },
      {
        q: "What services does AL BAHR HORIZON offer in Marla Chowk?",
        a: "Umrah and Hajj packages, global visit visas, international air ticketing, GAMCA/Wafid medical appointments, jobs abroad and study abroad guidance.",
      },
      {
        q: "Where is the AL BAHR HORIZON office?",
        a: `${OFFICE_FAQ_A} Travellers from Marla Chowk are served on WhatsApp and by phone.`,
      },
    ],
  },
  {
    slug: "sahiwal",
    route: "/umrah-from-sahiwal",
    city: "Sahiwal",
    metaTitle: "Umrah from Sahiwal | Travel Agent | AL BAHR HORIZON",
    metaDescription:
      "Umrah packages, visit visas, GAMCA appointments, air ticketing, jobs abroad and study in Germany for travellers from Sahiwal. WhatsApp +92 343 4762264.",
    heroHeadline: "Umrah & Travel Services for Sahiwal",
    heroSub:
      "December 2026 Umrah groups, visit visas, GAMCA/Wafid medical appointments, air ticketing, jobs abroad and study in Germany — served from our Lahore office and booked on WhatsApp.",
    intro: [
      "Travellers from Sahiwal use AL BAHR HORIZON TRAVELS AND CONSULTANTS for Umrah packages, global visit visas, international ticketing, GAMCA/Wafid medical appointments, jobs abroad and study in Germany. Our office is in Lahore, and every service is booked on WhatsApp and by phone — with a written quotation before any payment.",
      "Travellers from Sahiwal can also ask about work-permit jobs in Turkey, Poland and Albania, and about study in Germany, Italy, China, Hungary, South Korea and Turkey. December 2026 Umrah groups depart from Lahore and Karachi.",
    ],
    decemberNote:
      "December 2026 Umrah groups depart from Lahore (31 groups, 1–31 December 2026) and Karachi (4 groups) on Saudi Arabian Airlines and Fly Jinnah, 14–21 nights, sharing from PKR 248,999. Travellers from Sahiwal book the same packages — ask on WhatsApp.",
    services: SERVICES,
    steps: STEPS,
    faqs: [
      {
        q: "How do I book an Umrah package from Sahiwal?",
        a: "Message us on WhatsApp at +92 343 4762264 with your travel dates and number of travellers. December 2026 groups depart from Lahore and Karachi, and we arrange your travel from Sahiwal with the same packages. Every booking is confirmed with a written quotation before any payment.",
      },
      {
        q: "How much does a December 2026 Umrah package cost?",
        a: "December 2026 groups are priced from PKR 248,999 sharing, depending on departure city, hotel and room type. The exact quote for travel from Sahiwal is confirmed on WhatsApp before any payment.",
      },
      {
        q: "What services does AL BAHR HORIZON offer in Sahiwal?",
        a: "Umrah and Hajj packages, global visit visas, international air ticketing, GAMCA/Wafid medical appointments, jobs abroad and study abroad guidance.",
      },
      {
        q: "Where is the AL BAHR HORIZON office?",
        a: `${OFFICE_FAQ_A} Travellers from Sahiwal are served on WhatsApp and by phone.`,
      },
    ],
  },
  {
    slug: "pakpattan",
    route: "/umrah-from-pakpattan",
    city: "Pakpattan",
    metaTitle: "Umrah from Pakpattan | Travel Agent | AL BAHR HORIZON",
    metaDescription:
      "Umrah packages, visit visas, GAMCA appointments, air ticketing, jobs abroad and study in Germany for travellers from Pakpattan. WhatsApp +92 343 4762264.",
    heroHeadline: "Umrah & Travel Services for Pakpattan",
    heroSub:
      "December 2026 Umrah groups, visit visas, GAMCA/Wafid medical appointments, air ticketing, jobs abroad and study in Germany — served from our Lahore office and booked on WhatsApp.",
    intro: [
      "Travellers from Pakpattan use AL BAHR HORIZON TRAVELS AND CONSULTANTS for Umrah packages, global visit visas, international ticketing, GAMCA/Wafid medical appointments, jobs abroad and study in Germany. Our office is in Lahore, and every service is booked on WhatsApp and by phone — with a written quotation before any payment.",
      "Students from Pakpattan can ask about study in Germany, Italy, China, Hungary, South Korea and Turkey, with a free eligibility assessment. December 2026 Umrah groups depart from Lahore and Karachi.",
    ],
    decemberNote:
      "December 2026 Umrah groups depart from Lahore (31 groups, 1–31 December 2026) and Karachi (4 groups) on Saudi Arabian Airlines and Fly Jinnah, 14–21 nights, sharing from PKR 248,999. Travellers from Pakpattan book the same packages — ask on WhatsApp.",
    services: SERVICES,
    steps: STEPS,
    faqs: [
      {
        q: "How do I book an Umrah package from Pakpattan?",
        a: "Message us on WhatsApp at +92 343 4762264 with your travel dates and number of travellers. December 2026 groups depart from Lahore and Karachi, and we arrange your travel from Pakpattan with the same packages. Every booking is confirmed with a written quotation before any payment.",
      },
      {
        q: "How much does a December 2026 Umrah package cost?",
        a: "December 2026 groups are priced from PKR 248,999 sharing, depending on departure city, hotel and room type. The exact quote for travel from Pakpattan is confirmed on WhatsApp before any payment.",
      },
      {
        q: "What services does AL BAHR HORIZON offer in Pakpattan?",
        a: "Umrah and Hajj packages, global visit visas, international air ticketing, GAMCA/Wafid medical appointments, jobs abroad and study abroad guidance.",
      },
      {
        q: "Where is the AL BAHR HORIZON office?",
        a: `${OFFICE_FAQ_A} Travellers from Pakpattan are served on WhatsApp and by phone.`,
      },
    ],
  },
];

export function getCity(slug: string): FocusCity {
  const city = CITIES.find((c) => c.slug === slug);
  if (!city) throw new Error(`Unknown focus city: ${slug}`);
  return city;
}
