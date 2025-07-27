import Image from "next/image";
import AboutContent from "../client/components/aboutPage/aboutContent";
import MissionCard from "../client/components/aboutPage/missionCard";
import "@/app/styles/aboutUsPage.css";
import { Metadata } from "next";
import TeamCard from "../client/components/aboutPage/teamCard";
import HowWeWorkSection from "../client/components/aboutPage/howWeWork";

export const metadata: Metadata = {
  title: "About Us | Jadeja Pragati",
  description:
    "Discover our journey, mission, vision, and values. At Your Jadeja Pragati, we believe in innovation, integrity, and delivering exceptional value.",
  keywords: [
    "About Us",
    "Company Story",
    "Mission",
    "Vision",
    "Values",
    "Jadeja Pragati",
  ],
  openGraph: {
    title: "About Us | Jadeja Pragati",
    description:
      "Discover how Jadeja Pragati started and what drives our mission, vision, and values today.",
    url: "https://www.jadejapragati.com/about-us",
    siteName: "Jadeja Pragati",
    type: "website",
  },
};

const missionVisionData = [
  {
    icon: "icons/target.svg",
    title: "Our Mission",
    desc: "We empower businesses with expert consultancy for growth, compliance, and sustainability.Our focus is simplifying processes and building long-term, value-driven partnerships.",
  },
  {
    icon: "icons/light-bulb.svg",
    title: "Our Vision",
    desc: "To lead with trust and innovation, enabling businesses to grow smarter and greener.We aim to shape a future of sustainable success for every client.",
  },
  {
    icon: "icons/value.svg",
    title: "Our Values",
    desc: "We listen, understand, and tailor solutions to each client’s unique needs.Our process is transparent, efficient, and focused on delivering real results.",
  },
];
const teamMembers = [
  {
    name: "H.A Jadeja",
    position: "Founder",
    image: "/team/HAJadeja.webp",
  },
  {
    name: "RudrarajSinh H Jadeja",
    position: "Director & CEO",
    image: "/team/rudrarajsinh.webp",
  },
  {
    name: "VijaySinh G Bhati",
    position: "General Manager",
    image: "/team/vijaysinh.webp",
  },
];

export default function AboutLayout() {
  return (
    <section
      className="pt-20 overflow-x-hidden"
      style={{
        background: `
          linear-gradient(to right, rgba(255, 255, 255, 0.7) 20%, rgba(255, 245, 240, 0.3) 100%),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 10%, rgba(255, 245, 240, 0.2) 30%)
        `,
      }}
    >
      <div className="relative w-full min-h-[200px] sm:min-h-[300px] md:min-h-[350px]">
        <Image
          src="/pictures/officeimage.webp"
          alt="Background"
          fill
          className="object-cover z-0"
          priority
        />
        <div className="absolute inset-0 bg-white/90 z-10"></div>

        <AboutContent />
      </div>
      <section
        id="mission-section"
        className="px-4 sm:px-6 lg:px-8 py-14 bg-gradient-to-br from-[#dbe3ec]/50 via-[#f2f6fa]/50 to-white/60"
      >
        <div className="cards">
          {missionVisionData.map((card, index) => (
            <MissionCard
              key={index}
              icon={card.icon}
              title={card.title}
              desc={card.desc}
            />
          ))}
        </div>
      </section>
      <HowWeWorkSection />
      <section className="relative bg-gradient-to-br from-[#e6eaee] to-white py-20 px-4 sm:px-6 lg:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#0f2557] mb-2">
              Our Story
            </h2>
            <p className="text-center text-gray-600 mb-12">
              From humble beginnings to a future built on innovation — this is
              our journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-gray-700  leading-relaxed">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-[#0f2557]">
                  Our Beginning
                </h3>
                <p className="text-sm md:text-base">
                  We started with a shared vision to raise the bar on what
                  quality means. A small team fueled by big dreams, we’ve always
                  believed in delivering value through trust and integrity.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold  text-[#0f2557]">
                  Growth & Expansion
                </h3>
                <p className="text-sm md:text-base">
                  Over time, we diversified our services and embraced new
                  technologies — building long-term partnerships and adapting to
                  the ever-evolving needs of our clients.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-[#0f2557]">
                  Today & Tomorrow
                </h3>
                <p className="text-sm md:text-base">
                  Today, we’re proud of our legacy and excited about the future.
                  Innovation, resilience, and impact continue to guide our every
                  step.
                </p>
              </div>
            </div>

            <div className="relative w-full max-w-3xl mx-auto">
              <div className="relative w-full sm:w-[550px] h-[375px] sm:h-[500px] mx-auto rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/pictures/aboutUs.webp"
                  alt="About us"
                  width={350}
                  height={340}
                  className="rounded-2xl object-cover object-center w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-white via-[#f3f3f7] to-[#e9ebed] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#0f2557] mb-2">
            Meet the team
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Our dedicated team are here to help you
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-1  lg:grid-cols-3 gap-12 justify-items-center">
            {teamMembers.map((member, idx) => (
              <TeamCard key={idx} {...member} />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f2557] mb-8">
            Certification
          </h2>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <div className="max-w-md mx-auto relative">
              <Image
                src="/certificates/ISO 9001.webp"
                alt="Certificate 1"
                width={500}
                height={300}
                className="object-contain w-full transition-transform duration-600 ease-in-out transform cursor-pointer md:hover:scale-110 md:hover:z-30 md:hover:relative"
                priority
              />
            </div>

            <div className="max-w-md mx-auto relative">
              <Image
                src="/certificates/ISO 14001.webp"
                alt="Certificate 2"
                width={500}
                height={300}
                className="object-contain w-full transition-transform duration-600 ease-in-out transform cursor-pointer md:hover:scale-110 md:hover:z-30 md:hover:relative"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{
          background: `
      linear-gradient(to right, rgba(249, 250, 251, 0.9), rgba(230, 236, 245, 0.8)),
      linear-gradient(to bottom, #f9fafb 40%, #e2e8f0 100%)
    `,
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f2557] mb-8">
            Our Partners
          </h2>
          <p className="text-gray-600 mb-12">
            Trusted by leading companies across industries
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center">
            {[
              {
                logo: "/partners/gurukrupaenterprise.webp",
              },
              {
                logo: "/partners/phenixenterprise.webp",
              },
              { logo: "/partners/buynsale.webp" },
              {
                logo: "/partners/vihanaenterprise.webp",
              },
              {
                logo: "/partners/divyarajrubber.webp",
              },
            ].map(({ logo }, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 text-center cursor-pointer"
              >
                <div className="relative w-44 h-24 sm:w-48 sm:h-26">
                  <Image
                    src={logo}
                    alt="partners"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, 100px"
                    priority={idx === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
