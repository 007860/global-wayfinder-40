import { Phone, Mail, MessageCircle } from "lucide-react";
import { BRAND_NAME, LEAD_EMAIL, WHATSAPP_URL, WHATSAPP_DISPLAY } from "@/lib/countries";

export function TopUtilityStrip() {
  return (
    <div className="w-full bg-[var(--midnight-light)] border-b border-white/10 text-xs text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <a
          href={`mailto:${LEAD_EMAIL}`}
          className="flex items-center gap-1.5 hover:text-gold min-w-0"
        >
          <Mail className="size-3.5 shrink-0" />
          <span className="truncate">{LEAD_EMAIL}</span>
        </a>
        <div className="flex items-center gap-4 shrink-0">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-gold transition-colors"
          >
            <MessageCircle className="size-3.5 text-gold" />
            <span>WhatsApp {WHATSAPP_DISPLAY}</span>
          </a>
          <a
            href="tel:+923434762264"
            className="hidden md:flex items-center gap-1.5 hover:text-gold transition-colors"
          >
            <Phone className="size-3.5 text-gold" />
            <span>Lahore — 0343 4762264</span>
          </a>
        </div>
        <div className="hidden lg:block text-gold tracking-wider font-medium">
          {BRAND_NAME}
        </div>
      </div>
    </div>
  );
}
