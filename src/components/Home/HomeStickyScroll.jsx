"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const StickyScroll = dynamic(() => import("@/components/ui/sticky-scroll"), {
  ssr: false,
  loading: () => <section className="sticky-scroll sticky-scroll--loading" aria-hidden="true" style={{ minHeight: "50vh" }} />,
});

export default function HomeStickyScroll() {
  const sentinelRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin: "800px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sentinelRef}>
      {shouldRender ? <StickyScroll /> : <section aria-hidden="true" style={{ minHeight: "100vh" }} />}
    </div>
  );
}
