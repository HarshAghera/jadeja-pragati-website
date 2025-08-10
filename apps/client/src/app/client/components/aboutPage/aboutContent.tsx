"use client";

import { motion } from "framer-motion";

export default function AboutContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-20 max-w-3xl px-4 md:px-6 py-12 text-center lg:text-left lg:ml-20 lg:mx-0 mx-auto"
    >
      <h2 className="text-4xl sm:text-5xl md:text-6xl mt-2 mb-6 text-[#0f2557] getintouch">
        Who we are?
      </h2>
      <p className="text-gray-700 text-sm sm:text-base md:text-xl leading-relaxed">
        We are a team of dedicated professionals who help businesses grow and
        stay compliant. Our goal is to make complex processes simple and provide
        clear, reliable guidance every step of the way.
      </p>
    </motion.div>
  );
}
