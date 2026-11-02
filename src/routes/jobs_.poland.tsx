import { createFileRoute } from "@tanstack/react-router";
import { CountryJobsPage, countryHead } from "@/components/CountryJobsPage";

export const Route = createFileRoute("/jobs_/poland")({
  head: () => countryHead("Poland"),
  component: CountryJobsPoland,
});

function CountryJobsPoland() {
  return <CountryJobsPage country="Poland" />;
}
