"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const lenis = new Lenis({
      autoRaf: true,
      duration: isMobile ? 0.6 : 0.6,
      easing: (t: number) => 1 - Math.pow(2, -10 * t),
      wheelMultiplier: isMobile ? 1.2 : 0.6,
      touchMultiplier: isMobile ? 1.8 : 1,
      gestureOrientation: "vertical",
      syncTouch: true,
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
