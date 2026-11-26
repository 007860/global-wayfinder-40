import { createFileRoute } from "@tanstack/react-router";
import { VisitVisasPage, VISIT_VISA_FAQS } from "@/components/VisitVisasPage";
import { SITE_URL, LOGO_URL, breadcrumbLd, faqLd, jsonScript } from "@/lib/seo";

const URL = `${SITE_URL}/visit-visas`;
const TITLE = "Visit Visa Prices for Pakistanis | AL BAHR HORIZON TRAVELS AND CONSULTANTS";
const DESC =
  "Visit visa rates in PKR for Asia, the Middle East and Africa — Malaysia, Indonesia, Thailand, Sri Lanka, Bahrain, Vietnam, Nepal, Bangladesh, Tajikistan, Uzbekistan, Ethiopia, Kenya, Malawi, Namibia, Tanzania, Uganda, Zimbabwe and Zambia. AL BAHR HORIZON TRAVELS AND CONSULTANTS, Lahore. WhatsApp +92 343 4762264.";

export const Route = createFileRoute("/visit-visas")({
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
        { name: "Visit Visas", path: "/visit-visas" },
      ]),
      faqLd(VISIT_VISA_FAQS),
    ),
  }),
  component: () => <VisitVisasPage />,
});
