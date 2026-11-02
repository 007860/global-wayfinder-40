import { createFileRoute } from "@tanstack/react-router";
import { CountryJobsPage, countryHead } from "@/components/CountryJobsPage";

export const Route = createFileRoute("/jobs_/turkey")({
  head: () => countryHead("Turkey"),
  component: CountryJobsTurkey,
});

function CountryJobsTurkey() {
  return <CountryJobsPage country="Turkey" />;
}
