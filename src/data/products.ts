import { Product } from "@/types";

const unsplashShot = (id: string, view: "primary" | "detail" = "primary") =>
  `https://images.unsplash.com/photo-${id}?auto=format&q=80&w=900&h=1200&fit=crop${
    view === "primary"
      ? "&crop=faces,entropy"
      : "&crop=focalpoint&fp-x=0.52&fp-y=0.32&fp-z=1.2"
  }`;

const pexelsShot = (id: string, view: "primary" | "detail" = "primary") =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${
    view === "primary" ? 900 : 720
  }&h=1200&fit=crop`;

export const products: Product[] = [
  {
    id: "p001",
    name: "Oversized Acid Wash Tee",
    price: 899,
    originalPrice: 1499,
    images: [
      unsplashShot("1583743814966-8936f5b7be1a"),
      unsplashShot("1583743814966-8936f5b7be1a", "detail"),
    ],
    category: "tops",
    subcategory: "t-shirts",
    description:
      "The ultimate street-ready tee. Crafted from 100% premium cotton with an oversized silhouette and unique acid wash finish. Pair with cargo pants or your favorite denim for that effortless drop.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Washed Black", hex: "#2D2D2D" },
      { name: "Vintage White", hex: "#F5F0E8" },
      { name: "Stone Blue", hex: "#6B8CAE" },
    ],
    tags: ["oversized", "streetwear", "acid-wash", "cotton"],
    inStock: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 234,
    material: "100% Cotton",
    fit: "Oversized",
  },
  {
    id: "p002",
    name: "Tokyo Graphic Hoodie",
    price: 1799,
    originalPrice: 2499,
    images: [
      pexelsShot("15923882"),
      pexelsShot("15923882", "detail"),
    ],
    category: "tops",
    subcategory: "hoodies",
    description:
      "Inspired by Tokyo street culture. Heavy 400 GSM fleece, dropped shoulders, and our signature Tokyo graphic embroidered on the chest. Built for the cold, styled for the streets.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Jet Black", hex: "#0A0A0A" },
      { name: "Charcoal", hex: "#3C3C3C" },
      { name: "Cream", hex: "#FFFDD0" },
    ],
    tags: ["hoodie", "graphic", "streetwear", "fleece"],
    inStock: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 521,
    material: "400 GSM Fleece",
    fit: "Relaxed",
  },
  {
    id: "p003",
    name: "Cargo Jogger Pants",
    price: 1599,
    images: [
      pexelsShot("21050246"),
      pexelsShot("21050246", "detail"),
    ],
    category: "bottoms",
    subcategory: "pants",
    description:
      "Six-pocket cargo joggers with tapered fit. Elastic waistband with drawstring, zip pockets, and reinforced cargo pockets. The everyday essential reimagined.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Olive", hex: "#556B2F" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Khaki", hex: "#C3B091" },
    ],
    tags: ["cargo", "jogger", "pants", "utility", "streetwear"],
    inStock: true,
    isNew: true,
    rating: 4.7,
    reviewCount: 189,
    material: "98% Cotton 2% Elastane",
    fit: "Tapered",
  },
  {
    id: "p004",
    name: "Vintage Wash Denim Jacket",
    price: 2799,
    originalPrice: 3999,
    images: [
      unsplashShot("1551537482-f2075a1d41f2"),
      unsplashShot("1551537482-f2075a1d41f2", "detail"),
    ],
    category: "outerwear",
    subcategory: "jackets",
    description:
      "A timeless silhouette with a raw edge. Our vintage wash denim jacket features custom tonal stitching, horn buttons, and a lived-in wash that only gets better with time.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Light Wash", hex: "#A8C0D4" },
      { name: "Dark Wash", hex: "#2B4D6F" },
    ],
    tags: ["denim", "jacket", "vintage", "outerwear", "streetwear"],
    inStock: true,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 302,
    material: "100% Denim Cotton",
    fit: "Regular",
  },
  {
    id: "p005",
    name: "Essential Boxy Polo",
    price: 999,
    images: [
      unsplashShot("1586363104862-3a5e2ab60d99"),
      unsplashShot("1586363104862-3a5e2ab60d99", "detail"),
    ],
    category: "tops",
    subcategory: "polo",
    description:
      "The modern polo, redesigned. Boxy fit, dropped shoulders, and ribbed collar in our signature pique fabric. Goes from gym to street in seconds.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Forest Green", hex: "#355E3B" },
      { name: "Navy", hex: "#001F5B" },
    ],
    tags: ["polo", "boxy", "casual", "pique", "summer"],
    inStock: true,
    rating: 4.6,
    reviewCount: 167,
    material: "Pique Cotton",
    fit: "Boxy",
  },
  {
    id: "p006",
    name: "Slim Fit Chino",
    price: 1499,
    images: [
      unsplashShot("1541099649105-f69ad21f3246"),
      unsplashShot("1541099649105-f69ad21f3246", "detail"),
    ],
    category: "bottoms",
    subcategory: "chinos",
    description:
      "Sharp. Sleek. Streetwear-ready. Our slim chino is cut from stretch cotton twill for all-day comfort. Four-pocket construction, tapered leg, and hidden security pocket.",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: [
      { name: "Sand", hex: "#C2B280" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Navy", hex: "#001F5B" },
    ],
    tags: ["chino", "slim-fit", "smart-casual", "utility"],
    inStock: true,
    rating: 4.5,
    reviewCount: 143,
    material: "97% Cotton 3% Elastane",
    fit: "Slim",
  },
  {
    id: "p007",
    name: "Coach Windbreaker",
    price: 2199,
    originalPrice: 2999,
    images: [
      unsplashShot("1544923246-77307dd654cb"),
      unsplashShot("1544923246-77307dd654cb", "detail"),
    ],
    category: "outerwear",
    subcategory: "jackets",
    description:
      "Lightweight coach jacket in water-resistant ripstop nylon. Full-zip, side pockets, and packable design. Your go-to layer for transitional weather.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#0A0A0A" },
      { name: "Olive", hex: "#4A5240" },
      { name: "Burgundy", hex: "#722F37" },
    ],
    tags: ["windbreaker", "jacket", "nylon", "packable", "utility", "streetwear"],
    inStock: true,
    isNew: true,
    rating: 4.7,
    reviewCount: 98,
    material: "100% Ripstop Nylon",
    fit: "Regular",
  },
  {
    id: "p008",
    name: "Printed Shirt – Batik Wave",
    price: 1299,
    images: [
      unsplashShot("1596755094514-f87e34085b2c"),
      unsplashShot("1596755094514-f87e34085b2c", "detail"),
    ],
    category: "tops",
    subcategory: "shirts",
    description:
      "All-over batik wave print on our signature satin-finish fabric. Cuban collar, relaxed fit, and coconut shell buttons. Make a statement without saying a word.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Multi/Blue", hex: "#4A90D9" },
      { name: "Multi/Black", hex: "#1A1A1A" },
    ],
    tags: ["printed", "batik", "shirt", "cuban-collar", "summer"],
    inStock: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 445,
    material: "Satin Polyester",
    fit: "Relaxed",
  },
  {
    id: "p009",
    name: "Ribbed Muscle Tee",
    price: 699,
    images: [
      unsplashShot("1503342217505-b0a15ec3261c"),
      unsplashShot("1503342217505-b0a15ec3261c", "detail"),
    ],
    category: "tops",
    subcategory: "t-shirts",
    description:
      "Second-skin fit ribbed muscle tee. 180 GSM, 4-way stretch fabric keeps you locked in during workouts or while you're out. Layer it, live in it.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Grey Melange", hex: "#9E9E9E" },
      { name: "Caramel", hex: "#C68642" },
    ],
    tags: ["muscle-tee", "ribbed", "fitted", "stretch", "summer"],
    inStock: true,
    rating: 4.6,
    reviewCount: 278,
    material: "180 GSM Stretch Cotton",
    fit: "Slim",
  },
  {
    id: "p010",
    name: "Baggy Skater Denim",
    price: 1999,
    originalPrice: 2799,
    images: [
      unsplashShot("1542272604-787c3835535d"),
      unsplashShot("1542272604-787c3835535d", "detail"),
    ],
    category: "bottoms",
    subcategory: "denim",
    description:
      "Wide leg, low-rise, maximum attitude. Our baggy skater denim features distressed detailing, raw hem, and authentic 5-pocket construction. The jeans that started the movement.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Light Wash", hex: "#BCCFE8" },
      { name: "Black Wash", hex: "#2A2A2A" },
    ],
    tags: ["baggy", "denim", "skater", "wide-leg", "streetwear", "utility"],
    inStock: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 356,
    material: "100% Denim",
    fit: "Baggy",
  },
  {
    id: "p011",
    name: "Bomber Jacket – MA-1",
    price: 3499,
    images: [
      unsplashShot("1520975954732-35dd22299614"),
      unsplashShot("1520975954732-35dd22299614", "detail"),
    ],
    category: "outerwear",
    subcategory: "jackets",
    description:
      "The iconic MA-1 silhouette reinterpreted for street wear. Satin shell, ribbed cuffs and hem, reversible design with a bright orange lining. Our most iconic outerwear piece.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black/Orange", hex: "#1A1A1A" },
      { name: "Sage/Tan", hex: "#8FAB7E" },
    ],
    tags: ["bomber", "MA-1", "satin", "reversible"],
    inStock: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 612,
    material: "Satin Polyester",
    fit: "Regular",
  },
  {
    id: "p012",
    name: "Co-ord Set – Linen",
    price: 2499,
    originalPrice: 3299,
    images: [
      unsplashShot("1490114538077-0a7f8cb49891"),
      unsplashShot("1490114538077-0a7f8cb49891", "detail"),
    ],
    category: "sets",
    subcategory: "co-ords",
    description:
      "Summer-ready linen co-ord set. The relaxed shirt and shorts are cut from the same fabric for a clean, put-together look. Breathable, lightweight, perfect for every occasion.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Off White", hex: "#F8F4E3" },
      { name: "Sky Blue", hex: "#87CEEB" },
      { name: "Terracotta", hex: "#C15F3C" },
    ],
    tags: ["co-ord", "linen", "set", "summer"],
    inStock: true,
    isNew: true,
    rating: 4.7,
    reviewCount: 89,
    material: "100% Linen",
    fit: "Relaxed",
  },
];

export const categories = [
  { id: "all", name: "All", count: products.length },
  { id: "tops", name: "Tops", count: products.filter((p) => p.category === "tops").length },
  { id: "bottoms", name: "Bottoms", count: products.filter((p) => p.category === "bottoms").length },
  { id: "outerwear", name: "Outerwear", count: products.filter((p) => p.category === "outerwear").length },
  { id: "sets", name: "Sets", count: products.filter((p) => p.category === "sets").length },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);

export const getRelatedProducts = (product: Product, limit = 4) =>
  products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category ||
          p.tags.some((t) => product.tags.includes(t)))
    )
    .slice(0, limit);
