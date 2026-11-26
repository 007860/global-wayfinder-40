import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  FileText,
  GraduationCap,
  MapPin,
  MessageCircle,
  Plane,
  Stethoscope,
  Ticket,
  Users,
} from "lucide-react";
import { TopUtilityStrip } from "./TopUtilityStrip";
import { BurgerMenu } from "./BurgerMenu";
import { SiteFooter } from "./SiteFooter";
import { BRANCH_ADDRESS, WHATSAPP_URL } from "@/lib/countries";
import type { Faq } from "@/lib/seo";

const WA_CORPORATE =
  "https://wa.me/923434762264?text=" +
  encodeURIComponent(
    "Assalam-o-Alaikum AL BAHR HORIZON TRAVELS AND CONSULTANTS,\n\nI am enquiring on behalf of our company about business travel / group Umrah for our staff.\n\nPlease share the latest options and prices.",
  );

export const CORPORATE_FAQS: Faq[] = [
  {
    q: "What corporate travel services do you offer?",
    a: "Group Umrah packages for company staff, international and business air ticketing, visit and work visas, GAMCA/Wafid medical appointments for staff travelling to the Gulf, work-permit jobs abroad, and Study in Germany — all from one travel desk in Lahore.",
  },
  {
    q: "Can you arrange group Umrah for our company staff?",
    a: "Yes. We arrange group Umrah packages departing from Lahore and Karachi, with Makkah and Madinah hotel accommodation, transport in Saudi Arabia and group visas. See the latest groups on our Umrah Packages page or message us on WhatsApp at +92 343 4762264 with your dates and the number of travellers.",
  },
  {
    q: "Do you handle business visas for our employees?",
    a: "Yes. We prepare visit and work visa files and embassy appointments for the UK, USA, Europe and beyond. Every file is assessed honestly and the final decision always rests with the embassy.",
  },
  {
    q: "Can you book flights for a whole team?",
    a: "Yes. We book international tickets and group fares for business travel, conferences and staff groups. Message us on WhatsApp at +92 343 4762264 with your destinations, travel dates and the number of travellers for a written quotation.",
  },
  {
    q: "Do you arrange GAMCA medical appointments for staff going to the Gulf?",
    a: "Yes. We book GAMCA/Wafid medical fitness appointments for Saudi Arabia, UAE, Qatar, Bahrain, Oman and Kuwait at approved centres.",
  },
  {
    q: "How do we get a quotation for our company?",
    a: "Message us on WhatsApp at +92 343 4762264 with your destinations, travel dates and number of travellers, or visit our Lahore office at 78 E Block, Architect Engineering Housing Society, Lahore 54600 (Monday–Friday 10 AM–7 PM, Saturday 10 AM–5 PM, Sunday closed). Every booking is confirmed with a written quotation before any payment.",
  },
];

const SERVICES = [
  {
    title: "Group Umrah for Staff",
    detail:
      "Group Umrah packages departing from Lahore and Karachi, with Makkah and Madinah hotels, transport in Saudi Arabia and group visas.",
    href: "/umrah-packages",
    Icon: Users,
  },
  {
    title: "Business Air Ticketing",
    detail:
      "International tickets and group fares for business travel, conferences and staff groups.",
    href: "/contact",
    Icon: Ticket,
  },
  {
    title: "Business & Visit Visas",
    detail:
      "Visit and work visa files and embassy appointments for the UK, USA, Europe and beyond.",
    href: "/countries",
    Icon: FileText,
  },
  {
    title: "GAMCA Medical Appointments",
    detail:
      "GAMCA/Wafid medical fitness appointments for Saudi Arabia, UAE, Qatar, Bahrain, Oman and Kuwait.",
    href: "/medical-appointments",
    Icon: Stethoscope,
  },
  {
    title: "Jobs Abroad & Work Permits",
    detail:
      "Work-permit jobs in Turkey, Poland and Albania for Pakistani applicants.",
    href: "/jobs",
    Icon: Briefcase,
  },
  {
    title: "Study in Germany",
    detail:
      "Study in Germany for Pakistani students — guidance from application to visa file.",
    href: "/study-in-germany",
    Icon: GraduationCap,
  },
];

const FOCUS_CITIES = [
  { city: "Lahore", route: "/umrah-from-lahore" },
  { city: "Islamabad", route: "/umrah-from-islamabad" },
  { city: "Bahawalnagar", route: "/umrah-from-bahawalnagar" },
  { city: "Marla Chowk", route: "/umrah-from-marla-chowk" },
  { city: "Sahiwal", route: "/umrah-from-sahiwal" },
  { city: "Pakpattan", route: "/umrah-from-pakpattan" },
];

const STEPS = [
  {
    title: "Tell us what your company needs",
    detail:
      "Message us on WhatsApp at +92 343 4762264 with your destinations, travel dates and the number of travellers.",
  },
  {
    title: "Receive a written quotation",
    detail:
      "We send a clear written quotation with the options available — every booking is confirmed with a written quotation before any payment.",
  },
  {
    title: "Confirm and travel",
    detail:
      "One point of contact from booking to return — visas, tickets, hotels and appointments handled by our Lahore travel desk.",
  },
];

export function CorporateTravelPage() {
  return (
    <main className="min-h-screen">
      <TopUtilityStrip />
      <BurgerMenu />

      {/* Hero */}
      <section className="relative overflow-hidden bg-mesh border-b border-white/10">
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-20 sm:pt-24 text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs tracking-wider mb-8">
            <Building2 className="size-4 text-gold" />
            <span className="text-foreground/90">CORPORATE TRAVEL — PAKISTAN</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-gold font-semibold">AL BAHR HORIZON</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl leading-[1.08] max-w-4xl mx-auto">
            Business travel, handled for your whole company.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            One travel desk for Pakistani companies: group Umrah for your staff,
            business flights, visas and GAMCA medical appointments — with a written
            quotation before you commit to anything.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WA_CORPORATE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold-gradient text-[var(--midnight)] px-7 py-4 text-sm sm:text-base font-bold hover:opacity-90 transition-opacity shadow-elev"
            >
              <MessageCircle className="size-5" />
              WhatsApp: +92 343 4762264
            </a>
            <Link
              to="/umrah-packages"
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-7 py-4 text-sm sm:text-base font-semibold hover:bg-gold/10 transition-colors"
            >
              View Umrah Packages <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <p className="mt-4 first:mt-0 text-base sm:text-lg text-foreground/90 leading-relaxed max-w-4xl">
          AL BAHR HORIZON TRAVELS AND CONSULTANTS is a SECP-registered private
          limited company based in Lahore. We work with company owners, managers and
          HR and admin teams across Pakistan who need reliable travel arrangements
          for their people — whether that is a group of employees travelling for
          Umrah, a team flying abroad for business, or staff who need visas and
          medical appointments before they travel.
        </p>
        <p className="mt-4 text-base sm:text-lg text-foreground/90 leading-relaxed max-w-4xl">
          Instead of dealing with a different agent for every trip, your company
          gets one point of contact: our Lahore travel desk handles the flights,
          the visas, the hotels and the appointments, and confirms every booking
          with a written quotation on WhatsApp before any payment.
        </p>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-6 pb-20" aria-labelledby="services-heading">
        <p className="text-xs tracking-[0.3em] text-gold mb-3">SERVICES FOR COMPANIES</p>
        <h2 id="services-heading" className="font-display text-3xl sm:text-4xl">
          Everything your team needs, <span className="text-gold-gradient">in one place</span>
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = s.Icon;
            return (
              <Link
                key={s.title}
                to={s.href}
                className="glass rounded-2xl p-6 border border-white/10 hover:border-gold/40 transition-colors"
              >
                <Icon className="size-6 text-gold" />
                <h3 className="mt-4 font-display text-xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.detail}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-gold">
                  Learn more <ArrowRight className="size-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Group Umrah for staff */}
      <section className="border-y border-white/10 bg-[var(--midnight-light)]/40" aria-labelledby="umrah-heading">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="text-xs tracking-[0.3em] text-gold mb-3">GROUP UMRAH FOR YOUR TEAM</p>
          <h2 id="umrah-heading" className="font-display text-3xl sm:text-4xl">
            Group Umrah <span className="text-gold-gradient">for your staff</span>
          </h2>
          <p className="mt-4 max-w-3xl text-foreground/90 leading-relaxed">
            Many Pakistani companies send groups of employees for Umrah together.
            We arrange group Umrah packages departing from Lahore and Karachi, with
            Makkah and Madinah hotel accommodation, transport in Saudi Arabia and
            group visas — and a single quotation for the whole group. See the latest
            groups on our Umrah Packages page.
          </p>
          <Link
            to="/umrah-packages"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-gradient text-[var(--midnight)] px-7 py-4 text-sm sm:text-base font-bold hover:opacity-90 transition-opacity shadow-elev"
          >
            <Plane className="size-5" />
            See all Umrah packages
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-20" aria-labelledby="booking-heading">
        <p className="text-xs tracking-[0.3em] text-gold mb-3">HOW IT WORKS</p>
        <h2 id="booking-heading" className="font-display text-3xl sm:text-4xl">
          Book for your company in <span className="text-gold-gradient">three steps</span>
        </h2>
        <ol className="mt-10 space-y-4">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex items-start gap-5 rounded-2xl border border-white/10 p-5 hover:border-gold/40 transition-colors">
              <span className="size-10 shrink-0 rounded-full bg-gold-gradient text-[var(--midnight)] font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-lg sm:text-xl">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="border-y border-white/10 bg-[var(--midnight-light)]/40" aria-labelledby="faq-heading">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-xs tracking-[0.3em] text-gold mb-3">FREQUENTLY ASKED QUESTIONS</p>
          <h2 id="faq-heading" className="font-display text-3xl sm:text-4xl">
            Questions from <span className="text-gold-gradient">companies</span>
          </h2>
          <div className="mt-10 space-y-6 max-w-4xl">
            {CORPORATE_FAQS.map((f) => (
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

      {/* Cities + contact */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-display text-3xl sm:text-4xl">
          Serving companies <span className="text-gold-gradient">across Pakistan</span>
        </h2>
        <p className="mt-4 max-w-3xl text-foreground/90 leading-relaxed">
          Our office is in Lahore, and we serve companies in Lahore, Islamabad,
          Bahawalnagar, Marla Chowk, Sahiwal, Pakpattan and across Pakistan.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {FOCUS_CITIES.map((o) => (
            <Link
              key={o.city}
              to={o.route}
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-sm font-semibold hover:bg-gold/10 transition-colors"
            >
              <MapPin className="size-4 text-gold" /> Umrah from {o.city}
            </Link>
          ))}
        </div>
        <div className="mt-12 glass rounded-2xl border border-white/10 p-6 sm:p-8">
          <h3 className="font-display text-2xl">Visit or contact our Lahore office</h3>
          <p className="mt-2 text-muted-foreground">{BRANCH_ADDRESS}</p>
          <p className="mt-1 text-muted-foreground">
            Monday–Friday 10 AM–7 PM, Saturday 10 AM–5 PM, Sunday closed.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold-gradient text-[var(--midnight)] px-6 py-3 text-sm font-bold hover:opacity-90 transition-opacity"
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
          <p className="mt-6 text-sm text-muted-foreground">
            Are you a travel broker or sub-agent? See our{" "}
            <Link to="/b2b" className="text-gold underline">
              B2B partner programme
            </Link>
            .
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
