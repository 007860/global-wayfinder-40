import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const QuerySchema = z.object({
  query: z.string().trim().min(3).max(200),
});

const ALLOWED_KEYWORDS = [
  "visa", "embassy", "consulate", "passport", "flight", "airline", "ticket",
  "travel", "tour", "tourism", "immigration", "work permit", "study visa",
  "umrah", "hajj", "schengen", "residence", "iqama", "appointment",
  "saudi", "qatar", "uae", "dubai", "abu dhabi", "kuwait", "oman", "bahrain",
  "uk", "england", "britain", "italy", "germany", "france", "spain", "poland",
  "netherlands", "europe", "schengen", "gulf", "gcc",
];

function isTravelRelated(q: string) {
  const lower = q.toLowerCase();
  return ALLOWED_KEYWORDS.some((k) => lower.includes(k));
}

const BlogSchema = z.object({
  title: z.string(),
  country: z.string().nullable().optional(),
  cover_image: z.string().url().nullable().optional(),
  sections: z
    .array(
      z.object({
        heading: z.string(),
        body: z.string(),
        image: z.string().url().nullable().optional(),
      }),
    )
    .min(3)
    .max(12),
});

export const generateTravelBlog = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => QuerySchema.parse(input))
  .handler(async ({ data }) => {
    if (!isTravelRelated(data.query)) {
      return {
        ok: false as const,
        reason:
          "Please enter a travel, visa, flight, or embassy-related query.",
      };
    }

    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("AI service is not configured.");

    const sys = `You are a global travel & visa intelligence agent for Al-Bahr Travels & Consultants (Lahore, Pakistan). Produce CURRENT, ACCURATE, structured guidance for Pakistani travellers. Always include practical embassy / appointment / document steps. Output strict JSON ONLY matching the schema.`;

    const userPrompt = `Build a comprehensive travel-intelligence blog for the query: "${data.query}".

Return JSON with this exact shape:
{
  "title": "string (60-90 chars, includes the country/topic)",
  "country": "string|null (primary country, e.g. 'Saudi Arabia')",
  "cover_image": "https url to a real, freely-usable hero image from unsplash.com (use https://images.unsplash.com/...)",
  "sections": [
    { "heading": "1. Overview", "body": "2-4 sentences", "image": "https unsplash url"},
    { "heading": "2. Visa Types & Eligibility", "body": "...", "image": null },
    { "heading": "3. Required Documents", "body": "...", "image": null },
    { "heading": "4. Appointment & Application Process", "body": "...", "image": "https unsplash url" },
    { "heading": "5. Processing Time & Fees", "body": "...", "image": null },
    { "heading": "6. Travel Tips & Cultural Notes", "body": "...", "image": "https unsplash url" }
  ]
}

Number every heading (1., 2., 3., ...). Use real Unsplash photo URLs in the form https://images.unsplash.com/photo-XXXX?w=1200 . Do NOT wrap in markdown. Output JSON only.`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: sys },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error("[ai-blog] gateway error", res.status, txt);
      if (res.status === 429)
        return { ok: false as const, reason: "Rate limit reached. Please try again shortly." };
      if (res.status === 402)
        return { ok: false as const, reason: "AI credits exhausted. Please add credits in workspace settings." };
      throw new Error("AI generation failed.");
    }

    const json = await res.json();
    const content = json.choices?.[0]?.message?.content as string | undefined;
    if (!content) throw new Error("AI returned empty response.");

    let parsed: z.infer<typeof BlogSchema>;
    try {
      parsed = BlogSchema.parse(JSON.parse(content));
    } catch (e) {
      console.error("[ai-blog] parse error", e, content);
      throw new Error("AI returned malformed content.");
    }

    const { data: inserted, error } = await supabaseAdmin
      .from("blogs")
      .insert({
        title: parsed.title,
        query: data.query,
        country: parsed.country ?? null,
        cover_image: parsed.cover_image ?? null,
        sections: parsed.sections,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[ai-blog] insert error", error);
      throw new Error("Could not save the blog.");
    }

    return { ok: true as const, id: inserted.id, title: parsed.title };
  });
