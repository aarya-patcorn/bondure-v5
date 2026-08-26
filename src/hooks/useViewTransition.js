"use client";
import { useRouter } from "next/navigation";
import { requestPageTransition } from "@/components/PageTransition/PageTransition";

export const useViewTransition = () => {
  const router = useRouter();

  const navigateWithTransition = (href, options = {}) => {
    const currentPath = window.location.pathname;
    if (currentPath === href) {
      return;
    }

    requestPageTransition(href, () => router.push(href, options));
  };

  return { navigateWithTransition, router };
};
