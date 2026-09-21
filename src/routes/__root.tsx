import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";
import { FloatingEmailButton } from "@/components/FloatingEmailButton";

import appCss from "../styles.css?url";

const SITE_NAME = "Al-Bahr Travels & Consultants";
const SITE_TITLE =
  "Al-Bahr Travels & Consultants | Elite Visa & Premium Travel Logistics";
const SITE_DESC =
  "Embassy-grade travel consultancy and strategic visa logistics for Pakistani travellers. Top-tier consultancy for Qatar, Saudi Arabia (KSA), UAE, and European pathways — Gulf medical fitness appointments, Schengen pipelines, and premium flight routing.";
const OG_TITLE = "Al-Bahr Travels & Consultants | Premium Global Mobility";
const OG_DESC =
  "Premium consultancy for Pakistani travellers — Gulf, Europe, and beyond. Embassy-grade expertise, white-glove service.";

const KEYWORDS = [
  "Al-Bahr Travels & Consultants",
  "Gamca medical registration Pakistan",
  "Wafid medical appointment booking online",
  "Gulf medical test center tracking",
  "Best visa consultants in Pakistan",
  "Schengen visa appointment pipeline",
  "Saudi medical token online",
  "Europe work visa consultancy",
  "Qatar visa processing agency",
  "premium travel logistics Pakistan",
  "luxury travel consultants",
  "Pakistan to Europe travel agency",
  "Mubashir Ali CEO",
].join(", ");

const LOCAL_BUSINESS_LD = {
  "@context": "https://schema.org",
  "@type": ["TravelAgency", "LocalBusiness"],
  name: SITE_NAME,
  legalName: "Al-Bahr Travels & Consultants",
  description: SITE_DESC,
  email: "al.bahr.medical.appointments@gmail.com",
  url: "https://https-al-bahr-travels-consultants.lovable.app",
  telephone: "+92 343 4762264",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Tibbi Lal Baig, Lahore, District Pakpattan",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  areaServed: [
    "Saudi Arabia",
    "Qatar",
    "United Arab Emirates",
    "Kuwait",
    "Oman",
    "Bahrain",
    "United Kingdom",
    "Italy",
    "Germany",
    "France",
    "Spain",
    "Poland",
    "Netherlands",
    "Gulf",
    "Europe",
    "International",
  ],
  foundingDate: "2015",
  founder: [
    {
      "@type": "Person",
      name: "Mubashir Ali",
      jobTitle: "Chief Executive Officer",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+92 343 4762264",
      email: "al.bahr.medical.appointments@gmail.com",
      areaServed: ["PK", "SA", "QA", "AE", "KW", "OM", "BH", "EU"],
      availableLanguage: ["en", "ur"],
      url: "https://wa.me/923434762264",
    },
  ],
  sameAs: ["https://wa.me/923434762264"],
  priceRange: "$$",
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gold-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page Not Found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-gold-gradient text-[var(--midnight)] px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Go Home
          </Link>
          <Link
            to="/blogs"
            className="inline-flex items-center justify-center rounded-md border border-gold/30 px-5 py-2.5 text-sm font-semibold hover:bg-gold/10 transition-colors"
          >
            View Blogs
          </Link>
          <Link
            to="/countries"
            className="inline-flex items-center justify-center rounded-md border border-gold/30 px-5 py-2.5 text-sm font-semibold hover:bg-gold/10 transition-colors"
          >
            Countries
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-gold-gradient text-[var(--midnight)] px-4 py-2 text-sm font-semibold"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-md border border-white/15 px-4 py-2 text-sm font-medium hover:bg-white/5"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESC },
      { name: "author", content: SITE_NAME },
      { name: "keywords", content: KEYWORDS },
      { name: "geo.region", content: "PK" },
      { name: "geo.placename", content: "Pakistan" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: OG_TITLE },
      { property: "og:description", content: OG_DESC },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: OG_TITLE },
      { name: "twitter:description", content: OG_DESC },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400&family=Manrope:wght@400..800&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(LOCAL_BUSINESS_LD),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <FloatingEmailButton />
      <Toaster theme="dark" position="top-center" richColors />
    </QueryClientProvider>
  );
}
