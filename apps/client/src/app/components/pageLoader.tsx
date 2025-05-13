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

    let intervalId: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;

    const handleLoading = () => {
      const images = Array.from(document.images);
      const checkLoaded = () =>
        images.every((img) => img.complete && img.naturalHeight !== 0);

      if (checkLoaded()) {
        setLoading(false);
        return;
      }

      intervalId = setInterval(() => {
        if (checkLoaded()) {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
          setLoading(false);
        }
      }, 100);

      timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        setLoading(false);
      }, 1000);
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
