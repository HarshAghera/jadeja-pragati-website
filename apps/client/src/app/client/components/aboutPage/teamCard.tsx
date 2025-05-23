"use client";
import Image from "next/image";
import { motion } from "framer-motion";

type TeamCardProps = {
  name: string;
  position: string;
  image: string;
};

const TeamCard = ({ name, position, image }: TeamCardProps) => {
  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
    >
      <div className="relative w-[280px] h-[300px] sm:w-[350px] sm:h-[340px] rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={image}
          alt={name}
          width={350}
          height={340}
          className="rounded-2xl object-cover object-center w-full h-full"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-[#0f2557]">{name}</h3>
        <p className="text-sm text-gray-600">{position}</p>
      </div>
    </motion.div>
  );
};

export default TeamCard;
