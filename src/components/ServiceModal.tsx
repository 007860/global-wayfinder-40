import { useState } from "react";
import { X } from "lucide-react";
import { LeadForm } from "./LeadForm";
import { COUNTRIES, GCC_COUNTRIES, EU_COUNTRIES } from "@/lib/countries";
import type { ServiceKey } from "./ServicePills";

type Props = {
  service: { key: ServiceKey; label: string } | null;
  onClose: () => void;
};

export function ServiceModal({ service, onClose }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  if (!service) return null;
  // Visa Services form does NOT ask for passport/visa number.
  const requirePassport = service.key !== "visa";
  const countryList =
    service.key === "medical"
      ? GCC_COUNTRIES
      : service.key === "visa"
      ? EU_COUNTRIES
      : COUNTRIES;

  const close = () => {
    setSelected(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={close} />
      <div className="relative w-full max-w-3xl glass rounded-2xl shadow-elev p-6 sm:p-10 max-h-[90vh] overflow-y-auto bg-[var(--midnight-light)]/95">
        <button
          aria-label="Close"
          onClick={close}
          className="absolute top-4 right-4 size-10 rounded-full glass flex items-center justify-center hover:bg-white/10"
        >
          <X className="size-5" />
        </button>

        {!selected ? (
          <>
            <div className="mb-8">
              <p className="text-xs tracking-[0.3em] text-gold mb-2">STEP 1 OF 2</p>
              <h2 className="text-3xl sm:text-4xl font-display">
                Select country for <span className="text-gold-gradient">{service.label}</span>
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                Choose a destination — our consultant will reach you within hours.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {COUNTRIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setSelected(c.name)}
                  className="group glass rounded-xl p-4 text-left hover:bg-white/10 hover:border-gold/40 transition-all"
                >
                  <div className="text-3xl mb-2">{c.flag}</div>
                  <div className="font-medium text-sm group-hover:text-gold">{c.name}</div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <LeadForm
            subject={`${service.label} — ${selected}`}
            sourceType={`service_${service.key}`}
            requirePassport={requirePassport}
            onBack={() => setSelected(null)}
            onDone={close}
          />
        )}
      </div>
    </div>
  );
}
