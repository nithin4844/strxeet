"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Truck, RefreshCw, ChevronDown, ChevronUp, Minus, Plus, Share2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import toast from "react-hot-toast";
import { formatPrice } from "@/lib/commerce";

interface ProductDetailClientProps {
  product: Product;
  related: Product[];
}

export default function ProductDetailClient({ product, related }: ProductDetailClientProps) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState<string | null>("description");

  const addToCart = useCartStore((s) => s.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!product.inStock) {
      toast.error("This product is currently out of stock");
      return false;
    }

    if (!selectedSize) {
      toast.error("Please select a size");
      return false;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedColor);
    }

    toast.success("Added to cart!");
    return true;
  };

  const handleWishlist = () => {
    if (wishlisted) {
      removeFromWishlist(product.id);
      toast("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist!");
    }
  };

  const handleBuyNow = () => {
    const added = handleAddToCart();

    if (added) {
      router.push("/checkout");
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${product.name} | STRXEET`,
      text: `Check out ${product.name} on STRXEET.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Product link copied");
      }
    } catch {
      toast.error("Could not share this product right now");
    }
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const accordionItems = [
    { id: "description", label: "Description", content: product.description },
    {
      id: "details",
      label: "Product Details",
      content: [
        product.material && `Material: ${product.material}`,
        product.fit && `Fit: ${product.fit}`,
        `Category: ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}`,
        `Available Sizes: ${product.sizes.join(", ")}`,
      ]
        .filter(Boolean)
        .join("\n"),
    },
    {
      id: "shipping",
      label: "Shipping & Returns",
      content:
        "Free shipping on orders above ₹999. Standard delivery in 4-7 business days. Express delivery available at checkout.\n\nEasy 7-day returns for unworn, unwashed items with original tags attached.",
    },
    {
      id: "sizeguide",
      label: "Size Guide",
      content:
        "XS: Chest 34\", Waist 28\"\nS: Chest 36\", Waist 30\"\nM: Chest 38\", Waist 32\"\nL: Chest 40\", Waist 34\"\nXL: Chest 42\", Waist 36\"\nXXL: Chest 44\", Waist 38\"",
    },
  ];

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-xs text-brand-gray-400 uppercase tracking-wider">
          <Link href="/" className="hover:text-brand-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-brand-black transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-brand-black transition-colors capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-brand-black">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">
          <div className="flex gap-3">
            {product.images.length > 1 && (
              <div className="hidden sm:flex flex-col gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-16 h-20 overflow-hidden border-2 shrink-0 transition-colors ${
                      selectedImage === i ? "border-brand-black" : "border-transparent hover:border-brand-gray-300"
                    }`}
                  >
                    <Image src={img} alt={`${product.name} view ${i + 1}`} fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}

            <div className="flex-1 space-y-3">
              <div className="relative aspect-[3/4] bg-brand-gray-50 overflow-hidden">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover transition-opacity duration-300"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-brand-accent text-brand-black text-xs font-bold uppercase tracking-wider px-2 py-1">
                    New
                  </span>
                )}
                {product.isBestseller && (
                  <span className="absolute top-4 left-4 bg-brand-black text-white text-xs font-bold uppercase tracking-wider px-2 py-1">
                    Bestseller
                  </span>
                )}
                {!product.inStock && (
                  <span className="absolute top-4 right-4 bg-white text-brand-black text-xs font-bold uppercase tracking-wider px-2 py-1">
                    Sold Out
                  </span>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex sm:hidden gap-2 justify-center">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        selectedImage === i ? "bg-brand-black" : "bg-brand-gray-300"
                      }`}
                      aria-label={`View image ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:pt-2">
            <h1 className="font-display text-4xl sm:text-5xl tracking-wide text-brand-black mb-2 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                    className="text-amber-400"
                  />
                ))}
              </div>
              <span className="text-sm text-brand-gray-500">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <p className={`text-sm font-medium mb-6 ${product.inStock ? "text-green-600" : "text-red-500"}`}>
              {product.inStock ? "In stock and ready to ship" : "Currently out of stock"}
            </p>

            <div className="flex items-center gap-3 mb-6">
              <span className="font-bold text-2xl">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-brand-gray-400 line-through text-lg">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 uppercase">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-widest">Color</span>
                <span className="text-xs text-brand-gray-500">{selectedColor.name}</span>
              </div>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color);
                      setSelectedImage(0);
                    }}
                    title={color.name}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor.name === color.name
                        ? "border-brand-black scale-110"
                        : "border-brand-gray-200 hover:border-brand-gray-400"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-widest">Size</span>
                <button
                  onClick={() => setExpandedSection("sizeguide")}
                  className="text-xs text-brand-gray-500 underline underline-offset-2 hover:text-brand-black transition-colors"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[44px] px-3 py-2 text-sm font-medium border transition-colors ${
                      selectedSize === size
                        ? "border-brand-black bg-brand-black text-white"
                        : "border-brand-gray-200 hover:border-brand-black text-brand-gray-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && product.inStock && (
                <p className="text-xs text-brand-gray-400 mt-2">Please select a size to continue</p>
              )}
            </div>

            <div className="flex gap-3 mb-4">
              <div className="flex items-center border border-brand-gray-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-3 hover:bg-brand-gray-50 transition-colors"
                  aria-label="Decrease"
                  disabled={!product.inStock}
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-3 hover:bg-brand-gray-50 transition-colors"
                  aria-label="Increase"
                  disabled={!product.inStock}
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={!product.inStock}
              >
                {product.inStock ? "Add to Cart" : "Sold Out"}
              </button>

              <button
                onClick={handleWishlist}
                className={`w-12 border flex items-center justify-center transition-colors ${
                  wishlisted
                    ? "border-red-300 text-red-500"
                    : "border-brand-gray-200 text-brand-gray-400 hover:border-brand-black hover:text-brand-black"
                }`}
                aria-label="Wishlist"
              >
                <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="btn-accent w-full mb-6 disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={!product.inStock}
            >
              Buy Now
            </button>

            <div className="flex flex-col sm:flex-row gap-4 py-4 border-y border-brand-gray-100 mb-6">
              <div className="flex items-center gap-2 text-xs text-brand-gray-500">
                <Truck size={14} /> Free shipping above ₹999
              </div>
              <div className="flex items-center gap-2 text-xs text-brand-gray-500">
                <RefreshCw size={14} /> 7-day easy returns
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-xs text-brand-gray-500 hover:text-brand-black transition-colors ml-auto"
              >
                <Share2 size={14} /> Share
              </button>
            </div>

            <div className="space-y-0 border-t border-brand-gray-100">
              {accordionItems.map((item) => (
                <div key={item.id} className="border-b border-brand-gray-100">
                  <button
                    onClick={() => setExpandedSection(expandedSection === item.id ? null : item.id)}
                    className="flex items-center justify-between w-full py-4 text-sm font-semibold uppercase tracking-widest text-left"
                  >
                    {item.label}
                    {expandedSection === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {expandedSection === item.id && (
                    <div className="pb-4 text-sm text-brand-gray-500 leading-relaxed whitespace-pre-line">
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="section-title mb-10">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
