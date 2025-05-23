"use client";

import { Button } from "@/components/ui/button";
import React from "react";

interface Props {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryButtons: React.FC<Props> = ({
  categories,
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <div className="flex justify-center flex-wrap gap-4 mb-12">
      {categories.map((cat) => (
        <Button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          data-active={activeCategory === cat}
          className="px-4 py-2 rounded-full font-semibold text-sm border-2 transition-colors
          border-[#0f2557] text-[#0f2557] bg-white
          hover:bg-[#0f2557] hover:text-white
          data-[active=true]:bg-[#0f2557] data-[active=true]:text-white cursor-pointer"
        >
          {cat}
        </Button>
      ))}
    </div>
  );
};

export default CategoryButtons;
