"use client";

import React, { JSX, useState } from "react";
import {
  FaGem,
  FaRocket,
  FaReact,
  FaBriefcase,
  FaProjectDiagram,
  FaUsers,
  FaSmile,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import "@/app/styles/servicesSection.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "react-feather";

type Service = {
  icon: JSX.Element;
  title: string;
  desc: string;
  link: string;
};

type ServiceData = {
  [category: string]: Service[];
};

const serviceData: ServiceData = {
  
  License: [
    {
      icon: <FaGem className="icons" />,
      title: "Permit Application",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, ipsum accusantium in animi molestiae magni",
      link: "/services/permit-application",
    },
    {
      icon: <FaRocket className="icons" />,
      title: "Renewal Management",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, ipsum accusantium in animi molestiae magni",
      link: "/services/renewal-management",
    },
  ],
  Environmental: [
    {
      icon: <FaRocket className="icons" />,
      title: "Sustainability Audits",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, ipsum accusantium in animi molestiae magni",
      link: "/services/sustainability-audits",
    },
    {
      icon: <FaReact className="icons" />,
      title: "Green Certifications",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, ipsum accusantium in animi molestiae magni",
      link: "/services/green-certifications",
    },
  ],
};

const categories = Object.keys(serviceData) as (keyof typeof serviceData)[];

const Services = () => {
  const [activeCategory, setActiveCategory] =
    useState<keyof typeof serviceData>("License");

  const { ref: statsRef, inView: statsVisible } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section
      id="services-section"
      className="px-3 sm:px-5 md:px-6 lg:px-8 xl:px-17 bg-gradient-to-br from-[#dbe3ec]/50 via-[#f2f6fa]/50 to-white/60"
    >
      <h2 className="text-4xl">
        Services <span className="text-[#0f2557]">We Provide</span>
      </h2>

      <div className="flex justify-center flex-wrap gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full border font-semibold text-sm transition 
              ${
                activeCategory === cat
                  ? "bg-[#0f2557] text-white"
                  : "border-[#0f2557] text-[#0f2557] hover:bg-[#0f2557] hover:text-white"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="cards">
        {serviceData[activeCategory].map((service, index) => (
          <div key={index} className="card">
            <div>
              {service.icon}
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
            <div className="mt-4">
              <Link href={service.link}>
                <Button className="group bg-[#0f2557] text-white text-sm rounded-full px-5 py-2 flex items-center gap-2 third">
                  Read More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div
        ref={statsRef}
        className="stats-section mt-10 w-full flex justify-center"
      >
        <div className="w-full max-w-7xl flex flex-wrap justify-around rounded-2xl p-2 sm:p-4 md:p-5 bg-[#0f2557] text-white/85">
          {[
            {
              Icon: FaBriefcase,
              end: 5,
              label: "Years of Experience",
              unit: "+",
            },
            {
              Icon: FaProjectDiagram,
              end: 20,
              label: "Projects Completed",
              unit: "+",
            },
            { Icon: FaUsers, end: 25, label: "Employees", unit: "+" },
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
    </section>
  );
};

export default Services;
