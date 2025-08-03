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

type TestimonialsSliderProps = {
  testimonials: Testimonial[];
};

const TestimonialsSlider: React.FC<TestimonialsSliderProps> = ({
  testimonials,
}) => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      loop
      pagination={{
        clickable: true,
        el: ".custom-pagination",
      }}
      autoplay={{ delay: 6000, disableOnInteraction: false }}
      breakpoints={{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {testimonials.map((t, idx) => (
        <SwiperSlide key={idx}>
          <div className="testimonials backdrop-blur-sm rounded-2xl shadow-sm p-6 mx-2 flex flex-col justify-between text-left text-[#0f2557] relative overflow-hidden">
            <div className="absolute top-4 right-4 flex gap-1">
              {[...Array(t.stars)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-md" />
              ))}
            </div>
            <div className="absolute top-4 left-4">
              <FaQuoteLeft className="text-[#0f2557]/80 text-2xl" />
            </div>
            <div className="mt-10 mb-4 flex-1">
              <p className="text-sm">{t.text}</p>
            </div>
            <div className="mt-auto">
              <p className="font-semibold text-lg">{t.name}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialsSlider;
