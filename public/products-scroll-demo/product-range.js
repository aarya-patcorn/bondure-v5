/**
 * Product category hero: selecting a category updates the visual and copy.
 */
(() => {
  window.initProductRange = function initProductRange() {
    const section = document.querySelector(".product-hero[data-product-range]") ||
      document.querySelector("[data-product-range]");
    if (!section || section.dataset.ready === "true") return;
    initProductRangeSection(section);
  };

  function initProductRangeSection(section) {
    section.dataset.ready = "true";

    const tiles = [...section.querySelectorAll("[data-product-range-tile]")];
    const image = section.querySelector("[data-product-hero-image]");
    const eyebrow = section.querySelector("[data-product-hero-eyebrow]");
    const title = section.querySelector("[data-product-hero-title]");
    const description = section.querySelector("[data-product-hero-description]");
    if (!tiles.length) return;

    let committedIndex = 0;

    const setPreview = (index) => {
      tiles.forEach((tile, i) => {
        tile.classList.toggle("is-active", i === index);
      });

      const tile = tiles[index];
      if (!tile) return;

      section.dataset.palette = tile.dataset.palette || "mortar";
      if (image && tile.dataset.image) {
        image.src = tile.dataset.image;
        image.alt = tile.dataset.alt || "";
      }
      if (eyebrow) eyebrow.textContent = tile.dataset.eyebrow || "";
      if (title) title.textContent = tile.dataset.title || "";
      if (description) description.textContent = tile.dataset.description || "";
    };

    const setCommittedFilter = (index) => {
      committedIndex = index;
      tiles.forEach((tile, i) => {
        tile.setAttribute("aria-pressed", String(i === index));
      });
    };

    const list = section.querySelector(".product-hero__list");

    tiles.forEach((tile, index) => {
      tile.addEventListener("mouseenter", () => setPreview(index));
      tile.addEventListener("focus", () => setPreview(index));
      tile.addEventListener("click", () => {
        setCommittedFilter(index);
        applyCatalogFilterForTile(tile);
        scrollToCatalogSection();
        if (!list?.matches(":hover")) {
          setPreview(committedIndex);
        }
      });
    });

    list?.addEventListener("mouseleave", () => setPreview(committedIndex));
    list?.addEventListener("focusout", (event) => {
      if (list.contains(event.relatedTarget)) return;
      setPreview(committedIndex);
    });

    setPreview(0);
    setCommittedFilter(0);
  }

  function applyCatalogFilterForTile(tile) {
    const filterCategory = tile.dataset.filterCategory;
    if (!filterCategory) return;
    window.applyProductsCatalogCategoryFilter?.(filterCategory);
  }

  function scrollToCatalogSection() {
    const target =
      document.getElementById("product-catalog-heading") ||
      document.querySelector(".product-catalog-section");
    if (!target) return;

    const headerOffset = getHeaderScrollOffset();
    const lenis = window.__bondureLenis;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (lenis?.scrollTo) {
      lenis.scrollTo(target, {
        offset: -headerOffset,
        immediate: prefersReducedMotion,
      });
      return;
    }

    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({
      top,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  function getHeaderScrollOffset() {
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-height").trim();
    const headerHeight = raw ? parseFloat(raw) : 80;
    return headerHeight + 20;
  }
})();
