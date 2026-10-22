import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Image as ImageIcon,
  MessageCircle,
  X,
  BadgeCheck,
  Briefcase,
  Banknote,
  Users,
  Cake,
  FileCheck2,
  Phone,
  Home,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/leads.functions";
import { JOB_OFFERS, JOB_COUNTRIES, type JobOffer, type JobCountry } from "@/lib/job-offers";

export function JobOffers() {
  const [country, setCountry] = useState<JobCountry | "all">("all");
  const [booking, setBooking] = useState<JobOffer | null>(null);
  const [flyer, setFlyer] = useState<JobOffer | null>(null);

  const list = useMemo(
    () => JOB_OFFERS.filter((o) => country === "all" || o.country === country),
    [country],
  );

  return (
    <section className="relative bg-[#0F172A] text-white px-4 sm:px-8 py-12">
      <div className="text-center mb-6">
        <p className="text-[11px] tracking-[0.35em] text-[#D4AF37]">WORK PERMITS · ABROAD JOBS</p>
        <h2 className="font-display text-3xl sm:text-4xl mt-2">
          Job Offers &amp; <span className="text-[#D4AF37]">Work Permits</span>
        </h2>
        <p className="text-sm text-white/60 mt-2 max-w-xl mx-auto">
          Legal work permit jobs in Turkey, Poland and Albania — food, accommodation and medical
          included as per flyer. Book below and our team contacts you.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 justify-start sm:justify-center">
        {JOB_COUNTRIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setCountry(c.key)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold border transition ${
              country === c.key
                ? "bg-[#D4AF37] text-[#0F172A] border-[#D4AF37]"
                : "border-white/20 text-white/80 hover:border-[#D4AF37]"
            }`}
          >
            {c.flag} {c.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {list.map((o) => (
          <article
            key={o.id}
            className="text-left rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur p-5 hover:border-[#D4AF37] transition"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold tracking-wide">
                {o.flag} {o.country.toUpperCase()}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] tracking-widest rounded-full bg-[#D4AF37]/15 text-[#D4AF37] px-2.5 py-1">
                <FileCheck2 className="size-3" /> WORK PERMIT
              </span>
            </div>
            <h3 className="font-display text-xl text-[#D4AF37]">{o.title}</h3>

            <div className="mt-3 space-y-1.5">
              {o.roles.map((r) => (
                <p key={r} className="flex items-start gap-2 text-sm text-white/85">
                  <Briefcase className="size-4 text-[#D4AF37] mt-0.5 shrink-0" />
                  {r}
                </p>
              ))}
            </div>

            <p className="mt-3 flex items-center gap-2 text-sm">
              <Banknote className="size-4 text-[#D4AF37] shrink-0" />
              <span className="text-white/50 text-xs">Salary (flyer):</span>
              <span className="font-semibold text-[#D4AF37]">{o.salary}</span>
            </p>
            {(o.age || o.gender) && (
              <p className="mt-1.5 flex items-center gap-2 text-xs text-white/65">
                {(o.age ? Cake : Users).toString() && o.age ? (
                  <Cake className="size-4 text-[#D4AF37] shrink-0" />
                ) : (
                  <Users className="size-4 text-[#D4AF37] shrink-0" />
                )}
                {[o.gender, o.age].filter(Boolean).join(" · ")}
              </p>
            )}
            {o.paymentPlan && (
              <p className="mt-1.5 text-xs text-white/65">💳 {o.paymentPlan}</p>
            )}

            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
              {o.benefits.map((b) => (
                <span key={b} className="inline-flex items-center gap-1 text-[10px] text-white/60">
                  <BadgeCheck className="size-3 text-[#D4AF37]" />
                  {b}
                </span>
              ))}
            </div>

            {o.note && (
              <p className="mt-3 rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37]/10 p-2.5 text-[11px] text-white/80">
                ⚠️ {o.note}
              </p>
            )}

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] tracking-widest text-white/50">DIRECT HIRING</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFlyer(o)}
                  className="inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/60 text-[#D4AF37] px-3 py-1.5 text-xs font-semibold hover:bg-[#D4AF37]/10 transition"
                >
                  <ImageIcon className="size-3.5" /> View Flyer
                </button>
                <button
                  type="button"
                  onClick={() => setBooking(o)}
                  className="inline-flex items-center gap-1 rounded-full bg-[#25D366] text-[#0F172A] px-3 py-1.5 text-xs font-semibold hover:opacity-90 transition"
                >
                  <MessageCircle className="size-3.5" /> Book Now
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 text-center text-[11px] text-white/50 max-w-2xl mx-auto">
        All details above are taken from our official flyers. Final fees, contract and processing
        time are confirmed on WhatsApp before any payment.
      </p>

      {flyer && <FlyerModal o={flyer} onClose={() => setFlyer(null)} onBook={() => { setFlyer(null); setBooking(flyer); }} />}
      {booking && <BookingModal o={booking} onClose={() => setBooking(null)} />}
    </section>
  );
}

function FlyerModal({ o, onClose, onBook }: { o: JobOffer; onClose: () => void; onBook: () => void }) {
  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />
      <div className="relative max-w-md w-full max-h-[92vh] overflow-y-auto rounded-2xl overflow-hidden border-2 border-[#D4AF37] bg-[#0F172A] text-white shadow-2xl">
        <button onClick={onClose} aria-label="Close flyer" className="absolute top-2 right-2 p-2 rounded-full bg-black/60 z-10">
          <X className="size-5" />
        </button>
        <img src={o.flyer} alt={`${o.title} — official Al-Bahr flyer`} className="w-full h-auto" />
        <div className="p-4">
          <button onClick={onBook} className="w-full rounded-full bg-[#25D366] text-[#0F172A] font-semibold py-2.5 inline-flex items-center justify-center gap-2">
            <MessageCircle className="size-4" /> Book this offer
          </button>
          <p className="text-center text-[11px] text-white/60 mt-2">03434762264 · 03257938125</p>
        </div>
      </div>
    </div>
  );
}

function BookingModal({ o, onClose }: { o: JobOffer; onClose: () => void }) {
  const submitLeadFn = useServerFn(submitLead);
  const [f, setF] = useState({ name: "", phone: "", city: "", age: "", experience: "", email: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });
  const [to, setTo] = useState("923434762264");
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim() || !f.phone.trim() || !f.city.trim()) {
      return toast.error("Please fill name, WhatsApp number and city.");
    }
    setSending(true);
    const parts = f.name.trim().split(/\s+/);
    try {
      await submitLeadFn({
        data: {
          first_name: parts[0],
          last_name: parts.slice(1).join(" ") || "-",
          email: f.email.trim(),
          phone: f.phone.trim(),
          target_country: `${o.country} — ${o.title}`,
          source_type: "job_offer_booking",
          service_key: "jobs",
          extras: [
            { label: "Job Offer", value: o.title },
            { label: "Roles", value: o.roles.join(", ") },
            { label: "Salary (flyer)", value: o.salary },
            { label: "City", value: f.city.trim() },
            { label: "Age", value: f.age.trim() },
            { label: "Experience / Qualification", value: f.experience.trim() },
          ],
        },
      });
    } catch (err) {
      console.error("[jobs] lead save failed", err);
    }
    const msg = `Assalam-o-Alaikum Al-Bahr Travels!\n\nMain Website Se Job Offer Book Karna Chahta Hoon:\n\n📌 JOB DETAILS:\n- Country: ${o.country}\n- Offer: ${o.title}\n- Roles: ${o.roles.join(", ")}\n- Salary (flyer): ${o.salary}\n\n👤 APPLICANT INFO:\n- Name: ${f.name}\n- Phone: ${f.phone}\n- City: ${f.city}\n- Age: ${f.age || "Not given"}\n- Experience / Qualification: ${f.experience || "Not given"}\n\nKripya Mujhse Jald Rabta Karein.`;
    window.open(`https://wa.me/${to}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    toast.success("Booking sent on WhatsApp — our team will contact you soon.");
    setSending(false);
    onClose();
  };

  const inp = "w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-[#D4AF37] outline-none";
  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <form onSubmit={submit} className="relative w-full sm:max-w-md bg-[#0F172A] border border-[#D4AF37]/40 rounded-t-2xl sm:rounded-2xl p-6 max-h-[92vh] overflow-y-auto text-white">
        <button type="button" onClick={onClose} aria-label="Close" className="absolute top-3 right-3 p-2">
          <X className="size-5" />
        </button>
        <p className="text-[10px] tracking-[0.3em] text-[#D4AF37]">CONFIRM JOB BOOKING</p>
        <h3 className="font-display text-xl mt-1">
          {o.flag} {o.title}
        </h3>
        <p className="text-xs text-white/60 mt-1">
          {o.salary} · {o.country}
        </p>
        <div className="grid gap-3 mt-5">
          <input className={inp} placeholder="Full Name *" value={f.name} onChange={set("name")} required maxLength={80} />
          <input className={inp} placeholder="WhatsApp Number *" value={f.phone} onChange={set("phone")} required maxLength={20} inputMode="tel" />
          <input className={inp} placeholder="City / Location *" value={f.city} onChange={set("city")} required maxLength={60} />
          <div className="grid grid-cols-2 gap-3">
            <input className={inp} type="number" min={18} max={65} value={f.age} onChange={set("age")} aria-label="Your age" placeholder="Age" />
            <input className={inp} placeholder="Experience / Qualification" value={f.experience} onChange={set("experience")} maxLength={120} />
          </div>
          <input className={inp} type="email" placeholder="Email (optional)" value={f.email} onChange={set("email")} maxLength={160} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          {[
            ["923434762264", "Office 03434762264"],
            ["923257938125", "CEO 03257938125"],
          ].map(([n, l]) => (
            <button
              key={n}
              type="button"
              onClick={() => setTo(n)}
              className={`rounded-full border px-2 py-2 inline-flex items-center justify-center gap-1.5 ${
                to === n ? "border-[#D4AF37] bg-[#D4AF37]/20 text-[#D4AF37]" : "border-white/20 text-white/70"
              }`}
            >
              <Phone className="size-3" /> {l}
            </button>
          ))}
        </div>
        <button
          type="submit"
          disabled={sending}
          className="mt-3 w-full rounded-full bg-[#25D366] text-[#0F172A] font-semibold py-3 inline-flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <MessageCircle className="size-5" />
          {sending ? "Sending…" : "Confirm & Send on WhatsApp"}
        </button>
        <p className="mt-3 flex items-start gap-1.5 text-[10px] text-white/50">
          <Home className="size-3.5 mt-0.5 shrink-0" />
          Your booking is saved with our office and sent to the number you picked above.
        </p>
      </form>
    </div>
  );
}
