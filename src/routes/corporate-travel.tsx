import { createFileRoute } from "@tanstack/react-router";
import { CorporateTravelPage, CORPORATE_FAQS } from "@/components/CorporateTravelPage";
import { SITE_URL, LOGO_URL, breadcrumbLd, faqLd, jsonScript } from "@/lib/seo";

const URL = `${SITE_URL}/corporate-travel`;
const TITLE = "Corporate Travel Services in Pakistan | AL BAHR HORIZON TRAVELS AND CONSULTANTS";
const DESC =
  "Business travel for Pakistani companies — group Umrah for staff, international ticketing, business visas and GAMCA medical appointments from AL BAHR HORIZON TRAVELS AND CONSULTANTS, Lahore. WhatsApp +92 343 4762264.";

export const Route = createFileRoute("/corporate-travel")({
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
        { name: "Corporate Travel", path: "/corporate-travel" },
      ]),
      faqLd(CORPORATE_FAQS),
    ),
  }),
  component: () => <CorporateTravelPage />,
});
