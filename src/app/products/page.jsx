import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import ProductsScrollPage from "@/components/Products/ProductsScrollPage";

export const metadata = {
  title: "Products | Bondure",
  description:
    "Browse Bondure tile adhesives, AAC joining mortars, grouts, screeds, plasters, and tile cleaners with live specifications and filters.",
};

export default function ProductsPage() {
  return (
    <>
      <ProductsScrollPage />
      <ConditionalFooter />
    </>
  );
}
