"use client";
import Image from "next/image";

export default function DocumentsNeeded() {
  const docs = [
    "PAN of all partners",
    "Aadhaar copy of all partners",
    "Passport-size photo of all partners",
    "Subscriber sheet duly signed by all partners",
    "Rental agreement copy if the registered office is rented",
    "Copy of utility bill (water/gas/electricity) of the rented property",
    "No Objection Certificate from the owner of the property",
  ];

  return (
    <section className="relative py-16 px-6 sm:px-10 lg:px-20">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/pictures/documents-bg.webp"
          alt="Documents Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#2b2828]/80" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-white">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
          Documents Required for Limited Liability Partnership Registration
        </h2>
        <p className="mb-10 text-base sm:text-lg">
          The following documents are required for registering a Limited
          Liability Partnership in India:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
          {docs.map((doc, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Image
                src="/icons/docs-required.webp"
                alt="Document Icon"
                width={24}
                height={24}
                className="mt-1"
              />
              <span className="text-base sm:text-lg">{doc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
