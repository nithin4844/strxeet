import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";

export const metadata: Metadata = {
  title: "Blog",
  description: "The STRXEET journal covering drops, styling notes, and brand updates.",
};

export default function BlogPage() {
  return (
    <StaticPage
      kicker="Journal"
      title="BLOG"
      intro="The STRXEET journal is where we break down new drops, styling ideas, product stories, and what is shaping the next collection."
      sections={[
        {
          title: "What You Will Find Here",
          body: [
            "Editorial product breakdowns, fabric notes, styling guides, and behind-the-scenes updates from the design and production process.",
            "This first version is intentionally lightweight, but the route now exists so the site navigation remains coherent while the full journal format is built out.",
          ],
        },
        {
          title: "Coming Soon",
          body: [
            "Expect capsule collection spotlights, fit guides, and sourcing stories that explain why certain silhouettes, trims, and materials made it into the line.",
          ],
        },
      ]}
      cta={{ href: "/collections", label: "Browse Collections" }}
    />
  );
}
