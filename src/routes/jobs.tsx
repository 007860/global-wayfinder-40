import { createFileRoute } from "@tanstack/react-router";
import { TopUtilityStrip } from "@/components/TopUtilityStrip";
import { BurgerMenu } from "@/components/BurgerMenu";
import { SiteFooter } from "@/components/SiteFooter";
import { JobOffers } from "@/components/JobOffers";

const SITE_URL = "https://https-al-bahr-travels-consultants.lovable.app";

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      {
        title: "Jobs Abroad — Turkey, Poland & Albania Work Permit Jobs | Al-Bahr Travels",
      },
      {
        name: "description",
        content:
          "Legal work permit jobs in Turkey, Poland and Albania for Pakistanis: garments, packing, agriculture, construction, restaurant, engineering and more. Free food, accommodation and medical as per flyer. Book live on WhatsApp from Lahore.",
      },
      {
        property: "og:title",
        content: "Jobs Abroad — Turkey, Poland & Albania Work Permits | Al-Bahr Travels",
      },
      {
        property: "og:description",
        content:
          "Work permit jobs in Turkey, Poland and Albania — garments factory, packing, agriculture, construction and professional roles. Legal, safe and secure process from Al-Bahr Travels & Consultants, Lahore.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/jobs` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/jobs` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Jobs Abroad & Work Permits",
          description:
            "Work permit job offers in Turkey, Poland and Albania from Al-Bahr Travels & Consultants (Pvt.) Ltd., Lahore — garments, packing, agriculture, construction, restaurant, cleaner, helper, engineers, IT and banking roles.",
          url: `${SITE_URL}/jobs`,
        }),
      },
    ],
  }),
  component: JobsPage,
});

function JobsPage() {
  return (
    <main className="min-h-screen">
      <TopUtilityStrip />
      <BurgerMenu />
      <div className="pt-20" />
      <JobOffers />
      <SiteFooter />
    </main>
  );
}
