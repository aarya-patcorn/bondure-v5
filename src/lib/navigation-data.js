export const NAV_CATEGORY_LABELS = {
  "tile-adhesive": "Tile Adhesive",
  "aac-joining": "AAC Jointing Mortar",
  grout: "Grout",
  "floor-screed": "Floor Screed",
  plaster: "Plaster",
  "tile-cleaner": "Tile Cleaner",
};

export const NAV_PRODUCTS = [
  ["bondure-aac-block-jointing-mortar", "Bondure AAC Block Jointing Mortar", "aac-joining", "Bondure AAC block jointing mortar bag"],
  ["bondure-aac-joint-pro", "Bondure AAC Joint Pro", "aac-joining", "Bondure AAC Joint Pro mortar bag"],
  ["bondure-thinbed-aac", "Bondure ThinBed AAC", "aac-joining", "Bondure ThinBed AAC mortar bag"],
  ["bondure-align-adhesive-b-s55", "Bondure Align Adhesive B-S55", "tile-adhesive", "Bondure Align Adhesive B-S55 bag"],
  ["bondure-ultratile-adhesive", "Bondure UltraTile Adhesive", "tile-adhesive", "Bondure UltraTile Adhesive bag"],
  ["bondure-tilegrip-pro", "Bondure TileGrip Pro", "tile-adhesive", "Bondure TileGrip Pro adhesive bag"],
  ["bondure-aquaguard-grout", "Bondure AquaGuard Grout", "grout", "Bondure AquaGuard Grout pack"],
  ["bondure-flexjoint-grout", "Bondure FlexJoint Grout", "grout", "Bondure FlexJoint Grout pack"],
  ["bondure-levelbed-screed", "Bondure LevelBed Screed", "floor-screed", "Bondure LevelBed Screed bag"],
  ["bondure-rapidlevel-screed", "Bondure RapidLevel Screed", "floor-screed", "Bondure RapidLevel Screed bag"],
  ["bondure-wallfinish-plaster", "Bondure WallFinish Plaster", "plaster", "Bondure WallFinish Plaster bag"],
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
  ["grout", "/tools/tool-grout.png"],
].map(([id, illustration]) => ({ id, illustration }));
