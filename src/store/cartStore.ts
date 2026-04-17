import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartStore, CartItem, Product, ProductColor } from "@/types";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, size: string, color: ProductColor) => {
        if (!product.inStock) {
          return;
        }

        const items = get().items;
        const existingIndex = items.findIndex(
          (item) => item.product.id === product.id && item.size === size && item.color.name === color.name
        );

        if (existingIndex >= 0) {
          const updatedItems = [...items];
          updatedItems[existingIndex].quantity += 1;
          set({ items: updatedItems, isOpen: true });
        } else {
          set({ items: [...items, { product, size, color, quantity: 1 }], isOpen: true });
        }
      },

      removeItem: (productId: string, size: string, colorName: string) => {
        set({
          items: get().items.filter(
            (item) => !(item.product.id === productId && item.size === size && item.color.name === colorName)
          ),
        });
      },

      updateQuantity: (productId: string, size: string, colorName: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, colorName);
          return;
        }
        const updatedItems = get().items.map((item) =>
          item.product.id === productId && item.size === size && item.color.name === colorName
            ? { ...item, quantity }
            : item
        );
        set({ items: updatedItems });
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    }),
    {
      name: "strxeet-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
