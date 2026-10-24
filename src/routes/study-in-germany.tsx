import { createFileRoute } from "@tanstack/react-router";
import { StudyDestinationPage } from "@/components/StudyDestinationPage";
import { getDestination } from "@/lib/study-destinations";

const d = getDestination("study-in-germany");
const URL = "https://https-al-bahr-travels-consultants.lovable.app/study-in-germany";

export const Route = createFileRoute("/study-in-germany")({
  head: () => ({
    meta: [
      { title: d.metaTitle },
      { name: "description", content: d.metaDescription },
      { property: "og:title", content: d.metaTitle },
      { property: "og:description", content: d.metaDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://https-al-bahr-travels-consultants.lovable.app/study-in-germany" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: d.metaTitle },
      { name: "twitter:description", content: d.metaDescription },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: () => <StudyDestinationPage destination={d} />,
});
