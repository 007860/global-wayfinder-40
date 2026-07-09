import { defineMcp } from "@lovable.dev/mcp-js";
import listServices from "./tools/list-services";
import listCountries from "./tools/list-countries";
import getContactInfo from "./tools/get-contact-info";
import listBlogs from "./tools/list-blogs";

export default defineMcp({
  name: "al-bahr-travels-mcp",
  title: "Al-Bahr Travels & Consultants",
  version: "0.1.0",
  instructions:
    "Public tools for Al-Bahr Travels & Consultants (Lahore, Pakistan). Use `list_services` to see the services offered (Medical, Visa, Flight, Hotel), `list_countries` to see the supported countries for a given service, `get_contact_info` for the branch address, phone, WhatsApp, and email, and `list_blogs` to fetch published blog posts.",
  tools: [listServices, listCountries, getContactInfo, listBlogs],
});
