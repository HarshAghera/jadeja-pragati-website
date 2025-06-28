"use client";

import { motion } from "framer-motion";

export default function BlogContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-20 max-w-3xl px-4 md:px-6 py-12 text-center lg:text-left lg:ml-20 lg:mx-0 mx-auto"
    >
      <h2 className="text-4xl sm:text-5xl md:text-6xl mt-2 mb-6 text-[#0f2557] getintouch">
        Blogs
      </h2>
      <p className="text-gray-700 text-sm sm:text-base md:text-xl leading-relaxed">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur,
        accusamus obcaecati. Optio, sit repellat, est voluptatum iste tenetur
        dignissimos minus fugit magni eaque odio dolorem!
      </p>
    </motion.div>
  );
}
