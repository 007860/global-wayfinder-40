import { useState } from "react";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { useCounters } from "@/hooks/use-counters";
import {
  BRANCH_ADDRESS,
  BRAND_NAME,
  LEAD_EMAIL,
  WHATSAPP_URL,
  WHATSAPP_DISPLAY,
} from "@/lib/countries";
import { ServiceModal } from "./ServiceModal";
import type { ServiceKey } from "./ServicePills";

const FOOTER_SERVICES: { key: ServiceKey; label: string }[] = [
  { key: "medical", label: "Medical Appointment Booking (Gulf Region)" },
  { key: "visa", label: "Visa Appointment Booking (All European Countries)" },
  { key: "flight", label: "Air Ticket Booking (Gulf & Worldwide)" },
  { key: "hotel", label: "Hotel Booking (International)" },
];

export function SiteFooter() {
  const counters = useCounters();
  const [service, setService] = useState<{ key: ServiceKey; label: string } | null>(null);

  const openService = (nextService: { key: ServiceKey; label: string }) => {
    setService(null);
    requestAnimationFrame(() => setService(nextService));
  };

  return (
    <footer className="border-t border-white/10 bg-[var(--midnight-light)]/60">
      <div className="max-w-7xl mx-auto px-6 py-14 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-2xl text-gold-gradient mb-3">{BRAND_NAME}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Trusted since 2015. Lahore-based consultancy for international visas, medical
            appointments, flights, and hotels Booking.
          </p>
        </div>

        <div>
          <h4 className="text-xs tracking-[0.3em] text-gold mb-4">SERVICES</h4>
          <ul className="space-y-2 text-sm">
            {FOOTER_SERVICES.map((s) => (
              <li key={s.key}>
                <button
                  type="button"
                  onClick={() => openService(s)}
                  className="cursor-pointer text-left text-muted-foreground hover:text-gold transition-colors"
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div id="contact">
          <h4 className="text-xs tracking-[0.3em] text-gold mb-4">CONTACT US</h4>
          <p className="text-sm text-muted-foreground mb-3 flex items-start gap-2">
            <MapPin className="size-4 text-gold mt-0.5 shrink-0" />
            <span>{BRANCH_ADDRESS}</span>
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground hover:text-gold flex items-center gap-2 mb-2 break-all"
          >
            <MessageCircle className="size-4 text-gold shrink-0" />
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <a
            href={`mailto:${LEAD_EMAIL}`}
            className="text-sm text-foreground hover:text-gold flex items-center gap-2 break-all"
          >
            <Mail className="size-4 text-gold shrink-0" />
            <span className="break-all">{LEAD_EMAIL}</span>
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
      <div className="border-t border-white/10 py-5 text-center text-xs text-muted-foreground px-4">
        © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
      </div>
      <ServiceModal service={service} onClose={() => setService(null)} />
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
