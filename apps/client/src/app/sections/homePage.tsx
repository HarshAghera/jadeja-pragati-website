import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import "@/app/styles/homePage.css";

const HomePage = () => {
  return (
    <section
      id="home"
      className="hero-section relative min-h-[70vh] md:min-h-[80vh] lg:min-h-screen 2xl:min-h-[100vh] flex flex-col justify-start items-start overflow-hidden text-left"
    >
      <div className="absolute inset-0 z-0 bg-[#eaeaea]">
        <picture>
          <source media="(max-width: 768px)" srcSet="/windmill-mobile.webp" />
          <Image
            src="/windmill.webp"
            alt="Illustration symbolizing recycling, reuse, and sustainable compliance solutions by JadejaPragati"
            fill
            priority
            quality={60}
            className="object-cover object-center lg:object-top"
          />
        </picture>
      </div>

      <div className="hero-overlay absolute inset-0 bg-[#0f2557]/30 z-10" />

      {/* Content */}
      <div className="w-full max-w-3xl 2xl:max-w-6xl px-5 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-20 relative z-30 pt-29 sm:pt-16 md:pt-20 lg:pt-24 2xl:pt-28">
        <motion.h1
          className="heading text-[#0f2557] text-3xl sm:text-4xl md:text-5xl lg:text-5xl 2xl:text-6xl leading-tight mb-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          Empowering Businesses <br />
          with Compliance Solutions <br />
          for the Modern Enterprise
        </motion.h1>

        <motion.div
          className="flex flex-wrap gap-2 sm:gap-3 md:gap-3 mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
        >
          <Link href="/projects">
            <Button
              className="group bg-[#0f2557] text-white third 
                text-sm sm:text-lg md:text-xl 2xl:text-lg
                px-5 py-3 sm:px-8 sm:py-5 md:px-10 md:py-6 2xl:px-10 2xl:py-6
                rounded-full flex items-center gap-2 pr-4 sm:pr-6 md:pr-8 mb-5"
            >
              View Projects
            </Button>
          </Link>
        </motion.div>

        <motion.p
          className="para text-md sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl max-w-2xl text-[#0f2557]/90 mb-8 sm:mb-6 lg:mb-0"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
        >
          Navigating regulatory complexities with confidence. Our expert
          solutions ensure your business stays compliant while focusing on
          growth.
        </motion.p>
      </div>
    </section>
  );
};

export default HomePage;
