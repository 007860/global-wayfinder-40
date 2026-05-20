import { Phone, Mail } from "lucide-react";
import { BRAND_NAME } from "@/lib/countries";

export function TopUtilityStrip() {
  return (
    <div className="w-full bg-[var(--midnight-light)] border-b border-white/10 text-xs text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
        <a
          href="mailto:Al.bahr.medical.appointmens@gmail.com"
          className="flex items-center gap-1.5 hover:text-gold"
        >
          <Mail className="size-3.5" />
          <span className="truncate">Al.bahr.medical.appointmens@gmail.com</span>
        </a>
        <a
          href="tel:+923434762264"
          className="hidden md:flex items-center gap-1.5 hover:text-gold transition-colors"
        >
          <Phone className="size-3.5 text-gold" />
          <span>Lahore Branch — 0343 4762264</span>
        </a>
        <div className="hidden sm:block text-gold tracking-wider font-medium">
          {BRAND_NAME}
        </div>
      </div>
    </div>
  );
}
