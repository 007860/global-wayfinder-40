import { defineTool } from "@lovable.dev/mcp-js";

const SERVICES = [
  {
    key: "medical",
    title: "Medical Appointment Booking",
    scope: "Gulf Region",
    detail:
      "Gamca / Wafid medical fitness appointment booking for Saudi Arabia, Qatar, UAE, Kuwait, Oman, Bahrain.",
  },
  {
    key: "visa",
    title: "Visa Appointment Booking",
    scope: "All European Countries",
    detail: "Schengen and UK visa appointment pipelines for European countries.",
  },
  {
    key: "flight",
    title: "Air Ticket Booking",
    scope: "Gulf & Worldwide",
    detail: "Air ticket booking for Gulf and worldwide destinations.",
  },
  {
    key: "hotel",
    title: "Hotel Booking",
    scope: "International",
    detail: "International hotel reservations with negotiated corporate rates.",
  },
];

export default defineTool({
  name: "list_services",
  title: "List services",
  description:
    "List the booking and consultancy services offered by Al-Bahr Travels & Consultants.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(SERVICES, null, 2) }],
    structuredContent: { services: SERVICES },
  }),
});
