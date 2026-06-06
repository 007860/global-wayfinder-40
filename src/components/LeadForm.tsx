import { useMemo, useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/leads.functions";
import { WORLD_COUNTRIES } from "@/lib/countries";

export type LeadServiceKey = "medical" | "visa" | "flight" | "hotel";

type Props = {
  subject: string;
  sourceType: string;
  serviceKey?: LeadServiceKey;
  requirePassport?: boolean;
  onBack?: () => void;
  onDone: () => void;
  backLabel?: string;
};

const inputClass =
  "mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-gold/60 focus:bg-white/10 transition-colors text-base";

const selectClass = `${inputClass} appearance-none`;

export function LeadForm({
  subject,
  sourceType,
  serviceKey,
  requirePassport,
  onBack,
  onDone,
  backLabel = "Change country",
}: Props) {
  const submit = useServerFn(submitLead);
  const [loading, setLoading] = useState(false);

  // Derive passport/visa requirements from serviceKey when provided.
  const needsPassport = serviceKey
    ? true // medical, visa, flight, hotel all need passport
    : requirePassport ?? true;
  const needsVisa = serviceKey === "visa";

  const [core, setCore] = useState({
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

  // Service-specific extra fields. Stored as plain string map for flexibility.
  const initialExtras = useMemo(() => initialExtrasFor(serviceKey), [serviceKey]);
  const [extras, setExtras] = useState<Record<string, string>>(initialExtras);

  const updateCore =
    (k: keyof typeof core) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setCore((f) => ({ ...f, [k]: e.target.value }));

  const updateExtra =
    (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setExtras((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const extrasList = serializeExtras(serviceKey, extras);
      const res = await submit({
        data: {
          ...core,
          passport_number: needsPassport ? core.passport_number : "",
          passport_expiry: needsPassport ? core.passport_expiry : "",
          visa_number: needsVisa ? core.visa_number : "",
          visa_expiry: needsVisa ? core.visa_expiry : "",
          target_country: subject,
          source_type: sourceType,
          service_key: serviceKey ?? "",
          extras: extrasList,
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
      <h2 className="text-2xl sm:text-3xl font-display mb-1">
        <span className="text-gold-gradient">{subject}</span>
      </h2>
      <p className="text-muted-foreground text-sm mb-8">
        Fill the details below — your information is private and routed directly to our Lahore consultants.
      </p>

      <SectionTitle>Personal details</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-4">
        <Labeled label="First Name">
          <input required value={core.first_name} onChange={updateCore("first_name")} className={inputClass} />
        </Labeled>
        <Labeled label="Last Name">
          <input required value={core.last_name} onChange={updateCore("last_name")} className={inputClass} />
        </Labeled>
        <Labeled label="Email Address">
          <input required type="email" value={core.email} onChange={updateCore("email")} className={inputClass} placeholder="you@example.com" />
        </Labeled>
        <Labeled label="Phone Number">
          <input required type="tel" value={core.phone} onChange={updateCore("phone")} className={inputClass} />
        </Labeled>
        <Labeled label="Current Country of Residence" className="block sm:col-span-2">
          <select required value={core.residence_country} onChange={updateCore("residence_country")} className={selectClass}>
            <option value="" disabled>Select your country</option>
            {WORLD_COUNTRIES.map((c) => (
              <option key={c.code} value={c.name} className="bg-[var(--midnight-light)]">
                {c.flag}  {c.name}
              </option>
            ))}
          </select>
        </Labeled>
      </div>

      {needsPassport && (
        <>
          <SectionTitle className="mt-8">Travel documents</SectionTitle>
          <div className="grid sm:grid-cols-2 gap-4">
            <Labeled label="Passport Number">
              <input required value={core.passport_number} onChange={updateCore("passport_number")} className={inputClass} />
            </Labeled>
            <Labeled label="Passport Expiry Date">
              <input required type="date" value={core.passport_expiry} onChange={updateCore("passport_expiry")} className={inputClass} />
            </Labeled>
            {needsVisa && (
              <>
                <Labeled label="Visa Number">
                  <input required value={core.visa_number} onChange={updateCore("visa_number")} className={inputClass} />
                </Labeled>
                <Labeled label="Visa Expiry Date">
                  <input required type="date" value={core.visa_expiry} onChange={updateCore("visa_expiry")} className={inputClass} />
                </Labeled>
              </>
            )}
          </div>
        </>
      )}

      {serviceKey && (
        <>
          <SectionTitle className="mt-8">{serviceTitle(serviceKey)}</SectionTitle>
          <ServiceFields serviceKey={serviceKey} values={extras} onChange={updateExtra} />
        </>
      )}

      <Labeled label="Your Message / Request" className="mt-6 block">
        <textarea
          value={core.message}
          onChange={updateCore("message")}
          rows={4}
          maxLength={2000}
          placeholder="Anything else we should know?"
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

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-xs tracking-[0.25em] text-gold uppercase mb-3 ${className}`}>{children}</p>
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

function serviceTitle(key: LeadServiceKey) {
  switch (key) {
    case "flight": return "Flight details";
    case "hotel": return "Stay details";
    case "visa": return "Visa appointment details";
    case "medical": return "Medical appointment details";
  }
}

function initialExtrasFor(key?: LeadServiceKey): Record<string, string> {
  switch (key) {
    case "flight":
      return {
        from_location: "", to_location: "", departure_date: "", return_date: "",
        ticket_type: "Oneway", class_type: "Economy",
        adults: "1", children: "0", infants: "0",
        baggage: "Standard Allowance",
      };
    case "hotel":
      return {
        destination_city: "", checkin: "", checkout: "",
        rooms: "1", guests_per_room: "2",
        star_rating: "Any", meal_plan: "Room Only",
      };
    case "visa":
      return {
        visa_type: "Tourist / Visit Visa",
        earliest_date: "", latest_date: "",
        document_status: "Just starting",
      };
    case "medical":
      return {
        medical_city: "", preferred_date: "",
        medical_type: "New Employment Visa Medical",
      };
    default:
      return {};
  }
}

const FIELD_LABELS: Record<string, string> = {
  from_location: "From (Country & City)",
  to_location: "To (Country & City)",
  departure_date: "Departure Date",
  return_date: "Return Date",
  ticket_type: "Ticket Type",
  class_type: "Class Type",
  adults: "Adults",
  children: "Children",
  infants: "Infants",
  baggage: "Baggage Allowance",
  destination_city: "Destination (Country & City)",
  checkin: "Check-in Date",
  checkout: "Check-out Date",
  rooms: "Number of Rooms",
  guests_per_room: "Guests per Room",
  star_rating: "Preferred Star Rating",
  meal_plan: "Meal Plan",
  visa_type: "Visa Type Applied For",
  earliest_date: "Earliest Acceptable Date",
  latest_date: "Latest Acceptable Date",
  document_status: "Document Readiness",
  medical_city: "Medical Center City",
  preferred_date: "Preferred Medical Date",
  medical_type: "Medical Type / Purpose",
};

function ServiceFields({
  serviceKey,
  values,
  onChange,
}: {
  serviceKey: LeadServiceKey;
  values: Record<string, string>;
  onChange: (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}) {
  if (serviceKey === "flight") {
    const isRound = values.ticket_type === "Round Trip";
    return (
      <div className="grid sm:grid-cols-2 gap-4">
        <Labeled label="From (Country & City)">
          <input required value={values.from_location} onChange={onChange("from_location")} className={inputClass} placeholder="e.g. Pakistan, Lahore" />
        </Labeled>
        <Labeled label="To (Country & City)">
          <input required value={values.to_location} onChange={onChange("to_location")} className={inputClass} placeholder="e.g. UAE, Dubai (excluding Israel)" />
        </Labeled>
        <Labeled label="Ticket Type">
          <select value={values.ticket_type} onChange={onChange("ticket_type")} className={selectClass}>
            {["Oneway", "Round Trip", "Multi-City"].map((o) => (
              <option key={o} className="bg-[var(--midnight-light)]">{o}</option>
            ))}
          </select>
        </Labeled>
        <Labeled label="Class Type">
          <select value={values.class_type} onChange={onChange("class_type")} className={selectClass}>
            {["Economy", "Premium Economy", "Business", "First Class"].map((o) => (
              <option key={o} className="bg-[var(--midnight-light)]">{o}</option>
            ))}
          </select>
        </Labeled>
        <Labeled label="Departure Date">
          <input required type="date" value={values.departure_date} onChange={onChange("departure_date")} className={inputClass} />
        </Labeled>
        {isRound && (
          <Labeled label="Return Date">
            <input required type="date" value={values.return_date} onChange={onChange("return_date")} className={inputClass} />
          </Labeled>
        )}
        <Labeled label="Adults (12+)">
          <input required type="number" min={1} value={values.adults} onChange={onChange("adults")} className={inputClass} />
        </Labeled>
        <Labeled label="Children (2–11)">
          <input type="number" min={0} value={values.children} onChange={onChange("children")} className={inputClass} />
        </Labeled>
        <Labeled label="Infants (under 2)">
          <input type="number" min={0} value={values.infants} onChange={onChange("infants")} className={inputClass} />
        </Labeled>
        <Labeled label="Baggage Allowance">
          <select value={values.baggage} onChange={onChange("baggage")} className={selectClass}>
            {["Standard Allowance", "Extra Baggage Needed"].map((o) => (
              <option key={o} className="bg-[var(--midnight-light)]">{o}</option>
            ))}
          </select>
        </Labeled>
      </div>
    );
  }

  if (serviceKey === "hotel") {
    return (
      <div className="grid sm:grid-cols-2 gap-4">
        <Labeled label="Destination (Country & City)" className="block sm:col-span-2">
          <input required value={values.destination_city} onChange={onChange("destination_city")} className={inputClass} placeholder="e.g. Saudi Arabia, Makkah" />
        </Labeled>
        <Labeled label="Check-in Date">
          <input required type="date" value={values.checkin} onChange={onChange("checkin")} className={inputClass} />
        </Labeled>
        <Labeled label="Check-out Date">
          <input required type="date" value={values.checkout} onChange={onChange("checkout")} className={inputClass} />
        </Labeled>
        <Labeled label="Number of Rooms">
          <input required type="number" min={1} value={values.rooms} onChange={onChange("rooms")} className={inputClass} />
        </Labeled>
        <Labeled label="Guests per Room">
          <input required type="number" min={1} value={values.guests_per_room} onChange={onChange("guests_per_room")} className={inputClass} />
        </Labeled>
        <Labeled label="Preferred Star Rating">
          <select value={values.star_rating} onChange={onChange("star_rating")} className={selectClass}>
            {["Any", "1 Star", "2 Star", "3 Star", "4 Star", "5 Star"].map((o) => (
              <option key={o} className="bg-[var(--midnight-light)]">{o}</option>
            ))}
          </select>
        </Labeled>
        <Labeled label="Meal Plan">
          <select value={values.meal_plan} onChange={onChange("meal_plan")} className={selectClass}>
            {["Room Only", "Breakfast Included", "Half Board", "Full Board / All-Inclusive"].map((o) => (
              <option key={o} className="bg-[var(--midnight-light)]">{o}</option>
            ))}
          </select>
        </Labeled>
      </div>
    );
  }

  if (serviceKey === "visa") {
    return (
      <div className="grid sm:grid-cols-2 gap-4">
        <Labeled label="Visa Type Applied For" className="block sm:col-span-2">
          <select value={values.visa_type} onChange={onChange("visa_type")} className={selectClass}>
            {["Tourist / Visit Visa", "Work Visa", "Student Visa", "Business Visa", "Family Reunion"].map((o) => (
              <option key={o} className="bg-[var(--midnight-light)]">{o}</option>
            ))}
          </select>
        </Labeled>
        <Labeled label="Earliest Acceptable Date">
          <input required type="date" value={values.earliest_date} onChange={onChange("earliest_date")} className={inputClass} />
        </Labeled>
        <Labeled label="Latest Acceptable Date">
          <input required type="date" value={values.latest_date} onChange={onChange("latest_date")} className={inputClass} />
        </Labeled>
        <Labeled label="Document Readiness" className="block sm:col-span-2">
          <select value={values.document_status} onChange={onChange("document_status")} className={selectClass}>
            {["All documents ready", "Bank statement pending", "Job letter pending", "Just starting"].map((o) => (
              <option key={o} className="bg-[var(--midnight-light)]">{o}</option>
            ))}
          </select>
        </Labeled>
      </div>
    );
  }

  // medical
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <Labeled label="Medical Center City">
        <input required value={values.medical_city} onChange={onChange("medical_city")} className={inputClass} placeholder="e.g. Riyadh, Dubai, Doha" />
      </Labeled>
      <Labeled label="Preferred Medical Date">
        <input required type="date" value={values.preferred_date} onChange={onChange("preferred_date")} className={inputClass} />
      </Labeled>
      <Labeled label="Medical Type / Purpose" className="block sm:col-span-2">
        <select value={values.medical_type} onChange={onChange("medical_type")} className={selectClass}>
          {["New Employment Visa Medical", "Visa Renewal Medical", "Family Residency Medical"].map((o) => (
            <option key={o} className="bg-[var(--midnight-light)]">{o}</option>
          ))}
        </select>
      </Labeled>
    </div>
  );
}

function serializeExtras(
  serviceKey: LeadServiceKey | undefined,
  extras: Record<string, string>,
): { label: string; value: string }[] {
  if (!serviceKey) return [];
  const order = ORDER[serviceKey];
  return order
    .filter((k) => {
      if (serviceKey === "flight" && k === "return_date" && extras.ticket_type !== "Round Trip") return false;
      return true;
    })
    .map((k) => ({ label: FIELD_LABELS[k] ?? k, value: extras[k] ?? "" }));
}

const ORDER: Record<LeadServiceKey, string[]> = {
  flight: [
    "from_location", "to_location", "ticket_type", "class_type",
    "departure_date", "return_date", "adults", "children", "infants", "baggage",
  ],
  hotel: [
    "destination_city", "checkin", "checkout",
    "rooms", "guests_per_room", "star_rating", "meal_plan",
  ],
  visa: ["visa_type", "earliest_date", "latest_date", "document_status"],
  medical: ["medical_city", "preferred_date", "medical_type"],
};
