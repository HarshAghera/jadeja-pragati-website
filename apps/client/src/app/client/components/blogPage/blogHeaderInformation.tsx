"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface BlogHeaderProps {
  title: string;
  description: string;
}

export default function BlogHeaderInformation({ title,description }: BlogHeaderProps) {
  return (
    <section
      className="pt-20 overflow-x-hidden"
      style={{
        background: `
        linear-gradient(to right, rgba(255, 255, 255, 0.7) 20%, rgba(255, 245, 240, 0.3) 100%),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 10%, rgba(255, 245, 240, 0.2) 30%)
      `,
      }}
    >
      <div className="relative w-full min-h-[200px] sm:min-h-[300px] md:min-h-[350px]">
        <Image
          src="/pictures/officeimage.webp"
          alt="Background"
          fill
          className="object-cover z-0"
          priority
        />
        <div className="absolute inset-0 bg-white/90 z-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-20 max-w-3xl px-4 md:px-6 py-12 text-center lg:text-left lg:ml-20 lg:mx-0 mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl mt-2 mb-6 text-[#0f2557] getintouch">
            {title}
          </h2>
          <p className="text-gray-700 text-sm sm:text-base md:text-xl leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
