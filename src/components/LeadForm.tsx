import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/leads.functions";

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
    phone: "",
    email: "",
    message: "",
    passport_number: "",
    visa_number: "",
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
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
          visa_number: requirePassport ? form.visa_number : "",
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
        <Field label="First Name" value={form.first_name} onChange={update("first_name")} />
        <Field label="Last Name" value={form.last_name} onChange={update("last_name")} />
        <Field label="Email Address" value={form.email} onChange={update("email")} type="email" />
        <Field label="Phone Number" value={form.phone} onChange={update("phone")} type="tel" />
        {requirePassport && (
          <>
            <Field
              label="Passport Number"
              value={form.passport_number}
              onChange={update("passport_number")}
            />
            <Field
              label="Visa Number"
              value={form.visa_number}
              onChange={update("visa_number")}
            />
          </>
        )}
      </div>

      <label className="block mt-4">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">Message / Request</span>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={update("message")}
          placeholder="Tell us briefly what you need…"
          className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-gold/60 focus:bg-white/10 transition-colors resize-y"
        />
      </label>

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

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        required
        type={type}
        value={value}
        onChange={onChange}
        className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-gold/60 focus:bg-white/10 transition-colors"
      />
    </label>
  );
}
