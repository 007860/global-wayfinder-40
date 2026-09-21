import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { TopUtilityStrip } from "@/components/TopUtilityStrip";
import { BurgerMenu } from "@/components/BurgerMenu";
import { SiteFooter } from "@/components/SiteFooter";
import { SocialIcons } from "@/components/SocialIcons";
import {
  BRANCH_ADDRESS,
  BRAND_NAME,
  LEAD_EMAIL,
  WHATSAPP_URL,
  WHATSAPP_DISPLAY,
} from "@/lib/countries";

const SITE_URL = "https://https-al-bahr-travels-consultants.lovable.app";
const PHONE_HREF = "tel:+923434762264";
const PHONE_DISPLAY = "0343 4762264";
const MAP_QUERY = encodeURIComponent(
  "Tibbi Lal Baig, Arifwala, District Pakpattan, Punjab, Pakistan 57450",
);
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${MAP_QUERY}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
const MAP_EXTERNAL_URL = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

const OPENING_HOURS = [
  { day: "Monday", hours: "10:00 AM – 7:00 PM" },
  { day: "Tuesday", hours: "10:00 AM – 7:00 PM" },
  { day: "Wednesday", hours: "10:00 AM – 7:00 PM" },
  { day: "Thursday", hours: "10:00 AM – 7:00 PM" },
  { day: "Friday", hours: "10:00 AM – 7:00 PM" },
  { day: "Saturday", hours: "10:00 AM – 5:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

const LOCAL_BUSINESS_LD = {
  "@context": "https://schema.org",
  "@type": ["TravelAgency", "LocalBusiness"],
  name: BRAND_NAME,
  description:
    "Arifwala-based premium travel and visa consultancy serving Pakistani travellers with embassy-grade visa appointments, Gulf medical bookings, flight reservations, hotel reservations and study-abroad guidance.",
  url: `${SITE_URL}/contact`,
  telephone: "+92 343 4762264",
  email: LEAD_EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Tibbi Lal Baig, Arifwala, District Pakpattan",
    addressLocality: "Arifwala",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "17:00",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+92 343 4762264",
      email: LEAD_EMAIL,
      areaServed: "PK",
      availableLanguage: ["en", "ur"],
      url: WHATSAPP_URL,
    },
  ],
  sameAs: [WHATSAPP_URL],
  priceRange: "$$",
};

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Us — Arifwala Branch | Al-Bahr Travels & Consultants" },
      {
        name: "description",
        content:
          "Visit or call Al-Bahr Travels & Consultants in Arifwala. Branch address, map, business hours, WhatsApp, phone and email for visa, medical, flight and hotel bookings.",
      },
      { property: "og:title", content: "Contact Al-Bahr Travels & Consultants — Arifwala" },
      {
        property: "og:description",
        content:
          "Branch address, map, hours and contact details for Al-Bahr Travels & Consultants in Arifwala.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/contact` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(LOCAL_BUSINESS_LD),
      },
    ],
  }),
});

function ContactPage() {
  return (
    <main className="min-h-screen">
      <TopUtilityStrip />
      <BurgerMenu />

      {/* Header */}
      <section className="border-b border-white/10 bg-mesh">
        <div className="max-w-6xl mx-auto px-6 pt-28 pb-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-deep transition-colors mb-6"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
          <p className="text-xs tracking-[0.35em] text-gold mb-4">GET IN TOUCH</p>
          <h1 className="font-display text-4xl sm:text-6xl leading-tight max-w-3xl">
            Visit our <span className="text-gold-gradient">Arifwala branch</span>.
          </h1>
          <p className="mt-6 text-muted-foreground max-w-2xl leading-relaxed">
            Speak with a consultant in person, by phone, WhatsApp or email. We handle
            visa appointments, Gulf medical bookings, flights, hotels and study-abroad
            guidance from our Arifwala desk.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Contact details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[var(--midnight-light)]/50 p-6">
              <div className="flex items-start gap-4">
                <div className="shrink-0 size-11 rounded-xl bg-gold/10 flex items-center justify-center">
                  <MapPin className="size-5 text-gold" />
                </div>
                <div>
                  <h2 className="font-display text-xl">Branch Address</h2>
                  <p className="mt-1 text-muted-foreground leading-relaxed">{BRANCH_ADDRESS}</p>
                  <a
                    href={MAP_EXTERNAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm text-gold hover:text-gold-deep transition-colors"
                  >
                    Open in Google Maps
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[var(--midnight-light)]/50 p-6">
              <div className="flex items-start gap-4">
                <div className="shrink-0 size-11 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Clock className="size-5 text-gold" />
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-xl">Business Hours</h2>
                  <ul className="mt-3 space-y-2 text-sm">
                    {OPENING_HOURS.map((row) => (
                      <li
                        key={row.day}
                        className="flex justify-between gap-4 text-muted-foreground"
                      >
                        <span className="text-foreground font-medium">{row.day}</span>
                        <span>{row.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[var(--midnight-light)]/50 p-6">
              <h2 className="font-display text-xl mb-4">Direct Contacts</h2>
              <div className="space-y-3">
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-3 text-foreground hover:text-gold transition-colors"
                >
                  <Phone className="size-4 text-gold shrink-0" />
                  <span className="text-sm">{PHONE_DISPLAY}</span>
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground hover:text-gold transition-colors"
                >
                  <MessageCircle className="size-4 text-gold shrink-0" />
                  <span className="text-sm">WhatsApp {WHATSAPP_DISPLAY}</span>
                </a>
                <a
                  href={`mailto:${LEAD_EMAIL}`}
                  className="flex items-center gap-3 text-foreground hover:text-gold transition-colors break-all"
                >
                  <Mail className="size-4 text-gold shrink-0" />
                  <span className="text-sm">{LEAD_EMAIL}</span>
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[var(--midnight-light)]/50 p-6">
              <h2 className="font-display text-xl mb-4">Follow Us</h2>
              <SocialIcons />
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-[var(--midnight-light)]/30 overflow-hidden">
              <div className="aspect-[4/3] w-full relative">
                <iframe
                  title="Al-Bahr Travels & Consultants Arifwala branch location"
                  src={MAP_EMBED_URL}
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-5 border-t border-white/10">
                <p className="text-sm text-muted-foreground">
                  Find us at{" "}
                  <span className="text-foreground font-medium">{BRANCH_ADDRESS}</span>. Parking
                  is available near the society gate; the office is on the main commercial strip.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="border-t border-white/10 bg-[var(--midnight-light)]/60">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <p className="text-xs tracking-[0.3em] text-gold mb-4">READY TO TRAVEL?</p>
          <h2 className="font-display text-3xl sm:text-4xl mb-6">
            Start a conversation on <span className="text-gold-gradient">WhatsApp</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Our Arifwala desk replies during business hours. Share your destination and travel goals
            and a consultant will guide you through the next steps.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gold-gradient text-[var(--midnight)] px-7 py-3.5 font-semibold shadow-gold hover:opacity-95 transition-opacity"
          >
            <MessageCircle className="size-5" />
            Message us on WhatsApp
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
