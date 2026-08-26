"use client";

import { useReportWebVitals } from "next/web-vitals";

const endpoint = process.env.NEXT_PUBLIC_WEB_VITALS_ENDPOINT;

export default function WebVitals() {
  useReportWebVitals((metric) => {
    if (!endpoint) {
      if (process.env.NODE_ENV === "development") {
        console.info("[Web Vitals]", metric);
      }
      return;
    }

    const body = JSON.stringify({
      ...metric,
      path: window.location.pathname,
      navigationType: performance.getEntriesByType("navigation")[0]?.type,
      connection: navigator.connection?.effectiveType,
      saveData: navigator.connection?.saveData,
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, new Blob([body], { type: "application/json" }));
      return;
    }

    fetch(endpoint, {
      method: "POST",
      body,
      headers: { "content-type": "application/json" },
      keepalive: true,
    }).catch(() => {});
  });

  return null;
}
