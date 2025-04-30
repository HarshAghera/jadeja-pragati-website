"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import Services from "./sections/services";
import WhyChooseUs from "./sections/whyChooseUs";
import HomePage from "./sections/homePage";
import Aboutus from "./sections/aboutUs";
import Testimonials from "./sections/testimonials";

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
  return (
    <main>
      <FloatingWhatsAppButton />
      <HomePage />
      <Services />
      <WhyChooseUs />
      <Aboutus />
      <Testimonials/>
    </main>
  );
}
