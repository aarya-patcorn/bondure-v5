(function () {
  "use strict";

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[data-products-scroll="${src}"]`);
      if (existing) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.dataset.productsScroll = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.body.appendChild(script);
    });
  }

  async function bootBondureProductsPage() {
    if (typeof window.gsap === "undefined") {
      throw new Error("GSAP must be registered on window before booting the products page.");
    }

    await loadScript("/products-scroll-demo/products-catalog.js");
    await loadScript("/products-scroll-demo/product-range.js");
    await loadScript("/products-scroll-demo/magic-bento.js");

    window.initProductsCatalog?.();
    window.initProductRange?.();
    window.initProductsMagicBento?.();
  }

  window.bootBondureProductsPage = bootBondureProductsPage;
})();
