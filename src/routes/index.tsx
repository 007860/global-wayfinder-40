import { createFileRoute } from "@tanstack/react-router";
import { TopUtilityStrip } from "@/components/TopUtilityStrip";
import { BurgerMenu } from "@/components/BurgerMenu";
import { Hero } from "@/components/Hero";
import { SiteFooter } from "@/components/SiteFooter";
import { PortalSections } from "@/components/PortalSections";
import { SITE_URL, LOGO_URL, faqLd, jsonScript } from "@/lib/seo";

const TITLE = "AL BAHR HORIZON TRAVELS AND CONSULTANTS — Umrah, Visas & Travel Agency in Lahore, Pakistan";
const DESC =
  "Umrah packages from Lahore & Islamabad, visit visas, GAMCA/Wafid medical appointments, jobs abroad and study in Germany — trusted Lahore travel agency serving travellers across Pakistan. WhatsApp +92 343 4762264.";

const HOME_FAQS = [
  {
    q: "What services does AL BAHR HORIZON TRAVELS AND CONSULTANTS offer?",
    a: "Umrah and Hajj packages, global visit visas, international air ticketing, GAMCA/Wafid medical appointments, jobs abroad and study abroad guidance — from our Lahore office.",
  },
  {
    q: "Where is the AL BAHR HORIZON office located?",
    a: "78 E Block, Architect Engineering Housing Society, Lahore, Pakistan 54600. Open Monday–Friday 10 AM–7 PM and Saturday 10 AM–5 PM; closed on Sunday.",
  },
  {
    q: "How do I book or get a price?",
    a: "Message us on WhatsApp at +92 343 4762264. Every booking is confirmed with a written quotation on WhatsApp before any payment.",
  },
  {
    q: "Which cities in Pakistan do you serve?",
    a: "We serve travellers across Pakistan, with a focus on Lahore, Islamabad, Bahawalnagar, Marla Chowk, Sahiwal and Pakpattan.",
  },
];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      {
        name: "description",
        content: DESC,
      },
      { property: "og:title", content: TITLE },
      {
        property: "og:description",
        content: DESC,
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: LOGO_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: LOGO_URL },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: jsonScript(faqLd(HOME_FAQS)),
  }),
});

function Index() { return <main><TopUtilityStrip/><BurgerMenu/><Hero/><PortalSections/><SiteFooter/></main>; }
