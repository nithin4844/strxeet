import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";

export const metadata: Metadata = {
  title: "Careers",
  description: "Careers and hiring information for STRXEET.",
};

export default function CareersPage() {
  return (
    <StaticPage
      kicker="Careers"
      title="JOIN STRXEET"
      intro="We are building a small, high-output brand team across design, content, operations, and ecommerce. We care about taste, speed, and execution."
      sections={[
        {
          title: "How We Work",
          body: [
            "Small teams, direct ownership, and strong design standards. The expectation is simple: know your craft, move quickly, and care about the final result.",
            "Most roles touch the customer experience end to end, so we value people who can think across product, brand, and operations rather than staying in one narrow lane.",
          ],
        },
        {
          title: "Current Status",
          body: [
            "There are no public openings listed in this demo storefront yet. If you want to work with the brand, send a concise note and portfolio to hello@strxeet.com.",
          ],
        },
      ]}
      cta={{ href: "/about", label: "Read Our Story" }}
    />
  );
}
