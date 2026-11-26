import { createFileRoute, Link } from "@tanstack/react-router";
import { TopUtilityStrip } from "@/components/TopUtilityStrip";
import { BurgerMenu } from "@/components/BurgerMenu";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppInquiry } from "@/components/WhatsAppInquiry";
import { SITE_URL, LOGO_URL, breadcrumbLd, jsonScript } from "@/lib/seo";

const URL = `${SITE_URL}/b2b`;
const TITLE = "B2B Sub-Agent Signup | AL BAHR HORIZON TRAVELS AND CONSULTANTS";
const DESC =
  "Partner with AL BAHR HORIZON TRAVELS AND CONSULTANTS for wholesale travel, group fares and corporate travel services.";

export const Route = createFileRoute("/b2b")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: "Travel Partner Programme | AL BAHR HORIZON" },
      {
        property: "og:description",
        content: "Connect with our dedicated B2B travel desk in Lahore.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: LOGO_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Travel Partner Programme | AL BAHR HORIZON" },
      {
        name: "twitter:description",
        content: "Connect with our dedicated B2B travel desk in Lahore.",
      },
      { name: "twitter:image", content: LOGO_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: jsonScript(
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "B2B Sub-Agent Signup", path: "/b2b" },
      ]),
    ),
  }),
  component: () => (
    <main>
      <TopUtilityStrip />
      <BurgerMenu />
      <section className="portal-section b2b-section">
        <div>
          <span className="eyebrow">GROW WITH AL BAHR HORIZON</span>
          <h1>
            Your business.
            <br />
            Our travel expertise.
          </h1>
          <p>
            Wholesale rates, group fares and a dedicated support desk for travel brokers,
            sub-agents and corporate accounts.
          </p>
          <p>
            Are you a company booking travel for your own staff? See our{" "}
            <Link to="/corporate-travel">Corporate Travel</Link> page.
          </p>
        </div>
        <WhatsAppInquiry b2b />
      </section>
      <SiteFooter />
    </main>
  ),
});
