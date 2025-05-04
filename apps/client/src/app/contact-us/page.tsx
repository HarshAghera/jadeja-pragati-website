"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import "@/app/styles/contactUsPage.css";
import axios from "axios";
import toast from "react-hot-toast";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMobile = mobile.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMobile || !trimmedMessage) {
      toast.error("Please fill in all fields");
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(trimmedMobile)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", trimmedName);
      formData.append("email", trimmedEmail);
      formData.append("mobile", trimmedMobile);
      formData.append("message", trimmedMessage);

      const response = await axios.post(
        "https://formspree.io/f/xyzweeeq",
        formData
      );
      if (response.status === 200) {
        toast.success("Your message has been submitted");
        setName("");
        setEmail("");
        setMobile("");
        setMessage("");
      } else {
        toast.error("Submission failed. Please try again");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("Something went wrong. Please try again later");
    }
  };

  return (
    <section
      className="pt-20 pb-12 overflow-x-hidden"
      style={{
        background: `
          linear-gradient(to right, rgba(255, 255, 255, 0.7) 20%, rgba(255, 245, 240, 0.3) 100%),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 10%, rgba(255, 245, 240, 0.2) 30%)
        `,
      }}
    >
      <div className="relative w-full  min-h-[200px] sm:min-h-[300px] md:min-h-[400px]">
        <Image
          src="/officeimage.webp"
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
            src="/mail.svg"
            alt="Email Icon"
            width={50}
            height={50}
            className="w-10 sm:w-12 md:w-16 mb-4"
          />
          <div className="text-base sm:text-lg md:text-2xl font-semibold mb-2 text-[#0f2557]">
            Email
          </div>
          <a
            href="mailto:jadejapragati@gmail.com"
            className="text-sm sm:text-base md:text-lg text-[#0f2557]"
          >
            jadejapragati@gmail.com
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
            src="/phone.svg"
            alt="Phone Icon"
            width={50}
            height={50}
            className="w-10 sm:w-12 md:w-16 mb-4"
          />
          <div className="text-base sm:text-lg md:text-2xl font-semibold mb-2 text-[#0f2557]">
            Phone
          </div>
          <a
            href="tel:+919999999999"
            className="text-sm sm:text-base md:text-lg text-[#0f2557]"
          >
            +91 9999999999
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
            src="/location.svg"
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

      <div className="px-4 sm:px-6 md:px-15 w-full mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start ">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 sm:p-8 rounded-lg shadow-xl bg-gradient-to-b from-[#dbe3ec]/50 via-[#f2f6fa]/50 to-white/60"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-[#0f2557]">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 ">
              <div>
                <label className="block mb-1 text-[#0f2557]">Name</label>
                <input
                  type="text"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f2557]"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-[#0f2557]">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f2557]"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-[#0f2557]">Mobile</label>
                <input
                  type="tel"
                  name="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f2557]"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-[#0f2557]">Message</label>
                <textarea
                  rows={4}
                  value={message}
                  name="message"
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f2557]"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#0f2557] text-white px-6 py-2 rounded-md font-bold submit-btn"
              >
                Submit
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-lg overflow-hidden shadow-lg h-[300px] md:h-[400px] lg:h-full"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.119285863941!2d72.6850271751667!3d23.092728779124652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e81d530295c4b%3A0xf618491998255fb6!2sK%20star%20business%20hub!5e0!3m2!1sen!2sin!4v1746157643114!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
