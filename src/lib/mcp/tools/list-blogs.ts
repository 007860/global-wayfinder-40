import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_blogs",
  title: "List published blogs",
  description:
    "List public blog posts published by Al-Bahr Travels & Consultants (title, slug, excerpt, published date).",
  inputSchema: {
    limit: z
      .number()
      .int()
      .min(1)
      .max(50)
      .default(10)
      .describe("Maximum number of blog posts to return (1–50)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async ({ limit }) => {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) {
      return {
        content: [{ type: "text", text: "Backend not configured." }],
        isError: true,
      };
    }
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await supabase
      .from("blogs")
      .select("title, slug, excerpt, published_at")
      .order("published_at", { ascending: false })
      .limit(limit);
    if (error) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { blogs: data ?? [] },
    };
  },
});
