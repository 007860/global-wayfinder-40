// Shared SEO helpers — single source of truth for the public site URL and
// JSON-LD builders so every route emits consistent, self-referencing data.
export const SITE_URL = "https://www.albahrtravels.com";
export const SITE_NAME = "AL BAHR HORIZON TRAVELS AND CONSULTANTS";
export const LOGO_URL = `${SITE_URL}/logo.png`;

export const SOCIAL_URLS = {
  facebook: "https://www.facebook.com/61572071016046/",
  instagram: "https://www.instagram.com/albahr.travels/",
  tiktok: "https://www.tiktok.com/@albahrtravelconsultants",
  whatsapp: "https://wa.me/923434762264",
  linkedin: "https://www.linkedin.com/in/mubashar-ali-0101b7452/",
  youtube: "https://www.youtube.com/@AlBahrHorizonTravels",
} as const;

export type Crumb = { name: string; path: string };

/** BreadcrumbList JSON-LD node. Always include Home as position 1. */
export function breadcrumbLd(trail: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
}

/** Wrap JSON-LD nodes in a single @graph script payload. */
export function graphLd(...nodes: unknown[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function jsonScript(...nodes: unknown[]) {
  return nodes.map((n) => ({
    type: "application/ld+json" as const,
    children: JSON.stringify(n),
  }));
}

export type Faq = { q: string; a: string };

/**
 * FAQPage JSON-LD node for AEO (AI search / voice assistants).
 * Only use Q&As whose answers are stated on the page itself — never invent.
 */
export function faqLd(faqs: Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
