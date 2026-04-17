import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";

export const metadata: Metadata = {
  title: "Shipping And Returns",
  description: "Shipping rates, delivery windows, and returns information for STRXEET.",
};

export default function ShippingPage() {
  return (
    <StaticPage
      kicker="Delivery"
      title="SHIPPING"
      intro="The storefront currently offers a simple shipping model built around a free-shipping threshold and a faster paid option at checkout."
      sections={[
        {
          title: "Shipping Rates",
          body: [
            "Standard delivery is free for orders above Rs. 999. Orders below that threshold pay Rs. 79 for standard delivery.",
            "Express delivery is available at checkout for Rs. 199 where supported.",
          ],
        },
        {
          title: "Delivery Windows",
          body: [
            "Standard delivery typically arrives in 4 to 7 business days. Express delivery typically arrives in 1 to 2 business days.",
            "Actual timelines depend on location, carrier coverage, weekends, and any launch-period volume spikes.",
          ],
        },
        {
          title: "Returns",
          body: [
            "Returns are accepted within 7 days for unworn and unwashed items with original tags attached. Refunds begin after the returned item passes inspection.",
          ],
        },
      ]}
      cta={{ href: "/faq", label: "View FAQs" }}
    />
  );
}
