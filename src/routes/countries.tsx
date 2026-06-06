import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, X } from "lucide-react";
import { COUNTRIES } from "@/lib/countries";
import { SERVICES, type ServiceKey } from "@/components/ServicePills";
import { LeadForm } from "@/components/LeadForm";
import { TopUtilityStrip } from "@/components/TopUtilityStrip";
import { BurgerMenu } from "@/components/BurgerMenu";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingEmailButton } from "@/components/FloatingEmailButton";

export const Route = createFileRoute("/countries")({
  component: CountriesPage,
  head: () => ({
    meta: [
      { title: "Countries — Al-Bahr Travels | Choose destination & service" },
      {
        name: "description",
        content:
          "Browse every country we serve. Pick a destination, choose a service — visa, flight, hotel or medical appointment — and our Lahore consultants will reach you.",
      },
    ],
    links: [{ rel: "canonical", href: "/countries" }],
  }),
});

type Service = { key: ServiceKey; label: string };

function CountriesPage() {
  const [country, setCountry] = useState<string | null>(null);
  const [service, setService] = useState<Service | null>(null);

  return (
    <main className="min-h-screen">
      <TopUtilityStrip />
      <BurgerMenu />

      <section className="max-w-6xl mx-auto px-6 pt-28 pb-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold mb-6">
          <ArrowLeft className="size-4" /> Back to home
        </Link>
        <p className="text-xs tracking-[0.3em] text-gold mb-3">DESTINATIONS</p>
        <h1 className="font-display text-4xl sm:text-5xl max-w-3xl">
          Choose your <span className="text-gold-gradient">country</span> — we handle the rest.
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Tap any destination to view the services we offer there. Pick a service and submit
          your details — our consultants will get in touch within hours.
        </p>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                setCountry(c.name);
                setService(null);
              }}
              className="group glass rounded-xl p-5 text-left hover:bg-white/10 hover:border-gold/40 transition-all"
            >
              <div className="text-4xl mb-3">{c.flag}</div>
              <div className="font-medium group-hover:text-gold">{c.name}</div>
              <div className="text-xs text-muted-foreground mt-1">View services →</div>
            </button>
          ))}
        </div>
      </section>

      <SiteFooter />
      <FloatingEmailButton />

      {/* Step 2: services for the chosen country */}
      {country && !service && (
        <Overlay onClose={() => setCountry(null)}>
          <p className="text-xs tracking-[0.3em] text-gold mb-2">STEP 2 OF 3</p>
          <h2 className="text-3xl sm:text-4xl font-display mb-2">
            Services for <span className="text-gold-gradient">{country}</span>
          </h2>
          <p className="text-muted-foreground text-sm mb-8">Pick the service you need.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {SERVICES.map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setService({ key, label })}
                className="group glass rounded-xl p-5 text-left hover:bg-white/10 hover:border-gold/40 transition-all flex items-center gap-4"
              >
                <Icon className="size-6 text-gold" strokeWidth={2.2} />
                <div>
                  <div className="font-medium group-hover:text-gold">{label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Open request form →</div>
                </div>
              </button>
            ))}
          </div>
        </Overlay>
      )}

      {/* Step 3: lead form */}
      {country && service && (
        <Overlay onClose={() => { setService(null); setCountry(null); }}>
          <LeadForm
            subject={`${service.label} — ${country}`}
            sourceType={`countries_page_${service.key}`}
            serviceKey={service.key}
            requirePassport={service.key !== "visa"}
            onBack={() => setService(null)}
            backLabel="Change service"
            onDone={() => { setService(null); setCountry(null); }}
          />
        </Overlay>
      )}
    </main>
  );
}

function Overlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-3xl glass rounded-2xl shadow-elev p-6 sm:p-10 max-h-[90vh] overflow-y-auto bg-[var(--midnight-light)]/95">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 size-10 rounded-full glass flex items-center justify-center hover:bg-white/10"
        >
          <X className="size-5" />
        </button>
        {children}
      </div>
    </div>
  );
}
