import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/leads.functions";
import { WORLD_COUNTRIES } from "@/lib/countries";

type Props = {
  subject: string;
  sourceType: string;
  requirePassport?: boolean;
  onBack?: () => void;
  onDone: () => void;
  backLabel?: string;
};

export function LeadForm({
  subject,
  sourceType,
  requirePassport = true,
  onBack,
  onDone,
  backLabel = "Change country",
}: Props) {
  const submit = useServerFn(submitLead);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    residence_country: "",
    passport_number: "",
    passport_expiry: "",
    visa_number: "",
    visa_expiry: "",
    message: "",
  });

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await submit({
        data: {
          ...form,
          passport_number: requirePassport ? form.passport_number : "",
          passport_expiry: requirePassport ? form.passport_expiry : "",
          visa_number: requirePassport ? form.visa_number : "",
          visa_expiry: requirePassport ? form.visa_expiry : "",
          target_country: subject,
          source_type: sourceType,
        },
      });
      if (res.email?.sent) {
        toast.success("Request received — our consultant will contact you shortly.");
      } else {
        toast.success("Request saved — our consultant will reach out shortly.");
      }
      onDone();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-gold/60 focus:bg-white/10 transition-colors";

  return (
    <form onSubmit={onSubmit}>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold mb-4"
        >
          <ArrowLeft className="size-4" /> {backLabel}
        </button>
      )}

      <p className="text-xs tracking-[0.3em] text-gold mb-2">REQUEST DETAILS</p>
      <h2 className="text-3xl font-display mb-1">
        <span className="text-gold-gradient">{subject}</span>
      </h2>
      <p className="text-muted-foreground text-sm mb-8">
        Fill the details below — your information is private and routed directly to our Lahore consultants.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <Labeled label="First Name">
          <input required value={form.first_name} onChange={update("first_name")} className={inputClass} />
        </Labeled>
        <Labeled label="Last Name">
          <input required value={form.last_name} onChange={update("last_name")} className={inputClass} />
        </Labeled>
        <Labeled label="Email Address">
          <input
            required
            type="email"
            value={form.email}
            onChange={update("email")}
            className={inputClass}
            placeholder="you@example.com"
          />
        </Labeled>
        <Labeled label="Phone Number">
          <input required type="tel" value={form.phone} onChange={update("phone")} className={inputClass} />
        </Labeled>
        <Labeled label="Current Country of Residence">
          <select
            required
            value={form.residence_country}
            onChange={update("residence_country")}
            className={`${inputClass} appearance-none`}
          >
            <option value="" disabled>
              Select your country
            </option>
            {WORLD_COUNTRIES.map((c) => (
              <option key={c.code} value={c.name} className="bg-[var(--midnight-light)]">
                {c.flag}  {c.name}
              </option>
            ))}
          </select>
        </Labeled>
        {requirePassport && (
          <>
            <Labeled label="Passport Number">
              <input
                required
                value={form.passport_number}
                onChange={update("passport_number")}
                className={inputClass}
              />
            </Labeled>
            <Labeled label="Passport Expiry Date">
              <input
                required
                type="date"
                value={form.passport_expiry}
                onChange={update("passport_expiry")}
                className={inputClass}
              />
            </Labeled>
            <Labeled label="Visa Number (if any)">
              <input
                value={form.visa_number}
                onChange={update("visa_number")}
                className={inputClass}
              />
            </Labeled>
            <Labeled label="Visa Expiry Date (if any)">
              <input
                type="date"
                value={form.visa_expiry}
                onChange={update("visa_expiry")}
                className={inputClass}
              />
            </Labeled>
          </>
        )}
      </div>

      <Labeled label="Your Message / Request" className="mt-4 block">
        <textarea
          value={form.message}
          onChange={update("message")}
          rows={4}
          maxLength={2000}
          placeholder="Tell us about your appointment, travel dates, or any specific requirement…"
          className={inputClass}
        />
      </Labeled>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full bg-gold-gradient text-[var(--midnight)] font-semibold py-4 rounded-xl shadow-gold hover:opacity-95 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="size-4 animate-spin" />}
        {loading ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
}

function Labeled({
  label,
  children,
  className = "block",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
