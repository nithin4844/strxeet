import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Us",
  description: "The story behind STRXEET — a contemporary urban fashion brand made in India.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] bg-brand-black overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
          alt="STRXEET brand story"
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">
          <p className="text-brand-accent text-xs font-bold uppercase tracking-[0.4em] mb-4">Our Story</p>
          <h1 className="font-display text-6xl sm:text-8xl tracking-widest">ABOUT STRXEET</h1>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-brand-gray-400 text-xs font-bold uppercase tracking-[0.4em] mb-6">Our Mission</p>
        <h2 className="font-display text-4xl sm:text-6xl tracking-wide text-brand-black mb-8 leading-tight">
          FASHION THAT BELONGS ON THE STREETS
        </h2>
        <p className="text-brand-gray-500 text-base sm:text-lg leading-relaxed">
          STRXEET was born in 2020 from a simple belief: Indian streetwear deserved to be world-class. We
          started in a garage in Bengaluru with three graphic tees and a vision. Today we&apos;re a full
          collection of contemporary urban clothing — designed, crafted, and shipped from India to the world.
        </p>
      </section>

      {/* Values */}
      <section className="bg-brand-black py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-5xl text-white tracking-widest text-center mb-14">WHAT WE STAND FOR</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                title: "Quality First",
                desc: "We spend months sourcing the right fabrics, testing fits, and perfecting every detail before a product ever ships.",
              },
              {
                title: "Made in India",
                desc: "Every piece is designed and manufactured in India by skilled artisans. We&apos;re proud of our roots.",
              },
              {
                title: "Sustainable Future",
                desc: "We&apos;re committed to reducing our environmental footprint with responsible sourcing and minimal packaging.",
              },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <div className="w-1 h-8 bg-brand-accent mx-auto mb-5" />
                <h3 className="font-display text-2xl tracking-widest text-white mb-3">{v.title}</h3>
                <p
                  className="text-brand-gray-400 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: v.desc }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-20 bg-brand-accent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Orders Shipped" },
              { number: "120+", label: "Products" },
              { number: "4.8★", label: "Average Rating" },
              { number: "2020", label: "Founded" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-5xl sm:text-6xl tracking-wider text-brand-black mb-1">
                  {stat.number}
                </p>
                <p className="text-brand-black/60 text-xs uppercase tracking-widest font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="section-title text-center mb-12">The Team</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { name: "Aditya Sharma", role: "Founder & Creative Director", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80" },
            { name: "Kavya Nair", role: "Head of Design", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
            { name: "Rohit Mehta", role: "Head of Operations", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
          ].map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4 overflow-hidden rounded-full bg-brand-gray-100">
                <Image src={member.img} alt={member.name} fill className="object-cover" sizes="160px" />
              </div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-brand-gray-500 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-black py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-5xl text-white tracking-widest mb-4">JOIN THE MOVEMENT</h2>
          <p className="text-brand-gray-400 mb-8">Shop the latest collection and wear the streets.</p>
          <Link href="/shop" className="btn-accent inline-flex items-center gap-2">
            Shop Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
