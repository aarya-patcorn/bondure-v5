"use client";

import "./RDIntro.css";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import BondureLogo from "@/components/BondureLogo/BondureLogo";
import { useLocale } from "@/components/LocaleProvider/LocaleProvider";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { type: "image", src: "/home-media/lab-formulation.webp" },
  { type: "image", src: "/home-media/adhesive-work-2.webp" },
  { type: "image", src: "/home-media/materials-research-lab.webp" },
  { type: "image", src: "/home-media/site-testing.webp" },
  {
    type: "video",
    src: "/home-media/mixingvideo.mp4",
    poster: "/home-media/lab-formulation.webp",
  },
  { type: "image", src: "/home-media/mortar-application.png" },
  { type: "image", src: "/home-media/tile-installation.png" },
  { type: "image", src: "/home-media/aac-blocks.webp" },
  { type: "image", src: "/home-media/aac-joining.webp" },
];
export default function RDIntro({
  headline,
  actionLabel,
  actionTarget = "#rd-content",
  footerItems,
}) {
  const { locale } = useLocale();
  const defaults = locale === "de"
    ? {
        headline: "Forschung bei Bondure",
        actionLabel: "Prozess entdecken",
        footerItems: ["Entwickeln", "Testen", "Belegen"],
      }
    : {
        headline: "Research at Bondure",
        actionLabel: "Explore the process",
        footerItems: ["Formulate", "Test", "Prove"],
      };
  const resolvedHeadline = headline ?? defaults.headline;
  const resolvedActionLabel = actionLabel ?? defaults.actionLabel;
  const resolvedFooterItems = footerItems ?? defaults.footerItems;
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const gallery = section.querySelector(".rd-intro-gallery");
      const galleryMedia = gsap.utils.toArray(".rd-intro-item img, .rd-intro-item video", section);
      const logo = section.querySelector(".rd-intro-logo");
      const footer = section.querySelector(".rd-intro-footer");
          const words = gsap.utils.toArray(".rd-intro-headline .word", section);
          const action = section.querySelector(".rd-intro-action");
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set([words, action], { opacity: 1 });
        return;
      }

      const logoStartScale = window.innerWidth <= 1000 ? 2.2 : 5.5;
      gsap.set([words, action], { opacity: 0, y: 10 });
      gsap.set(logo, { scale: logoStartScale });

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * 4}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => {
          const galleryProgress = gsap.utils.clamp(0, 1, progress / 0.75);
          gsap.set(gallery, { scale: gsap.utils.interpolate(1, 0.5, galleryProgress) });
          gsap.set(galleryMedia, { scale: gsap.utils.interpolate(1.25, 1, galleryProgress) });

          const logoScale = gsap.utils.interpolate(logoStartScale, 1, galleryProgress);
          const scaledHeight = logo.offsetHeight * logoScale;
          const travel = Math.max(0, window.innerHeight - scaledHeight - 64);
          gsap.set(logo, { scale: logoScale, y: -travel * galleryProgress });

          const footerProgress = gsap.utils.clamp(0, 1, (progress - 0.05) / 0.2);
          gsap.set(footer, {
            scale: gsap.utils.interpolate(1, 0.78, footerProgress),
            filter: `blur(${gsap.utils.interpolate(0, 18, footerProgress)}px)`,
            opacity: 1 - footerProgress,
          });

          const targets = words;
          targets.forEach((target, index) => {
            const start = 0.12 + index * 0.018;
            const reveal = gsap.utils.clamp(0, 1, (progress - start) / 0.12);
            gsap.set(target, { opacity: reveal, y: 10 * (1 - reveal) });
          });

          if (action) {
            const actionStart = 0.12 + words.length * 0.018;
            const actionReveal = gsap.utils.clamp(0, 1, (progress - actionStart) / 0.12);
            gsap.set(action, { opacity: actionReveal, y: 10 * (1 - actionReveal) });
          }
        },
      });

      return () => trigger.kill();
    },
    { scope: sectionRef }
  );

  return (
    <section className="rd-intro" ref={sectionRef}>
      <div className="rd-intro-inner">
        <div className="rd-intro-gallery" aria-hidden="true">
          {[0, 1, 2].map((column) => (
            <div className="rd-intro-column" key={column}>
              {galleryItems.slice(column * 3, column * 3 + 3).map((item, itemIndex) => (
                <div className="rd-intro-item" key={item.src}>
                  {item.type === "video" ? (
                    <video
                      src={item.src}
                      poster={item.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-hidden="true"
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt=""
                      loading={column === 0 && itemIndex === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="rd-intro-logo">
          <BondureLogo gradientId="rdIntroLogoGradient" />
        </div>

        <div className="rd-intro-header">
          <div className="rd-intro-headline">
            <h1>
              <span className="line">
                {resolvedHeadline.split(" ").map((word, index) => (
                  <span className="word" key={`${word}-${index}`}>
                    {word}&nbsp;
                  </span>
                ))}
              </span>
            </h1>
          </div>
          <a className="rd-intro-action" href={actionTarget}>
            {resolvedActionLabel}
          </a>
        </div>

        <div className="rd-intro-footer">
          {resolvedFooterItems.map((item) => <p key={item}>{item}</p>)}
        </div>
      </div>
      <div className="rd-intro-overlay" />
    </section>
  );
}
