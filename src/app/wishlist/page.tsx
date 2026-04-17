"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <Heart size={64} className="mx-auto text-brand-gray-200 mb-4" />
        <h1 className="font-display text-4xl tracking-widest mb-4">Your Wishlist Is Empty</h1>
        <p className="text-brand-gray-500 mb-8">Save items you love and come back to them later.</p>
        <Link href="/shop" className="btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="section-title mb-1">Wishlist</h1>
        <p className="text-brand-gray-500 text-sm">{items.length} saved items</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
