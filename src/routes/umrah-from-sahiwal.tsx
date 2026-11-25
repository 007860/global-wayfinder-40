import { createFileRoute } from "@tanstack/react-router";
import { CityLandingPage } from "@/components/CityLandingPage";
import { getCity } from "@/lib/cities";
import { SITE_URL, LOGO_URL, breadcrumbLd, faqLd, jsonScript } from "@/lib/seo";

const c = getCity("sahiwal");
const URL = `${SITE_URL}/umrah-from-sahiwal`;

export const Route = createFileRoute("/umrah-from-sahiwal")({
  head: () => ({
    meta: [
      { title: c.metaTitle },
      { name: "description", content: c.metaDescription },
      { property: "og:title", content: c.metaTitle },
      { property: "og:description", content: c.metaDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: LOGO_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: c.metaTitle },
      { name: "twitter:description", content: c.metaDescription },
      { name: "twitter:image", content: LOGO_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: jsonScript(
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Umrah Packages", path: "/umrah-packages" },
        { name: "Umrah from Sahiwal", path: "/umrah-from-sahiwal" },
      ]),
      faqLd(c.faqs),
    ),
  }),
  component: () => <CityLandingPage city={c} />,
});
