"use client";

import "./services-page.css";

import Copy from "@/components/Copy/Copy";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import HowWeWork from "@/components/HowWeWork/HowWeWork";
import { useLocale } from "@/components/LocaleProvider/LocaleProvider";
import Spotlight from "@/components/Spotlight/Spotlight";
import ServiceImageTower from "@/components/ServiceImageTower/ServiceImageTower";
import TelescopeSpotlight from "@/components/TelescopeSpotlight/TelescopeSpotlight";

const copy = {
  en: {
    heading: "Our services",
    cta: "Explore our YouTube channel",
    pillars: [
      {
        key: "recommendation",
        title: "Product recommendation",
        description: "Select systems through substrate, exposure, finish, application method, performance requirements, and specific project constraints on site.",
      },
      {
        key: "call",
        title: "Technical call support",
        description: "Access direct technical reasoning whenever specifications, site conditions, installation details, or performance expectations change during work.",
      },
      {
        key: "quality",
        title: "Onsite quality support",
        description: "Verify preparation, mixing, application, and acceptance onsite, with Bondure's mobile lab van bringing competitor products for live side-by-side comparison and testing.",
      },
      {
        key: "training",
        title: "Application training programs",
        description: "Transform product instructions into repeatable practical skills through structured demonstrations for applicators, supervisors, and project teams.",
      },
    ],
  },
  de: {
    heading: "Unsere Services",
    cta: "Unseren YouTube-Kanal entdecken",
    pillars: [
      {
        key: "recommendation",
        title: "Produktempfehlung",
        description: "Wählen Sie Systeme anhand von Untergrund, Beanspruchung, Oberfläche, Anwendungsmethode, Leistungsanforderungen und den spezifischen Projektbedingungen vor Ort aus.",
      },
      {
        key: "call",
        title: "Technischer Telefonsupport",
        description: "Erhalten Sie direkte technische Beratung, wenn sich Spezifikationen, Baustellenbedingungen, Ausführungsdetails oder Leistungserwartungen während der Arbeiten ändern.",
      },
      {
        key: "quality",
        title: "Qualitätssicherung vor Ort",
        description: "Überprüfen Sie Vorbereitung, Mischung, Anwendung und Abnahme vor Ort. Das mobile Laborfahrzeug von Bondure bringt Wettbewerbsprodukte für direkte Live-Vergleiche und Tests mit.",
      },
      {
        key: "training",
        title: "Anwendungsschulungen",
        description: "Überführen Sie Produktanweisungen durch strukturierte Vorführungen für Anwender, Bauleiter und Projektteams in wiederholbare praktische Fähigkeiten.",
      },
    ],
  },
};

function PillarIllustration({ type }) {
  if (type === "recommendation") {
    return (
      <img
        className="service-pillar-art"
        src="/media/pillar-product-bag.svg"
        alt=""
        aria-hidden="true"
      />
    );
  }

  if (type === "call") {
    return (
      <img
        className="service-pillar-art service-pillar-art--call"
        src="/media/pillar-technical-call.svg"
        alt=""
        aria-hidden="true"
      />
    );
  }

  if (type === "quality") {
    return (
      <img
        className="service-pillar-art service-pillar-art--quality"
        src="/media/pillar-onsite-quality.svg"
        alt=""
        aria-hidden="true"
      />
    );
  }

  if (type === "training") {
    return (
      <img
        className="service-pillar-art service-pillar-art--training"
        src="/media/pillar-application-training.svg"
        alt=""
        aria-hidden="true"
      />
    );
  }

  return null;
}

export default function ServicesPage() {
  const { locale } = useLocale();
  const content = copy[locale];

  return (
    <>
      <main className="services-page">
        <ServiceImageTower />

        <section className="service-pillars">
          <div className="container service-pillars-heading">
            <Copy delay={0.1}>
              <h2>{content.heading}</h2>
            </Copy>
          </div>
          <div className="container service-pillars-list">
            {content.pillars.map((pillar) => (
              <article className="service-pillar" key={pillar.key}>
                <div className="service-pillar-visual"><PillarIllustration type={pillar.key} /></div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="how-we-work-container">
          <div className="container">
            <HowWeWork />
          </div>
        </section>

        <Spotlight />

        <TelescopeSpotlight />

        <CTAWindow
          video="/home-media/AACBLOCKDEMO.mp4"
          ctaLabel={content.cta}
          ctaHref="https://www.youtube.com"
          showOverlay={false}
        />
      </main>
      <ConditionalFooter />
    </>
  );
}
