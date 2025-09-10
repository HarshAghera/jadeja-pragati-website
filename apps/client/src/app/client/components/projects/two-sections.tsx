"use client";

import Image from "next/image";
import GlassLLPCards from "./glassmorphism";

export default function TwoSections() {
  return (
    <>
      <section className="px-4 sm:px-6 lg:px-8 py-14 bg-[#f5f5f5]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center lg:justify-start">
            <Image
              src="/pictures/about-llp.webp"
              alt="About Limited Liability Partnership Registration"
              width={700}
              height={700}
              className="rounded-md shadow-lg"
            />
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f2557] mb-4">
              About Limited Liability Partnership Registration
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              In a traditional partnership firm, partners are personally liable
              for all business debts and obligations, regardless of their
              capital contribution or profit-sharing ratio. This means personal
              assets can be used to settle firm liabilities.
            </p>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mt-4">
              To address this, the concept of{" "}
              <strong>Limited Liability Partnership (LLP)</strong> was
              introduced. LLP combines the limited liability benefits of a
              company with the flexibility of a partnership, making it a{" "}
              <em>hybrid business structure</em>. Its adaptability and balanced
              approach have made it a popular choice for entrepreneurs and
              professionals in recent years.
            </p>
          </div>
        </div>
      </section>

      <GlassLLPCards />

      {/* Section 2: Who Needs to Apply */}
      <section className="px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f2557] mb-6">
              Who needs to apply for Limited Liability Partnership Registration?
            </h2>
            <ul className="space-y-3 text-gray-700 text-base sm:text-lg leading-relaxed list-none">
              <li className="relative pl-6 before:content-['✔'] before:absolute before:left-0 before:text-[#0f2557]">
                Multiple individuals coming together with capital
              </li>
              <li className="relative pl-6 before:content-['✔'] before:absolute before:left-0 before:text-[#0f2557]">
                Startups with co-founders
              </li>
              <li className="relative pl-6 before:content-['✔'] before:absolute before:left-0 before:text-[#0f2557]">
                Creative Agencies (Advertising, Marketing, Design)
              </li>
              <li className="relative pl-6 before:content-['✔'] before:absolute before:left-0 before:text-[#0f2557]">
                Real Estate Partnerships
              </li>
              <li className="relative pl-6 before:content-['✔'] before:absolute before:left-0 before:text-[#0f2557]">
                Existing Partnerships
              </li>
              <li className="relative pl-6 before:content-['✔'] before:absolute before:left-0 before:text-[#0f2557]">
                Professionals (CA, CS, Doctors, etc.)
              </li>
              <li className="relative pl-6 before:content-['✔'] before:absolute before:left-0 before:text-[#0f2557]">
                Venture Capitalists
              </li>
            </ul>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/pictures/who-apply-llp.webp"
              alt="Who should apply for LLP Registration"
              width={700}
              height={700}
              className="rounded-md shadow-lg"
            />
          </div>
        </div>
      </section>
    </>
  );
}
