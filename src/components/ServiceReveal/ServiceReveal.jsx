"use client";

import "./ServiceReveal.css";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "/home-media/lab-formulation.webp",
  "/home-media/adhesive-testing.webp",
  "/home-media/site-testing.webp",
  "/home-media/material-inspection.webp",
  "/home-media/mortar-application.png",
  "/home-media/tile-installation.png",
  "/home-media/site-moisture-test.png",
  "/home-media/adhesive-work-1.webp",
  "/home-media/adhesive-work-2.webp",
  "/home-media/adhesive-work-3.webp",
  "/home-media/aac-joining.webp",
  "/about-story/laboratory.jpg",
];

export default function ServiceReveal() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const background = section.querySelector(".service-reveal-bg");
    const cards = gsap.utils.toArray(".service-reveal-image", section);
    const lines = gsap.utils.toArray(".service-reveal-line", section);
    const copy = gsap.utils.toArray(".service-reveal-copy", section);
    const counter = { value: 0 };
    const counterElement = section.querySelector(".service-reveal-counter");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    gsap.set(background, { scaleY: 0, transformOrigin: "bottom" });
    cards.forEach((card) => {
      const bounds = card.getBoundingClientRect();
      const sectionBounds = section.getBoundingClientRect();
      gsap.set(card, {
        x: sectionBounds.left + 24 - bounds.left,
        y: sectionBounds.top + 24 - bounds.top,
        scale: 0,
        rotate: 0,
        opacity: 1,
      });
    });
    gsap.set(lines, { scale: 0 });
    gsap.set(copy, { yPercent: 120 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=220%",
        pin: true,
        scrub: 0.85,
        invalidateOnRefresh: true,
      },
    });
    timeline
      .to(background, { scaleY: 1, duration: 1.2, ease: "power2.inOut" })
      .to(counter, {
        value: 100,
        duration: 1.25,
        ease: "power2.inOut",
        onUpdate: () => { counterElement.textContent = String(Math.round(counter.value)); },
      }, 0)
      .to(cards, { scale: 1, duration: .5, stagger: .04, ease: "power3.out" }, .1)
      .to(cards, {
        x: 0,
        y: 0,
        rotate: (index) => (index % 5 - 2) * 1.3,
        duration: 1,
        stagger: .045,
        ease: "power3.inOut",
      }, 1.15)
      .to(counterElement, { opacity: 0, duration: .2 }, 1.35)
      .to(lines, { scale: 1, duration: .65, stagger: .08, ease: "power3.inOut" }, 1.75)
      .to(copy, { yPercent: 0, duration: .65, stagger: .055, ease: "power4.out" }, 1.9)
      .to({}, { duration: .6 });
  }, { scope: sectionRef });

  return (
    <section className="service-reveal" ref={sectionRef} aria-labelledby="service-reveal-title">
      <div className="service-reveal-bg" />
      <div className="service-reveal-counter" aria-hidden="true">0</div>

      <div className="service-reveal-images" aria-hidden="true">
        {images.map((image, index) => (
          <div
            className="service-reveal-image"
            key={image}
          >
            <img src={image} alt="" />
          </div>
        ))}
      </div>

      <div className="service-reveal-topline service-reveal-line" />
      <div className="service-reveal-side-line service-reveal-line" />

      <div className="service-reveal-kicker"><span className="service-reveal-copy">Bondure technical services</span></div>
      <div className="service-reveal-main">
        <h2 id="service-reveal-title"><span className="service-reveal-copy">Evidence, brought into</span></h2>
        <h2><span className="service-reveal-copy">the conditions that matter.</span></h2>
      </div>
      <div className="service-reveal-info">
        <p><span className="service-reveal-copy">From laboratory checks to live site application, our team makes product behaviour visible before decisions become permanent.</span></p>
        <div className="service-reveal-info-rule service-reveal-line" />
        <p><span className="service-reveal-copy">Test. Compare. Apply with confidence.</span></p>
      </div>
      <div className="service-reveal-footer"><span className="service-reveal-copy">Technical support, made practical</span></div>
    </section>
  );
}
