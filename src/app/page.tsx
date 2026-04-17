import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, RefreshCw, Shield, Star } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import AnnouncementMarquee from "@/components/AnnouncementMarquee";

const featuredProducts = products.filter((p) => p.isBestseller || p.isNew).slice(0, 8);
const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
const topsHero = products.find((p) => p.category === "tops")?.images[0] ?? "";
const bottomsHero =
  products.find((p) => p.category === "bottoms" && p.images[1])?.images[1] ||
  products.find((p) => p.category === "bottoms")?.images[0] ||
  "";
const outerwearHero = products.find((p) => p.category === "outerwear")?.images[0] ?? "";

const collections = [
  {
    title: "TOPS",
    subtitle: "Tees · Hoodies · Shirts",
    href: "/shop?category=tops",
    image: topsHero,
    count: products.filter((p) => p.category === "tops").length,
  },
  {
    title: "BOTTOMS",
    subtitle: "Cargo · Denim · Chinos",
    href: "/shop?category=bottoms",
    image: bottomsHero,
    count: products.filter((p) => p.category === "bottoms").length,
  },
  {
    title: "OUTERWEAR",
    subtitle: "Jackets · Bombers · Windbreakers",
    href: "/shop?category=outerwear",
    image: outerwearHero,
    count: products.filter((p) => p.category === "outerwear").length,
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] bg-brand-black overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
          alt="STRXEET Hero"
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
        />
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 px-6 sm:px-12 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em] mb-4">
              New Collection — SS&apos;25
            </p>
            <h1 className="font-display text-7xl sm:text-9xl lg:text-[120px] text-white leading-none tracking-widest mb-6">
              MADE<br />DIFFERENT.
            </h1>
            <p className="text-white/70 text-base sm:text-lg mb-8 max-w-md">
              Contemporary urban fashion built for the streets. Premium fabrics. Bold silhouettes. No compromises.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="btn-accent">
                Shop Now
              </Link>
              <Link href="/collections" className="btn-secondary border-white text-white hover:bg-white hover:text-brand-black">
                View Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <AnnouncementMarquee />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <h2 className="section-title">Shop By<br />Category</h2>
          <Link href="/shop" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest hover:gap-3 transition-all">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {collections.map((col) => (
            <Link key={col.title} href={col.href} className="group relative overflow-hidden bg-brand-gray-100 aspect-[3/4]">
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-xs font-medium opacity-70 mb-1 tracking-widest uppercase">{col.subtitle}</p>
                <h3 className="font-display text-4xl tracking-widest">{col.title}</h3>
                <p className="text-xs opacity-60 mt-1">{col.count} styles</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-brand-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10 border-b border-white/10 pb-8">
            <div>
              <p className="text-brand-accent text-xs font-bold uppercase tracking-[0.4em] mb-3">
                Just Dropped
              </p>
              <h2 className="font-display text-5xl md:text-7xl tracking-widest text-white uppercase leading-none">
                New<br />Arrivals
              </h2>
            </div>
            <Link href="/shop?sort=newest" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-accent hover:gap-3 transition-all">
              See All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                tone="inverse"
                prioritizeImage={index < 2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Banner */}
      <section className="relative overflow-hidden bg-brand-accent py-24 px-6 text-center">
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-brand-black/60 text-xs font-bold uppercase tracking-[0.3em] mb-4">Limited Drop</p>
          <h2 className="font-display text-6xl sm:text-8xl tracking-widest text-brand-black mb-6 leading-none">
            TOKYO CAPSULE
          </h2>
          <p className="text-brand-black/70 text-base mb-8 max-w-lg mx-auto">
            A 12-piece limited collection inspired by Tokyo street culture. Only 500 pieces. Each numbered.
          </p>
          <Link href="/collections" className="btn-primary">
            Shop The Drop
          </Link>
        </div>
        <div className="absolute -right-20 -bottom-10 font-display text-[200px] text-brand-black/5 leading-none select-none pointer-events-none">
          TKY
        </div>
      </section>

      {/* Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <h2 className="section-title">Best<br />Sellers</h2>
          <Link href="/shop?sort=featured" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest hover:gap-3 transition-all">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.slice(0, 8).map((product, index) => (
            <ProductCard key={product.id} product={product} prioritizeImage={index < 2} />
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-brand-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders above ₹999" },
              { icon: RefreshCw, title: "Easy Returns", desc: "7-day hassle-free returns" },
              { icon: Shield, title: "Secure Payments", desc: "100% safe checkout" },
              { icon: Star, title: "Premium Quality", desc: "Crafted to last" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-brand-black text-white flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="font-semibold text-sm uppercase tracking-wider">{title}</p>
                  <p className="text-brand-gray-500 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="section-title text-center mb-12">What They&apos;re<br />Saying</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Arjun K.",
              handle: "@arjunstreet",
              review: "The Tokyo Hoodie is insane. Quality is top tier. Been wearing it every day for the past week.",
              rating: 5,
            },
            {
              name: "Priya R.",
              handle: "@priyavibes",
              review: "Finally a brand that understands what streetwear should look like. Fast delivery too!",
              rating: 5,
            },
            {
              name: "Rahul M.",
              handle: "@rahulootd",
              review: "Ordered the baggy denim and the co-ord set. Both fit perfectly. Will definitely be buying more.",
              rating: 5,
            },
          ].map((testimonial) => (
            <div key={testimonial.name} className="bg-brand-gray-50 p-6 border border-brand-gray-100">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" className="text-amber-400" />
                ))}
              </div>
              <p className="text-brand-gray-600 text-sm leading-relaxed mb-4">&ldquo;{testimonial.review}&rdquo;</p>
              <div>
                <p className="font-semibold text-sm">{testimonial.name}</p>
                <p className="text-brand-gray-400 text-xs">{testimonial.handle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
