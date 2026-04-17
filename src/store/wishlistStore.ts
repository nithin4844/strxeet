import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WishlistStore, Product } from "@/types";

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        if (!get().isWishlisted(product.id)) {
          set({ items: [...get().items, product] });
        }
      },

      removeItem: (productId: string) => {
        set({ items: get().items.filter((p) => p.id !== productId) });
      },

      isWishlisted: (productId: string) => get().items.some((p) => p.id === productId),
    }),
    {
      name: "strxeet-wishlist",
    }
  )
);
