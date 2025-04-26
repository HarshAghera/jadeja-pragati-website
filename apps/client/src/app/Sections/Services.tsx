"use client";

import React, { JSX, useState } from "react";
import { FaGem, FaRocket, FaReact } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import "@/app/Styles/servicesSection.css";

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
  Regulatory: [
    {
      icon: <FaGem className="icons" />,
      title: "Compliance Check",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, ipsum accusantium in animi molestiae magni, itaque neque ea quibusdam suscipit, odit enim rem ducimus officia!",
      link: "/services/compliance-check",
    },
    {
      icon: <FaRocket className="icons" />,
      title: "Risk Assessment",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, ipsum accusantium in animi molestiae magni, itaque neque ea quibusdam suscipit, odit enim rem ducimus officia!",
      link: "/services/risk-assessment",
    },
  ],
  License: [
    {
      icon: <FaGem className="icons" />,
      title: "Permit Application",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, ipsum accusantium in animi molestiae magni, itaque neque ea quibusdam suscipit, odit enim rem ducimus officia!",
      link: "/services/permit-application",
    },
    {
      icon: <FaRocket className="icons" />,
      title: "Renewal Management",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, ipsum accusantium in animi molestiae magni, itaque neque ea quibusdam suscipit, odit enim rem ducimus officia!",
      link: "/services/renewal-management",
    },
  ],
  Environmental: [
    {
      icon: <FaRocket className="icons" />,
      title: "Sustainability Audits",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, ipsum accusantium in animi molestiae magni, itaque neque ea quibusdam suscipit, odit enim rem ducimus officia!",
      link: "/services/sustainability-audits",
    },
    {
      icon: <FaReact className="icons" />,
      title: "Green Certifications",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, ipsum accusantium in animi molestiae magni, itaque neque ea quibusdam suscipit, odit enim rem ducimus officia!",
      link: "/services/green-certifications",
    },
  ],
};

const categories = Object.keys(serviceData) as (keyof typeof serviceData)[];

const Services = () => {
  const [activeCategory, setActiveCategory] =
    useState<keyof typeof serviceData>("Regulatory");

  return (
    <section
      id="services-section"
      className="px-3 sm:px-5 md:px-7 lg:px-9 xl:px-19"
    >
      <h2>Major Services</h2>
      <p id="paragraph">
        Choose a category to explore specific services we offer.
      </p>

      <div className="flex justify-center flex-wrap gap-4 mb-10">
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
                  Read More{" "}
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
