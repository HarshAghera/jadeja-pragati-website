"use client";
import { useState } from "react";

const faqs = [
  {
    question: "What is a Limited Liability Partnership (LLP)?",
    answer:
      "An LLP is a hybrid business structure that combines the flexibility of a partnership with the limited liability benefits of a company.",
  },
  {
    question: "Who can register an LLP in India?",
    answer:
      "Any two or more individuals or entities can form an LLP, provided at least one partner is a resident of India.",
  },
  {
    question: "What are the benefits of LLP over a traditional partnership?",
    answer:
      "LLPs offer limited liability protection, separate legal entity status, easier compliance, and no limit on the maximum number of partners.",
  },
  {
    question: "Is there a minimum capital requirement for LLP?",
    answer:
      "No, there is no minimum capital requirement to register an LLP in India.",
  },
];

export default function FAQSection() {
  // First FAQ open by default
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 sm:px-10 lg:px-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0f2557] mb-14 text-center tracking-tight">
          Frequently Asked Questions
        </h2>

        {/* FAQs */}
        <div className="space-y-5">
          {faqs.map((faq, index) => {
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
