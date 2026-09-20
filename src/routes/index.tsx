import { createFileRoute } from "@tanstack/react-router";
import { TopUtilityStrip } from "@/components/TopUtilityStrip";
import { BurgerMenu } from "@/components/BurgerMenu";
import { Hero } from "@/components/Hero";
import { SiteFooter } from "@/components/SiteFooter";
import { PortalSections } from "@/components/PortalSections";
export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Al-Bahr Travels — Visa & Travel Consultants, Arifwala" },
      {
        name: "description",
        content:
          "Trusted Arifwala consultancy for visa appointments, flight bookings, hotel reservations, and Gulf medical appointments across the Gulf and Europe. Since 2015.",
      },
      { property: "og:title", content: "Al-Bahr Travels — Visa & Travel Consultants, Arifwala" },
      {
        property: "og:description",
        content:
          "Visa appointments, flights, hotels, Gulf medical fitness and study abroad support from our Arifwala desk. Serving Pakistani travellers since 2015.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://https-al-bahr-travels-consultants.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://https-al-bahr-travels-consultants.lovable.app/" }],
  }),
});

function Index() { return <main><TopUtilityStrip/><BurgerMenu/><Hero/><PortalSections/><SiteFooter/></main>; }
