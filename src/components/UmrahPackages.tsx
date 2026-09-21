import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Plane,
  UtensilsCrossed,
  Luggage,
  Headphones,
  BadgeCheck,
  MapPin,
  MessageCircle,
  Hotel,
  Users,
  CalendarDays,
  Clock,
  ShieldCheck,
  Ticket,
  Car,
} from "lucide-react";

const EXPIRY = new Date("2026-09-01T00:00:00Z"); // disappears after Aug 31, 2026
const WHATSAPP_NUMBER = "923434762264";
const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}`;
const ADDRESS = "Tibbi Lal Baig, Arifwala, District Pakpattan, Punjab, Pakistan 57450";

function bookOnWhatsApp(packageName: string, details: string[]) {
  const lines = [
    "Assalam-o-Alaikum Al-Bahr Travels,",
    "",
    `I want to book the following Umrah package:`,
    `• ${packageName}`,
    ...details.map((d) => `• ${d}`),
    "",
    "Please contact me with next steps. JazakAllah.",
  ];
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(url, "_blank", "noopener,noreferrer");
  toast.success("Request sent on WhatsApp — our consultant will contact you shortly.");
}


type Row = { label: string; value: string };

const UNIVERSAL = [
  { icon: Ticket, label: "Umrah Visa" },
  { icon: Plane, label: "Return Air Ticket" },
  { icon: Hotel, label: "Hotel Accommodation" },
  { icon: Car, label: "Transport" },
  { icon: Headphones, label: "24/7 Assistance" },
];

const AMENITIES = [
  { icon: Plane, label: "Confirmed Seat" },
  { icon: UtensilsCrossed, label: "In-Flight Meal" },
  { icon: Luggage, label: "Baggage 20+7 kg" },
  { icon: ShieldCheck, label: "Dedicated Help Desk" },
];

const STAR_PACKAGES = [
  {
    title: "21 Days Star Package",
    makkah: "Mather Al Jewar Hotel",
    madinah: "Arjwan Al Medinah Hotel",
    rows: [
      { label: "Sharing", value: "340,000 PKR" },
      { label: "Quad", value: "362,000 PKR" },
      { label: "Triple", value: "399,000 PKR" },
      { label: "Double", value: "472,000 PKR" },
    ] as Row[],
  },
  {
    title: "15 Days Star Package",
    makkah: "Mather Al Jewar Hotel",
    madinah: "Arjwan Al Medinah Hotel",
    rows: [
      { label: "Sharing", value: "314,000 PKR" },
      { label: "Quad", value: "329,000 PKR" },
      { label: "Triple", value: "355,000 PKR" },
      { label: "Double", value: "406,000 PKR" },
    ] as Row[],
  },
];

const FIXED_SLOTS = [
  {
    title: "Slot A",
    dates: "05 Aug – 19 Aug",
    makkah: "Voco Hotel",
    madinah: "Nusk Al Madinah Hotel",
    rows: [
      { label: "Quad", value: "320,000 PKR" },
      { label: "Triple", value: "340,000 PKR" },
      { label: "Double", value: "380,000 PKR" },
    ] as Row[],
  },
  {
    title: "Slot B",
    dates: "17 Aug – 31 Aug",
    makkah: "Voco Hotel",
    madinah: "Nusk Al Madinah Hotel",
    rows: [
      { label: "Quad", value: "327,000 PKR" },
      { label: "Triple", value: "349,000 PKR" },
      { label: "Double", value: "393,000 PKR" },
    ] as Row[],
  },
];

const AIRSIAL_GROUPS = [
  {
    nights: "15 Nights",
    depart: "26 Jul · 16:00",
    ret: "15 Aug · 16:30",
    price: "PKR 169,000",
    badge: null as string | null,
  },
  {
    nights: "18 Nights",
    depart: "28 Jul · 17:00",
    ret: "15 Aug · 16:30",
    price: "PKR 172,000",
    badge: "6 Seats Left",
  },
  {
    nights: "19 Nights",
    depart: "26 Jul · 14:00",
    ret: "15 Aug · 16:30",
    price: "PKR 169,000",
    badge: null,
  },
  {
    nights: "19 Nights",
    depart: "26 Jul · 14:00",
    ret: "15 Aug · 14:30",
    price: "PKR 172,000",
    badge: null,
  },
  {
    nights: "19 Nights",
    depart: "26 Jul · 10:00",
    ret: "15 Aug · 19:30",
    price: "PKR 174,000",
    badge: null,
  },
];

export function UmrahPackages() {
  // Time-bomb: after EXPIRY, component vanishes on next render.
  if (new Date() >= EXPIRY) return null;

  const [tab, setTab] = useState<"saudia" | "airsial">("saudia");

  // Safety second check on mount in case SSR served it near the boundary.
  const [alive, setAlive] = useState(true);
  useEffect(() => {
    if (new Date() >= EXPIRY) setAlive(false);
  }, []);
  if (!alive) return null;

  return (
    <section
      id="umrah-packages"
      aria-labelledby="umrah-heading"
      className="relative border-y border-gold/20 bg-[#0A192F]"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(1200px 400px at 20% 0%, rgba(245,194,107,0.10), transparent 60%), radial-gradient(1000px 500px at 100% 100%, rgba(30,58,95,0.6), transparent 60%)",
        }}
      />
      <div className="relative max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.35em] text-gold mb-3">
            LIMITED · UMRAH SEASON 2026
          </p>
          <h2
            id="umrah-heading"
            className="font-display text-4xl sm:text-5xl"
          >
            <span className="text-gold-gradient">Umrah Packages</span> &amp; Flight Groups
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Curated Saudia star packages and AirSial group departures from Arifwala.
            Book direct with our consultants — limited seats, official rates.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex glass rounded-full p-1 border border-gold/30">
            <TabButton
              active={tab === "saudia"}
              onClick={() => setTab("saudia")}
              label="Saudia Star Packages"
            />
            <TabButton
              active={tab === "airsial"}
              onClick={() => setTab("airsial")}
              label="AirSial Group Offers"
            />
          </div>
        </div>

        {tab === "saudia" ? <SaudiaTab /> : <AirSialTab />}

        {/* Persistent action footer */}
        <div className="mt-12 rounded-2xl border border-gold/30 bg-[#112240]/80 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="min-w-0">
            <p className="text-xs tracking-[0.3em] text-gold mb-2">BOOK IN PERSON</p>
            <p className="flex items-start gap-2 text-sm text-foreground">
              <MapPin className="size-4 text-gold shrink-0 mt-0.5" />
              <span>{ADDRESS}</span>
            </p>
          </div>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white font-semibold px-6 py-3 shadow-elev hover:scale-[1.02] transition-transform"
          >
            <MessageCircle className="size-5" />
            Book on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-full transition-colors ${
        active
          ? "bg-gold-gradient text-[var(--midnight)] shadow-gold"
          : "text-muted-foreground hover:text-gold"
      }`}
    >
      {label}
    </button>
  );
}

function SaudiaTab() {
  return (
    <div>
      <div className="text-center mb-6">
        <p className="text-xs tracking-[0.3em] text-gold">
          LHE ✈ JED ✈ LHE · SAUDI AIRLINES
        </p>
      </div>

      {/* Universal inclusions */}
      <div className="mb-8 rounded-2xl border border-gold/25 bg-[#112240]/60 p-5">
        <p className="text-[11px] tracking-[0.3em] text-gold mb-4 text-center">
          UNIVERSAL INCLUSIONS
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {UNIVERSAL.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center gap-2"
            >
              <div className="size-10 rounded-full bg-gold/10 border border-gold/30 grid place-items-center">
                <Icon className="size-5 text-gold" strokeWidth={2.2} />
              </div>
              <span className="text-xs text-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Duration packages */}
      <div className="grid md:grid-cols-2 gap-6">
        {STAR_PACKAGES.map((p) => (
          <PackageCard key={p.title} title={p.title} makkah={p.makkah} madinah={p.madinah} rows={p.rows} />
        ))}
      </div>

      {/* Fixed dates */}
      <div className="mt-10">
        <p className="text-xs tracking-[0.3em] text-gold text-center mb-5">
          FIXED DATE SLOTS
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {FIXED_SLOTS.map((s) => (
            <PackageCard
              key={s.title}
              title={s.title}
              subtitle={s.dates}
              makkah={s.makkah}
              madinah={s.madinah}
              rows={s.rows}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PackageCard({
  title,
  subtitle,
  makkah,
  madinah,
  rows,
}: {
  title: string;
  subtitle?: string;
  makkah: string;
  madinah: string;
  rows: Row[];
}) {
  return (
    <div className="relative rounded-2xl border border-gold/30 bg-gradient-to-b from-[#112240]/90 to-[#0A192F] p-6 shadow-elev">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <h3 className="font-display text-xl text-gold-gradient truncate">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
              <CalendarDays className="size-3.5 text-gold" />
              {subtitle}
            </p>
          )}
        </div>
        <BadgeCheck className="size-5 text-gold shrink-0" />
      </div>

      <div className="space-y-2 mb-5 text-sm">
        <p className="flex items-start gap-2">
          <Hotel className="size-4 text-gold mt-0.5 shrink-0" />
          <span>
            <span className="text-muted-foreground">Makkah:</span>{" "}
            <span className="text-foreground">{makkah}</span>
          </span>
        </p>
        <p className="flex items-start gap-2">
          <Hotel className="size-4 text-gold mt-0.5 shrink-0" />
          <span>
            <span className="text-muted-foreground">Madinah:</span>{" "}
            <span className="text-foreground">{madinah}</span>
          </span>
        </p>
      </div>

      <div className="border-t border-white/10 pt-4">
        <div className="grid grid-cols-2 gap-2">
          {rows.map((r) => (
            <button
              type="button"
              key={r.label}
              onClick={() =>
                bookOnWhatsApp(title, [
                  subtitle ? `Dates: ${subtitle}` : "",
                  `Makkah Hotel: ${makkah}`,
                  `Madinah Hotel: ${madinah}`,
                  `Occupancy: ${r.label}`,
                  `Price: ${r.value}`,
                ].filter(Boolean))
              }
              className="text-left rounded-lg bg-[#0A192F] border border-white/5 px-3 py-2.5 hover:border-gold/60 hover:bg-[#0d2140] transition-colors cursor-pointer group"
            >
              <div className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase flex items-center gap-1">
                <Users className="size-3 text-gold" /> {r.label}
              </div>
              <div className="text-sm font-semibold text-gold-gradient tabular-nums mt-0.5">
                {r.value}
              </div>
              <div className="mt-1.5 flex items-center gap-1 text-[10px] text-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity">
                <MessageCircle className="size-3" /> Book on WhatsApp
              </div>
            </button>
          ))}
        </div>
        <p className="mt-3 text-[10px] text-muted-foreground text-center">
          Tap any price to book instantly on WhatsApp
        </p>
      </div>

    </div>
  );
}

function AirSialTab() {
  return (
    <div>
      <div className="text-center mb-6">
        <p className="text-xs tracking-[0.3em] text-gold">
          AIRSIAL · LOWEST GROUP RATES
        </p>
      </div>

      {/* Amenities */}
      <div className="mb-8 rounded-2xl border border-gold/25 bg-[#112240]/60 p-5">
        <p className="text-[11px] tracking-[0.3em] text-gold mb-4 text-center">
          FLIGHT AMENITIES
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {AMENITIES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center gap-2"
            >
              <div className="size-10 rounded-full bg-gold/10 border border-gold/30 grid place-items-center">
                <Icon className="size-5 text-gold" strokeWidth={2.2} />
              </div>
              <span className="text-xs text-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Group offers */}
      <div className="grid gap-4">
        {AIRSIAL_GROUPS.map((g, i) => (
          <div
            key={i}
            className="relative rounded-2xl border border-gold/25 bg-[#112240]/80 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-gold/60 transition-colors"
          >
            {g.badge && (
              <span className="absolute -top-2 right-4 text-[10px] tracking-widest font-bold px-2.5 py-1 rounded-full bg-red-500 text-white shadow-elev">
                {g.badge.toUpperCase()}
              </span>
            )}
            <div className="min-w-0">
              <div className="text-lg font-display text-gold-gradient">
                {g.nights}
              </div>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Plane className="size-3.5 text-gold" />
                  Depart{" "}
                  <span className="text-foreground tabular-nums">
                    {g.depart}
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5 text-gold" />
                  Return{" "}
                  <span className="text-foreground tabular-nums">{g.ret}</span>
                </span>
              </div>
            </div>
            <div className="shrink-0 flex sm:flex-col items-end gap-3 sm:gap-2">
              <div className="text-right">
                <div className="text-[10px] tracking-[0.25em] text-muted-foreground">
                  FROM
                </div>
                <div className="font-display text-2xl text-gold-gradient tabular-nums">
                  {g.price}
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  bookOnWhatsApp(`AirSial Umrah Group — ${g.nights}`, [
                    `Depart: ${g.depart}`,
                    `Return: ${g.ret}`,
                    `Price: ${g.price}`,
                  ])
                }
                className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] text-white text-xs font-semibold px-3.5 py-2 hover:scale-[1.03] transition-transform whitespace-nowrap"
              >
                <MessageCircle className="size-3.5" />
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

