"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "../LocaleProvider/LocaleProvider";

import "./Spotlight.css";

const experiences = {
  en: [
    {
      eyebrow: "Mobiles Labor",
      title: "The lab on wheels.",
      description: "Our mobile technical unit brings testing, demonstrations, and direct product comparison into the conditions where your team actually works.",
      points: [
        "Live on-site experiments with 100% transparent methods",
        "Competitor product testing, side by side",
        "Immediate observations with practical technical guidance",
      ],
      mediaLabel: "Bondure mobile technical unit",
      image: "/services/mobile-technical-unit.mp4",
      type: "video",
    },
    {
      eyebrow: "Experience Center",
      title: "Visit our experience center.",
      description: "Visit a Bondure Experience Center in your city to explore full application systems, compare finishes, and discuss project conditions with our technical team.",
      points: [
        "Hands-on product and application demonstrations",
        "City locations designed for contractors and project teams",
        "A separate virtual tour for remote project planning",
      ],
      mediaLabel: "Bondure material experience center",
      tourLabel: "Virtual tour of our experience center",
      image: "/services/experience-center.webp",
      type: "image",
    },
  ],
  de: [
    {
      eyebrow: "Lab on Wheels",
      title: "Das Labor auf Rädern.",
      description: "Unsere mobile technische Einheit bringt Prüfungen, Vorführungen und direkte Produktvergleiche dorthin, wo Ihr Team tatsächlich arbeitet.",
      points: [
        "Live-Experimente vor Ort mit vollständig transparenten Methoden",
        "Direkte Vergleichstests mit Wettbewerbsprodukten",
        "Sofortige Erkenntnisse mit praxisnaher technischer Beratung",
      ],
      mediaLabel: "Mobile technische Einheit von Bondure",
      image: "/services/mobile-technical-unit.mp4",
      type: "video",
    },
    {
      eyebrow: "Erlebniszentrum",
      title: "Besuchen Sie unser Erlebniszentrum.",
      description: "Besuchen Sie ein Bondure Erlebniszentrum in Ihrer Stadt, um vollständige Anwendungssysteme zu entdecken, Oberflächen zu vergleichen und Projektbedingungen mit unserem Technik-Team zu besprechen.",
      points: [
        "Praxisnahe Produkt- und Anwendungsvorführungen",
        "Standorte für Handwerksbetriebe und Projektteams",
        "Eine separate virtuelle Tour für die Projektplanung aus der Ferne",
      ],
      mediaLabel: "Bondure Material-Erlebniszentrum",
      tourLabel: "Virtuelle Tour durch unser Erlebniszentrum",
      image: "/services/experience-center.webp",
      type: "image",
    },
  ],
};

export default function Spotlight() {
  const { locale } = useLocale();
  const videoRef = useRef(null);
  const [videoEnabled, setVideoEnabled] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || navigator.connection?.saveData) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVideoEnabled(entry.isIntersecting);
        if (!entry.isIntersecting) video.pause();
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="spotlight" id="experience-center">
      <div className="spotlight-cards">
        {experiences[locale].map((experience, index) => (
          <article
            className={`spotlight-card${index === 1 ? " spotlight-card--reverse" : ""}`}
            key={experience.eyebrow}
          >
            <div className="spotlight-card-media">
              {experience.type === "video" ? (
                <video
                  ref={videoRef}
                  src={videoEnabled ? experience.image : undefined}
                  autoPlay={videoEnabled}
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-label={experience.mediaLabel}
                />
              ) : (
                <img src={experience.image} alt={experience.mediaLabel} />
              )}
              <div className="spotlight-card-shade" />
            </div>

            <div className="spotlight-card-content">
              <p className="spotlight-eyebrow">{experience.eyebrow}</p>
              <h2>{experience.title}</h2>
              <p className="spotlight-description">{experience.description}</p>
              <ul>
                {experience.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {index === 1 && (
                <a className="spotlight-tour-link" href="https://bondure.com/experience" target="_blank" rel="noreferrer">
                  <span className="spotlight-tour-link__icon spotlight-tour-link__icon--360" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 4.5a7.5 7.5 0 1 1-5.3 2.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M6.7 6.7 4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M4.5 12H3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M12 19.5a7.5 7.5 0 1 1 5.3-2.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M17.3 17.3 19.5 19.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M19.5 12H21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <text x="12" y="13.2" textAnchor="middle" fill="currentColor" fontSize="5.5" fontFamily="Manrope, sans-serif" fontWeight="700">360</text>
                    </svg>
                  </span>
                  <span className="spotlight-tour-link__text">{experience.tourLabel}</span>
                  <span className="spotlight-tour-link__icon spotlight-tour-link__icon--arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="m13 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
