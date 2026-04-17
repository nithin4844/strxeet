"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <span className="font-semibold uppercase tracking-widest text-sm">
              Cart ({items.reduce((s, i) => s + i.quantity, 0)})
            </span>
          </div>
          <button onClick={closeCart} className="p-1 hover:opacity-60 transition-opacity" aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-brand-gray-200" />
              <p className="text-brand-gray-500 text-sm uppercase tracking-widest">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="btn-secondary text-xs px-6 py-2.5"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color.name}`}
                  className="flex gap-4 py-4 border-b border-brand-gray-100 last:border-0"
                >
                  <div className="relative w-20 h-24 bg-brand-gray-50 shrink-0 overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm leading-tight mb-1 truncate">{item.product.name}</p>
                    <p className="text-brand-gray-400 text-xs mb-1">
                      {item.size} · {item.color.name}
                    </p>
                    <p className="font-bold text-sm mb-3">₹{item.product.price.toLocaleString("en-IN")}</p>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-brand-gray-200">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.color.name, item.quantity - 1)}
                          className="p-1.5 hover:bg-brand-gray-50 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.color.name, item.quantity + 1)}
                          className="p-1.5 hover:bg-brand-gray-50 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id, item.size, item.color.name)}
                        className="text-brand-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-brand-gray-100 px-6 py-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-brand-gray-500 uppercase tracking-wider">Subtotal</span>
              <span className="font-bold text-lg">₹{getTotalPrice().toLocaleString("en-IN")}</span>
            </div>
            <p className="text-xs text-brand-gray-400">Shipping and taxes calculated at checkout</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary w-full text-center block"
            >
              Checkout
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="btn-secondary w-full text-center block"
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
