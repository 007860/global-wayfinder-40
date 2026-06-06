import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

// Public anon key — RLS enforces access. Hardcoded so it works on every deploy target.
const SUPABASE_URL = "https://gpwwjosckbesylfrqnvg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwd3dqb3Nja2Jlc3lsZnJxbnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2ODg1NTMsImV4cCI6MjA5NDI2NDU1M30.r_gEtFFh_CbFPaZpPxYnwZ6u8GgQdJeEN1VSxrT2nR8";

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const LeadSchema = z.object({
  first_name: z.string().trim().min(1).max(80),
  last_name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(5).max(40),
  residence_country: z.string().trim().max(120).optional().default(""),
  passport_number: z.string().trim().max(40).optional().default(""),
  passport_expiry: z.string().trim().max(20).optional().default(""),
  visa_number: z.string().trim().max(40).optional().default(""),
  visa_expiry: z.string().trim().max(20).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
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

function dash(v: string | undefined | null) {
  return v && v.trim() ? v : "—";
}

function buildLeadFile(lead: Lead) {
  const ts = new Date().toUTCString();
  return [
    "Al-Bahr Travels & Consultants — Lead Submission",
    "================================================",
    `Submitted              : ${ts}`,
    `Source                 : ${lead.source_type}`,
    `Booking Target Country : ${lead.target_country}`,
    "",
    "Client Details",
    "--------------",
    `Client Name            : ${lead.first_name} ${lead.last_name}`,
    `Client Email           : ${lead.email}`,
    `Phone Number           : ${lead.phone}`,
    `Current Residence      : ${dash(lead.residence_country)}`,
    `Passport Number        : ${dash(lead.passport_number)}`,
    `Passport Expiry Date   : ${dash(lead.passport_expiry)}`,
    `Visa Number            : ${dash(lead.visa_number)}`,
    `Visa Expiry Date       : ${dash(lead.visa_expiry)}`,
    "",
    "Client Message / Request",
    "------------------------",
    dash(lead.message),
    "",
    "— End of file —",
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

  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 0;color:#94a3b8;width:42%">${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`;

  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;background:#0A192F;color:#fff;padding:24px">
    <div style="max-width:620px;margin:auto;background:#112240;border-radius:12px;padding:28px">
      <h2 style="color:#F5C26B;margin:0 0 12px">Al-Bahr Travels — New Lead</h2>
      <p style="color:#cbd5e1;margin:0 0 16px">A visitor submitted a request via the website. Full details are attached as <b>${escapeHtml(fileName)}</b>.</p>
      <table style="width:100%;border-collapse:collapse;color:#fff">
        ${row("Client Name", `${lead.first_name} ${lead.last_name}`)}
        ${row("Client Email", lead.email)}
        ${row("Phone Number", lead.phone)}
        ${row("Current Residence", dash(lead.residence_country))}
        ${row("Booking Target", lead.target_country)}
        ${row("Passport Number", dash(lead.passport_number))}
        ${row("Passport Expiry", dash(lead.passport_expiry))}
        ${row("Visa Number", dash(lead.visa_number))}
        ${row("Visa Expiry", dash(lead.visa_expiry))}
        ${row("Source", lead.source_type)}
        ${row("Submitted", new Date().toUTCString())}
      </table>
      <div style="margin-top:18px;padding:14px;background:#0A192F;border-radius:8px;border:1px solid #1e3a5f">
        <div style="color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">Client Message / Request</div>
        <div style="white-space:pre-wrap;color:#fff">${escapeHtml(dash(lead.message))}</div>
      </div>
    </div></body></html>`;

  const boundary = `=_albahr_${Date.now().toString(36)}`;
  const mime = [
    `To: ${LEAD_EMAIL}`,
    `Reply-To: ${lead.email}`,
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
    // country_leads only stores a subset; the full record goes out via email.
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
      // Don't block the lead — still try to email so we never lose it.
    }
    await supabaseAdmin.rpc("increment_counter", {
      counter_name: "consultations_booked",
    });
    const email = await sendLeadEmail(data);
    return { ok: true, email };
  });
