import { createFileRoute } from "@tanstack/react-router";
import { StudyDestinationPage } from "@/components/StudyDestinationPage";
import { getDestination } from "@/lib/study-destinations";
import { SITE_URL, breadcrumbLd, jsonScript } from "@/lib/seo";

const d = getDestination("study-in-italy");
const URL = `${SITE_URL}/study-in-italy`;

export const Route = createFileRoute("/study-in-italy")({
  head: () => ({
    meta: [
      { title: d.metaTitle },
      { name: "description", content: d.metaDescription },
      { property: "og:title", content: d.metaTitle },
      { property: "og:description", content: d.metaDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: jsonScript(
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Study in Italy", path: "/study-in-italy" },
      ]),
    ),
  }),
  component: () => <StudyDestinationPage destination={d} />,
});
