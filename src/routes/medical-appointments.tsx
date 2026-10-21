import { createFileRoute } from "@tanstack/react-router";
import { BurgerMenu } from "@/components/BurgerMenu";
import { SiteFooter } from "@/components/SiteFooter";
import { WHATSAPP_URL } from "@/lib/countries";

const URL = "https://https-al-bahr-travels-consultants.lovable.app/medical-appointments";
const TITLE = "GAMCA / Wafid Medical Appointment Lahore | Al-Bahr Travels";
const DESC =
  "Gulf medical (GAMCA / Wafid) appointment booking for Saudi Arabia, UAE, Qatar, Kuwait, Oman and Bahrain. Document checklist and WhatsApp help from our Lahore office.";

const COUNTRIES = ["Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait", "Oman", "Bahrain"];
const DOCS = [
  "Original passport (valid at least 6 months)",
  "Passport copy and recent photographs",
  "CNIC copy",
  "Destination country and visa type / profession",
];
const STEPS = [
  "Send passport details on WhatsApp",
  "We book your appointment through the official Wafid system",
  "You receive your appointment slip and medical centre details",
  "Attend the medical centre on the given date",
];

export const Route = createFileRoute("/medical-appointments")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: MedicalPage,
});

function MedicalPage() {
  const msg = encodeURIComponent("Assalam o Alaikum, I need a GAMCA / Wafid medical appointment.");
  return (
    <div className="min-h-screen bg-background">
      <BurgerMenu />
      <main className="mx-auto max-w-5xl px-4 py-12 space-y-10">
        <header>
          <h1 className="font-serif text-3xl md:text-5xl text-foreground">GAMCA / Wafid Medical Appointments</h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Gulf medical appointment booking for workers and visitors travelling to the GCC. We book only through
            the official system — no one can promise a medical result or visa approval.
          </p>
        </header>
        <section>
          <h2 className="font-serif text-2xl text-foreground">Countries covered</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {COUNTRIES.map((c) => (
              <li key={c} className="rounded-full border border-border px-4 py-1 text-sm text-foreground">{c}</li>
            ))}
          </ul>
        </section>
        <section className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl text-foreground">Documents needed</h2>
            <ul className="mt-3 list-disc pl-5 text-muted-foreground space-y-1">{DOCS.map((d) => <li key={d}>{d}</li>)}</ul>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-foreground">How it works</h2>
            <ol className="mt-3 list-decimal pl-5 text-muted-foreground space-y-1">{STEPS.map((s) => <li key={s}>{s}</li>)}</ol>
          </div>
        </section>
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-serif text-2xl text-foreground">Fees</h2>
          <p className="mt-2 text-muted-foreground">Rate on request — final quote on WhatsApp before any payment.</p>
          <a href={`${WHATSAPP_URL}?text=${msg}`} target="_blank" rel="noopener noreferrer"
            className="mt-4 inline-block rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground">
            Book on WhatsApp
          </a>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
