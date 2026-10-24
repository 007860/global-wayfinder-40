import { createFileRoute } from "@tanstack/react-router";
import { StudyDestinationPage } from "@/components/StudyDestinationPage";
import { getDestination } from "@/lib/study-destinations";

const d = getDestination("study-in-italy");

export const Route = createFileRoute("/study-in-italy")({
  head: () => ({
    meta: [
      { title: d.metaTitle },
      { name: "description", content: d.metaDescription },
      { property: "og:title", content: d.metaTitle },
      { property: "og:description", content: d.metaDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://https-al-bahr-travels-consultants.lovable.app/study-in-italy" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://https-al-bahr-travels-consultants.lovable.app/study-in-italy" }],
  }),
  component: () => <StudyDestinationPage destination={d} />,
});
