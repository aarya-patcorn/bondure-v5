"use client";

import "./rd-page.css";

import RDIntro from "@/components/RDIntro/RDIntro";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";
import { useLocale } from "@/components/LocaleProvider/LocaleProvider";

const copy = {
  en: {
    intro: {
      headline: "Research at Bondure",
      actionLabel: "Explore the process",
      footerItems: ["Formulate", "Test", "Prove"],
    },
    partnershipsHeading: "Research partnerships.",
    iitbAlt: "Indian Institute of Technology Bombay logo",
    iitbDescription: "Materials research.",
    mpaAlt: "Materials Testing Institute University of Stuttgart logo",
    mpaDescription: "Independent testing.",
    peopleHeading: "One shared standard.",
    peopleDescription: "Research. Application. Verification.",
    researchRoles: [
      {
        title: "Materials research",
        description: "Formulation and chemistry.",
        image: "/home-media/materials-research-lab.webp",
        alt: "Bonding material powder sample prepared for laboratory analysis",
      },
      {
        title: "Application engineering",
        description: "Application and substrates.",
        image: "/home-media/site-testing.webp",
        alt: "Technical specialist carrying out a construction-site test",
      },
      {
        title: "Independent verification",
        description: "Repeatable external testing.",
        image: "/home-media/independent-verification-site.webp",
        alt: "Technical team inspecting bonded block samples on a construction site",
      },
    ],
    developmentHeading: "From lab to site.",
    developmentDescription: "Evidence guides every release.",
    developmentAlt: "Engineer reviewing technical work in an industrial setting",
    developmentSteps: [
      ["Question", "Define the challenge."],
      ["Small batch", "Compare variations."],
      ["Controlled test", "Measure performance."],
      ["Conditioning", "Apply relevant stress."],
      ["Verification", "Repeat critical tests."],
      ["Site trial", "Observe real application."],
      ["Release", "Approve supported results."],
    ],
    evidenceHeading: "Evidence, retained.",
    evidenceDescription: "Clear records. Traceable decisions.",
    evidenceRecords: [
      ["Batch records", "Every trial documented.", "/home-media/batch-records-illustration.svg"],
      ["Conditioning results", "Every change compared.", "/home-media/conditioning-results-illustration.svg"],
      ["Field reports", "Every application observed.", "/home-media/field-reports-illustration.svg"],
    ],
    ctaHeading: "The science of bonding.",
  },
  de: {
    intro: {
      headline: "Forschung bei Bondure",
      actionLabel: "Prozess entdecken",
      footerItems: ["Formulieren", "Testen", "Nachweisen"],
    },
    partnershipsHeading: "Forschungspartnerschaften.",
    iitbAlt: "Logo des Indian Institute of Technology Bombay",
    iitbDescription: "Materialforschung.",
    mpaAlt: "Logo der Materialprüfungsanstalt Universität Stuttgart",
    mpaDescription: "Unabhängige Prüfung.",
    peopleHeading: "Ein gemeinsamer Standard.",
    peopleDescription: "Forschung. Anwendung. Verifizierung.",
    researchRoles: [
      {
        title: "Materialforschung",
        description: "Formulierung und Chemie.",
        image: "/home-media/materials-research-lab.webp",
        alt: "Pulverprobe eines Verbindungsmaterials für die Laboranalyse",
      },
      {
        title: "Anwendungstechnik",
        description: "Anwendung und Untergründe.",
        image: "/home-media/site-testing.webp",
        alt: "Technischer Spezialist bei einer Prüfung auf der Baustelle",
      },
      {
        title: "Unabhängige Verifizierung",
        description: "Reproduzierbare externe Prüfungen.",
        image: "/home-media/independent-verification-site.webp",
        alt: "Technisches Team prüft verklebte Blockproben auf einer Baustelle",
      },
    ],
    developmentHeading: "Vom Labor zur Baustelle.",
    developmentDescription: "Nachweise leiten jede Freigabe.",
    developmentAlt: "Ingenieur prüft technische Arbeiten in einer industriellen Umgebung",
    developmentSteps: [
      ["Fragestellung", "Herausforderung definieren."],
      ["Kleinansatz", "Varianten vergleichen."],
      ["Kontrollierter Test", "Leistung messen."],
      ["Konditionierung", "Relevante Belastung anwenden."],
      ["Verifizierung", "Kritische Tests wiederholen."],
      ["Baustellenversuch", "Reale Anwendung beobachten."],
      ["Freigabe", "Belegte Ergebnisse freigeben."],
    ],
    evidenceHeading: "Nachweise, bewahrt.",
    evidenceDescription: "Klare Aufzeichnungen. Nachvollziehbare Entscheidungen.",
    evidenceRecords: [
      ["Chargenprotokolle", "Jeder Versuch dokumentiert.", "/home-media/batch-records-illustration.svg"],
      ["Konditionierungsergebnisse", "Jede Änderung verglichen.", "/home-media/conditioning-results-illustration.svg"],
      ["Baustellenberichte", "Jede Anwendung beobachtet.", "/home-media/field-reports-illustration.svg"],
    ],
    ctaHeading: "Die Wissenschaft des Verbindens.",
  },
};

export default function RDPage() {
  const { locale } = useLocale();
  const content = copy[locale];

  return (
    <>
      <RDIntro {...content.intro} />
      <main className="rd-page" id="rd-content">
        <section className="rd-network">
          <div className="container">
            <div className="rd-network-copy">
              <Copy delay={0.1}>
                <h2>{content.partnershipsHeading}</h2>
              </Copy>
            </div>
            <div className="rd-partner-grid">
              <a className="rd-partner" href="https://www.iitb.ac.in/" target="_blank" rel="noreferrer">
                <div className="rd-partner-logo iitb"><img src="https://www.iitb.ac.in/themes/custom/iitb_bootstrap/logo.png" alt={content.iitbAlt} /></div>
                <div><h3>IIT Bombay</h3><p>{content.iitbDescription}</p></div>
              </a>
              <a className="rd-partner" href="https://www.mpa.uni-stuttgart.de/en/" target="_blank" rel="noreferrer">
                <div className="rd-partner-logo mpa"><img src="https://www.mpa.uni-stuttgart.de/img/Logo-MPA-lang-mit-Rand-en.svg" alt={content.mpaAlt} /></div>
                <div><h3>{locale === "de" ? "MPA Universität Stuttgart" : "MPA University of Stuttgart"}</h3><p>{content.mpaDescription}</p></div>
              </a>
            </div>
          </div>
        </section>

        <section className="rd-people">
          <div className="container">
            <Copy delay={0.1}>
              <h2>{content.peopleHeading}</h2>
              <p>{content.peopleDescription}</p>
            </Copy>
            <div className="rd-people-grid">
              {content.researchRoles.map((role) => (
                <article key={role.title}>
                  <div><img src={role.image} alt={role.alt} /></div>
                  <h3>{role.title}</h3>
                  <p>{role.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rd-development">
          <div className="container">
            <div className="rd-development-heading">
              <Copy delay={0.1}>
                <h2>{content.developmentHeading}</h2>
                <p>{content.developmentDescription}</p>
              </Copy>
              <div className="rd-development-image">
                <img src="/home-media/rd-intro-illustration.svg" alt={content.developmentAlt} />
              </div>
            </div>
            <div className="rd-development-steps">
              {content.developmentSteps.map(([title, description]) => (
                <article key={title}><h3>{title}</h3><p>{description}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="rd-evidence">
          <div className="container">
            <div className="rd-evidence-heading">
              <Copy delay={0.1}>
                <h2>{content.evidenceHeading}</h2>
                <p>{content.evidenceDescription}</p>
              </Copy>
            </div>
            <div className="rd-evidence-grid">
              {content.evidenceRecords.map(([title, description, image]) => (
                <article key={title}>
                  <div><img src={image} alt="" /></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CTAWindow
          img="/media/bondure-mortar-application.png"
          header={content.ctaHeading}
        />
      </main>
      <ConditionalFooter />
    </>
  );
}
