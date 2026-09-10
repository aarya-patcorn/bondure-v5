export const NAV_CATEGORY_LABELS = {
  "tile-adhesive": "Tile Adhesive",
  "aac-joining": "AAC Jointing Mortar",
  "floor-screed": "Floor Screed",
  plaster: "Plaster",
};

export const NAV_PRODUCTS = [
  ["bondure-aac-block-jointing-mortar", "Bondure AAC Block Jointing Mortar", "aac-joining", "Bondure AAC block jointing mortar bag"],
  ["bondure-adhesive-b585", "Bondure Adhesive B-585", "tile-adhesive", "Bondure Adhesive B-585 bag"],
  ["bondure-adhesive-b555", "Bondure Adhesive B-555", "tile-adhesive", "Bondure Adhesive B-555 bag"],
  ["bondure-adhesive-b565", "Bondure Adhesive B-565", "tile-adhesive", "Bondure Adhesive B-565 bag"],
  ["bondure-jointflex-grout", "Bondure Joint Flex Grout", "grout", "Bondure Joint Flex Grout pack"],
  ["bondure-screed", "Bondure Screed", "floor-screed", "Bondure Screed bag"],
  ["bondure-wallstark-plaster", "Bondure Wall Stark Plaster", "plaster", "Bondure Wall Stark Plaster bag"],
  ["bondure-tileshine", "Bondure Tile Shine", "tile-cleaner", "Bondure Tile Shine cleaner pack"],
].map(([slug, title, category, imageAlt]) => ({ slug, title, category, imageAlt }));

export const NAV_TOOLS = [
  ["adhesive", "/tools/tool-tile-adhesive.png"],
  ["screed", "/tools/tool-floor-screed.png"],
  ["aac", "/tools/tool-aac-joining.png"],
  ["cleaner", "/tools/tool-tile-cleaner.png"],
  ["plaster", "/tools/tool-plaster.png"],
].map(([id, illustration]) => ({ id, illustration }));
