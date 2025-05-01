"use client";

import React, { useState } from "react";
import "@/app/styles/aboutUs.css";
import { Button } from "@/components/ui/button"; 
import Image from "next/image";

const Aboutus = () => {
  const [videoSrc, setVideoSrc] = useState("");

  const handlePlayClick = () => {
    setVideoSrc(
      "https://www.youtube.com/embed/iuJDhFRDx9M?si=moidBAOcUPnjIdtZ");
  };

  return (
    <section className="aboutus-section relative overflow-hidden  py-15 md:py-24">
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16" data-aos="fade-down">
          <h2 className="text-[#0f2557] text-4xl md:text-5xl font-bold inline-block">
            Who we are?
            <span className="block w-20 h-1 bg-[#0f2557] mt-3 mx-auto rounded-full"></span>
          </h2>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div
            className="space-y-8 flex flex-col justify-between"
            data-aos="fade-up"
          >
            <p className="text-2xl text-[#0f2557] font-medium leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
              quia! Consectetur officia eius explicabo provident. Ex voluptate
              reprehenderit molestiae obcaecati!
            </p>

            <Button className="aboutButton bg-[#0f2557] text-white text-lg md:text-xl lg:text-2xl rounded-full px-8 py-6 flex items-center gap-3 w-max mt-6">
              About us <span className="transition-transform ">→</span>
            </Button>
          </div>

          <div
            className="relative group rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 cursor-pointer max-w-xl mx-auto w-full"
            onClick={handlePlayClick}
            data-aos="zoom-in"
          >
            {!videoSrc && (
              <>
                <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[300px]">
                  <Image
                    src="/lightblueoffice.webp"
                    alt="Light Blue Office"
                    fill
                    className="object-cover object-center"
                    priority 
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-18 h-18 border-2  border-white bg-transparent rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="32"
                      height="32"
                      fill="currentColor"
                      className="text-white"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </>
            )}

            {videoSrc && (
              <iframe
                width="100%"
                height="100%"
                src={videoSrc}
                title="About Us Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-3xl w-full h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px]"
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
