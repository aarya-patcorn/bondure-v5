"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import "./PageTransition.css";

const ROWS = 4;
const COLUMNS = 16;

let transitionHandler = null;

export function requestPageTransition(href, navigate) {
  if (transitionHandler) {
    transitionHandler(href, navigate);
    return;
  }

  navigate();
}

export default function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const overlayRef = useRef(null);
  const blocksRef = useRef([]);
  const coveredRef = useRef(false);
  const animatingRef = useRef(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const blocks = blocksRef.current;

    const reveal = () => {
      if (!coveredRef.current) return;

      const timeline = gsap.timeline({
        onComplete: () => {
          coveredRef.current = false;
          animatingRef.current = false;
          gsap.set(overlay, { pointerEvents: "none" });
        },
      });

      for (let row = 0; row < ROWS; row += 1) {
        timeline.set(getRowBlocks(blocks, row), { transformOrigin: row % 2 === 0 ? "left center" : "right center" }, 0);
        timeline.to(getRowBlocks(blocks, row), {
          scaleX: 0,
          duration: 0.45,
          ease: "power3.inOut",
          stagger: { each: 0.018, from: row % 2 === 0 ? "start" : "end" },
        }, 0);
      }
    };

    const frame = window.requestAnimationFrame(reveal);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const blocks = blocksRef.current;

    transitionHandler = (href, navigate) => {
      if (animatingRef.current || href === window.location.pathname) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        navigate();
        return;
      }

      animatingRef.current = true;
      const timeline = gsap.timeline({ onComplete: navigate });
      timeline.set(overlay, { pointerEvents: "all" });

      for (let row = 0; row < ROWS; row += 1) {
        timeline.set(getRowBlocks(blocks, row), {
          scaleX: 0,
          transformOrigin: row % 2 === 0 ? "left center" : "right center",
        }, 0);
        timeline.to(getRowBlocks(blocks, row), {
          scaleX: 1,
          duration: 0.45,
          ease: "power3.inOut",
          stagger: { each: 0.018, from: row % 2 === 0 ? "start" : "end" },
        }, 0);
      }

      timeline.call(() => { coveredRef.current = true; });
    };

    const handleLinkClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = event.target.closest("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname || url.hash) return;

      event.preventDefault();
      transitionHandler(url.pathname + url.search, () => router.push(url.pathname + url.search));
    };

    document.addEventListener("click", handleLinkClick);
    return () => {
      document.removeEventListener("click", handleLinkClick);
      transitionHandler = null;
    };
  }, [router]);

  return (
    <div ref={overlayRef} className="page-transition" aria-hidden="true">
      <div className="page-transition__grid">
        {Array.from({ length: ROWS * COLUMNS }, (_, index) => (
          <span key={index} ref={(element) => { blocksRef.current[index] = element; }} />
        ))}
      </div>
    </div>
  );
}

function getRowBlocks(blocks, row) {
  const start = row * COLUMNS;
  return blocks.slice(start, start + COLUMNS);
}
