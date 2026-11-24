import { createFileRoute } from "@tanstack/react-router";
import { StudyDestinationPage } from "@/components/StudyDestinationPage";
import { getDestination } from "@/lib/study-destinations";
import { SITE_URL, LOGO_URL, breadcrumbLd, faqLd, jsonScript } from "@/lib/seo";

const d = getDestination("study-in-turkey");
const URL = `${SITE_URL}/study-in-turkey`;

export const Route = createFileRoute("/study-in-turkey")({
  head: () => ({
    meta: [
      { title: d.metaTitle },
      { name: "description", content: d.metaDescription },
      { property: "og:title", content: d.metaTitle },
      { property: "og:description", content: d.metaDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: LOGO_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: d.metaTitle },
      { name: "twitter:description", content: d.metaDescription },
      { name: "twitter:image", content: LOGO_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: jsonScript(
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Study in Turkey", path: "/study-in-turkey" },
      ]),
      faqLd(d.faqs),
    ),
  }),
  component: () => <StudyDestinationPage destination={d} />,
});
