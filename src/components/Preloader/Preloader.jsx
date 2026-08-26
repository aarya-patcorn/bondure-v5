"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { useLocale } from "../LocaleProvider/LocaleProvider";

let isInitialLoad = true;

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const WORDS = ["BINDUNG", "बंधन", "BONDURE"];

export default function Preloader() {
  const loaderRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);
  const [loaderAnimating, setLoaderAnimating] = useState(false);
  const lenis = useLenis();
  const { locale } = useLocale();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      isInitialLoad = false;
      setShowPreloader(false);
      return undefined;
    }

    const safetyTimeout = window.setTimeout(() => {
      isInitialLoad = false;
      setLoaderAnimating(false);
      setShowPreloader(false);
    }, 10000);

    return () => {
      window.clearTimeout(safetyTimeout);
      isInitialLoad = false;
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;

    if (loaderAnimating) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [lenis, loaderAnimating]);

  useGSAP(
    () => {
      if (!showPreloader || !loaderRef.current) return undefined;

      setLoaderAnimating(true);
      let pageReady = document.readyState === "complete";
      let isExiting = false;

      const markReady = () => {
        pageReady = true;
      };

      window.addEventListener("load", markReady, { once: true });
      const fallback = window.setTimeout(markReady, 8000);

      const words = gsap.utils.toArray(
        loaderRef.current.querySelectorAll(".count .digit h1")
      );
      const blocks = loaderRef.current.querySelectorAll(".block");

      gsap.set(words, { y: "125%" });

      const finishLoader = () => {
        if (isExiting) return;
        isExiting = true;
        wordLoop.pause();
        gsap.to(words, { y: "-125%", duration: 0.55, ease: "power3.in" });
        gsap.to(blocks, {
          scaleX: 0,
          duration: 1.15,
          stagger: 0.08,
          delay: 0.35,
          ease: "hop",
          onComplete: () => {
            isInitialLoad = false;
            setLoaderAnimating(false);
            setShowPreloader(false);
          },
        });
      };

      const wordLoop = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power4.out" },
        onRepeat: () => {
          if (pageReady) finishLoader();
        },
      });

      words.forEach((word) => {
        wordLoop
          .set(word, { y: "125%" })
          .to(word, { y: "0%", duration: 0.7 })
          .to(word, { y: "0%", duration: 0.4 })
          .to(word, { y: "-125%", duration: 0.65, ease: "power3.in" });
      });

      return () => {
        window.removeEventListener("load", markReady);
        window.clearTimeout(fallback);
        wordLoop.kill();
      };
    },
    { scope: loaderRef, dependencies: [showPreloader] }
  );

  if (!showPreloader) return null;

  return (
    <div
      className="loader"
      ref={loaderRef}
      role="status"
      aria-label={locale === "de" ? "Bondure wird geladen" : "Loading Bondure"}
    >
      <div className="overlay" aria-hidden="true">
        <div className="block" />
        <div className="block" />
      </div>
      <div className="counter">
        {WORDS.map((word) => (
          <div className="count" key={word}>
            <div className="digit">
              <h1 className={word === "BINDUNG" ? "loader__word--italic" : undefined}>{word}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
