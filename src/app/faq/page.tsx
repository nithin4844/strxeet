import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Frequently asked questions about STRXEET orders, shipping, sizing, and returns.",
};

export default function FaqPage() {
  return (
    <StaticPage
      kicker="Help"
      title="FAQs"
      intro="The most common support questions are usually about fit, delivery times, and returns. This page covers the current storefront policy set."
      sections={[
        {
          title: "Orders and Delivery",
          body: [
            "Standard delivery usually takes 4 to 7 business days. Express delivery usually takes 1 to 2 business days where available.",
            "Orders above Rs. 999 qualify for free standard shipping in this storefront flow.",
          ],
        },
        {
          title: "Sizing and Fit",
          body: [
            "Each product page lists available sizes and fit notes. Oversized, relaxed, regular, slim, and tapered fits are called out directly in the product details accordion.",
            "If you are between sizes, follow the fit direction first. Size up for a roomier look on regular fits and stay true to size for intentionally oversized silhouettes.",
          ],
        },
        {
          title: "Returns",
          body: [
            "Returns are accepted within 7 days for unworn, unwashed items with original tags attached. Final eligibility still depends on inspection when the item comes back in.",
          ],
        },
      ]}
      cta={{ href: "/shipping", label: "Shipping And Returns" }}
    />
  );
}
