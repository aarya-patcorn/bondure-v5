"use client";
import "./CTAWindow.css";

import { useEffect, useRef, useState } from "react";
import Copy from "../Copy/Copy";
import { RiYoutubeLine } from "react-icons/ri";

const CTAWindow = ({
  img,
  video,
  header,
  ctaLabel,
  ctaHref,
  showOverlay = true,
}) => {
  const mediaRef = useRef(null);
  const [videoEnabled, setVideoEnabled] = useState(false);

  useEffect(() => {
    if (!video || !mediaRef.current) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || navigator.connection?.saveData) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVideoEnabled(entry.isIntersecting),
      { rootMargin: "200px" },
    );
    observer.observe(mediaRef.current);
    return () => observer.disconnect();
  }, [video]);

  return (
    <section className={`cta-window${video ? " cta-window--video" : ""}`}>
      <div className="container">
        <div className="cta-window-img-wrapper" ref={mediaRef}>
          {video ? (
            videoEnabled ? <video src={video} autoPlay muted loop playsInline preload="none" /> : null
          ) : img ? (
            <img src={img} alt="" loading="lazy" decoding="async" />
          ) : null}
        </div>
        {showOverlay && <div className="cta-window-img-overlay" />}
        {header && (
          <div className="cta-window-header">
            <Copy delay={0.1}>
              <h1>{header}</h1>
            </Copy>
          </div>
        )}
        {ctaLabel && ctaHref && (
          <a className="cta-window-link" href={ctaHref} target="_blank" rel="noreferrer">
            <RiYoutubeLine className="cta-window-link__icon" aria-hidden="true" />
            <span>{ctaLabel}</span>
          </a>
        )}
      </div>
    </section>
  );
};

export default CTAWindow;
