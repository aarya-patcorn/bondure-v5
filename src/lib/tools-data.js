/**
 * Bondure Tools — shared taxonomy, SKUs, and coverage constants.
 */

export const CATEGORIES = [
  {
    id: "tile-adhesive",
    label: "Tile adhesive",
    short: "Adhesive",
    tool: "adhesive",
    description: "Floor & wall tile fix for ceramic, vitrified, and stone.",
  },
  {
    id: "aac-joining",
    label: "AAC joining solutions",
    short: "AAC joining",
    tool: "aac",
    description: "Thin-bed mortars for AAC block masonry.",
  },
  {
    id: "grout",
    label: "Grout",
    short: "Grout",
    tool: "grout",
    description: "Joint filling for wet areas, facades, and floors.",
  },
  {
    id: "floor-screed",
    label: "Floor screed",
    short: "Screed",
    tool: "screed",
    description: "Underlay and leveling beds before tile fixing.",
  },
  {
    id: "plaster",
    label: "Plaster",
    short: "Plaster",
    tool: "plaster",
    description: "Interior and exterior wall plaster / render.",
  },
  {
    id: "tile-cleaner",
    label: "Tile cleaner",
    short: "Cleaner",
    tool: "cleaner",
    description: "Post-install cleaning and maintenance concentrates.",
  },
];

export const TOOLS = [
  {
    id: "adhesive",
    category: "tile-adhesive",
    title: "Tile adhesive coverage",
    copy: "Estimate bags from floor area and bed thickness.",
    illustration: "/tools/tool-tile-adhesive.png",
  },
  {
    id: "aac",
    category: "aac-joining",
    title: "AAC joining estimator",
    copy: "Bag count for thin-bed AAC block walls.",
    illustration: "/tools/tool-aac-joining.png",
  },
  {
    id: "grout",
    category: "grout",
    title: "Grout coverage",
    copy: "Joint volume from tile size, joint width, and area.",
    illustration: "/tools/tool-grout.png",
  },
  {
    id: "screed",
    category: "floor-screed",
    title: "Floor screed yield",
    copy: "Bags from floor area and screed thickness.",
    illustration: "/tools/tool-floor-screed.png",
  },
  {
    id: "plaster",
    category: "plaster",
    title: "Plaster coverage",
    copy: "Bags from wall area and coat thickness.",
    illustration: "/tools/tool-plaster.png",
  },
  {
    id: "cleaner",
    category: "tile-cleaner",
    title: "Tile cleaner dosage",
    copy: "Concentrate litres from area and dilution rate.",
    illustration: "/tools/tool-tile-cleaner.png",
  },
  {
    id: "recommend",
    category: null,
    title: "Product recommender",
    copy: "Answer a few site questions to find the right Bondure line.",
    illustration: "/tools/tool-product-selector.svg",
  },
];

export const PRODUCTS = [
  {
    id: "align-bs55",
    category: "tile-adhesive",
    name: "Align Adhesive B-S55",
    bagKg: 20,
    refBedMm: 3,
    coverageSqFtAtRef: 60,
    image: "/products/bondure-base-b555-bag.webp",
    substrates: ["concrete", "plaster", "existing-tile"],
    applications: ["floor", "wall"],
    tileTypes: ["vitrified", "ceramic", "stone"],
  },
  {
    id: "ultratile",
    category: "tile-adhesive",
    name: "UltraTile Adhesive",
    bagKg: 20,
    refBedMm: 3,
    coverageSqFtAtRef: 55,
    image: "/products/bondure-base-b565-bag.webp",
    substrates: ["concrete", "plaster"],
    applications: ["floor", "wall", "wet-area"],
    tileTypes: ["vitrified", "ceramic"],
  },
  {
    id: "tilegrip",
    category: "tile-adhesive",
    name: "TileGrip Pro",
    bagKg: 20,
    refBedMm: 4,
    coverageSqFtAtRef: 48,
    image: "/products/bondure-base-b585-bag.webp",
    substrates: ["concrete"],
    applications: ["floor", "wall"],
    tileTypes: ["vitrified", "large-format"],
  },
  {
    id: "b585",
    category: "aac-joining",
    name: "Bondure Base B-585",
    bagKg: 40,
    refJointMm: 3,
    coverageSqFtAtRef: 140,
    image: "/products/bondure-base-b585-bag.webp",
    substrates: ["aac"],
    applications: ["wall"],
    tileTypes: ["aac-block"],
  },
  {
    id: "b555",
    category: "aac-joining",
    name: "Bondure Base B-555",
    bagKg: 40,
    refJointMm: 3,
    coverageSqFtAtRef: 130,
    image: "/products/bondure-base-b555-bag.webp",
    substrates: ["aac"],
    applications: ["wall"],
    tileTypes: ["aac-block"],
  },
  {
    id: "b565",
    category: "aac-joining",
    name: "Bondure Base B-565",
    bagKg: 40,
    refJointMm: 2.5,
    coverageSqFtAtRef: 145,
    image: "/products/bondure-base-b565-bag.webp",
    substrates: ["aac"],
    applications: ["wall"],
    tileTypes: ["aac-block"],
  },
  {
    id: "aquaguard",
    category: "grout",
    name: "AquaGuard Grout",
    bagKg: 5,
    densityKgPerL: 1.6,
    image: null,
    substrates: ["tile"],
    applications: ["wet-area", "floor", "wall"],
    tileTypes: ["ceramic", "vitrified"],
  },
  {
    id: "flexjoint",
    category: "grout",
    name: "FlexJoint Grout",
    bagKg: 5,
    densityKgPerL: 1.55,
    image: null,
    substrates: ["tile"],
    applications: ["facade", "floor"],
    tileTypes: ["ceramic", "vitrified", "stone"],
  },
  {
    id: "levelbed",
    category: "floor-screed",
    name: "Bondure LevelBed Screed",
    bagKg: 40,
    kgPerCuM: 1800,
    image: null,
    substrates: ["concrete"],
    applications: ["floor", "indoor"],
    thicknessBand: ["10-40"],
  },
  {
    id: "rapidlevel",
    category: "floor-screed",
    name: "Bondure RapidLevel Screed",
    bagKg: 25,
    kgPerCuM: 1700,
    image: null,
    substrates: ["concrete"],
    applications: ["floor", "indoor", "outdoor"],
    thicknessBand: ["5-20"],
  },
  {
    id: "wallfinish",
    category: "plaster",
    name: "Bondure WallFinish Plaster",
    bagKg: 40,
    refCoatMm: 12,
    coverageSqMAtRef: 2.2,
    image: null,
    substrates: ["brick", "concrete", "aac"],
    applications: ["interior"],
  },
  {
    id: "exterender",
    category: "plaster",
    name: "Bondure ExteRender Plaster",
    bagKg: 40,
    refCoatMm: 15,
    coverageSqMAtRef: 1.8,
    image: null,
    substrates: ["brick", "concrete"],
    applications: ["exterior"],
  },
  {
    id: "cleanshine",
    category: "tile-cleaner",
    name: "Bondure CleanShine",
    packLitres: 5,
    mlPerSqM: 8,
    dilutionRatio: "1:10",
    image: null,
    substrates: ["ceramic", "vitrified"],
    applications: ["maintenance"],
    residue: ["cement", "general"],
  },
  {
    id: "stonecare",
    category: "tile-cleaner",
    name: "Bondure StoneCare Cleaner",
    packLitres: 5,
    mlPerSqM: 12,
    dilutionRatio: "1:8",
    image: null,
    substrates: ["stone", "marble"],
    applications: ["maintenance"],
    residue: ["efflorescence", "general"],
  },
];

export const WASTE_FACTOR = 1.1;
export const GROUT_WASTE_FACTOR = 1.12;

export function productsByCategory(categoryId) {
  return PRODUCTS.filter((product) => product.category === categoryId);
}

export function getProduct(id) {
  return PRODUCTS.find((product) => product.id === id) || null;
}

export function getCategory(id) {
  return CATEGORIES.find((category) => category.id === id) || null;
}

export function getTool(id) {
  return TOOLS.find((tool) => tool.id === id) || null;
}

function scaledCoverageSqFt(refCoverage, refMm, actualMm) {
  if (!refMm || !actualMm) return refCoverage;
  return refCoverage * (refMm / actualMm);
}

export function adhesiveBags({ productId, areaSqFt, bedMm, waste = WASTE_FACTOR }) {
  const product = getProduct(productId);
  if (!product || product.category !== "tile-adhesive") return null;
  const coverageSqFtPerBag = scaledCoverageSqFt(product.coverageSqFtAtRef, product.refBedMm, bedMm);
  return {
    product,
    coverageSqFtPerBag: Math.round(coverageSqFtPerBag * 10) / 10,
    bags: Math.ceil((areaSqFt * waste) / coverageSqFtPerBag),
    areaSqFt,
    bedMm,
    wastePercent: Math.round((waste - 1) * 100),
  };
}

export function aacBags({ productId, areaSqFt, jointMm, waste = WASTE_FACTOR }) {
  const product = getProduct(productId);
  if (!product || product.category !== "aac-joining") return null;
  const coverageSqFtPerBag = scaledCoverageSqFt(product.coverageSqFtAtRef, product.refJointMm, jointMm);
  return {
    product,
    coverageSqFtPerBag: Math.round(coverageSqFtPerBag * 10) / 10,
    bags: Math.ceil((areaSqFt * waste) / coverageSqFtPerBag),
    areaSqFt,
    jointMm,
    wastePercent: Math.round((waste - 1) * 100),
  };
}

export function groutBags({
  productId,
  areaSqFt,
  tileLMm,
  tileWMm,
  jointMm,
  depthMm,
  waste = GROUT_WASTE_FACTOR,
}) {
  const product = getProduct(productId);
  if (!product || product.category !== "grout") return null;
  const areaSqM = areaSqFt * 0.092903;
  const tileL = tileLMm / 1000;
  const tileW = tileWMm / 1000;
  const joint = jointMm / 1000;
  const depth = (depthMm || Math.min(tileLMm, tileWMm) * 0.5) / 1000;
  const jointVolPerSqM = ((tileL + tileW) * joint * depth) / ((tileL + joint) * (tileW + joint));
  const kg = jointVolPerSqM * areaSqM * (product.densityKgPerL || 1.6) * 1000 * waste;
  const bags = Math.ceil(kg / product.bagKg);
  return {
    product,
    kg: Math.round(kg * 10) / 10,
    bags,
    coverageSqFtPerBag: bags ? Math.round((areaSqFt / bags) * 10) / 10 : 0,
    areaSqFt,
    jointMm,
    wastePercent: Math.round((waste - 1) * 100),
  };
}

export function screedBags({ productId, areaSqFt, thicknessMm, waste = WASTE_FACTOR }) {
  const product = getProduct(productId);
  if (!product || product.category !== "floor-screed") return null;
  const kg = areaSqFt * 0.092903 * (thicknessMm / 1000) * product.kgPerCuM * waste;
  return {
    product,
    kg: Math.round(kg),
    bags: Math.ceil(kg / product.bagKg),
    areaSqFt,
    thicknessMm,
    wastePercent: Math.round((waste - 1) * 100),
  };
}

export function plasterBags({ productId, areaSqFt, coatMm, waste = WASTE_FACTOR }) {
  const product = getProduct(productId);
  if (!product || product.category !== "plaster") return null;
  const coverageSqMPerBag = product.coverageSqMAtRef * (product.refCoatMm / coatMm);
  return {
    product,
    coverageSqMPerBag: Math.round(coverageSqMPerBag * 100) / 100,
    bags: Math.ceil((areaSqFt * 0.092903 * waste) / coverageSqMPerBag),
    areaSqFt,
    coatMm,
    wastePercent: Math.round((waste - 1) * 100),
  };
}

export function cleanerDosage({ productId, areaSqFt }) {
  const product = getProduct(productId);
  if (!product || product.category !== "tile-cleaner") return null;
  const concentrateL = (areaSqFt * 0.092903 * product.mlPerSqM) / 1000;
  return {
    product,
    concentrateL: Math.round(concentrateL * 100) / 100,
    packs: Math.ceil(concentrateL / product.packLitres),
    dilutionRatio: product.dilutionRatio,
    areaSqFt,
  };
}

export function recommend(answers) {
  const pool = productsByCategory(answers.category);
  if (!pool.length) return [];

  return pool
    .map((product) => {
      let score = 1;
      if (answers.application && product.applications?.includes(answers.application)) score += 2;
      if (answers.substrate && product.substrates?.includes(answers.substrate)) score += 2;
      if (answers.tileType && product.tileTypes?.includes(answers.tileType)) score += 2;
      if (answers.thicknessBand && product.thicknessBand?.includes(answers.thicknessBand)) score += 2;
      if (answers.residue && product.residue?.includes(answers.residue)) score += 2;
      return { product, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((entry) => entry.product);
}

export const RECOMMENDER_BRANCHES = {
  "tile-adhesive": [
    {
      key: "application",
      question: "Where will the adhesive be used?",
      choices: [
        { value: "floor", label: "Floor" },
        { value: "wall", label: "Wall" },
        { value: "wet-area", label: "Wet area (bath / kitchen)" },
      ],
    },
    {
      key: "tileType",
      question: "What are you fixing?",
      choices: [
        { value: "ceramic", label: "Ceramic" },
        { value: "vitrified", label: "Vitrified" },
        { value: "stone", label: "Natural stone" },
        { value: "large-format", label: "Large-format tiles" },
      ],
    },
    {
      key: "substrate",
      question: "What is the substrate?",
      choices: [
        { value: "concrete", label: "Concrete" },
        { value: "plaster", label: "Plaster" },
        { value: "existing-tile", label: "Existing tile" },
      ],
    },
  ],
  "aac-joining": [
    {
      key: "application",
      question: "Application type?",
      choices: [{ value: "wall", label: "AAC block wall / partition" }],
    },
    {
      key: "substrate",
      question: "Block system?",
      choices: [{ value: "aac", label: "AAC blocks" }],
    },
  ],
  grout: [
    {
      key: "application",
      question: "Where is the grout needed?",
      choices: [
        { value: "wet-area", label: "Wet areas" },
        { value: "floor", label: "Dry floors" },
        { value: "facade", label: "Facade / exterior" },
      ],
    },
    {
      key: "tileType",
      question: "Tile type?",
      choices: [
        { value: "ceramic", label: "Ceramic" },
        { value: "vitrified", label: "Vitrified" },
        { value: "stone", label: "Natural stone" },
      ],
    },
  ],
  "floor-screed": [
    {
      key: "application",
      question: "Project setting?",
      choices: [
        { value: "indoor", label: "Indoor" },
        { value: "outdoor", label: "Outdoor / covered external" },
      ],
    },
    {
      key: "thicknessBand",
      question: "Target thickness band?",
      choices: [
        { value: "5-20", label: "5–20 mm (thin / rapid)" },
        { value: "10-40", label: "10–40 mm (standard bed)" },
      ],
    },
  ],
  plaster: [
    {
      key: "application",
      question: "Interior or exterior?",
      choices: [
        { value: "interior", label: "Interior" },
        { value: "exterior", label: "Exterior" },
      ],
    },
    {
      key: "substrate",
      question: "Substrate?",
      choices: [
        { value: "brick", label: "Brick" },
        { value: "concrete", label: "Concrete" },
        { value: "aac", label: "AAC" },
      ],
    },
  ],
  "tile-cleaner": [
    {
      key: "substrate",
      question: "Surface to clean?",
      choices: [
        { value: "ceramic", label: "Ceramic" },
        { value: "vitrified", label: "Vitrified" },
        { value: "stone", label: "Natural stone / marble" },
      ],
    },
    {
      key: "residue",
      question: "Primary residue?",
      choices: [
        { value: "cement", label: "Cement haze" },
        { value: "efflorescence", label: "Efflorescence" },
        { value: "general", label: "General maintenance" },
      ],
    },
  ],
};

export const RECOMMENDER_STEP_NAMES = {
  application: "Application",
  tileType: "Material",
  substrate: "Substrate",
  thicknessBand: "Thickness",
  residue: "Residue",
};

export const DISCLAIMER =
  "Calculated quantity is an estimate. On-site consumption may vary with surface unevenness, application method, and waste. Add ~10% for spillage and clean-up.";

const DE_CATEGORY_COPY = {
  "tile-adhesive": ["Fliesenkleber", "Kleber", "Boden- und Wandfliesen aus Keramik, Feinsteinzeug und Naturstein sicher verlegen."],
  "aac-joining": ["Porenbeton-Fugenlösungen", "Porenbeton-Fugenmörtel", "Dünnbettmörtel für Mauerwerk aus Porenbetonsteinen."],
  grout: ["Fugenmörtel", "Fugenmörtel", "Fugenfüllung für Nassbereiche, Fassaden und Böden."],
  "floor-screed": ["Bodenestrich", "Estrich", "Unterlagen und Ausgleichsschichten vor der Fliesenverlegung."],
  plaster: ["Putz", "Putz", "Innen- und Außenputz für Wände."],
  "tile-cleaner": ["Fliesenreiniger", "Reiniger", "Konzentrate für die Reinigung nach der Verlegung und die laufende Pflege."],
};

const DE_TOOL_COPY = {
  adhesive: ["Fliesenkleber-Verbrauch", "Sackanzahl anhand von Bodenfläche und Kleberbettdicke schätzen."],
  aac: ["Porenbeton-Fugenmörtel-Rechner", "Sackanzahl für Dünnbettmörtel bei Wänden aus Porenbetonsteinen."],
  grout: ["Fugenmörtel-Verbrauch", "Fugenvolumen anhand von Fliesengröße, Fugenbreite und Fläche berechnen."],
  screed: ["Bodenestrich-Ergiebigkeit", "Sackanzahl anhand von Bodenfläche und Estrichdicke berechnen."],
  plaster: ["Putz-Verbrauch", "Sackanzahl anhand von Wandfläche und Schichtdicke berechnen."],
  cleaner: ["Fliesenreiniger-Dosierung", "Konzentratmenge in Litern anhand von Fläche und Verdünnung berechnen."],
  recommend: ["Produktempfehlung", "Beantworten Sie einige Fragen zum Einsatzort, um die passende Bondure Produktlinie zu finden."],
};

const DE_RECOMMENDER = {
  "tile-adhesive": [
    ["Wo wird der Kleber eingesetzt?", ["Boden", "Wand", "Nassbereich (Bad / Küche)"]],
    ["Was möchten Sie verlegen?", ["Keramik", "Feinsteinzeug", "Naturstein", "Großformatige Fliesen"]],
    ["Um welchen Untergrund handelt es sich?", ["Beton", "Putz", "Vorhandene Fliesen"]],
  ],
  "aac-joining": [
    ["Art der Anwendung?", ["Wand / Trennwand aus Porenbetonsteinen"]],
    ["Steinsystem?", ["Porenbetonsteine"]],
  ],
  grout: [
    ["Wo wird der Fugenmörtel benötigt?", ["Nassbereiche", "Trockene Böden", "Fassade / Außenbereich"]],
    ["Fliesentyp?", ["Keramik", "Feinsteinzeug", "Naturstein"]],
  ],
  "floor-screed": [
    ["Projektumgebung?", ["Innenbereich", "Außenbereich / überdachter Außenbereich"]],
    ["Gewünschter Dickenbereich?", ["5–20 mm (dünn / schnell)", "10–40 mm (Standardbett)"]],
  ],
  plaster: [
    ["Innen- oder Außenbereich?", ["Innenbereich", "Außenbereich"]],
    ["Untergrund?", ["Ziegel", "Beton", "Porenbeton"]],
  ],
  "tile-cleaner": [
    ["Welche Oberfläche soll gereinigt werden?", ["Keramik", "Feinsteinzeug", "Naturstein / Marmor"]],
    ["Welche Rückstände sind hauptsächlich vorhanden?", ["Zementschleier", "Ausblühungen", "Allgemeine Pflege"]],
  ],
};

export function getLocalizedCategories(locale = "en") {
  if (locale !== "de") return CATEGORIES;
  return CATEGORIES.map((category) => {
    const [label, short, description] = DE_CATEGORY_COPY[category.id];
    return { ...category, label, short, description };
  });
}

export function getLocalizedTools(locale = "en") {
  if (locale !== "de") return TOOLS;
  return TOOLS.map((tool) => {
    const [title, copy] = DE_TOOL_COPY[tool.id];
    return { ...tool, title, copy };
  });
}

export function getLocalizedRecommenderBranches(locale = "en") {
  if (locale !== "de") return RECOMMENDER_BRANCHES;
  return Object.fromEntries(
    Object.entries(RECOMMENDER_BRANCHES).map(([category, steps]) => [
      category,
      steps.map((step, stepIndex) => ({
        ...step,
        question: DE_RECOMMENDER[category][stepIndex][0],
        choices: step.choices.map((choice, choiceIndex) => ({
          ...choice,
          label: DE_RECOMMENDER[category][stepIndex][1][choiceIndex],
        })),
      })),
    ]),
  );
}

export function getLocalizedRecommenderStepNames(locale = "en") {
  if (locale !== "de") return RECOMMENDER_STEP_NAMES;
  return {
    application: "Anwendung",
    tileType: "Material",
    substrate: "Untergrund",
    thicknessBand: "Dicke",
    residue: "Rückstände",
  };
}

export function getLocalizedDisclaimer(locale = "en") {
  return locale === "de"
    ? "Die berechnete Menge ist ein Schätzwert. Der tatsächliche Verbrauch kann je nach Unebenheit der Oberfläche, Verarbeitungsmethode und Verschnitt abweichen. Rechnen Sie etwa 10 % für Verschütten und Reinigung hinzu."
    : DISCLAIMER;
}
