"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "@/app/styles/testimonials.css";

type Testimonial = {
  name: string;
  role: string;
  text: string;
  stars: number;
};

const testimonials: Testimonial[] = [
  {
    name: "John Doe",
    role: "Head of Customer Experience at FinTech Global",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In, tenetur perspiciatis repellendus veritatis fugiat quia necessitatibus atque voluptatum ullam deserunt.",
    stars: 5,
  },
  {
    name: "Elijah Ramirez",
    role: "Director of Operations at EcoHome Solutions",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In, tenetur perspiciatis repellendus veritatis fugiat quia necessitatibus atque voluptatum ullam deserunt.",
    stars: 5,
  },
  {
    name: "Mia Song",
    role: "CTO at HealthBridgeTech",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In, tenetur perspiciatis repellendus veritatis fugiat quia necessitatibus atque voluptatum ullam deserunt.",
    stars: 5,
  },
  {
    name: "Alice Kim",
    role: "Product Manager at GreenTech",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In, tenetur perspiciatis repellendus veritatis fugiat quia necessitatibus atque voluptatum ullam deserunt.",
    stars: 4,
  },
  {
    name: "Leo Zhang",
    role: "CEO at MedAI Systems",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In, tenetur perspiciatis repellendus veritatis fugiat quia necessitatibus atque voluptatum ullam deserunt.",
    stars: 5,
  },
];

const Testimonials = () => {
  return (
    <div className="relative bg-gradient-to-br from-[#dbe3ec]/50 via-[#f2f6fa]/50 to-white/60 py-11 px-4">
      <div className="absolute inset-0 opacity-10  bg-cover bg-no-repeat pointer-events-none z-0" />

      <div className="relative max-w-6xl mx-auto text-center text-[#0f2557] z-10">
        <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl  mb-4 text-[#0f2557] text-center">
          What our <span className="text-[#0f2557]">Clients Say</span>
        </h1>

        <p className="text-[#0f2557]/70 mb-10">
          Hear Directly From Our Satisfied Partners
        </p>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop
          pagination={{
            clickable: true,
            el: ".custom-pagination",
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="testimonials
 backdrop-blur-sm rounded-2xl shadow-sm p-6 mx-2 flex flex-col justify-between text-left text-[#0f2557] relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 flex gap-1">
                  {[...Array(t.stars)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>

                <div className="absolute top-4 left-4">
                  <FaQuoteLeft className="text-[#0f2557]/80 text-xl" />
                </div>

                <div className="mt-10 mb-4 flex-1">
                  <p className="text-sm line-clamp-4">{t.text}</p>
                </div>

                <div className="mt-auto">
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-pagination mt-6 flex justify-center space-x-2"></div>
      </div>
    </div>
  );
};

export default Testimonials;
