import { useState } from "react";
import { Mail, X } from "lucide-react";
import { LeadForm } from "./LeadForm";

export function FloatingEmailButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Email us"
        className="fixed bottom-6 right-6 z-[70] size-14 rounded-full bg-gold-gradient text-[var(--midnight)] shadow-gold flex items-center justify-center hover:scale-105 transition-transform"
      >
        <Mail className="size-6" strokeWidth={2.4} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-xl glass rounded-2xl shadow-elev p-6 sm:p-10 max-h-[90vh] overflow-y-auto bg-[var(--midnight-light)]/95">
            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 size-10 rounded-full glass flex items-center justify-center hover:bg-white/10"
            >
              <X className="size-5" />
            </button>
            <LeadForm
              subject="Email Our Consultants"
              sourceType="floating_email"
              requirePassport={false}
              onDone={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
