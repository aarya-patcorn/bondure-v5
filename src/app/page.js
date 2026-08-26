import { preload } from "react-dom";

import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import HomeGallery from "@/components/Home/HomeGallery";
import HomeHero from "@/components/Home/HomeHero";
import HomeStaticSections from "@/components/Home/HomeStaticSections";
import HomeStickyScroll from "@/components/Home/HomeStickyScroll";
import HomeSustainability from "@/components/Home/HomeSustainability";

import "@/components/Home/HomePage.css";

export default function Home() {
  preload("/optimized/home/hero-poster.webp", {
    as: "image",
    fetchPriority: "high",
  });

  return (
    <main className="home-page">
      <HomeHero />
      <HomeGallery />
      <HomeStaticSections />
      <HomeStickyScroll />
      <HomeSustainability />
      <ConditionalFooter />
    </main>
  );
}
