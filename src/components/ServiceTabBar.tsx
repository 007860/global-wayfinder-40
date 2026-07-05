import { motion } from "motion/react";
import { Stethoscope, Globe2, Plane, Hotel } from "lucide-react";
import type { ServiceKey } from "./ServicePills";

const TABS: { key: ServiceKey; label: string; short: string; icon: typeof Plane }[] = [
  { key: "flight", label: "Air Ticket", short: "Air", icon: Plane },
  { key: "medical", label: "Medical Appointment", short: "Med", icon: Stethoscope },
  { key: "visa", label: "Visa Booking", short: "Visa", icon: Globe2 },
  { key: "hotel", label: "Hotel Stay", short: "Stay", icon: Hotel },
];

type Props = {
  active: ServiceKey;
  onChange: (k: ServiceKey) => void;
};

export function ServiceTabBar({ active, onChange }: Props) {
  return (
    <div className="relative mb-6">
      <div className="flex items-center gap-1 p-1 rounded-full border border-white/10 bg-black/40 backdrop-blur overflow-x-auto no-scrollbar">
        {TABS.map((t) => {
          const Icon = t.icon;
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onChange(t.key)}
              className={`relative flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors z-10 shrink-0
                ${isActive ? "text-[var(--midnight)]" : "text-foreground/70 hover:text-foreground"}`}
            >
              {isActive && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-gold-gradient shadow-gold"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <Icon className="relative size-4" strokeWidth={2.2} />
              <span className="relative hidden sm:inline">{t.label}</span>
              <span className="relative sm:hidden">{t.short}</span>
            </button>
          );
        })}
      </div>
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{scrollbar-width:none}`}</style>
    </div>
  );
}
