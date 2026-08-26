"use client";

import "./LanguageToggle.css";
import { useLocale } from "../LocaleProvider/LocaleProvider";

export default function LanguageToggle() {
  const { locale, setLocale, t } = useLocale();
  const nextLocale = locale === "en" ? "de" : "en";

  return (
    <button
      className="language-toggle"
      type="button"
      data-locale={locale}
      aria-label={nextLocale === "de" ? t("switchGerman") : t("switchEnglish")}
      title={nextLocale === "de" ? t("switchGerman") : t("switchEnglish")}
      onClick={() => setLocale(nextLocale)}
    >
      <span className="language-toggle__track" aria-hidden="true">
        <span className="language-toggle__thumb" />
        <span className={`language-toggle__option ${locale === "en" ? "is-active" : ""}`}>EN</span>
        <span className={`language-toggle__option ${locale === "de" ? "is-active" : ""}`}>DE</span>
      </span>
    </button>
  );
}
