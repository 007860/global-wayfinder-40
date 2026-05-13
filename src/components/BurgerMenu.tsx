import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CountryModal } from "./CountryModal";

const LINKS = [
  { id: "visa", label: "Visa Appointments", href: "#visa-appointments" },
  { id: "flight", label: "Flight Booking", href: "#flight-booking" },
  { id: "foreign", label: "Foreign Countries", interactive: "foreign_countries" as const },
  { id: "airline", label: "Airline Ticket Booking", interactive: "airline_ticket" as const },
];

export function BurgerMenu() {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<null | "foreign_countries" | "airline_ticket">(null);

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
            {LINKS.map((l, i) => (
              <button
                key={l.id}
                onClick={() => {
                  if (l.interactive) {
                    setOpen(false);
                    setTimeout(() => setModal(l.interactive!), 200);
                  } else if (l.href) {
                    setOpen(false);
                    setTimeout(() => {
                      document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" });
                    }, 250);
                  }
                }}
                className="group text-left py-5 border-b border-white/10 flex items-baseline gap-4 hover:pl-2 transition-all"
              >
                <span className="text-xs text-gold font-mono opacity-60">0{i + 1}</span>
                <span className="font-display text-2xl text-foreground group-hover:text-gold transition-colors">
                  {l.label}
                </span>
              </button>
            ))}
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
    </>
  );
}
