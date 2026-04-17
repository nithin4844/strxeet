import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts, products } from "@/data/products";
import ProductDetailClient from "@/components/ProductDetailClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://strxeet.com";

interface ProductPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProductById(params.id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | STRXEET`,
      description: product.description,
      type: "website",
      images: [
        {
          url: product.images[0],
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | STRXEET`,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "STRXEET",
    },
    offers: {
      "@type": "Offer",
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      priceCurrency: "INR",
      price: product.price,
      url: `${SITE_URL}/product/${product.id}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} related={related} />
    </>
  );
}
