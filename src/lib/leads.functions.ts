import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

// Hardcoded public credentials (safe — publishable/anon key respects RLS).
const SUPABASE_URL = "https://gpwwjosckbesylfrqnvg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwd3dqb3Nja2Jlc3lsZnJxbnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2ODg1NTMsImV4cCI6MjA5NDI2NDU1M30.r_gEtFFh_CbFPaZpPxYnwZ6u8GgQdJeEN1VSxrT2nR8";

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const LeadSchema = z.object({
  first_name: z.string().trim().min(1).max(80),
  last_name: z.string().trim().min(1).max(80),
  phone: z.string().trim().min(5).max(40),
  email: z.string().trim().email().max(160).optional().default(""),
  residence_country: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
  passport_number: z.string().trim().max(40).optional().default(""),
  passport_expiry: z.string().trim().max(40).optional().default(""),
  visa_number: z.string().trim().max(40).optional().default(""),
  visa_expiry: z.string().trim().max(40).optional().default(""),
  target_country: z.string().trim().min(1).max(120),
  source_type: z.string().trim().min(1).max(60),
});

type Lead = z.infer<typeof LeadSchema>;

const LEAD_EMAIL = "al.bahr.medical.appointments@gmail.com";
const GMAIL_GATEWAY = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!),
  );
}

function base64Url(buf: Buffer | string) {
  const b = typeof buf === "string" ? Buffer.from(buf, "utf-8") : buf;
  return b.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64(buf: Buffer | string) {
  const b = typeof buf === "string" ? Buffer.from(buf, "utf-8") : buf;
  return b.toString("base64");
}

function buildLeadFile(lead: Lead) {
  const ts = new Date().toUTCString();
  const fullName = `${lead.first_name} ${lead.last_name}`.trim();
  return [
    "Al-Bahr Travels & Consultants — New Form Submission",
    "====================================================",
    `Submitted: ${ts}`,
    `Source   : ${lead.source_type}`,
    "",
    `Client Name           : ${fullName}`,
    `Client Email          : ${lead.email || "—"}`,
    `Phone Number          : ${lead.phone}`,
    `Current Residence     : ${lead.residence_country || "—"}`,
    `Booking Target Country: ${lead.target_country}`,
    `Passport Number       : ${lead.passport_number || "—"}`,
    `Passport Expiry Date  : ${lead.passport_expiry || "—"}`,
    `Visa Number           : ${lead.visa_number || "—"}`,
    `Visa Expiry Date      : ${lead.visa_expiry || "—"}`,
    `Client Message/Request: ${lead.message || "—"}`,
    "",
    "— End of submission —",
  ].join("\r\n");
}

async function sendLeadEmail(lead: Lead) {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const gmailKey = process.env.GOOGLE_MAIL_API_KEY;
  if (!lovableKey || !gmailKey) {
    console.warn("[leads] Gmail connector not configured — skipping email");
    return { sent: false, reason: "no_connector" as const };
  }

  const subject = `New Lead — ${lead.target_country} (${lead.source_type})`;
  const fileName = `lead_${lead.last_name}_${Date.now()}.txt`.replace(/\s+/g, "_");
  const fileText = buildLeadFile(lead);

  const fullName = `${lead.first_name} ${lead.last_name}`.trim();
  const row = (k: string, v: string, pre = false) =>
    `<tr><td style="padding:6px 0;color:#94a3b8;width:220px;vertical-align:top">${escapeHtml(k)}</td><td${pre ? ' style="white-space:pre-wrap"' : ""}>${escapeHtml(v)}</td></tr>`;

  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;background:#0A192F;color:#fff;padding:24px">
    <div style="max-width:600px;margin:auto;background:#112240;border-radius:12px;padding:28px">
      <h2 style="color:#F5C26B;margin:0 0 12px">Al-Bahr Travels — New Form Submission</h2>
      <p style="color:#cbd5e1;margin:0 0 16px">A visitor submitted the website form. Details below (also attached as <b>${escapeHtml(fileName)}</b>).</p>
      <table style="width:100%;border-collapse:collapse;color:#fff">
        ${row("Client Name", fullName)}
        ${row("Client Email", lead.email || "—")}
        ${row("Phone Number", lead.phone)}
        ${row("Current Residence (Where they live now)", lead.residence_country || "—")}
        ${row("Booking Target Country", lead.target_country)}
        ${row("Passport Number", lead.passport_number || "—")}
        ${row("Passport Expiry Date", lead.passport_expiry || "—")}
        ${row("Visa Number", lead.visa_number || "—")}
        ${row("Visa Expiry Date", lead.visa_expiry || "—")}
        ${row("Client Message / Request", lead.message || "—", true)}
        ${row("Source", lead.source_type)}
        ${row("Submitted", new Date().toUTCString())}
      </table>
    </div></body></html>`;

  const boundary = `=_albahr_${Date.now().toString(36)}`;
  const mime = [
    `To: ${LEAD_EMAIL}`,
    `Reply-To: ${lead.email || LEAD_EMAIL}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 7bit",
    "",
    html,
    "",
    `--${boundary}`,
    `Content-Type: text/plain; name="${fileName}"`,
    "Content-Transfer-Encoding: base64",
    `Content-Disposition: attachment; filename="${fileName}"`,
    "",
    base64(fileText),
    "",
    `--${boundary}--`,
    "",
  ].join("\r\n");

  try {
    const res = await fetch(`${GMAIL_GATEWAY}/users/me/messages/send`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": gmailKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw: base64Url(mime) }),
    });
    if (!res.ok) {
      const txt = await res.text();
      console.error("[leads] Gmail send failed", res.status, txt);
      return { sent: false, reason: "send_failed" as const };
    }
    return { sent: true };
  } catch (e) {
    console.error("[leads] Gmail exception", e);
    return { sent: false, reason: "exception" as const };
  }
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => LeadSchema.parse(input))
  .handler(async ({ data }) => {
    // Only persist columns present on country_leads; extras go into the email only.
    const dbRow = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      passport_number: data.passport_number || "",
      target_country: data.target_country,
      source_type: data.source_type,
    };
    const { error } = await supabaseAdmin.from("country_leads").insert(dbRow);
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
