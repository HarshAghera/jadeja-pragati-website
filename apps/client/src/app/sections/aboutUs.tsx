import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AboutMotionContent from "../client/components/about/aboutMotionContent";
import "@/app/styles/aboutUs.css";

const AboutUs = () => {
  return (
    <div className="aboutus-section w-full px-4 sm:px-6 md:px-12 lg:px-20 relative overflow-hidden pt-11 sm:pt-11 md:pt-13 lg:pt-15">
      <div className="text-center ">
        <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-[#0f2557] ">
          Who We Are?
        </h1>
      </div>

      <div className="w-full py-15 sm:py-16 md:py-20 lg:py-24 xl:py-26 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
        <div className="relative w-full">
          <Image
            src="/pictures/projectExplain.webp"
            alt="Team"
            width={900}
            height={700}
            className="rounded-xl w-full object-cover shadow-xl
               h-auto max-h-[300px] sm:max-h-[400px] md:max-h-[500px]"
          />
          <AboutMotionContent />
        </div>

        <div>
          <h2 className="text-2xl sm:text-2xl md:text-2xl text-[#0f2557] mb-6 leading-snug font-semibold ">
            Empowering You to Succeed —
            <br className="hidden sm:block" />
            Every Single Day
          </h2>
          <p className="text-[#0f2557] text-sm sm:text-base md:text-md mb-6">
            We are committed to helping businesses navigate complex regulations,
            licensing processes, and sustainable business practices with ease
            and confidence.
          </p>

          <ul className="space-y-4 mb-8 text-[#0f2557] text-sm sm:text-base">
            <li className="flex items-start gap-3">
              <Image src="/icons/tick.svg" alt="Tick" width={20} height={20} />
              <span>24/7 Call Services Available</span>
            </li>
            <li className="flex items-start gap-3">
              <Image src="/icons/tick.svg" alt="Tick" width={20} height={20} />
              <span>Great Skilled Consultant</span>
            </li>
            <li className="flex items-start gap-3">
              <Image src="/icons/tick.svg" alt="Tick" width={20} height={20} />
              <span>Expert Team Members</span>
            </li>
          </ul>

          <Link href="/about-us">
            <Button className="group aboutButton bg-[#0f2557] text-white text-sm sm:text-base md:text-lg px-6 py-3 sm:px-10 sm:py-4 md:px-12 md:py-5 rounded-full flex items-center gap-2 cursor-pointer">
              Read More
              <svg
                className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
