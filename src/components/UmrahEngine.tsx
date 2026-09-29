import { useMemo, useState } from "react";
import { toast } from "sonner";
import { BadgeCheck, Hotel, Plane, ShieldCheck, Bus, BookOpen, BedDouble, X, MessageCircle, Check } from "lucide-react";
import { UMRAH_PACKAGES, OCCS, DISTANCE_BANDS, MAKKAH_HOTELS, MADINAH_HOTELS, fmtPKR, type Occ, type UmrahPkg, type Hotel as HotelT } from "@/lib/umrah-packages";

const WA = "923434762264";
const FEATURES = [
  { icon: ShieldCheck, label: "Visa & Insurance" },
  { icon: Plane, label: "Return Ticket" },
  { icon: BedDouble, label: "Accommodation" },
  { icon: Bus, label: "KSA Transport" },
  { icon: BookOpen, label: "Ziarat & Guidance" },
];

type Summary = { type: string; airline: string; makkah: string; madinah: string; occ: string; rate: string };

export function UmrahEngine() {
  const [tab, setTab] = useState<"standard" | "custom">("standard");
  const [booking, setBooking] = useState<Summary | null>(null);
  return (
    <section className="relative bg-[#0F172A] text-white px-4 sm:px-8 py-10">
      <div className="text-center mb-6">
        <p className="text-[11px] tracking-[0.35em] text-[#D4AF37]">UMRAH 1448 H · FROM LAHORE</p>
        <h2 className="font-display text-3xl sm:text-4xl mt-2">Umrah &amp; Hajj <span className="text-[#D4AF37]">Booking Engine</span></h2>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 justify-start sm:justify-center">
        {([["standard", "Verified Standard Packages"], ["custom", "Make Your Own Package"]] as const).map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold border transition ${tab === k ? "bg-[#D4AF37] text-[#0F172A] border-[#D4AF37]" : "border-white/20 text-white/80 hover:border-[#D4AF37]"}`}>{l}</button>
        ))}
      </div>
      {tab === "standard" ? <Standard onBook={setBooking} /> : <Custom onBook={setBooking} />}
      {booking && <BookingModal s={booking} onClose={() => setBooking(null)} />}
    </section>
  );
}

function Chips<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: readonly { key: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.25em] text-[#D4AF37] mb-2">{label}</p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {options.map((o) => (
          <button key={o.key} onClick={() => onChange(o.key)} className={`shrink-0 rounded-full px-3 py-1.5 text-xs border ${value === o.key ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]" : "border-white/15 text-white/70"}`}>{o.label}</button>
        ))}
      </div>
    </div>
  );
}

function Standard({ onBook }: { onBook: (s: Summary) => void }) {
  const [series, setSeries] = useState<"sep" | "oct">("sep");
  const [mk, setMk] = useState<string>("all");
  const [md, setMd] = useState<string>("all");
  const [occ, setOcc] = useState<Occ>("sharing");
  const list = useMemo(() => {
    const tm = DISTANCE_BANDS.find((b) => b.key === mk)!.test;
    const td = DISTANCE_BANDS.find((b) => b.key === md)!.test;
    return UMRAH_PACKAGES.filter((p) => p.series === series && tm(p.makkah.min) && td(p.madinah.min));
  }, [series, mk, md]);
  const bands = DISTANCE_BANDS.map((b) => ({ key: b.key as string, label: b.label }));

  const book = (p: UmrahPkg) => onBook({
    type: `Standard Package #${p.no} (${series === "sep" ? "Sep–Oct" : "Oct–Nov"} · 21 Days)`,
    airline: p.airline,
    makkah: `${p.makkah.name} (${p.makkah.dist}) · 12 Nights`,
    madinah: `${p.madinah.name} (${p.madinah.dist}) · 8 Nights`,
    occ: OCCS.find((o) => o.key === occ)!.label,
    rate: p.prices[occ].toLocaleString("en-US"),
  });

  return (
    <div>
      <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 mb-6">
        <Chips label="DEPARTURE SERIES" value={series} onChange={setSeries} options={[{ key: "sep", label: "21 Days · Saudia / Fly-Jinnah (Sep–Oct) · 15 Pkgs" }, { key: "oct", label: "21 Days · Saudia (Oct–Nov) · 7 Pkgs" }]} />
        <Chips label="MAKKAH HOTEL DISTANCE" value={mk} onChange={setMk} options={bands} />
        <Chips label="MADINAH HOTEL DISTANCE" value={md} onChange={setMd} options={bands} />
        <Chips label="ROOM OCCUPANCY" value={occ} onChange={setOcc} options={OCCS} />
      </div>
      {list.length === 0 && <p className="text-center text-white/60 py-8">No package matches these distances — try another filter.</p>}
      <div className="grid md:grid-cols-2 gap-4">
        {list.map((p) => (
          <button key={p.id} onClick={() => book(p)} className="text-left rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur p-5 hover:border-[#D4AF37] transition group">
            <div className="flex items-center justify-between mb-3">
              <span className="font-display text-2xl text-[#D4AF37]">Package {p.no}</span>
              <span className="text-[10px] tracking-widest rounded-full bg-[#D4AF37]/15 text-[#D4AF37] px-2.5 py-1">{p.airline.toUpperCase()}</span>
            </div>
            <HotelLine city="Makkah · 12N" h={p.makkah} />
            <HotelLine city="Madinah · 8N" h={p.madinah} />
            <div className="mt-2 text-[11px] text-white/55 space-y-0.5">{p.flights.map((f) => <p key={f}>✈ {f}</p>)}</div>
            <div className="mt-4 grid grid-cols-4 gap-1.5">
              {OCCS.map((o) => (
                <div key={o.key} className={`rounded-lg px-2 py-1.5 text-center ${o.key === occ ? "bg-[#D4AF37] text-[#0F172A]" : "bg-white/5 text-white/70"}`}>
                  <div className="text-[9px] uppercase tracking-wider">{o.label.split(" ")[0]}</div>
                  <div className="text-xs font-bold tabular-nums">{(p.prices[o.key] / 1000).toFixed(o.key && p.prices[o.key] % 1000 ? 3 : 0)}k</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div><p className="text-[10px] tracking-widest text-white/50">PER HEAD</p><p className="font-display text-xl text-[#D4AF37] tabular-nums">{fmtPKR(p.prices[occ])}</p></div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-semibold"><MessageCircle className="size-3.5" />Book</span>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-x-3 gap-y-1">
              {FEATURES.map(({ icon: I, label }) => <span key={label} className="inline-flex items-center gap-1 text-[10px] text-white/60"><I className="size-3 text-[#D4AF37]" />{label}</span>)}
            </div>
          </button>
        ))}
      </div>
      <p className="mt-6 text-center text-[11px] text-white/50">Packages in PKR & non-refundable · New tax/fuel charged accordingly · Embassy-sent cases charged at market rate</p>
    </div>
  );
}

function HotelLine({ city, h }: { city: string; h: HotelT }) {
  return (
    <p className="flex items-start gap-2 text-sm mb-1.5">
      <Hotel className="size-4 text-[#D4AF37] mt-0.5 shrink-0" />
      <span><span className="text-white/50 text-xs">{city}: </span>{h.name} <span className="inline-flex items-center gap-0.5 text-[11px] text-[#D4AF37]"><BadgeCheck className="size-3" />{h.dist}</span>{h.note && <span className="block text-[11px] text-white/45">{h.note}</span>}</span>
    </p>
  );
}

function Custom({ onBook }: { onBook: (s: Summary) => void }) {
  const [step, setStep] = useState(1);
  const [mk, setMk] = useState<HotelT | null>(null);
  const [md, setMd] = useState<HotelT | null>(null);
  const [dur, setDur] = useState("21 Days");
  const [nights, setNights] = useState("");
  const [occ, setOcc] = useState<Occ>("quad");
  const duration = dur === "Custom" ? `${nights || "?"} Nights (custom)` : dur;
  const pick = (h: HotelT, sel: HotelT | null, set: (h: HotelT) => void) => (
    <button key={h.name} onClick={() => { set(h); setStep((s) => s + 1); }} className={`text-left rounded-xl border p-3 ${sel?.name === h.name ? "border-[#D4AF37] bg-[#D4AF37]/10" : "border-white/15 bg-white/5"}`}>
      <p className="font-semibold text-sm">{h.name}</p><p className="text-xs text-[#D4AF37]">{h.dist}</p>{h.note && <p className="text-[11px] text-white/50">{h.note}</p>}
    </button>
  );
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5">
      <div className="flex gap-2 mb-5">{[1, 2, 3, 4].map((n) => <button key={n} onClick={() => setStep(n)} className={`flex-1 h-1.5 rounded-full ${n <= step ? "bg-[#D4AF37]" : "bg-white/15"}`} aria-label={`Step ${n}`} />)}</div>
      <p className="text-[10px] tracking-[0.3em] text-[#D4AF37] mb-3">STEP {step} OF 4</p>
      {step === 1 && <><h3 className="font-display text-xl mb-3">Choose your Makkah hotel</h3><div className="grid sm:grid-cols-2 gap-2">{MAKKAH_HOTELS.map((h) => pick(h, mk, setMk))}</div></>}
      {step === 2 && <><h3 className="font-display text-xl mb-3">Choose your Madinah hotel</h3><div className="grid sm:grid-cols-2 gap-2">{MADINAH_HOTELS.map((h) => pick(h, md, setMd))}</div></>}
      {step === 3 && <div className="space-y-4">
        <h3 className="font-display text-xl">Room type & duration</h3>
        <Chips label="DURATION" value={dur} onChange={setDur} options={[{ key: "15 Days", label: "15 Days" }, { key: "21 Days", label: "21 Days" }, { key: "Custom", label: "Custom Nights" }]} />
        {dur === "Custom" && <input type="number" min={5} max={40} value={nights} onChange={(e) => setNights(e.target.value)} placeholder="Total nights" className="w-40 rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm" />}
        <Chips label="OCCUPANCY" value={occ} onChange={setOcc} options={OCCS} />
        <button onClick={() => setStep(4)} className="rounded-full bg-[#D4AF37] text-[#0F172A] font-semibold px-5 py-2 text-sm">See summary</button>
      </div>}
      {step === 4 && <div>
        <h3 className="font-display text-xl mb-3">Your custom package</h3>
        <ul className="space-y-1.5 text-sm mb-4">
          <li><Check className="inline size-4 text-[#D4AF37]" /> Makkah: {mk ? `${mk.name} (${mk.dist})` : "Not selected"}</li>
          <li><Check className="inline size-4 text-[#D4AF37]" /> Madinah: {md ? `${md.name} (${md.dist})` : "Not selected"}</li>
          <li><Check className="inline size-4 text-[#D4AF37]" /> Duration: {duration}</li>
          <li><Check className="inline size-4 text-[#D4AF37]" /> Room: {OCCS.find((o) => o.key === occ)!.label}</li>
        </ul>
        <div className="rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 p-4 mb-4"><p className="text-[10px] tracking-widest text-[#D4AF37]">ESTIMATED RATE</p><p className="font-display text-lg">Final quote on WhatsApp</p><p className="text-xs text-white/60">Our consultant confirms today's hotel & airline rates for your exact selection.</p></div>
        <button disabled={!mk || !md} onClick={() => onBook({ type: "Custom Package", airline: "Custom", makkah: `${mk!.name} (${mk!.dist})`, madinah: `${md!.name} (${md!.dist})`, occ: `${OCCS.find((o) => o.key === occ)!.label} · ${duration}`, rate: "Quote requested" })} className="w-full rounded-full bg-[#25D366] font-semibold py-3 disabled:opacity-40">Request this package</button>
      </div>}
    </div>
  );
}

function BookingModal({ s, onClose }: { s: Summary; onClose: () => void }) {
  const [f, setF] = useState({ name: "", phone: "", city: "", date: "", pax: "1" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim() || !f.phone.trim() || !f.city.trim()) return toast.error("Please fill name, WhatsApp number and city.");
    const msg = `Assalam-o-Alaikum Al-Bahr Travels!\n\nMain Website Se Package Book Karna Chahta Hoon:\n\n📌 PACKAGE SUMMARY:\n- Type: ${s.type}\n- Airline: ${s.airline}\n- Makkah Hotel: ${s.makkah}\n- Madinah Hotel: ${s.madinah}\n- Room Occupancy: ${s.occ}\n- Calculated Rate: ${s.rate === "Quote requested" ? s.rate : `PKR ${s.rate}/-`}\n\n👤 CLIENT INFO:\n- Name: ${f.name}\n- Phone: ${f.phone}\n- City: ${f.city}\n- Travel Date: ${f.date || "Flexible"}\n- Total Persons: ${f.pax}\n\nKripya Mujhse Jald Rabta Karein.`;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    toast.success("Booking sent on WhatsApp — our team will contact you soon.");
    onClose();
  };
  const inp = "w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2.5 text-sm focus:border-[#D4AF37] outline-none";
  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <form onSubmit={submit} className="relative w-full sm:max-w-md bg-[#0F172A] border border-[#D4AF37]/40 rounded-t-2xl sm:rounded-2xl p-6 max-h-[92vh] overflow-y-auto text-white">
        <button type="button" onClick={onClose} aria-label="Close" className="absolute top-3 right-3 p-2"><X className="size-5" /></button>
        <p className="text-[10px] tracking-[0.3em] text-[#D4AF37]">CONFIRM BOOKING</p>
        <h3 className="font-display text-xl mt-1">{s.type}</h3>
        <p className="text-xs text-white/60 mt-1">{s.occ} · {s.rate === "Quote requested" ? s.rate : `PKR ${s.rate}/-`}</p>
        <div className="grid gap-3 mt-5">
          <input className={inp} placeholder="Full Name *" value={f.name} onChange={set("name")} required maxLength={80} />
          <input className={inp} placeholder="WhatsApp Number *" value={f.phone} onChange={set("phone")} required maxLength={20} inputMode="tel" />
          <input className={inp} placeholder="City / Location *" value={f.city} onChange={set("city")} required maxLength={60} />
          <div className="grid grid-cols-2 gap-3">
            <input className={inp} type="date" value={f.date} onChange={set("date")} aria-label="Expected travel date" />
            <input className={inp} type="number" min={1} max={50} value={f.pax} onChange={set("pax")} aria-label="Total passengers" />
          </div>
        </div>
        <button type="submit" className="mt-5 w-full rounded-full bg-[#25D366] font-semibold py-3 inline-flex items-center justify-center gap-2"><MessageCircle className="size-5" />Confirm &amp; Send to CEO WhatsApp</button>
        <p className="mt-2 text-center text-[11px] text-white/50">03434762264 · CEO 03257938125</p>
      </form>
    </div>
  );
}
