import React, { JSX } from "react";
import { FaGem, FaRocket, FaReact } from "react-icons/fa";
import "@/app/styles/servicesSection.css";
import CategoryButtons from "../client/components/services/categoryButtons";
import ServiceCard from "../client/components/services/serviceCard";
import StatsSection from "../client/components/services/statsSection";

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

const categories = Object.keys(serviceData) as string[];

const Services = () => {
  return (
    <section
      id="services-section"
      className="px-3 sm:px-5 md:px-6 lg:px-8 xl:px-17 bg-gradient-to-br from-[#dbe3ec]/50 via-[#f2f6fa]/50 to-white/60"
    >
      <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 text-[#0f2557] text-center">
        Services <span className="text-[#0f2557]">We Provide</span>
      </h1>

      <CategoryButtons categories={categories} />

      <div className="cards">
        {serviceData.License.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>

      <StatsSection />
    </section>
  );
};

export default Services;
