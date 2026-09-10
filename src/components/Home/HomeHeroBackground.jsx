"use client";

import { useEffect, useRef, useState } from "react";

const HERO_VIDEO = {
  src: "/home-media/home_page_intro.mp4",
  poster: "/optimized/home/home-page-intro-poster.webp",
};

export default function HomeHeroBackground() {
  const videoRef = useRef(null);
  const [motionEnabled, setMotionEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = navigator.connection?.saveData;
    setMotionEnabled(!reducedMotion && !saveData);
  }, []);

  useEffect(() => {
    if (!motionEnabled) return undefined;

    const video = videoRef.current;
    if (!video) return undefined;

    const playVideo = () => {
      const attempt = video.play();
      if (attempt && typeof attempt.catch === "function") {
        attempt.catch(() => {});
      }
    };

    video.addEventListener("canplay", playVideo);
    video.addEventListener("loadeddata", playVideo);

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      playVideo();
    }

    return () => {
      video.removeEventListener("canplay", playVideo);
      video.removeEventListener("loadeddata", playVideo);
    };
  }, [motionEnabled]);

  return (
    <div className="home-hero__background">
      <img
        className="home-hero__video-poster"
        src={HERO_VIDEO.poster}
        alt=""
        decoding="async"
        fetchPriority="high"
        loading="eager"
      />
      {motionEnabled ? (
        <video
          ref={videoRef}
          className="home-hero__video"
          src={HERO_VIDEO.src}
          poster={HERO_VIDEO.poster}
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
