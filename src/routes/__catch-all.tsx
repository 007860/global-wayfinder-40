import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

const NotFoundContent = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gold-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist. Please check the URL and try again.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => router.history.back()}
            className="rounded-md border border-white/15 px-4 py-2 text-sm font-medium hover:bg-white/5"
          >
            Go back
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-gold-gradient text-[var(--midnight)] px-5 py-2.5 text-sm font-semibold"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/__catch-all")({
  component: NotFoundContent,
});
