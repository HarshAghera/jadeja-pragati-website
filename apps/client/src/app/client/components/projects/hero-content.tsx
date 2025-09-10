"use client";

import { motion } from "framer-motion";

export default function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-20 max-w-3xl px-4 md:px-6 py-12 text-center lg:text-left lg:ml-20 lg:mx-0 mx-auto"
    >
      <h2 className="text-4xl sm:text-5xl md:text-6xl mt-2 mb-6 text-[#0f2557] getintouch">
        Limited Liability Partnership Registration
      </h2>
      <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
        A Limited Liability Partnership (LLP) is a business structure that
        combines the flexibility of a partnership with the benefits of limited
        liability for its partners. It is a popular choice for startups,
        professionals, and small to medium-sized businesses looking for a
        cost-effective and legally compliant structure. An LLP ensures that each
        partner’s liability is limited to their agreed contribution, protecting
        personal assets while offering operational freedom.
      </p>
    </motion.div>
  );
}
