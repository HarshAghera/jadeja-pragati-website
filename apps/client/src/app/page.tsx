import Image from "next/image";
import Particles from "./Components/Particles";

export default function Home() {
  return (
    <>
      <main className="text-white">
        {/* Hero Section */}
        <section
          className="pt-[70px] flex items-center justify-center text-center px-4 py-12 sm:py-16 md:py-20 min-h-[60vh] lg:min-h-screen"
          style={{
            backgroundImage: `
      repeating-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.03),
        rgba(255, 255, 255, 0.03) 8px,
        transparent 8px,
        transparent 48px
      ),
      linear-gradient(to bottom right, #bfdbfe, #0284c7)
    `,
            backgroundBlendMode: "overlay",
          }}
        >
          <Particles />
          <div className="w-full max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
              {/* Text Content */}
              <div className="w-full lg:w-1/2 text-left space-y-6 px-2 sm:px-4 md:px-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-center lg:text-left">
                  Welcome to Jadeja Pragati
                </h1>
                <p className="text-base md:text-lg text-center lg:text-left">
                  We’re a forward-thinking company dedicated to sustainable
                  solutions and technological innovation. Our mission is to
                  empower communities through eco-friendly initiatives and
                  creative problem solving.
                </p>
                <p className="text-base md:text-lg text-center lg:text-left">
                  Explore our services to learn how we turn waste into
                  opportunity, and how you can be a part of this impactful
                  journey.
                </p>
                <div className="text-center lg:text-left">
                  <a
                    href="#"
                    className="inline-block px-10 py-3 text-base font-semibold rounded-full bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition-all duration-300 relative group"
                  >
                    Learn More
                    <span className="ml-3 inline-block text-blue-600 group-hover:animate-ping">
                      &rarr;
                    </span>
                  </a>
                </div>
              </div>

              {/* Image Section (visible on large screens) */}
              <div className="w-full lg:w-1/2 hidden lg:flex justify-center">
                <div className="w-full max-w-[500px] xl:max-w-[600px] 2xl:max-w-[700px]">
                  <Image
                    src="/workflow.webp"
                    alt="Impactful Journey"
                    width={1200}
                    height={1200}
                    className="rounded-lg object-contain w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Content Section */}
        <section className="bg-white text-gray-800 px-6 sm:px-8 md:px-12 py-10 max-w-5xl mx-auto space-y-6 text-justify">
          <h2 className="text-3xl md:text-4xl font-semibold text-center">
            What We Do
          </h2>
          <p className="text-base md:text-lg">
            We specialize in innovative recycling technologies, community
            outreach programs, and digital solutions that support
            sustainability. Whether it's transforming plastic waste into
            construction material or using AI to streamline resource usage, our
            projects are designed to make a real-world impact.
          </p>
          <p className="text-base md:text-lg">
            Partnering with educational institutions and local governments, we
            aim to educate and empower the next generation of environmental
            leaders. Our goal is to create a cleaner, more responsible future.
          </p>
          <p className="text-base md:text-lg">
            Join us in making the world a better place—one small change at a
            time. Your support fuels our mission and helps turn vision into
            reality.
          </p>
        </section>
      </main>
    </>
  );
}
