"use client";

import AboutJourney from "@/components/AboutJourney/AboutJourney";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import HomeSustainability from "@/components/Home/HomeSustainability";
import { useLocale } from "@/components/LocaleProvider/LocaleProvider";
import RDIntro from "@/components/RDIntro/RDIntro";

export default function AboutPage() {
  const { locale } = useLocale();
  const intro = locale === "de"
    ? {
        headline: "Über uns",
        actionLabel: "Unsere Geschichte entdecken",
        footerItems: ["Verstehen", "Testen", "Belegen"],
      }
    : {
        headline: "About Us",
        actionLabel: "Explore our story",
        footerItems: ["Understand", "Test", "Prove"],
      };

  return (
    <>
      <RDIntro
        headline={intro.headline}
        actionLabel={intro.actionLabel}
        actionTarget="#about-content"
        footerItems={intro.footerItems}
      />
      <main className="page about">
        <div id="about-content">
          <AboutJourney />
        </div>

        <HomeSustainability />
      </main>
      <ConditionalFooter />
    </>
  );
}
