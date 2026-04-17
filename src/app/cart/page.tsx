"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  COUPONS,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_COST,
  formatPrice,
  getDiscountAmount,
} from "@/lib/commerce";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const subtotal = getTotalPrice();
  const discount = getDiscountAmount(subtotal, appliedCoupon || undefined);
  const shippingFree = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = shippingFree ? 0 : STANDARD_SHIPPING_COST;
  const total = subtotal + shipping - discount;

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();

    if (!code) {
      toast.error("Enter a coupon code");
      return;
    }

    if (!(code in COUPONS)) {
      toast.error("Invalid coupon code");
      return;
    }

    setAppliedCoupon(code);
    setCouponCode(code);
    toast.success(`Coupon applied! You saved ${formatPrice(getDiscountAmount(subtotal, code))}`);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <ShoppingBag size={64} className="mx-auto text-brand-gray-200 mb-4" />
        <h1 className="font-display text-4xl tracking-widest mb-4">Your Cart Is Empty</h1>
        <p className="text-brand-gray-500 mb-8">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/shop" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/shop" className="flex items-center gap-2 text-sm text-brand-gray-500 hover:text-brand-black transition-colors uppercase tracking-wider">
          <ArrowLeft size={16} /> Continue Shopping
        </Link>
        <h1 className="section-title ml-auto">Cart ({items.reduce((s, i) => s + i.quantity, 0)})</h1>
      </div>

      {/* Shipping Progress */}
      {!shippingFree && (
        <div className="bg-brand-gray-50 border border-brand-gray-200 px-4 py-3 mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">
              Add <span className="font-bold">{formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)}</span> more for free shipping
            </p>
            <span className="text-xs text-brand-gray-400">{Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-brand-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-accent transition-all duration-500"
              style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {shippingFree && (
        <div className="bg-green-50 border border-green-200 px-4 py-3 mb-6 text-sm text-green-700 font-medium">
          🎉 You qualify for free shipping!
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.size}-${item.color.name}`}
              className="flex gap-5 p-4 border border-brand-gray-100 bg-white"
            >
              <div className="relative w-24 sm:w-32 aspect-[3/4] bg-brand-gray-50 shrink-0 overflow-hidden">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-4 mb-2">
                  <div>
                    <Link
                      href={`/product/${item.product.id}`}
                      className="font-semibold text-sm sm:text-base hover:underline"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-brand-gray-400 text-xs sm:text-sm mt-0.5">
                      Size: {item.size} · Color: {item.color.name}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id, item.size, item.color.name)}
                    className="text-brand-gray-300 hover:text-red-500 transition-colors shrink-0"
                    aria-label="Remove"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-brand-gray-200">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.color.name, item.quantity - 1)}
                      className="p-2 hover:bg-brand-gray-50 transition-colors"
                      aria-label="Decrease"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.color.name, item.quantity + 1)}
                      className="p-2 hover:bg-brand-gray-50 transition-colors"
                      aria-label="Increase"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-bold">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-brand-gray-400">
                        {formatPrice(item.product.price)} each
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => { clearCart(); toast.success("Cart cleared"); }}
            className="text-xs text-brand-gray-400 hover:text-red-500 uppercase tracking-wider transition-colors"
          >
            Clear Cart
          </button>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-brand-gray-50 border border-brand-gray-200 p-6 sticky top-24">
            <h2 className="font-semibold uppercase tracking-widest text-sm mb-6">Order Summary</h2>

            {/* Coupon */}
            <div className="mb-6">
              <label className="text-xs uppercase tracking-widest text-brand-gray-500 mb-2 block">Coupon Code</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-2.5 text-sm border border-brand-gray-200 bg-white focus:outline-none focus:border-brand-black transition-colors uppercase"
                  />
                </div>
                <button
                  onClick={applyCoupon}
                  className="btn-secondary text-xs px-4 py-2.5"
                >
                  {appliedCoupon ? "Update" : "Apply"}
                </button>
              </div>
              <div className="flex items-center justify-between gap-3 mt-1">
                <p className="text-xs text-brand-gray-400">Try: STRXEET10</p>
                {appliedCoupon && (
                  <button
                    onClick={() => {
                      setAppliedCoupon(null);
                      setCouponCode("");
                      toast("Coupon removed");
                    }}
                    className="text-xs text-brand-gray-500 hover:text-brand-black transition-colors uppercase tracking-wider"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-3 pb-4 border-b border-brand-gray-200 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-brand-gray-500">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount ({appliedCoupon})</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-brand-gray-500">Shipping</span>
                <span className={shippingFree ? "text-green-600 font-medium" : ""}>
                  {shippingFree ? "FREE" : formatPrice(STANDARD_SHIPPING_COST)}
                </span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <Link
              href={appliedCoupon ? `/checkout?coupon=${appliedCoupon}` : "/checkout"}
              className="btn-primary w-full text-center block mb-3"
            >
              Proceed to Checkout
            </Link>
            <p className="text-xs text-brand-gray-400 text-center">
              Choose cash on delivery or manual payment confirmation at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
