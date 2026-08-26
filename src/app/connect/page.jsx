"use client";

import { useState } from "react";

import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import { useLocale } from "@/components/LocaleProvider/LocaleProvider";

import "./contact.css";

const SUPPORT_EMAIL = "contactus@bondure.com";

const contactCopy = {
  en: {
    illustration: {
      technical: "Technical support illustration",
      general: "General query illustration",
      sales: "Sales illustration",
    },
    locationAlt: {
      "mumbai-image": "Gateway of India in Mumbai with sky at sunset",
      "frankfurt-image": "Frankfurt skyline at night",
    },
    mapTitle: {
      "mumbai-image": "Bondure Mumbai office map",
      "frankfurt-image": "Bondure Frankfurt office map",
    },
    mailSubject: "Contact enquiry",
    fullName: "Full name",
    email: "Email",
    phone: "Phone",
    department: "Department",
    message: "Message",
  },
  de: {
    illustration: {
      technical: "Illustration zum technischen Support",
      general: "Illustration zur allgemeinen Anfrage",
      sales: "Illustration zum Vertrieb",
    },
    locationAlt: {
      "mumbai-image": "Gateway of India in Mumbai bei Sonnenuntergang",
      "frankfurt-image": "Frankfurter Skyline bei Nacht",
    },
    mapTitle: {
      "mumbai-image": "Karte des Bondure Büros Mumbai",
      "frankfurt-image": "Karte des Bondure Büros Frankfurt",
    },
    mailSubject: "Kontaktanfrage",
    fullName: "Vollständiger Name",
    email: "E-Mail",
    phone: "Telefon",
    department: "Abteilung",
    message: "Nachricht",
  },
};

const departments = [
  { id: "marketing", labelKey: "contactDeptMarketing", email: "marketing@bondure.com" },
  { id: "sales", labelKey: "contactDeptSales", email: "sales@bondure.com" },
  { id: "technical", labelKey: "contactDeptTechnical", email: "tech@bondure.com" },
];

const supportChannels = [
  {
    id: "technical",
    titleKey: "contactSupportTechnicalTitle",
    illustration: "/media/technical-support.svg",
    href: "mailto:tech@bondure.com",
    detail: "tech@bondure.com",
  },
  {
    id: "general",
    titleKey: "contactSupportGeneralTitle",
    illustration: "/media/general-query.svg",
    href: "mailto:contactus@bondure.com",
    detail: "contactus@bondure.com",
  },
  {
    id: "sales",
    titleKey: "contactSupportSalesTitle",
    illustration: "/media/salesillustration.png",
    href: "tel:+912266668888",
  },
];

const locations = [
  {
    id: "mumbai-image",
    type: "image",
    src: "/media/mumbai.jpg",
    mapSrc:
      "https://www.openstreetmap.org/export/embed.html?bbox=72.8940%2C19.1080%2C72.9180%2C19.1280&layer=mapnik&marker=19.1180%2C72.9060",
  },
  {
    id: "mumbai-copy",
    type: "copy",
    titleKey: "contactLocationMumbaiTitle",
    subtitleKey: "contactLocationMumbaiSubtitle",
    directionsKey: "contactGetDirections",
    href: "https://maps.google.com/?q=Bondure+Office+Mumbai+Powai",
  },
  {
    id: "frankfurt-copy",
    type: "copy",
    titleKey: "contactLocationFrankfurtTitle",
    subtitleKey: "contactLocationFrankfurtSubtitle",
    directionsKey: "contactGetDirections",
    href: "https://maps.google.com/?q=Bondure+Office+Frankfurt+Germany",
  },
  {
    id: "frankfurt-image",
    type: "image",
    src: "/media/germany.jpg",
    mapSrc:
      "https://www.openstreetmap.org/export/embed.html?bbox=8.6680%2C50.1020%2C8.6960%2C50.1200&layer=mapnik&marker=50.1110%2C8.6820",
  },
];

export default function ContactPage() {
  const { locale, t } = useLocale();
  const copy = contactCopy[locale] || contactCopy.en;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const fullName = data.get("fullName");
    const selectedDepartment =
      departments.find((item) => item.id === data.get("department")) || departments[0];
    const departmentName = t(selectedDepartment.labelKey);
    const subject = encodeURIComponent(`${copy.mailSubject} - ${departmentName}`);
    const body = encodeURIComponent(
      `${copy.fullName}: ${fullName}\n${copy.email}: ${data.get("email")}\n${copy.phone}: ${data.get("phone")}\n${copy.department}: ${departmentName}\n\n${copy.message}:\n${data.get("message")}`
    );

    setSubmitted(true);
    window.location.href = `mailto:${selectedDepartment.email || SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <main className="contact-page">
        <section className="contact-hero" aria-labelledby="contact-page-title">
          <div className="contact-hero__form-block">
            <div className="contact-hero__inner">
              <h1 id="contact-page-title">{t("contactHeroTitle")}</h1>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form__row">
                  <label className="contact-form__field">
                    <span>{t("contactFullName")}</span>
                    <input name="fullName" type="text" autoComplete="name" required />
                  </label>

                  <label className="contact-form__field">
                    <span>{t("contactEmailAddress")}</span>
                    <input name="email" type="email" autoComplete="email" required />
                  </label>
                </div>

                <div className="contact-form__row">
                  <label className="contact-form__field">
                    <span>{t("contactPhoneNumber")}</span>
                    <input name="phone" type="tel" autoComplete="tel" required />
                  </label>

                  <label className="contact-form__field">
                    <span>{t("contactDepartmentLegend")}</span>
                    <select name="department" defaultValue="marketing" required>
                      {departments.map((item) => (
                        <option key={item.id} value={item.id}>
                          {t(item.labelKey)}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="contact-form__field">
                  <span>{t("contactMessageLabel")}</span>
                  <textarea name="message" rows={2} required />
                </label>

                <button className="contact-form__submit" type="submit">
                  {t("contactSubmit")}
                </button>

                <p className="contact-form__status" role="status" aria-live="polite">
                  {submitted ? t("contactSubmitStatus") : ""}
                </p>
              </form>
            </div>
          </div>

          <section
            className="contact-support contact-support--in-hero"
            aria-label={t("contactSupportSectionLabel")}
          >
            {supportChannels.map((channel) => (
              <article className="contact-support__card" key={channel.id} data-channel={channel.id}>
                <div className="contact-support__illustration" data-channel={channel.id}>
                  <img
                    src={channel.illustration}
                    alt={copy.illustration[channel.id]}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="contact-support__content">
                  <h2>{t(channel.titleKey)}</h2>
                  {channel.id === "sales" ? (
                    <div className="contact-support__phones">
                      <a href="tel:+912266668888">{t("contactSalesPhoneIndia")}</a>
                      <a href="tel:+496131666688">{t("contactSalesPhoneGermany")}</a>
                    </div>
                  ) : (
                    <a className="contact-support__link" href={channel.href}>
                      {channel.detail}
                    </a>
                  )}
                </div>

                <a
                  className="contact-support__action"
                  href={channel.href}
                  aria-label={`${t(channel.titleKey)} ${t("contactOpenLink")}`}
                >
                  <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </section>
        </section>

        <section className="contact-locations" aria-labelledby="contact-locations-title">
          <div className="contact-locations__heading">
            <span className="contact-locations__dot" aria-hidden="true" />
            <h2 id="contact-locations-title">{t("contactLocationsTitle")}</h2>
          </div>

          <div className="contact-locations__grid">
            {locations.map((location) =>
              location.type === "image" ? (
                <figure className="contact-locations__media" key={location.id}>
                  <img src={location.src} alt={copy.locationAlt[location.id]} loading="lazy" decoding="async" />
                  <div className="contact-locations__map" aria-hidden="true">
                    <iframe
                      title={copy.mapTitle[location.id]}
                      src={location.mapSrc}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </figure>
              ) : (
                <div className="contact-locations__copy" key={location.id}>
                  <h3>{t(location.titleKey)}</h3>
                  <p>{t(location.subtitleKey)}</p>
                  <a href={location.href} target="_blank" rel="noreferrer">
                    {t(location.directionsKey)}
                  </a>
                </div>
              )
            )}
          </div>
        </section>
      </main>

      <ConditionalFooter />
    </>
  );
}
