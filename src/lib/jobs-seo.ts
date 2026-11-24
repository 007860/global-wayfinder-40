// Shared JobPosting schema builders — single source of truth for /jobs and the
// per-country jobs pages (/jobs/turkey, /jobs/poland, /jobs/albania).
import type { JobOffer } from "@/lib/job-offers";
import { SITE_URL } from "@/lib/seo";

export const COUNTRY_CODE: Record<JobOffer["country"], string> = {
  Turkey: "TR",
  Poland: "PL",
  Albania: "AL",
};

export function postingDescription(o: JobOffer) {
  return [
    `${o.title} — legal work permit opportunity in ${o.country} for Pakistani workers, recruited by AL BAHR HORIZON TRAVELS AND CONSULTANTS, Lahore, Pakistan.`,
    `Roles: ${o.roles.join(", ")}.`,
    `Salary as per the official offer: ${o.salary}.`,
    o.gender ? `Open to: ${o.gender}.` : "",
    o.age ? `Age limit: ${o.age}.` : "",
    `Benefits: ${o.benefits.join(", ")}.`,
    o.note ? `Note: ${o.note}` : "",
    "To apply, contact AL BAHR HORIZON TRAVELS AND CONSULTANTS on WhatsApp +92 343 476 2264 (office) or +92 325 793 8125 (CEO), or visit 78 E Block, Architect Engineering Housing Society, Lahore, Pakistan 54600. Final fees and processing timeline are confirmed on WhatsApp before any payment.",
  ]
    .filter(Boolean)
    .join(" ");
}

export function jobPostingSchema(o: JobOffer) {
  const schema: Record<string, unknown> = {
    "@type": "JobPosting",
    title: `${o.title} — Work Permit Jobs for Pakistani Workers`,
    description: postingDescription(o),
    // The offer flyers were published in October 2026. Never use `new Date()`
    // here — a rolling datePosted misrepresents the posting date to search
    // engines on every crawl.
    datePosted: "2026-10-01",
    employmentType: "FULL_TIME",
    directApply: true,
    hiringOrganization: {
      "@type": "Organization",
      name: "AL BAHR HORIZON TRAVELS AND CONSULTANTS",
      url: SITE_URL,
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
