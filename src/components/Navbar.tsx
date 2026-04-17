"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, Search, Heart, Menu, X, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

const navLinks = [
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "All Products", href: "/shop" },
      { label: "Tops", href: "/shop?category=tops" },
      { label: "Bottoms", href: "/shop?category=bottoms" },
      { label: "Outerwear", href: "/shop?category=outerwear" },
      { label: "Sets", href: "/shop?category=sets" },
    ],
  },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const totalItems = useCartStore((s) => s.getTotalItems());
  const toggleCart = useCartStore((s) => s.toggleCart);
  const wishlistCount = useWishlistStore((s) => s.items.length);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setSearchOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchQuery.trim();
    const params = new URLSearchParams();

    if (query) {
      params.set("q", query);
    }

    setSearchOpen(false);
    router.push(params.size > 0 ? `/shop?${params.toString()}` : "/shop");
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-brand-black text-white text-xs text-center py-2 tracking-widest uppercase font-medium">
        Free shipping on orders above ₹999 &nbsp;•&nbsp; Use code{" "}
        <span className="text-brand-accent font-bold">STRXEET10</span> for 10% off
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-sm" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="font-display text-3xl tracking-widest text-brand-black">
              STRXEET
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-sm font-medium uppercase tracking-widest text-brand-gray-600 hover:text-brand-black transition-colors"
                  >
                    {link.label}
                    {link.children && <ChevronDown size={14} />}
                  </Link>

                  {link.children && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 pt-2 min-w-[180px] animate-slide-down">
                      <div className="bg-white border border-brand-gray-100 shadow-xl py-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-brand-gray-600 hover:text-brand-black hover:bg-brand-gray-50 transition-colors uppercase tracking-wider"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1 text-brand-gray-600 hover:text-brand-black transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <Link href="/wishlist" className="relative p-1 text-brand-gray-600 hover:text-brand-black transition-colors hidden sm:block">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative p-1 text-brand-gray-600 hover:text-brand-black transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-accent text-brand-black text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-1 text-brand-gray-600 hover:text-brand-black"
                aria-label="Menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="border-t border-brand-gray-100 py-3 animate-slide-down">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products, styles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-brand-gray-50 border border-brand-gray-200 focus:outline-none focus:border-brand-black transition-colors"
                  autoFocus
                />
              </form>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-brand-gray-100 bg-white animate-slide-down">
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    className="block text-sm font-semibold uppercase tracking-widest text-brand-black py-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="pl-4 space-y-2 mt-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block text-sm text-brand-gray-500 uppercase tracking-wider py-1"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-2 border-t border-brand-gray-100">
                <Link
                  href="/wishlist"
                  className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-brand-gray-600 py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <Heart size={16} /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
