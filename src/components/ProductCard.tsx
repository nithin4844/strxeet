"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import toast from "react-hot-toast";
import { formatPrice } from "@/lib/commerce";

interface ProductCardProps {
  product: Product;
  tone?: "default" | "inverse";
  prioritizeImage?: boolean;
}

export default function ProductCard({
  product,
  tone = "default",
  prioritizeImage = false,
}: ProductCardProps) {
  const [hoveredImg, setHoveredImg] = useState(false);
  const addToCart = useCartStore((s) => s.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isWishlisted } = useWishlistStore();

  const wishlisted = isWishlisted(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (wishlisted) {
      removeFromWishlist(product.id);
      toast("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!product.inStock) {
      toast.error("This product is currently out of stock");
      return;
    }

    const defaultSize = product.sizes[2] || product.sizes[0];
    const defaultColor = product.colors[0];
    addToCart(product, defaultSize, defaultColor);
    toast.success(`${product.name} added to cart`);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;
  const inverse = tone === "inverse";

  return (
    <div className={`group product-card-hover ${inverse ? "bg-white/[0.07] border border-white/10 p-3" : ""}`}>
      <Link href={`/product/${product.id}`}>
        {/* Image */}
        <div
          className={`relative overflow-hidden aspect-[3/4] mb-3 ${inverse ? "bg-brand-gray-800" : "bg-brand-gray-100"}`}
          onMouseEnter={() => setHoveredImg(true)}
          onMouseLeave={() => setHoveredImg(false)}
        >
          <Image
            src={hoveredImg && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-all duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={prioritizeImage}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-brand-accent text-brand-black text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                New
              </span>
            )}
            {product.isBestseller && (
              <span className="bg-brand-black text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                Bestseller
              </span>
            )}
            {discount && (
              <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                -{discount}%
              </span>
            )}
            {!product.inStock && (
              <span className="bg-white text-brand-black text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                Sold Out
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              onClick={handleWishlist}
              className={`w-8 h-8 flex items-center justify-center bg-white shadow-sm transition-all ${
                wishlisted ? "text-red-500" : "text-brand-gray-400 hover:text-red-500"
              }`}
              aria-label="Add to wishlist"
            >
              <Heart size={15} fill={wishlisted ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Quick Add */}
          <div className="absolute bottom-0 left-0 right-0 bg-brand-black text-white text-xs font-semibold uppercase tracking-widest py-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
            <ShoppingBag size={14} />
            <button
              onClick={handleQuickAdd}
              className="w-full h-full absolute inset-0"
              aria-label={product.inStock ? "Quick add to cart" : "Product out of stock"}
              disabled={!product.inStock}
            />
            {product.inStock ? "Quick Add" : "Sold Out"}
          </div>
        </div>

        {/* Info */}
        <div>
          <h3 className={`font-medium text-sm leading-tight mb-1 group-hover:underline ${inverse ? "text-white" : "text-brand-black"}`}>
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-1.5">
            <Star size={11} fill="currentColor" className="text-amber-400" />
            <span className={`text-xs ${inverse ? "text-white/60" : "text-brand-gray-500"}`}>
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className={`font-bold text-sm ${inverse ? "text-white" : "text-brand-black"}`}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className={`text-xs line-through ${inverse ? "text-white/45" : "text-brand-gray-400"}`}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Colors */}
          <div className="flex gap-1.5 mt-2">
            {product.colors.map((color) => (
              <div
                key={color.name}
                className={`w-3.5 h-3.5 rounded-full border ${inverse ? "border-white/20" : "border-brand-gray-200"}`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
