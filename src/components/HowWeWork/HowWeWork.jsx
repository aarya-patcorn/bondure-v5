"use client";
import "./HowWeWork.css";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "../Copy/Copy";
import { useLocale } from "../LocaleProvider/LocaleProvider";

gsap.registerPlugin(ScrollTrigger);

const copy = {
  en: {
    heading: "How our technical support team can help you.",
    stagesLabel: "Bondure process stages",
    stageLabels: ["Assess", "Balance", "Refine", "Support"],
    supportStages: [
      "We start by understanding the substrate, application, and site conditions before recommending a practical system.",
      "We help balance product performance with the working time, coverage, and control your team needs on site.",
      "We review the installation process with your team and turn observations into clear improvements for the next application.",
      "We stay available from preparation through finishing, so your team can apply the system with confidence.",
    ],
    cards: [
      {
        title: "Need / Application",
        description: "We assess substrate, application, and working conditions early to define handling, finish, and performance requirements clearly.",
        alt: "Bondure technical team reviewing application conditions on site",
      },
      {
        title: "Formula / Balance",
        description: "We balance adhesion, workability, and control so every formulation supports its intended application and process reliably.",
        alt: "Worker applying tile adhesive with a notched trowel",
      },
      {
        title: "Review / Refinement",
        description: "We review mixing, placement, coverage, and finish together, using practical feedback to refine product handling continuously.",
        alt: "Floor leveling and screed application",
      },
      {
        title: "Supply / Support",
        description: "We provide clear product guidance from preparation through finishing, helping site teams work consistently and confidently.",
        alt: "AAC block masonry and jointing work",
      },
    ],
  },
  de: {
    heading: "So unterstützt Sie unser Technik-Team.",
    stagesLabel: "Prozessphasen von Bondure",
    stageLabels: ["Bewerten", "Abstimmen", "Optimieren", "Unterstützen"],
    supportStages: [
      "Wir analysieren zunächst Untergrund, Anwendung und Baustellenbedingungen, bevor wir ein praxistaugliches System empfehlen.",
      "Wir stimmen die Produktleistung auf Verarbeitungszeit, Ergiebigkeit und Kontrolle ab, die Ihr Team vor Ort benötigt.",
      "Wir prüfen den Ausführungsprozess mit Ihrem Team und leiten aus den Beobachtungen klare Verbesserungen für die nächste Anwendung ab.",
      "Wir bleiben von der Vorbereitung bis zur Fertigstellung erreichbar, damit Ihr Team das System sicher anwenden kann.",
    ],
    cards: [
      {
        title: "Bedarf / Anwendung",
        description: "Wir bewerten Untergrund, Anwendung und Arbeitsbedingungen frühzeitig, um Anforderungen an Verarbeitung, Oberfläche und Leistung klar zu definieren.",
        alt: "Technik-Team von Bondure prüft die Anwendungsbedingungen vor Ort",
      },
      {
        title: "Formulierung / Abstimmung",
        description: "Wir stimmen Haftung, Verarbeitbarkeit und Kontrolle so ab, dass jede Formulierung ihre vorgesehene Anwendung und den Prozess zuverlässig unterstützt.",
        alt: "Fachkraft trägt Fliesenkleber mit einer Zahnkelle auf",
      },
      {
        title: "Prüfung / Optimierung",
        description: "Wir prüfen Mischung, Einbau, Ergiebigkeit und Oberfläche gemeinsam und optimieren die Verarbeitung anhand praktischer Rückmeldungen kontinuierlich.",
        alt: "Bodennivellierung und Estrichauftrag",
      },
      {
        title: "Lieferung / Support",
        description: "Wir geben klare Produkthinweise von der Vorbereitung bis zur Fertigstellung und helfen Baustellenteams, gleichmäßig und sicher zu arbeiten.",
        alt: "Mauerwerk und Verfugung mit Porenbetonsteinen",
      },
    ],
  },
};

const cardImages = [
  "/media/Servicesreviewsite.webp",
  "/spotlight/spotlight-img-2.webp",
  "/how-we-work/process-3.webp",
  "/how-we-work/process-4.webp",
];

const HowWeWork = () => {
  const { locale } = useLocale();
  const content = copy[locale];
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollTriggersRef = useRef([]);

  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 1000);
  };

  useEffect(() => {
    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!container || !header || !cards) return;

    if (!isMobile) {
      const mainTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        endTrigger: cards,
        end: "bottom bottom",
        pin: header,
        pinSpacing: false,
      });
      scrollTriggersRef.current.push(mainTrigger);

      const cardElements = cards.querySelectorAll(".how-we-work-card");
      cardElements.forEach((card, index) => {
        const cardTrigger = ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        });
        scrollTriggersRef.current.push(cardTrigger);
      });

    }

    return () => {
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, [isMobile]);

  return (
    <div className="how-we-work" ref={containerRef}>
      <div className="how-we-work-col how-we-work-header" ref={headerRef}>
        <div className="container">
          <div className="how-we-work-header-content">
            <Copy delay={0.15}>
              <h3>{content.heading}</h3>
            </Copy>
            <p className="how-we-work-header-support" aria-live="polite">
              {content.supportStages[activeStep]}
            </p>
            <div className="how-we-work-steps" aria-label={content.stagesLabel}>
              {content.stageLabels.map((label, index) => (
                <div className={`how-we-work-step ${activeStep === index ? "active" : ""}`} key={label}>
                  <p>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="how-we-work-col how-we-work-cards" ref={cardsRef}>
        {content.cards.map((card, index) => (
          <div className="how-we-work-card" key={card.title}>
            <div className="how-we-work-card-img">
              <img src={cardImages[index]} alt={card.alt} />
            </div>
            <div className="how-we-work-card-copy">
              <div className="how-we-work-card-index-label">
                <h3>{card.title}</h3>
              </div>
              <p className="md">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowWeWork;
