import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";

export const metadata: Metadata = {
  title: "Sustainability",
  description: "STRXEET sustainability principles and operating direction.",
};

export default function SustainabilityPage() {
  return (
    <StaticPage
      kicker="Responsibility"
      title="SUSTAINABILITY"
      intro="The brand positioning already talks about responsible sourcing and smaller-batch production. This page makes that intent visible in the navigation instead of leaving it as an unimplemented promise."
      sections={[
        {
          title: "Current Direction",
          body: [
            "The immediate focus is better materials selection, durable construction, and smaller runs that reduce dead stock. Product longevity matters more than trend churn.",
            "Operationally, the goal is simpler packaging, fewer unnecessary inserts, and clearer supplier standards as the brand grows.",
          ],
        },
        {
          title: "What Needs To Happen Next",
          body: [
            "A production-ready sustainability page should name actual suppliers, packaging choices, fabric certifications, and measurable goals instead of broad claims.",
            "Until those systems exist, the copy here stays intentionally conservative rather than overselling impact.",
          ],
        },
      ]}
      cta={{ href: "/about", label: "About STRXEET" }}
    />
  );
}
