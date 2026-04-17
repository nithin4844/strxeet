"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Twitter, Youtube, Mail } from "lucide-react";
import toast from "react-hot-toast";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/shop" },
    { label: "Tops", href: "/shop?category=tops" },
    { label: "Bottoms", href: "/shop?category=bottoms" },
    { label: "Outerwear", href: "/shop?category=outerwear" },
    { label: "Sets & Co-ords", href: "/shop?category=sets" },
  ],
  Info: [
    { label: "About Us", href: "/about" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ],
  Help: [
    { label: "FAQs", href: "/faq" },
    { label: "Shipping & Returns", href: "/shipping" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "Contact Us", href: "/contact" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSocialClick = () => {
    toast("Social channels coming soon");
  };

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Enter an email address");
      return;
    }

    toast.success("Thanks. You are on the drop list.");
    setEmail("");
  };

  return (
    <footer className="bg-brand-black text-white">
      {/* Newsletter */}
      <div className="border-b border-brand-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-xl">
            <h3 className="font-display text-4xl tracking-widest mb-2">JOIN THE DROP LIST</h3>
            <p className="text-brand-gray-400 text-sm mb-6">
              Be first to know about new collections, exclusive drops, and member-only offers.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex gap-0"
            >
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-brand-gray-900 border border-brand-gray-700 px-4 py-3 text-sm text-white placeholder-brand-gray-500 focus:outline-none focus:border-brand-accent transition-colors"
              />
              <button
                type="submit"
                className="bg-brand-accent text-brand-black font-semibold px-6 py-3 text-sm uppercase tracking-widest hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-display text-4xl tracking-widest block mb-4">
              STRXEET
            </Link>
            <p className="text-brand-gray-400 text-sm leading-relaxed mb-6">
              Contemporary urban fashion built for the streets. Made different. Worn loud.
            </p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleSocialClick}
                className="text-brand-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </button>
              <button
                type="button"
                onClick={handleSocialClick}
                className="text-brand-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </button>
              <button
                type="button"
                onClick={handleSocialClick}
                className="text-brand-gray-400 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </button>
              <a href="mailto:hello@strxeet.com" className="text-brand-gray-400 hover:text-white transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold uppercase tracking-widest text-xs mb-5">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-brand-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-brand-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-brand-gray-500 text-xs">
            © {new Date().getFullYear()} STRXEET. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-brand-gray-500 hover:text-white text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-brand-gray-500 hover:text-white text-xs transition-colors">
              Terms of Use
            </Link>
          </div>
          <p className="text-brand-gray-600 text-xs">Made in India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}
