"use client";

import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/LocaleProvider/LocaleProvider";

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Controls the speed of auto-rotation when not scrolling. */
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 600, autoRotateSpeed = 0.02, ...props }, ref) => {
    const { locale } = useLocale();
    const labels = locale === "de"
      ? {
          gallery: "Kreisförmige Projektgalerie",
          previous: "Vorheriges Projektbild anzeigen",
          next: "Nächstes Projektbild anzeigen",
        }
      : {
          gallery: "Circular project gallery",
          previous: "Show previous project image",
          next: "Show next project image",
        };
    const [rotation, setRotation] = useState(0);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      const autoRotate = () => {
        setRotation((previous) => previous + autoRotateSpeed);
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);
      return () => {
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [autoRotateSpeed]);

    const anglePerItem = items.length ? 360 / items.length : 0;
    const rotateGallery = (direction: number) => {
      setRotation((previous) => previous + direction * anglePerItem);
    };

    return (
      <div
        ref={ref}
        role="region"
        aria-label={labels.gallery}
        className={cn("relative flex h-full w-full items-center justify-center", className)}
        style={{ perspective: "2000px" }}
        {...props}
      >
        <div
          className="relative h-full w-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((item, index) => {
            const itemAngle = index * anglePerItem;
            const relativeAngle = (itemAngle + (rotation % 360) + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.3, 1 - normalizedAngle / 180);

            return (
              <div
                key={`${item.common}-${item.photo.url}`}
                role="group"
                aria-label={item.common}
                className="absolute left-1/2 top-1/2 h-[min(400px,58vh)] w-[min(300px,78vw)] -translate-x-1/2 -translate-y-1/2"
                style={{
                  transform: `translate(-50%, -50%) rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  opacity,
                  transition: "opacity 0.3s linear",
                }}
              >
                <div className="group relative h-full w-full overflow-hidden rounded-lg border border-white/20 bg-neutral-900/30 shadow-2xl backdrop-blur-lg">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: item.photo.pos || "center" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="absolute inset-x-0 bottom-8 z-20 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => rotateGallery(1)}
            aria-label={labels.previous}
            className="grid size-12 cursor-pointer place-items-center rounded-full border border-white/40 bg-black/45 text-2xl text-white backdrop-blur-md transition hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => rotateGallery(-1)}
            aria-label={labels.next}
            className="grid size-12 cursor-pointer place-items-center rounded-full border border-white/40 bg-black/45 text-2xl text-white backdrop-blur-md transition hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    );
  },
);

CircularGallery.displayName = "CircularGallery";

export { CircularGallery };
