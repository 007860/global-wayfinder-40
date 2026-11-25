import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  FileText,
  GraduationCap,
  MapPin,
  MessageCircle,
  Plane,
  Stethoscope,
  Ticket,
} from "lucide-react";
import { TopUtilityStrip } from "./TopUtilityStrip";
import { BurgerMenu } from "./BurgerMenu";
import { SiteFooter } from "./SiteFooter";
import { BRANCH_ADDRESS, WHATSAPP_URL } from "@/lib/countries";
import { CITIES, type FocusCity } from "@/lib/cities";

const SERVICE_ICONS = [Plane, FileText, Ticket, Stethoscope, Briefcase, GraduationCap];

function waLink(city: FocusCity) {
  const text = `Assalam-o-Alaikum AL BAHR HORIZON TRAVELS AND CONSULTANTS,\n\nI am travelling from ${city.city} and would like to enquire about your Umrah packages and travel services.\n\nPlease share the latest prices and departure dates.`;
  return `https://wa.me/923434762264?text=${encodeURIComponent(text)}`;
}

export function CityLandingPage({ city: c }: { city: FocusCity }) {
  const others = CITIES.filter((x) => x.slug !== c.slug);
  return (
    <main className="min-h-screen">
      <TopUtilityStrip />
      <BurgerMenu />

      {/* Hero */}
      <section className="relative overflow-hidden bg-mesh border-b border-white/10">
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-20 sm:pt-24 text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs tracking-wider mb-8">
            <MapPin className="size-4 text-gold" />
            <span className="text-foreground/90">TRAVEL AGENT — {c.city.toUpperCase()}, PAKISTAN</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-gold font-semibold">AL BAHR HORIZON</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl leading-[1.08] max-w-4xl mx-auto">
            {c.heroHeadline}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">{c.heroSub}</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={waLink(c)}
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
              View December Umrah Packages <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        {c.intro.map((p) => (
          <p key={p.slice(0, 24)} className="mt-4 first:mt-0 text-base sm:text-lg text-foreground/90 leading-relaxed max-w-4xl">
            {p}
          </p>
        ))}
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-6 pb-20" aria-labelledby="services-heading">
        <p className="text-xs tracking-[0.3em] text-gold mb-3">SERVICES IN {c.city.toUpperCase()}</p>
        <h2 id="services-heading" className="font-display text-3xl sm:text-4xl">
          Everything you need, <span className="text-gold-gradient">in one place</span>
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.services.map((s, i) => {
            const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
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

      {/* December Umrah note */}
      <section className="border-y border-white/10 bg-[var(--midnight-light)]/40" aria-labelledby="december-heading">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="text-xs tracking-[0.3em] text-gold mb-3">DECEMBER 2026 UMRAH</p>
          <h2 id="december-heading" className="font-display text-3xl sm:text-4xl">
            December Umrah groups <span className="text-gold-gradient">for {c.city}</span>
          </h2>
          <p className="mt-4 max-w-3xl text-foreground/90 leading-relaxed">{c.decemberNote}</p>
          <Link
            to="/umrah-packages"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-gradient text-[var(--midnight)] px-7 py-4 text-sm sm:text-base font-bold hover:opacity-90 transition-opacity shadow-elev"
          >
            <Plane className="size-5" />
            See all December Umrah packages
          </Link>
        </div>
      </section>

      {/* How to book */}
      <section className="max-w-6xl mx-auto px-6 py-20" aria-labelledby="booking-heading">
        <p className="text-xs tracking-[0.3em] text-gold mb-3">HOW TO BOOK</p>
        <h2 id="booking-heading" className="font-display text-3xl sm:text-4xl">
          Book from {c.city} in <span className="text-gold-gradient">three steps</span>
        </h2>
        <ol className="mt-10 space-y-4">
          {c.steps.map((step, i) => (
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
            Questions from <span className="text-gold-gradient">{c.city}</span>
          </h2>
          <div className="mt-10 space-y-6 max-w-4xl">
            {c.faqs.map((f) => (
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

      {/* Other cities + contact */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-display text-3xl sm:text-4xl">
          Also serving <span className="text-gold-gradient">travellers across Pakistan</span>
        </h2>
        <div className="mt-8 flex flex-wrap gap-3">
          {others.map((o) => (
            <Link
              key={o.slug}
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
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
