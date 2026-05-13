import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const LeadSchema = z.object({
  first_name: z.string().trim().min(1).max(80),
  last_name: z.string().trim().min(1).max(80),
  phone: z.string().trim().min(5).max(40),
  passport_number: z.string().trim().min(3).max(40),
  target_country: z.string().trim().min(1).max(80),
  source_type: z.enum(["foreign_countries", "airline_ticket"]),
});

const LEAD_EMAIL = "Al.bahr.medical.appointmens@gmail.com";

async function sendLeadEmail(lead: z.infer<typeof LeadSchema>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[leads] RESEND_API_KEY not set — skipping email notification");
    return { sent: false, reason: "no_api_key" as const };
  }

  const subject = `New Lead — ${lead.target_country} (${lead.source_type === "airline_ticket" ? "Airline Ticket" : "Foreign Countries"})`;
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:auto;background:#0A192F;color:#fff;padding:32px;border-radius:12px">
      <h2 style="color:#F59E0B;margin:0 0 16px">Al-Bahr Travels — New Lead</h2>
      <p style="color:#cbd5e1;margin:0 0 20px">A new visitor submitted a request via the website.</p>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#94a3b8">Name</td><td style="padding:8px 0">${lead.first_name} ${lead.last_name}</td></tr>
        <tr><td style="padding:8px 0;color:#94a3b8">Phone</td><td style="padding:8px 0">${lead.phone}</td></tr>
        <tr><td style="padding:8px 0;color:#94a3b8">Passport #</td><td style="padding:8px 0">${lead.passport_number}</td></tr>
        <tr><td style="padding:8px 0;color:#94a3b8">Target Country</td><td style="padding:8px 0">${lead.target_country}</td></tr>
        <tr><td style="padding:8px 0;color:#94a3b8">Source</td><td style="padding:8px 0">${lead.source_type}</td></tr>
        <tr><td style="padding:8px 0;color:#94a3b8">Submitted</td><td style="padding:8px 0">${new Date().toUTCString()}</td></tr>
      </table>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Al-Bahr Leads <onboarding@resend.dev>",
        to: [LEAD_EMAIL],
        subject,
        html,
      }),
    });
    if (!res.ok) {
      const txt = await res.text();
      console.error("[leads] Resend error", res.status, txt);
      return { sent: false, reason: "send_failed" as const };
    }
    return { sent: true };
  } catch (e) {
    console.error("[leads] email exception", e);
    return { sent: false, reason: "exception" as const };
  }
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => LeadSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("country_leads").insert(data);
    if (error) {
      console.error("[leads] insert error", error);
      throw new Error("Could not save your request. Please try again.");
    }
    await supabaseAdmin.rpc("increment_counter", {
      counter_name: "consultations_booked",
    });
    const email = await sendLeadEmail(data);
    return { ok: true, email };
  });
