"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import "@/app/styles/homePage.css";

import React from "react";

const HomePage = () =>{
    return (
      <section
        id="home"
        className="hero-section relative min-h-[70vh] md:min-h-[80vh] lg:min-h-screen 2xl:min-h-[100vh] flex flex-col justify-start items-start overflow-hidden text-left "
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/officeimage.jpg"
            alt="Office Background"
            fill
            className="object-cover object-center lg:object-top"
            priority
            quality={100}
          />
        </div>

        <div className="hero-overlay absolute inset-0 z-10" />

        <div className="w-full max-w-3xl 2xl:max-w-6xl px-5 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-20 relative z-30 pt-29 sm:pt-16 md:pt-20 lg:pt-24 2xl:pt-28">
          <div>
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl 2xl:text-6xl font-bold leading-tight mb-12 sm:mb-12 lg:mb-12 xl:mb-12"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "rgb(15 37 87 / 1)",
              }}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              Empowering Businesses <br />
              with Compliance Solutions <br />
              for the Modern Enterprise
            </motion.h1>

            <motion.div
              className="flex flex-wrap gap-2 sm:gap-3 md:gap-3 mb-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Link href="/Projects">
                <Button
                  className="group bg-[#0f2557] text-white third 
                  text-sm sm:text-lg md:text-xl 2xl:text-lg
                  px-5 py-3 sm:px-8 sm:py-5 md:px-10 md:py-6 2xl:px-10 2xl:py-6
                  rounded-full flex items-center gap-2 pr-4 sm:pr-6 md:pr-8 mb-5 "
                >
                  View Projects
                </Button>
              </Link>
            </motion.div>

            <motion.p
              className="text-md sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl max-w-2xl text-[#0f2557]/90"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              Navigating regulatory complexities with confidence. Our expert
              solutions ensure your business stays compliant while focusing on
              growth.
            </motion.p>
          </div>
        </div>
      </section>
    );
}

export default HomePage;