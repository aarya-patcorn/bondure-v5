(() => {
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  let currentLocale = "en";

  const german = {
    "AAC block masonry and jointing work on site": "Porenbetonmauerwerk und Verfugungsarbeiten auf der Baustelle",
    Mortar: "Mörtel",
    "AAC Jointing Mortar": "Porenbeton-Fugenmörtel",
    "High-strength thin joints.": "Hochfeste Dünnbettfugen.",
    "Explore products": "Produkte entdecken",
    "Product categories": "Produktkategorien",
    "Product range": "Produktsortiment",
    Adhesive: "Kleber",
    "Tile Adhesives": "Fliesenkleber",
    "Reliable tile fixing.": "Zuverlässige Fliesenverlegung.",
    "Bondure tile product application": "Anwendung eines Bondure Fliesenprodukts",
    Floor: "Boden",
    "Floor Products": "Bodenprodukte",
    "Reliable surface preparation.": "Zuverlässige Untergrundvorbereitung.",
    "Bondure floor product application": "Anwendung eines Bondure Bodenprodukts",
    Cleaner: "Reiniger",
    "Tile Cleaner": "Fliesenreiniger",
    "Care for finished tile surfaces.": "Pflege für fertiggestellte Fliesenflächen.",
    "Bondure tile cleaner product": "Bondure Fliesenreiniger",
    Products: "Produkte",
    "Product filters": "Produktfilter",
    "Product sub category": "Produktunterkategorie",
    Clear: "Zurücksetzen",
    "Tile adhesives": "Fliesenkleber",
    "AAC joining solutions": "Porenbeton-Fugenlösungen",
    Grout: "Fugenmörtel",
    "Floor screed": "Estrich",
    Plaster: "Putz",
    "Tile cleaner": "Fliesenreiniger",
    Warranties: "Garantien",
    "1 Year": "1 Jahr",
    "5 Year": "5 Jahre",
    "10 Year": "10 Jahre",
    Lifetime: "Lebenslang",
    Country: "Land",
    India: "Indien",
    "Export markets": "Exportmärkte",
    "For AAC Blocks": "Für Porenbetonsteine",
    "Engineered for AAC block chemistry — smooth 2–3 mm joints with bond strength exceeding IS 2250 masonry requirements.":
      "Auf die Eigenschaften von Porenbeton abgestimmt: glatte 2–3-mm-Fugen mit einer Haftfestigkeit über den Anforderungen der Mauerwerksnorm IS 2250.",
    "Self-curing thin-bed formulation for precision coursing — no water curing required after application.":
      "Selbsthärtende Dünnbettrezeptur für präzise Steinlagen; nach der Anwendung ist keine Wassernachbehandlung erforderlich.",
    "Premium polymer-modified tile adhesive for vitrified, ceramic, and natural stone — high grab with low shrinkage.":
      "Hochwertiger polymermodifizierter Fliesenkleber für Feinsteinzeug, Keramik und Naturstein; hohe Anfangshaftung bei geringer Schwindung.",
    "Water-resistant fix for bathrooms, kitchens, and external facades — tested for Indian temperature cycles.":
      "Wasserbeständige Befestigung für Bäder, Küchen und Außenfassaden; für indische Temperaturzyklen geprüft.",
    "Non-slip formulation for large-format vitrified tiles on floors and vertical stone cladding applications.":
      "Rutschfeste Rezeptur für großformatiges Feinsteinzeug auf Böden und vertikale Steinverkleidungen.",
    "Stain-resistant, flexible grout for wet areas — micro-sealed surface repels oils and cleaning agents.":
      "Fleckenbeständiger, flexibler Fugenmörtel für Nassbereiche; die mikroversiegelte Oberfläche weist Öle und Reinigungsmittel ab.",
    "Elastomeric grout for facades and high-movement joints — colour-stable in UV exposure.":
      "Elastomerischer Fugenmörtel für Fassaden und stark bewegte Fugen; farbstabil bei UV-Belastung.",
    "Cementitious floor screed for leveling beds before tile fixing — 10–40 mm thickness with controlled shrinkage.":
      "Zementestrich zum Ausgleichen vor der Fliesenverlegung; 10–40 mm Schichtdicke bei kontrollierter Schwindung.",
    "Faster-set screed for thin beds (5–20 mm) on indoor and covered external floors.":
      "Schnell abbindender Estrich für dünne Schichten (5–20 mm) auf Innenböden und überdachten Außenflächen.",
    "Interior wall plaster for brick, concrete, and AAC — smooth finish with reliable coverage at 12 mm coats.":
      "Innenwandputz für Ziegel, Beton und Porenbeton; glatte Oberfläche und zuverlässige Deckung bei 12-mm-Schichten.",
    "Weather-resistant exterior render for brick and concrete facades.":
      "Witterungsbeständiger Außenputz für Ziegel- und Betonfassaden.",
    "Concentrate cleaner for ceramic and vitrified tiles — removes cement haze after installation.":
      "Reinigungskonzentrat für Keramik und Feinsteinzeug; entfernt Zementschleier nach der Verlegung.",
    "Gentle cleaner for natural stone and marble — suited to efflorescence and routine maintenance.":
      "Schonender Reiniger für Naturstein und Marmor; geeignet für Ausblühungen und die regelmäßige Pflege.",
    "More info": "Weitere Informationen",
    Contact: "Kontakt",
    "No products match your filters.": "Keine Produkte entsprechen Ihren Filtern.",
    "Tile Adhesive": "Fliesenkleber",
    "Floor Screed": "Estrich",
    "Bondure Product": "Bondure Produkt",
    "Referenced product standards": "Referenzierte Produktnormen",
    "EN tested": "EN-geprüft",
    "IS tested": "IS-geprüft",
    "Bondure AAC block jointing mortar bag": "Sack Bondure Porenbeton-Fugenmörtel",
    "Bondure Base B-555 flexible tile adhesive bag": "Sack Bondure Base B-555 Flex-Fliesenkleber",
    "Bondure Base B-565 flexible tile adhesive bag": "Sack Bondure Base B-565 Flex-Fliesenkleber",
    "Bondure Base B-585 sack": "Sack Bondure Base B-585",
    "Bondure Base B-555 sack": "Sack Bondure Base B-555",
    "Bondure Base B-565 sack": "Sack Bondure Base B-565",
  };

  const translate = (value, locale) => {
    if (locale !== "de") return value;
    if (german[value]) return german[value];
    if (value.startsWith("Warranty ")) {
      return value
        .replace("Warranty ", "Garantie ")
        .replaceAll("1 Year", "1 Jahr")
        .replaceAll("5 Year", "5 Jahre")
        .replaceAll("10 Year", "10 Jahre")
        .replace("Pack ", "Gebinde ");
    }
    return value;
  };

  const updateCatalogCount = (root, locale) => {
    const count = root.querySelector("[data-catalog-count]");
    if (!count) return;
    const visible = [...root.querySelectorAll(".product-card")].filter((card) => !card.hidden).length;
    count.textContent = locale === "de"
      ? `${visible} ${visible === 1 ? "Produkt" : "Produkte"} angezeigt`
      : `Showing ${visible} product${visible === 1 ? "" : "s"}`;
  };

  window.applyBondureProductsLocale = function applyBondureProductsLocale(locale) {
    currentLocale = locale === "de" ? "de" : "en";
    const root = document.querySelector(".products-page-scroll");
    if (!root) return;
    root.lang = currentLocale;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      const trimmed = node.nodeValue.trim();
      if (trimmed) {
        if (!originalText.has(node)) originalText.set(node, trimmed);
        const source = originalText.get(node);
        node.nodeValue = node.nodeValue.replace(trimmed, translate(source, currentLocale));
      }
      node = walker.nextNode();
    }

    const translatedAttributes = [
      "alt",
      "aria-label",
      "title",
      "data-eyebrow",
      "data-title",
      "data-description",
      "data-alt",
      "data-collection-category",
    ];
    root.querySelectorAll("*").forEach((element) => {
      if (!originalAttributes.has(element)) originalAttributes.set(element, {});
      const originals = originalAttributes.get(element);
      translatedAttributes.forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;
        if (!(attribute in originals)) originals[attribute] = element.getAttribute(attribute);
        element.setAttribute(attribute, translate(originals[attribute], currentLocale));
      });
    });

    const activeTile = root.querySelector("[data-product-range-tile].is-active");
    if (activeTile) {
      const hero = root.querySelector("[data-product-range]");
      const image = hero?.querySelector("[data-product-hero-image]");
      if (image) image.alt = activeTile.dataset.alt || "";
      const fields = [
        ["[data-product-hero-eyebrow]", "eyebrow"],
        ["[data-product-hero-title]", "title"],
        ["[data-product-hero-description]", "description"],
      ];
      fields.forEach(([selector, key]) => {
        const field = hero?.querySelector(selector);
        if (field) field.textContent = activeTile.dataset[key] || "";
      });
    }

    updateCatalogCount(root, currentLocale);
  };

  window.addEventListener("bondure:locale-change", (event) => {
    window.applyBondureProductsLocale(event.detail?.locale);
  });

  window.initProductsCatalog = function initProductsCatalog() {
    const catalog = document.querySelector(".product-catalog");
    if (!catalog || catalog.dataset.catalogReady === "true") return;
    catalog.dataset.catalogReady = "true";

    const cards = [...catalog.querySelectorAll(".product-card")];
    const countEl = catalog.querySelector("[data-catalog-count]");
    const emptyEl = catalog.querySelector("[data-catalog-empty]");
    const filters = catalog.querySelector(".product-catalog__filters");
    if (!filters) return;

    const categoryLabels = {
      "tile-adhesive": "Tile Adhesive",
      "aac-joining": "AAC Jointing Mortar",
      grout: "Grout",
      "floor-screed": "Floor Screed",
      plaster: "Plaster",
      "tile-cleaner": "Tile Cleaner",
    };

    const categoryStandards = {
      "aac-joining": ["EN 998-2", "IS 2250"],
      "tile-adhesive": ["EN 12004", "IS 15477"],
      grout: ["EN 13888", "IS tested"],
      "floor-screed": ["EN 13813", "IS 2571"],
      plaster: ["EN 998-1", "IS 1661"],
      "tile-cleaner": ["EN tested", "IS tested"],
    };

    cards.forEach((card) => {
      const categoryKey = card.dataset.categories;
      const slug = card.dataset.productSlug;
      const title = card.querySelector(".product-card__title");
      const moreInfo = card.querySelector(".product-card__cta");
      const detailHref = slug ? `/products/${slug}` : null;

      if (!card.querySelector(".product-card__collection-category")) {
        const category = document.createElement("p");
        category.className = "product-card__collection-category";
        category.textContent =
          card.dataset.collectionCategory || categoryLabels[categoryKey] || "Bondure Product";
        title?.before(category);
      }

      if (!card.querySelector(".product-card__standards")) {
        const standards = document.createElement("div");
        standards.className = "product-card__standards";
        standards.setAttribute("aria-label", "Referenced product standards");
        standards.innerHTML = (categoryStandards[categoryKey] || ["EN tested", "IS tested"])
          .map((standard) => `<span>${standard}</span>`)
          .join("");
        card.querySelector(".product-card__actions")?.before(standards);
      }

      if (moreInfo) {
        moreInfo.textContent = "More info";
        if (detailHref) {
          moreInfo.setAttribute("href", detailHref);
        }
      }

      if (detailHref) {
        card.tabIndex = 0;
        card.setAttribute("role", "link");
        card.dataset.detailHref = detailHref;

        const openDetails = () => {
          window.location.href = detailHref;
        };

        card.addEventListener("click", (event) => {
          if (event.target.closest("a, button, sl-button, sl-checkbox")) return;
          openDetails();
        });

        card.addEventListener("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          openDetails();
        });
      }
    });

    const getSelected = (groupName) =>
      [...filters.querySelectorAll(`sl-checkbox[name="${groupName}"]`)]
        .filter((box) => box.checked)
        .map((box) => box.value);

    const matchesGroup = (values, cardValue) => {
      if (!values.length) return true;
      const cardValues = cardValue.split(",");
      return values.some((value) => cardValues.includes(value));
    };

    const applyFilters = () => {
      const categories = getSelected("category");
      const warranties = getSelected("warranty");
      const countries = getSelected("country");

      let visible = 0;

      cards.forEach((card) => {
        const show =
          matchesGroup(categories, card.dataset.categories || "") &&
          matchesGroup(warranties, card.dataset.warranties || "") &&
          matchesGroup(countries, card.dataset.countries || "");

        card.hidden = !show;
        if (show) visible += 1;
      });

      if (countEl) {
        countEl.textContent = currentLocale === "de"
          ? `${visible} ${visible === 1 ? "Produkt" : "Produkte"} angezeigt`
          : `Showing ${visible} product${visible === 1 ? "" : "s"}`;
      }

      if (emptyEl) {
        emptyEl.hidden = visible > 0;
      }
    };

    filters.addEventListener("sl-change", applyFilters);

    filters.querySelectorAll("[data-clear-group]").forEach((button) => {
      button.addEventListener("click", () => {
        const group = button.dataset.clearGroup;
        filters.querySelectorAll(`sl-checkbox[name="${group}"]`).forEach((box) => {
          box.checked = false;
        });
        applyFilters();
      });
    });

    window.applyProductsCatalogCategoryFilter = (categoryValues) => {
      const values = (Array.isArray(categoryValues) ? categoryValues : String(categoryValues).split(","))
        .map((value) => value.trim())
        .filter(Boolean);

      filters.querySelectorAll('sl-checkbox[name="category"]').forEach((box) => {
        box.checked = values.includes(box.value);
      });
      applyFilters();
    };

    applyFilters();
    window.applyBondureProductsLocale(currentLocale);
  };
})();
