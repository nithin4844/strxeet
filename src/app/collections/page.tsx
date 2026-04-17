import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Collections",
  description: "Shop STRXEET collections — exclusive drops and curated edits.",
};

const collections = [
  {
    id: "tokyo",
    title: "Tokyo Capsule",
    subtitle: "Limited Edition • SS'25",
    description: "12 pieces. 500 units each. Inspired by Tokyo's Harajuku district. Drop your basics.",
    image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=1200&q=80",
    tag: "limited",
    products: products.filter((p) => p.tags.includes("streetwear")).slice(0, 4),
  },
  {
    id: "utility",
    title: "Utility Series",
    subtitle: "Everyday Essentials",
    description: "Built for movement. Cargo pockets, technical fabrics, tactical silhouettes.",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=1200&q=80",
    tag: "new",
    products: products.filter((p) => p.tags.includes("cargo") || p.tags.includes("utility")).slice(0, 4),
  },
  {
    id: "summer",
    title: "Summer Edit",
    subtitle: "Lightweight Collection",
    description: "Breathable fabrics, loose silhouettes. Made for the heat.",
    image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1200&q=80",
    tag: "bestseller",
    products: products.filter((p) => p.tags.includes("linen") || p.tags.includes("summer")).slice(0, 4),
  },
];

export default function CollectionsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-black py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-brand-accent text-xs font-bold uppercase tracking-[0.4em] mb-4">Shop</p>
          <h1 className="font-display text-7xl sm:text-9xl text-white tracking-widest mb-4">COLLECTIONS</h1>
          <p className="text-brand-gray-400">Curated drops. Exclusive edits. Limited runs.</p>
        </div>
      </section>

      {/* Collections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {collections.map((col, i) => (
          <section key={col.id}>
            {/* Collection Header */}
            <div className={`grid lg:grid-cols-2 gap-8 items-center mb-10 ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
              <div className={`relative h-80 overflow-hidden bg-brand-gray-100 ${i % 2 !== 0 ? "lg:order-2" : ""}`}>
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 ${
                    col.tag === "limited" ? "bg-red-500 text-white" :
                    col.tag === "new" ? "bg-brand-accent text-brand-black" :
                    "bg-brand-black text-white"
                  }`}>
                    {col.tag === "limited" ? "Limited Drop" : col.tag === "new" ? "New" : "Bestseller"}
                  </span>
                </div>
              </div>

              <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gray-400 mb-2">
                  {col.subtitle}
                </p>
                <h2 className="font-display text-5xl sm:text-6xl tracking-widest mb-4">{col.title}</h2>
                <p className="text-brand-gray-500 leading-relaxed mb-6">{col.description}</p>
                <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
                  Shop Collection <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Products */}
            {col.products.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {col.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
