import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import ToolsPage from "@/components/Tools/ToolsPage";

export const metadata = {
  title: "Tools | Bondure",
  description:
    "Coverage and yield estimators for tile adhesive, AAC joining, grout, floor screed, plaster, and tile cleaner, plus a product recommender.",
};

export default function Page() {
  return (
    <>
      <ToolsPage />
      <ConditionalFooter />
    </>
  );
}
