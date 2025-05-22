"use client"

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import "@/app/styles/contactUsPage.css"; 

const Getintouch = () => {
  return (
    <div>
      <div className="relative w-full min-h-[200px] sm:min-h-[300px] md:min-h-[400px]">
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
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="relative z-20 max-w-3xl px-4 md:px-6 py-12 text-center lg:text-left lg:ml-20 lg:mx-0 mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl mt-2 mb-6 text-[#0f2557] getintouch">
            Get in touch
          </h2>
          <p className="text-gray-700 text-sm sm:text-base md:text-xl leading-relaxed">
            You can ask us a question or submit an enquiry or request using the
            form below. Please complete the form in as much detail as possible,
            so we are able to direct the enquiry to the relevant department.
          </p>
        </motion.div>
      </div>

      <div className="informative-section grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-6 md:px-10 py-5 w-full min-h-[270px]">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center flex flex-col items-center mt-4"
        >
          <Image
            src="/icons/mail.svg"
            alt="Email Icon"
            width={50}
            height={50}
            className="w-10 sm:w-12 md:w-16 mb-4"
          />
          <div className="text-base sm:text-lg md:text-2xl font-semibold mb-2 text-[#0f2557]">
            Email
          </div>
          <a
            href="mailto:jadejapragati.pltd@gmail.com"
            className="text-sm sm:text-base md:text-lg text-[#0f2557]"
          >
            jadejapragati.pltd@gmail.com
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center flex flex-col items-center mt-4"
        >
          <Image
            src="/icons/phone.svg"
            alt="Phone Icon"
            width={50}
            height={50}
            className="w-10 sm:w-12 md:w-16 mb-4"
          />
          <div className="text-base sm:text-lg md:text-2xl font-semibold mb-2 text-[#0f2557]">
            Phone
          </div>
          <a
            href="tel:+917202096968"
            className="text-sm sm:text-base md:text-lg text-[#0f2557]"
          >
            +91 7202096968
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center flex flex-col items-center mt-4"
        >
          <Image
            src="/icons/location.svg"
            alt="Location Icon"
            width={50}
            height={50}
            className="w-10 sm:w-12 md:w-16 mb-4"
          />
          <div className="text-base sm:text-lg md:text-2xl font-semibold mb-2 text-[#0f2557]">
            Office
          </div>
          <p className="text-sm sm:text-base md:text-lg text-[#0f2557] leading-relaxed text-center">
            415, K-Star Business Hub,
            <br />
            Nr. White Pelican, Opp. D-Mart,
            <br />
            S.P. Ring Road, Dehgam Cross Road,
            <br />
            Ahmedabad
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Getintouch;
