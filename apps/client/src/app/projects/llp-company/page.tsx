import DocumentsNeeded from "@/app/client/components/projects/documents-needed";
import FAQSection from "@/app/client/components/projects/faqs";
import HeroContent from "@/app/client/components/projects/hero-content";
import TwoSections from "@/app/client/components/projects/two-sections";
import Image from "next/image";

export default function LLPCompany() {
  return (
    <section>
      <section
        className="pt-20 overflow-x-hidden bg-gradient-to-br from-[#e6eaee] to-white"
        // style={{
        //   background: `
        //   linear-gradient(to right, rgba(255, 255, 255, 0.7) 20%, rgba(255, 245, 240, 0.3) 100%),
        //   linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 10%, rgba(255, 245, 240, 0.2) 30%)
        // `,
        // }}
      >
        <div className="relative w-full min-h-[200px] sm:min-h-[300px] md:min-h-[350px]">
          <Image
            src="/pictures/windmill.webp"
            alt="Background"
            fill
            className="object-cover z-0"
            priority
          />
          <div className="absolute inset-0 bg-white/70 z-10"></div>

          <HeroContent />
        </div>
      </section>
      <section className="py-14 bg-[#f5f5f5]">
        <TwoSections />
      </section>
      <DocumentsNeeded />

      <FAQSection />
    </section>
  );
}
