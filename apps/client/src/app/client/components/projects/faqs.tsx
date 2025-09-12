"use client";
import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs?: FAQ[] | null;
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  // fallback if API gives nothing
  const items = faqs && Array.isArray(faqs) ? faqs : [];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!items.length) {
    return null; // nothing to show
  }

  return (
    <section className="py-20 px-6 sm:px-10 lg:px-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0f2557] mb-14 text-center tracking-tight">
          Frequently Asked Questions
        </h2>

        {/* FAQs */}
        <div className="space-y-5">
          {items.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <button
                  className="w-full flex justify-between items-center px-6 py-5 text-left text-lg sm:text-2xl font-medium text-[#0f2557] focus:outline-none cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <span
                    className={`ml-4 text-3xl font-medium transform transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#0f2557]" : "text-[#0f2557]"
                    }`}
                  >
                    {isOpen ? "–" : "+"}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-gray-600 text-base sm:text-lg leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
