// Shared JobPosting schema builders — single source of truth for /jobs and the
// per-country jobs pages (/jobs/turkey, /jobs/poland, /jobs/albania).
import type { JobOffer } from "@/lib/job-offers";

export const COUNTRY_CODE: Record<JobOffer["country"], string> = {
  Turkey: "TR",
  Poland: "PL",
  Albania: "AL",
};

export function postingDescription(o: JobOffer) {
  return [
    `${o.title} — legal work permit opportunity in ${o.country} for Pakistani workers, recruited by Al-Bahr Travels & Consultants (Pvt.) Ltd., Lahore, Pakistan.`,
    `Roles: ${o.roles.join(", ")}.`,
    `Salary as per the official offer: ${o.salary}.`,
    o.gender ? `Open to: ${o.gender}.` : "",
    o.age ? `Age limit: ${o.age}.` : "",
    `Benefits: ${o.benefits.join(", ")}.`,
    o.note ? `Note: ${o.note}` : "",
    "To apply, contact Al-Bahr Travels & Consultants on WhatsApp +92 343 476 2264 (office) or +92 325 793 8125 (CEO), or visit 78 E Block, Architect Engineering Housing Society, Lahore, Pakistan. Final fees and processing timeline are confirmed on WhatsApp before any payment.",
  ]
    .filter(Boolean)
    .join(" ");
}

export function jobPostingSchema(o: JobOffer) {
  const schema: Record<string, unknown> = {
    "@type": "JobPosting",
    title: `${o.title} — Work Permit Jobs for Pakistani Workers`,
    description: postingDescription(o),
    datePosted: new Date().toISOString().slice(0, 10),
    employmentType: "FULL_TIME",
    directApply: true,
    hiringOrganization: {
      "@type": "Organization",
      name: "Al-Bahr Travels & Consultants (Pvt.) Ltd.",
      url: "https://https-al-bahr-travels-consultants.lovable.app",
    },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressCountry: COUNTRY_CODE[o.country] },
    },
    applicationContact: {
      "@type": "ContactPoint",
      contactType: "WhatsApp",
      telephone: "+92-343-4762264",
      url: "https://wa.me/923434762264",
    },
  };
  if (o.baseSalary) {
    schema.baseSalary = {
      "@type": "MonetaryAmount",
      currency: o.baseSalary.currency,
      value: {
        "@type": "QuantitativeValue",
        unitText: "MONTH",
        ...(o.baseSalary.max
          ? { minValue: o.baseSalary.min, maxValue: o.baseSalary.max }
          : { value: o.baseSalary.value }),
      },
    };
  }
  return schema;
}
