import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CountryModal } from "./CountryModal";
import { ServiceModal } from "./ServiceModal";
import type { ServiceKey } from "./ServicePills";

const LINKS: {
  id: string;
  label: string;
  interactive?: "foreign_countries" | "airline_ticket";
  service?: { key: ServiceKey; label: string };
  to?: string;
}[] = [
  { id: "countries", label: "All Countries", to: "/countries" },
  { id: "visa", label: "Visa Appointments", service: { key: "visa", label: "Visa Services" } },
  { id: "flight", label: "Flight Booking", service: { key: "flight", label: "Flight Booking" } },
  { id: "foreign", label: "Foreign Countries", interactive: "foreign_countries" },
  { id: "airline", label: "Airline Ticket Booking", interactive: "airline_ticket" },
];

export function BurgerMenu() {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<null | "foreign_countries" | "airline_ticket">(null);
  const [service, setService] = useState<{ key: ServiceKey; label: string } | null>(null);

  return (
    <>
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-50 size-12 rounded-full glass shadow-elev flex items-center justify-center hover:bg-white/10 transition-colors"
      >
        <Menu className="size-6 text-foreground" strokeWidth={2.2} />
      </button>

      {/* Slide-out panel */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <aside
          className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-[var(--midnight-light)] border-l border-white/10 shadow-elev p-8 transition-transform duration-500 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-12">
            <span className="text-sm tracking-[0.3em] text-muted-foreground">MENU</span>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="size-10 rounded-full glass flex items-center justify-center hover:bg-white/10"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {LINKS.map((l, i) => {
              const inner = (
                <>
                  <span className="text-xs text-gold font-mono opacity-60">0{i + 1}</span>
                  <span className="font-display text-2xl text-foreground group-hover:text-gold transition-colors">
                    {l.label}
                  </span>
                </>
              );
              const cls =
                "group text-left py-5 border-b border-white/10 flex items-baseline gap-4 hover:pl-2 transition-all";
              if (l.to) {
                return (
                  <Link key={l.id} to={l.to} onClick={() => setOpen(false)} className={cls}>
                    {inner}
                  </Link>
                );
              }
              return (
                <button
                  key={l.id}
                  onClick={() => {
                    if (l.interactive) {
                      setOpen(false);
                      setTimeout(() => setModal(l.interactive!), 200);
                    } else if (l.service) {
                      setOpen(false);
                      setTimeout(() => setService(l.service!), 200);
                    }
                  }}
                  className={cls}
                >
                  {inner}
                </button>
              );
            })}
          </nav>

          <div className="absolute bottom-8 left-8 right-8 text-xs text-muted-foreground">
            <p className="mb-2 text-gold font-medium tracking-wider">AL-BAHR TRAVELS</p>
            <p>78 E Block, Architect Engineering Housing Society, Lahore, Pakistan</p>
          </div>
        </aside>
      </div>

      <CountryModal
        sourceType={modal}
        onClose={() => setModal(null)}
      />
      <ServiceModal service={service} onClose={() => setService(null)} />
    </>
  );
}
