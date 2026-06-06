import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  component: CatchAllComponent,
  head: () => ({
    meta: [
      { title: "Page Not Found - Al-Bahr Travels" },
      {
        name: "description",
        content: "The page you are looking for does not exist.",
      },
    ],
  }),
});

function CatchAllComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gold-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
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
