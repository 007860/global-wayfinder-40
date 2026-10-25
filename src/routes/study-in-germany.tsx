import { createFileRoute } from "@tanstack/react-router";
import { StudyDestinationPage } from "@/components/StudyDestinationPage";
import { getDestination } from "@/lib/study-destinations";
import { SITE_URL, breadcrumbLd, jsonScript } from "@/lib/seo";

const d = getDestination("study-in-germany");
const URL = `${SITE_URL}/study-in-germany`;

export const Route = createFileRoute("/study-in-germany")({
  head: () => ({
    meta: [
      { title: d.metaTitle },
      { name: "description", content: d.metaDescription },
      { property: "og:title", content: d.metaTitle },
      { property: "og:description", content: d.metaDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: d.metaTitle },
      { name: "twitter:description", content: d.metaDescription },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: jsonScript(
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: d.metaTitle.split("|")[0].trim(), path: "/study-in-germany" },
      ]),
    ),
  }),
  component: () => <StudyDestinationPage destination={d} />,
});
