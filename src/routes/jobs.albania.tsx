import { createFileRoute } from "@tanstack/react-router";
import { CountryJobsPage, countryHead } from "@/components/CountryJobsPage";

export const Route = createFileRoute("/jobs/albania")({
  head: () => countryHead("Albania"),
  component: CountryJobsAlbania,
});

function CountryJobsAlbania() {
  return <CountryJobsPage country="Albania" />;
}
