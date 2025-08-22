"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const lenis = new Lenis({
      duration: isMobile ? 1.2 : 0.6, 
      easing: (t) => 1 - Math.pow(2, -10 * t),
      wheelMultiplier: isMobile ? 1 : 0.6, 
      touchMultiplier: isMobile ? 1 : 1,
      gestureOrientation: "vertical",
      syncTouch: true,
      smoothWheel: true,
      // smoothTouch: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
