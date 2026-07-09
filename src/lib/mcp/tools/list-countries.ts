import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import {
  GCC_COUNTRIES,
  EU_COUNTRIES,
  WORLD_COUNTRIES,
} from "@/lib/countries";

export default defineTool({
  name: "list_countries",
  title: "List supported countries",
  description:
    "List the countries Al-Bahr supports for a given service. Medical = Gulf only, Visa = Europe only, Flight/Hotel = worldwide.",
  inputSchema: {
    service: z
      .enum(["medical", "visa", "flight", "hotel"])
      .describe("Service key. Determines which country list to return."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ service }) => {
    const list =
      service === "medical"
        ? GCC_COUNTRIES
        : service === "visa"
          ? EU_COUNTRIES
          : WORLD_COUNTRIES;
    return {
      content: [{ type: "text", text: JSON.stringify(list, null, 2) }],
      structuredContent: { service, countries: list },
    };
  },
});
