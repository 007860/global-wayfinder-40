import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Globe2,
  MapPin,
  MessageCircle,
  Plane,
} from "lucide-react";
import { TopUtilityStrip } from "./TopUtilityStrip";
import { BurgerMenu } from "./BurgerMenu";
import { SiteFooter } from "./SiteFooter";
import { BRANCH_ADDRESS, WHATSAPP_URL } from "@/lib/countries";
import type { Faq } from "@/lib/seo";

const WA_VISAS =
  "https://wa.me/923434762264?text=" +
  encodeURIComponent(
    "Assalam-o-Alaikum AL BAHR HORIZON TRAVELS AND CONSULTANTS,\n\nI want to apply for a visit visa.\n\nPlease share the latest rates and required documents.",
  );

export const VISIT_VISA_FAQS: Faq[] = [
  {
    q: "Which countries' visit visa prices are listed on this page?",
    a: "Asia & Middle East: Malaysia, Indonesia, Thailand, Sri Lanka, Bahrain, Vietnam, Nepal, Bangladesh, Tajikistan and Uzbekistan. Africa: Ethiopia, Kenya, Malawi, Namibia, Tanzania, Uganda, Zimbabwe and Zambia. Every rate on this page is taken from our rate list.",
  },
  {
    q: "Are these visit visa prices final?",
    a: "These are the rates from our rate list, in PKR (Rs.). Please confirm the price on WhatsApp at +92 343 4762264 before booking — rates can change, and every booking is confirmed with a written quotation before any payment.",
  },
  {
    q: "What do Normal and Done Base mean?",
    a: "Normal and Done Base are the two processing options on our rate list. Message us on WhatsApp at +92 343 4762264 and we will tell you which one applies to your case and which documents you need.",
  },
  {
    q: "What documents do I need for a visit visa?",
    a: "It depends on the country and the rate. Most need a passport, picture and ID card; some need a bank statement, an account maintenance letter or bank account details. The documents for each country are listed with its rates on this page.",
  },
  {
    q: "Do you handle visit visas for other countries too?",
    a: "Yes. The countries on this page are the ones with listed rates. For any other country, message us on WhatsApp at +92 343 4762264 and we will share the latest rate and requirements.",
  },
  {
    q: "How do I book a visit visa?",
    a: "Message us on WhatsApp at +92 343 4762264 with your destination and travel dates, or visit our Lahore office at 78 E Block, Architect Engineering Housing Society, Lahore 54600 (Monday–Friday 10 AM–7 PM, Saturday 10 AM–5 PM, Sunday closed). Every booking is confirmed with a written quotation before any payment.",
  },
];

type Rate = { label: string; price: number | null };
type CountryRates = { country: string; rates: Rate[]; docs?: string[]; note?: string };

const ASIA_MIDDLE_EAST: CountryRates[] = [
  {
    country: "Malaysia",
    rates: [
      { label: "Normal", price: 12500 },
      { label: "Done Base (24-48 hrs)", price: 17500 },
      { label: "Multiple (Done Base)", price: 60000 },
      { label: "Reference Number (Clearness)", price: 10000 },
    ],
  },
  {
    country: "Indonesia",
    rates: [
      { label: "Normal (Passport, Pic, ID Card, Bank Statement & Account Maintenance Letter)", price: 22000 },
      { label: "Done Base (Passport, Pic & ID Card)", price: 27000 },
    ],
  },
  {
    country: "Thailand",
    rates: [
      { label: "Normal (Passport, Pic, ID Card, Bank Statement & Account Maintenance Letter)", price: 16000 },
      { label: "Done Base (Passport, Pic, ID Card & Bank Account Details)", price: 42500 },
      { label: "Done Base (Passport, Pic & ID Card)", price: 68000 },
    ],
  },
  {
    country: "Sri Lanka",
    rates: [{ label: "Visa (Passport, Pic, ID Card)", price: 10500 }],
  },
  {
    country: "Bahrain",
    docs: [
      "Docs for Normal (Passport, Pic, ID Card)",
      "Docs for Done Base (Passport, Pic, ID Card & Bank Account Details)",
    ],
    rates: [
      { label: "E-Visa 14 Days Single Entry (Normal) — Processing 7-10 working days", price: 12500 },
      { label: "E-Visa 90 Days Multiple Entry (Normal) — Processing 7-10 working days", price: 16500 },
      { label: "E-Visa 1 Year Multiple Entry (Normal) — Processing 7-10 working days", price: 52000 },
      { label: "E-Visa 14 Days (Done Base) — Processing 7-10 working days", price: 24500 },
      { label: "E-Visa 90 Days (Done Base) — Processing 7-10 working days", price: 33000 },
      { label: "E-Visa 1 Year Multiple (Done Base) — Processing 7-10 working days", price: 55000 },
    ],
    note: "If applicant has an Alethashi name, then Done Base will be applicable (Rates below) 60 / 75 / 110 — as per rate list.",
  },
  {
    country: "Vietnam",
    rates: [
      { label: "Normal (Passport, Pic, ID Card, Bank Statement & Account Maintenance Letter)", price: 12500 },
      { label: "Done Base (Passport, Pic & ID Card)", price: 420 },
    ],
    note: "Done Base is printed as Rs. 420 on the rate list — as per rate list, please confirm the exact price on WhatsApp before booking.",
  },
  {
    country: "Nepal",
    rates: [
      { label: "E-Visa with Docs 15 Days (Normal) (15-18 working days)", price: 18000 },
      { label: "E-Visa without Docs 15 Days (Done Base) (15-18 working days)", price: 22000 },
      { label: "E-Visa with Docs 30 Days (Normal) (15-18 working days)", price: 25000 },
      { label: "E-Visa without Docs 30 Days (Normal) (15-18 working days)", price: 30000 },
    ],
  },
  {
    country: "Bangladesh",
    rates: [
      { label: "Normal", price: 38000 },
      { label: "Done Base", price: 48000 },
    ],
  },
  {
    country: "Tajikistan",
    rates: [
      { label: "Normal", price: 40500 },
      { label: "Done Base", price: 48500 },
    ],
  },
  {
    country: "Uzbekistan",
    rates: [
      { label: "Normal", price: 38000 },
      { label: "Done Base", price: 48500 },
    ],
  },
];

const AFRICA: CountryRates[] = [
  {
    country: "Ethiopia",
    rates: [{ label: "Done Base", price: 25500 }],
  },
  {
    country: "Kenya",
    rates: [{ label: "Done Base", price: 18000 }],
  },
  {
    country: "Malawi",
    rates: [
      { label: "Visa", price: 50500 },
      { label: "Done Base", price: 158000 },
      { label: "Visa", price: 185000 },
    ],
  },
  {
    country: "Namibia",
    rates: [{ label: "Visa", price: 25500 }],
  },
  {
    country: "Tanzania",
    rates: [
      { label: "Visa", price: 25000 },
      { label: "Done Base", price: 85000 },
      { label: "Done Base", price: 135000 },
      { label: "Done Base (Afghani)", price: 165000 },
    ],
  },
  {
    country: "Uganda",
    rates: [{ label: "Done Base", price: 22500 }],
  },
  {
    country: "Zimbabwe",
    rates: [
      { label: "Visa", price: 15000 },
      { label: "Done Base (DOB must be under 2000)", price: 310000 },
      { label: "Done Base (DOB 2000 and above)", price: 340000 },
    ],
  },
  {
    country: "Zambia",
    rates: [
      { label: "Visa", price: 25000 },
      { label: "Done Base", price: 175000 },
    ],
  },
];

const EXTRA_SERVICES = [
  "Visa Processing",
  "Air Tickets",
  "Hotel Booking",
  "Travel Insurance",
  "Forex Services",
  "Travel Consultancy",
];

function fmtPKR(n: number) {
  return `Rs. ${n.toLocaleString("en-US")}`;
}

function CountryCard({ c }: { c: CountryRates }) {
  return (
    <article className="glass rounded-2xl p-6 border border-white/10 hover:border-gold/40 transition-colors">
      <h3 className="font-display text-xl flex items-center gap-2">
        <Globe2 className="size-5 text-gold shrink-0" />
        {c.country}
      </h3>
      {c.docs && (
        <ul className="mt-3 space-y-1">
          {c.docs.map((d) => (
            <li key={d} className="text-xs text-muted-foreground flex items-start gap-1.5">
              <FileText className="size-3.5 text-gold shrink-0 mt-0.5" />
              {d}
            </li>
          ))}
        </ul>
      )}
      <dl className="mt-3 space-y-2">
        {c.rates.map((r, i) => (
          <div
            key={`${r.label}-${i}`}
            className="flex items-start justify-between gap-3 border-t border-white/10 pt-2 first:border-t-0 first:pt-0"
          >
            <dt className="text-sm text-foreground/90 leading-snug">{r.label}</dt>
            <dd className="text-sm font-bold text-gold tabular-nums whitespace-nowrap">
              {r.price != null ? fmtPKR(r.price) : "—"}
            </dd>
          </div>
        ))}
      </dl>
      {c.note && <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{c.note}</p>}
    </article>
  );
}

function RegionSection({
  id,
  eyebrow,
  title,
  intro,
  countries,
  footnote,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  countries: CountryRates[];
  footnote?: string;
}) {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-20" aria-labelledby={id}>
      <p className="text-xs tracking-[0.3em] text-gold mb-3">{eyebrow}</p>
      <h2 id={id} className="font-display text-3xl sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 max-w-3xl text-foreground/90 leading-relaxed">{intro}</p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {countries.map((c) => (
          <CountryCard key={c.country} c={c} />
        ))}
      </div>
      {footnote && <p className="mt-6 text-xs text-muted-foreground leading-relaxed max-w-4xl">{footnote}</p>}
    </section>
  );
}

export function VisitVisasPage() {
  return (
    <main className="min-h-screen">
      <TopUtilityStrip />
      <BurgerMenu />

      {/* Hero */}
      <section className="relative overflow-hidden bg-mesh border-b border-white/10">
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-20 sm:pt-24 text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs tracking-wider mb-8">
            <Plane className="size-4 text-gold" />
            <span className="text-foreground/90">INTERNATIONAL VISIT VISAS — PAKISTAN</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-gold font-semibold">AL BAHR HORIZON</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl leading-[1.08] max-w-4xl mx-auto">
            Visit visa rates, <span className="text-gold-gradient">for the whole world.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Visit visa prices for Asia, the Middle East and Africa — taken from our
            rate list, in PKR. Message us on WhatsApp and we will confirm the latest
            rate and the documents you need before you book.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WA_VISAS}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-book inline-flex items-center gap-2 rounded-full bg-[#25D366] text-[#0F172A] px-7 py-4 text-sm sm:text-base font-bold shadow-elev"
            >
              <MessageCircle className="size-5" />
              WhatsApp: +92 343 4762264
            </a>
            <Link
              to="/countries"
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-7 py-4 text-sm sm:text-base font-semibold hover:bg-gold/10 transition-colors"
            >
              All destinations <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Rates note */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-4">
        <p className="text-base sm:text-lg text-foreground/90 leading-relaxed max-w-4xl">
          All prices below are in PKR (Rs.) and are taken from our rate list. Rates
          can change — please confirm the price on WhatsApp at +92 343 4762264 before
          booking. Every booking is confirmed with a written quotation before any
          payment.
        </p>
      </section>

      {/* Asia & Middle East */}
      <RegionSection
        id="asia-heading"
        eyebrow="ASIA & MIDDLE EAST"
        title={
          <>
            Asia &amp; Middle East, <span className="text-gold-gradient">new destinations</span>
          </>
        }
        intro="Visit visa rates for Malaysia, Indonesia, Thailand, Sri Lanka, Bahrain, Vietnam, Nepal, Bangladesh, Tajikistan and Uzbekistan."
        countries={ASIA_MIDDLE_EAST}
      />

      {/* Africa */}
      <RegionSection
        id="africa-heading"
        eyebrow="AFRICA"
        title={
          <>
            Africa, <span className="text-gold-gradient">diverse cultures</span>
          </>
        }
        intro="Visit visa rates for Ethiopia, Kenya, Malawi, Namibia, Tanzania, Uganda, Zimbabwe and Zambia."
        countries={AFRICA}
        footnote="Some countries have more than one rate listed for the same category — shown exactly as per the company's rate list. Message us on WhatsApp and we will tell you which rate applies to your case."
      />

      {/* Extra services */}
      <section className="border-y border-white/10 bg-[var(--midnight-light)]/40" aria-labelledby="services-heading">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="text-xs tracking-[0.3em] text-gold mb-3">ALSO AT YOUR SERVICE</p>
          <h2 id="services-heading" className="font-display text-3xl sm:text-4xl">
            More than just <span className="text-gold-gradient">a visa</span>
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {EXTRA_SERVICES.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-sm font-semibold"
              >
                <CheckCircle2 className="size-4 text-gold" /> {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-white/10 bg-[var(--midnight-light)]/40" aria-labelledby="faq-heading">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-xs tracking-[0.3em] text-gold mb-3">FREQUENTLY ASKED QUESTIONS</p>
          <h2 id="faq-heading" className="font-display text-3xl sm:text-4xl">
            Questions about <span className="text-gold-gradient">visit visas</span>
          </h2>
          <div className="mt-10 space-y-6 max-w-4xl">
            {VISIT_VISA_FAQS.map((f) => (
              <div key={f.q} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-display text-lg sm:text-xl flex items-start gap-2">
                  <CheckCircle2 className="size-5 text-gold shrink-0 mt-0.5" />
                  {f.q}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-display text-3xl sm:text-4xl">
          Ready to apply? <span className="text-gold-gradient">Talk to us.</span>
        </h2>
        <div className="mt-12 glass rounded-2xl border border-white/10 p-6 sm:p-8">
          <h3 className="font-display text-2xl">Visit or contact our Lahore office</h3>
          <p className="mt-2 text-muted-foreground flex items-start gap-2">
            <MapPin className="size-4 text-gold shrink-0 mt-1" />
            {BRANCH_ADDRESS}
          </p>
          <p className="mt-1 text-muted-foreground">
            Monday–Friday 10 AM–7 PM, Saturday 10 AM–5 PM, Sunday closed.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-book inline-flex items-center gap-2 rounded-full bg-[#25D366] text-[#0F172A] px-6 py-3 text-sm font-bold"
            >
              <MessageCircle className="size-4" /> WhatsApp: +92 343 4762264
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-sm font-semibold hover:bg-gold/10 transition-colors"
            >
              Contact us <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
