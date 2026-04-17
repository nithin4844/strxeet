"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import { products, categories } from "@/data/products";
import { FilterState, SortOption } from "@/types";
import ProductCard from "@/components/ProductCard";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Best Rated" },
];

const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "38"];

function ShopContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get("category") || "all";
  const query = searchParams.get("q") || "";
  const querySort = searchParams.get("sort");
  const querySizes = useMemo(
    () => searchParams.getAll("size").filter((size) => allSizes.includes(size)),
    [searchParams]
  );
  const querySizesKey = querySizes.join(",");
  const queryMaxPriceValue = Number(searchParams.get("maxPrice"));
  const queryMaxPrice =
    Number.isFinite(queryMaxPriceValue) && queryMaxPriceValue > 0 && queryMaxPriceValue <= 5000
      ? queryMaxPriceValue
      : 5000;
  const initialSort = sortOptions.some((option) => option.value === querySort)
    ? (querySort as SortOption)
    : "featured";

  const [filters, setFilters] = useState<FilterState>({
    category: queryCategory,
    query,
    sizes: querySizes,
    minPrice: 0,
    maxPrice: queryMaxPrice,
    sortBy: initialSort,
  });

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({ categories: true, sizes: true, price: true });

  const toggleSection = (key: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    setFilters({
      category: queryCategory,
      query,
      sizes: querySizesKey ? querySizesKey.split(",") : [],
      minPrice: 0,
      maxPrice: queryMaxPrice,
      sortBy: initialSort,
    });
  }, [initialSort, query, queryCategory, queryMaxPrice, querySizesKey]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.category !== "all") {
      params.set("category", filters.category);
    }

    if (filters.query.trim()) {
      params.set("q", filters.query.trim());
    }

    if (filters.sortBy !== "featured") {
      params.set("sort", filters.sortBy);
    }

    filters.sizes.forEach((size) => params.append("size", size));

    if (filters.maxPrice < 5000) {
      params.set("maxPrice", String(filters.maxPrice));
    }

    const nextQuery = params.toString();
    const currentQuery = searchParams.toString();

    if (nextQuery !== currentQuery) {
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
    }
  }, [filters, pathname, router, searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.query.trim()) {
      const normalizedQuery = filters.query.trim().toLowerCase();
      result = result.filter((product) => {
        const haystack = [
          product.name,
          product.description,
          product.category,
          product.subcategory,
          product.material,
          product.fit,
          ...product.tags,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalizedQuery);
      });
    }

    if (filters.sizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
    }

    result = result.filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice);

    switch (filters.sortBy) {
      case "newest":
        result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        result = result.filter((p) => p.isBestseller).concat(result.filter((p) => !p.isBestseller));
        break;
    }

    return result;
  }, [filters]);

  const activeFilterCount =
    (filters.category !== "all" ? 1 : 0) +
    filters.sizes.length +
    (filters.maxPrice < 5000 ? 1 : 0) +
    (filters.query.trim() ? 1 : 0);

  const clearFilters = () => {
    setFilters({
      category: "all",
      query: "",
      sizes: [],
      minPrice: 0,
      maxPrice: 5000,
      sortBy: "featured",
    });
  };

  const toggleSize = (size: string) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size) ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
    }));
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <button
          onClick={() => toggleSection("categories")}
          className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-widest py-2 border-b border-brand-gray-200"
        >
          Category
          {expandedSections.categories ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {expandedSections.categories && (
          <div className="mt-3 space-y-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilters((prev) => ({ ...prev, category: cat.id }))}
                className={`flex items-center justify-between w-full text-sm py-1 transition-colors ${
                  filters.category === cat.id
                    ? "text-brand-black font-semibold"
                    : "text-brand-gray-500 hover:text-brand-black"
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-xs text-brand-gray-400">{cat.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sizes */}
      <div>
        <button
          onClick={() => toggleSection("sizes")}
          className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-widest py-2 border-b border-brand-gray-200"
        >
          Size
          {expandedSections.sizes ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {expandedSections.sizes && (
          <div className="mt-3 flex flex-wrap gap-2">
            {allSizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                  filters.sizes.includes(size)
                    ? "border-brand-black bg-brand-black text-white"
                    : "border-brand-gray-200 hover:border-brand-black text-brand-gray-600"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price */}
      <div>
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-widest py-2 border-b border-brand-gray-200"
        >
          Price Range
          {expandedSections.price ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {expandedSections.price && (
          <div className="mt-3 space-y-3">
            <div className="flex justify-between text-sm text-brand-gray-500">
              <span>₹{filters.minPrice.toLocaleString("en-IN")}</span>
              <span>₹{filters.maxPrice.toLocaleString("en-IN")}</span>
            </div>
            <input
              type="range"
              min={0}
              max={5000}
              step={100}
              value={filters.maxPrice}
              onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
              className="w-full accent-brand-black"
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="section-title mb-2">
          {filters.category === "all"
            ? "All Products"
            : categories.find((c) => c.id === filters.category)?.name || "Shop"}
        </h1>
        {filters.query.trim() && (
          <p className="text-sm text-brand-gray-500 mb-1">
            Search results for <span className="font-semibold text-brand-black">&ldquo;{filters.query.trim()}&rdquo;</span>
          </p>
        )}
        <p className="text-brand-gray-500 text-sm">{filteredProducts.length} products</p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-brand-gray-200">
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest lg:hidden"
        >
          <SlidersHorizontal size={16} />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-brand-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>

        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-brand-gray-500 hover:text-brand-black uppercase tracking-wider transition-colors"
          >
            <X size={12} /> Clear filters
          </button>
        )}

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-brand-gray-500 uppercase tracking-wider hidden sm:block">Sort:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as SortOption }))}
            className="text-sm border border-brand-gray-200 px-3 py-1.5 bg-white focus:outline-none focus:border-brand-black cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold uppercase tracking-widest">Filters</span>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-brand-gray-400 hover:text-brand-black uppercase tracking-wider transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
            <FilterPanel />
          </div>
        </aside>

        {/* Mobile Filters Overlay */}
        {filtersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setFiltersOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <span className="font-semibold uppercase tracking-widest text-sm">Filters</span>
                <button onClick={() => setFiltersOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <FilterPanel />
              <button
                onClick={() => setFiltersOpen(false)}
                className="btn-primary w-full mt-8"
              >
                Apply ({filteredProducts.length} products)
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-brand-gray-400 text-lg mb-2">No products found</p>
              <p className="text-brand-gray-300 text-sm mb-6">Try adjusting your filters</p>
              <button onClick={clearFilters} className="btn-secondary">
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
