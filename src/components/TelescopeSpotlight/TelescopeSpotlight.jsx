"use client";

import "./TelescopeSpotlight.css";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "../LocaleProvider/LocaleProvider";

gsap.registerPlugin(ScrollTrigger);

const itemImages = [
  "/spotlight/vanServices.webp",
  "/spotlight/bondurevanFactoryBG.webp",
  "/spotlight/technicalteamservices.webp",
  "/spotlight/services2floor.webp",
  "/spotlight/services3AAC.webp",
  "/spotlight/tile-installation.webp",
  "/spotlight/spotlight-img-1.png",
  "/spotlight/spotlight-img-2.webp",
  "/spotlight/spotlight-img-10.webp",
  "/spotlight/02.webp",
];

const copy = {
  en: {
    itemNames: [
      "Mobile Technical Unit",
      "Mobile Service Deployment",
      "On-Site Quality Audit",
      "Floor Screed Application",
      "Wall Plaster Application",
      "Tile Adhesive Bedding",
      "Precision Tile Installation",
      "Large-Format Tile Installation",
      "Tile Cleaning & Care",
      "AAC Block Jointing",
    ],
    sectionLabel: "Technical support in action",
    introWords: ["Tested", "On Site"],
    backgroundAlt: "Bondure technical support on site",
    header: "Technical support, made practical.",
  },
  de: {
    itemNames: [
      "Mobile technische Einheit",
      "Mobiler Serviceeinsatz",
      "Qualitätsprüfung vor Ort",
      "Estrichanwendung",
      "Wandputzanwendung",
      "Fliesenkleberbettung",
      "Präzise Fliesenverlegung",
      "Verlegung großformatiger Fliesen",
      "Fliesenreinigung und -pflege",
      "Verfugung von Porenbetonsteinen",
    ],
    sectionLabel: "Technischer Support im Einsatz",
    introWords: ["Getestet", "Vor Ort"],
    backgroundAlt: "Technischer Support von Bondure vor Ort",
    header: "Technischer Support, praxisnah umgesetzt.",
  },
};

const config = { gap: 0.075, speed: 0.3, arcRadius: 500 };

export default function TelescopeSpotlight() {
  const { locale } = useLocale();
  const content = copy[locale];
  const items = content.itemNames.map((name, index) => ({ name, image: itemImages[index] }));
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const intro = section.querySelector(".telescope-spotlight-intro");
    const background = section.querySelector(".telescope-spotlight-bg");
    const backgroundImage = backgroundRef.current;
    const introWords = gsap.utils.toArray(".telescope-spotlight-intro-word", section);
    const titleFrame = section.querySelector(".telescope-spotlight-title-frame");
    const titleTrack = section.querySelector(".telescope-spotlight-titles");
    const titles = gsap.utils.toArray(".telescope-spotlight-title", section);
    const images = gsap.utils.toArray(".telescope-spotlight-image", section);
    const header = section.querySelector(".telescope-spotlight-header");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    let activeIndex = 0;

    gsap.set(images, { opacity: 0 });
    gsap.set(titleFrame, { opacity: 0, "--line-opacity": 0 });

    const getBezierPosition = (progress) => {
      const width = window.innerWidth * 0.3;
      const height = window.innerHeight;
      const startX = width - 220;
      const startY = -200;
      const endY = height + 200;
      const controlX = startX + config.arcRadius;
      const controlY = height / 2;

      return {
        x: (1 - progress) ** 2 * startX + 2 * (1 - progress) * progress * controlX + progress ** 2 * startX,
        y: (1 - progress) ** 2 * startY + 2 * (1 - progress) * progress * controlY + progress ** 2 * endY,
      };
    };

    const setItemState = (progress) => {
      const switchProgress = (progress - 0.22) / 0.7;
      const startY = window.innerHeight;
      const endY = -titleTrack.scrollHeight;
      gsap.set(titleTrack, { y: gsap.utils.interpolate(startY, endY, switchProgress) });

      images.forEach((image, index) => {
        const imageProgress = (switchProgress - index * config.gap) / config.speed;
        if (imageProgress < 0 || imageProgress > 1) {
          gsap.set(image, { opacity: 0 });
          return;
        }
        const position = getBezierPosition(imageProgress);
        gsap.set(image, { x: position.x - 100, y: position.y - 75, opacity: 1 });
      });

      let closestIndex = 0;
      let closestDistance = Infinity;
      titles.forEach((title, index) => {
        const bounds = title.getBoundingClientRect();
        const distance = Math.abs(bounds.top + bounds.height / 2 - window.innerHeight / 2);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeIndex) {
        gsap.set(titles[activeIndex], { opacity: 0.25 });
        gsap.set(titles[closestIndex], { opacity: 1 });
        backgroundImage.src = items[closestIndex].image;
        activeIndex = closestIndex;
      }
    };

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${window.innerHeight * 5}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.8,
      invalidateOnRefresh: true,
      onUpdate: ({ progress }) => {
        if (progress <= 0.17) {
          const introProgress = progress / 0.17;
          gsap.set(intro, { opacity: 1 });
          gsap.set(introWords[0], { x: -introProgress * window.innerWidth * 0.6, opacity: 1 });
          gsap.set(introWords[1], { x: introProgress * window.innerWidth * 0.6, opacity: 1 });
          gsap.set(background, { scale: introProgress });
          gsap.set(backgroundImage, { scale: 1.15 - introProgress * 0.15 });
          gsap.set([titleFrame, header], { opacity: 0 });
          gsap.set(images, { opacity: 0 });
        } else if (progress <= 0.22) {
          const handoff = (progress - 0.17) / 0.05;
          gsap.set(intro, { opacity: 1 - handoff });
          gsap.set(background, { scale: 1 });
          gsap.set(backgroundImage, { scale: 1 });
          gsap.set(introWords, { opacity: 0 });
          gsap.set([titleFrame, header], { opacity: handoff });
          gsap.set(titleFrame, { "--line-opacity": handoff });
        } else if (progress <= 0.92) {
          gsap.set(intro, { opacity: 0 });
          gsap.set(background, { scale: 1 });
          gsap.set(backgroundImage, { scale: 1 });
          gsap.set(introWords, { opacity: 0 });
          gsap.set([titleFrame, header], { opacity: 1 });
          gsap.set(titleFrame, { "--line-opacity": 1 });
          setItemState(progress);
        } else {
          const exitProgress = (progress - 0.92) / 0.08;
          gsap.set(intro, { opacity: 0 });
          gsap.set([titleFrame, header, images], { opacity: 1 - exitProgress });
        }
      },
    });
  }, { scope: sectionRef, dependencies: [locale], revertOnUpdate: true });

  return (
    <section className="telescope-spotlight" ref={sectionRef} aria-label={content.sectionLabel}>
      <div className="telescope-spotlight-intro" aria-hidden="true">
        <img
          className="telescope-spotlight-intro__image"
          src="/spotlight/telescope-intro.webp"
          alt=""
          decoding="async"
        />
        <div className="telescope-spotlight-intro__shade" aria-hidden="true" />
        <p className="telescope-spotlight-intro-word">{content.introWords[0]}</p>
        <p className="telescope-spotlight-intro-word">{content.introWords[1]}</p>
      </div>

      <div className="telescope-spotlight-bg">
        <img ref={backgroundRef} src={items[0].image} alt={content.backgroundAlt} />
        <div className="telescope-spotlight-shade" />
      </div>

      <div className="telescope-spotlight-title-frame">
        <div className="telescope-spotlight-titles">
          {items.map((item, index) => (
            <h2 className="telescope-spotlight-title" style={{ opacity: index === 0 ? 1 : 0.25 }} key={item.name}>{item.name}</h2>
          ))}
        </div>
      </div>

      <div className="telescope-spotlight-images" aria-hidden="true">
        {items.map((item) => (
          <div className="telescope-spotlight-image" key={item.image}><img src={item.image} alt="" /></div>
        ))}
      </div>

      <p className="telescope-spotlight-header">{content.header}</p>
    </section>
  );
}
