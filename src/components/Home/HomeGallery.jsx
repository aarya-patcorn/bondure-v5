"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/LocaleProvider/LocaleProvider";

import "./HomePage.css";

const galleryMedia = [
  {
    id: "concrete-mixer",
    src: "/home-media/mixingvideo.mp4",
    poster: "/optimized/home/gallery-lab-formulation.webp",
    alt: {
      en: "Construction site with workers and concrete mixer outdoors",
      de: "Baustelle mit Arbeitern und Betonmischer im Freien",
    },
  },
  {
    id: "floor-screed",
    src: "/home-media/gallery-floor-screed.webp",
    alt: {
      en: "Worker smoothing a floor coating in a sunlit courtyard",
      de: "Arbeiter glättet eine Bodenbeschichtung in einem sonnigen Innenhof",
    },
    imageOnly: true,
  },
  {
    id: "excavator",
    src: "/home-media/h40-video-background-cropped.mp4",
    poster: "/optimized/home/gallery-material-inspection.webp",
    alt: {
      en: "Excavator loading earth into a dump truck at a construction site",
      de: "Bagger lädt Erde auf einer Baustelle in einen Muldenkipper",
    },
  },
  {
    id: "bondure-tile-installation",
    src: "/home-media/gallery-tile-installation.webp",
    alt: {
      en: "Bondure technician installing tiles on site with a mountain view through the window",
      de: "Bondure Techniker verlegt Fliesen auf der Baustelle mit Bergblick durch das Fenster",
    },
    imageOnly: true,
  },
  {
    id: "tile-adhesive",
    src: "/home-media/planogel-video-background-cropped%20(1).mp4",
    poster: "/optimized/home/gallery-tile-installation.webp",
    alt: {
      en: "Tile adhesive being applied with a notched trowel",
      de: "Fliesenkleber wird mit einer Zahnkelle aufgetragen",
    },
  },
  {
    id: "wall-plaster",
    src: "/spotlight/services3AAC.webp",
    alt: {
      en: "Wall plaster application on site",
      de: "Auftragen von Wandputz auf der Baustelle",
    },
    imageOnly: true,
  },
  {
    id: "aac-blocks",
    src: "/home-media/AACBLOCKDEMO.mp4",
    poster: "/optimized/home/gallery-aac-joining.webp",
    alt: {
      en: "AAC block joining mortar applied on site",
      de: "Auf der Baustelle aufgetragener Porenbeton-Fugenmörtel",
    },
  },
  {
    id: "precision-tile",
    src: "/spotlight/spotlight-img-2.webp",
    alt: {
      en: "Large-format tile installation with a notched trowel",
      de: "Verlegung großformatiger Fliesen mit einer Zahnkelle",
    },
    imageOnly: true,
  },
];

function GalleryItem({ item }) {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = navigator.connection?.saveData;
    if (reducedMotion || saveData) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShouldLoadVideo(entry.isIntersecting);
        if (!entry.isIntersecting) {
          videoRef.current?.pause();
        }
      },
      { rootMargin: "80px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className="home-gallery__slide" ref={rootRef}>
      {item.imageOnly ? (
        <img
          className="home-gallery__media home-gallery__poster"
          src={item.src}
          alt={item.alt}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <>
          <img
            className="home-gallery__media home-gallery__poster"
            src={item.poster}
            alt={item.alt}
            loading="lazy"
            decoding="async"
          />
          {shouldLoadVideo ? (
            <video
              ref={videoRef}
              className="home-gallery__media home-gallery__video"
              src={item.src}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-label={item.alt}
            />
          ) : null}
        </>
      )}
    </figure>
  );
}

export default function HomeGallery() {
  const { locale } = useLocale();

  return (
    <section
      className="home-gallery"
      aria-label={locale === "de" ? "Bondure Anwendungen auf der Baustelle" : "Bondure applications on site"}
    >
      <div className="home-gallery__viewport">
        <div className="home-gallery__marquee">
          {[0, 1].map((setIndex) => (
            <div
              className="home-gallery__track"
              key={setIndex}
              aria-hidden={setIndex === 1 ? true : undefined}
            >
              {galleryMedia.map((item) => (
                <GalleryItem
                  item={{ ...item, alt: item.alt[locale] }}
                  key={`${setIndex}-${item.id}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
