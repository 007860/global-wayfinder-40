import { createFileRoute } from "@tanstack/react-router";
import { UmrahEngine } from "@/components/UmrahEngine";
import { BurgerMenu } from "@/components/BurgerMenu";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_URL, LOGO_URL, breadcrumbLd, faqLd, jsonScript } from "@/lib/seo";

const URL = `${SITE_URL}/umrah-packages`;
const TITLE = "Umrah Packages from Lahore & Islamabad | AL BAHR HORIZON";
const DESC =
  "Umrah packages from Lahore & Islamabad with named Makkah & Madinah hotels, distance from Haram and PKR prices for sharing, quad, triple and double rooms. Departure dates on request — book on WhatsApp.";

const UMRAH_FAQS = [
  {
    q: "How much does an Umrah package cost from Pakistan?",
    a: "Prices depend on the Makkah and Madinah hotels, distance from the Haram, room occupancy and departure date. Every package shows sharing, quad, triple and double rates, and the final quote is confirmed on WhatsApp before any payment.",
  },
  {
    q: "Which cities do Umrah departures leave from?",
    a: "Umrah departures leave from Lahore and Islamabad.",
  },
  {
    q: "How long are the Umrah packages?",
    a: "Packages are available in 15-day and 21-day options, and a custom package builder lets you choose your hotels, duration and room type.",
  },
  {
    q: "What is included in an Umrah package?",
    a: "Umrah visa, return air ticket, Makkah and Madinah hotel accommodation, transport in Saudi Arabia, and ziarat guidance.",
  },
  {
    q: "How do I book an Umrah package?",
    a: "Choose a package and tap Book Now, or message us on WhatsApp at +92 343 4762264. Your booking is confirmed with a written quotation before any payment.",
  },
  {
    q: "Are the departure dates on this page fixed?",
    a: "Only upcoming departures are listed — past departures are removed automatically. New dates are added regularly; ask on WhatsApp for the latest departures.",
  },
];

export const Route = createFileRoute("/umrah-packages")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: LOGO_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: LOGO_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: jsonScript(
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Umrah Packages", path: "/umrah-packages" },
      ]),
      faqLd(UMRAH_FAQS),
    ),
  }),
  component: UmrahPage,
});

function UmrahPage() {
  return (
    <div className="min-h-screen bg-background">
      <BurgerMenu />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="font-serif text-3xl md:text-5xl text-foreground">Umrah Packages from Lahore &amp; Islamabad</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          Umrah packages with named hotels, distance from the Haram and full PKR prices per person.
          Every booking is confirmed with a written quotation on WhatsApp before any payment.
        </p>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
          Only upcoming departures are listed — past departures are removed automatically.
          New dates are added regularly; message us on WhatsApp for the latest departures.
        </p>
        <div className="mt-8">
          <UmrahEngine />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
