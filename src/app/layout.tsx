import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "STRXEET — Modern Urban Fashion",
    template: "%s | STRXEET",
  },
  manifest: "/manifest.webmanifest",
  description:
    "STRXEET is a contemporary urban fashion brand built for the streets. Shop the latest drops in tops, bottoms, outerwear, and co-ords.",
  keywords: ["streetwear", "urban fashion", "clothing brand", "men's fashion", "hoodies", "cargo pants"],
  openGraph: {
    title: "STRXEET — Modern Urban Fashion",
    description: "Contemporary urban fashion built for the streets.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "STRXEET — Modern Urban Fashion",
    description: "Contemporary urban fashion built for the streets.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CartSidebar />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#0A0A0A",
              color: "#FAFAFA",
              borderRadius: "0",
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              fontWeight: "500",
            },
          }}
        />
      </body>
    </html>
  );
}
