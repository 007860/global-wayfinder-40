import { createFileRoute } from "@tanstack/react-router";
import { UmrahEngine } from "@/components/UmrahEngine";
import { BurgerMenu } from "@/components/BurgerMenu";
import { SiteFooter } from "@/components/SiteFooter";

const URL = "https://https-al-bahr-travels-consultants.lovable.app/umrah-packages";
const TITLE = "Umrah Packages from Lahore 2026 | Saudia 21 Days | Al-Bahr";
const DESC =
  "21-day Umrah packages from Lahore with Saudia: exact Makkah & Madinah hotels, distance from Haram and PKR prices for sharing, quad, triple and double rooms. Book on WhatsApp.";

export const Route = createFileRoute("/umrah-packages")({
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
  component: UmrahPage,
});

function UmrahPage() {
  return (
    <div className="min-h-screen bg-background">
      <BurgerMenu />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="font-serif text-3xl md:text-5xl text-foreground">Umrah Packages from Lahore</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          Saudia 21-day packages with named hotels, distance from the Haram and full PKR prices per person.
          Every booking is confirmed with a written quotation on WhatsApp before any payment.
        </p>
        <div className="mt-8">
          <UmrahEngine />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
