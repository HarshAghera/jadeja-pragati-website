"use client";
import React from "react";
import CountUp from "react-countup";
import {
  FaBriefcase,
  FaProjectDiagram,
  FaUsers,
  FaSmile,
} from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const StatsSection = () => {
  const { ref: statsRef, inView: statsVisible } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div
      ref={statsRef}
      className="stats-section mt-20 w-full flex justify-center"
    >
      <div className="w-full max-w-7xl flex flex-wrap justify-around rounded-2xl p-2 sm:p-4 md:p-5 bg-[#0f2557] text-white/85">
        {[
          {
            Icon: FaBriefcase,
            end: 10,
            label: "Years of Experience",
            unit: "+",
          },
          {
            Icon: FaProjectDiagram,
            end: 25,
            label: "Projects Completed",
            unit: "+",
          },
          { Icon: FaUsers, end: 15, label: "Employees", unit: "+" },
          { Icon: FaSmile, end: 98, label: "Client Satisfaction", unit: "%" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center px-2 py-5 w-1/2 md:w-1/4"
          >
            <div className="flex items-center gap-2">
              <item.Icon className="text-xl sm:text-2xl md:text-3xl" />
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                {statsVisible && <CountUp end={item.end} duration={2} />}
                {item.unit}
              </h3>
            </div>
            <p className="text-sm sm:text-base md:text-lg font-semibold text-center mt-2">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
