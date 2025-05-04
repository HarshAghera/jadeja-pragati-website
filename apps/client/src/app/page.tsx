'use client';

import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import Services from './sections/services';
import WhyChooseUs from './sections/whyChooseUs';
import HomePage from './sections/homePage';
import Testimonials from './sections/testimonials';
import Loading from './loading';
import { useEffect, useState } from 'react';

const FloatingWhatsAppButton = () => {
  return (
    <Link
      href="https://wa.me/1111111111"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 bg-[#25D366] hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
    >
      <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6" />
    </Link>
  );
};

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
      <FloatingWhatsAppButton />
      <HomePage />
      <Services />
      <WhyChooseUs />
      <Testimonials />
    </main>
  );
}
