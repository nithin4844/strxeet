export default function AnnouncementMarquee() {
  const items = [
    "FREE SHIPPING ABOVE ₹999",
    "NEW DROP — TOKYO CAPSULE",
    "USE CODE STRXEET10 FOR 10% OFF",
    "EASY 7-DAY RETURNS",
    "MADE IN INDIA 🇮🇳",
    "PREMIUM QUALITY FABRICS",
  ];

  return (
    <div className="bg-brand-accent text-brand-black overflow-hidden py-2.5">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center font-bold text-xs uppercase tracking-widest">
            {item}
            <span className="mx-6 text-brand-black/30">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}
