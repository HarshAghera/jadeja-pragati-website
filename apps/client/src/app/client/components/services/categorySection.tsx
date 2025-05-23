"use client";

import React, { JSX, useState } from "react";
import CategoryButtons from "./categoryButtons";
import ServiceCard from "./serviceCard";

type Service = {
  icon: JSX.Element;
  title: string;
  desc: string;
  link: string;
};

type ServiceData = {
  [category: string]: Service[];
};

interface Props {
  serviceData: ServiceData;
}

const CategorySection: React.FC<Props> = ({ serviceData }) => {
  const categories = Object.keys(serviceData);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

  return (
    <>
      <CategoryButtons
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="cardsService">
        {serviceData[activeCategory]?.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </>
  );
};

export default CategorySection;
