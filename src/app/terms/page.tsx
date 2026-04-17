import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";

export const metadata: Metadata = {
  title: "Terms Of Use",
  description: "Terms of use for the STRXEET storefront.",
};

export default function TermsPage() {
  return (
    <StaticPage
      kicker="Legal"
      title="TERMS"
      intro="These terms describe the intended rules for using the storefront. They are lightweight because this repository is still a demo ecommerce implementation."
      sections={[
        {
          title: "Using The Site",
          body: [
            "Use the storefront lawfully and do not attempt to interfere with the service, payment flows, or other users. Product descriptions, prices, and availability may change without notice.",
          ],
        },
        {
          title: "Orders and Content",
          body: [
            "In a production store, order acceptance, cancellations, refunds, taxes, and fulfilment rules would be governed by the published checkout and support policies.",
            "All brand assets, copy, imagery, and interface design remain the property of STRXEET or the relevant rights holder.",
          ],
        },
        {
          title: "Demo Limitation",
          body: [
            "This repository currently implements a demo checkout flow. No live payment is processed and no order is actually fulfilled.",
          ],
        },
      ]}
      cta={{ href: "/privacy", label: "Read Privacy Policy" }}
    />
  );
}
