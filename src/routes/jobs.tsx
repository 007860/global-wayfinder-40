import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { TopUtilityStrip } from "@/components/TopUtilityStrip";
import { BurgerMenu } from "@/components/BurgerMenu";
import { SiteFooter } from "@/components/SiteFooter";
import { JobOffers } from "@/components/JobOffers";
import { JOB_OFFERS, type JobOffer } from "@/lib/job-offers";

const SITE_URL = "https://https-al-bahr-travels-consultants.lovable.app";
const COUNTRY_CODE: Record<JobOffer["country"], string> = {
  Turkey: "TR",
  Poland: "PL",
  Albania: "AL",
};

function postingDescription(o: JobOffer) {
  return [
    `${o.title} — legal work permit opportunity in ${o.country} for Pakistani workers, recruited by Al-Bahr Travels & Consultants (Pvt.) Ltd., Lahore, Pakistan.`,
    `Roles: ${o.roles.join(", ")}.`,
    `Salary as per the official offer: ${o.salary}.`,
    o.gender ? `Open to: ${o.gender}.` : "",
    o.age ? `Age limit: ${o.age}.` : "",
    `Benefits: ${o.benefits.join(", ")}.`,
    o.note ? `Note: ${o.note}` : "",
    "To apply, contact Al-Bahr Travels & Consultants on WhatsApp +92 343 476 2264 (office) or +92 325 793 8125 (CEO), or visit 78 E Block, Architect Engineering Housing Society, Lahore, Pakistan. Final fees and processing timeline are confirmed on WhatsApp before any payment.",
  ]
    .filter(Boolean)
    .join(" ");
}

const jobPostingSchemas: Record<string, unknown>[] = JOB_OFFERS.map((o) => {
  const schema: Record<string, unknown> = {
    "@type": "JobPosting",
    title: `${o.title} — Work Permit Jobs for Pakistani Workers`,
    description: postingDescription(o),
    datePosted: new Date().toISOString().slice(0, 10),
    employmentType: "FULL_TIME",
    directApply: true,
    hiringOrganization: {
      "@type": "Organization",
      name: "Al-Bahr Travels & Consultants (Pvt.) Ltd.",
      url: SITE_URL,
    },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressCountry: COUNTRY_CODE[o.country] },
    },
    applicationContact: {
      "@type": "ContactPoint",
      contactType: "WhatsApp",
      telephone: "+92-343-4762264",
      url: "https://wa.me/923434762264",
    },
  };
  if (o.baseSalary) {
    schema.baseSalary = {
      "@type": "MonetaryAmount",
      currency: o.baseSalary.currency,
      value: {
        "@type": "QuantitativeValue",
        unitText: "MONTH",
        ...(o.baseSalary.max
          ? { minValue: o.baseSalary.min, maxValue: o.baseSalary.max }
          : { value: o.baseSalary.value }),
      },
    };
  }
  return schema;
});

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      {
        title: "Jobs Abroad for Pakistanis | Turkey, Poland, Albania Work Permits — Al-Bahr",
      },
      {
        name: "description",
        content:
          "Jobs abroad for Pakistanis: legal work permit jobs in Turkey, Poland & Albania — garments, packing, agriculture, construction, engineers & IT. Apply on WhatsApp from Lahore.",
      },
      {
        property: "og:title",
        content: "Jobs Abroad for Pakistanis — Turkey, Poland & Albania Work Permits",
      },
      {
        property: "og:description",
        content:
          "Legal work permit jobs for Pakistani workers in Turkey, Poland and Albania — garments factory, packing, agriculture, construction and professional roles. Direct hiring from Pakistan, apply on WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/jobs` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/jobs` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Jobs Abroad for Pakistanis",
                  item: `${SITE_URL}/jobs`,
                },
              ],
            },
            {
              "@type": "ItemList",
              name: "Jobs Abroad for Pakistanis — Work Permit Offers",
              itemListElement: JOB_OFFERS.map((o, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: o.title,
                url: `${SITE_URL}/jobs#${o.id}`,
              })),
            },
            ...jobPostingSchemas,
          ],
        }),
      },
    ],
  }),
  component: JobsPage,
});

function JobsPage() {
  return (
    <main className="min-h-screen">
      <TopUtilityStrip />
      <BurgerMenu />
      <section className="bg-[#0F172A] text-white px-4 sm:px-8 pt-24 pb-6 text-center">
        <p className="text-[11px] tracking-[0.35em] text-[#D4AF37]">
          OVERSEAS JOBS · WORK PERMITS · 2026
        </p>
        <h1 className="font-display text-3xl sm:text-5xl mt-3 max-w-4xl mx-auto">
          Jobs Abroad for Pakistanis — <span className="text-[#D4AF37]">Work Permits</span> in
          Turkey, Poland &amp; Albania
        </h1>
        <p className="text-sm text-white/65 mt-4 max-w-2xl mx-auto">
          Legal work permit jobs for Pakistani workers in Turkey, Poland and Albania — garments
          factory, packing, agriculture, construction, restaurant, cleaning, engineering and IT
          roles. Direct hiring from Pakistan with free food, accommodation and medical on many
          offers. Apply live on WhatsApp from any city in Pakistan.
        </p>
      </section>
      <JobOffers />
      <JobsContent />
      <SiteFooter />
    </main>
  );
}

const APPLY_STEPS = [
  {
    title: "1. Choose your offer",
    text: "Pick a country and role above — Turkey, Poland or Albania. Every offer shows the exact salary, age limit and benefits from our official flyer.",
  },
  {
    title: "2. Book on WhatsApp or visit the office",
    text: "Tap Book Now to send your booking on WhatsApp (Office 03434762264 or CEO 03257938125), or visit us at 78 E Block, Architect Engineering Housing Society, Lahore.",
  },
  {
    title: "3. Documents & processing",
    text: "Our team guides you through the documents and step-by-step payment plan. The full timeline and final fees are confirmed on WhatsApp before any payment.",
  },
  {
    title: "4. Visa & fly",
    text: "After the work permit and visa are issued, you travel to your job abroad with the food, accommodation and medical benefits listed on your offer.",
  },
];

const FAQS = [
  {
    q: "Which countries offer work permit jobs for Pakistanis through Al-Bahr?",
    a: "Our current official offers are work permit jobs in Turkey, Poland and Albania for Pakistani workers — garments factory, packing, agriculture, warehouse, construction, restaurant, cleaning, parlor, engineering, IT and banking roles.",
  },
  {
    q: "What salary can a Pakistani worker earn abroad?",
    a: "As per our official flyers: Turkey garments and packing jobs pay PKR 180,000 per month, Turkey general workers earn TRY 28,000 per month, and Albania jobs pay €1,200–€1,600 per month. Poland salaries are confirmed on request.",
  },
  {
    q: "Is there any fee before the work permit?",
    a: "For Turkey general workers our flyer clearly states no fee is charged before the work permit is issued. Other offers follow a payment plan such as 60% advance and 40% after visa — the exact plan is confirmed on WhatsApp before any payment.",
  },
  {
    q: "Can women apply for jobs abroad?",
    a: "Yes — the Turkey biscuit and cookie packing offer is for ladies aged 18–40, with age relaxation possible. The Poland professional permit accepts both males and females.",
  },
  {
    q: "How do I apply for a job abroad from Pakistan?",
    a: "Book directly on this page with the Book Now button — your booking reaches our office on WhatsApp and we contact you. You can also call 03434762264 or visit 78 E Block, Architect Engineering Housing Society, Lahore, Pakistan.",
  },
];

function JobsContent() {
  return (
    <section className="bg-[#0F172A] text-white px-4 sm:px-8 pb-16">
      <div className="max-w-3xl mx-auto space-y-10">
        <div>
          <h2 className="font-display text-2xl text-[#D4AF37]">
            How to Apply for Jobs Abroad from Pakistan
          </h2>
          <div className="mt-4 space-y-3">
            {APPLY_STEPS.map((s) => (
              <div key={s.title}>
                <p className="font-semibold text-sm">{s.title}</p>
                <p className="text-sm text-white/65 mt-0.5">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl text-[#D4AF37]">Turkey Jobs for Pakistani Workers</h2>
          <p className="text-sm text-white/65 mt-3">
            Turkey is one of the easiest countries for Pakistani workers to get legal jobs right
            now. Our current Turkey offers include garments factory jobs (PKR 180,000/month),
            biscuit and cookie packing jobs for ladies (PKR 180,000/month), garment factory
            workers — sewing machine operators, packing, steel press and stock picker
            (PKR 180,000/month) — and general workers (TRY 28,000/month) on a renewable 1-year
            contract with 8-hour duty. Most Turkey offers include free food, free accommodation,
            free transport and free medical, with direct hiring from Pakistan.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-[#D4AF37]">Poland Work Permit for Pakistanis</h2>
          <p className="text-sm text-white/65 mt-3">
            Our Poland work permit covers agriculture, restaurant work, warehouse packing and
            construction — plus a professional track for engineers, IT persons, bankers with an
            easy step-by-step payment plan. Accommodation, food facility and health insurance are
            provided. Salaries are confirmed on request before any payment.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-[#D4AF37]">Albania Jobs for Pakistani Workers</h2>
          <p className="text-sm text-white/65 mt-3">
            Albania offers €1,200–€1,600 per month for parlor and hair camp jobs, cleaners,
            helpers, restaurant workers, bar and coffee attendants and general workers — with free
            shared accommodation, food at work, medical insurance and transportation support.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-[#D4AF37]">
            Frequently Asked Questions — Jobs Abroad for Pakistanis
          </h2>
          <div className="mt-4 space-y-5">
            {FAQS.map((f) => (
              <div key={f.q}>
                <p className="font-semibold text-sm">{f.q}</p>
                <p className="text-sm text-white/65 mt-1">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 p-5 text-center">
          <h2 className="font-display text-xl">
            Ready to apply for a job abroad? Talk to us on WhatsApp.
          </h2>
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
        </div>
      </div>
    </section>
  );
}
