import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "STRXEET",
    short_name: "STRXEET",
    description: "Contemporary urban fashion built for the streets.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#0a0a0a",
  };
}
