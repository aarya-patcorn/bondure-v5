"use client";

import { CoverflowCarousel, type CoverflowSlide } from "@/components/ui/coverflow-carousel";
import { useLocale } from "@/components/LocaleProvider/LocaleProvider";

const projectSlides: Record<"en" | "de", CoverflowSlide[]> = {
  en: [
    {
      src: "/home-media/solution-residential.webp",
      alt: "Modern glass high-rise buildings viewed from below",
      title: "High-rise residential",
      description:
        "High-performance tile, stone and façade systems engineered for demanding high-rise construction conditions.",
    },
    {
      src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&auto=format&fit=crop&q=80",
      alt: "Construction workers on a large active jobsite",
      title: "Infrastructure",
      description:
        "Durable repair mortars, grouts and protective coatings for high-traffic infrastructure and exposed structures.",
    },
    {
      src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&auto=format&fit=crop&q=80",
      alt: "Bright contemporary hospital interior",
      title: "Healthcare",
      description:
        "Hygienic, low-VOC adhesive and flooring systems for clean, durable, fast-ready healthcare spaces.",
    },
    {
      src: "/home-media/solution-hospital.webp",
      alt: "Resort hotel with balconies and a pool",
      title: "Hospitality",
      description:
        "Premium finish solutions for hotels and resorts: consistent colour, reliable adhesion and surfaces that hold up to daily guest traffic.",
    },
    {
      src: "/home-media/solution-restaurant.webp",
      alt: "Modern retail interior with warm lighting",
      title: "Retail & restaurants",
      description:
        "Fast-track flooring and wall systems for shops, malls and dining spaces where appearance, slip resistance and programme speed are critical.",
    },
    {
      src: "/home-media/solution-under-sea-road.webp",
      alt: "Ocean waves breaking in deep blue water",
      title: "Marine",
      description:
        "Waterproofing and bonding systems built for docks, coastal structures and environments with constant moisture, salt and thermal movement.",
    },
  ],
  de: [
    {
      src: "/home-media/solution-residential.webp",
      alt: "Moderne gläserne Wohnhochhäuser von unten betrachtet",
      title: "Wohnhochhäuser",
      description: "Fliesen-, Naturstein- und Fassadensysteme für hohe Gebäude, die Windlasten, Verformungen und enge Bauzeitpläne bewältigen, ohne die Haftfestigkeit zu beeinträchtigen.",
    },
    {
      src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&auto=format&fit=crop&q=80",
      alt: "Bauarbeiter auf einer großen aktiven Baustelle",
      title: "Infrastruktur",
      description: "Reparaturmörtel, Vergussmassen und Schutzbeschichtungen für Brücken, Straßen und Ingenieurbauwerke, die starker Belastung und dauerhafter Witterung standhalten müssen.",
    },
    {
      src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&auto=format&fit=crop&q=80",
      alt: "Heller moderner Krankenhausinnenraum",
      title: "Gesundheitswesen",
      description: "Hygienische, emissionsarme Klebstoff- und Bodensysteme für Krankenhäuser und klinische Räume, in denen Sauberkeit, Haltbarkeit und schnelle Fertigstellung gleichermaßen zählen.",
    },
    {
      src: "/home-media/solution-hospital.webp",
      alt: "Resorthotel mit Balkonen und Pool",
      title: "Hotellerie",
      description: "Premium-Lösungen für Hotels und Resorts mit gleichmäßiger Farbe, zuverlässiger Haftung und Oberflächen, die dem täglichen Gästebetrieb standhalten.",
    },
    {
      src: "/home-media/solution-restaurant.webp",
      alt: "Moderner Einzelhandelsraum mit warmer Beleuchtung",
      title: "Einzelhandel & Gastronomie",
      description: "Schnell ausführbare Boden- und Wandsysteme für Geschäfte, Einkaufszentren und Gastronomiebereiche, in denen Optik, Rutschhemmung und Baugeschwindigkeit entscheidend sind.",
    },
    {
      src: "/home-media/solution-under-sea-road.webp",
      alt: "Brechende Meereswellen in tiefblauem Wasser",
      title: "Maritimbereich",
      description: "Abdichtungs- und Haftsysteme für Docks, Küstenbauwerke und Umgebungen mit ständiger Feuchtigkeit, Salz und thermischer Bewegung.",
    },
  ],
};

export default function CircularGalleryDemo() {
  const { locale } = useLocale();

  return (
    <div className="home-solutions__carousel relative left-1/2 w-screen max-w-none -translate-x-1/2 px-4 sm:px-8 lg:px-12">
      <CoverflowCarousel
        slides={projectSlides[locale]}
        showNavigation
        showCaption
        loop
        label={locale === "de" ? "Bondure Projektgalerie" : "Bondure project gallery"}
        className="w-full"
        cardWidth="clamp(168px, 24vw, 300px)"
        frameClassName="pt-10 pb-4 sm:pt-14 sm:pb-6"
        captionClassName="home-solutions__carousel-caption"
        navButtonClassName="p-3.5 shadow-md ring-1 ring-black/10 hover:bg-white sm:p-4"
        navIconClassName="size-7 sm:size-8"
      />
    </div>
  );
}
