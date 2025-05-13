"use client";
import { motion } from "framer-motion";
import ContactForm from "./contactForm";

const MapContact=()=>{
    return (
      <div className="px-4 sm:px-6 md:px-15 w-full mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
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
            <ContactForm />
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
    );
}

export default MapContact;