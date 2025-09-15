"use client";

import Image from "next/image";
import GlassLLPCards from "./glassmorphism";

interface TwoSectionsProps {
  aboutTitle: string;
  aboutImage: string;
  aboutDescription: string[];
  applyTitle: string;
  applyList: string[];
  applyImage: string;
  cards: {
    title: string;
    description: string;
    imageUrl: string;
  }[];
}

export default function TwoSections({
  aboutTitle,
  aboutDescription,
  applyTitle,
  applyList,
  applyImage,
  cards,
}: TwoSectionsProps) {
  return (
    <>
      <section className="px-4 sm:px-6 lg:px-8 py-14 bg-[#f5f5f5]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center lg:justify-end !max-w-[400px] sm:!max-w-[650px] w-full">
            <Image
              src={applyImage}
              alt={applyTitle}
              width={700}
              height={700}
              className="rounded-md shadow-lg w-full h-auto"
              sizes="(max-width: 500px) 100vw, 600px"
            />
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f2557] mb-4">
              {aboutTitle}
            </h2>
            {aboutDescription.map((text, index) => (
              <p
                key={index}
                className={`text-gray-700 text-base sm:text-lg leading-relaxed ${
                  index > 0 ? "mt-4" : ""
                }`}
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </section>

      <GlassLLPCards cards={cards} />

      <section className="px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f2557] mb-6">
              {applyTitle}
            </h2>
            <ul className="space-y-3 text-gray-700 text-base sm:text-lg leading-relaxed list-none">
              {applyList.map((item, index) => (
                <li
                  key={index}
                  className="relative pl-6 before:content-['✔'] before:absolute before:left-0 before:text-[#0f2557]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center lg:justify-end !max-w-[400px] sm:!max-w-[650px] w-full">
            <Image
              src={applyImage}
              alt={applyTitle}
              width={700}
              height={700}
              className="rounded-md shadow-lg w-full h-auto"
              sizes="(max-width: 500px) 100vw, 600px"
            />
          </div>
        </div>
      </section>
    </>
  );
}
