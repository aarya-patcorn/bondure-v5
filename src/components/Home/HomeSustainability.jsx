"use client";

import { useLocale } from "@/components/LocaleProvider/LocaleProvider";
import "./HomePage.css";

const sustainabilityCopy = {
  en: {
    title: "Sustainability built to perform. Designed to use less.",
    pillars: [
      ["Measure what matters", "We are building a clearer picture of product and operational impact so progress can be tracked and explained."],
      ["Make every mix count", "Reliable application helps reduce avoidable rework, material loss and premature replacement on working sites."],
      ["Choose better inputs", "We continue to assess raw materials, packaging and energy choices that lower impact without compromising site performance."],
    ],
  },
  de: {
    title: "Nachhaltigkeit, die Leistung bringt. Entwickelt für weniger Verbrauch.",
    pillars: [
      ["Messen, was zählt", "Wir schaffen ein klareres Bild der Auswirkungen von Produkten und Abläufen, damit Fortschritte verfolgt und erklärt werden können."],
      ["Jede Mischung zählt", "Eine zuverlässige Anwendung hilft, vermeidbare Nacharbeit, Materialverluste und vorzeitigen Austausch auf Baustellen zu reduzieren."],
      ["Bessere Rohstoffe wählen", "Wir bewerten weiterhin Rohstoffe, Verpackungen und Energieoptionen, die die Auswirkungen senken, ohne die Leistung auf der Baustelle zu beeinträchtigen."],
    ],
  },
};

export default function HomeSustainability() {
  const { locale } = useLocale();
  const copy = sustainabilityCopy[locale];

  return (
    <section className="home-sustainability" aria-labelledby="sustainability-title">
      <div className="home-sustainability__inner">
        <div className="home-sustainability__intro">
          <h2 id="sustainability-title">{copy.title}</h2>
        </div>

        <div className="home-sustainability__pillars">
          <article className="home-sustainability__pillar home-sustainability__pillar--measure">
            <div className="home-sustainability__illustration home-sustainability__illustration--photo" aria-hidden="true">
              <img
                src="/home-media/sustainability-measure.webp"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <div className="home-sustainability__illustration-shade" aria-hidden="true" />
            </div>
            <h3>{copy.pillars[0][0]}</h3>
            <p>{copy.pillars[0][1]}</p>
          </article>

          <article className="home-sustainability__pillar home-sustainability__pillar--mix">
            <div className="home-sustainability__illustration home-sustainability__illustration--photo" aria-hidden="true">
              <img
                src="/home-media/sustainability-mix.webp"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <div className="home-sustainability__illustration-shade" aria-hidden="true" />
            </div>
            <h3>{copy.pillars[1][0]}</h3>
            <p>{copy.pillars[1][1]}</p>
          </article>

          <article className="home-sustainability__pillar home-sustainability__pillar--inputs">
            <div className="home-sustainability__illustration home-sustainability__illustration--photo" aria-hidden="true">
              <img
                src="/home-media/sustainability-inputs.webp"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <div className="home-sustainability__illustration-shade" aria-hidden="true" />
            </div>
            <h3>{copy.pillars[2][0]}</h3>
            <p>{copy.pillars[2][1]}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
