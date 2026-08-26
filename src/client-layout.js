"use client";
import { useEffect } from "react";

import { ReactLenis, useLenis } from "lenis/react";
import { ViewTransitions } from "next-view-transitions";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LocaleProvider } from "@/components/LocaleProvider/LocaleProvider";
import CookieConsent from "@/components/CookieConsent/CookieConsent";
import PageTransition from "@/components/PageTransition/PageTransition";

gsap.registerPlugin(ScrollTrigger);

function ScrollTriggerSync() {
  useLenis(() => ScrollTrigger.update());

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const frame = window.requestAnimationFrame(refresh);

    window.addEventListener("load", refresh);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return null;
}

export default function ClientLayout({ children, siteChrome }) {
  const scrollSettings = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    lerp: 0.1,
    smoothWheel: true,
    smoothTouch: false,
    syncTouch: false,
  };

  return (
      <ViewTransitions>
        <LocaleProvider>
          {siteChrome}
          <ReactLenis root options={scrollSettings}>
             <ScrollTriggerSync />
             <PageTransition />
             {children}
             <CookieConsent />
          </ReactLenis>
        </LocaleProvider>
      </ViewTransitions>
  );
}
