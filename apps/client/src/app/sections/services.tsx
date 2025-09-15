import React from "react";
import "@/app/styles/servicesSection.css";
import CategorySection from "../client/components/services/categorySection";
import StatsSection from "../client/components/services/statsSection";
import { FaGem, FaRocket } from "react-icons/fa";

const serviceData = {
  Consulting: [
    {
      icon: <FaGem className="icons" />,
      title: "Gujarat Pollution Control Board",
      desc: "Monitors and controls industrial pollution in Gujarat to protect the environment and public health.",
      link: "/consulting/state-pollution-board-clearance/gujarat-pollution-control-board-gpcb",
    },
    {
      icon: <FaRocket className="icons" />,
      title: "Visit Clearance of CPCB and DGFT",
      desc: "Official approval required for visiting Central Pollution Control Board facilities or attending meetings. ",
      link: "/consulting/cpcb-moef-&-dgft-clearance/visit-clearance-of-cpcb-and-dgft",
    },
  ],
  Business: [
    {
      icon: <FaGem className="icons" />,
      title: "Plastic Waste Recycling Plant",
      desc: "Facility that processes used plastic into reusable materials, reducing pollution and conserving resources.",
      link: "/business/waste-recycling-business/plastic-waste-recycling-plant",
    },
    {
      icon: <FaRocket className="icons" />,
      title: "Waste Tyre Recycling Import",
      desc: "Import of used tyres for recycling into rubber products, fuel, or other industrial applications. ",
      link: "/business/import-business/scrap-tyre-import-business",
    },
  ],
  Waste: [
    {
      icon: <FaGem className="icons" />,
      title: "Scrap Battery Import License",
      desc: "A Scrap Battery Import License authorizes businesses to legally import used lead-acid batteries for recycling and recovery purposes.",
      link: "/business/import-business/scrap-tyre-import-business",
    },
    {
      icon: <FaRocket className="icons" />,
      title: "Hazardous Waste Management Authorization",
      desc: "A Hazardous Waste Management Authorization permits industries to handle, store, transport, and dispose of hazardous waste safely.",
      link: "/waste/hazardous-waste/hazardous-waste-management-authorization",
    },
  ],
  EPR: [
    {
      icon: <FaGem className="icons" />,
      title: "EPR Authorization for Hazardous",
      desc: "An EPR AuthorizaƟon for Hazardous Waste allows producers to take responsibility for the collection, recycling, and safe disposal of hazardous waste generated from their products.",
      link: "/epr/epr-registration/epr-for-hazardous-waste",
    },
    {
      icon: <FaRocket className="icons" />,
      title: "Carbon Credits",
      desc: "In EPR (Extended Producer Responsibility), Carbon Credits act as an incenƟve mechanism where producers earn credits by reducing emissions through recycling, recovery, and eco-friendly waste management.",
      link: "/epr/epr-credits/carbon-credits",
    },
  ],
};

const Services = () => {
  return (
    <section
      id="services-section"
      className="px-3 sm:px-5 md:px-6 lg:px-8 xl:px-17 bg-gradient-to-br from-[#dbe3ec]/50 via-[#f2f6fa]/50 to-white/60"
    >
      <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 text-[#0f2557] text-center">
        Services <span className="text-[#0f2557]">We Provide</span>
      </h1>

      <CategorySection serviceData={serviceData} />

      <StatsSection />
    </section>
  );
};

export default Services;
