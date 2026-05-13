import { useCounters } from "@/hooks/use-counters";
import { BRANCH_ADDRESS, BRAND_NAME, LEAD_EMAIL } from "@/lib/countries";
import { SERVICES } from "./ServicePills";

export function SiteFooter() {
  const counters = useCounters();
  return (
    <footer className="border-t border-white/10 bg-[var(--midnight-light)]/60">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-2xl text-gold-gradient mb-3">{BRAND_NAME}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Trusted since 2015. Lahore-based consultancy for international visas, medical
            appointments, flights, and hotels.
          </p>
        </div>

        <div>
          <h4 className="text-xs tracking-[0.3em] text-gold mb-4">SERVICES</h4>
          <ul className="space-y-2 text-sm">
            {SERVICES.map((s) => (
              <li key={s.label} className="text-muted-foreground hover:text-foreground">
                {s.label}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs tracking-[0.3em] text-gold mb-4">CONTACT</h4>
          <p className="text-sm text-muted-foreground mb-2">{BRANCH_ADDRESS}</p>
          <a
            href={`mailto:${LEAD_EMAIL}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground hover:text-gold"
          >
            {LEAD_EMAIL}
          </a>
        </div>

        <div>
          <h4 className="text-xs tracking-[0.3em] text-gold mb-4">LIVE METRICS</h4>
          <div className="space-y-3">
            <Stat label="Total Active Traffic" value={counters.traffic} />
            <Stat label="Consultations Booked" value={counters.consultations} />
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
      </div>
    </footer>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="text-2xl font-display text-gold-gradient tabular-nums">
        {value.toLocaleString()}
      </div>
      <div className="text-xs text-muted-foreground tracking-wider">{label}</div>
    </div>
  );
}
