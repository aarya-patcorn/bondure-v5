"use client";

import { useEffect, useState } from "react";

const HERO_VIDEO = {
  src: "/home-media/home_page_intro.mp4",
  // poster: "/optimized/home/hero-poster.webp",
};

export default function HomeHeroBackground() {
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = navigator.connection?.saveData;
    const enabled = !reducedMotion && !saveData;
    setMotionEnabled(enabled);

    if (!enabled) return undefined;

    const scheduleVideo = () => setLoadVideo(true);

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(scheduleVideo, { timeout: 3000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(scheduleVideo, 2000);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className="home-hero__background">
      {/* <img
        className="home-hero__video-poster"
        src={HERO_VIDEO.poster}
        alt=""
        decoding="async"
        fetchPriority="high"
        loading="eager"
      /> */}
      {motionEnabled && loadVideo ? (
        <video
          className="home-hero__video"
          src={HERO_VIDEO.src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      ) : null}
      <div className="home-hero__video-scrim" aria-hidden="true" />
    </div>
  );
}
