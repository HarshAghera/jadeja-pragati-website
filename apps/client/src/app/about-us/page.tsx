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
    icon: "/icons/mission_icon.webp",
    title: "Our Mission",
    desc: "We empower businesses with consultancy for growth, compliance, and sustainability. Our focus is simplifying processes and building value-driven partnerships.",
  },
  {
    icon: "/icons/vision_icon.webp",
    title: "Our Vision",
    desc: "To lead with trust and innovation, enabling businesses to grow smarter and greener.We aim to shape a future of sustainable success for every client.",
  },
  {
    icon: "/icons/values_icon.webp",
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
        className="px-4 sm:px-6 lg:px-8 py-14 bg-[#f5f5f5]"
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
              Every great journey begins with a single step — and ours began
              with a vision.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-gray-700  leading-relaxed">
              <div className="space-y-1/2">
                {/* <h3 className="text-xl font-semibold text-[#0f2557]">
                  Our Beginning
                </h3> */}
                <p className="text-sm md:text-base">
                  Hemantsinh Anirudhsinh Jadeja, a man of foresight and
                  commitment, started offering consultancy services even before
                  the company was officially formed. With strong determination
                  and a deep understanding of licensing and regulatory
                  frameworks, he took on his very first project — laying the
                  foundation for what would eventually become a trusted name in
                  the industry.
                </p>
              </div>
              <div className="space-y-1/2">
                {/* <h3 className="text-xl font-semibold  text-[#0f2557]">
                  Growth & Expansion
                </h3> */}
                <p className="text-sm md:text-base">
                  From that single project, Jadeja Pragati (I) Pvt. Ltd. was
                  born. What started as a one-man mission has grown into a
                  professional consultancy company handling multiple complex
                  projects across sectors like import licensing, recycling
                  compliance, pollution control, EPR certification, and more.
                </p>
              </div>
              <div className="space-y-1/2">
                {/* <h3 className="text-xl font-semibold text-[#0f2557]">
                  Today & Tomorrow
                </h3> */}
                <p className="text-sm md:text-base">
                  Today, the company is proudly led by his son, Rudrarajsinh
                  Hemantsinh Jadeja, who brings a modern outlook and a strong
                  commitment to continuing his father’s legacy. Under his
                  leadership, Jadeja Pragati (I) Pvt. Ltd. is expanding its
                  horizons, forging new paths for clients, and aiming to partner
                  with leading national and international companies.
                </p>
              </div>
              <div className="space-y-1/2">
                {/* <h3 className="text-xl font-semibold text-[#0f2557]">
                  Today & Tomorrow
                </h3> */}
                <p className="text-sm md:text-base">
                  As we look to the future, our goal is simple — to empower more
                  businesses with smart solutions, build long-term
                  relationships, and make compliance and growth easier than ever
                  before.
                </p>
              </div>
              <div className="space-y-1/2">
                {/* <h3 className="text-xl font-semibold text-[#0f2557]">
                  Today & Tomorrow
                </h3> */}
                <p className="text-sm md:text-base">
                  From one project to many. From one vision to many
                  possibilities. This is the journey of Jadeja Pragati — built
                  on trust, driven by progress.
                </p>
              </div>
            </div>

            <div className="relative w-full max-w-3xl mx-auto">
              <div className="relative w-full sm:w-[500px] h-[550px] sm:h-[700px] mx-auto rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/pictures/RoadMapFinal.webp"
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
