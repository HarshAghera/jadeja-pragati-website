"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4, // increase duration for smoother effect
      easing: (t) => 1 - Math.pow(2, -10 * t), // smooth exponential easing
      wheelMultiplier: 0.9, // control wheel speed
      touchMultiplier: 1.2, // smooth out touch on mobile
      gestureOrientation: "vertical", // keep vertical scroll
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
