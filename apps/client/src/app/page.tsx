"use client";

import Services from "./sections/services";
import WhyChooseUs from "./sections/whyChooseUs";
import HomePage from "./sections/homePage";
import Testimonials from "./sections/testimonials";

export default function MainPage() {
  return (
    <main>
      <HomePage />
      <Services />
      <WhyChooseUs />
      <Testimonials />
    </main>
  );
}
