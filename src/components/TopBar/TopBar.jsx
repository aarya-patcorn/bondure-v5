"use client";
import "./TopBar.css";

import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import gsap from "gsap";

import { useViewTransition } from "@/hooks/useViewTransition";
import { NAV_CATEGORY_LABELS, NAV_PRODUCTS, NAV_TOOLS } from "@/lib/navigation-data";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import BondureLogo from "../BondureLogo/BondureLogo";
import { useLocale } from "../LocaleProvider/LocaleProvider";

const NAV_ITEMS = [
  { key: "products", href: "/products" },
  { key: "services", href: "/services" },
  { key: "tools", href: "/tools" },
  { key: "research", href: "/rd" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/connect" },
];

const PRODUCT_CATEGORIES = Object.entries(NAV_CATEGORY_LABELS);
const PRODUCT_CATEGORY_IMAGES = {
  "aac-joining": "/spotlight/02.webp",
  grout: "/media/tileproduct.webp",
  "floor-screed": "/media/tilefloorproduct.webp",
  plaster: "/spotlight/services3AAC.webp",
  "tile-cleaner": "/media/tilecleaner.webp",
};
const TILE_ADHESIVE_IMAGES = [
  "/products/bondure-base-b555-bag.webp",
  "/products/bondure-base-b585-bag.webp",
  "/products/bondure-base-b565-bag.webp",
];
const TOOL_MENU_ORDER = ["adhesive", "screed", "aac", "cleaner", "plaster", "grout"];
const TOOL_MENU_LABELS = {
  adhesive: ["Tile Adhesive Calculator", "Fliesenkleber-Rechner"],
  screed: ["Floor Screed Calculator", "Estrich-Rechner"],
  aac: ["AAC Mortar Calculator", "Porenbetonmörtel-Rechner"],
  cleaner: ["Tile Cleaner Calculator", "Fliesenreiniger-Rechner"],
  plaster: ["Wall Plaster Calculator", "Wandputz-Rechner"],
  grout: ["Tile Grout Calculator", "Fugenmörtel-Rechner"],
};

const CHROME_TEXT = {
  en: {
    home: "Bondure home",
    primary: "Primary navigation",
    close: "Close navigation menu",
    open: "Open navigation menu",
    categories: "Product categories",
    viewAll: "View all products",
    navigate: "Navigate",
    mobilePrimary: "Mobile primary navigation",
    mobileNavigation: "Mobile navigation",
  },
  de: {
    home: "Bondure Startseite",
    primary: "Hauptnavigation",
    close: "Navigationsmenü schließen",
    open: "Navigationsmenü öffnen",
    categories: "Produktkategorien",
    viewAll: "Alle Produkte anzeigen",
    navigate: "Navigieren",
    mobilePrimary: "Mobile Hauptnavigation",
    mobileNavigation: "Mobile Navigation",
  },
};

const CATEGORY_LABELS_DE = {
  "tile-adhesive": "Fliesenkleber",
  "aac-joining": "Porenbeton-Fugenmörtel",
  grout: "Fugenmörtel",
  "floor-screed": "Estrich",
  plaster: "Putz",
  "tile-cleaner": "Fliesenreiniger",
};

const TopBar = () => {
  const headerRef = useRef(null);
  const searchInputRef = useRef(null);
  const closeMenuTimerRef = useRef(null);
  const pathname = usePathname();
  const { navigateWithTransition } = useViewTransition();
  const { locale, t } = useLocale();
  const chromeText = CHROME_TEXT[locale] || CHROME_TEXT.en;
  const [query, setQuery] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeProductCategory, setActiveProductCategory] = useState("tile-adhesive");
  let lastScrollY = 0;
  let isScrolling = false;

  const clearCloseMenuTimer = () => {
    if (closeMenuTimerRef.current) {
      window.clearTimeout(closeMenuTimerRef.current);
      closeMenuTimerRef.current = null;
    }
  };

  const openMegaMenu = (menuKey) => {
    clearCloseMenuTimer();
    setOpenMenu(menuKey);
  };

  const scheduleCloseMegaMenu = () => {
    clearCloseMenuTimer();
    closeMenuTimerRef.current = window.setTimeout(() => {
      setOpenMenu(null);
      closeMenuTimerRef.current = null;
    }, 160);
  };

  useEffect(() => () => clearCloseMenuTimer(), []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    if (window.matchMedia("(max-width: 767px)").matches) {
      gsap.set(header, { clearProps: "transform" });
      return;
    }

    const headerHeight = header.offsetHeight;
    gsap.set(header, { y: 0 });

    const handleScroll = () => {
      if (isScrolling) return;
      if (header.matches(":hover") || header.contains(document.activeElement)) return;

      isScrolling = true;
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 1 : -1;

      if (direction === 1 && currentScrollY > 50) {
        gsap.to(header, {
          y: -headerHeight,
          duration: 1,
          ease: "power4.out",
        });
      } else if (direction === -1) {
        gsap.to(header, {
          y: 0,
          duration: 1,
          ease: "power4.out",
        });
      }

      lastScrollY = currentScrollY;
      setTimeout(() => {
        isScrolling = false;
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    if (window.matchMedia("(max-width: 767px)").matches) {
      gsap.set(header, { clearProps: "transform" });
      return;
    }

    gsap.set(header, { y: 0 });
  }, [pathname]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      sessionStorage.setItem("bondure-site-search", trimmed);
    }
    navigateWithTransition("/products");
    setMobileMenuOpen(false);
    searchInputRef.current?.blur();
  };

  useEffect(() => {
    const closeMenu = (event) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileMenuOpen(false);
        headerRef.current?.querySelector("[aria-expanded='true']")?.focus();
      }
    };

    document.addEventListener("keydown", closeMenu);
    return () => document.removeEventListener("keydown", closeMenu);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("mobile-nav-open", mobileMenuOpen);
    return () => document.body.classList.remove("mobile-nav-open");
  }, [mobileMenuOpen]);

  const visibleProducts = NAV_PRODUCTS.filter((product) => product.category === activeProductCategory);

  const navigateTo = (href) => {
    clearCloseMenuTimer();
    setOpenMenu(null);
    setMobileMenuOpen(false);
    navigateWithTransition(href);
  };

  return (
    <header
      className={`site-chrome${openMenu ? " mega-menu-open" : ""}`}
      ref={headerRef}
    >
      <div className="top-bar">
        <form className="top-bar-search" onSubmit={handleSearchSubmit} role="search">
          <svg className="top-bar-search__icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M20 20L16.5 16.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="top-bar-search__field">
            <input
              ref={searchInputRef}
              className="top-bar-search__input"
              type="search"
              name="q"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("search")}
              aria-label={t("search")}
            />
          </span>
        </form>

        <a
          className="top-bar-logo"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (pathname === "/") return;
            navigateWithTransition("/");
          }}
          aria-label={chromeText.home}
        >
          <span className="top-bar-logo-text">BONDURE</span>
        </a>

        <div className="top-bar-spacer" aria-hidden="true" />
      </div>

      <div
        className="top-bar-mega-host"
        onMouseLeave={scheduleCloseMegaMenu}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) scheduleCloseMegaMenu();
        }}
      >
        <div className="top-bar-nav">
          <nav className="top-bar-nav__links" aria-label={chromeText.primary}>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const isProducts = item.key === "products";
              const isTools = item.key === "tools";
              const hasMegaMenu = isProducts || isTools;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`${isActive ? "is-active " : ""}${hasMegaMenu ? "top-bar-mega-trigger" : ""}`.trim() || undefined}
                  aria-current={isActive ? "page" : undefined}
                  aria-haspopup={hasMegaMenu ? "true" : undefined}
                  aria-expanded={hasMegaMenu ? openMenu === item.key : undefined}
                  onMouseEnter={hasMegaMenu ? () => openMegaMenu(item.key) : () => openMegaMenu(null)}
                  onFocus={hasMegaMenu ? () => openMegaMenu(item.key) : () => openMegaMenu(null)}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(item.href);
                  }}
                >
                  {t(item.key)}
                </a>
              );
            })}
          </nav>

          <div className="top-bar-nav__actions">
            <LanguageToggle />
          </div>
        </div>

        {openMenu && (
          <button
            className="mega-menu-backdrop"
            type="button"
            aria-label={chromeText.close}
            onClick={() => openMegaMenu(null)}
          />
        )}

        <div
          className={`products-mega-menu${openMenu === "products" ? " is-open" : ""}`}
          aria-hidden={openMenu !== "products"}
          onMouseEnter={() => openMegaMenu("products")}
        >
        <div className="products-mega-menu__tabs" role="tablist" aria-label={chromeText.categories}>
          {PRODUCT_CATEGORIES.map(([category, label]) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeProductCategory === category}
              className={activeProductCategory === category ? "is-active" : undefined}
              onMouseEnter={() => setActiveProductCategory(category)}
              onFocus={() => setActiveProductCategory(category)}
              onClick={() => setActiveProductCategory(category)}
            >
              {locale === "de" ? CATEGORY_LABELS_DE[category] || label : label}
            </button>
          ))}
          <a href="/products" onClick={(event) => { event.preventDefault(); navigateTo("/products"); }}>{chromeText.viewAll} <span aria-hidden="true">→</span></a>
        </div>

        <div className="products-mega-menu__panel" role="tabpanel">
          <div className="products-mega-menu__grid">
            {visibleProducts.map((product, index) => (
              <a
                className="products-mega-card"
                href={`/products/${product.slug}`}
                key={product.slug}
                onClick={(event) => {
                  event.preventDefault();
                  navigateTo(`/products/${product.slug}`);
                }}
              >
                <span className="products-mega-card__image">
                  <img
                    src={activeProductCategory === "tile-adhesive" ? TILE_ADHESIVE_IMAGES[index] : PRODUCT_CATEGORY_IMAGES[activeProductCategory]}
                    alt={locale === "de"
                      ? `Produktabbildung ${product.title.replace(/^Bondure\s+/i, "")}`
                      : product.imageAlt}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span className="products-mega-card__copy">
                  <strong>{product.title.replace(/^Bondure\s+/i, "")}</strong>
                </span>
              </a>
            ))}
          </div>
        </div>
        </div>

        <div
          className={`tools-mega-menu${openMenu === "tools" ? " is-open" : ""}`}
          aria-hidden={openMenu !== "tools"}
          onMouseEnter={() => openMegaMenu("tools")}
        >
          <div className="tools-mega-menu__panel">
            <div className="tools-mega-menu__grid">
              {TOOL_MENU_ORDER.map((id) => NAV_TOOLS.find((tool) => tool.id === id)).map((tool) => (
                <a
                  className="tools-mega-card"
                  href={`/tools#${tool.id}`}
                  key={tool.id}
                  onClick={(event) => { event.preventDefault(); navigateTo(`/tools#${tool.id}`); }}
                >
                  <span className="tools-mega-card__image"><img src={tool.illustration} alt="" loading="lazy" decoding="async" /></span>
                  <span className="tools-mega-card__copy"><strong>{TOOL_MENU_LABELS[tool.id][locale === "de" ? 1 : 0]}</strong></span>
                  <span className="tools-mega-card__arrow" aria-hidden="true">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        className={`mobile-nav-backdrop${mobileMenuOpen ? " is-open" : ""}`}
        type="button"
        aria-label={chromeText.close}
        tabIndex={mobileMenuOpen ? 0 : -1}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div
        id="mobile-navigation"
        className={`mobile-nav-sheet${mobileMenuOpen ? " is-open" : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-nav-sheet__header">
          <span>{chromeText.navigate}</span>
          <button type="button" onClick={() => setMobileMenuOpen(false)} aria-label={chromeText.close}>×</button>
        </div>
        <form className="mobile-nav-search" onSubmit={handleSearchSubmit} role="search">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="m20 20-3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("search")} aria-label={t("search")} />
        </form>
        <nav className="mobile-nav-sheet__links" aria-label={chromeText.mobilePrimary}>
          {NAV_ITEMS.map((item) => (
            <a
              href={item.href}
              key={item.href}
              className={pathname === item.href || pathname.startsWith(`${item.href}/`) ? "is-active" : undefined}
              aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? "page" : undefined}
              onClick={(event) => { event.preventDefault(); navigateTo(item.href); }}
            >
              <span>{t(item.key)}</span><span aria-hidden="true">→</span>
            </a>
          ))}
        </nav>
      </div>

      <nav className="mobile-bottom-nav" aria-label={chromeText.mobileNavigation}>
        <button
          className={`mobile-bottom-nav__menu${mobileMenuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={mobileMenuOpen ? chromeText.close : chromeText.open}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span className="mobile-bottom-nav__menu-icon" aria-hidden="true">
            <span />
            <span />
          </span>
          <span className="mobile-bottom-nav__menu-label">
            <BondureLogo gradientId="mobileNavLogoGradient" color="#591618" />
          </span>
        </button>
      </nav>
    </header>
  );
};

export default TopBar;
