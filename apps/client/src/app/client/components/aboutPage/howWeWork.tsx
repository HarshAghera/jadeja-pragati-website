"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HowWeWorkSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="howWeWork py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#0f2557] mb-6">
          How we work?
        </h2>
        <p className="text-gray-700 mb-8 text-base sm:text-lg">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab quos
          minima molestias?
        </p>

        <div className="relative w-full max-w-3xl mx-auto aspect-video rounded-lg shadow-lg overflow-hidden group">
          {isPlaying ? (
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/"
              title="How We Work"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          ) : (
            <>
              <Image
                src="/pictures/thumbnail.webp"
                alt="Video preview"
                className="w-full h-full object-cover opacity-90"
                width={1280}
                height={720}
                priority
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  onClick={() => setIsPlaying(true)}
                  className="w-12 h-12 sm:w-18 sm:h-18 rounded-full p-0 bg-white hover:bg-white/80 flex items-center justify-center transition cursor-pointer"
                >
                  <svg
                    className="w-12 h-12 text-[#0f2557]"
                    viewBox="0 0 100 100"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polygon
                      points="30,20 75,50 30,80"
                      transform="scale(1.6) translate(-18, -20)"
                    />
                  </svg>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
