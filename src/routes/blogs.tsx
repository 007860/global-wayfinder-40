import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TopUtilityStrip } from "@/components/TopUtilityStrip";
import { BurgerMenu } from "@/components/BurgerMenu";
import { SiteFooter } from "@/components/SiteFooter";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";

export const Route = createFileRoute("/blogs")({
  component: BlogsPage,
  head: () => ({
    meta: [
      { title: "Recent Global Travel Intelligence Blogs — Al-Bahr Travels" },
      {
        name: "description",
        content:
          "AI-curated visa, embassy, and travel intelligence briefs for Pakistani travellers. Updated live by Al-Bahr Travels & Consultants.",
      },
      { property: "og:title", content: "Travel Intelligence Blogs — Al-Bahr" },
      { property: "og:url", content: "/blogs" },
    ],
    links: [{ rel: "canonical", href: "/blogs" }],
  }),
});

type BlogRow = {
  id: string;
  title: string;
  query: string;
  country: string | null;
  cover_image: string | null;
  sections: { heading: string; body: string; image?: string | null }[];
  created_at: string;
};

function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogRow[]>([]);
  const [active, setActive] = useState<BlogRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(60);
      setBlogs((data as unknown as BlogRow[]) ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <main className="min-h-screen">
      <TopUtilityStrip />
      <BurgerMenu />

      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold mb-8"
        >
          <ArrowLeft className="size-4" /> Back to home
        </Link>
        <p className="text-xs tracking-[0.3em] text-gold mb-3">INTELLIGENCE LIBRARY</p>
        <h1 className="font-display text-5xl sm:text-6xl">
          Recent <span className="text-gold-gradient">Global Travel</span> Intelligence Blogs
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Live-generated visa & travel briefs. Click any card to read.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : blogs.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-muted-foreground">
              No briefs yet — try the search bar on the home page to generate one.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((b) => (
              <button
                key={b.id}
                onClick={() => setActive(b)}
                className="text-left glass rounded-2xl overflow-hidden hover:border-gold/40 transition-all group"
              >
                {b.cover_image && (
                  <div className="aspect-[16/10] bg-white/5 overflow-hidden">
                    <img
                      src={b.cover_image}
                      alt={b.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    {b.country && (
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3 text-gold" /> {b.country}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {new Date(b.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-display text-xl group-hover:text-gold-gradient">
                    {b.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {active && <BlogReader blog={active} onClose={() => setActive(null)} />}

      <SiteFooter />
    </main>
  );
}

function BlogReader({ blog, onClose }: { blog: BlogRow; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto p-4 sm:p-10">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <article className="relative w-full max-w-3xl glass rounded-2xl bg-[var(--midnight-light)]/95 shadow-elev overflow-hidden">
        {blog.cover_image && (
          <img
            src={blog.cover_image}
            alt={blog.title}
            className="w-full aspect-[16/9] object-cover"
          />
        )}
        <div className="p-8 sm:p-12">
          <button
            onClick={onClose}
            className="text-xs text-muted-foreground hover:text-gold mb-4"
          >
            ← Close
          </button>
          {blog.country && (
            <p className="text-xs tracking-[0.3em] text-gold mb-3">{blog.country.toUpperCase()}</p>
          )}
          <h1 className="font-display text-4xl mb-6">{blog.title}</h1>
          <div className="space-y-8">
            {blog.sections.map((s, i) => (
              <div key={i}>
                <h2 className="font-display text-2xl text-gold-gradient mb-3">{s.heading}</h2>
                {s.image && (
                  <img
                    src={s.image}
                    alt={s.heading}
                    className="rounded-xl mb-4 w-full aspect-[16/9] object-cover"
                    loading="lazy"
                  />
                )}
                <p className="text-foreground/90 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
