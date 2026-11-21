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
      { title: "AL-BAHR HORIZON TRAVELS & CONSULTANTS — Lahore" },
      {
        name: "description",
        content:
          "Trusted Lahore consultancy for visa appointments, flight bookings, hotel reservations, and Gulf medical appointments across the Gulf and Europe. ",
      },
      { property: "og:title", content: "AL-BAHR HORIZON TRAVELS & CONSULTANTS — Lahore" },
      {
        property: "og:description",
        content:
          "Visa appointments, flights, hotels, Gulf medical fitness and study abroad support from our Lahore desk. Serving travellers from Lahore.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.albahrtravels.com/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.albahrtravels.com/" }],
  }),
});

function Index() { return <main><TopUtilityStrip/><BurgerMenu/><Hero/><PortalSections/><SiteFooter/></main>; }
