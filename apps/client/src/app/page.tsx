"use client";

import { useEffect, useState } from "react";
import Services from "./sections/services";
import WhyChooseUs from "./sections/whyChooseUs";
import HomePage from "./sections/homePage";
import Testimonials from "./sections/testimonials";
import AboutUs from "./sections/aboutUs";
import Loading from "./loading";
import { JSX } from "react/jsx-runtime";

export default function MainPage(): JSX.Element {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkImagesLoaded = (): boolean => {
      const images: HTMLImageElement[] = Array.from(document.images);
      return images.every((image) => image.complete);
    };

    const handlePageLoad = () => {
      if (checkImagesLoaded()) {
        setLoading(false); 
      } else {
        const interval = setInterval(() => {
          if (checkImagesLoaded()) {
            setLoading(false);
            clearInterval(interval);
          }
        }, 100);
      }
    };

    handlePageLoad();

    const timeout = setTimeout(() => {
      if (loading) setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, []); 

  if (loading) {
    return <Loading />; 
  }

  return (
    <main>
      <HomePage />
      <Services />
      <AboutUs />
      <WhyChooseUs />
      <Testimonials />
    </main>
  );
}
