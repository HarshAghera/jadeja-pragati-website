"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ContactFormSmall from "@/app/client/components/small-contact-form";
import { sections } from "./sections/sidebar";
import "@/app/styles/esg.css";

export default function ScrapBatteryImportPage() {
  const [active, setActive] = useState("");
  const [sidebarFixed, setSidebarFixed] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null); // Ref to track start of main content

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        const rect = mainRef.current.getBoundingClientRect();
        const offsetFromTop = rect.top + window.scrollY;
        setSidebarFixed(window.scrollY >= offsetFromTop - 100);
      }

      // Scrollspy
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActive(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ✅ HERO Section */}
      <section
        className="pt-20"
        style={{
          background: `
            linear-gradient(to right, rgba(255, 255, 255, 0.7) 20%, rgba(255, 245, 240, 0.3) 100%),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 10%, rgba(255, 245, 240, 0.2) 30%)
          `,
        }}
      >
        <div className="relative w-full h-auto py-12 lg:py-20 overflow-hidden">
          <Image
            src="/pictures/officeimage.webp"
            alt="Background"
            fill
            className="object-cover z-0"
            priority
          />
          <div className="absolute inset-0 bg-white/90 z-10" />

          <div className="relative z-20 px-5 sm:px-6">
            <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
              <div className="md:w-full lg:w-1/2">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#0f2557] mb-7 leading-[1.4]">
                  Acquire Authorization through our Experts and Start your Scrap
                  Battery Import Business with JadejaPragati
                </h2>
                <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-8">
                  Our experts assist you in obtaining the necessary
                  authorizations, handling legal documentation, and streamlining
                  the entire process to kickstart your scrap battery import
                  business confidently.
                </p>
                <ul className="space-y-4 custom-checklist text-gray-800 text-base sm:text-lg">
                  <li>Consultation regarding the Registration Process</li>
                  <li>
                    Arrangement of Required Documents for Scrap Battery Import
                    License
                  </li>
                  <li>Support in Application Filing Procedure</li>
                  <li>Cooperation with the Authorities for Licensing</li>
                </ul>
              </div>

              <div className="w-full max-w-[550px] lg:max-w-[380px] bg-[#0f2557] text-white rounded-xl p-6 shadow-lg ml-0 lg:ml-auto">
                <h3 className="text-xl sm:text-2xl font-semibold mb-6">
                  Talk to Expert Advisor
                </h3>
                <ContactFormSmall />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ MAIN CONTENT SECTION */}
      <div ref={mainRef} className="flex gap-8 px-4 lg:px-12 mt-10 mb-24">
        {/* ✅ LEFT Sticky Sidebar */}
        <nav
          className="w-64 hidden lg:block overflow-auto max-h-[calc(100vh-6rem)]"
          style={{
            position: sidebarFixed ? "fixed" : "relative",
            top: sidebarFixed ? "6rem" : "auto",
            left: sidebarFixed ? "1rem" : "auto",
            paddingTop: sidebarFixed ? "20px" : "0px",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <ul className="space-y-3">
            {sections.map(({ id }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`block px-4 py-2 rounded-md transition-all duration-300 ${
                    active === id
                      ? "bg-[#0f2557] text-white"
                      : "bg-gray-100 text-black hover:bg-[#D4BEE4]"
                  }`}
                >
                  {id}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ✅ CENTER CONTENT */}
        <main
          className="flex-1 space-y-16"
          style={{ marginLeft: sidebarFixed ? 256 + 16 : 0 }}
        >
          {sections.map(({ id, Component }) => (
            <section id={id} key={id} className="scroll-mt-15">
              <Component />
            </section>
          ))}
        </main>

        {/* ✅ RIGHT Sticky Contact Form */}
        <aside className="hidden lg:block w-[300px]">
          <div className="sticky top-28 bg-[#0f2557] text-white rounded-xl p-6 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">
              Free Call Back by our Expert
            </h3>
            <ContactFormSmall />
            <p className="text-sm mt-2 text-gray-300">
              Easy Payment Options Available. No Spam. 100% Confidential.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
