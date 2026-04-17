import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";

export const metadata: Metadata = {
  title: "Size Guide",
  description: "General sizing guidance for STRXEET products.",
};

export default function SizeGuidePage() {
  return (
    <StaticPage
      kicker="Fit"
      title="SIZE GUIDE"
      intro="Use the fit notes on each product page first, then use this general guide as the baseline for common STRXEET size ranges."
      sections={[
        {
          title: "Tops",
          body: [
            "XS: Chest 34, Waist 28. S: Chest 36, Waist 30. M: Chest 38, Waist 32. L: Chest 40, Waist 34. XL: Chest 42, Waist 36. XXL: Chest 44, Waist 38.",
            "Oversized and relaxed products are designed to sit looser than these body measurements suggest, so read the fit label before sizing up unnecessarily.",
          ],
        },
        {
          title: "Bottoms",
          body: [
            "Waist sizes 28, 30, 32, 34, 36, and 38 are used for chinos and denim. Cargo and jogger silhouettes may use alpha sizing instead, depending on the cut.",
          ],
        },
        {
          title: "When In Doubt",
          body: [
            "If you prefer a closer fit, choose your true size on regular and relaxed products. If you want a looser streetwear silhouette on regular fits, size up once.",
          ],
        },
      ]}
      cta={{ href: "/shop", label: "Shop Products" }}
    />
  );
}
