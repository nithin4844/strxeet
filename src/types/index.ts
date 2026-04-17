export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  description: string;
  sizes: string[];
  colors: ProductColor[];
  tags: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviewCount: number;
  material?: string;
  fit?: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface CartItem {
  product: Product;
  size: string;
  color: ProductColor;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: string, color: ProductColor) => void;
  removeItem: (productId: string, size: string, colorName: string) => void;
  updateQuantity: (productId: string, size: string, colorName: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

export type SortOption = "featured" | "newest" | "price-low" | "price-high" | "rating";

export interface FilterState {
  category: string;
  query: string;
  sizes: string[];
  minPrice: number;
  maxPrice: number;
  sortBy: SortOption;
}
