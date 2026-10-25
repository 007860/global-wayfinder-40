// Shared SEO helpers — single source of truth for the public site URL and
// JSON-LD builders so every route emits consistent, self-referencing data.
export const SITE_URL = "https://https-al-bahr-travels-consultants.lovable.app";

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
