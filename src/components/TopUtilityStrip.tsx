import { Phone, Mail } from "lucide-react";
import { BRAND_NAME } from "@/lib/countries";

export function TopUtilityStrip() {
  return (
    <div className="w-full bg-[var(--midnight-light)] border-b border-white/10 text-xs text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
        <a
          href="mailto:Al.bahr.medical.appointmens@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-gold"
        >
          <Mail className="size-3.5" />
          <span className="truncate">Al.bahr.medical.appointmens@gmail.com</span>
        </a>
        <span className="hidden md:flex items-center gap-1.5">
          <Phone className="size-3.5 text-gold" /> Lahore Branch
        </span>
        <div className="hidden sm:block text-gold tracking-wider font-medium">
          {BRAND_NAME}
        </div>
      </div>
    </div>
  );
}
