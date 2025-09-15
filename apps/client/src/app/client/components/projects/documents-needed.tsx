"use client";
import Image from "next/image";

type DocsObject = {
  title?: string;
  paragraph?: string;
  items?: string[];
};

interface DocumentsNeededProps {
  docs?: string[] | DocsObject | null;
}

export default function DocumentsNeeded({ docs }: DocumentsNeededProps) {
  const items: string[] = Array.isArray(docs)
    ? docs
    : Array.isArray((docs as DocsObject)?.items)
    ? (docs as DocsObject).items!
    : [];

  const title =
    !Array.isArray(docs) && (docs as DocsObject)?.title
      ? (docs as DocsObject).title
      : "Documents Required";

  const paragraph =
    !Array.isArray(docs) && (docs as DocsObject)?.paragraph
      ? (docs as DocsObject).paragraph
      : "The following documents are required:";

  if (!items || items.length === 0) {
    return null;
  }

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
          {title}
        </h2>
        <p className="mb-10 text-base sm:text-lg">{paragraph}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
          {items.map((doc, index) => (
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
