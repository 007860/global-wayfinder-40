import { defineTool } from "@lovable.dev/mcp-js";
import {
  BRAND_NAME,
  BRANCH_ADDRESS,
  LEAD_EMAIL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/countries";

const CONTACT = {
  brand: BRAND_NAME,
  branch_address: BRANCH_ADDRESS,
  phone: "+92 343 4762264",
  whatsapp: WHATSAPP_DISPLAY,
  whatsapp_url: WHATSAPP_URL,
  email: LEAD_EMAIL,
  website: "https://https-al-bahr-travels-consultants.lovable.app",
  hours: "Mon–Sat, 10:00–19:00 PKT",
};

export default defineTool({
  name: "get_contact_info",
  title: "Get contact info",
  description:
    "Return the public branch address, phone, WhatsApp, and email for Al-Bahr Travels & Consultants.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(CONTACT, null, 2) }],
    structuredContent: CONTACT,
  }),
});
