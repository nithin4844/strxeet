import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy information for STRXEET customers and site visitors.",
};

export default function PrivacyPage() {
  return (
    <StaticPage
      kicker="Legal"
      title="PRIVACY"
      intro="This demo storefront keeps the privacy model intentionally simple. The app stores cart and wishlist data in the browser and does not connect to a backend service."
      sections={[
        {
          title: "What This Site Stores",
          body: [
            "Cart contents and wishlist items are stored locally in your browser using local storage so they remain available when you come back to the site on the same device.",
            "The current demo checkout form does not process a real payment or submit personal data to a live server.",
          ],
        },
        {
          title: "How Data Is Used",
          body: [
            "In a production version, order, account, and support information would be used only to fulfil purchases, support customers, prevent fraud, and improve the service.",
            "If production analytics or marketing tooling is added later, this policy should be updated to name those systems explicitly instead of leaving the behavior implied.",
          ],
        },
      ]}
      cta={{ href: "/terms", label: "Read Terms" }}
    />
  );
}
