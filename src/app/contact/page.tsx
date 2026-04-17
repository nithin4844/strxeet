import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "How to contact STRXEET for orders, support, and partnerships.",
};

export default function ContactPage() {
  return (
    <StaticPage
      kicker="Support"
      title="CONTACT US"
      intro="Need help with an order, sizing, shipping, or a brand partnership request? The fastest route is email so we can keep a written trail and respond clearly."
      sections={[
        {
          title: "Customer Support",
          body: [
            "For order help, returns, shipping questions, and general support, email hello@strxeet.com. Typical response time is one business day.",
            "Include your order number, the item name, and the issue you want resolved so the support team can act without another back-and-forth.",
          ],
        },
        {
          title: "Partnerships",
          body: [
            "For retail, creator, press, and collaboration requests, email collabs@strxeet.com with a short proposal, audience context, and timeline.",
          ],
        },
      ]}
      cta={{ href: "/faq", label: "View FAQs" }}
    />
  );
}
