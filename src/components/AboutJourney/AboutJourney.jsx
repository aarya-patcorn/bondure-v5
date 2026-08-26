"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "@/components/LocaleProvider/LocaleProvider";

import "./AboutJourney.css";

gsap.registerPlugin(ScrollTrigger);

const milestoneMedia = [
  {
    period: "1963–1969",
    image: "/about-history/1963-laboratory.webp",
    position: "48% center",
  },
  {
    period: "1970–1978",
    image: "/about-history/1971-product.webp",
    position: "50% center",
  },
  {
    period: "1980–1989",
    image: "/about-history/1984-production.webp",
    position: "50% center",
  },
  {
    period: "1990–2005",
    image: "/about-history/1998-site.webp",
    position: "center",
  },
  {
    period: "2006–Today",
    image: "/about-history/2012-research.webp",
    position: "center",
  },
];

const journeyCopy = {
  en: {
    title: "Our Story",
    periods: ["1963–1969", "1970–1978", "1980–1989", "1990–2005", "2006–Today"],
    headings: [
      "The first inquiry",
      "The first formulations",
      "From bench to batch",
      "The site became part of the lab",
      "Evidence at every scale",
    ],
    descriptions: [
      <>In a small materials room, the work began with powder, water, heat, and patience. The first studies asked why apparently similar mixes behaved differently once they met a real surface. This was the beginning of a lasting principle: <strong>look beneath the finish and understand the bond.</strong></>,
      <>Early liquid modifiers and bonding trials were kept in whatever the laboratory could preserve: glass bottles, metal tins, handwritten batches. Color entered the archive slowly, alongside the first repeatable recipes and the realization that <strong>chemistry could make application more reliable.</strong></>,
      <>The challenge changed from making one successful sample to making the same material consistently. Better process control connected the laboratory to production, while every batch carried forward the discipline of its original test. <strong>Manufacturing became part of the research method.</strong></>,
      <>Scale exposed what controlled rooms could not: weather, sequencing, workmanship, and substrates that changed from one floor to the next. Field observation moved upstream into development, joining technical support and formulation in <strong>one continuous feedback loop.</strong></>,
      <>Research now moves between microscopic behavior and full-scale application. Digital records sharpen the comparison, but the essential method remains unchanged: question the condition, test the material, and <strong>prove performance where the work actually happens.</strong></>,
    ],
    alts: [
      "Black and white photograph of a scientist working among laboratory bottles in 1960",
      "Vintage photograph of three workers standing outside a rustic stone farmhouse",
      "Vintage Bondure adhesive waste canisters in a production store",
      "Construction team reviewing work across a large concrete structure",
      "Laboratory pipette dispensing a sample into a tray of test vessels",
    ],
    outroLabel: "What remains unchanged",
    outro: "Understand the condition. Test the material. Prove the result.",
  },
  de: {
    title: "Unsere Geschichte",
    periods: ["1963–1969", "1970–1978", "1980–1989", "1990–2005", "2006–Heute"],
    headings: [
      "Die erste Fragestellung",
      "Die ersten Rezepturen",
      "Vom Labortisch zur Charge",
      "Die Baustelle wurde Teil des Labors",
      "Belege in jedem Maßstab",
    ],
    descriptions: [
      <>In einem kleinen Materialraum begann die Arbeit mit Pulver, Wasser, Wärme und Geduld. Die ersten Studien untersuchten, warum sich scheinbar ähnliche Mischungen auf einer realen Oberfläche unterschiedlich verhielten. Dies war der Anfang eines dauerhaften Prinzips: <strong>unter die Oberfläche blicken und die Haftung verstehen.</strong></>,
      <>Frühe flüssige Modifikatoren und Haftversuche wurden in allem aufbewahrt, was das Labor erhalten konnte: Glasflaschen, Metalldosen und handschriftlich dokumentierte Chargen. Farbe hielt langsam Einzug ins Archiv, zusammen mit den ersten reproduzierbaren Rezepturen und der Erkenntnis, dass <strong>Chemie die Anwendung zuverlässiger machen kann.</strong></>,
      <>Die Herausforderung verlagerte sich von einer einzelnen erfolgreichen Probe auf die gleichbleibende Herstellung desselben Materials. Eine bessere Prozesskontrolle verband Labor und Produktion, während jede Charge die Disziplin ihres ursprünglichen Tests fortführte. <strong>Die Fertigung wurde Teil der Forschungsmethode.</strong></>,
      <>Der größere Maßstab zeigte, was kontrollierte Räume nicht abbilden konnten: Wetter, Arbeitsabläufe, handwerkliche Ausführung und Untergründe, die sich von Etage zu Etage änderten. Beobachtungen vor Ort flossen frühzeitig in die Entwicklung ein und verbanden technischen Support und Rezepturentwicklung zu <strong>einer kontinuierlichen Rückkopplung.</strong></>,
      <>Die Forschung bewegt sich heute zwischen mikroskopischem Verhalten und großflächiger Anwendung. Digitale Aufzeichnungen präzisieren den Vergleich, doch die grundlegende Methode bleibt unverändert: Bedingungen hinterfragen, Material testen und <strong>die Leistung dort belegen, wo die Arbeit tatsächlich stattfindet.</strong></>,
    ],
    alts: [
      "Schwarz-Weiß-Fotografie eines Wissenschaftlers zwischen Laborflaschen im Jahr 1960",
      "Historische Fotografie von drei Arbeitern vor einem rustikalen Bauernhaus aus Stein",
      "Historische Bondure Klebstoffbehälter in einem Produktionslager",
      "Bauteam bei der Begutachtung einer großen Betonkonstruktion",
      "Laborpipette gibt eine Probe in eine Schale mit Testgefäßen",
    ],
    outroLabel: "Was unverändert bleibt",
    outro: "Bedingungen verstehen. Material testen. Ergebnis belegen.",
  },
};

export default function AboutJourney() {
  const { locale } = useLocale();
  const copy = journeyCopy[locale];
  const sectionRef = useRef(null);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const images = gsap.utils.toArray(".history-entry__image img");

      images.forEach((image) => {
        gsap.fromTo(
          image,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: image.closest("figure"),
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      });
    });

    return () => media.revert();
  }, { scope: sectionRef });

  return (
    <section className="history" ref={sectionRef} aria-labelledby="history-title">
      <header className="history__intro">
        <figure className="history__intro-map" aria-hidden="true">
          <img
            src="/about-story/europe-map.svg"
            alt=""
            width={754}
            height={543}
            decoding="async"
          />
        </figure>
      </header>

      <div className="history__timeline">
        {milestoneMedia.map((milestone, index) => (
          <article
            className={`history-entry ${index % 2 === 0 ? "history-entry--left" : "history-entry--right"}`}
            key={milestone.period}
          >
            {index === 0 ? (
              <h2 id="history-title" className="history__title">
                <span className="history__title-flag" aria-hidden="true">
                  <svg viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <rect width="5" height="1" y="0" fill="#000" />
                    <rect width="5" height="1" y="1" fill="#DD0000" />
                    <rect width="5" height="1" y="2" fill="#FFCE00" />
                  </svg>
                </span>
                {copy.title}
              </h2>
            ) : null}

            <div className="history-entry__axis" aria-hidden="true">
              <i />
            </div>

            <p className="history-entry__period">{copy.periods[index]}</p>

            <figure className="history-entry__image">
              <div className="history-entry__image-frame">
                <img
                  src={milestone.image}
                  alt={copy.alts[index]}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  style={{ objectPosition: milestone.position }}
                />
              </div>
            </figure>

            <div className="history-entry__heading">
              <h2>{copy.headings[index]}</h2>
            </div>

            <div className="history-entry__card">
              <p>{copy.descriptions[index]}</p>
            </div>
          </article>
        ))}
      </div>

      <footer className="history__outro">
        <span>{copy.outroLabel}</span>
        <p>{copy.outro}</p>
      </footer>
    </section>
  );
}
