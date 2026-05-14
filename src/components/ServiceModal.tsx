import { X } from "lucide-react";
import { LeadForm } from "./LeadForm";
import type { ServiceKey } from "./ServicePills";

type Props = {
  service: { key: ServiceKey; label: string } | null;
  onClose: () => void;
};

export function ServiceModal({ service, onClose }: Props) {
  if (!service) return null;
  // Per requirement: Visa Services form does NOT ask for passport/visa number.
  // All other services ask the full form including passport.
  const requirePassport = service.key !== "visa";

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl glass rounded-2xl shadow-elev p-6 sm:p-10 max-h-[90vh] overflow-y-auto bg-[var(--midnight-light)]/95">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 size-10 rounded-full glass flex items-center justify-center hover:bg-white/10"
        >
          <X className="size-5" />
        </button>
        <LeadForm
          subject={service.label}
          sourceType={`service_${service.key}`}
          requirePassport={requirePassport}
          onDone={onClose}
        />
      </div>
    </div>
  );
}
