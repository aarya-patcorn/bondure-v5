"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

import { useLocale } from "@/components/LocaleProvider/LocaleProvider";
import { localizeProduct } from "@/lib/products-data";

import "@/app/products/scroll-demo/products-ui.css";
import "@/app/products/scroll-demo/product-spec.css";
import "@/app/products/scroll-demo/product-sections.css";
import "@/app/products/scroll-demo/magic-bento.css";
import "@/app/products/scroll-demo/products-scroll-overrides.css";

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing?.dataset.loaded === "true") {
      resolve();
      return;
    }
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

const INTRO_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "standards", label: "Standards" },
  { id: "details", label: "Details" },
];

const DE_UI = {
  Overview: "Überblick",
  Standards: "Normen",
  Details: "Details",
  "Product views": "Produktansichten",
  "Product highlights": "Produkthighlights",
  warranty: "Garantie",
  Product: "Produkt",
  "Back to products": "Zurück zu den Produkten",
  "Specifications & applications": "Spezifikationen und Anwendungen",
  "Numbers that prove the bond.": "Zahlen, die den Verbund belegen.",
  "product pack": "Produktgebinde",
};

function localize(locale, text) {
  return locale === "de" ? DE_UI[text] || text : text;
}

function ProductDetailIntro({ product }) {
  const { locale } = useLocale();
  const [activeView, setActiveView] = useState(0);
  const mainVideoRef = useRef(null);
  const views = product.views?.length
    ? product.views
    : [{ type: "image", src: product.image, alt: product.imageAlt, poster: product.image }];
  const selectedView = views[Math.min(activeView, views.length - 1)];
  const { warranties, certifications, packInfo } = product.metaParsed;
  const { enStandard, isStandard, isoCode } = product.standardsDetail;
  const standardValues = [enStandard, isStandard, isoCode].filter(Boolean);
  const detailValues = [
    warranties.length ? warranties.join(" · ") : null,
    product.categoryLabel,
    packInfo ? packInfo.replace(/^(pack|Gebinde)\s+/i, "") : null,
    ...certifications,
  ].filter(Boolean);
  const introStyle = {
    "--product-intro-accent": product.introAccent.hex,
    "--product-intro-accent-rgb": product.introAccent.rgb,
    "--product-intro-accent-soft": product.introAccent.soft,
    "--product-intro-accent-muted": product.introAccent.muted,
  };

  useEffect(() => {
    const video = mainVideoRef.current;
    if (!video) return;

    if (selectedView.type === "video") {
      video.currentTime = 0;
      video.play().catch(() => {});
      return;
    }

    video.pause();
  }, [activeView, selectedView.type, selectedView.src]);

  return (
    <header className="product-detail-intro" style={introStyle}>
      <div className="product-detail-intro__thumbs" role="group" aria-label={localize(locale, "Product views")}>
        {views.map((view, index) => (
          <button
            key={`${view.type}-${view.src}-${index}`}
            type="button"
            className={`product-detail-intro__thumb${
              index === activeView ? " is-active" : ""
            }`}
            aria-pressed={index === activeView}
            aria-label={view.alt}
            onClick={() => setActiveView(index)}
          >
            {view.type === "video" ? (
              <>
                <img src={view.poster || product.image} alt="" />
                <span className="product-detail-intro__thumb-play" aria-hidden="true" />
              </>
            ) : (
              <img src={view.src} alt="" />
            )}
          </button>
        ))}
      </div>

      <div
        className={`product-detail-intro__media product-detail-intro__media--${
          selectedView.mediaFit === "contain" ? "contain" : "cover"
        }`}
      >
        {selectedView.type === "video" ? (
          <video
            ref={mainVideoRef}
            className="product-detail-intro__video"
            src={selectedView.src}
            poster={selectedView.poster || product.image}
            autoPlay
            muted
            loop
            playsInline
            controls
            aria-label={selectedView.alt}
          />
        ) : (
          <img src={selectedView.src} alt={selectedView.alt} loading="eager" decoding="async" />
        )}
      </div>

      <div className="product-detail-intro__copy">
        <div className="product-detail-intro__card product-detail-intro__card--header">
          <div className="product-detail-intro__pills" aria-label={localize(locale, "Product highlights")}>
            <span className="product-detail-intro__pill product-detail-intro__pill--category">
              {product.categoryLabel}
            </span>
            {warranties.map((warranty) => (
              <span
                key={warranty}
                className="product-detail-intro__pill product-detail-intro__pill--warranty"
              >
                {warranty} {localize(locale, "warranty")}
              </span>
            ))}
            <span className="product-detail-intro__pill product-detail-intro__pill--standard">
              {enStandard}
            </span>
            <span className="product-detail-intro__pill product-detail-intro__pill--standard">
              {isStandard}
            </span>
          </div>
          <h1>{product.title}</h1>
        </div>

        {INTRO_SECTIONS.map((section) => (
          <div
            key={section.id}
            className="product-detail-intro__card product-detail-intro__card--section is-open"
          >
            <h2 className="product-detail-intro__section-title" id={`product-intro-tab-${section.id}`}>
              {localize(locale, section.label)}
            </h2>

            <div
              id={`product-intro-panel-${section.id}`}
              role="region"
              aria-labelledby={`product-intro-tab-${section.id}`}
              className="product-detail-intro__panel"
            >
              {section.id === "overview" ? (
                <p className="product-detail-intro__desc">{product.description}</p>
              ) : null}

              {section.id === "standards" ? (
                <ul className="product-detail-intro__standards">
                  {standardValues.map((value) => (
                    <li key={value}>{value}</li>
                  ))}
                </ul>
              ) : null}

              {section.id === "details" ? (
                <ul className="product-detail-intro__details">
                  {detailValues.map((value) => (
                    <li key={value}>{value}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </header>
  );
}

export default function ProductDetailPage({ product }) {
  const { locale } = useLocale();
  const localizedProduct = localizeProduct(product, locale);
  const bentoRef = useRef(null);
  const { accent, specs, features } = localizedProduct;

  useEffect(() => {
    let cancelled = false;

    async function initEffects() {
      window.gsap = gsap;
      await loadScript("/products-scroll-demo/magic-bento.js");
      if (cancelled) return;

      const grid = bentoRef.current;
      if (!grid) return;

      delete grid.dataset.magicBentoReady;
      window.__productsMagicBentoCleanup?.();
      window.__productsMagicBentoCleanup = window.initProductsMagicBento?.({
        glowColor: accent.glowRgb,
      }) || null;
    }

    initEffects().catch(console.error);

    return () => {
      cancelled = true;
      window.__productsMagicBentoCleanup?.();
      window.__productsMagicBentoCleanup = null;
    };
  }, [localizedProduct.slug, accent.glowRgb]);

  return (
    <main
      className="subpage products-page products-page-scroll products-page--detail site is-visible"
      data-page="product-detail"
    >
      <div className="product-detail-shell">
        <nav className="product-detail-nav" aria-label={localize(locale, "Product")}>
          <Link href="/products" data-transition>
            ← {localize(locale, "Back to products")}
          </Link>
        </nav>

        <ProductDetailIntro product={localizedProduct} />

        <div className="product-details">
          <header className="product-details__head">
            <h2 className="product-details__title">{localize(locale, "Specifications & applications")}</h2>
          </header>

          <section
            id="adhesive-spec"
            className="product-spec bento-section"
            style={{
              "--product-spec-accent": accent.hex,
              "--product-spec-glow": accent.glowRgb,
              "--product-spec-glow-shadow": accent.glowShadow,
            }}
          >
            <div className="product-spec__inner">
              <header className="product-spec__header">
                <h2>{localize(locale, "Numbers that prove the bond.")}</h2>
              </header>

              <div className="product-spec__layout">
                <div className="product-spec__model">
                  <div className="product-spec__model-stage">
                    <div
                      className="product-spec__model-slot"
                      aria-label={`${localizedProduct.title} ${localize(locale, "product pack")}`}
                    >
                      <img
                        className="product-spec__selected-image"
                        src={localizedProduct.image}
                        alt={localizedProduct.imageAlt}
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                  </div>
                  <p className="product-spec__bag-name">{localizedProduct.title}</p>
                </div>

                <div className="product-spec__bento" ref={bentoRef}>
                  <article className="spec-card spec-card--lg">
                    <span className="spec-card__metric">{specs.primary}</span>
                    <h3>{specs.primaryLabel}</h3>
                    <p>{specs.primaryCopy}</p>
                  </article>

                  <article className="spec-card">
                    <span className="spec-card__metric">{specs.secondary}</span>
                    <h3>{specs.secondaryLabel}</h3>
                  </article>

                  <article className="spec-card">
                    <span className="spec-card__metric">{specs.tertiary}</span>
                    <h3>{specs.tertiaryLabel}</h3>
                  </article>

                  <article className="spec-card spec-card--wide">
                    <h3>{specs.bondsLabel}</h3>
                    <p>{specs.bonds}</p>
                  </article>
                </div>
              </div>
            </div>
          </section>

          <section id="adhesive-design" className="product-design">
            <div className="product-design__inner">
              <div className="product-design__top">
                <h2 className="product-design__title">{features.title}</h2>

                <ol className="product-design__list">
                  {features.features.map((feature, index) => (
                    <li className="design-feature" key={feature.title}>
                      <span className="design-feature__index" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="design-feature__copy">
                        <h3>{feature.title}</h3>
                        <p>{feature.copy}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="product-design__gallery">
                {features.gallery.map((image) => (
                  <figure className="design-tile" key={image.src}>
                    <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                  </figure>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
