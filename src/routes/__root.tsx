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

import appCss from "../styles.css?url";

const SITE_NAME = "Al-Bahr Travels & Consultants";
const SITE_DESC =
  "Premium visa appointments, flight & hotel bookings, and medical appointment consultancy. Trusted Lahore-based agency since 2015.";

const LOCAL_BUSINESS_LD = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: SITE_NAME,
  description: SITE_DESC,
  email: "al.bahr.medical.appointments@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "78 E Block, Architect Engineering Housing Society",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  areaServed: ["Saudi Arabia", "Qatar", "UAE", "Kuwait", "Oman", "Bahrain", "United Kingdom", "Italy", "Germany", "France", "Spain", "Poland", "Netherlands"],
  foundingDate: "2015",
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
      { title: `${SITE_NAME} — International Visa & Booking Hub` },
      { name: "description", content: SITE_DESC },
      { name: "author", content: SITE_NAME },
      { name: "keywords", content: "visa appointments Lahore, Schengen visa Pakistan, Saudi visa, UAE visa, flight booking Pakistan, medical appointment Europe, Al-Bahr Travels" },
      { property: "og:title", content: SITE_NAME },
      { property: "og:description", content: SITE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_NAME },
      { name: "twitter:description", content: SITE_DESC },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
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
      <Toaster theme="dark" position="top-center" richColors />
    </QueryClientProvider>
  );
}
