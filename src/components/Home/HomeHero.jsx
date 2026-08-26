"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import HomeHeroBackground from "@/components/Home/HomeHeroBackground";
import { useLocale } from "@/components/LocaleProvider/LocaleProvider";
import { useViewTransition } from "@/hooks/useViewTransition";

import "./HomePage.css";

const DotField = dynamic(() => import("@/components/DotField/DotField"), {
  ssr: false,
  loading: () => null,
});

const heroCopy = {
  en: {
    title: "The Science of Bonding",
    mutedLines: [
      "Decades of formulation expertise, built into every bag.",
      "Consistent performance, batch after batch.",
    ],
    cta: "Book free site visit",
  },
  de: {
    title: "Die Wissenschaft des Haftens",
    mutedLines: [
      "Jahrzehntelange Rezepturkompetenz, in jedem Sack.",
      "Konstante Leistung, Charge für Charge.",
    ],
    cta: "Kostenlosen Standortbesuch buchen",
  },
};

function HomeHeroMutedLine({ lines }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const intervalId = window.setInterval(() => {
      setLineIndex((current) => (current + 1) % lines.length);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <span className="home-hero__line home-hero__line--muted">
        {lines[0]}
        <br />
        {lines[1]}
      </span>
    );
  }

  return (
    <span className="home-hero__line home-hero__line--muted">
      <span className="home-hero__line-rotator" key={lineIndex} aria-live="polite">
        {lines[lineIndex]}
      </span>
    </span>
  );
}

export default function HomeHero() {
  const { locale } = useLocale();
  const copy = heroCopy[locale];
  const { navigateWithTransition } = useViewTransition();

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero__grid" aria-hidden="true">
        <HomeHeroBackground />
      </div>

      <DotField
        className="home-hero__dots"
        attractToCursor
        dotRadius={3}
        dotSpacing={12}
        cursorRadius={420}
        bulgeStrength={42}
        waveAmplitude={0}
        enableGlow={false}
        gradientFrom="rgba(89, 22, 24, 0.28)"
        gradientTo="rgba(141, 48, 52, 0.16)"
      />

      <div className="home-hero__inner">
        <div className="home-hero__copy">
          <h1 id="home-hero-title">
            <span className="home-hero__line home-hero__line--primary">
              {copy.title}
            </span>
            <HomeHeroMutedLine lines={copy.mutedLines} />
          </h1>

          <Link
            href="/connect"
            className="home-hero__cta"
            onClick={(event) => {
              event.preventDefault();
              navigateWithTransition("/connect");
            }}
          >
            {copy.cta} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
