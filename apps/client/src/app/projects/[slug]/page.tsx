import { Metadata } from "next";
import DocumentsNeeded from "@/app/client/components/projects/documents-needed";
import FAQSection from "@/app/client/components/projects/faqs";
import HeroContent from "@/app/client/components/projects/hero-content";
import TwoSections from "@/app/client/components/projects/two-sections";
import Image from "next/image";

interface ProjectPageProps {
  params: { slug: string };
}



export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/projects/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <div className="p-10 text-red-600">Project not found.</div>;
  }

  const data = await res.json();
  const project = data.value;

  return (
    <section>
      <section className="pt-20 relative overflow-x-hidden bg-gradient-to-br from-[#e6eaee] to-white">
        <div className="relative w-full min-h-[200px] sm:min-h-[300px] md:min-h-[350px]">
          <Image
            src={project.hero?.image || "/pictures/windmill.webp"}
            alt={project.title}
            fill
            className="object-cover z-0"
            priority
          />
          <div className="absolute inset-0 bg-white/70 z-10" />
          <HeroContent
            title={project.title}
            description={project.hero?.description || ""}
          />
        </div>
      </section>

      <TwoSections
        aboutTitle={project.about.title}
        aboutImage={project.about.imageUrl}
        aboutDescription={[project.about.description]}
        applyTitle={project.whoNeeds.title}
        applyList={project.whoNeeds.points}
        applyImage={project.whoNeeds.imageUrl}
        cards={project.cards}
      />

      <DocumentsNeeded docs={project.documents} />

      <FAQSection faqs={project.faqs} />
    </section>
  );
}
