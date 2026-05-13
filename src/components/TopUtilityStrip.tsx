import { MapPin, Phone, Mail } from "lucide-react";
import { BRANCH_ADDRESS, BRAND_NAME } from "@/lib/countries";

export function TopUtilityStrip() {
  return (
    <div className="w-full bg-[var(--midnight-light)] border-b border-white/10 text-xs text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <MapPin className="size-3.5 text-gold" />
          <span className="truncate">{BRANCH_ADDRESS}</span>
        </div>
        <div className="hidden md:flex items-center gap-5">
          <a
            href="mailto:Al.bahr.medical.appointmens@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-gold"
          >
            <Mail className="size-3.5" /> Al.bahr.medical.appointmens@gmail.com
          </a>
          <span className="flex items-center gap-1.5">
            <Phone className="size-3.5" /> Lahore Branch
          </span>
        </div>
        <div className="hidden sm:block text-gold tracking-wider font-medium">
          {BRAND_NAME}
        </div>
      </div>
    </div>
  );
}
