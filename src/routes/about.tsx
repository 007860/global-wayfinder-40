import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Plane, Stethoscope, FileCheck2 } from "lucide-react";
import { TopUtilityStrip } from "@/components/TopUtilityStrip";
import { BurgerMenu } from "@/components/BurgerMenu";
import { SiteFooter } from "@/components/SiteFooter";
import { LEAD_EMAIL, WHATSAPP_URL, WHATSAPP_DISPLAY, BRAND_NAME } from "@/lib/countries";
import ceoPortrait from "@/assets/portrait-ceo.jpg";
import directorPortrait from "@/assets/portrait-director.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Us — Leadership & Mission | Al-Bahr Travels & Consultants" },
      {
        name: "description",
        content:
          "Meet the leadership of Al-Bahr Travels & Consultants — a Lahore-based premium consultancy engineering seamless global mobility since 2015.",
      },
      { property: "og:title", content: "About Al-Bahr Travels & Consultants" },
      {
        property: "og:description",
        content:
          "Leadership, mission, and operational integrity — the story behind Al-Bahr Travels & Consultants.",
      },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

type Exec = {
  name: string;
  title: string;
  message: string;
  photo: string;
  eyebrow: string;
};

const EXECUTIVES: Exec[] = [
  {
    eyebrow: "01 — Chief Executive Officer",
    name: "Muhammad Khan",
    title: "CEO, Al-Bahr Travels & Consultants",
    photo: ceoPortrait,
    message:
      "At Al-Bahr Travels, we don't just facilitate travel; we engineer seamless global mobility. Our mission is to bridge the gap between premium Pakistani talent and global horizons with absolute transparency, embassy-grade precision, and an unyielding commitment to white-glove consulting.",
  },
  {
    eyebrow: "02 — Director of Operations",
    name: "Mubashir Khan Lungah",
    title: "Director & Gulf Visa Logistics Expert",
    photo: directorPortrait,
    message:
      "Operational integrity and technological innovation are the core pillars of Al-Bahr. In an era where travel compliance and consular dynamics shift rapidly, our team working behind the scenes guarantees that your documentation remains flawless and secure.",
  },
];

function AboutPage() {
  return (
    <main className="min-h-screen">
      <TopUtilityStrip />
      <BurgerMenu />

      {/* Header */}
      <section className="border-b border-white/10 bg-mesh">
        <div className="max-w-6xl mx-auto px-6 pt-28 pb-16">
          <p className="text-xs tracking-[0.35em] text-gold mb-4">ABOUT US · SINCE 2015</p>
          <h1 className="font-display text-4xl sm:text-6xl leading-tight max-w-3xl">
            The people behind{" "}
            <span className="text-gold-gradient">{BRAND_NAME}</span>.
          </h1>
          <p className="mt-6 text-muted-foreground max-w-2xl leading-relaxed">
            A Lahore-based consultancy quietly engineering global mobility for Pakistan's
            most discerning travellers, patients, and professionals — one embassy-grade
            appointment at a time.
          </p>
        </div>
      </section>

      {/* Executive editorial cards */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-24">
        {EXECUTIVES.map((exec, i) => (
          <article
            key={exec.name}
            className={`grid md:grid-cols-12 gap-10 md:gap-14 items-center ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            {/* Portrait */}
            <div className="md:col-span-5">
              <div className="relative mx-auto max-w-sm">
                <div className="absolute -inset-2 bg-gold-gradient opacity-20 blur-2xl rounded-3xl" />
                <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-elev bg-[var(--midnight-light)]">
                  <img
                    src={exec.photo}
                    alt={`${exec.name} — ${exec.title} at Al-Bahr Travels & Consultants`}
                    aria-label={`${exec.name} — ${exec.title} at Al-Bahr Travels & Consultants`}
                    width={768}
                    height={768}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto aspect-square object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--midnight)] to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="md:col-span-7">
              <p className="text-[11px] tracking-[0.3em] text-gold mb-4">{exec.eyebrow}</p>
              <h2 className="font-display text-3xl sm:text-4xl leading-tight">
                {exec.name}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground tracking-wide">
                {exec.title}
              </p>
              <div className="mt-6 h-px w-16 bg-gold-gradient" />
              <blockquote className="mt-6 text-lg sm:text-xl leading-relaxed text-foreground/90 font-display italic">
                “{exec.message}”
              </blockquote>
            </div>
          </article>
        ))}
      </section>

      {/* Bottom actionable links */}
      <section className="border-t border-white/10 bg-[var(--midnight-light)]/60">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="text-xs tracking-[0.3em] text-gold mb-6">CONTINUE · QUICK ACCESS</p>
          <div className="grid md:grid-cols-2 gap-10">
            {/* Service quick links */}
            <div>
              <h3 className="font-display text-2xl mb-5">Our Services</h3>
              <ul className="space-y-3">
                <ServiceLink
                  to="/"
                  hash="flight-booking"
                  icon={<Plane className="size-4" />}
                  label="Air Ticket Booking"
                />
                <ServiceLink
                  to="/"
                  hash="visa-appointments"
                  icon={<FileCheck2 className="size-4" />}
                  label="Visa Appointments"
                />
                <ServiceLink
                  to="/"
                  hash="visa-appointments"
                  icon={<Stethoscope className="size-4" />}
                  label="Medical Appointments (Gulf)"
                />
              </ul>
            </div>

            {/* Direct contact CTAs */}
            <div>
              <h3 className="font-display text-2xl mb-5">Talk to a consultant</h3>
              <div className="flex flex-col gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-xl bg-gold-gradient text-[var(--midnight)] px-5 py-4 font-semibold shadow-gold hover:opacity-95 transition-opacity"
                >
                  <span className="flex items-center gap-3">
                    <MessageCircle className="size-5" />
                    WhatsApp us live
                  </span>
                  <span className="text-xs tracking-widest opacity-80">
                    {WHATSAPP_DISPLAY}
                  </span>
                </a>
                <a
                  href={`mailto:${LEAD_EMAIL}`}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-gold/40 px-5 py-4 font-medium hover:bg-gold/10 transition-colors"
                >
                  <span className="flex items-center gap-3 text-foreground">
                    <Mail className="size-5 text-gold" />
                    Email our consultants
                  </span>
                  <span className="text-xs tracking-widest text-muted-foreground break-all">
                    {LEAD_EMAIL}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function ServiceLink({
  to,
  hash,
  icon,
  label,
}: {
  to: string;
  hash: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <li>
      <Link
        to={to}
        hash={hash}
        className="group flex items-center gap-3 rounded-lg border border-white/10 bg-[var(--midnight)]/40 px-4 py-3 text-sm hover:border-gold/50 hover:bg-gold/5 transition-all"
      >
        <span className="text-gold">{icon}</span>
        <span className="flex-1">{label}</span>
        <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity">
          →
        </span>
      </Link>
    </li>
  );
}
