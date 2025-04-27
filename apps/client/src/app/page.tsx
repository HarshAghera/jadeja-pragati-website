"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import Services from "./sections/services";
import WhyChooseUs from "./sections/whyChooseUs";

import HomePage from "./sections/homePage";
import Aboutus from "./sections/aboutUs";

const FloatingWhatsAppButton = () => {
  return (
    <Link
      href="https://wa.me/9825942142"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
    >
      <FaWhatsapp className="w-6 h-6 sm:w-7 sm:h-7" />
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
    </main>
  );
}
