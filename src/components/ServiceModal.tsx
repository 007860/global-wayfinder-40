import { useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { LeadForm, type LeadServiceKey } from "./LeadForm";
import { CountryPicker } from "./CountryPicker";
import { ServiceTabBar } from "./ServiceTabBar";
import { UmrahPackages } from "./UmrahPackages";
import { WORLD_COUNTRIES, GCC_COUNTRIES } from "@/lib/countries";
import type { ServiceKey } from "./ServicePills";

type Props = {
  service: { key: ServiceKey; label: string } | null;
  onClose: () => void;
};

const LABELS: Record<ServiceKey, string> = {
  medical: "Medical Appointment Booking",
  visa: "Visa Services",
  flight: "Flight Booking",
  hotel: "Hotel Booking",
  umrah: "Hajj & Umrah Packages",
};

export function ServiceModal({ service, onClose }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [activeKey, setActiveKey] = useState<ServiceKey | null>(null);

  if (!service) return null;
  const currentKey: ServiceKey = activeKey ?? service.key;
  const currentLabel = LABELS[currentKey];
  const isUmrah = currentKey === "umrah";
  const requirePassport = currentKey !== "visa";
  const isMedical = currentKey === "medical";
  const countryList = isMedical ? GCC_COUNTRIES : WORLD_COUNTRIES;

  const close = () => {
    setSelected(null);
    setActiveKey(null);
    onClose();
  };


  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={close} />
      <div className="relative w-full max-w-3xl glass rounded-2xl shadow-elev p-6 sm:p-10 max-h-[90vh] overflow-y-auto bg-[var(--midnight-light)]/95">
        <button
          aria-label="Close"
          onClick={close}
          className="absolute top-4 right-4 size-10 rounded-full glass flex items-center justify-center hover:bg-white/10 z-20"
        >
          <X className="size-5" />
        </button>

        {isUmrah ? (
          <div className="-mx-6 sm:-mx-10 -mt-6 sm:-mt-10">
            <UmrahPackages />
          </div>
        ) : !selected ? (
          <>
            <div className="mb-6">
              <p className="text-xs tracking-[0.3em] text-gold mb-2">STEP 1 OF 2</p>
              <h2 className="text-3xl sm:text-4xl font-display">
                Select country for <span className="text-gold-gradient">{currentLabel}</span>
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                {isMedical
                  ? "Medical appointments are arranged for GCC destinations."
                  : "Choose your destination — search the full list below."}
              </p>
            </div>

            <ServiceTabBar
              active={currentKey as Exclude<ServiceKey, "umrah">}
              onChange={(k) => setActiveKey(k)}
            />

            <CountryPicker
              countries={countryList}
              onSelect={setSelected}
              searchable={!isMedical}
            />
          </>
        ) : (
          <motion.div layout transition={{ type: "spring", stiffness: 260, damping: 30 }}>
            <ServiceTabBar
              active={currentKey as Exclude<ServiceKey, "umrah">}
              onChange={(k) => {
                setActiveKey(k);
                // Reset country if new service is medical and old country is not GCC.
                const nextIsMedical = k === "medical";
                if (nextIsMedical && !GCC_COUNTRIES.some((c) => c.name === selected)) {
                  setSelected(null);
                }
              }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={currentKey + (selected ?? "")}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              >
                <LeadForm
                  subject={`${currentLabel} — ${selected}`}
                  sourceType={`service_${currentKey}`}
                  serviceKey={currentKey as LeadServiceKey}
                  requirePassport={requirePassport}
                  onBack={() => setSelected(null)}
                  onDone={close}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  );
}
