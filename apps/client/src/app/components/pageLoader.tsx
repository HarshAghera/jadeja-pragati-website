"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loading from "../loading";

interface PageLoaderProps {
  children: React.ReactNode;
}

export default function PageLoader({ children }: PageLoaderProps) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const minDuration = 600; 
    const start = Date.now();

    let intervalId: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;

    const handleLoading = () => {
      const images = Array.from(document.images);
      const checkLoaded = () =>
        images.every((img) => img.complete && img.naturalHeight !== 0);

      if (checkLoaded()) {
        const elapsed = Date.now() - start;
        const delay = Math.max(0, minDuration - elapsed);
        setTimeout(() => setLoading(false), delay);
        return;
      }

      intervalId = setInterval(() => {
        if (checkLoaded()) {
          clearInterval(intervalId);
          clearTimeout(timeoutId);

          const elapsed = Date.now() - start;
          const delay = Math.max(0, minDuration - elapsed);
          setTimeout(() => setLoading(false), delay);
        }
      }, 100);

      timeoutId = setTimeout(() => {
        clearInterval(intervalId);

        const elapsed = Date.now() - start;
        const delay = Math.max(0, minDuration - elapsed);
        setTimeout(() => setLoading(false), delay);
      }, 3000); 
    };

    handleLoading();

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  if (loading) return <Loading />;

  return <>{children}</>;
}
