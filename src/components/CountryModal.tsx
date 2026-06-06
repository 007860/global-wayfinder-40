import { useState } from "react";
import { X } from "lucide-react";
import { WORLD_COUNTRIES } from "@/lib/countries";
import { LeadForm } from "./LeadForm";
import { CountryPicker } from "./CountryPicker";

type Props = {
  sourceType: "foreign_countries" | "airline_ticket" | null;
  onClose: () => void;
};

export function CountryModal({ sourceType, onClose }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const open = sourceType !== null;

  if (!open) return null;

  const heading =
    sourceType === "airline_ticket"
      ? "Select destination for your ticket"
      : "Select your foreign destination";

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
            <div className="mb-6">
              <p className="text-xs tracking-[0.3em] text-gold mb-2">STEP 1 OF 2</p>
              <h2 className="text-3xl sm:text-4xl font-display">{heading}</h2>
              <p className="text-muted-foreground mt-2 text-sm">
                Choose a country — our consultant will reach you within hours.
              </p>
            </div>

            <CountryPicker countries={WORLD_COUNTRIES} onSelect={setSelected} />
          </>
        ) : (
          <LeadForm
            subject={selected}
            sourceType={sourceType!}
            requirePassport
            onBack={() => setSelected(null)}
            onDone={close}
          />
        )}
      </div>
    </div>
  );
}
