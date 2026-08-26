export const CATEGORY_LABELS = {
  "tile-adhesive": "Tile Adhesive",
  "aac-joining": "AAC Jointing Mortar",
  grout: "Grout",
  "floor-screed": "Floor Screed",
  plaster: "Plaster",
  "tile-cleaner": "Tile Cleaner",
};

export const CATEGORY_STANDARDS = {
  "aac-joining": ["EN 998-2", "IS 2250"],
  "tile-adhesive": ["EN 12004", "IS 15477"],
  grout: ["EN 13888", "IS tested"],
  "floor-screed": ["EN 13813", "IS 2571"],
  plaster: ["EN 998-1", "IS 1661"],
  "tile-cleaner": ["EN tested", "IS tested"],
};

/** Per-bag patch colours — pills + spec bento metrics/glow match the pack band. */
function buildPatchAccent(hex) {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  const rgb = `${r}, ${g}, ${b}`;

  return {
    hex,
    rgb,
    soft: `rgba(${rgb}, 0.12)`,
    muted: `rgba(${rgb}, 0.72)`,
    glowRgb: rgb,
    glowShadow: `rgba(${rgb}, 0.18)`,
  };
}

export const PRODUCT_PATCH_ACCENTS = {
  b555: buildPatchAccent("#6B3FA0"),
  b565: buildPatchAccent("#BE1E2D"),
  b585: buildPatchAccent("#1F4D47"),
};

export const PRODUCT_INTRO_ACCENT = PRODUCT_PATCH_ACCENTS.b555;

export const PRODUCT_SPEC_ACCENT = PRODUCT_PATCH_ACCENTS.b555;

export function getProductPatchId(product) {
  const match = product.image?.match(/b(555|565|585)/i);
  return match ? `b${match[1]}` : "b555";
}

export function getProductPatchAccent(product) {
  const patchId = getProductPatchId(product);
  return PRODUCT_PATCH_ACCENTS[patchId] || PRODUCT_PATCH_ACCENTS.b555;
}

export const CATEGORY_SPECS = {
  "aac-joining": {
    primary: "120 ft²",
    primaryLabel: "Coverage per bag",
    primaryCopy:
      "Per 40 kg bag at a 3 mm joint — designed for fast, precise AAC masonry.",
    secondary: "20 min",
    secondaryLabel: "Open time",
    tertiary: "120 min",
    tertiaryLabel: "Pot life",
    bondsLabel: "Suitable for",
    bonds:
      "AAC blocks, concrete blocks, fly-ash bricks, and lightweight masonry units.",
  },
  "tile-adhesive": {
    primary: "60 ft²",
    primaryLabel: "Coverage per bag",
    primaryCopy:
      "Per 20 kg bag at a 3 mm bed — efficient spread for large-format tiles.",
    secondary: "20 min",
    secondaryLabel: "Open time",
    tertiary: "120 min",
    tertiaryLabel: "Pot life",
    bondsLabel: "Bonds to",
    bonds:
      "Vitrified and ceramic tile, natural stone, concrete, plaster, and existing tile surfaces.",
  },
  grout: {
    primary: "45 ft²",
    primaryLabel: "Joint coverage",
    primaryCopy:
      "Typical coverage for a 5 kg pack, depending on tile and joint dimensions.",
    secondary: "30 min",
    secondaryLabel: "Working time",
    tertiary: "24 hr",
    tertiaryLabel: "Full cure",
    bondsLabel: "Designed for",
    bonds:
      "Ceramic, vitrified, porcelain, and natural-stone tile joints in dry and wet areas.",
  },
  "floor-screed": {
    primary: "25 ft²",
    primaryLabel: "Coverage per bag",
    primaryCopy:
      "Per 20 kg bag at a 10 mm layer on a prepared floor substrate.",
    secondary: "45 min",
    secondaryLabel: "Working time",
    tertiary: "24 hr",
    tertiaryLabel: "Walkable after",
    bondsLabel: "Suitable for",
    bonds:
      "Concrete slabs, cement screeds, internal floors, and covered external substrates.",
  },
  plaster: {
    primary: "18 ft²",
    primaryLabel: "Coverage per bag",
    primaryCopy:
      "Per 25 kg bag at a 12 mm coat, subject to substrate texture and preparation.",
    secondary: "30 min",
    secondaryLabel: "Working time",
    tertiary: "90 min",
    tertiaryLabel: "Pot life",
    bondsLabel: "Suitable for",
    bonds:
      "AAC blockwork, clay brick, concrete walls, and cementitious masonry surfaces.",
  },
  "tile-cleaner": {
    primary: "200 ft²",
    primaryLabel: "Coverage per pack",
    primaryCopy:
      "Approximate coverage for a 5 L pack when diluted for routine post-installation cleaning.",
    secondary: "5 min",
    secondaryLabel: "Dwell time",
    tertiary: "120 min",
    tertiaryLabel: "Usable solution",
    bondsLabel: "Suitable for",
    bonds:
      "Ceramic and vitrified tiles, grout joints, and compatible natural-stone finishes.",
  },
};

export const CATEGORY_FEATURES = {
  "aac-joining": {
    title: "AAC Joining Mortars",
    features: [
      {
        title: "Strong AAC-to-Block Bond",
        copy: "Superior adhesion strength that exceeds IS 2250 requirements for masonry mortar — engineered for AAC block chemistry.",
      },
      {
        title: "Smooth 2–3 mm Thin Joints",
        copy: "Spreads evenly for uniform thin-bed joints — cleaner finishes, precise coursing, and faster wall runs on site.",
      },
      {
        title: "Minimized Shrinkage Cracks",
        copy: "Polymer modification reduces drying shrinkage stress — keeping AAC joints tight across long wall runs and high-rise cores.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&w=900&q=80",
        alt: "Stacked AAC blocks on construction site",
      },
      {
        src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80",
        alt: "Masonry work with lightweight AAC blocks",
      },
      {
        src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80",
        alt: "AAC block building under construction",
      },
    ],
  },
  "tile-adhesive": {
    title: "Tile Adhesives",
    features: [
      {
        title: "High Grab for Large Formats",
        copy: "Non-slip hold keeps heavy vitrified and stone tiles aligned during placement — even on vertical surfaces.",
      },
      {
        title: "Water & Heat Resistance",
        copy: "Formulated for bathrooms, kitchens, and facades — stable bond through Indian temperature cycles and wet-area exposure.",
      },
      {
        title: "Controlled Shrinkage",
        copy: "Polymer-modified mix limits drying shrinkage for flatter beds and fewer stress cracks behind tile finishes.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
        alt: "Large-format floor tiles being installed",
      },
      {
        src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80",
        alt: "Tiled bathroom interior",
      },
      {
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
        alt: "Modern tiled living space",
      },
    ],
  },
  grout: {
    title: "Grout Systems",
    features: [
      {
        title: "Stain-Resistant Joints",
        copy: "Micro-sealed surfaces repel oils, cleaning agents, and everyday soiling in kitchens and wet rooms.",
      },
      {
        title: "Flexible Movement Accommodation",
        copy: "Elastomeric formulations handle thermal movement and substrate deflection without joint cracking.",
      },
      {
        title: "Colour-Stable Finishes",
        copy: "UV-stable pigments maintain consistent joint colour on facades and high-traffic interior floors.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
        alt: "Close-up of tiled floor with clean grout lines",
      },
      {
        src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
        alt: "Tiled shower wall with precise joints",
      },
      {
        src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
        alt: "Stone and tile facade detail",
      },
    ],
  },
  "floor-screed": {
    title: "Floor Screeds",
    features: [
      {
        title: "Level Beds Before Tile Fix",
        copy: "Controlled-flow mixes create flat, dimensionally stable beds from 5–40 mm for reliable tile adhesion.",
      },
      {
        title: "Shrinkage-Controlled Mixes",
        copy: "Low-shrink formulations reduce curling and cracking across large floor plates and long runs.",
      },
      {
        title: "Site-Ready Working Times",
        copy: "Balanced set profiles support walkable surfaces and onward tile work within predictable windows.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
        alt: "Floor screeding on a construction site",
      },
      {
        src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80",
        alt: "Interior floor preparation before finishes",
      },
      {
        src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
        alt: "Workers leveling a concrete floor slab",
      },
    ],
  },
  plaster: {
    title: "Plaster & Render",
    features: [
      {
        title: "Smooth Wall Finishes",
        copy: "Spreadable mixes deliver even 10–15 mm coats on brick, concrete, and AAC with reliable coverage rates.",
      },
      {
        title: "Interior & Exterior Grades",
        copy: "Dedicated formulations for internal wall finishing and weather-resistant exterior render systems.",
      },
      {
        title: "Strong Substrate Bond",
        copy: "Modified adhesion helps plaster keys to prepared masonry and concrete backgrounds without delamination.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
        alt: "Plaster application on interior walls",
      },
      {
        src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80",
        alt: "Rendered building facade",
      },
      {
        src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
        alt: "Masonry wall being finished on site",
      },
    ],
  },
  "tile-cleaner": {
    title: "Tile Care",
    features: [
      {
        title: "Post-Install Haze Removal",
        copy: "Lifts cementitious residue and grout film from ceramic and vitrified surfaces after fixing.",
      },
      {
        title: "Routine Maintenance Safe",
        copy: "Balanced chemistry for regular cleaning without attacking grout colour or glaze finishes.",
      },
      {
        title: "Stone-Compatible Options",
        copy: "Dedicated cleaners for marble and natural stone — gentle on sensitive surfaces and efflorescence.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80",
        alt: "Clean tiled bathroom surfaces",
      },
      {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
        alt: "Polished tile floor after cleaning",
      },
      {
        src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
        alt: "Tile installation finishing work",
      },
    ],
  },
};

export const PRODUCTS = [
  {
    slug: "bondure-aac-block-jointing-mortar",
    title: "Bondure AAC Block Jointing Mortar",
    description: "For AAC Blocks",
    meta: "Warranty 5 Year, 10 Year · Green Pro, IS 2250",
    category: "aac-joining",
    collectionCategory: "AAC Jointing Mortar",
    image: "/products/bondure-base-b585-bag.webp",
    imageAlt: "Bondure AAC block jointing mortar bag",
    line: "aac-joining",
  },
  {
    slug: "bondure-aac-joint-pro",
    title: "Bondure AAC Joint Pro",
    description:
      "Engineered for AAC block chemistry — smooth 2–3 mm joints with bond strength exceeding IS 2250 masonry requirements.",
    meta: "Warranty 10 Year · Green Pro",
    category: "aac-joining",
    collectionCategory: "AAC Jointing Mortar",
    image: "/products/bondure-base-b555-bag.webp",
    imageAlt: "Bondure AAC Joint Pro mortar bag",
    line: "aac-joining",
  },
  {
    slug: "bondure-thinbed-aac",
    title: "Bondure ThinBed AAC",
    description:
      "Self-curing thin-bed formulation for precision coursing — no water curing required after application.",
    meta: "Warranty 1 Year, 5 Year · IS 2250",
    category: "aac-joining",
    collectionCategory: "AAC Jointing Mortar",
    image: "/products/bondure-base-b565-bag.webp",
    imageAlt: "Bondure ThinBed AAC mortar bag",
    line: "aac-joining",
  },
  {
    slug: "bondure-align-adhesive-b-s55",
    title: "Bondure Align Adhesive B-S55",
    description:
      "Premium polymer-modified tile adhesive for vitrified, ceramic, and natural stone — high grab with low shrinkage.",
    meta: "Warranty 5 Year, 10 Year · Green Pro, ISO 13007",
    category: "tile-adhesive",
    collectionCategory: "Tile Adhesive",
    image: "/products/bondure-base-b585-bag.webp",
    imageAlt: "Bondure Align Adhesive B-S55 bag",
    line: "tile-adhesive",
  },
  {
    slug: "bondure-ultratile-adhesive",
    title: "Bondure UltraTile Adhesive",
    description:
      "Water-resistant fix for bathrooms, kitchens, and external facades — tested for Indian temperature cycles.",
    meta: "Warranty 10 Year · Green Pro",
    category: "tile-adhesive",
    collectionCategory: "Tile Adhesive",
    image: "/products/bondure-base-b555-bag.webp",
    imageAlt: "Bondure UltraTile Adhesive bag",
    line: "tile-adhesive",
  },
  {
    slug: "bondure-tilegrip-pro",
    title: "Bondure TileGrip Pro",
    description:
      "Non-slip formulation for large-format vitrified tiles on floors and vertical stone cladding applications.",
    meta: "Warranty 5 Year · ISO 13007",
    category: "tile-adhesive",
    collectionCategory: "Tile Adhesive",
    image: "/products/bondure-base-b565-bag.webp",
    imageAlt: "Bondure TileGrip Pro adhesive bag",
    line: "tile-adhesive",
  },
  {
    slug: "bondure-aquaguard-grout",
    title: "Bondure AquaGuard Grout",
    description:
      "Stain-resistant, flexible grout for wet areas — micro-sealed surface repels oils and cleaning agents.",
    meta: "Warranty 5 Year, 10 Year · Green Pro, HPD",
    category: "grout",
    collectionCategory: "Grout",
    image: "/products/bondure-base-b585-bag.webp",
    imageAlt: "Bondure AquaGuard Grout pack",
    line: "grout",
  },
  {
    slug: "bondure-flexjoint-grout",
    title: "Bondure FlexJoint Grout",
    description:
      "Elastomeric grout for facades and high-movement joints — colour-stable in UV exposure.",
    meta: "Warranty 1 Year, 5 Year · HPD",
    category: "grout",
    collectionCategory: "Grout",
    image: "/products/bondure-base-b555-bag.webp",
    imageAlt: "Bondure FlexJoint Grout pack",
    line: "grout",
  },
  {
    slug: "bondure-levelbed-screed",
    title: "Bondure LevelBed Screed",
    description:
      "Cementitious floor screed for leveling beds before tile fixing — 10–40 mm thickness with controlled shrinkage.",
    meta: "Warranty 5 Year, 10 Year · IS 1199",
    category: "floor-screed",
    collectionCategory: "Floor Screed",
    image: "/products/bondure-base-b565-bag.webp",
    imageAlt: "Bondure LevelBed Screed bag",
    line: "floor-screed",
  },
  {
    slug: "bondure-rapidlevel-screed",
    title: "Bondure RapidLevel Screed",
    description:
      "Faster-set screed for thin beds (5–20 mm) on indoor and covered external floors.",
    meta: "Warranty 5 Year · IS 1199",
    category: "floor-screed",
    collectionCategory: "Floor Screed",
    image: "/products/bondure-base-b585-bag.webp",
    imageAlt: "Bondure RapidLevel Screed bag",
    line: "floor-screed",
  },
  {
    slug: "bondure-wallfinish-plaster",
    title: "Bondure WallFinish Plaster",
    description:
      "Interior wall plaster for brick, concrete, and AAC — smooth finish with reliable coverage at 12 mm coats.",
    meta: "Warranty 5 Year, 10 Year · IS 1661",
    category: "plaster",
    collectionCategory: "Plaster",
    image: "/products/bondure-base-b555-bag.webp",
    imageAlt: "Bondure WallFinish Plaster bag",
    line: "plaster",
  },
  {
    slug: "bondure-exterender-plaster",
    title: "Bondure ExteRender Plaster",
    description: "Weather-resistant exterior render for brick and concrete facades.",
    meta: "Warranty 10 Year · IS 1661",
    category: "plaster",
    collectionCategory: "Plaster",
    image: "/products/bondure-base-b565-bag.webp",
    imageAlt: "Bondure ExteRender Plaster bag",
    line: "plaster",
  },
  {
    slug: "bondure-cleanshine",
    title: "Bondure CleanShine",
    description:
      "Concentrate cleaner for ceramic and vitrified tiles — removes cement haze after installation.",
    meta: "Warranty 1 Year · Pack 5 L",
    category: "tile-cleaner",
    collectionCategory: "Tile Cleaner",
    image: "/products/bondure-base-b585-bag.webp",
    imageAlt: "Bondure CleanShine cleaner pack",
    line: "tile-cleaner",
  },
  {
    slug: "bondure-stonecare-cleaner",
    title: "Bondure StoneCare Cleaner",
    description:
      "Gentle cleaner for natural stone and marble — suited to efflorescence and routine maintenance.",
    meta: "Warranty 1 Year · Pack 5 L",
    category: "tile-cleaner",
    collectionCategory: "Tile Cleaner",
    image: "/products/bondure-base-b555-bag.webp",
    imageAlt: "Bondure StoneCare Cleaner pack",
    line: "tile-cleaner",
  },
];

export function parseProductMeta(meta = "") {
  const segments = meta
    .split("·")
    .map((segment) => segment.trim())
    .filter(Boolean);

  const warranties = [];
  let packInfo = null;
  const certifications = [];

  for (const segment of segments) {
    if (/^warranty/i.test(segment)) {
      segment
        .replace(/^warranty\s+/i, "")
        .split(",")
        .forEach((part) => {
          const trimmed = part.trim();
          if (trimmed) warranties.push(trimmed);
        });
      continue;
    }

    if (/^pack\s/i.test(segment)) {
      packInfo = segment;
      continue;
    }

    segment.split(",").forEach((part) => {
      const trimmed = part.trim();
      if (trimmed) certifications.push(trimmed);
    });
  }

  return { warranties, certifications, packInfo };
}

export function getProductStandardsDetail(category, meta = "") {
  const categoryStandards = CATEGORY_STANDARDS[category] || ["EN tested", "IS tested"];
  let enStandard = categoryStandards.find((standard) => /^EN/i.test(standard)) || "EN tested";
  let isStandard = categoryStandards.find((standard) => /^IS/i.test(standard)) || "IS tested";

  const isCode = meta.match(/\bIS\s*\d+/i)?.[0];
  if (isCode) isStandard = isCode.replace(/\s+/g, " ").trim();

  const isoCode = meta.match(/\bISO\s*[\d-]+/i)?.[0]?.replace(/\s+/g, " ").trim() || null;

  return { enStandard, isStandard, isoCode };
}

const DEMO_VIDEO = {
  type: "video",
  src: "/home-media/AACBLOCKDEMO.mp4",
  alt: "AAC block application demo",
  poster: "/home-media/aac-joining.webp",
};

const SECONDARY_VIEW_BY_CATEGORY = {
  "aac-joining": "/home-media/aac-blocks.webp",
  "tile-adhesive": "/spotlight/spotlight-img-1.png",
  grout: "/home-media/adhesive-work-2.webp",
  "floor-screed": "/home-media/materials-research-lab.webp",
  plaster: "/home-media/mortar-application.png",
  "tile-cleaner": "/home-media/site-testing.webp",
};

function normalizeView(view, fallback, index) {
  const type = view.type === "video" ? "video" : "image";
  const mediaFit =
    view.mediaFit === "cover" || view.mediaFit === "contain"
      ? view.mediaFit
      : type === "video"
        ? "cover"
        : /bag\.png$/i.test(view.src || fallback.src)
          ? "contain"
          : "cover";

  return {
    type,
    src: view.src || fallback.src,
    alt: view.alt || `${fallback.alt} — view ${index + 1}`,
    poster: view.poster || fallback.src,
    mediaFit,
  };
}

export function getProductViews(product) {
  const base = {
    src: product.image,
    alt: product.imageAlt || product.title,
  };

  if (Array.isArray(product.views) && product.views.length) {
    return product.views.map((view, index) => normalizeView(view, base, index));
  }

  const secondarySrc =
    SECONDARY_VIEW_BY_CATEGORY[product.category] || "/home-media/site-testing.webp";

  return [
    {
      type: "image",
      src: base.src,
      alt: base.alt,
      poster: base.src,
      mediaFit: "contain",
    },
    {
      ...DEMO_VIDEO,
      mediaFit: "cover",
    },
    {
      type: "image",
      src: secondarySrc,
      alt: `${base.alt} — on site`,
      poster: secondarySrc,
      mediaFit: "cover",
    },
  ];
}

export function getProductBySlug(slug) {
  const product = PRODUCTS.find((item) => item.slug === slug);
  if (!product) return null;

  const category = product.category;
  const metaParsed = parseProductMeta(product.meta);
  const standardsDetail = getProductStandardsDetail(category, product.meta);
  const patchAccent = getProductPatchAccent(product);

  return {
    ...product,
    categoryLabel: CATEGORY_LABELS[category] || "Bondure Product",
    standards: CATEGORY_STANDARDS[category] || ["EN tested", "IS tested"],
    standardsDetail,
    metaParsed,
    views: getProductViews(product),
    patchId: getProductPatchId(product),
    introAccent: patchAccent,
    accent: patchAccent,
    specs: CATEGORY_SPECS[category] || CATEGORY_SPECS["tile-adhesive"],
    features: CATEGORY_FEATURES[category] || CATEGORY_FEATURES["tile-adhesive"],
  };
}

export function getAllProductSlugs() {
  return PRODUCTS.map((product) => product.slug);
}

const DE_CATEGORY_LABELS = {
  "tile-adhesive": "Fliesenkleber",
  "aac-joining": "Porenbeton-Fugenmörtel",
  grout: "Fugenmörtel",
  "floor-screed": "Bodenestrich",
  plaster: "Putz",
  "tile-cleaner": "Fliesenreiniger",
};

const DE_PRODUCT_COPY = {
  "bondure-aac-block-jointing-mortar": {
    description: "Für Porenbetonsteine",
    imageAlt: "Sack Bondure Porenbeton-Fugenmörtel",
  },
  "bondure-aac-joint-pro": {
    description: "Für die Materialeigenschaften von Porenbeton entwickelt: gleichmäßige 2–3-mm-Fugen mit einer Haftfestigkeit, die die Anforderungen von IS 2250 an Mauermörtel übertrifft.",
    imageAlt: "Sack Bondure AAC Joint Pro Mörtel",
  },
  "bondure-thinbed-aac": {
    description: "Selbsthärtender Dünnbettmörtel für präzise Lagerfugen; nach der Verarbeitung ist keine Wassernachbehandlung erforderlich.",
    imageAlt: "Sack Bondure ThinBed AAC Mörtel",
  },
  "bondure-align-adhesive-b-s55": {
    description: "Hochwertiger polymermodifizierter Fliesenkleber für Feinsteinzeug, Keramik und Naturstein mit hoher Anfangshaftung und geringer Schwindung.",
    imageAlt: "Sack Bondure Align Adhesive B-S55",
  },
  "bondure-ultratile-adhesive": {
    description: "Wasserbeständiger Kleber für Bäder, Küchen und Außenfassaden, geprüft für indische Temperaturzyklen.",
    imageAlt: "Sack Bondure UltraTile Adhesive",
  },
  "bondure-tilegrip-pro": {
    description: "Standfeste Rezeptur für großformatiges Feinsteinzeug auf Böden und vertikale Natursteinbekleidungen.",
    imageAlt: "Sack Bondure TileGrip Pro Fliesenkleber",
  },
  "bondure-aquaguard-grout": {
    description: "Fleckenbeständiger, flexibler Fugenmörtel für Nassbereiche; die mikroversiegelte Oberfläche weist Öle und Reinigungsmittel ab.",
    imageAlt: "Gebinde Bondure AquaGuard Grout",
  },
  "bondure-flexjoint-grout": {
    description: "Elastomerer Fugenmörtel für Fassaden und stark bewegungsbeanspruchte Fugen mit UV-beständiger Farbe.",
    imageAlt: "Gebinde Bondure FlexJoint Grout",
  },
  "bondure-levelbed-screed": {
    description: "Zementärer Bodenestrich für Ausgleichsschichten vor der Fliesenverlegung, für 10–40 mm Dicke und mit kontrollierter Schwindung.",
    imageAlt: "Sack Bondure LevelBed Screed",
  },
  "bondure-rapidlevel-screed": {
    description: "Schnell abbindender Estrich für dünne Schichten von 5–20 mm auf Innenböden und überdachten Außenflächen.",
    imageAlt: "Sack Bondure RapidLevel Screed",
  },
  "bondure-wallfinish-plaster": {
    description: "Innenwandputz für Ziegel, Beton und Porenbeton mit glatter Oberfläche und verlässlicher Ergiebigkeit bei 12-mm-Schichten.",
    imageAlt: "Sack Bondure WallFinish Plaster",
  },
  "bondure-exterender-plaster": {
    description: "Witterungsbeständiger Außenputz für Ziegel- und Betonfassaden.",
    imageAlt: "Sack Bondure ExteRender Plaster",
  },
  "bondure-cleanshine": {
    description: "Reinigungskonzentrat für Keramik und Feinsteinzeug, das Zementschleier nach der Verlegung entfernt.",
    imageAlt: "Gebinde Bondure CleanShine Reiniger",
  },
  "bondure-stonecare-cleaner": {
    description: "Schonender Reiniger für Naturstein und Marmor, geeignet für Ausblühungen und die laufende Pflege.",
    imageAlt: "Gebinde Bondure StoneCare Cleaner",
  },
};

const DE_CATEGORY_SPECS = {
  "aac-joining": {
    primaryLabel: "Ergiebigkeit pro Sack",
    primaryCopy: "Pro 40-kg-Sack bei einer 3-mm-Fuge, entwickelt für schnelles und präzises Mauerwerk aus Porenbeton.",
    secondaryLabel: "Offene Zeit",
    tertiaryLabel: "Verarbeitungszeit",
    bondsLabel: "Geeignet für",
    bonds: "Porenbetonsteine, Betonsteine, Flugascheziegel und leichte Mauersteine.",
  },
  "tile-adhesive": {
    primaryLabel: "Ergiebigkeit pro Sack",
    primaryCopy: "Pro 20-kg-Sack bei einem 3-mm-Bett, für einen effizienten Auftrag bei großformatigen Fliesen.",
    secondaryLabel: "Offene Zeit",
    tertiaryLabel: "Verarbeitungszeit",
    bondsLabel: "Haftet auf",
    bonds: "Feinsteinzeug und Keramikfliesen, Naturstein, Beton, Putz und vorhandenen Fliesenflächen.",
  },
  grout: {
    primaryLabel: "Fugenreichweite",
    primaryCopy: "Typische Ergiebigkeit eines 5-kg-Gebindes, abhängig von Fliesen- und Fugenabmessungen.",
    secondaryLabel: "Verarbeitungszeit",
    tertiaryLabel: "Vollständig ausgehärtet",
    bondsLabel: "Entwickelt für",
    bonds: "Fugen von Keramik, Feinsteinzeug, Porzellan und Naturstein in Trocken- und Nassbereichen.",
  },
  "floor-screed": {
    primaryLabel: "Ergiebigkeit pro Sack",
    primaryCopy: "Pro 20-kg-Sack bei einer 10-mm-Schicht auf einem vorbereiteten Bodenuntergrund.",
    secondaryLabel: "Verarbeitungszeit",
    tertiaryLabel: "Begehbar nach",
    bondsLabel: "Geeignet für",
    bonds: "Betonplatten, Zementestriche, Innenböden und überdachte Außenflächen.",
  },
  plaster: {
    primaryLabel: "Ergiebigkeit pro Sack",
    primaryCopy: "Pro 25-kg-Sack bei einer 12-mm-Schicht, abhängig von Struktur und Vorbereitung des Untergrunds.",
    secondaryLabel: "Verarbeitungszeit",
    tertiaryLabel: "Topfzeit",
    bondsLabel: "Geeignet für",
    bonds: "Porenbetonmauerwerk, Ziegel, Betonwände und zementgebundene Mauerwerksflächen.",
  },
  "tile-cleaner": {
    primaryLabel: "Reichweite pro Gebinde",
    primaryCopy: "Ungefähre Reichweite eines 5-L-Gebindes bei Verdünnung für die regelmäßige Reinigung nach der Verlegung.",
    secondaryLabel: "Einwirkzeit",
    tertiaryLabel: "Verwendbare Lösung",
    bondsLabel: "Geeignet für",
    bonds: "Keramik- und Feinsteinzeugfliesen, Fugen sowie geeignete Natursteinoberflächen.",
  },
};

const DE_CATEGORY_FEATURES = {
  "aac-joining": {
    title: "Porenbeton-Fugenmörtel",
    features: [
      ["Starke Haftung auf Porenbetonsteinen", "Hervorragende Haftfestigkeit, die die Anforderungen von IS 2250 an Mauermörtel übertrifft und auf die Materialeigenschaften von Porenbeton abgestimmt ist."],
      ["Gleichmäßige 2–3-mm-Dünnbettfugen", "Lässt sich gleichmäßig für einheitliche Dünnbettfugen verteilen und ermöglicht saubere Oberflächen, präzise Lagerfugen und schnelleren Baufortschritt."],
      ["Weniger Schwindrisse", "Die Polymermodifizierung reduziert Spannungen durch Trocknungsschwindung und hält Porenbetonfugen auch bei langen Wänden und Hochhauskernen dicht."],
    ],
    gallery: ["Gestapelte Porenbetonsteine auf einer Baustelle", "Mauerarbeiten mit leichten Porenbetonsteinen", "Porenbetongebäude im Bau"],
  },
  "tile-adhesive": {
    title: "Fliesenkleber",
    features: [
      ["Hohe Anfangshaftung für Großformate", "Die standfeste Haftung hält schwere Feinsteinzeug- und Natursteinplatten bei der Verlegung in Position, auch an senkrechten Flächen."],
      ["Wasser- und hitzebeständig", "Für Bäder, Küchen und Fassaden formuliert, mit stabiler Haftung bei indischen Temperaturzyklen und in Nassbereichen."],
      ["Kontrollierte Schwindung", "Die polymermodifizierte Mischung begrenzt die Trocknungsschwindung und sorgt für ebenere Betten und weniger Spannungsrisse hinter Fliesenbelägen."],
    ],
    gallery: ["Verlegung großformatiger Bodenfliesen", "Gefliestes Badezimmer", "Moderner gefliester Wohnraum"],
  },
  grout: {
    title: "Fugensysteme",
    features: [
      ["Fleckenbeständige Fugen", "Mikroversiegelte Oberflächen weisen Öle, Reinigungsmittel und alltägliche Verschmutzungen in Küchen und Nassräumen ab."],
      ["Flexible Bewegungsaufnahme", "Elastomere Rezepturen nehmen thermische Bewegung und Verformung des Untergrunds auf, ohne dass die Fugen reißen."],
      ["Farbstabile Oberflächen", "UV-beständige Pigmente erhalten eine gleichmäßige Fugenfarbe an Fassaden und stark beanspruchten Innenböden."],
    ],
    gallery: ["Nahaufnahme eines Fliesenbodens mit sauberen Fugen", "Geflieste Duschwand mit präzisen Fugen", "Detail einer Fassade aus Naturstein und Fliesen"],
  },
  "floor-screed": {
    title: "Bodenestriche",
    features: [
      ["Ebene Betten vor der Fliesenverlegung", "Mischungen mit kontrolliertem Fließverhalten erzeugen ebene, formstabile Betten von 5–40 mm für eine zuverlässige Fliesenhaftung."],
      ["Schwindungsarme Mischungen", "Schwindungsarme Rezepturen reduzieren Aufwölbung und Rissbildung auf großen Bodenflächen und langen Abschnitten."],
      ["Baustellengerechte Verarbeitungszeiten", "Ausgewogene Abbindeprofile ermöglichen begehbare Flächen und anschließende Fliesenarbeiten innerhalb planbarer Zeitfenster."],
    ],
    gallery: ["Estricharbeiten auf einer Baustelle", "Vorbereitung eines Innenbodens vor dem Oberbelag", "Arbeiter beim Nivellieren einer Betonbodenplatte"],
  },
  plaster: {
    title: "Putz und Außenputz",
    features: [
      ["Glatte Wandoberflächen", "Gut verteilbare Mischungen ergeben gleichmäßige 10–15-mm-Schichten auf Ziegel, Beton und Porenbeton mit verlässlicher Ergiebigkeit."],
      ["Qualitäten für innen und außen", "Spezielle Rezepturen für Innenwandoberflächen und witterungsbeständige Außenputzsysteme."],
      ["Starke Untergrundhaftung", "Die modifizierte Haftung unterstützt den sicheren Verbund von Putz mit vorbereitetem Mauerwerk und Beton ohne Ablösung."],
    ],
    gallery: ["Putzauftrag auf Innenwänden", "Verputzte Gebäudefassade", "Fertigstellung einer Mauerwerkswand auf der Baustelle"],
  },
  "tile-cleaner": {
    title: "Fliesenpflege",
    features: [
      ["Entfernung von Schleiern nach der Verlegung", "Löst zementgebundene Rückstände und Fugenmörtelfilm nach der Verlegung von Keramik- und Feinsteinzeugflächen."],
      ["Sicher für die regelmäßige Pflege", "Ausgewogene Chemie für die regelmäßige Reinigung, ohne Fugenfarbe oder Glasuroberflächen anzugreifen."],
      ["Optionen für Naturstein", "Spezielle Reiniger für Marmor und Naturstein, schonend zu empfindlichen Oberflächen und wirksam gegen Ausblühungen."],
    ],
    gallery: ["Saubere geflieste Badezimmerflächen", "Polierter Fliesenboden nach der Reinigung", "Abschlussarbeiten bei einer Fliesenverlegung"],
  },
};

function localizeStandardsDetail(detail) {
  return Object.fromEntries(
    Object.entries(detail).map(([key, value]) => [
      key,
      typeof value === "string" ? value.replace(/tested/gi, "geprüft") : value,
    ]),
  );
}

export function localizeProduct(product, locale = "en") {
  if (locale !== "de") return product;

  const copy = DE_PRODUCT_COPY[product.slug] || {};
  const featureCopy = DE_CATEGORY_FEATURES[product.category];
  const features = featureCopy
    ? {
        ...product.features,
        title: featureCopy.title,
        features: product.features.features.map((feature, index) => ({
          ...feature,
          title: featureCopy.features[index][0],
          copy: featureCopy.features[index][1],
        })),
        gallery: product.features.gallery.map((image, index) => ({
          ...image,
          alt: featureCopy.gallery[index],
        })),
      }
    : product.features;
  const imageAlt = copy.imageAlt || product.imageAlt;

  return {
    ...product,
    description: copy.description || product.description,
    imageAlt,
    categoryLabel: DE_CATEGORY_LABELS[product.category] || "Bondure Produkt",
    standards: product.standards.map((standard) => standard.replace(/tested/gi, "geprüft")),
    standardsDetail: localizeStandardsDetail(product.standardsDetail),
    metaParsed: {
      ...product.metaParsed,
      warranties: product.metaParsed.warranties.map((warranty) =>
        warranty.replace(/\b1 Year\b/gi, "1 Jahr").replace(/\bYear(s)?\b/gi, "Jahre")
      ),
      packInfo: product.metaParsed.packInfo?.replace(/^Pack\b/i, "Gebinde") || null,
    },
    views: product.views.map((view, index) => ({
      ...view,
      alt: index === 0
        ? imageAlt
        : index === 1
          ? "Demo zur Verarbeitung von Porenbetonsteinen"
          : `${imageAlt} – im Einsatz`,
    })),
    specs: {
      ...product.specs,
      secondary: product.specs.secondary.replace(/\bhr\b/i, "Std."),
      tertiary: product.specs.tertiary.replace(/\bhr\b/i, "Std."),
      ...DE_CATEGORY_SPECS[product.category],
    },
    features,
  };
}
