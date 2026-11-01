// Dedicated per-country jobs landing pages (/jobs/turkey, /jobs/poland,
// /jobs/albania) — exact-match SEO pages for "Turkey/Poland/Albania jobs for
// Pakistani workers". All facts come verbatim from the official flyers in
// src/lib/job-offers.ts; nothing is invented.
import { Link } from "@tanstack/react-router";
import { TopUtilityStrip } from "@/components/TopUtilityStrip";
import { BurgerMenu } from "@/components/BurgerMenu";
import { SiteFooter } from "@/components/SiteFooter";
import { JobOffers } from "@/components/JobOffers";
import { JOB_OFFERS, type JobCountry, type JobOffer } from "@/lib/job-offers";
import { jobPostingSchema } from "@/lib/jobs-seo";
import { SITE_URL, breadcrumbLd } from "@/lib/seo";

type Step = { t: string; x: string };
type Faq = { q: string; a: string };

type CountryPage = {
  path: string;
  breadcrumb: string;
  kicker: string;
  h1: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  intro: string;
  salaryHeading: string;
  salaryText: string;
  rolesHeading: string;
  rolesText: string;
  steps: Step[];
  faqs: Faq[];
};

export const COUNTRY_PAGES: Record<JobCountry, CountryPage> = {
  Turkey: {
    path: "/jobs/turkey",
    breadcrumb: "Turkey Jobs for Pakistani Workers",
    kicker: "TURKEY WORK PERMITS · DIRECT HIRING FROM PAKISTAN · 2026",
    h1: "Turkey Jobs for Pakistani Workers — Work Permit Jobs 2026",
    title: "Turkey Jobs for Pakistani Workers 2026 | Work Permit Salaries — Al-Bahr",
    description:
      "Turkey jobs for Pakistani workers: legal work permit jobs — garments factory PKR 180,000/month, ladies packing jobs, general workers TRY 28,000/month. Apply on WhatsApp from Lahore.",
    ogTitle: "Turkey Jobs for Pakistani Workers — Legal Work Permits 2026",
    ogDescription:
      "Garments, packing and general worker jobs in Turkey for Pakistanis — salaries, age limits and benefits exactly as per our official flyers. Direct hiring from Pakistan, apply on WhatsApp.",
    intro:
      "Al-Bahr Travels recruits Pakistani workers for legal Turkey work permit jobs — garments factory work, biscuit and cookie packing, sewing machine operators and general labour. The salaries below are taken directly from our official Turkey job flyers, with free food, accommodation and medical on most offers. Book live on WhatsApp from any city in Pakistan.",
    salaryHeading: "Turkey Job Salary for Pakistani Workers",
    salaryText:
      "As per our official Turkey flyers: garments factory jobs pay PKR 180,000 per month; biscuit and cookie packing jobs (ladies only) pay PKR 180,000 per month; garment factory workers — sewing machine operators, packing, steel press, loading and unloading, stock picker and stock dispatcher — pay PKR 180,000 per month; and general workers earn TRY 28,000 per month (Turkish Lira) on a renewable 1-year contract with 8-hour duty. Your final offer and contract are confirmed on WhatsApp before any payment.",
    rolesHeading: "Turkey Work Permit Roles Open Right Now",
    rolesText:
      "Cutting and sewing in a garments factory · biscuit and cookie packing workers (ladies only, 18–40 years, age relaxation possible) · sewing machine operators, garment and packing workers, steel press and stock handling (males, 19–40 years) · general labour (males, 18–50 years). Most Turkey offers include free food, free accommodation, free transport and free medical, with direct hiring from Pakistan.",
    steps: [
      {
        t: "1. Choose your Turkey job",
        x: "Compare the live Turkey offers above — the salary, age limit and benefits shown are exactly as printed on our official flyers.",
      },
      {
        t: "2. Book on WhatsApp or visit the office",
        x: "Tap Book Now to send your booking on WhatsApp (Office 03434762264 or CEO 03257938125), or visit us at 78 E Block, Architect Engineering Housing Society, Lahore.",
      },
      {
        t: "3. Documents & processing",
        x: "Our team guides you through the documents and the step-by-step payment plan for your Turkey offer. The full timeline and final fees are confirmed on WhatsApp before any payment.",
      },
      {
        t: "4. Work permit & fly",
        x: "After the Turkey work permit and visa are issued, you travel to your job with the food, accommodation and medical benefits shown on your offer.",
      },
    ],
    faqs: [
      {
        q: "How can I get a Turkey job from Pakistan?",
        a: "Book directly on this page with the Book Now button — your booking reaches our office on WhatsApp and our team contacts you. You can also call 03434762264 or visit 78 E Block, Architect Engineering Housing Society, Lahore, Pakistan.",
      },
      {
        q: "What is the Turkey job salary for Pakistani workers?",
        a: "As per our official Turkey flyers: garments factory, packing and sewing jobs pay PKR 180,000 per month, and general workers earn TRY 28,000 per month. Your final contract is confirmed on WhatsApp before any payment.",
      },
      {
        q: "Is there any fee before the Turkey work permit is issued?",
        a: "For Turkey general workers our flyer clearly states no fee is charged before the work permit is issued. Other Turkey offers follow a payment plan such as 60% advance and 40% after visa — the exact plan is confirmed on WhatsApp before any payment.",
      },
      {
        q: "Can ladies apply for Turkey jobs?",
        a: "Yes — the Turkey biscuit and cookie packing offer is for ladies aged 18–40, with age relaxation possible, and includes free food and free accommodation.",
      },
      {
        q: "What documents do I need for a Turkey work permit job?",
        a: "Every offer needs a valid passport. The exact document list and processing timeline for your chosen offer are confirmed by our team on WhatsApp before any payment.",
      },
    ],
  },
  Poland: {
    path: "/jobs/poland",
    breadcrumb: "Poland Work Permit Jobs for Pakistanis",
    kicker: "POLAND WORK PERMITS · LEGAL JOBS FOR PAKISTANIS · 2026",
    h1: "Poland Work Permit Jobs for Pakistani Workers 2026",
    title: "Poland Work Permit Jobs for Pakistanis 2026 | Legal Process — Al-Bahr",
    description:
      "Poland work permit jobs for Pakistani workers — agriculture, restaurant, warehouse packing, construction, plus engineers, IT and bankers. Legal process, accommodation and health insurance. Apply on WhatsApp.",
    ogTitle: "Poland Work Permit Jobs for Pakistani Workers — Legal Process 2026",
    ogDescription:
      "Agriculture, restaurant, warehouse packing and construction jobs in Poland, plus a professional track for engineers, IT and bankers. Legal work permit, accommodation and health insurance. Apply on WhatsApp.",
    intro:
      "Our Poland work permit programme runs on two tracks: worker roles in agriculture, restaurants, warehouse packing and construction, and a professional track for engineers, IT persons and bankers. Both are legal work permit processes with accommodation, food facility and health insurance provided, and an easy step-by-step payment plan.",
    salaryHeading: "Poland Work Permit Salary for Pakistanis",
    salaryText:
      "Poland salaries are confirmed on request — the final salary, contract and payment plan for your chosen role are confirmed on WhatsApp before any payment. We never quote a figure that is not on our official offer.",
    rolesHeading: "Poland Roles Open to Pakistani Applicants",
    rolesText:
      "Worker track: agriculture, restaurant work, warehouse packing and construction. Professional track: engineers, IT persons and bankers. Both tracks accept males and females, with accommodation, food facility and health insurance provided.",
    steps: [
      {
        t: "1. Choose your Poland role",
        x: "Compare the live Poland work permit offers above — roles, benefits and process details are exactly as printed on our official flyers.",
      },
      {
        t: "2. Book on WhatsApp or visit the office",
        x: "Tap Book Now to send your booking on WhatsApp (Office 03434762264 or CEO 03257938125), or visit us at 78 E Block, Architect Engineering Housing Society, Lahore.",
      },
      {
        t: "3. Documents & processing",
        x: "Our team guides you through the documents and the easy step-by-step payment plan. The full timeline and final fees are confirmed on WhatsApp before any payment.",
      },
      {
        t: "4. Work permit & fly",
        x: "After the Poland work permit and visa are issued, you travel to your job with accommodation, food facility and health insurance as shown on your offer.",
      },
    ],
    faqs: [
      {
        q: "Which Poland jobs are open to Pakistani workers?",
        a: "Our Poland work permit covers agriculture, restaurant work, warehouse packing and construction, plus a professional track for engineers, IT persons and bankers.",
      },
      {
        q: "What salary will I get in Poland?",
        a: "Poland salaries are confirmed on request — the final figure for your chosen role is confirmed on WhatsApp before any payment, so you always know the exact amount before you commit.",
      },
      {
        q: "Can women apply for the Poland work permit?",
        a: "Yes — the Poland professional work permit accepts both males and females.",
      },
      {
        q: "How does the Poland payment plan work?",
        a: "Our Poland offer follows an easy step-by-step payment plan, 100% genuine jobs with a legal and safe process. The exact plan is confirmed on WhatsApp before any payment.",
      },
    ],
  },
  Albania: {
    path: "/jobs/albania",
    breadcrumb: "Albania Jobs for Pakistani Workers",
    kicker: "ALBANIA WORK PERMITS · LEGAL JOBS FOR PAKISTANIS · 2026",
    h1: "Albania Jobs for Pakistani Workers — Work Permit Jobs 2026",
    title: "Albania Jobs for Pakistani Workers 2026 | €1,200–€1,600 Salary — Al-Bahr",
    description:
      "Albania work permit jobs for Pakistanis: parlor and hair camp, cleaner, helper, restaurant, bar & coffee attendant, general worker — €1,200–€1,600/month with accommodation and medical. Apply on WhatsApp.",
    ogTitle: "Albania Jobs for Pakistani Workers — €1,200–€1,600 Per Month 2026",
    ogDescription:
      "Legal Albania work permit jobs for Pakistanis — parlor and hair camp, cleaner, helper, restaurant, bar and coffee attendant and general worker roles. Free accommodation, food at work and medical insurance. Apply on WhatsApp.",
    intro:
      "Albania work permit jobs pay €1,200–€1,600 per month for parlor and hair camp jobs, cleaners, helpers, restaurant workers, bar and coffee attendants and general workers — with free shared accommodation, food at work, medical insurance and transportation support, all on a legal work permit.",
    salaryHeading: "Albania Job Salary for Pakistani Workers",
    salaryText:
      "As per our official Albania flyer: €1,200–€1,600 per month, with free shared accommodation, food provided at work, medical insurance and transportation support. Your final offer and contract are confirmed on WhatsApp before any payment.",
    rolesHeading: "Albania Roles Open Right Now",
    rolesText:
      "Parlor and hair camp jobs · cleaner · helper · restaurant workers · bar and coffee attendant · general worker — all on a legal Albania work permit.",
    steps: [
      {
        t: "1. Choose your Albania role",
        x: "Compare the live Albania offer above — the salary, roles and benefits shown are exactly as printed on our official flyer.",
      },
      {
        t: "2. Book on WhatsApp or visit the office",
        x: "Tap Book Now to send your booking on WhatsApp (Office 03434762264 or CEO 03257938125), or visit us at 78 E Block, Architect Engineering Housing Society, Lahore.",
      },
      {
        t: "3. Documents & processing",
        x: "Our team guides you through the documents and the payment plan for your Albania offer. The full timeline and final fees are confirmed on WhatsApp before any payment.",
      },
      {
        t: "4. Work permit & fly",
        x: "After the Albania work permit and visa are issued, you travel with free shared accommodation, food at work, medical insurance and transportation support.",
      },
    ],
    faqs: [
      {
        q: "How much is the Albania salary for Pakistani workers?",
        a: "As per our official flyer, Albania jobs pay €1,200–€1,600 per month, with free shared accommodation, food at work, medical insurance and transportation support.",
      },
      {
        q: "What jobs are available in Albania for Pakistanis?",
        a: "Parlor and hair camp jobs, cleaner, helper, restaurant workers, bar and coffee attendant and general worker roles — all on a legal Albania work permit.",
      },
      {
        q: "What benefits does the Albania work permit include?",
        a: "Free shared accommodation, food provided at work, medical insurance, transportation support and a legal work permit.",
      },
      {
        q: "How do I apply for an Albania job from Pakistan?",
        a: "Book directly on this page with the Book Now button — your booking reaches our office on WhatsApp and our team contacts you. You can also call 03434762264 or visit 78 E Block, Architect Engineering Housing Society, Lahore, Pakistan.",
      },
    ],
  },
};

const OTHER: Record<JobCountry, JobCountry> = {
  Turkey: "Poland",
  Poland: "Turkey",
  Albania: "Turkey",
};

/** Route head() payload for a country jobs page. */
export function countryHead(country: JobCountry) {
  const c = COUNTRY_PAGES[country];
  const offers = JOB_OFFERS.filter((o) => o.country === country);
  const shareImg = `${SITE_URL}${offers[0].flyer}`;
  return {
    meta: [
      { title: c.title },
      { name: "description", content: c.description },
      { property: "og:title", content: c.ogTitle },
      { property: "og:description", content: c.ogDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}${c.path}` },
      { property: "og:image", content: shareImg },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: shareImg },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}${c.path}` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Jobs Abroad for Pakistanis", path: "/jobs" },
              { name: c.breadcrumb, path: c.path },
            ]),
            {
              "@type": "ItemList",
              name: `${c.h1} — Live Offers`,
              itemListElement: offers.map((o: JobOffer, i: number) => ({
                "@type": "ListItem",
                position: i + 1,
                name: o.title,
                url: `${SITE_URL}${c.path}#${o.id}`,
              })),
            },
            ...offers.map(jobPostingSchema),
          ],
        }),
      },
    ],
  };
}

export function CountryJobsPage({ country }: { country: JobCountry }) {
  const c = COUNTRY_PAGES[country];
  const sibling = OTHER[country];
  const s = COUNTRY_PAGES[sibling];
  const third = (Object.keys(COUNTRY_PAGES) as JobCountry[]).find((k) => k !== country && k !== sibling)!;
  const t = COUNTRY_PAGES[third];
  return (
    <main className="min-h-screen">
      <TopUtilityStrip />
      <BurgerMenu />
      <section className="bg-[#0F172A] text-white px-4 sm:px-8 pt-24 pb-6 text-center">
        <p className="text-[11px] tracking-[0.35em] text-[#D4AF37]">{c.kicker}</p>
        <h1 className="font-display text-3xl sm:text-5xl mt-3 max-w-4xl mx-auto">{c.h1}</h1>
        <p className="text-sm text-white/65 mt-4 max-w-2xl mx-auto">{c.intro}</p>
      </section>
      <JobOffers fixedCountry={country} />
      <section className="bg-[#0F172A] text-white px-4 sm:px-8 pb-16">
        <div className="max-w-3xl mx-auto space-y-10">
          <div>
            <h2 className="font-display text-2xl text-[#D4AF37]">{c.salaryHeading}</h2>
            <p className="text-sm text-white/65 mt-3">{c.salaryText}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-[#D4AF37]">{c.rolesHeading}</h2>
            <p className="text-sm text-white/65 mt-3">{c.rolesText}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-[#D4AF37]">How to Apply — Step by Step</h2>
            <div className="mt-4 space-y-3">
              {c.steps.map((step) => (
                <div key={step.t}>
                  <p className="font-semibold text-sm">{step.t}</p>
                  <p className="text-sm text-white/65 mt-0.5">{step.x}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl text-[#D4AF37]">Frequently Asked Questions</h2>
            <div className="mt-4 space-y-5">
              {c.faqs.map((f) => (
                <div key={f.q}>
                  <p className="font-semibold text-sm">{f.q}</p>
                  <p className="text-sm text-white/65 mt-1">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 p-5 text-center">
            <h2 className="font-display text-xl">Ready to apply? Talk to us on WhatsApp.</h2>
            <p className="text-sm text-white/70 mt-2">
              Office 03434762264 · CEO 03257938125 · 78 E Block, Architect Engineering Housing
              Society, Lahore, Pakistan
            </p>
            <div className="mt-4 flex flex-wrap gap-3 justify-center">
              <a
                href="https://wa.me/923434762264"
                className="rounded-full bg-[#25D366] text-[#0F172A] px-5 py-2.5 text-sm font-semibold"
              >
                WhatsApp Office
              </a>
              <Link
                to="/contact"
                className="rounded-full border border-[#D4AF37] text-[#D4AF37] px-5 py-2.5 text-sm font-semibold"
              >
                Visit Our Lahore Office
              </Link>
            </div>
            <p className="mt-5 text-sm text-white/60">
              Also explore:{" "}
              <Link to={s.path} className="text-[#D4AF37] hover:underline">
                {s.breadcrumb} →
              </Link>{" "}
              ·{" "}
              <Link to={t.path} className="text-[#D4AF37] hover:underline">
                {t.breadcrumb} →
              </Link>{" "}
              ·{" "}
              <Link to="/jobs" className="text-[#D4AF37] hover:underline">
                All jobs abroad →
              </Link>
            </p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
