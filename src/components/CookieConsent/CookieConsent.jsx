"use client";

import "./CookieConsent.css";

import { useEffect, useState } from "react";
import { getCountryOptions } from "@/lib/countries";
import { useLocale } from "../LocaleProvider/LocaleProvider";

const defaultPreferences = {
  analytics: false,
  marketing: false,
};

export default function CookieConsent() {
  const { locale, setLocale, t } = useLocale();
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState("");
  const [preferences, setPreferences] = useState(defaultPreferences);

  useEffect(() => {
    const stored = window.localStorage.getItem("bondure-consent");
    setIsOpen(!stored);
  }, []);

  const saveConsent = (nextPreferences) => {
    const optional = nextPreferences.analytics || nextPreferences.marketing;
    const consent = {
      necessary: true,
      optional,
      preferences: nextPreferences,
      country: country || "OTHER",
      savedAt: new Date().toISOString(),
    };

    window.localStorage.setItem("bondure-consent", JSON.stringify(consent));
    document.documentElement.dataset.consent = "saved";
    document.cookie = `bondure_country=${country || "OTHER"}; Path=/; Max-Age=31536000; SameSite=Lax`;
    document.cookie = `bondure_optional=${optional ? "yes" : "no"}; Path=/; Max-Age=31536000; SameSite=Lax`;
    document.cookie = "bondure_consent=yes; Path=/; Max-Age=31536000; SameSite=Lax";
    setIsOpen(false);
  };

  const handleRefuseAll = () => {
    saveConsent({ analytics: false, marketing: false });
  };

  const handleAcceptAll = () => {
    saveConsent({ analytics: true, marketing: true });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const togglePreference = (key) => {
    setPreferences((current) => ({ ...current, [key]: !current[key] }));
  };

  if (!isOpen) return null;

  const countryOptions = getCountryOptions(locale);

  return (
    <div className="cookie-consent-backdrop" role="presentation">
      <section
        className="cookie-consent"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
      >
        <p className="cookie-consent-logo top-bar-logo-text" aria-label="Bondure">BONDURE</p>
        <h2 id="cookie-consent-title">{step === 1 ? (locale === "de" ? "Wir schätzen Ihre Privatsphäre" : "We value your privacy") : t("cookiesStep2Title")}</h2>
        <p className="cookie-consent-body">
          {step === 1
            ? locale === "de"
              ? "Wir verwenden Cookies, einschließlich Cookies von Drittanbietern, für funktionale Zwecke, statistische Analysen und um Ihr Nutzungserlebnis zu verbessern. Sie können alle Cookies akzeptieren, alle optionalen Cookies ablehnen oder Ihre Einstellungen individuell festlegen. Notwendige Cookies bleiben für die sichere Funktion dieser Website aktiv."
              : "We use cookies, including third-party cookies, for functional purposes, statistical analysis, and to improve your browsing experience. You can accept all cookies, reject all optional cookies, or choose your preferences. Necessary cookies remain active for the proper and secure operation of this website."
            : t("cookiesStep2Body")}
        </p>

        {step === 1 ? (
          <div className="cookie-consent-step">
            <button className="cookie-more-information" type="button" onClick={() => setStep(2)}>{locale === "de" ? "Weitere Informationen" : "More information"}</button>
            <div className="cookie-consent-selectors">
              <label className="cookie-country">
                <span>{t("countryLabel")}</span>
                <select value={country} onChange={(event) => setCountry(event.target.value)}>
                  <option value="">{t("countryPlaceholder")}</option>
                  {countryOptions.map(({ code, label, flag }) => (
                    <option value={code} key={code}>{`${flag} ${label}`}</option>
                  ))}
                  <option value="OTHER">{locale === "de" ? "🌍 Anderes Land" : "🌍 Other"}</option>
                </select>
              </label>
              <label className="cookie-country">
                <span>{locale === "de" ? "Sprache" : "Language"}</span>
                <select value={locale} onChange={(event) => setLocale(event.target.value)}>
                  <option value="en">{t("english")}</option>
                  <option value="de">Deutsch</option>
                </select>
              </label>
            </div>
            <div className="cookie-consent-actions">
              <button className="cookie-secondary" type="button" onClick={() => setStep(2)}>{locale === "de" ? "Cookie-Einstellungen" : "Cookie settings"}</button>
              <button className="cookie-secondary" type="button" onClick={handleRefuseAll}>{t("refuseAll")}</button>
              <button className="cookie-primary" type="button" onClick={handleAcceptAll}>{t("acceptAll")}</button>
            </div>
          </div>
        ) : (
          <div className="cookie-consent-step">
            <ul className="cookie-consent-categories">
              <li className="cookie-category cookie-category--locked">
                <div className="cookie-category-copy">
                  <strong>{t("cookieEssentialTitle")}</strong>
                  <span>{t("cookieEssentialBody")}</span>
                </div>
                <span className="cookie-category-status">{t("alwaysOn")}</span>
              </li>

              <li className="cookie-category">
                <div className="cookie-category-copy">
                  <strong>{t("cookieAnalyticsTitle")}</strong>
                  <span>{t("cookieAnalyticsBody")}</span>
                </div>
                <label className="cookie-toggle">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => togglePreference("analytics")}
                  />
                  <span className="cookie-toggle-track" aria-hidden="true">
                    <span className="cookie-toggle-thumb" />
                  </span>
                  <span className="sr-only">{t("cookieAnalyticsTitle")}</span>
                </label>
              </li>

              <li className="cookie-category">
                <div className="cookie-category-copy">
                  <strong>{t("cookieMarketingTitle")}</strong>
                  <span>{t("cookieMarketingBody")}</span>
                </div>
                <label className="cookie-toggle">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => togglePreference("marketing")}
                  />
                  <span className="cookie-toggle-track" aria-hidden="true">
                    <span className="cookie-toggle-thumb" />
                  </span>
                  <span className="sr-only">{t("cookieMarketingTitle")}</span>
                </label>
              </li>
            </ul>

            <div className="cookie-consent-actions">
              <button className="cookie-secondary" type="button" onClick={() => setStep(1)}>{locale === "de" ? "Zurück" : "Back"}</button>
              <button className="cookie-secondary" type="button" onClick={handleSavePreferences}>
                {t("savePreferences")}
              </button>
              <button className="cookie-secondary" type="button" onClick={handleRefuseAll}>
                {t("refuseAll")}
              </button>
              <button className="cookie-primary" type="button" onClick={handleAcceptAll}>
                {t("acceptAll")}
              </button>
            </div>
          </div>
        )}

        <p className="cookie-consent-note">{t("privacyNote")}</p>
      </section>
    </div>
  );
}
