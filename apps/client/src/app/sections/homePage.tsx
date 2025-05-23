import React from "react";
import Image from "next/image";
import HomeClientContent from "../client/components/homePage/homeClientContent";

const HomePage = () => {
  return (
    <section
      id="home"
      className="hero-section relative min-h-[70vh] md:min-h-[80vh] lg:min-h-screen 2xl:min-h-[100vh] flex flex-col justify-start items-start overflow-hidden text-left"
    >
      <div className="absolute inset-0 z-0 bg-[#eaeaea]">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="/pictures/windmill-mobile.webp"
          />
          <Image
            src="/pictures/windmill.webp"
            alt="Illustration symbolizing recycling, reuse, and sustainable compliance solutions by JadejaPragati"
            fill
            priority
            quality={60}
            className="object-cover object-center lg:object-top"
          />
        </picture>
      </div>

      <div className="hero-overlay absolute inset-0 bg-[#0f2557]/30 z-10" />

      <HomeClientContent />
    </section>
  );
};

export default HomePage;
