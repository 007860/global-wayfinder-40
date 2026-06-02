import { useState } from "react";
import { Mail, X, MessageCircle } from "lucide-react";
import { LeadForm } from "./LeadForm";
import { WHATSAPP_URL } from "@/lib/countries";

export function FloatingEmailButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="fixed bottom-6 right-6 z-[70] flex flex-col gap-3 items-end">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="size-14 rounded-full bg-[#25D366] text-white shadow-elev flex items-center justify-center hover:scale-105 transition-transform"
        >
          <MessageCircle className="size-6" strokeWidth={2.4} />
        </a>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Email us"
          className="size-14 rounded-full bg-gold-gradient text-[var(--midnight)] shadow-gold flex items-center justify-center hover:scale-105 transition-transform"
        >
          <Mail className="size-6" strokeWidth={2.4} />
        </button>
      </div>

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
