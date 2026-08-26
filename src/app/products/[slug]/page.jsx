import { notFound } from "next/navigation";

import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import ProductDetailPage from "@/components/Products/ProductDetailPage";
import { getAllProductSlugs, getProductBySlug } from "@/lib/products-data";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found | Bondure" };
  }

  return {
    title: `${product.title} | Bondure`,
    description: product.description,
  };
}

export default async function ProductDetailRoute({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductDetailPage product={product} />
      <ConditionalFooter />
    </>
  );
}
