"use client";

import { createContext, useContext, useEffect, useState } from "react";

const LocaleContext = createContext(null);

const messages = {
  en: {
    language: "Language",
    english: "English",
    german: "German",
    bookVisit: "Book a site visit",
    switchEnglish: "Switch to English",
    switchGerman: "Switch to German",
    cookiesTitle: "Your privacy your reason.",
    cookiesBody: "We use essential cookies to remember your language, country, and theme. With your permission, optional cookies can help us understand how the website is used.",
    cookiesHeaderLabel: "Bondure privacy",
    cookiesStep1Title: "Select your country",
    cookiesStep1Body: "We use your region to apply the right privacy settings and language defaults before you choose your cookie preferences.",
    cookiesStep2Title: "Set your cookies",
    cookiesStep2Body: "Choose which cookies Bondure may use. Essential cookies are always active because they store your language, country, and theme.",
    countryLabel: "Visiting from",
    countryPlaceholder: "Select a country",
    continue: "Continue",
    savePreferences: "Save preferences",
    refuseAll: "Refuse all",
    acceptAll: "Accept all",
    accept: "Accept all",
    necessary: "Necessary only",
    cookieEssentialTitle: "Essential",
    cookieEssentialBody: "Required for language, country, and theme preferences.",
    cookieAnalyticsTitle: "Analytics",
    cookieAnalyticsBody: "Helps us understand how visitors use the website.",
    cookieMarketingTitle: "Marketing",
    cookieMarketingBody: "Allows personalised content and campaign measurement.",
    alwaysOn: "Always on",
    privacyNote: "You can change these preferences later from this browser.",
    menu: "Menu",
    home: "Home",
    products: "Products",
    services: "Services",
    tools: "Tools",
    research: "R&D",
    about: "About",
    contact: "Contacts",
    search: "Search",
    headerAnnouncement: "Request a private site visit with Bondure technical support",
    contactTitle: "Contact us",
    contactTaglineLead: "Let's elevate",
    contactTaglineTail: "Your projects.",
    contactAsideLabel: "Bondure offices and social links",
    contactSocialLabel: "Follow Bondure",
    contactFirstName: "First name",
    contactLastName: "Last name",
    contactEmail: "Email",
    contactCompany: "Company",
    contactMessage: "Type your message...",
    contactPrivacyLead: "I have read and understood the",
    contactPrivacyLink: "privacy statement",
    contactPrivacyRequired: "Please confirm the privacy statement before submitting.",
    contactSubmit: "Submit",
    contactSubmitStatus: "Your email application should open with the enquiry ready to send.",
    contactEyebrow: "Support",
    contactHeroTitle: "Get in touch",
    contactFullName: "Full Name *",
    contactEmailAddress: "Email Address *",
    contactPhoneNumber: "Phone Number *",
    contactDepartmentLegend: "Select a Department *",
    contactDeptMarketing: "Marketing",
    contactDeptSales: "Sales",
    contactDeptTechnical: "Technical Support",
    contactMessageLabel: "Message",
    contactSupportSectionLabel: "Bondure support channels",
    contactSupportTechnicalTitle: "Technical Support",
    contactSupportTechnicalDetail: "tech@bondure.com",
    contactSupportGeneralTitle: "General Query",
    contactSupportGeneralDetail: "contactus@bondure.com",
    contactSupportSalesTitle: "Sales",
    contactSupportSalesDetail: "Sales phone numbers",
    contactSalesPhoneIndia: "+91 22 6666 8888 (India)",
    contactSalesPhoneGermany: "+49 6131 666688 (Germany)",
    contactOpenLink: "open link",
    contactLocationsTitle: "Locations",
    contactLocationMumbaiTitle: "Bondure Office Mumbai",
    contactLocationMumbaiSubtitle: "Powai, India",
    contactLocationFrankfurtTitle: "Bondure Office Frankfurt",
    contactLocationFrankfurtSubtitle: "Office, Germany",
    contactGetDirections: "Get directions",
  },
  de: {
    language: "Sprache",
    english: "Englisch",
    german: "Deutsch",
    bookVisit: "Standortbesuch buchen",
    switchEnglish: "Auf Englisch wechseln",
    switchGerman: "Auf Deutsch wechseln",
    cookiesTitle: "Ihre Privatsphäre Ihr Grund.",
    cookiesBody: "Wir verwenden notwendige Cookies, um Ihre Sprache, Ihr Land und Ihr Design zu speichern. Mit Ihrer Zustimmung helfen uns optionale Cookies zu verstehen, wie die Website genutzt wird.",
    cookiesHeaderLabel: "Bondure Datenschutz",
    cookiesStep1Title: "Land auswählen",
    cookiesStep1Body: "Wir verwenden Ihre Region, um die passenden Datenschutzeinstellungen und Sprachstandards festzulegen, bevor Sie Ihre Cookie-Einstellungen wählen.",
    cookiesStep2Title: "Cookies festlegen",
    cookiesStep2Body: "Wählen Sie, welche Cookies Bondure verwenden darf. Notwendige Cookies sind immer aktiv, da sie Sprache, Land und Design speichern.",
    countryLabel: "Besuch aus",
    countryPlaceholder: "Land auswählen",
    continue: "Weiter",
    savePreferences: "Einstellungen speichern",
    refuseAll: "Alle ablehnen",
    acceptAll: "Alle akzeptieren",
    accept: "Alle akzeptieren",
    necessary: "Nur notwendige",
    cookieEssentialTitle: "Notwendig",
    cookieEssentialBody: "Erforderlich für Sprache, Land und Design.",
    cookieAnalyticsTitle: "Analyse",
    cookieAnalyticsBody: "Hilft uns zu verstehen, wie Besucher die Website nutzen.",
    cookieMarketingTitle: "Marketing",
    cookieMarketingBody: "Ermöglicht personalisierte Inhalte und Kampagnenmessung.",
    alwaysOn: "Immer aktiv",
    privacyNote: "Sie können diese Einstellungen später in diesem Browser ändern.",
    menu: "Menü",
    home: "Startseite",
    products: "Produkte",
    services: "Services",
    tools: "Werkzeuge",
    research: "F&E",
    about: "Über uns",
    contact: "Kontakt",
    search: "Suchen",
    headerAnnouncement: "Vereinbaren Sie einen privaten Standortbesuch mit dem Bondure Technik-Team",
    contactTitle: "Kontakt",
    contactTaglineLead: "Lassen Sie uns",
    contactTaglineTail: "Ihre Projekte stärken.",
    contactAsideLabel: "Bondure Standorte und Social Links",
    contactSocialLabel: "Bondure folgen",
    contactFirstName: "Vorname",
    contactLastName: "Nachname",
    contactEmail: "E-Mail",
    contactCompany: "Unternehmen",
    contactMessage: "Ihre Nachricht...",
    contactPrivacyLead: "Ich habe die",
    contactPrivacyLink: "Datenschutzerklärung",
    contactPrivacyRequired: "Bitte bestätigen Sie die Datenschutzerklärung vor dem Absenden.",
    contactSubmit: "Senden",
    contactSubmitStatus: "Ihre E-Mail-Anwendung sollte sich mit der Anfrage öffnen.",
    contactEyebrow: "Support",
    contactHeroTitle: "Kontakt aufnehmen",
    contactFullName: "Vollständiger Name *",
    contactEmailAddress: "E-Mail-Adresse *",
    contactPhoneNumber: "Telefonnummer *",
    contactDepartmentLegend: "Abteilung wählen *",
    contactDeptMarketing: "Marketing",
    contactDeptSales: "Vertrieb",
    contactDeptTechnical: "Technischer Support",
    contactMessageLabel: "Nachricht",
    contactSupportSectionLabel: "Bondure Support-Kanäle",
    contactSupportTechnicalTitle: "Technischer Support",
    contactSupportTechnicalDetail: "tech@bondure.com",
    contactSupportGeneralTitle: "Allgemeine Anfrage",
    contactSupportGeneralDetail: "contactus@bondure.com",
    contactSupportSalesTitle: "Vertrieb",
    contactSupportSalesDetail: "Vertriebstelefonnummern",
    contactSalesPhoneIndia: "+91 22 6666 8888 (Indien)",
    contactSalesPhoneGermany: "+49 6131 666688 (Deutschland)",
    contactOpenLink: "Link öffnen",
    contactLocationsTitle: "Standorte",
    contactLocationMumbaiTitle: "Bondure Büro Mumbai",
    contactLocationMumbaiSubtitle: "Powai, Indien",
    contactLocationFrankfurtTitle: "Bondure Büro Frankfurt",
    contactLocationFrankfurtSubtitle: "Büro, Deutschland",
    contactGetDirections: "Route anzeigen",
  },
};

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("bondure-language");
    const normalized = stored === "de" ? "de" : "en";
    document.documentElement.lang = normalized;
    setLocaleState(normalized);

    const handleStorage = (event) => {
      if (event.key !== "bondure-language") return;
      const nextLocale = event.newValue === "de" ? "de" : "en";
      document.documentElement.lang = nextLocale;
      setLocaleState(nextLocale);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const setLocale = (nextLocale) => {
    const normalized = nextLocale === "de" ? "de" : "en";
    document.documentElement.lang = normalized;
    window.localStorage.setItem("bondure-language", normalized);
    setLocaleState(normalized);
  };

  const value = {
    locale,
    setLocale,
    t: (key) => messages[locale][key] || messages.en[key] || key,
  };

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}
