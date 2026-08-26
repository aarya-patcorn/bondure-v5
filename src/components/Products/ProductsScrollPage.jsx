"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "@/components/LocaleProvider/LocaleProvider";

import "@/app/products/scroll-demo/products-ui.css";
import "@/app/products/scroll-demo/product-range.css";
import "@/app/products/scroll-demo/product-spec.css";
import "@/app/products/scroll-demo/product-sections.css";
import "@/app/products/scroll-demo/magic-bento.css";
import "@/app/products/scroll-demo/products-scroll-overrides.css";

gsap.registerPlugin(ScrollTrigger);

function ensureShoelace() {
  if (!document.querySelector('link[data-shoelace-theme="products"]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.dataset.shoelaceTheme = "products";
    link.href =
      "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/themes/light.css";
    document.head.appendChild(link);
  }

  const autoloaderSrc =
    "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/shoelace-autoloader.js";

  if (document.querySelector(`script[src="${autoloaderSrc}"]`)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = autoloaderSrc;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Shoelace autoloader."));
    document.head.appendChild(script);
  });
}

export default function ProductsScrollPage() {
  const rootRef = useRef(null);
  const [ready, setReady] = useState(false);
  const lenis = useLenis();
  const { locale } = useLocale();

  useEffect(() => {
    rootRef.current?.setAttribute("lang", locale);
    window.applyBondureProductsLocale?.(locale);
    window.dispatchEvent(new CustomEvent("bondure:locale-change", { detail: { locale } }));
  }, [locale, ready]);

  useEffect(() => {
    window.__bondureLenis = lenis ?? null;
    return () => {
      window.__bondureLenis = null;
    };
  }, [lenis]);

  useEffect(() => {
    let cancelled = false;

    async function mountProductsPage() {
      const root = rootRef.current;
      if (!root) return;

      window.gsap = gsap;
      window.ScrollTrigger = ScrollTrigger;

      document.documentElement.classList.add("product-page--embed");

      await ensureShoelace();

      const response = await fetch("/products-scroll-demo/content.html");
      if (!response.ok) throw new Error("Failed to load products content.");
      const html = await response.text();
      if (cancelled) return;

      root.innerHTML = html;

      await loadScript("/products-scroll-demo/boot.js");
      if (cancelled) return;

      await window.bootBondureProductsPage();
      if (cancelled) return;

      ScrollTrigger.refresh();
      setReady(true);
    }

    mountProductsPage().catch((error) => {
      console.error(error);
    });

    return () => {
      cancelled = true;
      document.documentElement.classList.remove("product-page--embed");
      window.__productsMagicBentoCleanup?.();
      window.__productsMagicBentoCleanup = null;
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <main
        className="subpage products-page products-page-scroll site is-visible"
        data-page="products"
        aria-busy={!ready}
      >
        <div ref={rootRef} />
      </main>
    </>
  );
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") resolve();
      else existing.addEventListener("load", () => resolve(), { once: true });
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
