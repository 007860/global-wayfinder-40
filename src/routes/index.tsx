import { createFileRoute } from "@tanstack/react-router";
import { TopUtilityStrip } from "@/components/TopUtilityStrip";
import { BurgerMenu } from "@/components/BurgerMenu";
import { Hero } from "@/components/Hero";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingEmailButton } from "@/components/FloatingEmailButton";
import { LiveStatusTicker } from "@/components/LiveStatusTicker";
import { StudyAbroadService } from "@/components/StudyAbroadService";


import { useCounters } from "@/hooks/use-counters";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Al-Bahr Travels — International Bookings & Visa Appointments | Lahore" },
      {
        name: "description",
        content:
          "Trusted Lahore consultancy for visa appointments, flight bookings, hotel reservations, and medical appointments across the Gulf and Europe. Since 2015.",
      },
      { property: "og:title", content: "Al-Bahr Travels & Consultants" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  const counters = useCounters();
  return (
    <main className="min-h-screen">
      <TopUtilityStrip />
      <BurgerMenu />
      <Hero />

      <LiveStatusTicker />



      {/* Counters band */}
      <section className="border-y border-white/10 bg-[var(--midnight-light)]/40">
        <div className="max-w-5xl mx-auto px-6 py-10 grid sm:grid-cols-3 gap-6 text-center">
          <Metric value={counters.traffic} label="Total Active Traffic" />
          <Metric value={counters.consultations} label="Consultations Booked" />
          <Metric value={2015} label="Trusted Since" formatYear />
        </div>
      </section>

      {/* Visa Appointments anchor */}
      <section id="visa-appointments" className="max-w-6xl mx-auto px-6 py-24" aria-labelledby="visa-heading">
        <p className="text-xs tracking-[0.3em] text-gold mb-3">01 — VISA APPOINTMENTS</p>
        <h2 id="visa-heading" className="font-display text-4xl sm:text-5xl max-w-3xl">
          Premium <span className="text-gold-gradient">Visa Consultancy</span> & Strategic Travel Logistics
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Recognized among the <strong>best visa consultants in Pakistan</strong>, we run a
          full <strong>Schengen visa appointment pipeline</strong> alongside UK, Gulf, and
          Qatar visa processing — securing VFS, TLS, BLS, and direct embassy slots through
          senior consultants in our Lahore branch.
        </p>
      </section>

      {/* Medical Appointments anchor */}
      <section
        id="medical-appointments"
        className="border-t border-white/10 bg-[var(--midnight-light)]/40"
        aria-labelledby="medical-heading"
      >
        <div className="max-w-6xl mx-auto px-6 py-24">
          <p className="text-xs tracking-[0.3em] text-gold mb-3">02 — GULF MEDICAL APPOINTMENTS</p>
          <h2 id="medical-heading" className="font-display text-4xl sm:text-5xl max-w-3xl">
            <span className="text-gold-gradient">Gulf Medical Fitness</span> — Appointments, Tokens & Live Tracking
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            End-to-end <strong>Wafid medical appointment booking online</strong>, <strong>Gamca
            medical registration Pakistan</strong>, <strong>Saudi medical token online</strong>,
            and real-time <strong>Gulf medical test center tracking</strong> for Saudi Arabia,
            Qatar, UAE, Kuwait, Oman, and Bahrain — handled by an experienced desk.
          </p>
        </div>
      </section>

      {/* Flight Booking anchor */}
      <section
        id="flight-booking"
        className="border-t border-white/10"
        aria-labelledby="flight-heading"
      >
        <div className="max-w-6xl mx-auto px-6 py-24">
          <p className="text-xs tracking-[0.3em] text-gold mb-3">03 — FLIGHT BOOKING</p>
          <h2 id="flight-heading" className="font-display text-4xl sm:text-5xl max-w-3xl">
            Premium <span className="text-gold-gradient">flight reservations</span>, all carriers.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            One-way, return, multi-city, and group itineraries — Etihad, Qatar Airways,
            Emirates, Turkish, Saudia, and more. Best fares with human service.
          </p>
        </div>
      </section>

      <StudyAbroadService />

      {/* Recent blogs CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <p className="text-xs tracking-[0.3em] text-gold mb-3">05 — INTELLIGENCE</p>

        <h2 className="font-display text-4xl sm:text-5xl">
          Recent <span className="text-gold-gradient">Global Travel</span> Intelligence Briefs
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          AI-curated visa & travel briefs generated live for our clients.
        </p>
        <Link
          to="/blogs"
          className="inline-block mt-8 bg-gold-gradient text-[var(--midnight)] font-semibold px-7 py-3 rounded-xl shadow-gold"
        >
          View blog library →
        </Link>
      </section>

      <SiteFooter />
      <FloatingEmailButton />
    </main>
  );
}

function Metric({
  value,
  label,
  formatYear,
}: {
  value: number;
  label: string;
  formatYear?: boolean;
}) {
  return (
    <div>
      <div className="font-display text-4xl sm:text-5xl text-gold-gradient tabular-nums">
        {formatYear ? value : value.toLocaleString()}
      </div>
      <div className="text-xs tracking-[0.3em] text-muted-foreground mt-2">{label}</div>
    </div>
  );
}
