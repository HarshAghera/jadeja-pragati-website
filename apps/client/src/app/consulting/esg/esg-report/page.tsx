"use client";

import React from "react";
import Image from "next/image";
import ContactFormSmall from "@/app/client/components/small-contact-form";
import "@/app/styles/esg.css";

const ESGReportsPage = () => {
  return (
    <div className="bg-[#f9f9f9] overflow-x-hidden">
      {/* ✅ HERO SECTION */}
      <section className="relative w-full h-auto py-12 lg:py-20">
        <Image
          src="/pictures/officeimage.webp"
          alt="Background"
          fill
          className="object-cover z-0"
          priority
        />
        <div className="absolute inset-0 bg-white/90" />
        <div className="relative z-10 px-5 sm:px-6 max-w-7xl mx-auto">
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f2557] mb-7 leading-[1.4]">
              Get ESG Reports for Your Business — Easy, Professional & Reliable
            </h2>
            <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-8">
              Our experts help you navigate ESG documentation, legal compliance,
              and report creation tailored to your industry and state.
            </p>
            <ul className="space-y-4 custom-checklist text-gray-800 text-base sm:text-lg">
              <li>Expert assistance in ESG report drafting</li>
              <li>End-to-end documentation support</li>
              <li>Compliance & authority liaison service</li>
              <li>Legal help with ESG procedures</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-6 max-w-7xl mx-auto pt-10 flex flex-col lg:flex-row gap-6 pb-20">
        <aside className="hidden lg:block lg:w-[300px] pt-30">
          <div className="sticky top-24 bg-[#0f2557] text-white rounded-xl p-6 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">
              Quick Index
            </h3>
            <ul className="space-y-3 font-medium text-base">
              <li>
                <a href="#overview" className="hover:text-[#D4BEE4]">
                  Overview
                </a>
              </li>
              <li>
                <a href="#eligibility" className="hover:text-[#D4BEE4]">
                  Eligibility
                </a>
              </li>
              <li>
                <a href="#documents" className="hover:text-[#D4BEE4]">
                  Documents
                </a>
              </li>
              <li>
                <a href="#procedure" className="hover:text-[#D4BEE4]">
                  Procedure
                </a>
              </li>
              <li>
                <a href="#rules" className="hover:text-[#D4BEE4]">
                  Battery Rules
                </a>
              </li>
            </ul>
          </div>
        </aside>

        {/* ✅ CENTER MAIN CONTENT (FILL AS NEEDED) */}
        <main className="flex-1 space-y-16">
          <section id="overview">
            <h3 className="text-2xl font-bold mb-4">Overview</h3>
            <p className="text-gray-700">
              The Scrap Battery Import License is a regulatory authorization...
            </p>
          </section>

          <section id="eligibility">
            <h3 className="text-2xl font-bold mb-4">Eligibility</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>The applicant must be a registered recycling facility...</li>
              <li>Valid registration under the Companies Act...</li>
            </ul>
          </section>

          {/* Add more sections: #documents, #procedure, #rules */}
        </main>

        {/* ✅ RIGHT STICKY CONTACT FORM */}
        <aside className="w-full lg:w-[300px]">
          <div className="sticky top-24 bg-[#0f2557] text-white rounded-xl p-6 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">
              Free Call Back by our Expert
            </h3>
            <ContactFormSmall />
          </div>
        </aside>
      </section>
    </div>
  );
};

export default ESGReportsPage;
