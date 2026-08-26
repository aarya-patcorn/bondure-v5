"use client";

import Link from "next/link";

import { useLocale } from "@/components/LocaleProvider/LocaleProvider";

export default function NotFound() {
  const { locale } = useLocale();
  const isGerman = locale === "de";

  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="mb-4 !text-sm !font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">404</p>
        <h1 className="!text-[clamp(2.5rem,7vw,5rem)] !tracking-[-0.06em]">
          {isGerman ? "Seite nicht gefunden" : "Page not found"}
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-[var(--base-300)]">
          {isGerman
            ? "Die gesuchte Seite ist nicht verfügbar oder wurde verschoben."
            : "The page you are looking for is unavailable or has moved."}
        </p>
        <Link className="mt-8 inline-flex rounded-full bg-[var(--primary)] px-6 py-3 text-white" href="/">
          {isGerman ? "Zur Startseite" : "Back to home"}
        </Link>
      </div>
    </main>
  );
}
