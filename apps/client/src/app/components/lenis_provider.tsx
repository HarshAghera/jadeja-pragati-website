"use client";

import { useEffect, useState, createContext, useContext, useRef } from "react";
import Lenis from "lenis";

const SmoothScrollerContext = createContext<Lenis | null>(null);

export const useSmoothScroller = () => useContext(SmoothScrollerContext);

export default function SmoothContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenisRef, setLenis] = useState<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const scroller = new Lenis();

    function raf(time: number) {
      scroller.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);
    setLenis(scroller);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      scroller.destroy();
    };
  }, []);

  return (
    <SmoothScrollerContext.Provider value={lenisRef}>
      {children}
    </SmoothScrollerContext.Provider>
  );
}
