"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const AboutMotionContent = () => {
  return (
    <motion.div
      className="absolute bottom-[-20px] right-[-20px] 
           w-[120px] h-[80px] 
           sm:w-[140px] sm:h-[90px] 
           md:w-[180px] md:h-[110px] 
           lg:w-[200px] lg:h-[130px] 
           border-4 border-white shadow-2xl rounded-xl overflow-hidden"
      animate={{ y: [0, -15, 0] }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: 5,
        ease: "easeInOut",
      }}
    >
      <Image
        src="/pictures/thumbsup.webp"
        alt="Team Small"
        width={400}
        height={300}
        className="object-cover"
      />
    </motion.div>
  );
};

export default AboutMotionContent;
