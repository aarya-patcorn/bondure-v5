export const NAV_CATEGORY_LABELS = {
  "tile-adhesive": "Tile Adhesive",
  "aac-joining": "AAC Jointing Mortar",
  "floor-screed": "Floor Screed",
  plaster: "Plaster",
};

export const NAV_PRODUCTS = [
  ["bondure-aac-block-jointing-mortar", "Bondure AAC Block Jointing Mortar", "aac-joining", "Bondure AAC block jointing mortar bag"],
  ["bondure-aac-joint-pro", "Bondure AAC Joint Pro", "aac-joining", "Bondure AAC Joint Pro mortar bag"],
  ["bondure-thinbed-aac", "Bondure ThinBed AAC", "aac-joining", "Bondure ThinBed AAC mortar bag"],
  ["bondure-adhesive-b585", "Bondure Adhesive B-585", "tile-adhesive", "Bondure Adhesive B-585 bag"],
  ["bondure-adhesive-b555", "Bondure Adhesive B-555", "tile-adhesive", "Bondure Adhesive B-555 bag"],
  ["bondure-adhesive-b565", "Bondure Adhesive B-565", "tile-adhesive", "Bondure Adhesive B-565 bag"],
  ["bondure-screed", "Bondure Screed", "floor-screed", "Bondure Screed bag"],
  ["bondure-wallstark-plaster", "Bondure Wall Stark Plaster", "plaster", "Bondure Wall Stark Plaster bag"],
  ["bondure-exterender-plaster", "Bondure ExteRender Plaster", "plaster", "Bondure ExteRender Plaster bag"],
  ["bondure-cleanshine", "Bondure CleanShine", "tile-cleaner", "Bondure CleanShine cleaner pack"],
  ["bondure-stonecare-cleaner", "Bondure StoneCare Cleaner", "tile-cleaner", "Bondure StoneCare Cleaner pack"],
].map(([slug, title, category, imageAlt]) => ({ slug, title, category, imageAlt }));

export const NAV_TOOLS = [
  ["adhesive", "/tools/tool-tile-adhesive.png"],
  ["screed", "/tools/tool-floor-screed.png"],
  ["aac", "/tools/tool-aac-joining.png"],
  ["cleaner", "/tools/tool-tile-cleaner.png"],
  ["plaster", "/tools/tool-plaster.png"],
].map(([id, illustration]) => ({ id, illustration }));
