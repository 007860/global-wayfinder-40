import { useState } from "react";
import { Search, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { generateTravelBlog } from "@/lib/ai-blog.functions";

export function AISearchWidget() {
  const generate = useServerFn(generateTravelBlog);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim() || loading) return;
    setLoading(true);
    try {
      const res = await generate({ data: { query: q } });
      if (!res.ok) {
        toast.error(res.reason);
        return;
      }
      toast.success("Intelligence brief generated. Opening blog…");
      setQ("");
      // Soft reload of blogs section
      setTimeout(() => {
        window.location.href = "/blogs";
      }, 600);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Generation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="glass rounded-2xl p-2 sm:p-3 flex items-center gap-2 shadow-elev max-w-2xl mx-auto"
    >
      <div className="pl-3 flex items-center gap-2 text-gold">
        <Sparkles className="size-5" />
      </div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Global Visa & Travel Intelligence Search — e.g. ‘Saudi work visa requirements 2026’"
        className="flex-1 bg-transparent outline-none px-2 py-3 text-sm sm:text-base placeholder:text-muted-foreground/60"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-gold-gradient text-[var(--midnight)] font-semibold px-5 py-3 rounded-xl shadow-gold disabled:opacity-60 flex items-center gap-2"
      >
        {loading ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
        <span className="hidden sm:inline">{loading ? "Generating…" : "Search"}</span>
      </button>
      <Link
        to="/blogs"
        className="hidden md:inline text-xs text-muted-foreground hover:text-gold pr-3"
      >
        View past briefs →
      </Link>
    </form>
  );
}
