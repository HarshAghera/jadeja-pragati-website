'use client';

import Services from './sections/services';
import WhyChooseUs from './sections/whyChooseUs';
import HomePage from './sections/homePage';
import Testimonials from './sections/testimonials';
import Loading from './loading';
import { useEffect, useState } from 'react';

export default function MainPage() {
  const [loading, setLoading] = useState(true); // Global loading state

  useEffect(() => {
    const checkImagesLoaded = () => {
      const images = Array.from(document.images);
      return images.every((image) => image.complete);
    };

    const handlePageLoad = () => {
      if (checkImagesLoaded()) {
        setLoading(false); // All resources are loaded, stop loader
      } else {
        const interval = setInterval(() => {
          if (checkImagesLoaded()) {
            setLoading(false);
            clearInterval(interval);
          }
        }, 100);
      }
    };

    // Use window.onload to ensure all resources (images, styles, etc.) are loaded
    window.onload = handlePageLoad;

    // Adding a minimum loading time of 1 second (adjust as needed)
    const timeout = setTimeout(() => {
      if (loading) setLoading(false);
    }, 1500); // Ensures that the loader stays for at least 1.5 second

    // Cleanup timeout and event listener on unmount
    return () => {
      clearTimeout(timeout);
      window.onload = null;
    };
  }, [loading]); // Run the effect when `loading` state changes

  if (loading) {
    return <Loading />; // Show loading component until loading is false
  }

  return (
    <main>
      <HomePage />
      <Services />
      <WhyChooseUs />
      <Testimonials />
    </main>
  );
}
