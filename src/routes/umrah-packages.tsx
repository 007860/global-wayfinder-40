import { createFileRoute, Link } from "@tanstack/react-router";
import { UmrahEngine } from "@/components/UmrahEngine";
import { BurgerMenu } from "@/components/BurgerMenu";
import { SiteFooter } from "@/components/SiteFooter";
import { getUmrahPackages } from "@/lib/listings.functions";
import { toUmrahPkg } from "@/lib/listings";
import { SITE_URL, LOGO_URL, breadcrumbLd, faqLd, jsonScript } from "@/lib/seo";

const URL = `${SITE_URL}/umrah-packages`;
const TITLE = "Umrah Packages from Lahore & Karachi | December 2026 | AL BAHR HORIZON";
const DESC =
  "December 2026 Umrah groups from Lahore & Karachi with named Makkah & Madinah hotels, distance from Haram and PKR prices for sharing, quad, triple and double rooms. Sharing from PKR 248,999 \u2014 book on WhatsApp.";

const UMRAH_FAQS = [
  {
    q: "How much does an Umrah package cost from Pakistan?",
    a: "Prices depend on the Makkah and Madinah hotels, distance from the Haram, room occupancy and departure date. December 2026 groups are priced from PKR 248,999 sharing. Every package shows sharing, quad, triple and double rates, and the final quote is confirmed on WhatsApp before any payment.",
  },
  {
    q: "Which cities do Umrah departures leave from?",
    a: "December 2026 groups depart from Lahore (31 groups) and Karachi (4 groups). If you are travelling from Islamabad, Bahawalnagar, Sahiwal, Pakpattan or Marla Chowk, message us on WhatsApp and we will arrange your travel with the same packages.",
  },
  {
    q: "How long are the Umrah packages?",
    a: "December 2026 groups are 14, 19, 20 or 21 nights, with 8\u201312 nights in Makkah and 6\u20139 nights in Madinah. A custom package builder also lets you choose your hotels, duration and room type.",
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
    a: "Only upcoming departures are listed \u2014 past departures are removed automatically. New dates are added regularly; ask on WhatsApp for the latest departures.",
  },
];

export const Route = createFileRoute("/umrah-packages")({
  // Server-side load so the verified packages are in the HTML crawlers see
  // (previously the engine fetched them client-side and search engines saw
  // the empty "Loading packages\u2026" state). Same pattern as /blogs.
  loader: async () => ({ packages: (await getUmrahPackages()).map(toUmrahPkg) }),
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
  const { packages } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background">
      <BurgerMenu />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="font-serif text-3xl md:text-5xl text-foreground">Umrah Packages from Lahore &amp; Karachi</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          December 2026 groups depart from Lahore (31 groups) and Karachi (4 groups), 1\u201331 December 2026, on Saudi Arabian Airlines and Fly Jinnah \u2014 with named hotels, distance from the Haram and full PKR prices per person.
          Every booking is confirmed with a written quotation on WhatsApp before any payment.
        </p>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
          Only upcoming departures are listed \u2014 past departures are removed automatically.
          New dates are added regularly; message us on WhatsApp for the latest departures.
        </p>
        <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
          Travelling from another city?{" "}
          <Link to="/umrah-from-lahore" className="text-gold hover:underline">Umrah from Lahore</Link>
          {" \u00b7 "}
          <Link to="/umrah-from-islamabad" className="text-gold hover:underline">Umrah from Islamabad</Link>
          {" \u00b7 "}
          <Link to="/umrah-from-bahawalnagar" className="text-gold hover:underline">Umrah from Bahawalnagar</Link>
          {" \u00b7 "}
          <Link to="/umrah-from-marla-chowk" className="text-gold hover:underline">Umrah from Marla Chowk</Link>
          {" \u00b7 "}
          <Link to="/umrah-from-sahiwal" className="text-gold hover:underline">Umrah from Sahiwal</Link>
          {" \u00b7 "}
          <Link to="/umrah-from-pakpattan" className="text-gold hover:underline">Umrah from Pakpattan</Link>
        </p>
        <div className="mt-8">
          <UmrahEngine packages={packages} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
